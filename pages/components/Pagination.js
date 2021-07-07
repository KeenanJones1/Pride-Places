import React from 'react'

const Pagination = ({postPerPage, totalPosts, paginate}) => {
 const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
   pageNumbers.push(i)
  }

 return (
    <ul className="pagination">
     {
     pageNumbers.map(pageNum => {
      return <li key={pageNum}>
       <a className="page-link" onClick={(event) => paginate(event, pageNum)}>{pageNum}</a>
      </li>
     })}
    </ul>
 )
}

export default Pagination
