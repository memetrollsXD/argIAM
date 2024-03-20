<div class="header">
    <h1>XeonDB</h1>
</div>

<slot />

<style>
    .header {
        background-color: midnightblue;
        height: 50px;
        width: 100%;
        margin: 0;
        color: white;
        display: flex;
        align-items: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 50px;
    }

    h1 {
        margin-left: 10px;
    }

    :global(body) {
        margin: 0;
    }
</style>