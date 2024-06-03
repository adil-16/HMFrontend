import React, { useState, useEffect } from 'react'
import TopBar from '../../components/bars/TopBar'
import BookingCard from './bookingCard'
import SearchFiels from '../../components/inputFields/SearchFiels';
import Searchh from '../../assets/search.svg'
import {useLocation } from "react-router-dom";
import axios from '../../axios'

const booking = () => {
  
  const locationn = useLocation();
  const initialUserState = locationn.state ? locationn.state.id : null; // Handle null or undefined state
  const [bookings, setBookings] = useState([])

  const [Search, setSearch] = useState(' ')

  useEffect(() => {
    const getBookings = async () => {
      await axios
        .get("/hotel/getAllBooking")
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
      <div className='m-4 pr-10 flex justify-end w-full '>
      <SearchFiels
            value={Search}
            setValue={setSearch}
            Bg="white"
            Placeholder="Search"
            PlaceholderColor="darkGray2"
            iconn={Searchh}
            search='hotel/booking'
            setData={setBookings}
          />
      </div>
      <div className='flex flex-col gap-x-2 m-4'>
      {bookings?.map((val, ind) => {
        return  <BookingCard data={val} key={ind} /> 
      })}
      </div>
      
    </div>
  )
}

export default booking
