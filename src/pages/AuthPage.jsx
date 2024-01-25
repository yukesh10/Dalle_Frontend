import React, { useState, useEffect } from "react";

import { FormField } from "../components";
import { useNavigate } from "react-router-dom";

import {defaultFormData} from '../models/User';

import { loginUser, signupUser } from "../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function AuthPage({ isLogin }) {
  const navigate = useNavigate();
  const [loginPage, setLoginPage] = useState(isLogin);

  const [formData, setFormData] = useState(defaultFormData);

  const dispatch = useDispatch();
  const isLoadingLogin = useSelector(state => state.login.isLoading);
  const isLoadingSignup = useSelector(state => state.signup.isLoading);
  const signupSuccess = useSelector(state => state.signup.success);
  const loginSuccess = useSelector(state => state.login.success);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoginPage(signupSuccess);
  }, [signupSuccess]);

  useEffect(() => {
    if (loginSuccess){
      navigate("/");
    }
  }, [loginSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginPage) {
      dispatch(loginUser(formData));
    } else {
      dispatch(signupUser(formData));
    }
  };

  const handleSpan = () => {
    setLoginPage(!loginPage);
  };

  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="font-bold text-[#222328] text-[32px] text-center">
            {loginPage ? "Login to your account" : "Create your account"}
          </h1>

          <form className="mt-5 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              {!loginPage && (
                <FormField
                  labelName="Your name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  handleChange={handleChange}
                />
              )}
              <FormField
                labelName="Your email address"
                type="email"
                name="email"
                placeholder="john.doe@email.com"
                value={formData.email}
                handleChange={handleChange}
              />
              <FormField
                labelName="Your Password"
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                handleChange={handleChange}
              />
              <button
                type="submit"
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {(loginPage ? isLoadingLogin ? 'Logging In...': 'Login' : isLoadingSignup ? 'Signing up...': 'Signup')}
              </button>
              {loginPage ? (
                <p className="mt-2 text-[#666e75] text-[14px] text-center">
                  Don't have an account?{" "}
                  <span
                    onClick={handleSpan}
                    className="text-[#6469ff] cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p className="mt-2 text-[#666e75] text-[14px] text-center">
                  Already have an account?{" "}
                  <span
                    onClick={handleSpan}
                    className="text-[#6469ff] cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
