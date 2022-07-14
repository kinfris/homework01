import {bloggersRepositories} from "./bloggers-repository";

type postsType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}

export const posts: postsType[] = []

export const postsRepositories = {
    getAllPosts() {
        return posts
    },

    getPostById(id: string) {
        const post = posts.find(p => p.id === +id)
        if (post) {
            return post
        }
    },

    createPost(title: string, shortDescription: string, content: string, bloggerId: string) {
        let blogger = bloggersRepositories.getBloggerById(bloggerId);

        if (blogger) {
            const newPost = {
                id: +(new Date()),
                title,
                shortDescription,
                content,
                bloggerId: +bloggerId,
                bloggerName: blogger.name
            }

            posts.push(newPost)
            return newPost
        }
    },

    updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string){
        const post = posts.find(p => p.id === +id);
        if(post){
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.bloggerId = +bloggerId;

            return true;
        }
        return false;
    },

    deletePost(id: string){
        const postId = posts.findIndex(p => p.id === +id);
        if(postId >= 0){
            posts.splice(postId, 1);
            return true
        }
        return false
    }
}
