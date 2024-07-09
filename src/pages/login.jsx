import React, { useState, useRef, useEffect } from "react";
import { InputDefault } from "../components/inputFields/inputFiels";
import PasswordField from "../components/inputFields/passwordField";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CircularLoader from "../components/CircularLoader";

const Login = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [pass, setPass] = useState("12345678");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e, nextRef) => {
    if (nextRef && nextRef.current) {
      if (e.key === "Enter") {
        nextRef.current.focus();
      } else {
        login();
      }
    }
  };

  useEffect(() => {
    emailInputRef.current.focus();
    localStorage.clear();
  }, []);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });

  const login = async () => {
    setError({});
    setLoading(true);
    try {
      // Validate the input data
      await loginSchema.validate(
        { email, password: pass },
        { abortEarly: false }
      );

      // Make the API call to login
      const res = await axios.post("/user/login", { email, password: pass });
      console.log("data", res.data.data);

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", true);

      // Show success toast and navigate to the admin page after a short delay
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setError(validationErrors);
        toast.error("Validation failed", { autoClose: 1000 });
      } else {
        setError({
          form: err.response?.data?.data?.error || "An error occurred",
        });
        toast.error(err.response?.data?.data?.error || "An error occurred", {
          autoClose: 1000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute inset-0 flex flex-col mt-16 items-center">
        <p className="font-Nunitoo text-center ml-2 font-semibold text-orange text-32">
          Hotel Room Booking
        </p>
        <p className="font-Nunitoo font-bold text-orange text-16 sm:text-24 md:text-32 mt-1 md:mt-12">
          Let’s get you login!
        </p>
        <p className="font-Nunitoo font-regular text-opacity-60 text-orange text-12 sm:text-14 md:text-16">
          Enter your information below
        </p>
        <div className="flex flex-col p-2 w-auto sm:w-80 mt-10">
          <label className="font-Nunitoo text-orange text-20 font-bold">
            Email
          </label>
          <InputDefault
            setValue={setEmail}
            handleKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
            inputRef={emailInputRef}
            Placeholder="mail@simmmple.com"
            bg={"gray"}
          />
          {error.email && (
            <p className="text-orange w-80 mt-2">{error.email}</p>
          )}
          <label className="font-Nunitoo font-bold text-orange text-20 mt-4">
            Password
          </label>
          <PasswordField
            setValue={setPass}
            handleKeyDown={(e) => handleKeyDown(e, null)}
            inputRef={passwordInputRef}
            Placeholder="Min 8 characters"
            bg={"gray"}
          />
          {error.password && (
            <p className="text-orange w-80 mt-2">{error.password}</p>
          )}
          {error.form && <p className="text-orange w-80 mt-2">{error.form}</p>}
          <button
            className="bg-orange flex justify-center items-center h-10 focus:outline-none w-auto md:w-40 m-10 ml-16"
            onClick={login}
            disabled={loading}
          >
            {loading ? (
              <CircularLoader size={6} color="white" />
            ) : (
              <p className="font-Nunitoo font-medium text-14 text-white">
                Sign In
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
