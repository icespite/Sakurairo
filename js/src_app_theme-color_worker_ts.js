/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@kotorik/palette/dist/index.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@kotorik/palette/dist/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "awaitImage": () => (/* binding */ p),
/* harmony export */   "convertToLab": () => (/* binding */ C),
/* harmony export */   "getHSLAComparer": () => (/* binding */ A),
/* harmony export */   "hslaCSSText": () => (/* binding */ I),
/* harmony export */   "kmeans": () => (/* binding */ u),
/* harmony export */   "labaToRGBA": () => (/* binding */ q),
/* harmony export */   "neuquant": () => (/* binding */ c),
/* harmony export */   "normalizeRGBA": () => (/* binding */ M),
/* harmony export */   "readImage": () => (/* binding */ m),
/* harmony export */   "readImageDownsampling": () => (/* binding */ y),
/* harmony export */   "readImageDownsamplingOffscreen": () => (/* binding */ b),
/* harmony export */   "readImageOffscreen": () => (/* binding */ d),
/* harmony export */   "rgbaCSSText": () => (/* binding */ x),
/* harmony export */   "rgbaToHSLA": () => (/* binding */ j)
/* harmony export */ });
/* harmony import */ var neuquant_js_src_neuquant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! neuquant-js/src/neuquant.js */ "./node_modules/neuquant-js/src/neuquant.js");
/* harmony import */ var neuquant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! neuquant-js */ "./node_modules/neuquant-js/src/helpers.js");
/* harmony import */ var color_space_rgb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! color-space/rgb.js */ "./node_modules/color-space/rgb.js");
/* harmony import */ var color_space_rgb_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(color_space_rgb_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var color_space_xyz_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! color-space/xyz.js */ "./node_modules/color-space/xyz.js");
/* harmony import */ var color_space_xyz_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(color_space_xyz_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var color_space_lab_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! color-space/lab.js */ "./node_modules/color-space/lab.js");
/* harmony import */ var color_space_lab_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(color_space_lab_js__WEBPACK_IMPORTED_MODULE_4__);
function o(r,t,n){var e=r[t++]-n[0],a=r[t++]-n[1],o=r[t++]-n[2],u=r[t++]-n[3];return Math.pow(e,2)+Math.pow(a,2)+Math.pow(o,2)+Math.pow(u,2)}function u(r,t,n,e){void 0===e&&(e=1);for(var a,u,f,l,c,v=[],s=[],h=[],p=0,m=0;m<t;m++){var d=Math.floor(Math.random()*r.length);s.push(Array.from(r.slice(d,d+4))),h.push(i(0,4)),v.push(i(0,5))}for(;p<n;){for(var g=0;g<r.length;){for(var y=0,b=o(r,g,s[0]),w=1;w<t;w++){var M=o(r,g,s[w]);M<b&&(b=M,y=w)}var j=v[y];j[0]+=r[g++],j[1]+=r[g++],j[2]+=r[g++],j[3]+=r[g++],j[4]++}for(var A=0,I=0;I<t;I++){var x=v[I],C=x[4];if(0==C){var q=Math.floor(Math.random()*r.length);h[I]=Array.from(r.slice(q,q+4)),A+=e}else{for(var z=h[I],S=0;S<4;S++)z[S]=x[S]/C;A+=Math.sqrt((f=(a=s[I])[1]-(u=h[I])[1],l=a[2]-u[2],c=a[3]-u[3],Math.pow(a[0]-u[0],2)+Math.pow(f,2)+Math.pow(l,2)+Math.pow(c,2)))}}if(A<=e)return{centroid:h,iteration:p,fit:!0,label:v.map(function(r){return r[4]}),size:r.length};var E=s;s=h,h=E,p++;for(var D=0;D<t;D++){var O=v[D];O[0]=0,O[1]=0,O[2]=0,O[3]=0,O[4]=0}}return{centroid:s,iteration:p,fit:!1,label:v.map(function(r){return r[4]}),size:r.length}}function i(r,t){for(var n=[],e=0;e<t;e++)n.push(r);return n}function f(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function l(r,t){var n="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(n)return(n=n.call(r)).next.bind(n);if(Array.isArray(r)||(n=function(r,t){if(r){if("string"==typeof r)return f(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(r,t):void 0}}(r))||t&&r&&"number"==typeof r.length){n&&(r=n);var e=0;return function(){return e>=r.length?{done:!0}:{done:!1,value:r[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(n,e,a){void 0===a&&(a=1);var o=function(r){for(var t=new Uint8ClampedArray(r.length/4*3),n=0,e=0,a=r.length;e<a;){for(var o=0;o<3;o++)t[n++]=r[e++];e++}return t}(n),u=new neuquant_js_src_neuquant_js__WEBPACK_IMPORTED_MODULE_0__["default"](o,{netsize:e,samplefac:a});u.buildColorMap();for(var i=u.getColorMap(),f=(0,neuquant_js__WEBPACK_IMPORTED_MODULE_1__.indexed)(o,i),l=[],c=0,s=i.length;c<s;)l.push([i[c++],i[c++],i[c++],255]);return{centroid:l,label:v(e,f)}}function v(r,t){for(var n,e=new Array(r).fill(0),a=l(t);!(n=a()).done;)e[n.value]++;return e}function s(r,t){var n=document.createElement("canvas"),e=n.getContext("2d");return n.height=t,n.width=r,e}function h(r,t){return new OffscreenCanvas(r,t).getContext("2d")}function p(r){return new Promise(function(t,n){r.complete?t():(r.addEventListener("load",function(r){t(r)}),r.addEventListener("error",function(r){n(r)}))})}function m(r){return g(s,r)}function d(r){return g(h,r)}function g(r,t){var n=t.naturalWidth,e=t.naturalHeight,a=r(n,e);return null==a||a.drawImage(t,0,0,n,e),null==a?void 0:a.getImageData(0,0,n,e)}function y(r,t){return w(s,r,t)}function b(r,t){return w(h,r,t)}function w(r,t,n){var e=t.naturalWidth,a=t.naturalHeight,o=e*a/n;if(o>1){var u=e/Math.sqrt(o),i=a/Math.sqrt(o),f=r(u,i);return null==f||f.drawImage(t,0,0,u,i),null==f?void 0:f.getImageData(0,0,u,i)}var l=r(e,a);return null==l||l.drawImage(t,0,0),null==l?void 0:l.getImageData(0,0,e,a)}function M(r){return r.map(function(r){return r/255})}function j(r){var t,n,e,a,o,u,i=(u=(e=r)[2],(a=e[0])>(o=e[1])?o>u?[a,u]:a>u?[a,o]:[u,o]:o>u?u>a?[o,a]:[o,u]:[u,a]),f=i[0],l=i[1],c=f-l,v=f+l;if(0==c)t=0,n=0;else{if(f==r[0]){var s=60*(r[1]-r[2])/c;t=s<0?s+360:s}else t=f==r[1]?60*(r[2]-r[0])/c+120:60*(r[0]-r[1])/c+240;n=0==v?0:v<=1?c/v:c/(2-v)}return[t,n,v/2,r[3]]}var A=function(r){return void 0===r&&(r=[0,1,2,3]),function(t,n){for(var e,a,o=l(r);!(a=o()).done;){var u=a.value;if(0!=(e=t[u]-n[u]))return e}return e}},I=function(r){return"hsla("+r[0]+"deg,"+100*r[1]+"%,"+100*r[2]+"%,"+r[3]+")"},x=function(r){return"rgba("+r.map(function(r){return Math.floor(r)}).join(",")+")"};function C(r){for(var t=[],a=0;a<r.length;a+=4){var o=r.slice(a,a+4),u=o[3],i=o.slice(0,3),f=color_space_rgb_js__WEBPACK_IMPORTED_MODULE_2___default().xyz(i),l=color_space_xyz_js__WEBPACK_IMPORTED_MODULE_3___default().lab(f);t.push.apply(t,l.concat([u]))}return t}function q(r){var t=r.slice(0,3),n=r[3],o=color_space_lab_js__WEBPACK_IMPORTED_MODULE_4___default().xyz(t),u=color_space_xyz_js__WEBPACK_IMPORTED_MODULE_3___default().rgb(o);return[].concat(u,[n])}
//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/color-space/lab.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/lab.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * CIE LAB space model
 *
 * @module color-space/lab
 */


var xyz = __webpack_require__(/*! ./xyz */ "./node_modules/color-space/xyz.js");

module.exports = {
	name: 'lab',
	min: [0,-100,-100],
	max: [100,100,100],
	channel: ['lightness', 'a', 'b'],
	alias: ['LAB', 'cielab'],

	xyz: function(lab) {
		var l = lab[0],
				a = lab[1],
				b = lab[2],
				x, y, z, y2;

		if (l <= 8) {
			y = (l * 100) / 903.3;
			y2 = (7.787 * (y / 100)) + (16 / 116);
		} else {
			y = 100 * Math.pow((l + 16) / 116, 3);
			y2 = Math.pow(y / 100, 1/3);
		}

		x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

		z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

		return [x, y, z];
	}
};


//extend xyz
xyz.lab = function(xyz){
	var x = xyz[0],
			y = xyz[1],
			z = xyz[2],
			l, a, b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};


/***/ }),

