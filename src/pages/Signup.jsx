import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import base_url from "../services/helper";
import {useAuth} from '../store/authStore'

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {notify} = useAuth();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
          `${base_url}/api/users/register`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status==201){
        console.log('User successfully registered.')
        notify('User successfully registered.')
        setUserDetails({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error occurred while user registration.", error);
    }
  };

  return (
    <div className="flex-1 flex">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row ">
          <div className="text-center lg:text-left flex-1 ">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className=" card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border-t">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="name"
                    placeholder="name"
                    className="input input-bordered"
                    required
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                  />
                  <label className="label">
                    <NavLink to="/login" className="label-text-alt ">
                      Already registered?{" "}
                      <span className="underline underline-offset-2">
                        Sign In
                      </span>
                    </NavLink>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-info">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
