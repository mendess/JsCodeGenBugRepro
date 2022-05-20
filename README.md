# Kotlin/Js codegen bug

### Kotlin Version: 1.6.20
### Kotlin/JS compiler: IR

This is a minimal reproduction of the bug. The bug arises from extending an
abstract class defined in a kt mp library, that has a method with a **defaulted**
parameter.

The extending class, if it is defined in JS land, will not work when called by
the kt library, as the kt library will try to call the mangled method on this
"native" type which does not exist.

Note that this only affects classes defined outside the ktmp library. Classes
defined in the library, always work, both when instanciated outside the library
and inside.

Stack trace:

```typescript
TypeError: this.adapter_1.method_3w4bny_k$ is not a function
    at AdapterUser.method (/home/src/commonMain/kotlin/xyz/mendess/Adapter.kt:20:17)
    at Object.<anonymous> (/home/work/projects/JsCodeGenBugRepro/example/web/index.ts:14:6)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Module.m._compile (/home/work/projects/JsCodeGenBugRepro/example/web/node_modules/ts-node/src/index.ts:1455:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Object.require.extensions.<computed> [as .ts] (/home/work/projects/JsCodeGenBugRepro/example/web/node_modules/ts-node/src/index.ts:1458:12)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:827:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at phase4 (/home/work/projects/JsCodeGenBugRepro/example/web/node_modules/ts-node/src/bin.ts:567:12)
```
