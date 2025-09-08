<script lang="ts">
	export let title: string = ''
	export let id: string = ''
</script>

<div class="modal fade" {id} tabindex="-1" aria-labelledby="{id}-label" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="{id}-label">{title}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<slot name="body"></slot>
			</div>
			<div class="modal-footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</div>
