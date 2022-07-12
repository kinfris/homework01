import {v4} from "uuid"

type videoType = {
    id: string
    title: string
    author: string
}

const videos: videoType[] = [
    {
        id: v4(),
        title: "first item",
        author: "Yura"
    },
    {
        id: v4(),
        title: "second item",
        author: "Andrew"
    }
]

export const videosRepositories = {
    getAllVideos() {
        return videos
    },

    getVideoById(id: string) {
        return videos.find(v => v.id === id);
    },

    createVideo(title: string, author: string) {
        const video = {
            id: v4(),
            title: title,
            author: author
        }
        videos.push(video);
        return video;
    },

    updateVideoTitle(id: string, title: string) {
        let video = videos.find(v => v.id === id)
        if (video) {
            video.title = title;
            return video
        }
    },
    deleteVideo(id: string) {
        for (let i = 0; i < videos.length; i++) {
            if(videos[i].id === id){
                videos.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
