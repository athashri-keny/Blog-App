
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button} from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
  

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

        // taking the current state of the user from the store
    const userData = useSelector((state) => state.auth.userData);
   
    // Checks if the current user is the author of the post by comparing the UserId in the post with the current user's $id. If either post or userData is not available, it defaults to false.
    const isAuthor = post && userData ? post.UserId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.GetPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    
    const deletePost = () => {
        appwriteService.DeletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.DeleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    return post ? (
        <div className="py-8 max-w-4xl mx-auto px-4 transition-all duration-300 bg-white text-gray-900">
        <div className="relative group border border-gray-200 rounded-2xl p-2 mb-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="overflow-hidden rounded-xl aspect-video">
            <img
              src={appwriteService.GetFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
      
          {isAuthor && (
            <div className="absolute right-2 top-2 flex gap-2 sm:right-4 sm:top-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="px-3 py-2 bg-green-500/90 hover:bg-green-600 text-white rounded-lg backdrop-blur-sm transition-all">
                  ✏️ Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                className="px-3 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm transition-all"
              >
                🗑️ Delete
              </Button>
            </div>
          )}
        </div>
      
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Posted</span>
            </div>
        </div>
      
        <article>
          {parse(post.content)}
        </article>
      </div>
      
      ) : null;
    }

