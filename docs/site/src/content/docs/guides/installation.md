---
title: Installation
description: A guide in how to install and setup Poly
---

All Poly applications are created and managed through the `poly` CLI. The CLI source lives in `tools/poly-cli` in the Poly monorepo.

## Pre-requisites

- [Xcodegen](https://github.com/yonaskolb/XcodeGen) for generating xcode projects on macOS

## Download

Pre-built binaries of the CLI are published as [GitHub releases](https://github.com/poly-gui/cli/releases).
Put the binary in a directory that is in PATH, or add the directory it is in to PATH, then it is ready to go.

### Building the CLI

The CLI can also be built from the source code, which requires:

- [Go 1.20 or higher](https://go.dev/dl/)

First, clone the Poly monorepo and change into the CLI package:

```
git clone https://github.com/poly-gui/poly.git
cd poly/tools/poly-cli
```

Install the required dependencies:

```
go mod download
```

Finally, build and install the binary:

```
go install poly-cli/cmd/poly
```

The `poly` command should now be installed and ready to use. Make sure `GOBIN`
is in PATH, which defaults to `$(go env GOPATH)/bin`. If not, add:

```
export PATH="$PATH:$(go env GOPATH)/bin"
```

or if `GOBIN` is set:

```
export PATH="$PATH:$(go env GOBIN)/bin"
```

to your path.

:::note
For more information on `GOPATH` and `GOBIN`, please consult
the [official documentation](https://go.dev/doc/install/source#gopath).
:::
