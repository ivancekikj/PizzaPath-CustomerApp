<div class="row g-4">
    <!-- Repeat this col for each post -->
    <div class="col-md-6 col-lg-6">
        <div class="card p-3">
            <div class="card-body">
                <h5 class="post-title">[Post Title]</h5>
                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    <a href="#" class="more">more</a>
                </p>
                <p class="fw-bold mb-0">Posted on: <span class="fw-normal">[date]</span></p>
            </div>
        </div>
    </div>
    <!-- Repeat ends -->

    <!-- Copy the above "col-md-6" block three more times for a total of 4 posts -->
    <div class="col-md-6 col-lg-6">
        <div class="card p-3">
            <div class="card-body">
                <h5 class="post-title">[Post Title]</h5>
                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    <a href="#" class="more">more</a>
                </p>
                <p class="fw-bold mb-0">Posted on: <span class="fw-normal">[date]</span></p>
            </div>
        </div>
    </div>

    <div class="col-md-6 col-lg-6">
        <div class="card p-3">
            <div class="card-body">
                <h5 class="post-title">[Post Title]</h5>
                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    <a href="#" class="more">more</a>
                </p>
                <p class="fw-bold mb-0">Posted on: <span class="fw-normal">[date]</span></p>
            </div>
        </div>
    </div>

    <div class="col-md-6 col-lg-6">
        <div class="card p-3">
            <div class="card-body">
                <h5 class="post-title">[Post Title]</h5>
                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    <a href="#" class="more">more</a>
                </p>
                <p class="fw-bold mb-0">Posted on: <span class="fw-normal">[date]</span></p>
            </div>
        </div>
    </div>
</div>

<!-- Footer: Showing count + Pagination -->
<div class="d-flex justify-content-between align-items-center mt-4">
    <div>Showing posts 1 to 4 out of 15.</div>
    <nav>
        <ul class="pagination mb-0">
            <li class="page-item disabled">
                <span class="page-link">&lt;</span>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">&gt;</a>
            </li>
        </ul>
    </nav>
</div>

<style>
    .card {
        border-radius: 10px;
        height: 100%;
    }
    .post-title {
        font-weight: bold;
    }
    .more {
        color: #007bff;
        text-decoration: none;
    }
    .more:hover {
        text-decoration: underline;
    }
    .pagination .page-item.disabled .page-link {
        background-color: #e9ecef;
        color: #6c757d;
        border: none;
    }
</style>