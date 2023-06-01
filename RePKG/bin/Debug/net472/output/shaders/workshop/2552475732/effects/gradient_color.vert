#include "common.h"



uniform mat4 g_ModelViewProjectionMatrix;
uniform mat4 g_ModelViewProjectionMatrixInverse;



uniform vec4 g_Texture0Resolution;

#if MASK == 1
uniform vec4 g_Texture1Resolution;
#endif



attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;


void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord.xy = a_TexCoord;

#if MASK == 1
	v_TexCoord.zw = vec2(a_TexCoord.x * g_Texture1Resolution.z / g_Texture1Resolution.x,
						a_TexCoord.y * g_Texture1Resolution.w / g_Texture1Resolution.y);
#endif
}
