import { useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";
import { Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilValue } from "recoil";
import { editInformationManagementRequest } from "../../../stores/informationManagement";
import { useMutation } from "@apollo/client";
import { EDIT_INFO } from "../../../queries/informationManagement";

function TermsAndConditions(props) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.data);

    const parser = new DOMParser();
    const html = parser.parseFromString(value, "text/html");

    const editInfoRequest = useRecoilValue(editInformationManagementRequest);
    const [editInfoHandler] = useMutation(EDIT_INFO);
    async function handleEditTermsAndConditions() {
        let payload = {
            _id: editInfoRequest._id,
            termsAndConditions: value,
        };

        if (payload.__typename) delete payload["__typename"];

        console.log("payload", payload);

        try {
            const { data } = await editInfoHandler({
                mutation: EDIT_INFO,
                variables: {
                    input: payload,
                },
            });

            console.log(data);
            setEdit(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <span className=" text-2xl leading-none">Terms and Conditions</span>
                <button onClick={() => setEdit(!edit)} className="p-1 hover:bg-primaryLight rounded-lg">
                    <EditIcon className="text-mediumGray h-6 w-6" />
                </button>
            </div>
            {edit ? (
                <div className="flex flex-col gap-8">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    {edit ? (
                        <div className="flex flex-row gap-6 justify-end w-full">
                            <button
                                onClick={() => setEdit(false)}
                                className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-errorLight">
                                <span className="text-sm text-mediumGray font-medium">Cancel</span>
                                <CloseIcon className="text-error h-5 w-5" />
                            </button>

                            <button
                                onClick={() => handleEditTermsAndConditions()}
                                className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-primaryLight">
                                <span className="text-sm text-mediumGray font-medium">Confirm Changes</span>
                                <TickIcon className="text-primary h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <div dangerouslySetInnerHTML={{ __html: html.body.innerHTML }} />
                </div>
            )}
        </div>
    );
}

export default TermsAndConditions;
