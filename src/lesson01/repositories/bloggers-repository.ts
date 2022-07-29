import {bloggerType} from "../types/bloger";
import {bloggersCollection} from "./db";

export const bloggers: bloggerType[] = []

export const bloggersRepositories = {
    async getBloggers(title: string | null | undefined): Promise<bloggerType[]> {
        let filter: any = {};
        if (title) {
            filter.title = {$regex: ""}
        }

        return bloggersCollection.find(filter).toArray();
    },

    async getBloggerById(id: number): Promise<bloggerType | null> {
        const blogger: bloggerType | null = await bloggersCollection.findOne({id: +id})
        if (blogger) {
            return blogger
        } else {
            return null
        }
    },

    async createBlogger(blogger: bloggerType): Promise<bloggerType> {
        const result = await bloggersCollection.insertOne(blogger);
        return blogger;
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string):Promise<boolean> {
        const result = await bloggersCollection.updateOne({id}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1;
    },

    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1;
    }
}
