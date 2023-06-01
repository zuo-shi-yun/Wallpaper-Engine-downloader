uniform mat4 g_ModelViewProjectionMatrix;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;

void main() {
#if VERTICAL
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
#else
	gl_Position = vec4(a_Position, 1.0);
#endif
	v_TexCoord.xy = a_TexCoord;

}
