import React, { useState, useEffect, useRef } from "react";

import { InputDefault } from "../../components/inputFields/inputFiels";
import RoomTypeForm from "./RoomType";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";

const AddHotelForm = ({ onClose, image, setAddHotel }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const handleChange = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("name", name);
    data.append("location", location);
    let url = "/hotel/addHotel";
    await axios
      .post(url, data)
      .then((res) => {
        setAddHotel((prev) => !prev);
        onClose();
      })
      .catch((err) => {
        console.log("error is", err);
        setError(err.response.data.data.error);
      });
    setLoading(false);
  };

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

  return (
    <div className="mx-4 md:ml-14 md:mr-48">
      <div>
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Hotel Name
        </label>
        <InputDefault
          setValue={setName}
          handleKeyDown={handleKeyDown}
          inputRef={nameInputRef}
          nextRef={locationInputRef}
          Placeholder="Embassy Lodge"
          bg={"white"}
          text={"black"}
        />
      </div>
      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Location
        </label>
        <InputDefault
          setValue={setLocation}
          handleKeyDown={handleKeyDown}
          inputRef={locationInputRef}
          nextRef={emailInputRef}
          Placeholder="Islamabad"
          bg={"white"}
          text={"black"}
        />
      </div>
      {error && <p className="text-orange w-80 mt-2">{error}</p>}
      <div className="flex justify-center my-2 sm:mt-10 sm:mb-14">
        <SubmitButton text="Submit" submit={handleChange} loading={loading} />
      </div>
    </div>
  );
};

export default AddHotelForm;
