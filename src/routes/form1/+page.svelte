<script>
    let title = '';
    let category = null;
    let description = '';
</script>

<h1>Edit issue</h1>

<form method="POST">
    <div>
        <label for="title">Title:</label>
        <input
            id="title"
            name="title"
            bind:value={title}
            placeholder="Fill in the issue title here"
        />
    </div>
    <div>
        <label for="category">Category:</label>
        <select
            id="category"
            name="category"
            bind:value={category}
        >
            <option value="null">-</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
        </select>
    </div>

    <div>
        <label for="description">Description:</label><br />
        <textarea
            id="descrption"
            name="descrption"
            bind:value={description}
            placeholder="Issue description"
        />
    </div>

    <input type="submit" value="Save" />
</form>

Data:

<pre>
title: {title}
category: {category}
description: {description}
</pre>
