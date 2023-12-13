import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logo } from "./assets";
import { Home, CreatePost, AuthPage } from "./pages";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./store/actions/authActions";
import { actions } from "./store/slice/login-slice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);

  useEffect(()=> {
    if (!user || !user.id){
      dispatch(actions.checkLogin());
    }
  }, [])

  const handleLogout = async () => {
    dispatch(logoutUser(user?.id));
    dispatch(actions.resetLoginState());
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] sticky top-0 z-40">
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 object-contain" />
        </Link>
        <div className="">
          {user?.id && (
            <>
              <button
                className="font-inter font-medium bg-[#b32626b9] text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          {!user?.id && (
            <Link
              to="/auth"
              className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route
            path="/auth"
            element={
              user?.id ? <Navigate to="/" replace /> :
              <AuthPage
                isLogin={true}
                loadingText="Logging in..."
                buttonText="Login"
              />
            }
          />
          <Route path="/" element={<Home />} />
          {/* <Route path="/create-post" element={user?.id ? <CreatePost /> : <Navigate to="/auth" replace />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
