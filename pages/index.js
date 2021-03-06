import {useState, useEffect} from 'react'
import Image from 'next/image'
import Img from '../public/Playful_cat.svg'
import axios from 'axios'
import {AnimatePresence} from 'framer-motion'
import Posts from '../components/Posts'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false) 
  const [perPage] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPost, setmodalPost] = useState({})

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }
    getPost();
  }, [])

  // get current posts
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // change page
  const paginate = (e, pageNum) => {
    e.preventDefault()
    setCurrentPage(pageNum)
  }

  // open Modal 
  const renderModal = (e, post) => {
    e.stopPropagation();
    setmodalPost(post)
    setModalOpen(true)
  }

    return (
    <div className="app">
       <div className="item-1">
        <div className="side">
          <Pagination totalPosts={posts.length} postPerPage={perPage} paginate={paginate} currentPage={currentPage}/>
        </div>
      </div>

      <div className="item-2">
        <div className="background-svg">
          <Image src={Img} id="cat" alt="cat"/>
        </div>

        <div className="header"><h1 className="post-titles">Post Titles</h1></div>
        
        <div className="posts-container">
          <Posts posts={currentPosts} loading={loading} renderModal={renderModal}/> 
        </div>
      </div>
    
     

      <AnimatePresence>
        {modalOpen && <Modal modalPost={modalPost} setModalOpen={setModalOpen} modalOpen={modalOpen}/>}
      </AnimatePresence>
    </div>
  )
}


export default Home