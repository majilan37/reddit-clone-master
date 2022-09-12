import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import PrivateRoute from "./components/PrivateRoute";
import Subreddit from "./pages/Subreddit";
import PostPage from "./pages/PostPage";
import { Toaster } from "react-hot-toast";

const cookies = new Cookies();
function App() {
  const navigate = useNavigate();
  const token: string = cookies.get("accesstoken");

  // * Check if jwt token is valid
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode<JwtPayload>(token as string);

      if (decoded?.exp! * 1000 < Date.now()) {
        console.log(decoded);
        cookies.remove("accesstoken", {});
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [token]);

  return (
    <div className="">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        {/* ------- Private Route ------- */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/subreddit/:topic" element={<Subreddit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
