import React, { useState, useEffect } from 'react'
import TopBar from '../../components/bars/TopBar'
import BookingCard from './BookingCard'

import {useLocation } from "react-router-dom";
import axios from '../../axios'

const bookingHotel = () => {
  
  const locationn = useLocation();
  const initialUserState = locationn.state ? locationn.state.id : null; // Handle null or undefined state
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      await axios
        .get("/hotel/getBookedRooms/"+initialUserState)
        .then((res) => {
          setBookings(res.data.data.rooms);
          console.log("data is", res.data.data.rooms);
        })
        .catch((err) => {
          // //   setCategoryapi(true)
          // setLoader(false)
          //   setError(err.response.data.data.error);
        });
    };
    getBookings();
  }, []);

 
  return (
    <div>
      <TopBar title="Bookings" />
      <div className='flex flex-col sm:flex-row gap-x-2 m-4'>
      {bookings?.map((val, ind) => {
        return  <BookingCard data={val} key={ind} /> 
      })}
      </div>
      
    </div>
  )
}

export default bookingHotel;
