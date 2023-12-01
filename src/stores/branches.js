import { atom } from "recoil";

const branchesData = atom({
    key: "branchesData",
    default: [],
});

const branchData = atom({
    key: "branchData",
    default: {
        _id: "6537572cefdb213c0c319113",
        location: ["Islamabad"],
        name: "Branch1",
        meetingRooms: [],
        workspaces: [],
        nurseries: [],
    },
});

export { branchesData, branchData };
