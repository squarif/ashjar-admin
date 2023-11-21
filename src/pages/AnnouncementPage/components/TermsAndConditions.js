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

function TermsAndConditions() {
    const [edit, setEdit] = useState(false);

    const [value, setValue] = useState("");

    const parser = new DOMParser();

    const html = parser.parseFromString(value, "text/html");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <span className=" text-2xl leading-none">Terms and Conditions</span>
                <button onClick={() => setEdit(!edit)} className="p-1 hover:bg-primaryLight rounded-lg">
                    <EditIcon className="text-mediumGray h-6 w-6" />
                </button>
            </div>
            {edit ? (
                <ReactQuill theme="snow" value={value} onChange={setValue} />
            ) : (
                <div className="flex flex-col gap-8">
                    <div dangerouslySetInnerHTML={{ __html: html.body.innerHTML }} />

                    {edit ? (
                        <div className="flex flex-row gap-6 justify-end w-full">
                            <button className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-errorLight">
                                <span className="text-sm text-mediumGray font-medium">Cancel</span>
                                <CloseIcon className="text-error h-5 w-5" />
                            </button>

                            <button
                                onClick={() => setEdit(false)}
                                className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-primaryLight">
                                <span className="text-sm text-mediumGray font-medium">Confirm Changes</span>
                                <TickIcon className="text-primary h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
}

export default TermsAndConditions;
