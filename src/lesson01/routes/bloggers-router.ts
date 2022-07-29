import {Router, Request, Response} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";
import {bloggersService} from "../domain/bloggers-service";
import {bloggerType} from "../types/bloger";

export const bloggersRouter = Router();

const nameValidation = body("name").trim().isLength({
    min: 3,
    max: 15
}).withMessage("name length must be from 3 to 15 symbols");

const urlValidation = body("youtubeUrl").trim()
    .isURL()
    .withMessage("incorrect format of url")
    .isLength({
        min: 3
    })
    .withMessage("youtubeUrl length must be from 3 to 100 symbols");


bloggersRouter.get("/", async (req: Request, res: Response) => {
    const bloggers: bloggerType[] = await bloggersService.findBloggers(req.body.title)
    res.send(bloggers)
});

bloggersRouter.get("/:id", async (req: Request, res: Response) => {
    const blogger: bloggerType | null = await bloggersService.findBloggerById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
});

bloggersRouter.post("/", authMiddleware, nameValidation, urlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const blogger: bloggerType = await bloggersService.createBlogger(req.body.name, req.body.youtubeUrl)
    res.status(201).send(blogger)
});

bloggersRouter.put("/:id", authMiddleware, nameValidation, urlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated: boolean = await bloggersService.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }
});

bloggersRouter.delete("/:id", authMiddleware, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await bloggersService.deleteBlogger(+req.params.id);
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404);
    }
})
