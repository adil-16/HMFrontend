import React, { useState, useRef, useEffect } from "react";
import { InputDefault } from "../components/inputFields/inputFiels";
import PasswordField from "../components/inputFields/passwordField";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  console.log("qasim");
  const [email, setEmail] = useState("admin@admin.com");
  const [pass, setPass] = useState("12345678");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      if (nextRef && nextRef.current) {
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

  const login = async () => {
    setError(false);
    setLoading(true);
    try {
      const res = await axios.post("/user/login", { email, password: pass });
      console.log("data", res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", true);
      navigate("/admin");
    } catch (err) {
      setError(err.response.data.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div className="absolute inset-0 flex flex-col mt-16 items-center">
          <p
            className={`font-Nunitoo text-center ml-2 font-semibold text-orange text-32`}
          >
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
            {error && <p className="text-orange w-80 mt-2">{error}</p>}
            <button
              className="border-none focus:outline-none bg-orange text-white mt-12 py-3 rounded-lg w-full"
              onClick={login}
            >
              <p className="font-Nunitoo font-medium text-white text-14">
                Sign In
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
