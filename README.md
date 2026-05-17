# 🚀 WebAssembly Network Speed Test

A modern, high-performance network speed testing engine built with **C++** and compiled to **WebAssembly (Wasm)**. The UI features a sleek, neon-lit analog gauge powered by **Tailwind CSS** and smoothly updated via **Web Workers**.

---

## ✨ Features
- **Ultra-Fast Engine**: Core logic implemented in C++ and compiled to WebAssembly for near-native performance.
- **Modern UI**: Neon-styled analog gauge using SVG, customized gradients, and Tailwind CSS v4.
- **Non-blocking UX**: Heavy lifting and network requests are offloaded to a Web Worker, keeping the main UI thread buttery smooth.
- **Sleek Typography**: Beautiful interface utilizing the Google Poppins font.

## 🛠️ Prerequisites

To compile the C++ source code into WebAssembly, you need the **Emscripten SDK (emsdk)**. The Emscripten toolchain is used to compile C/C++ to Wasm. 

## ⚙️ How to Compile WebAssembly

If you make changes to `speedtest.cpp`, you will need to recompile it. Follow these steps in your terminal at the root of the project:

### 1. Activate Emscripten Environment
Before compiling, you need to set up the Emscripten environment variables to make the `emcc` compiler available in your path:

```bash
# On Linux / macOS
source emsdk/emsdk_env.sh

# On Windows
emsdk\emsdk_env.bat
```

### 2. Compile the C++ Code
Run the `emcc` (Emscripten C++ Compiler) to generate the Wasm binary and the JavaScript glue code file:

```bash
emcc speedtest.cpp -O3 -s WASM=1 -o speedtest.js
```
*Tip: The `-O3` flag ensures the compiler deeply optimizes the resulting WebAssembly code for maximum speed and minimal file size.*

## 🚀 How to Run Locally

Because WebAssembly requires fetching external `.wasm` files, modern browsers restrict this over the `file://` protocol due to security policies (CORS). You must serve the directory using a local HTTP server.

You can spin up a quick server using Python:

```bash
# Using Python 3
python3 -m http.server 8000
```

Then, open your browser and navigate to:
**[http://localhost:8000](http://localhost:8000)**

## 📄 File Structure Overview
- `index.html` - The main UI (Tailwind CSS, Frontend logic).
- `worker.js` - Web Worker handling background download tests and Wasm communication.
- `speedtest.cpp` - The C++ source code where the core logic resides.
- `speedtest.js` - Generated JavaScript glue code (do not edit directly).
- `*.wasm` - The compiled WebAssembly binary bundle.
