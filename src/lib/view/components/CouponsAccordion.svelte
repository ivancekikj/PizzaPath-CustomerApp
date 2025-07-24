<div class="accordion" id="categoryAccordion">

    <!-- Category 1 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading1">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                [Category 1]
            </button>
        </h2>
        <div id="collapse1" class="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#categoryAccordion">
            <div class="accordion-body">
                <div class="food-item">[Food 1]: <strong>6</strong></div>
                <div class="food-item">[Food 2]: <strong>4</strong></div>
                <div class="food-item">[Food 3]: <strong>6</strong></div>
                <div class="food-item">[Food 4]: <strong>3</strong></div>
            </div>
        </div>
    </div>

    <!-- Category 2 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading2">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                [Category 2]
            </button>
        </h2>
        <div id="collapse2" class="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#categoryAccordion">
            <div class="accordion-body">
                <!-- Empty or content -->
            </div>
        </div>
    </div>

    <!-- Category 3 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading3">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                [Category 3]
            </button>
        </h2>
        <div id="collapse3" class="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#categoryAccordion">
            <div class="accordion-body">
                <!-- Empty or content -->
            </div>
        </div>
    </div>

    <!-- Category 4 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading4">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                [Category 4]
            </button>
        </h2>
        <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#categoryAccordion">
            <div class="accordion-body">
                <!-- Empty or content -->
            </div>
        </div>
    </div>

    <!-- Category 5 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading5">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                [Category 5]
            </button>
        </h2>
        <div id="collapse5" class="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#categoryAccordion">
            <div class="accordion-body">
                <!-- Empty or content -->
            </div>
        </div>
    </div>
</div>

<style>
    .food-item {
        padding-left: 1.5rem;
        font-family: sans-serif;
    }
    .accordion-button::after {
        transform: rotate(90deg);
    }
    .accordion-button.collapsed::after {
        transform: rotate(0deg);
    }
    .accordion-body {
        background-color: #f8f0f0;
    }
</style>