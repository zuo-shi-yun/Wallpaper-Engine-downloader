varying vec2 v_TexCoord[4];

uniform sampler2D g_Texture0; // {"hidden":true}

void main() {

	float weight = 0.0;
	vec4 result = CAST4(0.0), sample;
	for (int i = 0; i < 4; ++i)
	{
		sample = texSample2D(g_Texture0, v_TexCoord[i]);
		result += sample * sample.a;
		weight += sample.a;
	}

	gl_FragColor = vec4(result.rgb / max(0.001, weight), result.a / 4.0);
}
