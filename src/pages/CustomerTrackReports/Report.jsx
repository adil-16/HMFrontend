import React, { useState } from 'react';
import TopBar from "../../components/bars/TopBar";
import ReportForm from "../../components/forms/Arrival_Dep_Reports";
import { useNavigate } from 'react-router-dom';


const CustomerReport = () => {
    const navigate= useNavigate();
    const [title, setTitle] = useState("");

    const titleCallback = (data) => {
        setTitle(data);
      }


  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className='w-full'>
      <TopBar title="Arrival/Departure Intimation" />
      <p className='ml-4 mr-4 mt-6 mb-4 text-20 font-Nunitoo font-bold bg-orange p-4 rounded-lg'>Search Criteria</p>
      <div className="p-4">
        <ReportForm onSubmit = {handleSubmit} setTitle = {titleCallback} />
      </div>
    </div>
  );
};

export default CustomerReport;
