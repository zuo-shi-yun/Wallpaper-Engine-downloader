// [COMBO] {"material":"Mode","combo":"MODE","type":"options","default":1,"options":{"Mask":1,"Depth of field":2}}
// [COMBO] {"material":"Autofocus","combo":"AUTOFOCUS","type":"options","default":0}
// [COMBO] {"material":"Adjust depth levels","combo":"DEPTHLEVELS","type":"options","default":0}
// [COMBO] {"material":"Invert opacity mask","combo":"INVERT_MASK","type":"options","default":0}
// [COMBO] {"material":"Invert depth map","combo":"INVERT_MAP","type":"options","default":0}

uniform sampler2D g_Texture0; // {"material":"framebuffer","label":"ui_editor_properties_framebuffer","hidden":true}
uniform sampler2D g_Texture1; // {"combo":"OPACITY","default":"util/white","label":"ui_editor_properties_opacity_mask","material":"mask","mode":"opacitymask","paintdefaultcolor":"1 1 1 1"}
uniform sampler2D g_Texture2; // {"combo":"DEPTH","default":"util/white","format":"r8","label":"ui_editor_properties_depth_map","mode":"depth","paintdefaultcolor":"1 1 1 1"}
uniform float u_strength; // {"material":"Strength","default":1,"range":[0,2]}
uniform float u_aperture; // {"material":"Aperture","default":2,"range":[0,3]}
uniform float u_focusDepth; // {"material":"Focus distance","default":0.5,"range":[0.01,1]}
uniform float u_focusScale; // {"material":"Focal length","default":1,"range":[0.01,3]}
uniform float u_multiplier; // {"material":"Depth levels multiplier","default":1,"range":[0,2]}
uniform float u_exponent; // {"material":"Depth levels exponent","default":1,"range":[0,2]}
uniform float u_offset; // {"material":"Depth levels offset","default":1,"range":[-2,2]}
uniform vec2 u_focusPoint; // {"default":"0.5 0.5","material":"Focus point","position":true}

varying vec2 v_TexCoord;

#if MODE == 1
#define strength log(u_strength * 5.0 + 1.0)
#else
#define strength log(u_aperture * 5.0 + 1.0)
#endif

void main() {
	float mask = texSample2D(g_Texture1, v_TexCoord.xy).r;
#if INVERT_MASK
	mask = 1.0 - mask;
#endif
	float depth = 1.0 - texSample2D(g_Texture2, v_TexCoord).r;
#if INVERT_MAP
	depth = 1.0 - depth;
#endif

#if MODE == 2
	if (mask > 0.0 && strength > 0.0){
#if AUTOFOCUS
		float focusDepth = 1.0 - texSample2D(g_Texture2, u_focusPoint).r;
#if INVERT_MAP
		focusDepth = 1.0 - focusDepth;
#endif
#else
		float focusDepth = u_focusDepth;
#endif

#if DEPTHLEVELS
		depth = max(pow(depth * u_multiplier, u_exponent) + u_offset, 0.0);
		focusDepth = max(pow(focusDepth * u_multiplier, u_exponent) + u_offset, 0.0);
#else
		depth = depth;
		focusDepth = max(focusDepth, 0.0);
#endif

		float coc = ((depth - focusDepth) / 10.0 / u_focusScale) * strength * mask;
		gl_FragColor = CAST4(abs(coc));
	} else {
		gl_FragColor = CAST4(0.0);
	}
#else 
	gl_FragColor = CAST4(mask);
#endif
}
