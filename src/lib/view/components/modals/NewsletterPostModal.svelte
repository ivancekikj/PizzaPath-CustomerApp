<script lang="ts">
    import Modal from "$lib/view/components/modals/Modal.svelte";
    import type {NewsletterPost} from "$lib/domain/models";

    export let post: NewsletterPost;
</script>

<Modal title={post.title} id="newsletter-post-modal">
    <div slot="body">
        <div class="mb-20px">
            <p>{post.content}</p>
        </div>
        <div>
            <div>Posted on: <span class="fw-bold">{post.date}</span></div>
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
    </div>
</Modal>