import React, { useState, useEffect, useRef } from "react";
import { InputDefault } from "../../components/inputFields/inputFiels";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";

const AddBankForm = ({ onClose, setAdded, updateData }) => {
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const bankNameInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const contactNumberInputRef = useRef(null);
  const swiftCodeInputRef = useRef(null);

  useEffect(() => {
    if (updateData) {
      setBankName(updateData.bankName);
      setAddress(updateData.address);
      setContactNumber(updateData.contactNumber);
      setSwiftCode(updateData.swiftCode);
    }
  }, [updateData]);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    bankNameInputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      bankName,
      address,
      contactNumber,
      swiftCode,
    };

    let url = "";
    if (updateData) {
      url = `/bank/banks/${updateData.id}`;
      try {
        await axios.put(url, data);
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    } else {
      url = "/bank/addBank";
      try {
        await axios.post(url, data);
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <div className="mx-4 md:ml-14 md:mr-48 h-full overflow-y-auto">
      <div>
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Bank Name
        </label>
        <InputDefault
          value={bankName}
          setValue={setBankName}
          handleKeyDown={(e) => handleKeyDown(e, addressInputRef)}
          inputRef={bankNameInputRef}
          nextRef={addressInputRef}
          Placeholder="Bank Name"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Address
        </label>
        <InputDefault
          value={address}
          setValue={setAddress}
          handleKeyDown={(e) => handleKeyDown(e, contactNumberInputRef)}
          inputRef={addressInputRef}
          nextRef={contactNumberInputRef}
          Placeholder="Address"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Contact Number
        </label>
        <InputDefault
          value={contactNumber}
          setValue={setContactNumber}
          handleKeyDown={(e) => handleKeyDown(e, swiftCodeInputRef)}
          inputRef={contactNumberInputRef}
          nextRef={swiftCodeInputRef}
          Placeholder="Contact Number"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Swift Code
        </label>
        <InputDefault
          value={swiftCode}
          setValue={setSwiftCode}
          handleKeyDown={handleKeyDown}
          inputRef={swiftCodeInputRef}
          Placeholder="Swift Code"
          bg={"white"}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex justify-center my-2 sm:mt-10 sm:mb-14">
        <SubmitButton text="Submit" submit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddBankForm;
