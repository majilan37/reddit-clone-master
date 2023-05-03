import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChevronDownIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { useStateProvider } from "../context/StateProvider";

function Header() {
  const navigate = useNavigate();
  const [{ user, isLoading }, dispatch] = useStateProvider();

  const logout = () => {
    dispatch({
      type: "SET_USER",
      payload: null,
    });

    localStorage.removeItem("reddit_user");
    navigate("/login");
  };
  return (
    <header className="flex bg-white px-4 py-2 h-[10vh] shadow-sm sticky top-0 z-50 items-center">
      <div
        onClick={() => navigate("/")}
        className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <img
          className="h-10 object-contain"
          src={
            "https://logos-download.com/wp-content/uploads/2016/06/Reddit_logo_full_1.png"
          }
          alt=""
        />
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px] ">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 border rounded-sm bg-gray-200 px-3 py-1">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search reddit..."
        />
      </form>

      <div className=" text-gray-500 space-x-2 items-center mx-5 hidden lg:flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <PlusIcon className="icon" />
        <BellIcon className="icon" />
      </div>
      <MenuIcon className="h-6 lg:hidden mx-3 cursor-pointer" />
      {user ? (
        <div className=" items-center hidden lg:flex space-x-3 border cursor-pointer  border-gray-100 p-2 ">
          <div className="relative h-5 w-5 flex-shrink-0">
            <img src={"https://links.papareact.com/23l"} />
          </div>
          <div onClick={logout} className=" items-center">
            <p className="truncate font-medium text-sm ">{user.username}</p>
            <p className="text-gray-400">Sign Out</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : isLoading ? (
        <div className=" items-center hidden lg:flex space-x-3 border cursor-pointer  border-gray-100 p-2 ">
          <p>Loading...</p>
        </div>
      ) : (
        <div
          onClick={() => navigate("/login")}
          className=" items-center hidden lg:flex space-x-2 border cursor-pointer   border-gray-100 p-2 ">
          <div className="relative h-5 w-5 flex-shrink-0">
            <img src={"https://links.papareact.com/23l"} />
          </div>
          <p className="text-gray-400">Sign in</p>
        </div>
      )}
    </header>
  );
}

export default Header;
