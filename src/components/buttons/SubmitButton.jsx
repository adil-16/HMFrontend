import { Button } from "@material-tailwind/react";
import React from "react";

const SubmitButton = ({ text, submit }) => {
  return (
    <Button
      className="bg-orange flex justify-center items-center h-10 focus:outline-none w-auto md:w-40 m-2"
      onClick={() => submit()}
    >
      <p className="font-Nunitoo font-medium text-14 text-white">{text}</p>
    </Button>
  );
};

export default SubmitButton;
