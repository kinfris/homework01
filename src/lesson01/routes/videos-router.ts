import {Router, Request, Response} from "express";
import {videosRepositories} from "../repositories/videos-repositories";

export const videosRouter = Router();

videosRouter.get("/", (req: Request, res: Response) => {
    res.send(videosRepositories.getAllVideos())
});

videosRouter.post("/", (req: Request, res: Response) => {
    const newVideo = videosRepositories.createVideo(req.body.title, req.body.author)
    res.status(201).send(newVideo)
});

videosRouter.get("/:id", (req: Request, res: Response) => {
    const video = videosRepositories.getVideoById(req.params.id);
    res.send(video);
})

videosRouter.put("/:id", (req: Request, res: Response) => {
    const video = videosRepositories.updateVideoTitle(req.params.id, req.body.title);
    res.status(201).send(video);
})

videosRouter.delete("/:id", (req: Request, res: Response) => {
    const isDeleted = videosRepositories.deleteVideo(req.params.id);
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }

})


