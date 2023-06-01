attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;

void main() {
	gl_Position = vec4(a_Position, 1.0);
	v_TexCoord.xy = a_TexCoord;
}
