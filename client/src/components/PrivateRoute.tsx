import { Navigate, Outlet } from "react-router-dom";
import { useStateProvider } from "../context/StateProvider";

const PrivateRoute: React.FunctionComponent<{}> = () => {
  const [{ user, isLoading }] = useStateProvider();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
