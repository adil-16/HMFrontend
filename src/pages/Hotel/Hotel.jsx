import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import TableTop from "./TableTopHotel";
import AddHotel from "../../components/popup/AddHotel";

import AddUser from "../../components/popup/addUser";
// import BookRoom from "../../components/popup/BookRoom";
import HotelCard from "./HotelCard";
import axios from "../../axios";

const Store = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [book, setBook] = useState(false);
  const [data, setData] = useState([]);
  const [addHotel, setAddHotel] = useState(false);
  const [hotelId, setHotelId] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const res = await axios.get("/hotel/getHotels");
        setData(res?.data?.data?.hotels);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    getHotels();
  }, [addHotel]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <TopBar title="Hotels" />
      {/* body */}
      <div className="p-1 sm:p-4 py-6">
        <TableTop
          selectedNo={0}
          type="Store"
          button="+ Add Hotel"
          setShowPopup={setShowPopup}
          // setData={setData}
          search="hotel"
        />
        <div className="flex flex-wrap justify-start gap-10 m-1">
          {data?.length === 0 ? (
            <p className="text-center text-gray-500">No Hotels to show</p>
          ) : (
            data?.map((val, ind) => (
              <HotelCard
                data={val}
                key={val.id || ind}
                setBook={setBook}
                setHotelId={setHotelId}
              />
            ))
          )}
        </div>
      </div>

      {showPopup && (
        <>
          <AddHotel
            onClose={() => setShowPopup(false)}
            heading="New Hotel"
            setAddHotel={setAddHotel}
          />
        </>
      )}

      {/* add user */}

      {showAddUser && (
        <>
          <AddUser
            onClose={() => setShowAddUser(false)}
            heading="Add Customer"
            setAdded={setAdded}
            guest={true}
          />
        </>
      )}
    </div>
  );
};

export default Store;
