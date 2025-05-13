<script lang="ts">
    import Modal from "$lib/view/components/modals/Modal.svelte";

    export let title: string;
    export let id: string;
    export let content: string;
    export let onSubmit: () => Promise<void>;
</script>

<Modal {title} {id}>
    <div slot="body">
        <p>{content}</p>
    </div>
    <div slot="footer">
        <button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
        <button class="btn green-button" data-bs-dismiss="modal" on:click={onSubmit}>Confirm</button>
    </div>
</Modal>