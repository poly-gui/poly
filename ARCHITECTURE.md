# Architecture

Poly is made of layered, language-neutral contracts and language/platform-specific implementations.

## Layers

1. `protocol/`
   Poly-owned RPC schemas define the messages exchanged between portable application code and native runtimes.

2. `runtimes/`
   Native runtimes host the operating-system UI toolkit and implement the protocol. Current runtimes include GTK and Swift/AppKit.

3. `sdks/`
   Portable SDKs expose Poly application APIs in a host language. TypeScript is the current primary SDK.

4. `integrations/`
   Integrations adapt external UI frameworks or programming models onto an SDK. React is the current integration.

5. `tools/`
   Tools create, build, package, and run Poly applications.

6. `docs/`
   The documentation site explains the framework and should describe Poly as a multi-language system.

## NanoPack Boundary

NanoPack remains separate from Poly. Poly can depend on NanoPack runtimes and code generation, but NanoPack implementations and the `nanoc` compiler should not be absorbed into this repository as first-class Poly packages.

## Source Of Truth

The current documentation source is `docs/site`.

The Poly protocol source is `protocol/rpc`.

Generated protocol bindings may exist inside SDKs and runtimes when needed for package publishing or native builds, but schema edits should start in `protocol/rpc`.
