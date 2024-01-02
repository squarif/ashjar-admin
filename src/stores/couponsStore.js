import { atom } from "recoil";

export const couponsDataState = atom({
    key: "couponsDataState",
    default: [],
});

export const couponDataState = atom({
    key: "couponDataState",
    default: {},
});

export const sendCouponState = atom({
    key: "sendCouponState",
    default: null,
});
