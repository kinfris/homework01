import {MongoClient} from "mongodb";
import {ProductType} from "../types/db-shop";
import {bloggerType} from "../types/bloger";
import {postType} from "../types/post";
import 'dotenv/config'

const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoUri);

const shopDb = client.db("shop");
export const productsCollection = shopDb.collection<ProductType>("products");
export const bloggersCollection = shopDb.collection<bloggerType>("bloggers");
export const postsCollection = shopDb.collection<postType>("posts");

export async function runDb() {
    try {
        await client.connect();
        await client.db("products").command({ping: 1});
        console.log("Successfully connected to mongodb");
    } catch {

        console.log("Can`t connect to mongo server");
        await client.close();
    }
}
