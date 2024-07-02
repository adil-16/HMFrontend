import React, { useState, useEffect } from "react";
import TopBar from "../../components/bars/TopBar";
import TableTop from "../../components/TableTop/TableTop";
import AddHotel from "../../components/popup/AddHotel";

import AddUser from "../../components/popup/addUser";
// import BookRoom from "../../components/popup/BookRoom";
import HotelCard from "./HotelCard";
import axios from "../../axios";

const Store = () => {
  console.log("hjl");
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
      axios
        .get("/hotel/getHotels")
        .then((res) => {
          setData(res?.data?.data?.hotels);
          console.log("data is", res?.data?.data?.hotels);
          setLoading(false)
        })
        .catch((err) => {
          // //   setCategoryapi(true)
          // setLoader(false)
          //   setError(err.response.data.data.error);
          setLoading(false)
        })
        
    };
    getHotels();
  }, [addHotel]);

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
          setData={setData}
          search="hotel"
        />
         <div className="flex flex-wrap justify-start gap-10 m-1">
          {loading? 
          (
            <div>loading ... </div>
          ): ( data?.length === 0 ? (
            <p className="text-center text-gray-500">No Hotels to show</p>
          ) : (
            
              
            console.log("data: qasim", data)
            
            // data?.map((val, ind) => (
            //   // <HotelCard
            //   //   data={val}
            //   //   key={val.id || ind}
            //   //   setBook={setBook}
            //   //   setHotelId={setHotelId}
            //   // />
            //   <div key={val.id}>123</div>
            // ))
          ))  
        }
          
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
