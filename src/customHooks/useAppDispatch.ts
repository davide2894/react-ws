import { AppDispatch } from "@store";
import { useDispatch } from "react-redux";

// Source: https://redux-toolkit.js.org/tutorials/typescript#project-setup
// Use throughout the app instead of plain `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;
