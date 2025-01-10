## Overview

Example repo to showcase the errors from [this discussion](https://github.com/prisma/prisma/discussions/25916).

## Install Dependencies
```
pnpm install
```

## Testing with TSX
```
pnpm tsx src/main.ts
{ user: { id: 3, email: 'alice@example.com', name: 'Alice' } }
```

```
pnpm tsx --require ./instrumentation.ts src/main.ts
(node:42909) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

node:internal/modules/run_main:122
    triggerUncaughtException(
    ^
SyntaxError [Error]: The requested module '@prisma/instrumentation' does not provide an export named 'PrismaInstrumentation'
    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:384:37)
    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:329:47)
    at loadESMFromCJS (node:internal/modules/cjs/loader:1376:24)
    at Module._compile (node:internal/modules/cjs/loader:1528:5)
    at Object..js (node:internal/modules/cjs/loader:1698:10)
    at Module.load (node:internal/modules/cjs/loader:1303:32)
    at Function._load (node:internal/modules/cjs/loader:1117:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)
    at Module.require (node:internal/modules/cjs/loader:1325:12)

Node.js v23.3.0
```

## Testing build
```
pnpm tsc -b
```

```
node ./dist/src/main.js
{ user: { id: 5, email: 'alice@example.com', name: 'Alice' } }
```

```
node --require ./dist/instrumentation.js ./dist/src/main.js
file:///home/jeremy/projects/prisma-otel-error/dist/instrumentation.js:6
import { PrismaInstrumentation } from '@prisma/instrumentation';
         ^^^^^^^^^^^^^^^^^^^^^

SyntaxError: The requested module '@prisma/instrumentation' does not provide an export named 'PrismaInstrumentation'
    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:384:37)
    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:329:47)
    at loadESMFromCJS (node:internal/modules/cjs/loader:1376:24)
    at Module._compile (node:internal/modules/cjs/loader:1528:5)
    at Object..js (node:internal/modules/cjs/loader:1698:10)
    at Module.load (node:internal/modules/cjs/loader:1303:32)
    at Function._load (node:internal/modules/cjs/loader:1117:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)
    at Module.require (node:internal/modules/cjs/loader:1325:12)

Node.js v23.3.0
```