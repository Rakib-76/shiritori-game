"use client";
import React from 'react'
import books from '@/app/data/book.json'
export default function page() {
  return (
    <div>
      <p className='text-center font-bold text-2xl'>All Books</p>
      <div  className='grid grid-cols-3 gap-2'>
        {books.map(book => (

          <p key={book._id}>{book.book_name}</p>
        ))}
        </div> 
    </div>
  )
}
