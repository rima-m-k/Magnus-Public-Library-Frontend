
import React, { useState, useEffect } from "react";
import { findUser, renewBook, returnBook } from "../../services/adminServiceHelpers";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

function ReturnRenew() {
  const [formData, setFormData] = useState({
    bookID: '',
    cardNumber: '',
    userID:''
  })
  const [isLoasing, setIsLoading] = useState(false);
  const [history, setHistory] = useState({})
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  console.log(formData)
  // ----------------------------------search
  function search(e) {
    setIsLoading(true)
    e.preventDefault();
    findUser(formData.cardNumber)
      .then(res => {
        console.log(res.data.books, "hist")
        setHistory(res.data.history)
        setFormData({
          ...formData,
          userID: res.data.user._id
        });
      }).catch(err => {
        console.log(err)
        setHistory({})
      })
      .finally(() => setIsLoading(false))
  }
  // ----------------------------------return
  function Return(bookID,book) {
   
    setIsLoading(true);
    setFormData({
      ...formData,
      bookID: bookID
    })
    // Move renewBook function call inside the .then block
    returnBook({formData,book})
    .then(res => {
        console.log(res.data);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setHistory(res.data.history);
      })
      .catch(err => {
        console.log(err);
        // setHistory({});
      })
      .finally(() => setIsLoading(false));
  }
  // ----------------------------------renew
  function Renew(bookID) {
    setIsLoading(true);
    setFormData({
      ...formData,
      bookID: bookID
    })
    // Move renewBook function call inside the .then block
    renewBook(formData)
    .then(res => {
        console.log(res.data);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setHistory(res.data.history);
      })
      .catch(err => {
        console.log(err);
        // setHistory({});
      })
      .finally(() => setIsLoading(false));
  }
  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault();
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center   mx-auto mt-5 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded container shadow-md max-w-2xl"
        >
          <h2 className="text-2xl mb-4 font-bold">Check In</h2>
          <div className="mb-4">
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="border-gray-400 bg-gray-100 border-b-2 block w-full rounded py-2 px-3 mb-4"
            />
            <button type='button'
              onClick={search}
              className='p-2 mx-3 bg-blue-800 rounded-lg hover:bg-blue-700 text-white mb-4'
            >Search</button>
            {isLoasing ? <Spinner isUser={false} /> : null}
            {/* books borrowed by user */}
            {history?.books && history?.books.map((history) => (
              <>
                <div className="bg-indigo-50 rounded-lg p-4 shadow my-2 hover:bg-indigo-100">
                  <h2 className="text-xl font-semibold">{history.bookID.title}</h2>
                  <p className="text-gray-500">Date of Borrow: {new Date(history.dateOfBorrow).toLocaleDateString('en-US', options)}</p>
                  <p className="text-gray-500">Expected Date of Return:  {new Date(history.expectedDOR).toLocaleDateString('en-US', options)}</p>
                  <p className="text-gray-500"> Date of Return:  {history.dateOfReturn && new Date(history.dateOfReturn).toLocaleDateString('en-US', options)}</p>
                  <div className="button-group">
                    <button className="bg-blue-900 hover:bg-blue-800 p-2 m-1 text-white" onClick={() => Return(history._id,history.bookID._id)}>Return</button>
                    <button type="submit" className="bg-blue-900 hover:bg-blue-800 p-2 m-1 text-white" onClick={() => Renew(history._id)}>Renew</button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <button
            type="submit"
            className="bg-custom-blue  text-white py-2 px-4 "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}


export default ReturnRenew

