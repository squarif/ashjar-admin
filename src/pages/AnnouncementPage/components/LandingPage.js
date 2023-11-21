import { useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import ReactQuill from "react-quill";
import { useRecoilState } from "recoil";
import "react-quill/dist/quill.snow.css";

function LandingPage() {
    let [pictures, setPictures] = useState();
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione .."
    );
    const parser = new DOMParser();

    const html = parser.parseFromString(value, "text/html");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <span className=" text-2xl leading-none">Landing Page</span>
                <button onClick={() => setEdit(!edit)} className="p-1 hover:bg-primaryLight rounded-lg">
                    <EditIcon className="text-mediumGray h-6 w-6" />
                </button>
            </div>

            <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                {pictures?.map((picture, index) =>
                    index === 0 ? (
                        <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                            <img alt="" src={picture} />
                        </div>
                    ) : (
                        <div className="overflow-hidden border rounded-2xl">
                            <img className="" alt="" src={picture} />
                        </div>
                    )
                )}
                <button className="h-[124px] grid place-content-center w-[124px] rounded-xl bg-primary">
                    <PlusIcon className="text-white h-6 w-6" />
                </button>
            </div>

            <div className="flex flex-col gap-6 pb-2.5">
                <span className="text-xl leading-none">Landing Page</span>

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
                            <button className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-primaryLight">
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
        </div>
    );
}

export default LandingPage;
