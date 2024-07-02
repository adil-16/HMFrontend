import React, { useState, useEffect } from 'react';
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import Select from 'react-select';
import axios from "../../axios";
import { useNavigate } from 'react-router-dom';

const LedgerReportForm = ({ onSubmit }) => {
  const [account, setAccount] = useState(null);
  const [reportCurrency, setReportCurrency] = useState('SAR');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const getSuppliers = async () => {
    try {
      const res = await axios.get("/user/getSuppliers");
      setSuppliers(res.data.data.suppliers);
    } catch (err) {
      console.error(err);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await axios.get("/user/getCustomers");
      setCustomers(res.data.data.customers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSuppliers();
    getCustomers();
  }, []);

  const accountOptions = [
    { value: 'cashAccount', label: 'Cash Account' },
    ...suppliers.map(supplier => ({
      value: `${supplier.id} Account`,
      label: `${supplier.contactPerson} Account (Supplier)`
    })),
    ...customers.map(customer => ({
      value: `${customer.id} Account`,
      label: `${customer.contactPerson} Account (Customer)`
    }))
  ];

  
  const handleSubmit = async (e) => {
    // e.preventDefault();

    const { value: accountType } = account || {};
    const fromDate = startDate;
    const toDate = endDate;
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      if (accountType === 'cashAccount') {
        // Cash Account API call
        const response = await axios.get(`ledger/filterAdminLedger`, {
          params: { from: fromDate, to: toDate },
        });

        if (response.status !== 200) {
          throw new Error("Failed to filter ledgers");
        }
        navigate("/admin/ledger", { 
          state: {
            ledgerData: response.data.ledgers,
            userName: 'Cash Account', 
            totalBalance: response.data.ledgers.length > 0 ? response.data.ledgers[0].totalBalance : 0,
            fromDate,
            toDate,
            printDate: currentDate,
          },
        });
      } else {
        // Supplier or Customer API call
        const selectedUserId = accountType.split(' ')[0];
        const selectedUser = account.label.split(' ')[0];

        const response = await axios.get(`/ledger/filterLedger/${selectedUserId}`, {
          params: {
            from: fromDate,
            to: toDate,
          },
        });

        const totalBalance = response.data.ledgers.length > 0 ? response.data.ledgers[0].totalBalance : 0;

        navigate("/admin/ledger", { 
          state: {
            ledgerData: response.data.ledgers,
            userName: selectedUser, 
            totalBalance,
            fromDate,
            toDate,
            printDate: currentDate,
          },
        });
      }
    } catch (error) {
      console.error("Error filtering ledgers:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black rounded-lg">
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Account</label>
        <Select
          options={accountOptions}
          value={account}
          onChange={setAccount}
          placeholder="Select or type to search"
          className="w-1/2 bg-white text-black"
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: 'white',
              borderColor: 'black',
              color: 'black',
            }),
            input: (provided) => ({
              ...provided,
              color: 'black',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
            }),
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Report Currency</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="currency"
              value="SAR"
              checked={reportCurrency === 'SAR'}
              onChange={() => setReportCurrency('SAR')}
              className="form-radio"
            />
            <span className="ml-2">SAR</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
        />
      </div>
      <div className="flex justify-start mt-12">
        <SubmitButton text="Generate Report" submit={handleSubmit} />
      </div>
    </form>
  );
};

export default LedgerReportForm;
