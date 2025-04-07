import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to Our Blog
                    </h1>
                    <p className="text-xl text-gray-500 mb-8">
                        Start reading trending posts...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 bg-white">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold">
                    Latest Posts
                </h1>
                <p className="mt-2 text-gray-600">
                    Discover our most recent stories
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <PostCard 
                        key={post.$id} 
                        {...post} 
                        className="transition-transform duration-300 hover:scale-105 bg-white hover:bg-gray-50"
                    />
                ))}
            </div>
        </div>
    )
}

export default Home
