# SvelteKit Yjs form POC

Context: https://github.com/stephane-klein/backlog/issues/274

## Getting started

```sh
$ asdf install
$ pnpm install
```

Start WebRTC server:

```
$ ./node_modules/.bin/y-webrtc-signaling
Signaling server running on localhost: 4444
```

Start webapp:

```
$ pnpm run dev
```

Open http://localhost:5173/form1 in two browser windom and play with form fields.
