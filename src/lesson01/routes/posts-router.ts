import {Router, Request, Response} from "express";
import {body} from "express-validator";
import {postsRepositories} from "../repositories/posts-repository";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";

export const postsRouter = Router();

const titleValidation = body("title").trim().isLength({
    min: 3,
    max: 30
}).withMessage("title length must be from 3 to 30 symbols");

const shortDescriptionValidation = body("shortDescription").trim().isLength({
    min: 3,
    max: 100
}).withMessage("shortDescription length must be from 3 to 100 symbols");

const contentValidation = body("content").trim().isLength({
    min: 3,
    max: 1000
}).withMessage("content length must be from 3 to 1000 symbols");

const bloggerIdValidation = body("bloggerId").trim().isLength({
    min: 3
}).withMessage("bloggerId is required");

const bloggerIdErrorMsg = {
    errorsMessages: [
        {
            message: "blogger with this id doesn`t exist",
            field: "bloggerId"
        }
    ]
}


postsRouter.get("/", (req: Request, res: Response) => {
    const posts = postsRepositories.getAllPosts();
    res.send(posts)
});

postsRouter.get("/:id", (req: Request, res: Response) => {
    const post = postsRepositories.getPostById(req.params.id);
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
});

postsRouter.post("/", authMiddleware,  titleValidation, shortDescriptionValidation, contentValidation,
    bloggerIdValidation, inputValidationMiddleware, (req: Request, res: Response) => {
        const post = postsRepositories.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId);
        if (post) {
            res.status(201).send(post)
        } else {
            res.status(400).json(bloggerIdErrorMsg)
        }
    });

postsRouter.put("/:id", authMiddleware, titleValidation,
    shortDescriptionValidation, contentValidation,
    bloggerIdValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const updatedPost = postsRepositories.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId);
        const post = postsRepositories.getPostById(req.params.id);
        if (post) {
            if (updatedPost) {
                res.send(204)
            } else {
                res.status(400).json(bloggerIdErrorMsg)
            }
        } else {
            res.send(404)
        }
    });

postsRouter.delete("/:id", authMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    const post = postsRepositories.deletePost(req.params.id);
    if (post) {
        res.send(204)
    } else {
        res.send(404)
    }
});
