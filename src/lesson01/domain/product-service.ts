import {productsRepositories} from "../repositories/products-db-repository";
import {ProductType} from "../types/db-shop";

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        return productsRepositories.getAllProducts(title)
    },

    async findProductById(id: number): Promise<ProductType | null> {
        return productsRepositories.getProductById(id)
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title,
        }
        return await productsRepositories.createProduct(newProduct)
    },

    async updateProduct(id: number, title: string): Promise<boolean> {
        return await productsRepositories.updateProductTitle(id, title)
    },

    async deleteProduct(id: number): Promise<boolean> {
        return await productsRepositories.deleteProduct(id)
    }
}
