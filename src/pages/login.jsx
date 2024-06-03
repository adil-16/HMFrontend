import React, { useState, useRef, useEffect } from "react";
import { InputDefault } from "../components/inputFields/inputFiels";
import PasswordField from "../components/inputFields/passwordField";
import axios from '../axios'
import {useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [pass, setPass] = useState("12345678");
  const [error, setError] = useState(false)
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        // If there is no next field, submit the form
        // login(); 
      }
    }
  };



  useEffect(() => {
    emailInputRef.current.focus();
    localStorage.clear()
  }, []);

  const login = async () => {
    setError(false)
    await axios
      .post("/user/login", {email, password: pass})
      .then((res) => {
        console.log("data",res.data.data);
        localStorage.setItem('user', JSON.stringify(res.data.data))
        localStorage.setItem('login', true)
        navigate('/admin');
        
      })
      .catch((err) => {
        // setLoader(false)
          setError(err.response.data.data.error);
      });
  };

  return (
    <div>
     

      {/* Your content */}
      <div className="absolute inset-0 flex flex-col mt-16 items-center">
      <p
          className={`font-Nunitoo text-center ml-2 font-semibold text-orange text-32`}
        >
          Hotel Room Booking
        </p>

        <p className="font-Nunitoo font-bold text-orange text-16 sm:text-24 md:text-32 mt-1  md:mt-12">
          Let’s get you login!
        </p>
        <p className="font-Nunitoo font-regular text-opacity-60 text-orange text-12 sm:text-14 md:text-16">
          Enter your information below
        </p>

        {/* text fields */}
        <div className="flex flex-col p-2 w-auto sm:w-80 mt-10">
          <label className="font-Nunitoo font-medium text-orange text-14">
            Email
          </label>
          <InputDefault
            setValue={setEmail}
            handleKeyDown={handleKeyDown}
            inputRef={emailInputRef}
            nextRef={passwordInputRef}
            Placeholder="mail@simmmple.com"
            bg={"gray"}
          />

          <label className="font-Nunitoo font-medium text-orange text-14 mt-4">
            Password
          </label>
          <PasswordField
            setValue={setPass}
            handleKeyDown={handleKeyDown}
            inputRef={passwordInputRef}
            nextRef={null}
            Placeholder="Min 8 characters"
            bg={"gray"}
          />
           {error && (<p className="text-orange w-80 mt-2">{error}</p>)}


          {/* sign in button */}
          {/* <NavLink to={"/admin"}> */}
          <button className="border-none focus:outline-none bg-orange text-white mt-12 py-3 rounded-lg w-full"
          onClick={login}>
            <p className="font-Nunitoo font-medium text-white text-14 ">
              Sign In
            </p>
          </button>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
