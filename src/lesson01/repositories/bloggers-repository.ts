type bloggersType = {
    id: number
    name: string
    youtubeUrl: string
}

export const bloggers: bloggersType[] = []

export const bloggersRepositories = {
    getAllBloggers() {
        return bloggers
    },

    getBloggerById(id: string) {
        return bloggers.find(b => b.id === +id)
    },

    createBlogger(name: string, youtubeUrl: string) {
        const blogger = {
            id: +(new Date),
            name,
            youtubeUrl
        }
        bloggers.push(blogger);
        return blogger;
    },

    updateBlogger(id: string, name: string, youtubeUrl: string){
        let blogger = bloggers.find(b => b.id === +id);
        if(blogger){
            blogger.name = name;
            blogger.youtubeUrl = youtubeUrl;
            return blogger
        }
    },

    deleteBlogger(id: string){
        for (let i = 0; i < bloggers.length; i++) {
            if(bloggers[i].id === +id){
                bloggers.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
