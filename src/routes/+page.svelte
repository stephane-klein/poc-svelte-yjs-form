<h1>Edit issue</h1>

<form method="POST">
    <label for="name">Title:</label> <input id="name" name="name" placeholder="John Doe" /><br />
    <label for="category">Category:</label>
    <select name="category" id="category">
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
    </select>

    <label for="description">Description:</label><br />
    <textarea id="descrption" name="descrption" placeholder="Issue description" /><br />

    <input type="submit" value="Save" />
</form>
