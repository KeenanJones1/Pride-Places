import React from 'react'

const Pagination = ({postPerPage, totalPosts, paginate}) => {
 const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
   pageNumbers.push(i)
  }

 return (
  <nav>
    <ul>
     {pageNumbers.map(pageNum => {
      return <li key={pageNum}>
       <a onClick={(event) => paginate(event, pageNum)} href="">{pageNum}</a>
      </li>
     })}
    </ul>
  </nav>
 )
}

export default Pagination
