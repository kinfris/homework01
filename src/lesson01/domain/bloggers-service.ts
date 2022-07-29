import {bloggersRepositories} from "../repositories/bloggers-repository";
import {bloggerType} from "../types/bloger";

export const bloggersService = {
    async findBloggers(title: string | null | undefined): Promise<bloggerType[]> {
        return bloggersRepositories.getBloggers(title)
    },

    async findBloggerById(id: number): Promise<bloggerType | null> {
        return await bloggersRepositories.getBloggerById(id)
    },

    async createBlogger(name: string, youtubeUrl: string): Promise<bloggerType> {
        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        return await bloggersRepositories.createBlogger(newBlogger)
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepositories.updateBlogger(+id, name, youtubeUrl)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersRepositories.deleteBlogger(+id)
    }
}
