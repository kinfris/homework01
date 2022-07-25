import {MongoClient} from "mongodb";
import {ProductType} from "../types/db-shop";

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoUri);

const shopDb = client.db("shop");
export const productsCollection = shopDb.collection<ProductType>("products");

export async function runDb() {
    try {

        await client.connect();
        await client.db("products").command({ping: 1});
        console.log("Connected successfully to mongo server");
    } catch {

        console.log("Can`t connect to mongo server");
        await client.close();
    }
}