/***/ "./node_modules/color-space/rgb.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/rgb.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * RGB space.
 *
 * @module  color-space/rgb
 */


module.exports = {
	name: 'rgb',
	min: [0,0,0],
	max: [255,255,255],
	channel: ['red', 'green', 'blue'],
	alias: ['RGB']
};


/***/ }),

/***/ "./node_modules/color-space/xyz.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/xyz.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * CIE XYZ
 *
 * @module  color-space/xyz
 */


var rgb = __webpack_require__(/*! ./rgb */ "./node_modules/color-space/rgb.js");

var xyz = {
	name: 'xyz',
	min: [0,0,0],
	channel: ['X','Y','Z'],
	alias: ['XYZ', 'ciexyz', 'cie1931']
};


/**
 * Whitepoint reference values with observer/illuminant
 *
 * http://en.wikipedia.org/wiki/Standard_illuminant
 */
xyz.whitepoint = {
	//1931 2°
	2: {
		//incadescent
		A:[109.85, 100, 35.585],
		// B:[],
		C: [98.074, 100, 118.232],
		D50: [96.422, 100, 82.521],
		D55: [95.682, 100, 92.149],
		//daylight
		D65: [95.045592705167, 100, 108.9057750759878],
		D75: [94.972, 100, 122.638],
		//flourescent
		// F1: [],
		F2: [99.187, 100, 67.395],
		// F3: [],
		// F4: [],
		// F5: [],
		// F6:[],
		F7: [95.044, 100, 108.755],
		// F8: [],
		// F9: [],
		// F10: [],
		F11: [100.966, 100, 64.370],
		// F12: [],
		E: [100,100,100]
	},

	//1964  10°
	10: {
		//incadescent
		A:[111.144, 100, 35.200],
		C: [97.285, 100, 116.145],
		D50: [96.720, 100, 81.427],
		D55: [95.799, 100, 90.926],
		//daylight
		D65: [94.811, 100, 107.304],
		D75: [94.416, 100, 120.641],
		//flourescent
		F2: [103.280, 100, 69.026],
		F7: [95.792, 100, 107.687],
		F11: [103.866, 100, 65.627],
		E: [100,100,100]
	}
};


