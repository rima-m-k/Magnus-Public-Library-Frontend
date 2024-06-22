import axios from "axios";
const renderURL='https://magnus-public-library-backend.onrender.com';
const localhostURL='http://localhost:8000';
const awsURL='https://api.magnuspubliclibrary.tech';
 const instance = axios.create({baseURL: renderURL, timeout: 30000, headers: {   Authorization: `Bearer ${localStorage.getItem('currentUser')}`} });
const client   = axios.create({baseURL: renderURL , timeout: 30000,  headers: {   Authorization: `Bearer ${localStorage.getItem("currentUser")}`, 'Content-Type': 'multipart/form-data'} });


const  userSignup = (userData) =>   instance.post('/userSignup',userData);
const OTPverification = (userData) => instance.put('/userSignup',userData) 
const userLogin = (userInfo) => instance.post('/userLogin',userInfo);
const fetchBook = () => instance.get('/viewBooks');
const fetchSingleBook =(id) => instance.get(`/books/${id}`)
const placeHold = (bookingData) => instance.post('/placeHold',bookingData)
const searchItem = (searchTerm) => instance.post('/search',{term:searchTerm})
const getUserProfile = () => instance.get('/profile') 
const LibraryCard = (formData) => client.post('/LibraryCardApplication',formData)
const fetchEvents = () => instance.get('/allEvents');
const fetchEvent = (id) => instance.get(`/viewEvent/${id}`)
const fetchBlog = () => instance.get('/community');
const fetchSingleBlog = (id) => instance.get(`/communityBlogs/${id}`);
const addReview = (review) => instance.patch('/books/:id',review)
const bookEvent = (Data) => instance.post('/bookEvent',Data)
const getKey = () => instance.get('/getkey');
 

export {
    userSignup,
    userLogin,
    fetchBook,
    placeHold,
    searchItem,
    OTPverification,
    getUserProfile,
    fetchSingleBook,
    LibraryCard,
    fetchEvents,
    fetchEvent,
    fetchBlog,
    addReview,
    bookEvent,
    getKey,
    fetchSingleBlog
};
