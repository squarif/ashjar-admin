import { atom } from "recoil";

const editInformationManagementRequest = atom({
    key: "editInformationManagementRequest",
    default: {},
});

const landingPagePictures = atom({
    key: "landingPagePictures",
    default: [],
});

export { editInformationManagementRequest, landingPagePictures };
