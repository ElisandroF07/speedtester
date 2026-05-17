#include <emscripten.h>

extern "C" {
    static double start_time = 0.0;
    static unsigned long long total_bytes = 0;

    EMSCRIPTEN_KEEPALIVE
    void reset_test(double current_perf_time) {
        start_time = current_perf_time;
        total_bytes = 0;
    }

    EMSCRIPTEN_KEEPALIVE
    double calculate_speed(double current_perf_time, unsigned long chunk_size) {
        total_bytes += chunk_size;
        
        double duration = (current_perf_time - start_time) / 1000.0;
        
        if (duration <= 0.0) return 0.0;

        double bits = total_bytes * 8.0;
        
        double mbps = (bits / duration) / 1000000.0;
        return mbps;
    }
}
