import { ReactComponent as PlusIcon } from "../assets/PlusIcon.svg";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { storage } from "../auth/firebase/config";
import { CircularProgress, useToast } from "@chakra-ui/react";

function PicturesUpload({ propIcon, setPropIcon }) {
    //  console.log("FileUpload props", props);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    // const [icon, setIcon] = useState(propIcon);

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
            // const uploadedUrl = "google.com";
            const uploadedUrl = await Promise.all(uploadPromises);
            setUploadStatus("Files uploaded successfully!");
            console.log("uploadedUrl", uploadedUrl);
            setPropIcon(uploadedUrl[0]);
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
                <div className="h-6 grid place-content-center px-4">
                    <CircularProgress
                        value={uploadProgress}
                        trackColor="#B0C478"
                        color="#FFFFFF"
                        size="24px"
                    />
                </div>
            ) : (
                <button onClick={handleOpenFileDialog} className="flex py-2  items-center gap-2 px-4">
                    <PlusIcon className="text-primary h-6 w-6" />
                    <span className="text-grey">Upload Icon</span>
                </button>
            )}

            {/* {uploadProgress > 0 && <progress max="100" />} */}
            {/* {uploadStatus && <p>{uploadStatus}</p>} */}
        </div>
    );
}

export default PicturesUpload;
