import {postsCollection} from "./db"
import {postType} from "../types/post";


export const postsRepositories = {
    async findPosts(title: string | null | undefined): Promise<postType[]> {
        let filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }

        return await postsCollection.find(filter,{projection:{_id:0}}).toArray();
    },

    async getPostById(id: number): Promise<postType | null> {
        const post = await postsCollection.findOne({id},{projection:{_id:0}})
        if (post) {
            return post;
        } else {
            return null;
        }


    },

    async createPost(newPost: postType): Promise<postType> {
        const result = await postsCollection.insertOne(newPost);
        return newPost;
    },

    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const result = await postsCollection.updateOne({id}, {$set: {title, shortDescription, content, bloggerId}})
        return result.matchedCount === 1;
    },

    async deletePost(id: number): Promise<boolean> {
        const result = await postsCollection.deleteOne({id});
        return result.deletedCount === 1;
    }
}
