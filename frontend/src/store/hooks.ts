import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, TypeDispatch } from "./store";

export const useTypedDispatch = () => useDispatch<TypeDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
