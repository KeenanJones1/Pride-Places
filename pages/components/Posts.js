import React from 'react'

const Posts = ({posts, loading, renderModal}) => {
  if(loading) return <h2>Loading...</h2>


const renderPosts = () => {
 return posts.map(post =>{
  return <li className="post-title" onClick={(event) => renderModal(event, post)} key={post.id}>{post.title}</li>
 })
}

 return (
  <ul className="posts">
   { posts.length > 0 && !loading ? renderPosts() : null}
  </ul>
 )
}

export default Posts
