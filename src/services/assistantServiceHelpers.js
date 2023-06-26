import axios from "axios";
// const instance = axios.create({baseURL: 'https://api.magnuspubliclibrary.tech/asst', timeout: 30000,headers: {   Authorization: `Bearer ${localStorage.getItem('AsstData')}`} });
// const client   = axios.create({baseURL: 'https://api.magnuspubliclibrary.tech/asst' , timeout: 30000,  headers: { 'Content-Type': 'multipart/form-data' ,Authorization: `Bearer ${localStorage.getItem('AsstData')}`} });
const instance = axios.create({baseURL: 'http://localhost:8000/asst', timeout: 30000,headers: {   Authorization: `Bearer ${localStorage.getItem('AsstData')}`} });
const client   = axios.create({baseURL: 'http://localhost:8000/asst' , timeout: 30000,  headers: { 'Content-Type': 'multipart/form-data' ,Authorization: `Bearer ${localStorage.getItem('AsstData')}`} });

const  addBook = (bookData) =>   client.post('/addBook',bookData);
const addAuthor = (authorData) => instance.post('/addAuthor',authorData);
const addGenre = (genreData) => instance.post('/addGenre',genreData);
const fetchBookAndGenres=() => instance.get('/addBook');
const getAuthorData =() => instance.get('/viewAuthors');
const getBook =() => instance.get('/viewBooks')
const getGenre =() => instance.get('/viewGenre');
const getBlogData =() => instance.get('/viewBlog');
const deltetBook =(ID) =>instance.patch('/deleteBook',ID)




export {
    addBook,
    addAuthor,
    addGenre,
    fetchBookAndGenres,
    getAuthorData,
    getBook,
    getGenre,
    getBlogData,
    deltetBook
};