/**
 * Top values are the whitepoint’s top values, default are D65
 */
xyz.max = xyz.whitepoint[2].D65;


/**
 * Transform xyz to rgb
 *
 * @param {Array} xyz Array of xyz values
 *
 * @return {Array} RGB values
 */
xyz.rgb = function (_xyz, white) {
	//FIXME: make sure we have to divide like this. Probably we have to replace matrix as well then
	white = white || xyz.whitepoint[2].E;

	var x = _xyz[0] / white[0],
		y = _xyz[1] / white[1],
		z = _xyz[2] / white[2],
		r, g, b;

	// assume sRGB
	// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	r = (x * 3.240969941904521) + (y * -1.537383177570093) + (z * -0.498610760293);
	g = (x * -0.96924363628087) + (y * 1.87596750150772) + (z * 0.041555057407175);
	b = (x * 0.055630079696993) + (y * -0.20397695888897) + (z * 1.056971514242878);

	r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r = (r * 12.92);

	g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g = (g * 12.92);

	b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b = (b * 12.92);

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
}



/**
 * RGB to XYZ
 *
 * @param {Array} rgb RGB channels
 *
 * @return {Array} XYZ channels
 */
rgb.xyz = function(rgb, white) {
	var r = rgb[0] / 255,
			g = rgb[1] / 255,
			b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.41239079926595) + (g * 0.35758433938387) + (b * 0.18048078840183);
	var y = (r * 0.21263900587151) + (g * 0.71516867876775) + (b * 0.072192315360733);
	var z = (r * 0.019330818715591) + (g * 0.11919477979462) + (b * 0.95053215224966);

	white = white || xyz.whitepoint[2].E;

	return [x * white[0], y * white[1], z * white[2]];
};



