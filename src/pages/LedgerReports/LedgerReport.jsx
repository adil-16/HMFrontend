import React from 'react';
import TopBar from "../../components/bars/TopBar";
import LedgerReportForm from '../../components/forms/LedgerReportForm';


const LedgerReport = () => {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className='w-full'>
      <TopBar title="Ledger Report" />
      <div className="p-4">
        <LedgerReportForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LedgerReport;
