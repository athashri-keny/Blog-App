
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {  // the user will pass the post 
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        // uploading post if there is a post 
        if (post) {
            const file = data.image[0] ? await appwriteService.UploadFile(data.image[0]) : null;         
         // deleting the old file if there is
            if (file) {
                appwriteService.DeleteFile(post.featuredImage);
            }

               // updating the post after uploading 
            const dbPost = await appwriteService.UpdatePost(post.$id, {
                ...data,
                featuredImage:  file.$id,
            });
            console.log(file.$id)
        

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                navigate("/")
            }
                   // if the post is there meaning the user is trying to upload new file  
        } else {
            const file = await appwriteService.UploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id; // taking file id
                data.featuredImage = fileId;  // saving the file the in the database 
                    // creating a new post 
                const dbPost = await appwriteService.createPost({ ...data, UserId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

     // watching the enters space it automatically converts into - 
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
          // Start watching form fields for changes
        const subscription = watch((value, { name }) => {
               // Check if the 'title' field is the one being updated
            if (name === "title") {
                 
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
          // Cleanup: Unsubscribe from watching when the component unmounts
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]); // Dependencies: Re-run effect when these change
  

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.GetFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
