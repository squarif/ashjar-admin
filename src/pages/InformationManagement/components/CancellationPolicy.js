import { useState } from "react";
import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilValue } from "recoil";
import { useMutation } from "@apollo/client";
import { EDIT_INFO } from "../../../queries/informationManagement";
import { editInformationManagementRequest } from "../../../stores/informationManagement";

function CancellationPolicy(props) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.data);

    const toast = useToast();

    const parser = new DOMParser();
    const html = parser.parseFromString(value, "text/html");

    const editInfoRequest = useRecoilValue(editInformationManagementRequest);
    const [editInfoHandler] = useMutation(EDIT_INFO);
    async function handleEditCancellationPolicy() {
        let payload = {
            _id: editInfoRequest._id,
            cancellationPolicy: value,
        };

        if (payload.__typename) delete payload["__typename"];

        //  console.log("payload", payload);

        try {
            const { data } = await editInfoHandler({
                mutation: EDIT_INFO,
                variables: {
                    input: payload,
                },
            });

            //  console.log(data);
            setEdit(false);

            toast({
                title: "Policy Updated!",
                status: "success",
            });
        } catch (error) {
            console.log(error);

            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    return (
        <div className="flex flex-col gap-6 pb-2.5">
            <div className="flex items-center gap-6">
                <span className=" text-2xl leading-none">Cancellation Policy</span>
                <button onClick={() => setEdit(!edit)} className="p-1 hover:bg-primaryLight rounded-lg">
                    <EditIcon className="text-mediumGray h-6 w-6" />
                </button>
            </div>

            {edit ? (
                <div className="flex flex-col gap-8">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    <div className="flex flex-row gap-6 justify-end w-full">
                        <button
                            onClick={() => setEdit(false)}
                            className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-errorLight">
                            <span className="text-sm text-mediumGray font-medium">Cancel</span>
                            <CloseIcon className="text-error h-5 w-5" />
                        </button>
                        <button
                            className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-primaryLight"
                            onClick={() => handleEditCancellationPolicy()}>
                            <span className="text-sm text-mediumGray font-medium">Confirm Changes</span>
                            <TickIcon className="text-primary h-5 w-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <div
                        className="border border-borderColor text-mediumGray rounded-xl p-5 leading-6"
                        dangerouslySetInnerHTML={{ __html: html.body.innerHTML }}
                    />
                </div>
            )}
        </div>
    );
}

export default CancellationPolicy;
