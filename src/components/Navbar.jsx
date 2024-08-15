import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/authStore";

const Navbar = () => {
  const {isLoggedIn} = useAuth();
  console.log(isLoggedIn)
  return (
    <div>
      <div className="navbar bg-info">
        <div className="flex-1">
          <NavLink to='/' className="btn btn-ghost text-2xl">EMSX</NavLink>
        </div>
        <div className="flex-none gap-6">
          <div className="flex gap-4">
            <NavLink to='/home' className='text-md font-medium hover:underline underline-offset-2'>Home</NavLink>
            <NavLink to='/events' className={`text-md font-medium hover:underline underline-offset-2 ${!isLoggedIn?'hidden':''} `}>Events</NavLink>
            <NavLink to='/about' className='text-md font-medium hover:underline underline-offset-2'>About</NavLink>
            <NavLink to='/contact' className='text-md font-medium hover:underline underline-offset-2'>Contact</NavLink>
            <NavLink to='/login' className={`text-md font-medium hover:underline underline-offset-2 ${isLoggedIn?'hidden':''} `}>Login</NavLink>
            <NavLink to='/logout' className={`text-md font-medium hover:underline underline-offset-2 ${!isLoggedIn?'hidden':''} `}>Log Out</NavLink>
            <NavLink to='/signup' className={`text-md font-medium hover:underline underline-offset-2 ${isLoggedIn?'hidden':''} `}>Sign Up</NavLink>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://mighty.tools/mockmind-api/content/human/28.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