module.exports = xyz;


/***/ }),

/***/ "./node_modules/neuquant-js/src/helpers.js":
/*!*************************************************!*\
  !*** ./node_modules/neuquant-js/src/helpers.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "palette": () => (/* binding */ palette),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "quantize": () => (/* binding */ quantize)
/* harmony export */ });
/* harmony import */ var _neuquant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neuquant */ "./node_modules/neuquant-js/src/neuquant.js");


function findClosest (palette, r, g, b) {
  let minpos = 0
  let mind = 256 * 256 * 256

  for (let i = 0, l = palette.length; i < l;) {
    const dr = r - palette[i++]
    const dg = g - palette[i++]
    const db = b - palette[i]
    const d = dr * dr + dg * dg + db * db
    const pos = i / 3 | 0

    if (d < mind) {
      mind = d
      minpos = pos
    }

    i++
  }

  return minpos
}

function palette (pixels, options) {
  const nq = new _neuquant__WEBPACK_IMPORTED_MODULE_0__["default"](pixels, options)
  nq.buildColorMap()
  return nq.getColorMap()
}

function indexed (pixels, palette) {
  const indexed = new Buffer(pixels.length / 3)
  const memo = {}

  for (let i = 0, j = 0, l = pixels.length; i < l;) {
    const r = pixels[i++]
    const g = pixels[i++]
    const b = pixels[i++]
    const k = r << 16 | g << 8 | b

    if (k in memo) {
      indexed[j++] = memo[k]
    } else {
      indexed[j++] = memo[k] = findClosest(palette, r, g, b)
    }
  }

  return indexed
}

function quantize (pixels, options) {
  const p = palette(pixels, options)
  const i = indexed(pixels, p)

  return {
    palette: p,
    indexed: i
  }
}


/***/ }),

/***/ "./node_modules/neuquant-js/src/neuquant.js":
/*!**************************************************!*\
  !*** ./node_modules/neuquant-js/src/neuquant.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NeuQuant)
/* harmony export */ });
/**
 * NeuQuant Neural-Network Quantization Algorithm
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * See "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * See also http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * Copyright (c) 2012 Johan Nordberg (JavaScript port)
 * Copyright (c) 2014 Devon Govett (JavaScript port)
 */

