import {postsRepositories} from "../repositories/posts-repository";
import {postType} from "../types/post";
import {bloggersService} from "./bloggers-service";
import {bloggerType} from "../types/bloger";

export const postsService = {
    async findPosts(title: string | null | undefined): Promise<postType[]> {
        return postsRepositories.findPosts(title)
    },

    async findPostById(id: string): Promise<postType | null> {
        return await postsRepositories.getPostById(+id)
    },

    async createPost(bloggerId: string, title: string, shortDescription: string, content: string): Promise<postType | null> {
        const blogger: bloggerType | null = await bloggersService.findBloggerById(+bloggerId);
        if (blogger) {
            const newBlogger = {
                id: +(new Date()),
                title,
                shortDescription,
                content,
                bloggerId: blogger.id,
                bloggerName: blogger.name
            }
            return await postsRepositories.createPost(newBlogger)
        } else {
            return null
        }
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        const blogger: bloggerType | null = await bloggersService.findBloggerById(+bloggerId);
        if (blogger) {
            return await postsRepositories.updatePost(+id, title, shortDescription, content, blogger.id)
        } else {
            return false
        }
    },

    async deletePost(id: string): Promise<boolean> {
        return await postsRepositories.deletePost(+id)
    }
}
