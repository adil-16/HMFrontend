import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";

const CashVoucherPopup = ({ onClose }) => {
    const [voucherType, setVoucherType] = useState("Cash Payment Voucher");
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [customer, setCustomer] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
  
    const getSuppliers = async () => {
      await axios
        .get("/user/getSuppliers")
        .then((res) => {
          console.log("data is", res.data);
          setSuppliers(res.data.data.suppliers); 
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      getSuppliers();
    }, []);
  
    const handleSubmit = async () => {
      const data = {
        voucherType,
        title,
        amount,
        role: "cash",
      };
  
      if (voucherType === "Cash Payment Voucher") {
        data.supId = selectedSupplier;
      } else {
        data.customer = customer;
      }
  
      try {
        const url =
          voucherType === "Cash Payment Voucher"
            ? "/payment-voucher/debitpayment"
            : "/receipt-voucher/debitreceipt";
        const response = await axios.post(url, data);
        console.log("Voucher submitted:", response.data);
        onClose();
      } catch (error) {
        console.error("Error submitting voucher:", error);
      }
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8">
        <div
          className="absolute top-2 right-2 cursor-pointer bg-orange rounded-full"
          onClick={onClose}
        >
          <img src={Cross} alt={"cross-icon"} className="w-5 h-5 sm:w-8 sm:h-8" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium pt-2 pb-2">
            Cash Vouchers
          </h2>
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
            Voucher Type
          </label>
          <select
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
            className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            <option value="Cash Payment Voucher">Cash Payment Voucher</option>
            <option value="Cash Receipt Voucher">Cash Receipt Voucher</option>
          </select>
        </div>

        {voucherType === "Cash Payment Voucher" && (
          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Supplier
            </label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            >
              <option value="">Select Supplier</option>
              {suppliers?.length>0 ? suppliers.map((sup,index)=>{
                return <option key={index} value={sup.id}>{sup.name}</option>
              }) :"No supplier to show!"}
            </select>
          </div>
        )}

        {voucherType === "Cash Receipt Voucher" && (
          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Customer
            </label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="block w-full bg-white border text-black border-gray py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            />
          </div>
        )}

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <div className="mt-3">
          <label className="block font-Nunitoo font-medium text-orange text-14 py-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <div className="flex justify-center my-2 sm:mt-8 sm:mb-10">
          <SubmitButton text="Submit" submit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CashVoucherPopup;
