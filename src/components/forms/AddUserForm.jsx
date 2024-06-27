import React, { useState, useEffect, useRef } from "react";
import { InputDefault } from "../../components/inputFields/inputFiels";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";
import PassengerForm from "./PassenegersForm";

const AddUserForm = ({ onClose, image, setAdded, updateData, guest }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [customerType, setCustomerType] = useState("guest");
  const [passportNumber, setPassportNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(false);

  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const roleInputRef = useRef(null);
  const customerTypeInputRef = useRef(null);
  const passportNumberInputRef = useRef(null);
  const companyNameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const genderInputRef = useRef(null);

  useEffect(() => {
    if (updateData) {
      setName(updateData.name);
      setPhone(updateData.phone);
      setEmail(updateData.email);
      setRole(updateData.role || "customer");
      setCustomerType(updateData.customerType || "guest");
      setPassportNumber(updateData.passportNumber || "");
      setCompanyName(updateData.companyName || "");
      setPassengers(updateData.passengers || []);
      setAge(updateData.age || 0);
      setGender(updateData.gender || "male");
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

  const handleSubmit = async () => {
    console.log("passengers", passengers);
    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("role", role);
    data.append("gender", gender);
    if (role === "customer") {
      data.append("customerType", customerType);
      data.append("age", age);
      data.append("passengers", JSON.stringify(passengers));
      if (customerType === "guest") {
        data.append("passportNumber", passportNumber);
      }
      if (customerType === "b2b") {
        data.append("companyName", companyName);
      }
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
      const formDataObject = {};
      for (let pair of data.entries()) {
        formDataObject[pair[0]] = pair[1];
      }
      console.log("Form Data:", formDataObject);
      try {
        const res = await axios.post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Form Data after:", res.data);
        setAdded((prev) => !prev);
        onClose();
      } catch (err) {
        setError(err.response?.data?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div
      className="mx-4 md:ml-14 md:mr-48 h-full overflow-y-auto"
      style={{ maxHeight: "600px", overflowY: "scroll", paddingRight: "100px" }}
    >
      <div>
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Full Name
        </label>
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
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Phone Number
        </label>
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
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Email
        </label>
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
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null)}
          ref={genderInputRef}
          className="bg-white border border-gray text-black ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) =>
            handleKeyDown(e, role === "customer" ? customerTypeInputRef : null)
          }
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
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">
              Customer Type
            </label>
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
            <label className="font-Nunitoo font-medium text-orange text-14 py-2">
              Age
            </label>
            <InputDefault
              type="number"
              value={age}
              setValue={setAge}
              handleKeyDown={(e) => handleKeyDown(e, genderInputRef)}
              inputRef={ageInputRef}
              nextRef={genderInputRef}
              Placeholder="Enter Age"
              bg={"white"}
            />
          </div>
          <PassengerForm
            passengers={passengers}
            setPassengers={setPassengers}
          />

          {customerType === "guest" && (
            <>
              <div className="mt-3">
                <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                  Customer Passport Number
                </label>
                <InputDefault
                  value={passportNumber}
                  setValue={setPassportNumber}
                  handleKeyDown={(e) => handleKeyDown(e, ageInputRef)}
                  inputRef={passportNumberInputRef}
                  nextRef={ageInputRef}
                  Placeholder="A12345673"
                  bg={"white"}
                />
              </div>
            </>
          )}

          {customerType === "b2b" && (
            <>
              <div className="mt-3">
                <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                  Company Name
                </label>
                <InputDefault
                  value={companyName}
                  setValue={setCompanyName}
                  handleKeyDown={(e) => handleKeyDown(e, companyNameInputRef)}
                  inputRef={companyNameInputRef}
                  nextRef={companyNameInputRef}
                  Placeholder="AL Taj Company"
                  bg={"white"}
                />
              </div>
            </>
          )}
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
