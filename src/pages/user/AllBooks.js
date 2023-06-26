import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchBook } from '../../services/userServiceHelpers';

function AllBooks() {
  
  const [books,setBooks] = useState([])
  useEffect(() => {
    fetchBook().then((res) => {
      setBooks(res.data.allBook)
    });
  }, []);
console.log(  books)

  return (
    <>
    <div className='container'>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-10 m-4 sm:px-2 md:px-4 lg:px-8 mt-4">
 {books.map(book => (
    <div key={book.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
        <Link to={`/books/${book._id}`} >    
          <img src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${book.image}`} alt={book.title} className="h-48 w-full object-cover" />
        </Link>

      <div className="px-4 py-2">
      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
        <h3 className="text-sm font-mono text-gray-600">{book.author}</h3>

      </div>
    </div>
  ))} 
</div>
</div>
    </>
  )
} 

export default AllBooks
