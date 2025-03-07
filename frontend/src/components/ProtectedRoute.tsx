import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRedux } from "../hooks/useRedux";

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: IProps) => {
  const { reduxState: { user: { token } } } = useRedux()
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  return children;
};

export default ProtectedRoute;
