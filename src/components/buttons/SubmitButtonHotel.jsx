import { Button } from "@material-tailwind/react";
import React from "react";
import CircularLoader from "../CircularLoader";

const SubmitButton = ({ text, submit, loading }) => {
  return (
    <Button
      className="bg-orange flex justify-center items-center h-10 focus:outline-none w-auto md:w-40 m-2"
      onClick={() => submit()}
      disabled={loading} // Disable button when loading
    >
      {loading ? (
        <CircularLoader size={6} color="white" /> // Render circular loader if loading
      ) : (
        <p className="font-Nunitoo font-medium text-14 text-white">{text}</p> // Render text otherwise
      )}
    </Button>
  );
};

export default SubmitButton;
