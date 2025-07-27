<script lang="ts">
    import type {NewsletterPost} from "$lib/domain/models";
    import {NewsletterPostsRepository} from "$lib/repository/NewsletterPostsRepository";

    let posts: NewsletterPost[];
    let totalCount: number;
    let page = 1;
    let startPostIndex = -1;
    let endPostIndex = -1;
    let leftDisabled = false;
    let rightDisabled = false;

    async function loadPosts(): Promise<void> {
        posts = await NewsletterPostsRepository.getCurrentUserReceivedPosts(page);
        startPostIndex = (page - 1) * 4 + 1;
        endPostIndex = Math.min(page * 4, totalCount);
        leftDisabled = startPostIndex === 1;
        rightDisabled = endPostIndex >= totalCount;
    }
    
    async function loadNextPage(): Promise<void> {
        if (!rightDisabled) {
            page++;
            await loadPosts();
        }
    }
    
    async function loadPreviousPage(): Promise<void> {
        if (!leftDisabled) {
            page--;
            await loadPosts();
        }
    }

    function getFirst100Chars(text: string): string {
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    }

    async function initialLoad(): Promise<void> {
        totalCount = await NewsletterPostsRepository.getCurrentUserReceivedPostsCount();
        if (totalCount === 0)
            return;
        await loadPosts();
    }
</script>

{#await initialLoad() then _}
    {#if totalCount === 0}
        <p>No posts received.</p>
    {:else}
        <div class="row g-4">
            {#each posts as post}
                <div class="col-md-6 col-lg-6">
                    <div class="card p-3">
                        <div class="card-body">
                            <h5 class="fw-bold">{post.title}</h5>
                            <p class="card-text">
                                {#if post.content.length > 100}
                                    {getFirst100Chars(post.content)}
                                    <span class="more">more</span>
                                {:else}
                                    {post.content}
                                {/if}
                            </p>
                            <p class="fw-bold mb-0">Posted on: <span class="fw-normal">{post.date}</span></p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
            <div>Showing posts {startPostIndex} to {endPostIndex} out of {totalCount}.</div>
            <nav>
                <ul class="pagination mb-0">
                    <li class="page-item">
                        <button class="page-link" disabled={leftDisabled} on:click={loadPreviousPage}>&lt;</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" disabled={rightDisabled} on:click={loadNextPage}>&gt;</button>
                    </li>
                </ul>
            </nav>
        </div>
    {/if}
{/await}

<style>
    .card {
        border-radius: 10px;
        height: 100%;
    }

    .more {
        color: #007bff;
        text-decoration: none;
    }

    .more:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .page-item > button {
        color: black;
    }

    .page-item > button:disabled {
        background: lightgray;
        color: white;
    }

    .page-item > button:focus {
        box-shadow: none;
        outline: none;
    }
</style>
