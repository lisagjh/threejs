uniform float iTime;
uniform vec2 iResolution;

varying vec2 vUv;

vec3 shape(in vec2 uv) {
    float time = iTime * 0.05 + 47.0;
    vec2 z = -1.0 + 2.0 * uv;
    z *= 1.5;

    vec3 col = vec3(1.0);
    for (int j = 0; j < 48; j++) {
        float s = float(j) / 16.0;
        float f = 0.2 * (0.5 + 1.0 * fract(sin(s * 20.0)));

        vec2 c = 0.5 * vec2(cos(f * time + 17.0 * s), sin(f * time + 19.0 * s));
