import React from 'react'

 //"Accepting as children" means the Container component doesn't dictate what content it wraps. Instead, it accepts dynamic content (passed as children) and renders it inside the <div>.

// this is used for styling 

function Container({ children, className = '' }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

export default Container