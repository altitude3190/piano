#ifdef GL_ES
precision mediump float;
#endif

uniform float time;    // 時間経過を表す
uniform float t;
uniform vec2  resolution;       // resolution
uniform vec2  r;       // resolution
uniform sampler2D smp; // prev scene

const float PI = 3.14159265;
const vec3 bg = vec3(1.0, 0.99, 0.94); // #FFFEF7

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
 //rotate2d( sin(u_time)*PI ) * st;

void circle(vec2 p) {

    gl_FragColor = vec4(bg, 1.0);

    float rad = atan(p.y, p.x);
    if (rad < 0.0) { // 0 <= a <= 2PI
        rad = rad + 2.0 * PI;
    }

    float outer = step(0.1, length(p));
    float inter = step(0.09, length(p));


    vec3 color = bg;
    if (outer == 0.0 && inter == 1.0 && rad < PI * t * 2.0) {
        color = vec3(0.9, 0.25, 0.25); // #E06765
        gl_FragColor = vec4(color, 1.0);
    }

}


void vertical_line(vec2 p, vec2 start, vec2 end) {
    if (p.x >= start.x && p.x <= start.x + 0.01) {
        if (p.y <= start.y && p.y >= end.y) {
            if (p.y > start.y * cos(t)) {
                vec3 color = vec3(0.9, 0.25, 0.25); // #E06765
                gl_FragColor = vec4(color, 1.0);
            }
        }
    }
}



void main(void){

    // 正規化
    // スクリーンの中央が原点となり、上下左右には -1 ～ 1 の範囲を持つ座標系
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    // vec2  p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    circle(p);


    vertical_line(p, vec2(-0.005, 0.31)*2.0, vec2(-0.005, -0.31)*2.0);

    vertical_line(p, vec2(-0.485, 0.31), vec2(-0.485, -0.31));

    vertical_line(p, vec2(0.475, 0.31), vec2(0.475, -0.31));


    vertical_line(p, vec2(0.315, 0.16), vec2(0.315, -0.16));

    vertical_line(p, vec2(-0.305, 0.16), vec2(-0.305, -0.16));




    vertical_line(p, vec2(-0.425, 0.085), vec2(-0.425, -0.085));
    vertical_line(p, vec2(0.425, 0.085), vec2(0.425, -0.085));








}