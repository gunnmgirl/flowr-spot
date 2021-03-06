import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isAuth: false,
      token: "",
      user: {},
      isProfileOpen: false,
      setUser: (data) => set(() => ({ user: data })),
      logout: () =>
        set(() => ({ token: "", isAuth: false, isProfileOpen: false })),
      toggleProfile: () =>
        set((prev) => ({ isProfileOpen: !prev?.isProfileOpen })),
      saveToken: (data) =>
        set(() => ({
          token: data,
          isAuth: true,
        })),
    }),
    { name: "state" }
  )
);

export default useStore;
