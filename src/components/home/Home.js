import React from 'react'
import BlogCard from '../blog/UI/BlogCard'
import BlogStep from './blogstep/BlogStep'

const Home = () => {
  return (
   <>
 <div className='container-fluid d-flex  justify-content-between align-items-center'>  
    <div className='col-6 '>
        <h1>Read, write & connect</h1>
        <p className=''>
            We believe that knowledge is best shared. Our carefully curated articles cover a wide range of topics that cater to your interests and spark your curiosity. Whether you’re looking for in-depth guides, quick tips, or inspiring stories, there’s something here for everyone.
        </p>
        <button type='submit' className=''>
            Join our team
        </button> 
    </div>

    <div className='col-6 '>
        <img 
            src='https://img.freepik.com/free-vector/blogging-illustration-concept_114360-851.jpg?t=st=1727802310~exp=1727805910~hmac=b389109bf1fc1e64a2ff82937b937c879a6fa3a6c30ee0534429cc5e0c63ce87&w=740' 
            alt='image' 
            className='img-fluid' 
            style={{ maxWidth: '100%', height: 'auto' }} 
        />
    </div>
</div>



   
   </>
  )
}

export default Home
