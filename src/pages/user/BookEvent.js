import React, { useEffect, useState } from 'react'
import { fetchEvent } from '../../services/userServiceHelpers'
import { useParams } from 'react-router-dom';

const BookEvent = () => {
  const { id } = useParams();

    const [event,setEvent] =  useState([])
    useEffect(()=>{
      fetchEvent(id)
      .then(res =>{
        setEvent(res.data)
      })
    },[])

    const [selectedSeats, setSelectedSeats] = useState([]);

    function handleSeatClick(seat) {
      setSelectedSeats(prevSelectedSeats => {
        if (prevSelectedSeats.includes(seat)) {
          // If seat is already selected, remove it from selectedSeats array
          return prevSelectedSeats.filter(selectedSeat => selectedSeat !== seat);
        } else {
          // If seat is not selected, add it to selectedSeats array
          return [...prevSelectedSeats, seat];
        }
      });
    }
  return (
    <>
      {event.fees===0 ? <h2 className=' text-center font-black text-lg uppercase mt-5'> booking not required. this is free event </h2>:
      <>
      <div 
      className='w-1/3 mt-8 mx-auto grid grid-cols-12 '
      >
        {Array.from({ length: event.totalSeat }).map((_, i) => (
          <div key={i} 
          className={`w-5 h-5 m-1 bg-${selectedSeats.includes(i) ? 'bg-red-500' : 'slate-400'}`}
          onClick={() => handleSeatClick(i)}
                  />
        ))}
      </div>
    </>
    
      
      }

      
    </>
  )
}

export default BookEvent
