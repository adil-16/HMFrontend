import React, { useState, useEffect } from "react";
import Cross from "../../assets/cross.svg";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import axios from "../../axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Loader from "../../components/CircularLoader";

const schema = yup.object().shape({
  voucherType: yup.string().required("Voucher type is required"),
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  paymentMethod: yup.string().required("Payment method is required"),
  bankId: yup.string().when("paymentMethod", {
    is: "bank",
    then: (schema) => schema.required("Bank is required"),
  }),
  supId: yup.string().when("voucherType", {
    is: "Cash Payment Voucher",
    then: (schema) => schema.required("Supplier is required"),
  }),
  cusId: yup.string().when("voucherType", {
    is: "Cash Receipt Voucher",
    then: (schema) => schema.required("Customer is required"),
  }),
});

const CashVoucherPopup = ({ onClose }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [role, setRole] = useState("cash");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const voucherType = watch("voucherType");
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const res = await axios.get("/user/getSuppliers");
        setSuppliers(res.data.data.suppliers);
      } catch (err) {
        console.error(err);
      }
    };
    getSuppliers();
  }, []);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get("/user/getCustomers");
        setCustomers(res.data.data.customers);
      } catch (err) {
        console.error(err);
      }
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const getBanks = async () => {
      try {
        const res = await axios.get("/bank/getBanks");
        setBanks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getBanks();
  }, []);

  useEffect(() => {
    paymentMethod === "cash" ? setRole("cash") : setRole("bank");
  }, [paymentMethod]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const url =
        voucherType === "Cash Payment Voucher"
          ? "/payment-voucher/debitpayment"
          : "/payment-voucher/debitreceipt";
      const response = await axios.post(url, { ...data, role });
      toast.success("Voucher submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting voucher:", error);
      toast.error("Error submitting voucher!");
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-black border border-white p-4 rounded-xl shadow-md px-6 md:px-8">
        <div
          className="absolute top-2 right-2 cursor-pointer bg-orange rounded-full"
          onClick={onClose}
        >
          <img
            src={Cross}
            alt={"cross-icon"}
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-Nunitoo text-orange text-19 sm:text-24 font-medium pt-2 pb-2">
            Cash Vouchers
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Voucher Type
            </label>
            <Controller
              name="voucherType"
              control={control}
              defaultValue="Cash Payment Voucher"
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="Cash Payment Voucher">
                    Cash Payment Voucher
                  </option>
                  <option value="Cash Receipt Voucher">
                    Cash Receipt Voucher
                  </option>
                </select>
              )}
            />
            {errors.voucherType && (
              <p className="text-red-500">{errors.voucherType.message}</p>
            )}
          </div>

          {voucherType === "Cash Payment Voucher" && (
            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                Supplier
              </label>
              <Controller
                name="supId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.contactPerson}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.supId && (
                <p className="text-red-500">{errors.supId.message}</p>
              )}
            </div>
          )}

          {voucherType === "Cash Receipt Voucher" && (
            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                Customer
              </label>
              <Controller
                name="cusId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((cus) => (
                      <option key={cus.id} value={cus.id}>
                        {cus.contactPerson}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.cusId && (
                <p className="text-red-500">{errors.cusId.message}</p>
              )}
            </div>
          )}

          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Amount
            </label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="block w-full bg-black border text-white border-gray py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="mt-3">
            <div className="block font-Nunitoo font-medium text-orange text-14 py-2">
              Payment Method
            </div>
            <div className="flex items-center">
              <Controller
                name="paymentMethod"
                control={control}
                defaultValue="cash"
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="radio"
                      value="cash"
                      checked={field.value === "cash"}
                      className="mr-2"
                    />
                    <label htmlFor="cash" className="mr-6 text-white">
                      Cash
                    </label>
                    <input
                      {...field}
                      type="radio"
                      value="bank"
                      checked={field.value === "bank"}
                      className="mr-2"
                    />
                    <label htmlFor="bank" className="text-white">
                      Bank
                    </label>
                  </>
                )}
              />
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500">{errors.paymentMethod.message}</p>
            )}
          </div>

          {paymentMethod === "bank" && (
            <div className="mt-3">
              <label className="block font-Nunitoo font-medium text-orange text-14 py-2">
                Bank
              </label>
              <Controller
                name="bankId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border border-blue3 bg-black text-white rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  >
                    <option value="">Select Bank</option>
                    {banks?.map((bank) => (
                      <option key={bank._id} value={bank._id}>
                        {bank.bankName}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.bankId && (
                <p className="text-red-500">{errors.bankId.message}</p>
              )}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <SubmitButton
              text="Submit"
              submit={handleSubmit(onSubmit)}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashVoucherPopup;
