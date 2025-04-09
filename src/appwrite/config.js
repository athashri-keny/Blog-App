import conf from '../conf/conf'

import { Client,  ID , Databases , Storage , Query } from "appwrite";

export class DataBaseService{
    Client = new Client();
    Databases;
    Storage

    constructor() {
        this.Client 
         .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Databases = new Databases(this.Client)
        this.Storage = new Storage(this.Client)
    }

   // creating a post for the user
   async createPost({ title, slug, content, featuredImage, status, UserId }) {
    console.log("📢 Sending data to Appwrite:", { title, content });

    try {
        return await this.Databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage: featuredImage || null, 
                status,
                UserId
            }
        );
       

    } catch (error) {
        throw error;
    }
}

    // for updating the post
    async UpdatePost( slug , { title , content , featuredImage , status }) {

        try {
            await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // post id 
                {
                    title,
                    content,
                    featuredImage,
                    status,    
                }
            )
        } catch (error) {
            throw error
        }
    }
    
    // for the deleting the post 
    async DeletePost(slug) {
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
          
        }
    }
  


 
   async GetPost(slug) {
    try {
        
       return await this.Databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
         
        )
    } catch (error) {
        throw error
    }
   }
   
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
                const response = await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
              return response;
        } catch (error) {
            console.error("❌ Error fetching posts:", error);
            return null;
        }
    }

 
  
    // uploading the file
    async UploadFile(file) {
    try {
        return await this.Storage.createFile(
            conf.appwriteBucketId, 
            ID.unique(),
            file
        )
    } catch (error) {
        throw error
    }
    }

    // deleting the file
    async DeleteFile(fileId) {
     try {
        return await this.Storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        
     } catch (error) {
        throw error
     }
    }

    
     GetFilePreview(fileId) {
    try {
          return  this.Storage.getFileView(
        conf.appwriteBucketId, 
        fileId
      );
   
    } catch (error) {
      console.error("Error fetching file preview:", error);
     }
  }

}
    



const service = new DataBaseService();

export default service