import { useEffect, useState } from "react";

import { ReactComponent as CloseIcon } from "../../../../assets/CloseIcon.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/PlusIcon.svg";
import { Input } from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { workshopRequestPayload } from "../../../../stores/workshopRequestPayload";

function Categories() {
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);
    const [category, setCategory] = useState("");
    const [categoriesList, setCategoriesList] = useState(["Discussion", "Poetry"]);

    function handleRemoveCategory(index) {
        console.log("handleRemoveCategory", index);
        const updatedCategories = [...categoriesList];
        updatedCategories.splice(index, 1);

        setCategoriesList(updatedCategories);
        setWorkShopRequestPayload((prevPayload) => ({
            ...prevPayload,
            category: updatedCategories,
        }));

        console.log("categoriesList", categoriesList);
    }

    function handleAddCategory() {
        if (category.trim() !== "") {
            const updatedCategories = [...categoriesList, category];
            setCategoriesList(updatedCategories);

            setWorkShopRequestPayload((prevPayload) => ({
                ...prevPayload,
                category: updatedCategories,
            }));

            setCategory("");
        }
    }

    return (
        <div className="flex-col gap-7 flex">
            <div className="text-left text-2xl">Categories</div>
            <div className="flex gap-8">
                <div className="rounded-xl border px-4 w-fit flex justify-start ">
                    <Input
                        variant="unstyled"
                        value={category}
                        placeholder="Category Name"
                        className="py-4 px-4"
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </div>
                <button className="rounded-xl bg-primary flex gap-3 px-3 py-4" onClick={handleAddCategory}>
                    <span className="text-lg text-white leading-normal">Add Category</span>
                    <PlusIcon />
                </button>
            </div>
            <div className="flex gap-2.5 flex-wrap">
                {categoriesList.map((category, index) => (
                    <button
                        key={index}
                        className="rounded-xl border bg-primaryLight items-center flex gap-3 px-3 py-3"
                        onClick={() => handleRemoveCategory(index)}>
                        <CloseIcon className="text-mediumGray border-2 rounded-full h-6 w-6 border-mediumGray" />
                        <span className="text-lg text-mediumGray leading-normal">{category}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;
