<script>
    import './main.css';
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
    import Collaboration from '@tiptap/extension-collaboration';
    import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
    import * as Y from 'yjs'
    import { WebrtcProvider } from 'y-webrtc'

    let element
    let editor

    const ydoc = new Y.Doc()
    const provider = new WebrtcProvider(
        'your-room-name',
        ydoc,
        {
            signaling: ['ws://localhost:4444']
        }
    );

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
        })
    })

    onDestroy(() => {
        if (editor) {
            editor.destroy()
        }
    })
</script>

{#if editor}
    <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
        class:active={editor.isActive('heading', { level: 1 })}
    >
        H1
    </button>
    <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class:active={editor.isActive('heading', { level: 2 })}
    >
        H2
    </button>
    <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
        P
    </button>
{/if}

<div bind:this={element} />
