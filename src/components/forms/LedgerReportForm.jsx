import React, { useState, useEffect } from "react";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import Select from "react-select";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import moment from "moment";

const schema = yup.object().shape({
  account: yup.object().required("Account is required"),
  reportCurrency: yup.string().required("Report currency is required"),
  startDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Start date is required")
    .nullable(),
  endDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("End date is required")
    .min(yup.ref("startDate"), "End date cannot be before start date")
    .nullable(),
});

const LedgerReportForm = ({ onSubmit }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reportCurrency: "SAR",
    },
  });

  const getSuppliers = async () => {
    try {
      const res = await axios.get("/user/getSuppliers");
      setSuppliers(res.data.data.suppliers);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch suppliers.");
    }
  };

  const getCustomers = async () => {
    try {
      const res = await axios.get("/user/getCustomers");
      setCustomers(res.data.data.customers);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch customers.");
    }
  };

  const getBanks = async () => {
    try {
      const res = await axios.get("/bank/getBanks");
      setBanks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch banks.");
    }
  };

  useEffect(() => {
    getSuppliers();
    getCustomers();
    getBanks();
  }, []);

  const accountOptions = [
    { value: "cashAccount", label: "Cash Account" },
    ...suppliers.map((supplier) => ({
      value: `${supplier.id} Account`,
      label: `${supplier.contactPerson} Account (Supplier)`,
    })),
    ...customers.map((customer) => ({
      value: `${customer.id} Account`,
      label: `${customer.contactPerson} Account (Customer)`,
    })),
    ...banks?.map((bank) => ({
      value: `${bank._id} Account`,
      label: `${bank.bankName} Account (Bank)`,
    })),
  ];

  const submit = async (data) => {
    setLoading(true);
    const { account, reportCurrency, startDate, endDate } = data;
    const { value: accountType } = account || {};

    if (!startDate || !endDate) {
      console.error("Start date and end date are required.");
      toast.error("Start date and end date are required.");
      setLoading(false);
      return;
    }
    const fromDate = moment(startDate).format("YYYY-MM-DD");
    // console.log("from date", fromDate);
    const toDate = moment(endDate).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");

    try {
      if (accountType === "cashAccount") {
        console.log("dates", fromDate, toDate);
        const response = await axios.get(`ledger/filterAdminLedger`, {
          params: { from: fromDate, to: toDate, currency: reportCurrency },
        });

        if (response.status !== 200) {
          throw new Error("Failed to filter ledgers");
        }
        navigate("/admin/ledger", {
          state: {
            ledgerData: response.data.ledgers,
            userName: "Cash Account",
            totalBalance:
              response.data.ledgers.length > 0
                ? response.data.ledgers[0].totalBalance
                : 0,
            fromDate,
            toDate,
            reportCurrency,
            printDate: currentDate,
          },
        });
        console.log("dates after", fromDate, toDate);

        toast.success("Ledger report generated successfully.");
      } else {
        const selectedUserId = accountType.split(" ")[0];
        const selectedUser = account.label.split(" ")[0];

        const response = await axios.get(
          `/ledger/filterLedger/${selectedUserId}`,
          {
            params: {
              from: fromDate,
              to: toDate,
              currency: reportCurrency,
            },
          }
        );

        const totalBalance =
          response.data.ledgers.length > 0
            ? response.data.ledgers[0].totalBalance
            : 0;

        navigate("/admin/ledger", {
          state: {
            ledgerData: response.data.ledgers,
            userName: selectedUser,
            totalBalance,
            fromDate,
            toDate,
            reportCurrency,
            printDate: currentDate,
          },
        });
        toast.success("Ledger report generated successfully.");
      }
    } catch (error) {
      console.error("Error filtering ledgers:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "No ledger entries found between the selected interval."
      ) {
        toast.error("No ledger entries found between the selected interval");
      } else {
        toast.error("Error generating ledger report.");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="p-4 bg-black rounded-lg">
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Account</label>
        <Controller
          name="account"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={accountOptions}
              placeholder="Select or type to search"
              className="w-1/2 bg-white text-black"
              classNamePrefix="react-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "white",
                  borderColor: "black",
                  color: "black",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "black",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "black",
                }),
              }}
              onChange={(value) => setValue("account", value)}
            />
          )}
        />
        {errors.account && (
          <p className="text-red-500">{errors.account.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">
          Report Currency
        </label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="reportCurrency"
              value="SAR"
              defaultChecked={true}
              // checked={"reportCurrency" === "SAR"}
              onChange={() => setValue("reportCurrency", "SAR")}
              className="form-radio"
              {...register("reportCurrency")}
            />
            <span className="ml-2">SAR</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="reportCurrency"
              value="PKR"
              // checked={"reportCurrency" === "PKR"}
              onChange={() => setValue("reportCurrency", "PKR")}
              className="form-radio"
              {...register("reportCurrency")}
            />
            <span className="ml-2">PKR</span>
          </label>
        </div>
        {errors.reportCurrency && (
          <p className="text-red-500">{errors.reportCurrency.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">Start Date</label>
        <input
          type="date"
          {...register("startDate")}
          className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
        />
        {errors.startDate && (
          <p className="text-orange">{errors.startDate.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-orange font-medium mb-2">End Date</label>
        <input
          type="date"
          {...register("endDate")}
          className="border border-blue3 bg-black text-white focus:outline-none rounded-md p-2 w-auto"
        />
        {errors.endDate && (
          <p className="text-orange">{errors.endDate.message}</p>
        )}
      </div>
      <div className="flex justify-start mt-12">
        <SubmitButton
          text="Generate Report"
          submit={handleSubmit(submit)}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default LedgerReportForm;
