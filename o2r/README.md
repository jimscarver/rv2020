
## Admin Usage

To get a webkey for an admin UI:

```bash
npm run bootstrap
http://localhost:1341/ocaps/#s=...
```

Then start the server with `npm start` and visit the webkey address.


Start with "make game.gameBoard MyGame" to generate (and save) your initial
webkey, whose state includes a key pair for use on RChain.

## Contents

 - `server.js` - node.js Express app
   - `package.json` - passport-discord, etc.
   - `capper_start.js` - (should be moved into Capper)
   - `gateway/` - Capper app: server, UI for OAuth, rnode gRPC

## ES Modules in node.js

[ECMAScript Modules \| Node\.js v13\.12\.0 Documentation](https://nodejs.org/api/esm.html)
is experimental as of this writing.

ISSUE: use `"exports": "./main.js"`? Do we want to encapsulate other files?
