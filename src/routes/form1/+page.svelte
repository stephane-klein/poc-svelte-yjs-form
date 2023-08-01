<script>
    import { onMount } from 'svelte';
    import * as Y from 'yjs';
	// import { WebsocketProvider } from 'y-websocket';
    import { WebrtcProvider } from 'y-webrtc';
	import { readableMap } from 'svelt-yjs';
    import {schema} from "prosemirror-schema-basic"
    import {EditorState} from "prosemirror-state"
    import {EditorView} from "prosemirror-view"

    export let editor = null
    let state = EditorState.create({schema})
    let view = new EditorView(document.body, {state})

    onMount(() => {
        console.log("editor");
        console.log(editor);
        view = new EditorView({mount: editor}, {

    });

    const ydoc = new Y.Doc();
	let dict;
    // new WebsocketProvider("ws://localhost:1234", 'example', ydoc);
    new WebrtcProvider(
        'your-room-name',
        ydoc,
        {
            signaling: ['ws://localhost:4444']
        }
    );

    const ymap = ydoc.getMap('dict');
    dict = readableMap(ymap);
</script>

<h1>Edit issue</h1>

<form method="POST">
    <div>
        <label for="title">Title:</label>
        <input
            id="title"
            name="title"
            value={$dict.get('title')}
            on:change={({target}) => dict.y.set("title", target.value)}
            placeholder="Fill in the issue title here"
        />
    </div>
    <div>
        <label for="category">Category:</label>
        <select
            id="category"
            name="category"
            value={$dict.get('category')}
            on:change={({target}) => dict.y.set("category", target.value)}
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
            value={$dict.get('description')}
            on:change={({target}) => dict.y.set("description", target.value)}
            placeholder="Issue description"
        />
    </div>

    <input type="submit" value="Save" />
</form>

<div
     bind:this={editor}
></div>


Data:

<pre>
title: {$dict.get("title")}
category: {$dict.get("category")}
description: {$dict.get("description")}
</pre>
