import type {NewsletterPost} from "$lib/domain/models";
import axios from "axios";
import {ApiData} from "$lib/repository/ApiData";

async function getCurrentUserReceivedPosts(page: number): Promise<NewsletterPost[]> {
    const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/accounts/customers/received-posts/?page=${page}`);
    return response.data.map((post: any) => {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            date: post.date.split('T')[0],
        } as NewsletterPost;
    });
}

async function getCurrentUserReceivedPostsCount(): Promise<number> {
    const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/accounts/customers/received-posts/count/`);
    return response.data;
}

export const NewsletterPostsRepository = {
    getCurrentUserReceivedPosts,
    getCurrentUserReceivedPostsCount
};