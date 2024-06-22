import React, { useState } from "react";
import { InputDefault } from "../../components/inputFields/inputFiels";

const PassengerForm = ({ passengers, setPassengers }) => {
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState(0);
  const [passengerGender, setPassengerGender] = useState("male");
  const [passengerPassportNumber, setPassengerPassportNumber] = useState("");

  const handleAddPassenger = () => {
    const newPassenger = {
      name: passengerName,
      age: passengerAge,
      gender: passengerGender,
      passportNumber: passengerPassportNumber,
    };
    setPassengers([...passengers, newPassenger]);
    setPassengerName("");
    setPassengerAge(0);
    setPassengerGender("male");
    setPassengerPassportNumber("");
  };
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        handleSubmit();
      }
    }
  };
  const removePassenger = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
  };

  return (
    <div className="mt-5">
      <h3 className="font-Nunitoo font-medium text-orange text-14 py-2">Add Passengers</h3>
      <div className="max-h-64 overflow-y-auto">
        {passengers.map((passenger, index) => (
          <div key={index} className="mt-3">
            <p className="text-white">{`Passenger ${index + 1}`}</p>
            <p className="text-white">{`Name: ${passenger.name}`}</p>
            <p className="text-white">{`Age: ${passenger.age}`}</p>
            <p className="text-white">{`Gender: ${passenger.gender}`}</p>
            <p className="text-white">{`Passport Number: ${passenger.passportNumber}`}</p>
            <button onClick={() => removePassenger(index)} className="ml-2 bg-red-500 text-white py-1 px-2 rounded focus:outline-none">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Passenger Name</label>
        <InputDefault value={passengerName} setValue={setPassengerName} Placeholder="Passenger Name" bg="white" />
      </div>
      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Passenger Age</label>
        <InputDefault type="number" value={passengerAge} setValue={setPassengerAge} Placeholder="Passenger Age" bg="white" />
      </div>
      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Passenger Gender</label>
        <select value={passengerGender} onChange={(e) => setPassengerGender(e.target.value)} className="bg-white border border-gray text-black ml-2 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mt-3">
        <label className="font-Nunitoo font-medium text-orange text-14 py-2">Passenger Passport Number</label>
        <InputDefault value={passengerPassportNumber} setValue={setPassengerPassportNumber} Placeholder="Passport Number" bg="white" />
      </div>
      <button type="button" onClick={handleAddPassenger} className="mt-3 bg-orange text-white py-2 px-4 rounded">
        Add Passenger
      </button>
    </div>
  );
};

export default PassengerForm;
