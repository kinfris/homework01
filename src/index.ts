import express from 'express';
import {videosRouter} from "./lesson01/routes/videos-router"

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/lesson_01/api/videos", videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
