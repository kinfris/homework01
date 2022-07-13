type videoType = {
    id: number
    title: string
    author: string
}

const videos: videoType[] = []

export const videosRepositories = {
    getAllVideos() {
        return videos
    },

    getVideoById(id: string) {
        return videos.find(v => v.id === +id);
    },

    createVideo(title: string, author: string) {
        const video = {
            id: +(new Date()),
            title: title,
            author: author
        }
        videos.push(video);
        return video;
    },

    updateVideoTitle(id: string, title: string) {
        let video = videos.find(v => v.id === +id)
        if (video) {
            video.title = title;
            return video
        }
    },
    deleteVideo(id: string) {
        for (let i = 0; i < videos.length; i++) {
            if(videos[i].id === +id){
                videos.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
