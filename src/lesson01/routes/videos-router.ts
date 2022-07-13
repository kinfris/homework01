import {Router, Request, Response} from "express";
import {body} from "express-validator";
import {videosRepositories} from "../repositories/videos-repositories";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const videosRouter = Router();

const titleValidation = body("title").trim().isLength({
    min: 3,
    max: 40
}).withMessage("title length must be from 3 to 40 symbols");

const authorValidation = body("author").trim().isLength({
    min: 3,
    max: 40
}).withMessage("title length must be from 3 to 40 symbols");

videosRouter.get("/", (req: Request, res: Response) => {
    res.send(videosRepositories.getAllVideos())
});

videosRouter.post("/", titleValidation, authorValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const newVideo = videosRepositories.createVideo(req.body.title, req.body.author)

    res.status(201).send(newVideo)
});

videosRouter.get("/:id", (req: Request, res: Response) => {
    const video = videosRepositories.getVideoById(req.params.id);
    if (video) {
        res.send(video);
    } else {
        res.send(404)
    }

})

videosRouter.put("/:id", titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const video = videosRepositories.updateVideoTitle(req.params.id, req.body.title);
    if (video) {
        res.send(204);
    } else {
        res.send(404)
    }
})

videosRouter.delete("/:id", (req: Request, res: Response) => {
    const isDeleted = videosRepositories.deleteVideo(req.params.id);
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }
})


