import React, { useState, useEffect, useRef } from "react";
import { InputDefault } from "../../components/inputFields/inputFiels";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";

const AddUserForm = ({ onClose, image, setAdded, updateData, guest }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [customerType, setCustomerType] = useState("guest");
  const [passportNumber, setPassportNumber] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [error, setError] = useState(false);

  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const roleInputRef = useRef(null);
  const customerTypeInputRef = useRef(null);
  const passportNumberInputRef = useRef(null);
  const passengerInputRef = useRef(null);

  useEffect(() => {
    if (updateData) {
      setName(updateData.name);
      setPhone(updateData.phone);
      setEmail(updateData.email);
      setRole(updateData.role || "customer");
      setCustomerType(updateData.customerType || "guest");
      setPassportNumber(updateData.passportNumber || "");
      setPassengers(updateData.passengers || []);
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
    nameInputRef.current.focus();
  }, []);

  const addPassenger = () => {
    if (passengerName) {
      setPassengers([...passengers, passengerName]);
      setPassengerName("");
    }
  };

  const removePassenger = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
  };


  const handleSubmit = async () => {
    {image? image :null};
    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("role", role);
    if (role === "customer") {
      data.append("customerType", customerType);
      data.append("passportNumber", passportNumber);
      data.append("passengers", JSON.stringify(passengers));
    }

    let url = "";
    if (updateData) {
      url = `/user/updateUser/${updateData.id}`;
      try {
        const res = await axios.put(url, data);
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
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
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
        setError(err.response?.data?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="mx-4 md:ml-14 md:mr-48">
      <div>
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Full Name</label>
        <InputDefault
          value={name}
          setValue={setName}
          handleKeyDown={(e) => handleKeyDown(e, phoneInputRef)}
          inputRef={nameInputRef}
          nextRef={phoneInputRef}
          Placeholder="John Doe"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Phone Number</label>
        <InputDefault
          value={phone}
          setValue={setPhone}
          handleKeyDown={(e) => handleKeyDown(e, emailInputRef)}
          inputRef={phoneInputRef}
          nextRef={emailInputRef}
          Placeholder="+92 12333 33333"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Email</label>
        <InputDefault
          value={email}
          setValue={setEmail}
          handleKeyDown={(e) => handleKeyDown(e, roleInputRef)}
          inputRef={emailInputRef}
          nextRef={roleInputRef}
          Placeholder="John@gmail.com"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, role === "customer" ? customerTypeInputRef : null)}
          ref={roleInputRef}
          className="bg-white border text-black border-gray ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
        >
          <option value="customer">Customer</option>
          <option value="supplier">Supplier</option>
        </select>
      </div>

      {role === "customer" && (
        <>
          <div className="mt-3">
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">Customer Type</label>
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, passportNumberInputRef)}
              ref={customerTypeInputRef}
              className="bg-white border border-gray text-black ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            >
              <option value="guest">Guest</option>
              <option value="b2b">B2B</option>
            </select>
          </div>

          <div className="mt-3">
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">Passport Number</label>
            <InputDefault
              value={passportNumber}
              setValue={setPassportNumber}
              handleKeyDown={(e) => handleKeyDown(e, passengerInputRef)}
              inputRef={passportNumberInputRef}
              nextRef={passengerInputRef}
              Placeholder="A12345673"
              bg={"white"}
            />
          </div>

          <div className="mt-3">
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">Passengers</label>
            <div className="flex">
              <InputDefault
                value={passengerName}
                setValue={setPassengerName}
                handleKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addPassenger();
                  }
                }}
                inputRef={passengerInputRef}
                Placeholder="Passenger Name"
                bg={"white"}
              />
              <button
                onClick={addPassenger}
                className="ml-2 bg-orange text-white py-2 px-4 rounded focus:outline-none"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {passengers.map((passenger, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{passenger}</span>
                  <button
                    onClick={() => removePassenger(index)}
                    className="ml-2 bg-red-500 text-white py-1 px-2 rounded focus:outline-none"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {error && <p className="text-orange w-80 mt-2">{error}</p>}

      <div className="flex justify-center my-2 sm:mt-10 sm:mb-14">
        <SubmitButton text="Submit" submit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddUserForm;
