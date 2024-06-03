import React, {useState} from 'react'
import Avatar from "../../assets/Avatar.svg";

const BookingCard = ({data}) => {
    
  const [url] = useState(import.meta.env.VITE_API_URL);
  return (
    <div className='border border-white rounded-lg w-auto md:w-1/3 p-3'>
      <div className='flex flex-wrap items-center gap-x-4'>
        <div className='w-20 h-20'>
        {data.customerDetails.image == null ? (
            <img
              src={Avatar}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          ) : (
            <img
              src={`${url}${data.customerDetails.image}`}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          )}
        </div>

        <p className="font-Nunitoo text-24 lg:text-32 font-bold text-white">
            {data.customerDetails.name}
          </p>
      </div>

      {/* div 1 */}

      <div className='flex flex-col my-3 '>
      <div className='flex justify-between'>
      <div>
      <p className="font-Nunitoo text-12 lg:text-16 font-bold text-white">
            Room Type: {data.roomType} 
          </p>

          <div>
      <p className="font-Nunitoo text-12 lg:text-16 font-bold text-white">
            Booking From: 
          </p>
          <p className="font-Nunitoo text-12 lg:text-12 font-bold text-orange ml-3">
          {new Date(data.Booking.from).toLocaleDateString()}
          </p>
      </div>
      </div>

      {/* div 2 */}

      <div>
      <p className="font-Nunitoo text-12 lg:text-16 font-bold text-white">
            Room Number: {data.roomNumber}
          </p>
          <div>
      <p className="font-Nunitoo text-12 lg:text-16 font-bold text-white">
            Booking To: 
          </p>
          <p className="font-Nunitoo text-12 lg:text-12 font-bold text-orange ml-3">
          {new Date(data.Booking.to).toLocaleDateString()}
          </p>
      </div>
      </div>
      </div>
      
      </div>
    </div>
  )
}

export default BookingCard
