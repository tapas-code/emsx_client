import React from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  return (
    <div className='flex-1  flex'>
      <div className='flex justify-evenly w-full items-center '>
        

        <div className='flex-1 px-16'>
          <h1 className="text-5xl font-bold">EMSX: Your Ultimate Event Management Hub</h1>
      <p className="py-6">
      EMSX is a powerful event management platform that simplifies event creation, discovery, and management. Whether organizing a major conference or exploring local events, EMSX provides the tools to make your experience seamless and engaging. Join the community, explore events, and make every moment count with EMSX.
      </p>
      <button className="btn btn-info" onClick={() => {isLoggedIn ? navigate('/events') : navigate('/login')}}>Get Started</button>
        </div>

        <div className='flex-1 flex justify-center'>
          <img src="https://www.stelleninfotech.com/wp-content/uploads/2023/03/event-management-software.png" alt="Home img"/>
        </div>
      </div>
    </div>
  )
}

export default Home
