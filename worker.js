importScripts('speedtest.js');

let wasmModule;
let c_reset_test;
let c_calculate_speed;

InitSpeedTestWasm().then((instance) => {
    wasmModule = instance;
    c_reset_test = wasmModule.cwrap('reset_test', 'void', ['number']);
    c_calculate_speed = wasmModule.cwrap('calculate_speed', 'number', ['number', 'number']);
    
    postMessage({ type: 'WASM_READY' });
});

self.onmessage = async (e) => {
    if (e.data.type === 'START_DOWNLOAD') {
        const targetUrl = e.data.url;
        
        try {
            c_reset_test(performance.now());
            
            const response = await fetch(targetUrl, { cache: 'no-store' });
            const reader = response.body.getReader();
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const currentMbps = c_calculate_speed(performance.now(), value.length);
                
                postMessage({ type: 'PROGRESS', speed: currentMbps });
            }
            
            postMessage({ type: 'COMPLETE' });
        } catch (error) {
            postMessage({ type: 'ERROR', message: error.message });
        }
    }
};
