import React, { useState, useEffect, useRef, useContext } from "react";

import { InputDefault } from "../../components/inputFields/inputFiels";
import PasswordField from "../../components/inputFields/passwordField";
import ImageField from "../../components/inputFields/ImageField";
import SubmitButton from "../buttons/SubmitButtonHotel";
import axios from "../../axios";
import { AuthContext } from "../../App";

const SettingForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const { setChangeUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setEmail(user.email);
  }, []);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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
  }, []);

  const update = async () => {
    setLoading(false);
    setError(false);
    if (pass == "" || email == "") {
      setError("Fill empty fields");
    } else {
      await axios
        .put("/user//updateUser/" + user._id, { email, password: pass })
        .then((res) => {
          setPass("");
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setChangeUser((prev) => !prev);
        })
        .catch((err) => {
          // setLoader(false)
          setError(err.response.data.data.error);
        });
    }
    setLoading(false);
  };

  const updateProfilePhoto = async () => {
    setLoading(true);
    setError(false);
    if (image == null) {
      setError("Select the Image");
    } else {
      const data = new FormData();
      data.append("file", image);
      await axios
        .put("/user/editPhoto/" + user._id, data)
        .then((res) => {
          setPass("");
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setChangeUser((prev) => !prev);
        })
        .catch((err) => {
          // setLoader(false)
          setError(err.response.data.data.error);
        });
    }
    setloading(false);
  };

  return (
    <div>
      <div className="border-b border-b-blue4">
        <p className="font-Nunitoo font-semibold text-orange text-16 sm:text-24 mt-4">
          Settings
        </p>
      </div>

      <div className="ml-3 mt-3">
        <p className="font-Nunitoo font-semibold text-orange text-14 sm:text-16">
          Security
        </p>
        {/* email */}

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Email
          </label>
          <InputDefault
            value={email}
            setValue={setEmail}
            handleKeyDown={handleKeyDown}
            inputRef={emailInputRef}
            nextRef={passwordInputRef}
            Placeholder="Change Email"
            bg={"gray"}
          />
        </div>

        {/* password */}

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Password
          </label>
          <PasswordField
            value={pass}
            setValue={setPass}
            handleKeyDown={handleKeyDown}
            inputRef={passwordInputRef}
            nextRef={null}
            Placeholder="Change Password"
            bg={"gray"}
          />
        </div>
        {error && <p className="text-orange w-80 mt-2">{error}</p>}

        <div className="mt-4">
          <SubmitButton text="Approve" submit={update} loading={loading} />
        </div>
      </div>

      {/* change img */}
      <div className="ml-3 mt-3">
        <p className="font-Nunitoo font-semibold text-orange text-14 sm:text-16">
          General
        </p>
        {/* email */}

        <div className="mt-3">
          <ImageField bg={"gray"} setImg={setImage} />
        </div>
        <div className="mt-4">
          <SubmitButton
            text="Upload"
            submit={updateProfilePhoto}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingForm;
