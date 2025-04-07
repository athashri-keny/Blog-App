import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true  
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="sticky top-0 z-50 py-3 bg-white text-gray-900 shadow-lg shadow-gray-200/20 transition-colors duration-300">
      <Container>
        <nav className='flex items-center justify-between'>
          <Link 
            to='/' 
            className='flex items-center gap-2 transition-transform hover:scale-105'
          >
           <span className='text-xl font-bold hidden sm:block'>
              BlogSphere
            </span>
          </Link>
          
          <div className='flex items-center gap-4'>
            <ul className='flex items-center gap-2'>
              {navItems.map((item) => 
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-blue-600 relative group font-medium text-sm sm:text-base"
                    >
                      <span className='relative'>
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </button>
                  </li>
                )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn className="ml-2 hover:bg-red-500/10 hover:text-red-600" />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
