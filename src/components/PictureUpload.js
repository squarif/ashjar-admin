import { ReactComponent as PlusIcon } from "../assets/PlusIcon.svg";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { storage } from "../auth/firebase/config";
import { CircularProgress, useToast } from "@chakra-ui/react";

function PicturesUpload(props) {
    //  console.log("FileUpload props", props);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [pictures, setPictures] = useRecoilState(props.pictures);

    const toast = useToast();

    const handleFileChange = async (e) => {
        const files = e.target.files;

        console.log("files", files);

        if (!files || files.length === 0) {
            setUploadStatus("Please select files.");
            return;
        }

        const uploadPromises = Array.from(files).map((file) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const storageRef = storage.ref();
                    const fileRef = storageRef.child(`images/${file.name}`);
                    const uploadTask = fileRef.put(file);

                    uploadTask.on("state_changed", (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    });

                    await uploadTask;
                    const downloadURL = await fileRef.getDownloadURL();
                    resolve(downloadURL);
                } catch (error) {
                    reject(error.message);
                }
            });
        });

        try {
            setLoading(true);
            const uploadedUrls = await Promise.all(uploadPromises);
            setUploadStatus("Files uploaded successfully!");
            setPictures((pictures) => [...pictures, ...uploadedUrls]);
            setLoading(false);
            toast({
                title: "Picture Uploaded!",
                status: "success",
            });
        } catch (error) {
            console.log("ERROR", error);
            setUploadStatus(`Upload failed: ${error}`);
            toast({
                title: "Upload Failed!",
                description: error,
                status: "error",
            });
        }
    };

    const handleOpenFileDialog = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                multiple
                onChange={handleFileChange}
            />
            {loading ? (
                <div className="h-[124px] grid place-content-center w-[124px] rounded-xl bg-primary">
                    <CircularProgress value={uploadProgress} color="white" />
                </div>
            ) : (
                <button
                    onClick={handleOpenFileDialog}
                    className="h-[124px] grid place-content-center w-[124px] rounded-xl bg-primary">
                    <PlusIcon className="text-white h-6 w-6" />
                </button>
            )}

            {/* {uploadProgress > 0 && <progress max="100" />} */}
            {/* {uploadStatus && <p>{uploadStatus}</p>} */}
        </div>
    );
}

export default PicturesUpload;
