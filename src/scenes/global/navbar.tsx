import { Bell, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="light w-full bg-gray-800 p-4 flex justify-between items-center border border-white rounded-lg">
      <div className="flex justify-between items-center w-full mb-3">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        {/* <button
          className="px-3 py-1 text-white rounded-full hidden sm:block"
          onClick={() => {}}
        >
          <Menu className="hover:text-red-300" size={24}/>
        </button> */}

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-60 md:w-80 border-2 border-gray-700 text-dark bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <Bell className="text-blue-900" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between text-white items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={() => {}}>
              <Link to="/settings">
              <Settings className="cursor-pointer text-white-500 hover:text-red-300" size={24} />
              </Link>
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-white-500 hover:text-red-300" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-white-300 mx-3" />
        </div>
        <div>
            <button onClick={() => {}}>
              <Link to="/users">
              <User className="cursor-pointer text-white-500 hover:text-red-300" size={24} />
              </Link>
            </button>
          </div>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
