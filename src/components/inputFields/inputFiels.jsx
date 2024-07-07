import React from "react";

export function InputDefault({
  value,
  setValue,
  inputRef,
  nextRef,
  Placeholder,
  bg,
  py,
}) {
  const handleChange = (e) => {
    setValue(e.target.value);
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

  return (
    <input
      ref={inputRef}
      value={value}
      className={`border border-blue3 text-black bg-${bg} focus:outline-none rounded-md ${
        py && "h-16 placeholder-text-start"
      } p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14'}`}
      placeholder={Placeholder}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, nextRef)}
      style={{ resize: "none", overflowY: "auto", textAlign: "left" }} // Align text to the left
    />
  );
}
