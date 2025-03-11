<script lang="ts">
    let username: string;
    let password: string;
</script>

<form class="mx-auto mb-100px mt-100px">
    <h1 class="text-center mb-50px">Login</h1>
    <div class="mb-20px">
        <label for="username" class="form-label">Username</label>
        <input required type="text" class="form-control" id="username" bind:value={username}>
    </div>
    <div class="mb-50px">
        <label for="password" class="form-label">Password</label>
        <input required type="password" class="form-control" id="password" bind:value={password}>
    </div>
    <button type="submit" class="btn btn-primary d-inline-block w-100 red-button">Submit</button>
</form>