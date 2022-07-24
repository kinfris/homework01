import {Router, Request, Response} from "express";
import {body} from "express-validator";
import {videosRepositories, VideoType} from "../repositories/videos-repositories";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const videosRouter = Router();

const titleValidation = body("title").trim().isLength({
    min: 3,
    max: 40
}).withMessage("title length must be from 3 to 40 symbols");

videosRouter.get("/", async (req: Request, res: Response) => {
    let videos: VideoType[] = await videosRepositories.getAllVideos();
    res.send(videos)
});

videosRouter.post("/", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newVideo: VideoType = await videosRepositories.createVideo(req.body.title)
    if (newVideo) {
        res.status(201).send(newVideo)
    } else {
        res.send(404)
    }
});

videosRouter.get("/:id", async (req: Request, res: Response) => {
    const video: VideoType | undefined = await videosRepositories.getVideoById(req.params.id);
    if (video) {
        res.send(video);
    } else {
        res.send(404)
    }

})

videosRouter.put("/:id", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const video: VideoType | undefined = await videosRepositories.updateVideoTitle(req.params.id, req.body.title);
    if (video) {
        res.send(204);
    } else {
        res.send(404)
    }
})

videosRouter.delete("/:id", async (req: Request, res: Response) => {
    const isDeleted: boolean = await videosRepositories.deleteVideo(req.params.id);
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404);
    }
})


