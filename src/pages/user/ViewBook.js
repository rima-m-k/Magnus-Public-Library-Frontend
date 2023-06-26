import React, { useEffect, useState } from "react";
import defaultProfile from "../../images/Default_pfp.png"

import { useParams } from "react-router-dom";
import {
  addReview,
  fetchSingleBook,
  placeHold,
} from "../../services/userServiceHelpers";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

function ViewBooks() {
  const { id } = useParams();
  const [showGen, setShowGen] = useState(false);
  let [book, setBook] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const handleSubmitRating = (event) => {
    event.preventDefault();
    //send to backend
    const review = {
      bookID: id,
      text: newReview,
      rating,
    };
    addReview(review)
      .then(res => {
        console.log(res.data.rating)
        setReviews(res.data.rating);

      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {

        setNewReview("");
        setRating(0);
      })
  };
  // console.log(rating, newReview);

  useEffect(() => {
    fetchSingleBook(id)
      .then((res) => {
        // console.log(res);
        setBook(res.data.singleBook)
        setReviews(res.data?.singleBook[0]?.rating)
        // console.log(res.data.singleBook[0].rating)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const token = localStorage.getItem("currentUser");
  const [bookingData, setBookingData] = useState({
    date: "",
    bookId: id,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalForm, setModalForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    placeHold(bookingData)
      .then((res) => {
        console.log(res)
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
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409 || err.response.status === 403 || err.response.status === 500) {
          toast.error(err.response.data.message, {
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
      })
      .finally(() => {
        setIsLoading(false)
        setModalForm(() => !modalForm);

      });
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setBookingData((values) => ({ ...values, [name]: value }));
  }

  const toggleModal = (e) => {
    e.preventDefault();
    setModalForm(() => !modalForm);
  };

  return (
    <>
      <div className="justify-center items-center md:px-4 mx-auto">
        <div className="m-8">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-3xl font-bold">{book[0]?.title}</h1>
            <span className="text-gray-500 text-xl mx-3">
              ({new Date(book[0]?.publicationDate).getFullYear()})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="col-span-1">
              <img
                src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${book[0]?.image}`}
                alt={book[0]?.title}
                className="w-auto"
              />
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <span className="font-light mx-3">Author:</span>
                {book[0]?.author?.AuthorName}
              </div>
              <div className="mb-4">
                <span className="font-light mx-3">Genre:</span>
                {book[0]?.genre?.genreName}
              </div>
              <div className="mb-4">
                <span className="font-light mx-3">Publisher:</span>
                {book[0]?.publisher}
              </div>
              <div className="mb-4">
                <span className="font-light mx-3">Publication Date:</span>{" "}
                {new Date(book[0]?.publicationDate).toLocaleDateString()}
              </div>
              <div className="mb-4">
                <span className="font-light mx-3">Number of Pages:</span>
                {book[0]?.pages}
              </div>
              <div className="mb-4">
                <span className="font-light mx-3">Availability:</span>
                {book[0]?.onHold + book[0]?.borrowed}/{book[0]?.copy} booked
              </div>
              <div className="mb-4 pr-2">
                <span className="font-light mx-3">Synopsis:</span>
                <p className="ml-3">{book[0]?.synopsis}</p>
              </div>
              <button
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                onClick={
                  token
                    ? toggleModal
                    : () => {
                      toast.error("Login to Place Hold Of The Book", {
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
              >
                Place Hold
              </button>

              {modalForm && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                  <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
                  <div className="bg-white rounded-lg p-6 z-10">
                    <form onSubmit={handleSubmit}>
                      {isLoading && <Spinner />}

                      <div className="mb-6">


                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="date"
                        >
                          Collecting date
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="date"
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleChange}
                          required
                        />
                        <p className=" text-sm text-red-700">
                          Maximum days to hold the book is 4 days.
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Submit
                        </button>
                        <button
                          className="ml-4 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="cancel"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
            <div className="col-span-1  w-5/6 mx-auto border border-zinc-400 p-3  mb-4">
              <h2 className="text-lg font-bold mb-2 text-end">
                <span onClick={() => setShowGen(true)} className={`text-zinc-600 mx-2 ${showGen ? 'underline' : ''}`}> Author </span>
                <span onClick={() => setShowGen(false)} className={`text-zinc-600 mx-2 ${!showGen ? 'underline' : ''}`}> Genre </span>
              </h2>
              <hr className="m-2" />
              <p className="text-gray-700 px-4 text-sm" >
                {showGen ? book[0]?.author?.Biography : book[0]?.genre?.description}
                { }</p></div>

          </div>
        </div>
      </div>

      {/* write review */}

      <hr className="border-gray-500 py-4" />
      <div className="w-2/3 mx-auto">
        <div className=" p-6 ">

          <h2 className="text-2xl font-medium mb-4">Add a Review </h2>
          <form onSubmit={handleSubmitRating} className="flex flex-col mb-4">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="bg-white border rounded-lg p-4 mb-4 "
              placeholder="Write your review here..."
              required
            ></textarea>
            <div className="flex items-center mb-4">
              {stars.map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`${star <= rating ? "text-yellow-400" : "text-gray-400"
                    } text-2xl mr-1`}
                >
                  {"\u2605"} {/*  unicode star */}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-1/3 justify-end"
            >
              Submit
            </button>
          </form>
          <hr className="border-gray-500 py-4 " />
          <h2 className="text-lg font-medium mb-4">Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review._id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    
                    <img
                      className="rounded-full w-10 object-cover "
                      src={review.user.profilePhoto? `https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${review.user.profilePhoto}`: defaultProfile}
                      alt="User profile"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">{console.log(review.user)}
                      <p className="font-medium"> {review.user.name}</p>
                      <span className="flex">
                        {Array.from({ length: review.star }, (_, i) => (
                          <span key={i} className="text-yellow-400">
                            {"\u2605"}
                          </span>
                        ))}
                      </span>
                    </div>
                    <p className="max-w-2xl">{review.review}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
}

export default ViewBooks;
