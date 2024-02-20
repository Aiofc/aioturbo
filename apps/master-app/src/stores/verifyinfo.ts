import { create } from "zustand";

export const verifyStore = create((set) => ({
    captchaVerification: "",
    setVerification: (captchaVerification: string) => set({ captchaVerification }),
}));

