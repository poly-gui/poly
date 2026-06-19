# Poly

Poly is a multi-language framework for building native GUI applications from portable application code.

The repository is organized around the architecture of the system rather than around a single language ecosystem:

```text
protocol/       Poly-owned RPC schemas and protocol contracts
runtimes/       Native host implementations such as GTK and Swift/AppKit
sdks/           Portable application SDKs by language
integrations/   Framework adapters built on top of SDKs
libs/           Shared implementation libraries
tools/          Developer tools such as the Poly CLI
docs/           Documentation site for polygui.org
infra/          Repository automation and CI support
```

NanoPack is a separate project. Poly depends on NanoPack for serialization and code generation, but this repository owns only Poly-specific protocol schemas, runtimes, SDKs, tools, docs, and integrations.

## Current Components

| Path | Component |
| --- | --- |
| `protocol/rpc` | Poly RPC schema source |
| `runtimes/gtk` | GTK native runtime |
| `runtimes/swift` | Swift/AppKit native runtime |
| `sdks/typescript/core` | `@poly-gui/core` portable TypeScript SDK |
| `integrations/react` | `@poly-gui/react` React integration |
| `libs/twx` | Shared Tailwind-style class parser |
| `tools/poly-cli` | Poly CLI |
| `docs/site` | Current documentation site source |

Demo and test apps intentionally remain outside this monorepo migration for now.

## Development

Install JavaScript dependencies from the repository root:

```bash
pnpm install
```

Build JavaScript packages and docs that expose a `build` script:

```bash
pnpm build
```

Run the docs site:

```bash
pnpm dev:docs
```

Run Go checks for the CLI:

```bash
go test ./tools/poly-cli/...
```

Native runtime builds still need package-specific setup while the migration is completed.
