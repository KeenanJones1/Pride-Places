import {useEffect, useState} from 'react'
import axios from 'axios'


const Modal = ({modalPost}) => {
 const [user, setUser] = useState({})
 const [loading, setLoading] = useState(false)
 useEffect(() => {

  const getUser = async () => {
   setLoading(true)
   const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${modalPost.userId}`)
   setUser(res.data)
   setLoading(false)
 }
 getUser();
 }, [])


 const renderUserInfo = () => {
  return <div className="user-info">
   <h3>{user.name}</h3>
   <h3>{user.company.catchPhrase}</h3>
 </div>
 }

 return (
  <div>
   <h1>{modalPost.title}</h1>
   <h2>{modalPost.body}</h2>
   {user.name ? renderUserInfo() : null}
  </div>
 )
}

export default Modal
