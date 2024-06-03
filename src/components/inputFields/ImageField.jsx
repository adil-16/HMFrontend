import React, { useState, useRef } from "react";
import CloseEye from "../../assets/pen.svg";

const ImageField = ({ bg, setImg }) => {
    const fileInputRef = useRef(null);
  const [image, setImage] = useState('Change Profile Image');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file)
    setImage(file.name);
    // setImage(URL.createObjectURL(file));
  };


  return (
    <div>
      <div
        className={`relative border border-blue3 bg-${bg} focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full`}
      >
        <p className="font-Nunitoo text-blue2 text-14 ">{image}</p>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <label>
          <div
            className={`focus:outline-none bg-transparent border-none hover:border-transparent cursor-pointer`}
          >
            <img src={CloseEye} alt="Close Eye" className="h-4 w-4 " />
            </div>
            <input
              type="file"
              id="profileImageInput"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            </label>
        </div>
      </div>
    </div>
  );
};

export default ImageField;
