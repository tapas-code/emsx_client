import React, { useState } from "react";
import base_url from "../services/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {setIsLoggedIn} = useAuth();

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}/api/users/login`,
        loginDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        console.log('User successfully logged in.')
        setLoginDetails({
          email: "",
          password: "",
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data._id);
        navigate("/home");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error occurred while user login.", error);
    }
  };

  return (
    <div className="flex-1 flex">
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row ">
          <div className="text-center lg:text-left flex-1 ">
            <h1 className="text-5xl font-bold">Login now!</h1>
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
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    name="email"
                    value={loginDetails.email}
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
                    value={loginDetails.password}
                    onChange={handleChange}
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-info">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
