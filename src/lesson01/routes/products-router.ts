import {Router, Request, Response} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {ProductType} from "../types/db-shop";
import {productsService} from "../domain/product-service";

export const productsRouter = Router();

const titleValidation = body("title").trim().isLength({
    min: 3,
    max: 40
}).withMessage("title length must be from 3 to 40 symbols");

productsRouter.get("/", async (req: Request, res: Response) => {
    let products: ProductType[] = await productsService.findProducts(req.body.title);
    res.send(products)
});

productsRouter.post("/", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newproduct: ProductType = await productsService.createProduct(req.body.title)
    if (newproduct) {
        res.status(201).send(newproduct)
    } else {
        res.send(404)
    }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const product: ProductType | null = await productsService.findProductById(+req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.send(404)
    }

})

productsRouter.put("/:id", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated: boolean = await productsService.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = await productsService.findProductById(+req.params.id)
        res.send(product);
    } else {
        res.send(404)
    }
})

productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const isDeleted: boolean = await productsService.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404);
    }
})


