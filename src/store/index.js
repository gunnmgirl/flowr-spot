import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isAuth: false,
      token: "",
      name: "",
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
