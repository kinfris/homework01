export type VideoType = {
    id: number
    title: string
    author: string
}

const videos: VideoType[] = []

export const videosRepositories = {
    async getAllVideos(): Promise<VideoType[]> {
        return videos
    },

    async getVideoById(id: string): Promise<VideoType | undefined> {
        return videos.find(v => v.id === +id);
    },

    async createVideo(title: string): Promise<VideoType> {
        const video = {
            id: +(new Date()),
            title: title,
            author: "any author"
        }
        videos.push(video);
        return video;
    },

    async updateVideoTitle(id: string, title: string): Promise<VideoType | undefined> {
        let video = videos.find(v => v.id === +id)
        if (video) {
            video.title = title;
            return video
        }
    },
    async deleteVideo(id: string): Promise<boolean> {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === +id) {
                videos.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
