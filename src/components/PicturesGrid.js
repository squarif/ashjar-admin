import { useRecoilState } from "recoil";
import PicturesUpload from "./PictureUpload";
import { ReactComponent as PlusIcon } from "../assets/PlusIcon.svg";

function PicturesGrid(props) {
    const [pictures, setPictures] = useRecoilState(props.picturesState);

    function handleDeleteImage(index) {
        const updatedPictures = JSON.parse(JSON.stringify(pictures));
        updatedPictures.splice(index, 1);

        setPictures(updatedPictures);
    }

    return (
        <div className="pictures border rounded-2xl border-light px-8 py-12 flex gap-7 flex-col ">
            <div className="text-left text-2xl">Pictures</div>
            <div className="grid grid-cols-5 grid-rows-2 gap-6">
                {pictures.map((picture, index) => {
                    return index === 0 ? (
                        <div
                            key={index}
                            className="group flex relative overflow-hidden rounded-2xl border col-span-3 row-span-2 :hover">
                            <img className="object-cover" alt="" src={picture} />
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="hidden group-hover:flex absolute top-0 left-0 bottom-0 right-0 bg-white bg-opacity-50 items-center justify-center">
                                <PlusIcon className="text-dark rotate-45" />
                            </button>
                        </div>
                    ) : (
                        <div key={index} className="group relative overflow-hidden border rounded-2xl flex">
                            <img className="object-cover" alt="" src={picture} />
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="hidden group-hover:flex absolute top-0 left-0 bottom-0 right-0 bg-white bg-opacity-50 items-center justify-center">
                                <PlusIcon className="text-dark rotate-45" />
                            </button>
                        </div>
                    );
                })}
                <PicturesUpload pictures={props.picturesState} />
            </div>
        </div>
    );
}

export default PicturesGrid;
