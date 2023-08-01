<script>
    import './main.css';
    import { onMount, onDestroy } from 'svelte'
    import * as Y from 'yjs';
    import { WebrtcProvider } from 'y-webrtc';
	import { readableMap } from 'svelt-yjs';
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
    import Collaboration from '@tiptap/extension-collaboration';
    import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

    let element;
    let editor;

    const ydoc = new Y.Doc();
	let dict;
    const provider = new WebrtcProvider(
        'your-room-name',
        ydoc,
        {
            signaling: ['ws://localhost:4444']
        }
    );

    const ymap = ydoc.getMap('dict');
    dict = readableMap(ymap);

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit.configure({
                    history: false
                }),
                Collaboration.configure({
                    document: ydoc
                }),
                CollaborationCursor.configure({
                    provider: provider,
                    user: {
                        name: 'Cyndi Lauper',
                        color: '#f783ac',
                    },
                }),
            ],
            content: '<p>Hello World! 🌍️ </p>',
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
            },
            onBlur({ editor, event}) {
                console.log('on blur');
                console.log(editor.getText());
            }
        })
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy()
        }
    });
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
        <!--
        <textarea
            id="descrption"
            name="descrption"
            value={$dict.get('description')}
            on:change={({target}) => dict.y.set("description", target.value)}
            placeholder="Issue description"
        />
-->
        {#if editor}
            <button
                on:click={(event) => { editor.chain().focus().toggleHeading({ level: 1}).run(); event.preventDefault();}}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                H1
            </button>
            <button
                on:click={(event) => { editor.chain().focus().toggleHeading({ level: 2 }).run(); event.preventDefault();}}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                H2
            </button>
            <button
                    on:click={(event) => { editor.chain().focus().setParagraph().run(); event.preventDefault();}}
                    class:active={editor.isActive('paragraph')}>
                P
            </button>
        {/if}

        <div
            bind:this={element}
        />
    </div>

    <input type="submit" value="Save" />
</form>

Data:

<pre>
title: {$dict.get("title")}
category: {$dict.get("category")}
description: {$dict.get("description")}
</pre>
