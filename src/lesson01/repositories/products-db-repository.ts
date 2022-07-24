import {productsCollection} from "./db";
import {ProductType} from "../types/db-shop";

export const productsRepositories = {
    async getAllProducts(title: string | null | undefined): Promise<ProductType[]> {
        let filter: any = {};

        if (title) {
            filter.title = {$regex: title}
        }

        return productsCollection.find(filter).toArray()
    },

    async getProductById(id: number): Promise<ProductType | null> {
        let product: ProductType | null = await productsCollection.findOne({id: id});

        if (product) {
            return product;
        } else {
            return null;
        }
    },

    async createProduct(title: string): Promise<ProductType> {
        const product = {
            id: +(new Date()),
            title: title,
        }
        const result = await productsCollection.insertOne(product)
        return product;
    },

    async updateProductTitle(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1;
    },

    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1;
    }
}
