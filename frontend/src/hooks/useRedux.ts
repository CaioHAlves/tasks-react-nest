import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useRedux() {
  return {
    dispatch: useDispatch(),
    reduxState: useSelector((state: RootState) => state),
  }
}