varying vec3 vPosition;

void main() {
  gl_FragColor = vec4(vPosition * 0.5 + 0.5, 1.0);
}

