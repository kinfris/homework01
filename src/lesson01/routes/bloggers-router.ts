import {Router, Request, Response} from "express";
import {bloggersRepositories} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const bloggersRouter = Router();

const nameValidation = body("name").trim().isLength({
    min: 3,
    max: 15
}).withMessage("name length must be from 3 to 15 symbols");

const urlValidation = body("youtubeUrl").trim().isLength({
    min: 3,
    max: 100
}).withMessage("youtubeUrl length must be from 3 to 100 symbols");

bloggersRouter.get("/", (req: Request, res: Response) => {
    const bloggers = bloggersRepositories.getAllBloggers()
    res.send(bloggers)
});

bloggersRouter.get("/:id", (req: Request, res: Response) => {
    const blogger = bloggersRepositories.getBloggerById(req.params.id)
    res.send(blogger)
});

bloggersRouter.post("/", nameValidation, urlValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const blogger = bloggersRepositories.createBlogger(req.body.name, req.body.youtubeUrl)
    res.status(201).send(blogger)
});

bloggersRouter.put("/:id", nameValidation, urlValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const blogger = bloggersRepositories.updateBlogger(req.params.id, req.body.name, req.body.youtubeUrl)
    if (blogger) {
        res.send(204)
    } else {
        res.send(404)
    }
});

bloggersRouter.delete("/:id", (req: Request, res: Response) => {
    const isDeleted = bloggersRepositories.deleteBlogger(req.params.id);
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404);
    }
})
