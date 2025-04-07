import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={appwriteService.GetFilePreview(featuredImage)}
            alt={title}
            className=" pl-5 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
