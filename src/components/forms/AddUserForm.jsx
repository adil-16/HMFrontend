import React, { useState, useEffect, useRef } from "react";
import { InputDefault } from "../../components/inputFields/inputFiels";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";

const AddUserForm = ({ onClose, image, setAdded, updateData }) => {
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [customerType, setCustomerType] = useState("guest");
  const [error, setError] = useState(false);

  const businessNameInputRef = useRef(null);
  const contactPersonInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const roleInputRef = useRef(null);
  const customerTypeInputRef = useRef(null);

  useEffect(() => {
    if (updateData) {
      setBusinessName(updateData.businessName);
      setContactPerson(updateData.contactPerson);
      setPhone(updateData.phone);
      setEmail(updateData.email);
      setRole(updateData.role || "customer");
      setCustomerType(updateData.customerType || "guest");
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
    businessNameInputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("businessName", businessName);
    data.append("contactPerson", contactPerson);
    data.append("phone", phone);
    data.append("email", email);
    data.append("role", role);
    if (role === "customer") {
      data.append("customerType", customerType);
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
    <div
      className="mx-4 md:ml-14 md:mr-48 h-full overflow-y-auto"
     
    >
      <div>
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Business Name
        </label>
        <InputDefault
          value={businessName}
          setValue={setBusinessName}
          handleKeyDown={(e) => handleKeyDown(e, contactPersonInputRef)}
          inputRef={businessNameInputRef}
          nextRef={contactPersonInputRef}
          Placeholder="Business Name"
          bg={"white"}
        />
      </div>

      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">
          Contact Person
        </label>
        <InputDefault
          value={contactPerson}
          setValue={setContactPerson}
          handleKeyDown={(e) => handleKeyDown(e, phoneInputRef)}
          inputRef={contactPersonInputRef}
          nextRef={phoneInputRef}
          Placeholder="Contact Person"
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
        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Customer Type
          </label>
          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, null)}
            ref={customerTypeInputRef}
            className="bg-white border border-gray text-black ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          >
            <option value="guest">Guest</option>
            <option value="b2b">B2B</option>
          </select>
        </div>
      )}

      {error && <p className="text-orange w-80 mt-2">{error}</p>}

      <div className="flex justify-center my-2 sm:mt-10 sm:mb-14">
        <SubmitButton text="Submit" submit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddUserForm;
