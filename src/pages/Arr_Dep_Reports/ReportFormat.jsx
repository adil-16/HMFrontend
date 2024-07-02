import React, { useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import ReportTable from "./ReportTable";
import axios from "../../axios";

const getPaxType = (age) => {
  if (age >= 0 && age <= 2) return "infant";
  if (age >= 3 && age <= 12) return "child";
  if (age > 12) return "adult";
  return "unknown";
};

const calculatePaxCounts = (vouchers) => {
  return vouchers.map((voucher) => {
    let adultCount = 0;
    let childCount = 0;
    let infantCount = 0;

    const customerAge = voucher.age;
    if (customerAge !== undefined) {
      const customerType = getPaxType(customerAge);
      if (customerType === "adult") adultCount++;
      if (customerType === "child") childCount++;
      if (customerType === "infant") infantCount++;
    }

    if (voucher.passengers && Array.isArray(voucher.passengers)) {
      voucher.passengers.forEach((passenger) => {
        const passengerAge = passenger.age;
        if (passengerAge !== undefined) {
          const passengerType = getPaxType(passengerAge);
          if (passengerType === "adult") adultCount++;
          if (passengerType === "child") childCount++;
          if (passengerType === "infant") infantCount++;
        }
      });
    }

    voucher.paxCounts = { adultCount, childCount, infantCount };
    return voucher;
  });
};

const ReportFormat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, vouchers = [] } = location.state || {};

  // Calculate pax counts for each voucher
  const processedVouchers = calculatePaxCounts(vouchers);

  const remData = processedVouchers.map((voucher) => {
    const arrivalDate =
      voucher.accommodations.length > 0
        ? new Date(voucher.accommodations[0].checkin).toISOString().slice(0, 10)
        : null;
    const depDate =
      voucher.accommodations.length > 0
        ? new Date(voucher.accommodations[0].checkout)
            .toISOString()
            .slice(0, 10)
        : null;
    return {
      voucherNum: voucher.voucherNumber,
      party: voucher.customer.contactPerson,
      arrivalDate: title === "Arrival Intimation" ? arrivalDate : depDate,
      adult: voucher.paxCounts.adultCount,
      child: voucher.paxCounts.childCount,
      infant: voucher.paxCounts.infantCount,
      id: voucher._id,
    };
  });

  console.log("Report table data", remData);

  console.log("Title in report", title);
  console.log("Vouchers in report", vouchers);

  const handleShowVoucher = async (voucherId) => {
    try {
      // Fetch detailed voucher data using Axios
      const response = await axios.get(`/hotel-voucher/vouchers/${voucherId}`);
      const data = response.data.data.voucher;
      console.log("abc data", data.accommodations);
      // Navigate to detailed voucher view with state
      navigate(`/admin/hotel-voucher/${voucherId}`, {
        state: {
          voucher: {
            ...data,
            voucherNumber: `V-${data.voucherNumber}`, // Adjust as needed
          },
          accomodationsData: data.accommodations.map((room) => ({
            ...room,
            hotelName: room.hotel?.name || "",
            hotelCity: room.hotel?.location || "",
          })),
        },
      });
    } catch (error) {
      console.error("Error fetching voucher details:", error);
      // Handle error appropriately, e.g., show error message
    }
  };

  return (
    <div className="w-full">
      <TopBar title={title} />
      <div className="mb-2 mt-10">
        <ReportTable
          data={remData}
          title={title}
          handleShowVoucher={handleShowVoucher}
        />
      </div>
    </div>
  );
};

export default ReportFormat;
