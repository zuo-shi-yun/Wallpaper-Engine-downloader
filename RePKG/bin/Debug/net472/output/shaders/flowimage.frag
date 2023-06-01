
#include "common_fragment.h"

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;
//uniform sampler2D g_Texture2;

uniform float g_Brightness; // {"material":"Bright","default":1,"range":[0,2]}
uniform float g_Time;
uniform float g_FlowSpeed; // {"material":"Speed","default":1,"range":[0.01, 1]}
uniform float g_FlowAmp; // {"material":"Amount","default":1,"range":[0.01, 1]}

varying vec2 v_TexCoord;

void main() {
	vec3 flowColors = texSample2D(g_Texture1, v_TexCoord.xy).rgb;
	vec2 flowMask = (flowColors.rg - vec2(0.5, 0.5)) * 2.0;
	
	vec2 cycles = vec2(frac(g_Time * g_FlowSpeed + flowColors.b), frac(g_Time * g_FlowSpeed + flowColors.b + 0.5));
	float blend = 2 * abs(cycles.x - 0.5);
	
	vec2 flowUVOffset1 = flowMask * g_FlowAmp * 0.1 * cycles.x;
	vec2 flowUVOffset2 = flowMask * g_FlowAmp * 0.1 * cycles.y;

	vec4 albedo = mix(texSample2D(g_Texture0, v_TexCoord.xy + flowUVOffset1),
					texSample2D(g_Texture0, v_TexCoord.xy + flowUVOffset2),
					blend);

	//vec2 normal = mix(texSample2D(g_Texture2, v_TexCoord.xy * 4 + flowUVOffset1),
	//				texSample2D(g_Texture2, v_TexCoord.xy * 4 + flowUVOffset2),
	//				blend);
	//normal = lerp(vec2(0.5, 0.5), normal, smoothstep(0, 0.15, dot(flowMask, flowMask)));
	
	//vec4 albedo = vec4(normal, 0, 1);
	//vec4 albedo = texSample2D(g_Texture0, v_TexCoord.xy + (normal * 2 - 1) * 0.02);
	
	albedo.rgb *= g_Brightness;
	//albedo.a *= g_UserAlpha;
	//albedo.rgb = pow(albedo.rgb, g_Power);
	
	gl_FragColor = albedo;
}
