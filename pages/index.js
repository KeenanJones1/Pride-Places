import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './components/Posts'
import Pagination from './components/Pagination'
import Modal from './components/Modal'

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
    <div>
      <div className="outer_layer" onClick={() => setModalOpen(false)}>
        <Posts posts={currentPosts} loading={loading} renderModal={renderModal}/> 

        <Pagination totalPosts={posts.length} postPerPage={perPage} paginate={paginate}/>
      </div>

      <div className="modal">
        {modalOpen && modalPost ? <Modal modalPost={modalPost} setModalOpen={setModalOpen}/> : null}
      </div>
    </div>
  )
}


export default Home
