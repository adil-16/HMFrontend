import React, { useState } from "react";
import CloseEye from "../../assets/closeeye.svg";
import OpenEye from "../../assets/open-eye.png";

const PasswordField = ({
  setValue,
  inputRef,
  handleKeyDown,
  nextRef,
  Placeholder,
  bg
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          className={`border text-black border-blue3 bg-${bg} focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
     type={showPass ? "text" : "password"}
          placeholder={Placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, nextRef)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            className={`focus:outline-none bg-transparent border-none hover:border-transparent`}
            onClick={() => setShowPass(!showPass)}
          >
            {!showPass ? (
              <img src={CloseEye} alt="Close Eye" className="h-4 w-4 " />
            ) : (
              <img src={OpenEye} alt="Open Eye" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
