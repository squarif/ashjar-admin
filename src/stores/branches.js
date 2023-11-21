import { atom } from "recoil";

const branchesData = atom({
    key: "branchesData",
    default: [],
});

export { branchesData };
