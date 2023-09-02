import React, { useState } from "react";
import { toast } from "react-toastify";

import { FormField } from "../components";
import {API_BASE_URL} from "../constants/serverConfig";
import { useNavigate } from "react-router-dom";

import {defaultFormData} from '../models/User';
import { useAuth } from "../hooks/useAuth";

function AuthPage({ isLogin }) {
  const navigate = useNavigate();
  const { login, logout} = useAuth();
  const [loginPage, setLoginPage] = useState(isLogin);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (loginPage) {
        const response = await fetch(
          `${API_BASE_URL}/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: formData.email, password: formData.password}),
          }
        );

        const responseJson = await response.json();
        if (responseJson.success) {
          login({id: responseJson.id, name: responseJson.name, email: responseJson.email, authToken: responseJson.token})
          navigate("/");
        } else {

          toast.error(responseJson.message);
        }
      } else {
        const response = await fetch(
          `${API_BASE_URL}/v1/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const responseJson = await response.json();
        if (responseJson.success) {
          toast.success(responseJson.message, {autoClose: 1000});
          setFormData(defaultFormData);
          setLoginPage(true);
        } else {
          toast.error(responseJson.message);
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
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
                {loading ? (loginPage ? 'Logging In...': 'Signing up...') : (loginPage ? 'Login': 'Signup')}
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
