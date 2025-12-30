import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    navigate("/");
  };

  return logout;
};
