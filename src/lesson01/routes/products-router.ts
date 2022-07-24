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
    let videos: ProductType[] = await productsService.findProducts(req.body.title);
    res.send(videos)
});

productsRouter.post("/", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newVideo: ProductType = await productsService.createProduct(req.body.title)
    if (newVideo) {
        res.status(201).send(newVideo)
    } else {
        res.send(404)
    }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const video: ProductType | null = await productsService.findProductById(+req.params.id);
    if (video) {
        res.send(video);
    } else {
        res.send(404)
    }

})

productsRouter.put("/:id", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const video: boolean = await productsService.updateProduct(+req.params.id, req.body.title);
    if (video) {
        res.send(204);
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


