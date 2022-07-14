import express from 'express';
import {videosRouter} from "./lesson01/routes/videos-router"
import {bloggersRouter} from "./lesson01/routes/bloggers-router";
import {postsRouter} from "./lesson01/routes/posts-router";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/lesson_01/api/videos", videosRouter);
app.use("/hs_01/api/bloggers", bloggersRouter);
app.use("/hs_01/api/posts", postsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
