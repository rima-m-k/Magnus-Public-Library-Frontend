import axios from "axios";
 const instance = axios.create({baseURL: 'http://localhost:8000/', timeout: 30000, headers: {   Authorization: `Bearer ${localStorage.getItem('currentUser')}`} ,withCredentials: true,});
const client   = axios.create({baseURL: 'http://localhost:8000/' , timeout: 30000,  headers: {   Authorization: `Bearer ${localStorage.getItem("currentUser")}`, 'Content-Type': 'multipart/form-data'} ,withCredentials: true,});
// const instance = axios.create({baseURL: 'https://api.magnuspubliclibrary.tech', timeout: 30000, headers: {   Authorization: `Bearer ${localStorage.getItem('currentUser')}`} ,withCredentials: true,});
// const client   = axios.create({baseURL: 'https://api.magnuspubliclibrary.tech' , timeout: 30000,  headers: {   Authorization: `Bearer ${localStorage.getItem("currentUser")}`, 'Content-Type': 'multipart/form-data'} ,withCredentials: true,});


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
    getKey
};
