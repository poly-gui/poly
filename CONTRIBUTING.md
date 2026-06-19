# Contributing

This repository is intentionally multi-language. Prefer changes that keep dependency direction clear:

```text
protocol -> runtimes / sdks -> integrations -> apps
```

## Setup

Install the toolchains needed for the part of the stack you are editing:

- TypeScript packages and docs: `pnpm`
- CLI: Go
- Swift runtime: SwiftPM and Xcode tools
- GTK runtime and C libraries: CMake and the platform GTK dependencies

## Common Commands

```bash
pnpm install
pnpm build
pnpm dev:docs
go test ./tools/poly-cli/...
```

## Code Generation

Poly RPC schemas live in `protocol/rpc`.

When editing schemas, regenerate affected SDK/runtime bindings and keep the generated output policy explicit in the package you touched.

## Documentation

The docs site in `docs/site` is the documentation source of truth. Update it when changing architecture, setup, public APIs, or package names.
