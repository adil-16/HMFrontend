import React, { useState, useEffect, useRef } from "react";

import { InputDefault } from "../../components/inputFields/inputFiels";
import SubmitButton from "../../components/buttons/SubmitButton";
// import axios from "axios";
import axios from "../../axios";

const AddUserForm = ({ onClose, image, setAdded, updateData, guest }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    console.log(updateData);
    if (updateData) {
      setName(updateData.name);
      setPhone(updateData.phone);
      setEmail(updateData.email);
    }
  }, []);

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
    nameInputRef.current.focus();
  }, []);

  const handleChange = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    let url = "";
    console.log("data is", Array.from(data.entries()));
    if (updateData) {
      url = `/user/updateUser/${updateData.id}`;
      try {
        const res = await axios.put(url, data);
        console.log("Updated user details:", res.data.data);
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
        console.error("Error updating user:", err);
        setError(err.response?.data?.data?.error || "An error occurred");
      }
    } else {
      url = "/user/addUser";
      data.append("isGuest", guest);
      try {
        const res = await axios.post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("New user added:", res.data.data);
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
        console.error("Error adding user:", err);
        setError(err.response?.data?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="mx-4 md:ml-14 md:mr-48">
      <div>
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Full Name
        </label>
        <InputDefault
          value={name}
          setValue={setName}
          handleKeyDown={handleKeyDown}
          inputRef={nameInputRef}
          nextRef={phoneInputRef}
          Placeholder="John Doe"
          bg={"white"}
        />
      </div>
      {/* phone */}
      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Phone Number
        </label>
        <InputDefault
          value={phone}
          setValue={setPhone}
          handleKeyDown={handleKeyDown}
          inputRef={phoneInputRef}
          nextRef={emailInputRef}
          Placeholder="+92 12333 33333"
          bg={"white"}
        />
      </div>

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
          nextRef={null}
          Placeholder="John@gmail.com"
          bg={"white"}
        />
      </div>
      {error && <p className="text-orange w-80 mt-2">{error}</p>}

      <div
        className="flex justify-center my-2 sm:mt-10 sm:mb-14"
        // onClick={() => onClose()}
      >
        <SubmitButton text="Submit" submit={handleChange} />
      </div>
    </div>
  );
};

export default AddUserForm;
