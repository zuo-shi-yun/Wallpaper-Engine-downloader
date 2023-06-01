// [COMBO] {"material":"Mode","combo":"MODE","type":"options","default":1,"options":{"Mask":1,"Depth of field":2}}
// [COMBO] {"material":"ui_editor_properties_blend_mode","combo":"BLENDMODE","type":"imageblending","default":0}

#include "common.h"
#include "common_blending.h"

uniform sampler2D g_Texture0; // {"hidden":true}
uniform sampler2D g_Texture1; // {"hidden":true}
uniform sampler2D g_Texture2; // {"hidden":true}
uniform float u_alpha; // {"material":"Opacity","default":1,"range":[0,1]}
uniform float u_samples; // {"material":"Guassian samples","int":true,"default":3,"range":[0,13]}
uniform float u_strength; // {"material":"Strength","default":1,"range":[0,2]}
uniform float u_aperture; // {"material":"Aperture","default":2,"range":[0,3]}
uniform vec4 g_Texture0Resolution;

varying vec4 v_TexCoord;

#define pixelSize (1.0 / g_Texture0Resolution.xy)

#define KERNEL 1
#define kernelSize 3.0

#if MODE == 1
#define strength saturate(log(u_strength * 5.0 + 1.0))
#define strength1 saturate(log(u_strength * 5.0))
#else
#define strength saturate(log(u_aperture * 5.0 + 1.0))
#define strength1 saturate(log(u_aperture * 5.0))
#endif

float remap01(float a, float b, float v){
	return (v - a) / (b - a);
}

void main() {
	vec4 albedo = texSample2D(g_Texture0, v_TexCoord.xy);
	float depth = texSample2D(g_Texture2, v_TexCoord.xy).r;
#if MODE == 2
	depth *= 10.0;
#endif

#if KERNEL != 0
	if (depth > 0.0 && strength > 0.0) {
		vec4 startAlbedo = albedo;
		vec2 offset = CAST2(0.0);
		vec2 pixelStep = saturate(depth) * pixelSize;
		float multiplier = 10.0 * saturate(depth);
		for (int i = -KERNEL; i <= KERNEL; i++){
#if VERTICAL
			offset.y = float(i) * pixelStep.y;
#else
			offset.x = float(i) * pixelStep.x;
#endif
			albedo.rgb += texSample2D(g_Texture0, v_TexCoord.xy + offset).rgb / kernelSize * multiplier;
		}
		albedo.rgb /= saturate(depth) * 10.0 + 1.0;
		albedo.rgb = mix(startAlbedo.rgb, albedo.rgb, strength1);
	}
#endif

#if VERTICAL
	vec4 baseAlbedo = texSample2D(g_Texture1, v_TexCoord.xy);
	albedo = mix(baseAlbedo, vec4(ApplyBlending(BLENDMODE, baseAlbedo.rgb, albedo.rgb, 1.0 - saturate(exp(-depth * 10.0))), albedo.a), u_alpha * strength);
#endif
	gl_FragColor = albedo;
}