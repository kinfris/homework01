import {ProductType} from "../types/db-shop";

const products: ProductType[] = [{id: 1, title: "asdasd"}, {id: 2, title: "312312312312"}]

export const productsRepositories = {
    async getAllProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1);
        } else {
            return products
        }
    },

    async getProductById(id: number): Promise<ProductType | null> {
        let product = products.find(v => v.id === id);
        if (product) {
            return product
        } else {
            return null
        }
    },

    async createProduct(title: string): Promise<ProductType> {
        const product = {
            id: +(new Date()),
            title: title,
        }
        products.push(product);
        return product;
    },

    async updateProductTitle(id: number, title: string): Promise<boolean> {
        let product = products.find(v => v.id === id)
        if (product) {
            product.title = title;
            return true
        } else {
            return false
        }
    },

    async deleteProduct(id: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
