import { atom } from "recoil";

const couponsDataState = atom({
    key: "couponsDataState",
    default: [],
});

const couponDataState = atom({
    key: "couponDataState",
    default: {},
});

export { couponsDataState, couponDataState };
