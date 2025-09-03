import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {get} from "svelte/store";
import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
import {CouponRepository} from "$lib/accounts/repository/CouponRepository";
import {NewsletterPostsRepository} from "$lib/accounts/repository/NewsletterPostsRepository";
import type {NewsletterPost} from "$lib/accounts/domain/models";

export const load: PageLoad = async () => {
    if (!get(AuthenticatedCustomerStore)) {
        throw redirect(302, '/login');
    }

    const couponsByCategoryId =
        await CouponRepository.getDetailedCurrentUserCouponInformation();
    const categoryCoupons = Array.from(couponsByCategoryId.values())
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

    const postsTotalCount = await NewsletterPostsRepository.getCurrentUserReceivedPostsCount();
    let posts: NewsletterPost[] = [];
    if (postsTotalCount > 0)
        posts = await NewsletterPostsRepository.getCurrentUserReceivedPosts(1);

    return {
        categoryCoupons,
        posts,
        postsTotalCount
    }
};