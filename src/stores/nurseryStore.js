import { atom } from "recoil";

const nurseryData = atom({
    key: "nurseryData",
    default: [],
});

const editNurseryData = atom({
    key: "editNurseryData",
    default: [],
});

const nurseryPictures = atom({
    key: "nurseryPictures",
    default: [],
});

export { nurseryData, editNurseryData, nurseryPictures };