const prime1 = 499
const prime2 = 491
const prime3 = 487
const prime4 = 503

const maxprime = Math.max(prime1, prime2, prime3, prime4)
const minpicturebytes = (3 * maxprime)

const defaults = {
  ncycles: 100,
  netsize: 256,
  samplefac: 10
}

const assign = function (target) {
  for (let i = 1, l = arguments.length; i < l; i++) {
    const nextSource = arguments[i]
    if (nextSource != null) {
      for (const nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          target[nextKey] = nextSource[nextKey]
        }
      }
    }
  }
  return target
}

class NeuQuant {
  constructor (pixels, options) {
    assign(this, defaults, {pixels}, options)

    if (this.netsize < 4 || this.netsize > 256) {
      throw new Error('Color count must be between 4 and 256')
    }

    if (this.samplefac < 1 || this.samplefac > 30) {
      throw new Error('Sampling factor must be between 1 and 30')
    }

    this.maxnetpos = this.netsize - 1

    this.netbiasshift = 4
    this.intbiasshift = 16
    this.intbias = (1 << this.intbiasshift)
    this.gammashift = 10
    this.gamma = (1 << this.gammashift)
    this.betashift = 10
    this.beta = (this.intbias >> this.betashift)
    this.betagamma = (this.beta * this.gamma)

    this.initrad = (this.netsize >> 3)
    this.radiusbiasshift = 6
    this.radiusbias = (1 << this.radiusbiasshift)
    this.initradius = (this.initrad * this.radiusbias)
    this.radiusdec = 30

    this.alphabiasshift = 10
    this.initalpha = (1 << this.alphabiasshift)

    this.radbiasshift = 8
    this.radbias = (1 << this.radbiasshift)
    this.alpharadbshift = (this.alphabiasshift + this.radbiasshift)
    this.alpharadbias = (1 << this.alpharadbshift)

    this.network = []
    this.netindex = new Uint32Array(256)
    this.bias = new Uint32Array(this.netsize)
    this.freq = new Uint32Array(this.netsize)
    this.radpower = new Uint32Array(this.netsize >> 3)

    for (let i = 0, l = this.netsize; i < l; i++) {
      let v = (i << (this.netbiasshift + 8)) / this.netsize
      this.network[i] = new Float64Array([v, v, v, 0])
      this.freq[i] = this.intbias / this.netsize
      this.bias[i] = 0
    }
  }

  unbiasnet () {
    for (let i = 0, l = this.netsize; i < l; i++) {
      this.network[i][0] >>= this.netbiasshift
      this.network[i][1] >>= this.netbiasshift
      this.network[i][2] >>= this.netbiasshift
      this.network[i][3] = i
    }
  }

  altersingle (alpha, i, b, g, r) {
    this.network[i][0] -= (alpha * (this.network[i][0] - b)) / this.initalpha
    this.network[i][1] -= (alpha * (this.network[i][1] - g)) / this.initalpha
    this.network[i][2] -= (alpha * (this.network[i][2] - r)) / this.initalpha
  }

  alterneigh (radius, i, b, g, r) {
    const lo = Math.abs(i - radius)
    const hi = Math.min(i + radius, this.netsize)

    let j = i + 1
    let k = i - 1
    let m = 1

    while ((j < hi) || (k > lo)) {
      const a = this.radpower[m++]

      if (j < hi) {
        const p = this.network[j++]
        p[0] -= (a * (p[0] - b)) / this.alpharadbias
        p[1] -= (a * (p[1] - g)) / this.alpharadbias
        p[2] -= (a * (p[2] - r)) / this.alpharadbias
      }

      if (k > lo) {
        const p = this.network[k--]
        p[0] -= (a * (p[0] - b)) / this.alpharadbias
        p[1] -= (a * (p[1] - g)) / this.alpharadbias
        p[2] -= (a * (p[2] - r)) / this.alpharadbias
      }
    }
  }

