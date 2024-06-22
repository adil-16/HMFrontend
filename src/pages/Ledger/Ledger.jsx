import React, { useEffect, useState } from "react";
import TopBar from "../../components/bars/TopBar";
import TableTop from "../../components/TableTop/TableTop";
import { LedgerTable } from "../../components/table/Table";
import LedgerTop from "./LedgerTop";
import { useLocation } from "react-router-dom";

const Ledger = () => {
  const [selectedNo, setSelectedNo] = useState(0);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const location = useLocation();
  const {
    supplierName = "N/A",
    totalBalance = 0,
    fromDate = "N/A",
    toDate = "N/A",
  } = location.state || {};
  const ledgerData = location.state?.ledgerData || [];
  



  const [tableHeader, setTableHeader] = useState([
    "Date",
    "Type",
    "Trans.#",
    "Particulars",
    "Inv/Ref",
    "Cheque No",
    "Debit",
    "Credit",
    "Balance",
  ]);

  useEffect(() => {
    if (ledgerData.length > 0) {
      setData(ledgerData);
    }
    console.log("ledger data", ledgerData); // Log ledger data to verify
  }, [ledgerData]);


    console.log("dataaaaa", data)

  return (
    <div className="w-full">
      <TopBar title="Ledgers" />
      {/* body */}
      <div className="p-1 sm:p-8 py-6">
        <TableTop
          selectedNo={selectedNo}
          setData={setData}
          type="Ledgers"
          // button="+ Add Customer"
          setShowPopup={setShowPopup}
          search="ledger"
        />

        <LedgerTop
          accountCode="0312156"
          accountTitle={supplierName}
          balance= {totalBalance}
          periodFrom= {fromDate}
          periodTo= {toDate}
          printDate= {fromDate}
          currency="PKR"
        />
        <div className="mx-1">
          <LedgerTable
            tableHeader={tableHeader}
            data={data}
            setData={setData}
          />
        </div>
      </div>
    </div>
  );
};

export default Ledger;
