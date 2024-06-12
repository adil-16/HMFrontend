import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import PackageTop from "../../components/TableTop/PackageTop";
import AddPackage from "../../components/popup/AddPackage";
import PackageCard from "./PackageCard";
import axios from "../../axios";

const Store = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [book, setBook] = useState(false);
  const [data, setData] = useState([]);
  const [addHotel, setAddHotel] = useState(false);
  const [packageId, setPackageId] = useState(false);

  useEffect(() => {
    const getPackages = async () => {
      await axios
        .get("/package/packages")
        .then((res) => {
          setData(res.data.data.packages);
          console.log("data is", res.data.data.packages);
        })
        .catch((err) => {
          // Handle error
        });
    };
    getPackages();
  }, [addHotel]);

  return (
    <div className="w-full">
      <TopBar title="Hotels" />
      <div className="p-1 sm:p-4 py-6">
        <PackageTop
          selectedNo={0}
          type="Store"
          button="+ Add Package"
          setShowPopup={setShowPopup}
          setData={setData}
        
        />
        <div className="flex flex-wrap justify-start gap-10 m-1">
          {data?.map((val, ind) => (
            <PackageCard
              data={val}
              key={ind}
              setBook={setBook}
              setPackageId={setPackageId}
            />
          ))}
        </div>
      </div>

      {showPopup && (
        <AddPackage
          onClose={() => setShowPopup(false)}
          heading="New Hotel"
          setAddHotel={setAddHotel}
        />
      )}
    </div>
  );
};

export default Store;
