import {useEffect, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {motion} from 'framer-motion'



const Modal = ({modalPost, setModalOpen}) => {
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
  return( 
  <div className="user-info">
   <h3 id="name"><span>Author: </span>{user.name}</h3>
   <p id="catchphrase">{'"' + user.company.catchPhrase + '"'} -catchphrase</p>
  </div>)
 }


 return (
  <> 
     <motion.div 
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition:{
          duration: 0.3,
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 0.3
        }
      }}
      
    className="modal-backdrop"
    onClick={() => setModalOpen(false)}
    />
    <motion.div 
      initial={{
        scale: 0,
      }}

      animate={{
        scale: 1,
        transition:{
          duration: 0.3,
        }
      }}
      exit={{
        scale: 0,
        transition: {
          delay: 0.3
        }
      }}
    className="modal-content-wrapper">
      <motion.button 
        initial={{
          scale: 0
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.3,
            duration: 0.3
          }
        }}

        exit={{
          scale: 0,
          opacity: 0,
        }}
      id="icon-btn" onClick={() => setModalOpen(false)}>
        <FontAwesomeIcon icon={faTimes} id="exit-icon"/>
      </motion.button>
      <motion.div 
        initial={{
          x: 100,
          opacity: 0,
        }}

        animate={{
          x: 0,
          opacity: 1,
          transition:{
            delay: 0.3,
            duration: 0.3
          }
        }}

        exit={{
          x: 100,
          opacity: 0,
          transition: {
            duration: 0.3
          }
        }}
      className="modal-content">
          <h1 className="modal-post-title">{modalPost.title}</h1>
        {user.name ? renderUserInfo() : null}
        <div className="post-body">
          <p>{modalPost.body}</p>
        </div >
      </motion.div>
    </motion.div>
  </>
 )
}

export default Modal
