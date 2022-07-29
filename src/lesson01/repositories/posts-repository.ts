import {postsCollection} from "./db"
import {postType} from "../types/post";


export const postsRepositories = {
    async findPosts(title: string | null | undefined): Promise<postType[]> {
        let filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }

        const posts = await postsCollection.find(filter).toArray();
        const newPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: post.bloggerId,
            bloggerName: post.bloggerName,
        }))

        return newPosts;
    },

    async getPostById(id: number): Promise<postType | null> {
        const post = await postsCollection.findOne({id})
        if (post) {
            const newPosts = {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: post.bloggerName,
            };
            return newPosts;
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
