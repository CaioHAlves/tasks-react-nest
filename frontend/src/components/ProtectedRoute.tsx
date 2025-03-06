import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: IProps) => {
  const token = localStorage.getItem("token");
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
