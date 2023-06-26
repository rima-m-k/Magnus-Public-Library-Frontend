import React, { useEffect, useState } from "react";
import { bookEvent, fetchEvent, getKey } from "../../services/userServiceHelpers";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewEvent = () => {
  const { id } = useParams();
  const token = localStorage.getItem("currentUser");

  const Navigate = useNavigate()
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const [event, setEvent] = useState([])
  useEffect(() => {
    fetchEvent(id)
      .then(res => {
        setEvent(res.data)
      })
  }, [])




  const [numSeats, setNumSeats] = useState(1);
  const seatPrice = event.fees; // Price for a single seat

  const handleNumSeatsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumSeats(value);
  };

  const handleBooking = () => {
    // Logic for handling the booking with the specified number of seats
    // You can perform any necessary calculations or API requests here
    const totalPrice = numSeats * seatPrice;
    let key
    getKey()
      .then(res => {
        console.log(res.data)
        key = res.data.key
      })
    bookEvent({ numSeats, totalPrice, id })
      .then(res => {
        console.log(res.data)
        const options = {
          key: key, // Enter the Key ID generated from the Dashboard
          amount: res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Magnus Public Library", //your business name
          description: "Event Booking",
          image: "https://example.com/your_logo",
          order_id: res.data.order.id,
          callback_url: "http://localhost:8000/payment",
          prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: "Gaurav Kumar", //your customer's name
            email: "gaurav.kumar@example.com",
            contact: "9000090000" //Provide the customer's phone number for better conversion rates 
          },
          notes: {
            "address": "Razorpay Corporate Office"
          },
          theme: {
            "color": "#3399cc"
          }
        };
        const razor = new window.Razorpay(options);
        razor.open();


      })
      .catch(err => {
        console.log(err)
      })



    // console.log(`Booked ${numSeats} seats. Total price: ${totalPrice}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold m-6 ">{event.name}</h1>
      <div className="  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        <div className="">
          <img
            src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${event.banner}`}
            alt={event.name}
            className=" h-full shadow-md"
          />
        </div>
        <div>
          <div className="flex flex-col items-center  m-auto h-full bg-neutral-700">

            <span className="mx-auto text-white font-semibold mt-5">
              Time: {event.startTime} - {event.endTime}
            </span>
            <span className="mx-auto text-white font-semibold mt-5">
              Date: {new Date(event.date).toLocaleDateString('en-US', options)}
            </span>
            <span className="mx-auto text-white font-semibold mt-5">
              Venue: {event.venue}
            </span>
            <span className="mx-auto text-white font-semibold mt-7 mb-4">
              Email: magnuspubliclibrary@gmail.com
            </span>
          </div>
        </div>
        {event.availableSeat>0?
        <>
        {event.status === "Upcoming" &&

          <div className="container mx-auto px-4 py-8 bg-neutral-900 text-white">
            <h2 className="text-3xl font-bold mb-4">Book Now</h2>
            <label htmlFor="numSeats" className="mr-2 text-white">
            {event.availableSeat} Seats Left
              </label>
            <div className="mb-4">
              <label htmlFor="numSeats" className="mr-2 text-white">
                Number of Seats:
              </label>
              <input
                type="number"
                id="numSeats"
                min="1"
                max={event.availableSeat}
                className="px-2 py-1 border rounded text-black"
                value={numSeats}
                onChange={handleNumSeatsChange}
              />
            </div>
            <div className="mb-4">
              <p className=" text-white">Amount per Seat: {event.fees === 0 ? "Free" : "₹ " + seatPrice}</p>
              <p className=" text-white">Total Amount: ₹  {numSeats * seatPrice}</p>
            </div>
            <button
              onClick={token
                ? handleBooking
                : () => {
                  toast.error("Login to Book Event", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }


              className="px-4 py-2 bg-zinc-200 text-black font-semibold rounded hover:bg-zinc-300"
            >
              Book Now
            </button>
          </div>
        }
        </>
        :<>
          <div className="container mx-auto px-4 py-8 bg-neutral-900 text-white">

            <h2 className="text-3xl font-bold mb-4">Registration Complete !!</h2>
</div>

        </>
}
      </div>


      <div className="my-8 mx-auto w-11/12">
        <p>{event.description}</p>
      </div>
    </div>

  );
};

export default ViewEvent;
