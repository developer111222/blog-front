import React from 'react'

const BlogStep = () => {
  return (
    <div className='container-fluid d-flex  justify-content-between'>  
    <div className='m-10 border'> {/* Responsive on all sizes */}
        <h2 className='fs-2'>Step 1: Sign Up</h2>
        <p className='text-justify'>To sign up for your blog website, visit the homepage and click the “Sign Up” button in the top right corner. Fill out the registration form with your name, email, and password. Agree to the terms, submit, then check your email to verify your account via the confirmation link.</p>
    </div>
    <div className='m-10 border'> {/* Responsive on all sizes */}
        <h2 className='fs-2'>Step 2: Create a Blog Post</h2>
        <p className='text-justify'>After signing up, log in to your account and go to the user dashboard. Click on “Create Blog Post” to access the editor. Enter an engaging title and write your content, using formatting tools as needed. Preview your draft, then click “Publish” to share your first blog post.</p>
    </div>
    <div className='m-10 border'> {/* Responsive on all sizes */}
        <h2 className='fs-2'>Step 3: View Your Blog Posts</h2>
        <p className='text-justify'>Once your post is published, head to the main blog section of your website to view all your articles, listed in chronological order. Click on a title to read the full post. This lets you showcase your ideas and allows readers to engage with your content effectively.</p>
    </div>
</div>

  )
}

export default BlogStep
