import React, { useState } from 'react';
import Tick from "../../assets/tick.svg";

export function CheckboxLabel({isChecked, setIsChecked}) {

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center gap-4" onClick={handleCheckboxChange} style={{ cursor: 'pointer' }}>
      {/* Custom checkbox appearance */}
      <div
        className={`w-5 h-5 border border-blue  flex items-center justify-center ${isChecked ? 'bg-blue' : ''}`}
      >
        {/* Show custom tick image when checked */}
        {isChecked && <img src={Tick} alt="Tick" className="w-4 h-4" />}
      </div>
    </div>
  );
}
