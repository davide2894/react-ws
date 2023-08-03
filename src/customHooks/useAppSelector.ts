import { RootState } from "@store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Source: https://redux-toolkit.js.org/tutorials/typescript#project-setup
// Use throughout the app instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