  contest (b, g, r) {
    let bestd = ~(1 << 31)
    let bestbiasd = bestd
    let bestpos = -1
    let bestbiaspos = bestpos

    for (let i = 0, l = this.netsize; i < l; i++) {
      let n = this.network[i]

      let dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r)
      if (dist < bestd) {
        bestd = dist
        bestpos = i
      }

      let biasdist = dist - ((this.bias[i]) >> (this.intbiasshift - this.netbiasshift))
      if (biasdist < bestbiasd) {
        bestbiasd = biasdist
        bestbiaspos = i
      }

      let betafreq = (this.freq[i] >> this.betashift)
      this.freq[i] -= betafreq
      this.bias[i] += (betafreq << this.gammashift)
    }

    this.freq[bestpos] += this.beta
    this.bias[bestpos] -= this.betagamma

    return bestbiaspos
  }

  inxbuild () {
    let previouscol = 0
    let startpos = 0

    for (let i = 0, l = this.netsize; i < l; i++) {
      let p = this.network[i]
      let q = null
      let smallpos = i
      let smallval = p[1]

      for (let j = i + 1; j < l; j++) {
        q = this.network[j]
        if (q[1] < smallval) {
          smallpos = j
          smallval = q[1]
        }
      }
      q = this.network[smallpos]

      if (i !== smallpos) {
        [p[0], q[0]] = [q[0], p[0]];
        [p[1], q[1]] = [q[1], p[1]];
        [p[2], q[2]] = [q[2], p[2]];
        [p[3], q[3]] = [q[3], p[3]]
      }

      if (smallval !== previouscol) {
        this.netindex[previouscol] = (startpos + i) >> 1
        for (let j = previouscol + 1; j < smallval; j++) {
          this.netindex[j] = i
        }
        previouscol = smallval
        startpos = i
      }
    }

    this.netindex[previouscol] = (startpos + this.maxnetpos) >> 1
    for (let i = previouscol + 1; i < 256; i++) {
      this.netindex[i] = this.maxnetpos
    }
  }

  learn () {
    const lengthcount = this.pixels.length
    const alphadec = 30 + ((this.samplefac - 1) / 3)
    const samplepixels = lengthcount / (3 * this.samplefac)

    let delta = samplepixels / this.ncycles | 0
    let alpha = this.initalpha
    let radius = this.initradius

    let rad = radius >> this.radiusbiasshift

    if (rad <= 1) {
      rad = 0
    }

    for (let i = 0; i < rad; i++) {
      this.radpower[i] = alpha * (((rad * rad - i * i) * this.radbias) / (rad * rad))
    }

    let step
    if (lengthcount < minpicturebytes) {
      this.samplefac = 1
      step = 3
    } else if ((lengthcount % prime1) !== 0) {
      step = 3 * prime1
    } else if ((lengthcount % prime2) !== 0) {
      step = 3 * prime2
    } else if ((lengthcount % prime3) !== 0) {
      step = 3 * prime3
    } else {
      step = 3 * prime4
    }

    let pix = 0

    for (let i = 0; i < samplepixels;) {
      let b = (this.pixels[pix] & 0xff) << this.netbiasshift
      let g = (this.pixels[pix + 1] & 0xff) << this.netbiasshift
      let r = (this.pixels[pix + 2] & 0xff) << this.netbiasshift

      let j = this.contest(b, g, r)
      this.altersingle(alpha, j, b, g, r)
      if (rad !== 0) {
        this.alterneigh(rad, j, b, g, r)
      }

      pix += step
      if (pix >= lengthcount) {
        pix -= lengthcount
      }

      if (delta === 0) {
        delta = 1
      }

      if (++i % delta === 0) {
        alpha -= alpha / alphadec
        radius -= radius / this.radiusdec
        rad = radius >> this.radiusbiasshift

        if (rad <= 1) {
          rad = 0
        }

        for (let k = 0; k < rad; k++) {
          this.radpower[k] = alpha * (((rad * rad - k * k) * this.radbias) / (rad * rad))
        }
      }
    }
  }

  buildColorMap () {
    this.learn()
    this.unbiasnet()
    this.inxbuild()
  }

  getColorMap () {
    const map = new Buffer(this.netsize * 3)
    const index = new Buffer(this.netsize)

    for (let i = 0, l = this.netsize; i < l; i++) {
      index[this.network[i][3]] = i
    }

    for (let i = 0, j = 0, k = 0, l = this.netsize; i < l; i++) {
      k = index[i]
      map[j++] = this.network[k][0] & 0xff
      map[j++] = this.network[k][1] & 0xff
      map[j++] = this.network[k][2] & 0xff
    }

    return map
  }
}


