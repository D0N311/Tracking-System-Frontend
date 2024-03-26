import Logo from "../assets/logo.svg";
import Eye from "../assets/eye.svg";
import Email from "../assets/email.svg";
import ThemeToggle from "../components/ThemeToggle";
import { loginUser, checkUser } from "../api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        localStorage.clear();
        setLoading(true);

        const response = await loginUser(values.email, values.password);
        // Save token to local storage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("role", response.data.data.role);

        if (response.data.data.role === "SuperAdmin") {
          navigate("/dashboard/super-admin");
        }
        if (response.data.data.role === "Admin") {
          navigate("/dashboard/admin");
        }
        if (response.data.data.role === "User") {
          navigate("/dashboard/user");
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const goToRegister = () => {
    navigate("/Register");
  };

  return (
    <div>
      <div
        className={`flex h-screen dark:bg-slate-900 font-inter ${
          loading ? "cursor-wait" : ""
        } `}
      >
        {/* <div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${loading ? 'cursor-wait' : ''}`}> */}

        <div className="w-full max-w-xs p-5 m-auto rounded bg-slate-400">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <header>
            <img className="w-20 mx-auto mb-5 stroke-current" src={Logo} />
            <h1 className="text-4xl font-bold text-center text-gray-100 ">
              Login
            </h1>
          </header>

          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={formik.handleSubmit}>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img
                  className="w-5 h-5 text-gray-500 dark:bg-white dark:rounded-md"
                  aria-hidden="true"
                  src={Email}
                />
              </div>
              <input
                type="email"
                name="email"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
              />
            </div>

            <div className="relative mb-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img
                  className="w-5 h-5 text-gray-900 dark:bg-white dark:rounded-md "
                  aria-hidden="true"
                  src={Eye}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    onChange={togglePassword}
                    className="w-4 h-4 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-1 text-sm">
                  <label
                    for="remember"
                    className="text-white cursor-pointer dark:text-gray-300"
                  >
                    Show Password
                  </label>
                </div>
              </div>
            </div>
            <div>
              <input
                className={`w-full px-4 py-2 mb-6 font-bold text-white bg-indigo-500 rounded hover:bg-slate-900  ${
                  loading ? "cursor-wait" : "cursor-pointer"
                }`}
                type="submit"
              />
            </div>
          </form>
          <footer>
            <a
              className="float-left text-sm text-white cursor-pointer hover:text-blue-900"
              onClick={goToRegister}
            >
              Create Account
            </a>
            <a
              className="float-right text-sm text-white cursor-pointer hover:text-blue-900"
              href="#"
            >
              Forgot Password?
            </a>
          </footer>
        </div>
        <ToastContainer />
      </div>

      <></>
    </div>
  );
};
