import {Router, Request, Response} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";
import {postsService} from "../domain/posts-service";
import {postType} from "../types/post";
import {bloggersService} from "../domain/bloggers-service";
import {bloggerType} from "../types/bloger";

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

const isBloggerExist = body("bloggerId").custom(async value => {
    const blogger: bloggerType | null = await bloggersService.findBloggerById(value);
    if (!blogger) {
        return Promise.reject("Blogger with this id doesn`t exist")
    }
})

const bloggerIdErrorMsg = {
    errorsMessages: [
        {
            message: "blogger with this id doesn`t exist",
            field: "bloggerId"
        }
    ]
}


postsRouter.get("/", async (req: Request, res: Response) => {
    const posts: postType[] = await postsService.findPosts(req.body.title);
    res.send(posts)
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
    const post: postType | null = await postsService.findPostById(req.params.id);
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
});

postsRouter.post("/", authMiddleware, titleValidation, shortDescriptionValidation, contentValidation,
    bloggerIdValidation, isBloggerExist, inputValidationMiddleware, async (req: Request, res: Response) => {
        const post: postType | null = await postsService.createPost(req.body.bloggerId, req.body.title, req.body.shortDescription, req.body.content);
        if (post) {
            res.status(201).send(post)
        } else {
            res.sendStatus(404)
            //res.status(400).json(bloggerIdErrorMsg)
        }
    });

postsRouter.put("/:id", authMiddleware, titleValidation,
    shortDescriptionValidation, contentValidation,
    bloggerIdValidation, isBloggerExist, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const updatedPost: boolean = await postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId);
        if (updatedPost) {
            res.send(204)
        } else {
            res.send(404)
            // res.status(400).json(bloggerIdErrorMsg)
        }

    });

postsRouter.delete("/:id", authMiddleware, inputValidationMiddleware, async (req: Request, res: Response) => {
    const post: boolean = await postsService.deletePost(req.params.id);
    if (post) {
        res.send(204)
    } else {
        res.send(404)
    }
});
