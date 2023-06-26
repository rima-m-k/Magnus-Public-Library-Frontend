import axios from "axios";
const instance = axios.create({baseURL: 'http://localhost:8000/admin/', timeout: 30000, headers: {   Authorization: `Bearer ${localStorage.getItem('AdminData')}`} });
// const instance = axios.create({baseURL: 'https://api.magnuspubliclibrary.tech/admin/', timeout: 30000, headers: {   Authorization: `Bearer ${localStorage.getItem('AdminData')}`} });



const staffLogin = (data) =>  instance.post('/staffportal', data);
const addEmployee=(data) => instance.post('/addEmployee',data)
const fetchStaffID= () => instance.get('/addEmployee')
const getAuthorData =() => instance.get('/viewAuthors');
const getEventData =() => instance.get('/viewEvent');
const fetchBookTitle =() => instance.get('/checkout');
const getGenre =() => instance.get('/viewGenre'); 
const getBook =() => instance.get('/viewBooks')
const getEmployeeData =() => instance.get('/viewEmployees') 
const getUsers = () => instance.get('/viewUsers')
const findUser = (keyWord) => instance.post('/userSearch',{term:keyWord})
const checkout = (checkoutData) => instance.post('/checkout',checkoutData)
const getCheckoutData = () => instance.get('/returnRenew')
const addEvent = (eventData) => instance.post('/addEvent',eventData)
const fetchVenue= () => instance.get('/addEvent')
const addVenue = (venueData) => instance.post('/addVenue',venueData)
const addBlog = (blogData) => instance.post('/addBlog',blogData)
const getadminProfile = () => instance.get('/profile')
const updateEmployeeStatus = (data) => instance.post('/blockUnblock',data)
const getBlogData =() => instance.get('/viewBlog');
const renewBook = (data) => instance.post('/renewBook',data)
const returnBook = (data) => instance.post('/returnBook',data)


export {
    staffLogin,
    addEmployee,
    fetchStaffID,
    getAuthorData,
    fetchBookTitle,
    getGenre,
    getBook,
    getEmployeeData,
    getUsers,
    findUser,
    checkout,
    getCheckoutData,
    addEvent,
    addVenue,
    fetchVenue,addBlog,
    getadminProfile,
    updateEmployeeStatus,
    getBlogData,
    renewBook,
    returnBook,
    getEventData
};
//axios interceptors

// 