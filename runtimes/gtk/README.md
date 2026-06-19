# gtk-poly

This is an implementation of Poly using [GTK](https://www.gtk.org/) provided as a C++ library named `gtkpoly`. Poly
applications running on top of this layer will be native GTK4 apps.

## Dependencies

- [nanopack](https://github.com/poly-gui/nanopack): the C++ support library
  for [NanoPack](https://polygui.org/nanopack/introduction/), resolved by CMake with `find_package(nanopack REQUIRED)`.

## Building

This is a typical CMake project. To build this library locally, the following tools are required:

- CMake >= 3.27
- Make or Ninja as the CMake generator
- C++ compiler that supports C++20

From this repository, configure this package with CMake after installing the GTK and NanoPack dependencies.
