import React from "react";
import Tick from "../../assets/Tick2.svg";

export function CheckboxLabel({check}) {

  return (
    <div className="flex items-center gap-4"  style={{ cursor: 'pointer' }}>
      {/* Custom checkbox appearance */}
      <div
        className={`w-5 h-5 border border-blue  flex items-center justify-center bg-white2 rounded-md` }
      >
        {/* Show custom tick image when checked */}
        {check && <img src={Tick} alt="Tick" className="w-4 h-4" />}
      </div>
    </div>
  );
}
