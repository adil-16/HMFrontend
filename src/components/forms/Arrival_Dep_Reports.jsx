import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from "../../axios";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import { useNavigate } from 'react-router-dom';

const Arrival_Dep_Reports = ({ onSubmit, setTitle }) => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('Arrival Intimation');
  const [duration, setDuration] = useState('Today');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [hotels, setHotels] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [voucherStatus, setVoucherStatus] = useState('Both');
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const getCustomers = async () => {
    await axios
      .get("/user/getCustomers")
      .then((res) => {
        console.log("data is", res.data);
        setCustomers(res.data.data.customers); 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getHotels = async () => {
    await axios
      .get("/hotel/getHotels")
      .then((res) => {
        console.log("data is hotels ", res.data);
        setHotels(res.data.data.hotels);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getVouchers = async () => {
    await axios
      .get("/hotel-voucher/vouchers")
      .then((res) => {
        console.log("data in voucher", res.data);
        setVouchers(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCustomers();
    getHotels();
    getVouchers();
    setTitle(reportType);
  }, [reportType]);



  const handleFormSubmit = async(e) => {
    // e.preventDefault();
    setLoading(true);
    setError('');
    const formData = {
      customerId: selectedCustomer?.value,
      reportType,
      duration,
      fromDate: duration === 'Custom' ? fromDate : '',
      toDate: duration === 'Custom' ? toDate : '',
      hotelId: selectedHotel?.value,
      confirmationStatus: voucherStatus === 'Both' ? "Both" : voucherStatus,
    };
    try {
      const res = await axios.get("/hotel-voucher/filtered-vouchers", { params: formData });
      const { vouchers, paxCounts } = res.data.data;
      console.log("data in filtered vouceher", res.data.data);
      onSubmit(res.data.data.vouchers);
      setVouchers(res.data.data.vouchers);
      setLoading(false);
      navigate('/admin/report', { state: { title: reportType, paxCounts, vouchers } });
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch vouchers. Please try again.');
      console.error(err);
    }
  };


  return (
    <form onSubmit={handleFormSubmit} className="p-4 bg-black rounded-lg">
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Report Type</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full bg-white text-black p-2 rounded-md"
        >
          <option value="Arrival Intimation">Arrival Intimation</option>
          <option value="Departure Intimation">Departure Intimation</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Duration</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="duration"
              value="Today"
              checked={duration === 'Today'}
              onChange={() => setDuration('Today')}
              className="form-radio"
            />
            <span className="ml-2">Today</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="duration"
              value="Tomorrow"
              checked={duration === 'Tomorrow'}
              onChange={() => setDuration('Tomorrow')}
              className="form-radio"
            />
            <span className="ml-2">Tomorrow</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="duration"
              value="Custom"
              checked={duration === 'Custom'}
              onChange={() => setDuration('Custom')}
              className="form-radio"
            />
            <span className="ml-2">Custom</span>
          </label>
        </div>
      </div>
      {duration === 'Custom' && (
        <>
          <div className="mb-4">
            <label className="block text-orange font-medium mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
            />
          </div>
          <div className="mb-4">
            <label className="block text-orange font-medium mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
            />
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Hotel</label>
        <Select
          options={hotels.map(hotel => ({ value: hotel.id, label: hotel.name }))}
          value={selectedHotel}
          onChange={setSelectedHotel}
          placeholder="Select a hotel"
          className="w-full bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Customer</label>
        <Select
          options={customers.map(customer => ({ value: customer.id, label: `${customer.contactPerson} (${customer.customerType}) ` }))}
          value={selectedCustomer}
          onChange={setSelectedCustomer}
          placeholder="Select a customer"
          className="w-full bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Voucher Status</label>
        <select
          value={voucherStatus}
          onChange={(e) => setVoucherStatus(e.target.value)}
          className="w-full bg-white text-black p-2 rounded-md"
        >
          <option value="Confirmed">Confirmed</option>
          <option value="Tentative">Tentative</option>
          <option value="Both">Both</option>
        </select>
      </div>
      <div className="flex justify-start mt-12">
        <SubmitButton text="Generate Report" submit={handleFormSubmit} />
      </div>
    </form>
  );
};

export default Arrival_Dep_Reports;