/***/ }),

/***/ "./node_modules/promise-worker/register.js":
/*!*************************************************!*\
  !*** ./node_modules/promise-worker/register.js ***!
  \*************************************************/
/***/ ((module) => {



function isPromise (obj) {
  // via https://unpkg.com/is-promise@2.1.0/index.js
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

function registerPromiseWorker (callback) {
  function postOutgoingMessage (e, messageId, error, result) {
    function postMessage (msg) {
      /* istanbul ignore if */
      if (typeof self.postMessage !== 'function') { // service worker
        e.ports[0].postMessage(msg)
      } else { // web worker
        self.postMessage(msg)
      }
    }
    if (error) {
      /* istanbul ignore else */
      if (typeof console !== 'undefined' && 'error' in console) {
        // This is to make errors easier to debug. I think it's important
        // enough to just leave here without giving the user an option
        // to silence it.
        console.error('Worker caught an error:', error)
      }
      postMessage([messageId, {
        message: error.message
      }])
    } else {
      postMessage([messageId, null, result])
    }
  }

  function tryCatchFunc (callback, message) {
    try {
      return { res: callback(message) }
    } catch (e) {
      return { err: e }
    }
  }

  function handleIncomingMessage (e, callback, messageId, message) {
    var result = tryCatchFunc(callback, message)

    if (result.err) {
      postOutgoingMessage(e, messageId, result.err)
    } else if (!isPromise(result.res)) {
      postOutgoingMessage(e, messageId, null, result.res)
    } else {
      result.res.then(function (finalResult) {
        postOutgoingMessage(e, messageId, null, finalResult)
      }, function (finalError) {
        postOutgoingMessage(e, messageId, finalError)
      })
    }
  }

  function onIncomingMessage (e) {
    var payload = e.data
    if (!Array.isArray(payload) || payload.length !== 2) {
      // message doens't match communication format; ignore
      return
    }
    var messageId = payload[0]
    var message = payload[1]

    if (typeof callback !== 'function') {
      postOutgoingMessage(e, messageId, new Error(
        'Please pass a function into register().'))
    } else {
      handleIncomingMessage(e, callback, messageId, message)
    }
  }

  self.addEventListener('message', onIncomingMessage)
}

module.exports = registerPromiseWorker


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/app/theme-color/worker.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kotorik_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kotorik/palette */ "./node_modules/@kotorik/palette/dist/index.mjs");
/* harmony import */ var promise_worker_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! promise-worker/register */ "./node_modules/promise-worker/register.js");
/* harmony import */ var promise_worker_register__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(promise_worker_register__WEBPACK_IMPORTED_MODULE_1__);


promise_worker_register__WEBPACK_IMPORTED_MODULE_1___default()((data) => {
    const { img, k } = data;
    const result = (0,_kotorik_palette__WEBPACK_IMPORTED_MODULE_0__.neuquant)(img.data, k);
    return result;
});

})();

/******/ })()
;
//# sourceMappingURL=src_app_theme-color_worker_ts.js.map