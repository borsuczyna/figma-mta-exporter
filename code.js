/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/elements/element.ts":
/*!*********************************!*\
  !*** ./src/elements/element.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defineVariablePosition": () => (/* binding */ defineVariablePosition),
/* harmony export */   "focusOnElements": () => (/* binding */ focusOnElements),
/* harmony export */   "getAbsolutePosition": () => (/* binding */ getAbsolutePosition),
/* harmony export */   "getPosition": () => (/* binding */ getPosition),
/* harmony export */   "getVariables": () => (/* binding */ getVariables),
/* harmony export */   "isMaskGroup": () => (/* binding */ isMaskGroup),
/* harmony export */   "processNode": () => (/* binding */ processNode),
/* harmony export */   "resetCurrentVariable": () => (/* binding */ resetCurrentVariable),
/* harmony export */   "resetFocusElements": () => (/* binding */ resetFocusElements),
/* harmony export */   "resetVariables": () => (/* binding */ resetVariables),
/* harmony export */   "setMainFrame": () => (/* binding */ setMainFrame),
/* harmony export */   "toColor": () => (/* binding */ toColor)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/settings.ts");
/* harmony import */ var _useful__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../useful */ "./src/useful.ts");
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rectangle */ "./src/elements/rectangle.ts");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./raw */ "./src/elements/raw.ts");
/* harmony import */ var _variable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variable */ "./src/elements/variable.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text */ "./src/elements/text.ts");






let focusElements = [];
let variables = {};
let mainFrame;
let currentVariable = undefined;
function resetCurrentVariable() {
    currentVariable = undefined;
}
function setMainFrame(frame) {
    mainFrame = frame;
}
function resetFocusElements() {
    focusElements = [];
}
function defineVariablePosition(name, position) {
    variables[name] = position;
}
function getVariables() {
    let length = 0;
    for (let name in variables)
        length++;
    if (length == 0)
        return '';
    let code = 'local settings = {\n';
    for (let name in variables) {
        code += `\t['${name}'] = {${variables[name]}}\n`;
    }
    code += '}';
    return code;
}
function resetVariables() {
    variables = {};
}
function isMaskGroup(node) {
    if (node.type === "GROUP") {
        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if ('isMask' in child && child.isMask)
                return true;
        }
    }
    return false;
}
function getAbsolutePosition(position, angle) {
    let lt = { x: position.x, y: position.y };
    let rt = (0,_useful__WEBPACK_IMPORTED_MODULE_1__.getPointFromDistanceRotation)(position.x, position.y, position.width, angle);
    let lb = (0,_useful__WEBPACK_IMPORTED_MODULE_1__.getPointFromDistanceRotation)(position.x, position.y, position.height, angle + 90);
    let rb = (0,_useful__WEBPACK_IMPORTED_MODULE_1__.getPointFromDistanceRotation)(rt.x, rt.y, position.height, angle + 90);
    let x = Math.min(lt.x, rt.x, lb.x, rb.x);
    let y = Math.min(lt.y, rt.y, lb.y, rb.y);
    let tx = Math.max(lt.x, rt.x, lb.x, rb.x);
    let ty = Math.max(lt.y, rt.y, lb.y, rb.y);
    let width = tx - x;
    let height = ty - y;
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
}
function addFocusElement(element) {
    focusElements.push(element);
}
function focusOnElements(frame) {
    // figma.viewport.scrollAndZoomIntoView([frame] || focusElements);
    figma.currentPage.selection = focusElements;
}
function getPosition(position, offset, noWordWrap = true, textXAlign = 'left', textYAlign = 'top') {
    let x = position.x;
    let y = position.y;
    let width = position.width;
    let height = position.height;
    let zoom = _settings__WEBPACK_IMPORTED_MODULE_0__.settings.zoom ? '/zoom' : '';
    let xAlign = offset.align.charAt(0);
    let yAlign = offset.align.charAt(1);
    if (noWordWrap) {
        let xs = '', ys = '';
        if (xAlign == 'L') {
            if (textXAlign == 'left')
                xs = `${x}${zoom}`;
            else if (textXAlign == 'center')
                xs = `${x + width / 2}${zoom}`;
            else if (textXAlign == 'right')
                xs = `${x + width}${zoom}`;
        }
        else if (xAlign == 'C') {
            x = x - offset.width / 2;
            if (textXAlign == 'left')
                xs = `sx/2 + ${x}${zoom}`;
            else if (textXAlign == 'center')
                xs = `sx/2 + ${x + width / 2}${zoom}`;
            else if (textXAlign == 'right')
                xs = `sx/2 + ${x + width}${zoom}`;
        }
        else if (xAlign == 'R') {
            x = offset.width - x;
            if (textXAlign == 'left')
                xs = `sx - ${x + width}${zoom}`;
            else if (textXAlign == 'center')
                xs = `sx - ${x + width / 2}${zoom}`;
            else if (textXAlign == 'right')
                xs = `sx - ${x}${zoom}`;
        }
        if (yAlign == 'T') {
            if (textYAlign == 'top')
                ys = `${y}${zoom}`;
            else if (textYAlign == 'center')
                ys = `${y + height / 2}${zoom}`;
            else if (textYAlign == 'bottom')
                ys = `${y + height}${zoom}`;
        }
        else if (yAlign == 'M') {
            y = y - offset.height / 2;
            if (textYAlign == 'top')
                ys = `sy/2 + ${y}${zoom}`;
            else if (textYAlign == 'center')
                ys = `sy/2 + ${y + height / 2}${zoom}`;
            else if (textYAlign == 'bottom')
                ys = `sy/2 + ${y + height}${zoom}`;
        }
        else if (yAlign == 'B') {
            y = offset.height - y;
            if (textYAlign == 'top')
                ys = `sy - ${y + height}${zoom}`;
            else if (textYAlign == 'center')
                ys = `sy - ${y + height / 2}${zoom}`;
            else if (textYAlign == 'bottom')
                ys = `sy - ${y}${zoom}`;
        }
        return `${xs}, ${ys}, nil, nil`;
    }
    else {
        if (xAlign == 'L')
            x = `${x}${zoom}`;
        else if (xAlign == 'C') {
            x = x - offset.width / 2;
            x = `sx/2 + ${x}${zoom}`;
        }
        else if (xAlign == 'R') {
            x = offset.width - x;
            x = `sx - ${x}${zoom}`;
        }
        if (yAlign == 'T')
            y = `${y}${zoom}`;
        else if (yAlign == 'M') {
            y = y - offset.height / 2;
            y = `sy/2 + ${y}${zoom}`;
        }
        else if (yAlign == 'B') {
            y = offset.height - y;
            y = `sy - ${y}${zoom}`;
        }
        if (currentVariable) {
            return `settings['${currentVariable}'][1] + ${x}${zoom}, settings['${currentVariable}'][2] + ${y}${zoom}, ${width}${zoom}, ${height}${zoom}`;
        }
        return `${x}, ${y}, ${width}${zoom}, ${height}${zoom}`;
    }
}
function toColor(color) {
    return `tocolor(${Math.floor(color.color.r * 255)}, ${Math.floor(color.color.g * 255)}, ${Math.floor(color.color.b * 255)}, ${Math.floor(color.opacity * 255)})`;
}
function processNode(element, offset, variable) {
    let code = '';
    let metaCode = '';
    let preVariable = variable;
    if (element.type == 'FRAME' && element != mainFrame) {
        variable = _variable__WEBPACK_IMPORTED_MODULE_4__.process(element, offset, variable);
        currentVariable = variable;
    }
    // code += `-- ${element.type}: ${element.name} ${currentVariable || ''}\n`;
    if (element.type == 'GROUP' && element.name.startsWith('<single>')) {
        let name = '_single_' + element.name.slice('<single>'.length);
        let data = _raw__WEBPACK_IMPORTED_MODULE_3__.process(element, offset, name);
        code += data.code;
        metaCode += data.metaCode;
        addFocusElement(element);
    }
    else if (isMaskGroup(element) || element.type == 'VECTOR') {
        let data = _raw__WEBPACK_IMPORTED_MODULE_3__.process(element, offset, element.name);
        code += data.code;
        metaCode += data.metaCode;
        addFocusElement(element);
    }
    else if ('children' in element) {
        for (let child of element.children) {
            let data = processNode(child, offset, variable);
            code += data.code;
            metaCode += data.metaCode;
        }
    }
    if (element.type == 'RECTANGLE') {
        let data = _rectangle__WEBPACK_IMPORTED_MODULE_2__.process(element, offset);
        code += data.code;
        metaCode += data.metaCode;
        addFocusElement(element);
    }
    else if (element.type == 'TEXT') {
        code += _text__WEBPACK_IMPORTED_MODULE_5__.process(element, offset);
    }
    variable = preVariable;
    currentVariable = variable;
    // wyjebac loadTextures
    // nie eksportowac kilka takich samych
    code = code.replace(/\+ -/g, '- ');
    code = code.replace(/\+ 0\/zoom/g, '');
    code = code.replace(/- 0\/zoom/g, '');
    code = code.replace(/\+ 0/g, '');
    code = code.replace(/- 0/g, '');
    code = code.replace(/\* 1\/zoom/g, '');
    code = code.replace(/\/ 1\/zoom/g, '');
    code = code.replace(/\* 1/g, '');
    code = code.replace(/\/ 1/g, '');
    code = code.replace(/(\d+\.\d{3})\d+/g, '$1');
    code = code.replace(/ ,/g, ',');
    return { code, metaCode };
}


/***/ }),

/***/ "./src/elements/raw.ts":
/*!*****************************!*\
  !*** ./src/elements/raw.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "process": () => (/* binding */ process)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/elements/element.ts");
/* harmony import */ var _textures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./textures */ "./src/elements/textures.ts");


function process(element, offset, name) {
    let code = '';
    let metaCode = '';
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };
    // Effects
    // @TODO
    // Calculate absolute position depending on rotation
    elementPosition = _element__WEBPACK_IMPORTED_MODULE_0__.getAbsolutePosition(elementPosition, 'rotation' in element ? element.rotation : 0);
    let position = _element__WEBPACK_IMPORTED_MODULE_0__.getPosition(elementPosition, offset);
    // Generate code
    code = `\tdxDrawImage(${position}, '${_textures__WEBPACK_IMPORTED_MODULE_1__.imagePath(name)}')\n`;
    metaCode = `\t<file src="${_textures__WEBPACK_IMPORTED_MODULE_1__.imagePath(name)}"/>\n`;
    return { code, metaCode };
}


/***/ }),

/***/ "./src/elements/rectangle.ts":
/*!***********************************!*\
  !*** ./src/elements/rectangle.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "process": () => (/* binding */ process)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/elements/element.ts");
/* harmony import */ var _textures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./textures */ "./src/elements/textures.ts");


function process(element, offset) {
    let code = '';
    let metaCode = '';
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };
    // Strokes
    let offSize = 0;
    if (element.strokeAlign == 'OUTSIDE') {
        offSize = element.strokeWeight;
    }
    else if (element.strokeAlign == 'CENTER') {
        offSize = element.strokeWeight / 2;
    }
    // Effects
    // @TODO
    elementPosition.x -= offSize;
    elementPosition.y -= offSize;
    elementPosition.width += offSize * 2;
    elementPosition.height += offSize * 2;
    // Calculate absolute position depending on rotation
    elementPosition = _element__WEBPACK_IMPORTED_MODULE_0__.getAbsolutePosition(elementPosition, element.rotation);
    let position = _element__WEBPACK_IMPORTED_MODULE_0__.getPosition(elementPosition, offset);
    // Generate code
    code = `\tdxDrawImage(${position}, '${_textures__WEBPACK_IMPORTED_MODULE_1__.imagePath(element.name)}')\n`;
    metaCode = `\t<file src="${_textures__WEBPACK_IMPORTED_MODULE_1__.imagePath(element.name)}"/>\n`;
    return { code, metaCode };
}


/***/ }),

/***/ "./src/elements/text.ts":
/*!******************************!*\
  !*** ./src/elements/text.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "process": () => (/* binding */ process)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/elements/element.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings */ "./src/settings.ts");


function process(element, offset) {
    let code = '';
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };
    // Strokes
    let offSize = 0;
    if (element.strokeAlign == 'OUTSIDE') {
        offSize = element.strokeWeight;
    }
    else if (element.strokeAlign == 'CENTER') {
        offSize = element.strokeWeight / 2;
    }
    // Effects
    // @TODO
    elementPosition.x -= offSize;
    elementPosition.y -= offSize;
    elementPosition.width += offSize * 2;
    elementPosition.height += offSize * 2;
    // Calculate absolute position depending on rotation
    let xAlign = element.textAlignHorizontal.toLocaleLowerCase();
    let yAlign = element.textAlignVertical.toLocaleLowerCase();
    let zoom = _settings__WEBPACK_IMPORTED_MODULE_1__.settings.zoom ? '/zoom' : '';
    elementPosition = _element__WEBPACK_IMPORTED_MODULE_0__.getAbsolutePosition(elementPosition, element.rotation);
    let position = _element__WEBPACK_IMPORTED_MODULE_0__.getPosition(elementPosition, offset, !_settings__WEBPACK_IMPORTED_MODULE_1__.settings.wordWrap, xAlign, yAlign);
    let [x, y, w, h] = position.split(',').map(e => e.trim());
    if (_settings__WEBPACK_IMPORTED_MODULE_1__.settings.wordWrap) {
        position = `${x}, ${y}, (${x}) + (${w}), (${y}) + (${h})`;
    }
    else {
        position = `${x}, ${y}, nil, nil`;
    }
    let color = element.fills[0];
    if (color) {
        let text = element.characters;
        while (text.includes('\n')) {
            text = text.replace('\n', '<!newline!>');
        }
        let size = parseFloat(element.fontSize.toLocaleString()) / 1.5;
        let font = `getFigmaFont('${element.fontName.family}-${element.fontName.style}', ${size}${zoom})`;
        code = `\tdxDrawText('${text}', ${position}, ${_element__WEBPACK_IMPORTED_MODULE_0__.toColor(color)}, 1, ${font}, '${xAlign}', '${yAlign}'${_settings__WEBPACK_IMPORTED_MODULE_1__.settings.wordWrap ? ', false, true' : ''})\n`;
    }
    return code;
}


/***/ }),

/***/ "./src/elements/textures.ts":
/*!**********************************!*\
  !*** ./src/elements/textures.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "imagePath": () => (/* binding */ imagePath)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/settings.ts");

function imagePath(input) {
    const cleaned = input.replace(/[^a-zA-Z0-9_-]/g, '');
    // const truncated = cleaned.substring(0, 16);
    // return `${settings.path}${truncated}.png`;
    return `${_settings__WEBPACK_IMPORTED_MODULE_0__.settings.path}${input}.png`;
}


/***/ }),

/***/ "./src/elements/variable.ts":
/*!**********************************!*\
  !*** ./src/elements/variable.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "process": () => (/* binding */ process)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/elements/element.ts");

function process(element, offset, variable) {
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };
    // Calculate absolute position depending on rotation
    elementPosition = _element__WEBPACK_IMPORTED_MODULE_0__.getAbsolutePosition(elementPosition, 'rotation' in element ? element.rotation : 0);
    let position = _element__WEBPACK_IMPORTED_MODULE_0__.getPosition(elementPosition, offset);
    variable = element.name;
    _element__WEBPACK_IMPORTED_MODULE_0__.defineVariablePosition(element.name, position);
    // Generate code
    return variable;
}


/***/ }),

/***/ "./src/language.ts":
/*!*************************!*\
  !*** ./src/language.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ translation)
/* harmony export */ });
;
let language = 'EN';
const languages = {
    'PL': {
        'no-selection': 'Nie wybrano żadnego elementu',
        'more-than-one': 'Zaznaczono więcej niż jeden element',
        'no-frame': 'Zaznaczony element to nie frame',
    },
    'EN': {
        'no-selection': 'There\'s nothing selected',
        'more-than-one': 'There\'s more than one element selected',
        'no-frame': 'Selected element isn\'t frame'
    }
};
function translation(key) {
    return languages[language] && languages[language][key] || key;
}


/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
const metaTemplate = `<meta>
    <script src='useful.lua' type='client' cache='false'/>
    <script src='client.lua' type='client' cache='false'/>

<FILE_SOURCES>
</meta>`;
const codeTemplate = `
<VARIABLES>

function renderUI()
<CODE>
end

function toggleUI(visible)
    local eventCallback = visible and addEventHandler or removeEventHandler

    eventCallback('onClientRender', root, renderUI)
end

toggleUI(true)`;
const usefulCode = `sx, sy = guiGetScreenSize()
zoom = (sx < 2048) and math.min(2.2, 2048/sx) or 1
fonts = {
    figmaFonts = {},
}

function unloadFonts()
    for k,v in pairs(fonts) do
        if v and isElement(v) then destroyElement(v) end
    end
    fonts = {
        figmaFonts = {},
    }
end

function loadFonts(array)
    unloadFonts()
    for _,v in pairs(array) do
        fonts[v[1]] = dxCreateFont(v[2], v[3], v[4], 'proof')
    end
end

function getFigmaFont(font, size)
    local figmaFonts = fonts.figmaFonts
    if not figmaFonts[font..size] then
        figmaFonts[font..size] = exports['figma']:getFont(font, size)
    end

    return figmaFonts[font..size]
end`;
const settings = {
    zoom: true,
    path: 'data/',
    metaTemplate: metaTemplate,
    codeTemplate: codeTemplate,
    usefulCode: usefulCode,
    wordWrap: false,
};


/***/ }),

/***/ "./src/useful.ts":
/*!***********************!*\
  !*** ./src/useful.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertToCamelCase": () => (/* binding */ convertToCamelCase),
/* harmony export */   "getPointFromDistanceRotation": () => (/* binding */ getPointFromDistanceRotation)
/* harmony export */ });
function convertToCamelCase(str) {
    // Remove all special characters and replace spaces with underscores
    const cleaned = str.replace(/[^a-zA-Z0-9_]/g, "").replace(/\s+/g, "_");
    // Split the string into an array of words
    const words = cleaned.split("_");
    // Capitalize the first letter of each word (except the first word)
    const capitalized = words
        .map((word, i) => {
        if (i === 0) {
            return word;
        }
        else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    })
        .join("");
    return capitalized.charAt(0).toLocaleLowerCase() + capitalized.slice(1);
}
function getPointFromDistanceRotation(x, y, distance, angle) {
    // Convert angle from degrees to radians
    const radians = angle * (Math.PI / 180);
    // Calculate the new x and y coordinates
    const newX = x + distance * Math.cos(radians);
    const newY = y + distance * Math.sin(radians);
    return { x: newX, y: newY };
}


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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language */ "./src/language.ts");
/* harmony import */ var _elements_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/element */ "./src/elements/element.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./src/settings.ts");



figma.showUI(__html__, {
    title: 'MTA Exporter 2.0 by @borsuczyna',
    width: 300,
    height: 450,
    visible: true
});
function exportFrame(frame, align) {
    let offset = {
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
        align: align
    };
    let data = _elements_element__WEBPACK_IMPORTED_MODULE_1__.processNode(frame, offset, undefined);
    let code = data.code;
    let metaCode = data.metaCode;
    // remove last new line from code and metaCode
    code = code.slice(0, -1);
    metaCode = metaCode.slice(0, -1);
    code = _settings__WEBPACK_IMPORTED_MODULE_2__.settings.codeTemplate.replace('<CODE>', code).replace('<VARIABLES>', _elements_element__WEBPACK_IMPORTED_MODULE_1__.getVariables());
    metaCode = _settings__WEBPACK_IMPORTED_MODULE_2__.settings.metaTemplate.replace('<FILE_SOURCES>', metaCode);
    code = code.trim();
    figma.showUI(`<script>
    function openURL(url, arguments) {
        var argumentsString = encodeURIComponent(JSON.stringify(arguments));
        var finalUrl = url + "?arguments=" + argumentsString;
        window.open(finalUrl, "_blank");
    }

    openURL('http://localhost:8080/', {
        files: {
            'meta.xml': {
                code: \`${metaCode}\`,
                lang: 'xml',
            },
            'client.lua': {
                code: \`${code}\`,
                lang: 'lua',
            },
            'useful.lua': {
                code: \`${_settings__WEBPACK_IMPORTED_MODULE_2__.settings.usefulCode}\`,
                lang: 'lua',
            },
        }
    });
    </script>`, {
        visible: false
    });
    setTimeout(() => {
        figma.showUI(__html__, {
            title: 'MTA Exporter by borsuk',
            width: 300,
            height: 400,
            visible: true
        });
    }, 1000);
}
figma.ui.onmessage = msg => {
    if (msg.type === 'export-as-code') {
        let selections = figma.currentPage.selection;
        if (selections.length == 0)
            return figma.notify((0,_language__WEBPACK_IMPORTED_MODULE_0__["default"])('no-selection'), { error: true });
        if (selections.length > 1)
            return figma.notify((0,_language__WEBPACK_IMPORTED_MODULE_0__["default"])('more-than-one'), { error: true });
        let selection = selections[0];
        if (selection.type != 'FRAME')
            return figma.notify((0,_language__WEBPACK_IMPORTED_MODULE_0__["default"])('no-frame'), { error: true });
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.resetVariables();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.resetFocusElements();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.resetCurrentVariable();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.setMainFrame(selection);
        _settings__WEBPACK_IMPORTED_MODULE_2__.settings.zoom = msg.useZoom;
        _settings__WEBPACK_IMPORTED_MODULE_2__.settings.wordWrap = msg.wordWrap;
        exportFrame(selection, msg.align);
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.focusOnElements(selection);
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDJEQUFvQjtBQUNwRyxlQUFlLG9FQUE2QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQSxhQUFhO0FBQ2I7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBLGFBQWE7QUFDYjtBQUNBLDBCQUEwQiwwREFBbUIsQ0FBQztBQUM5QztBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxREFBVyxvQkFBb0IsYUFBYTtBQUM1RTtBQUNBLGdDQUFnQyxxREFBVyxxQkFBcUIsYUFBYTtBQUM3RTtBQUNBO0FBQ0EsZ0NBQWdDLHFEQUFXLGdCQUFnQixhQUFhO0FBQ3hFLFFBQVEsNkRBQXNCO0FBQzlCLFFBQVEsaUVBQTBCO0FBQ2xDLFFBQVEsbUVBQTRCO0FBQ3BDLFFBQVEsMkRBQW9CO0FBQzVCLFFBQVEsb0RBQWE7QUFDckIsUUFBUSx3REFBaUI7QUFDekI7QUFDQSxRQUFRLDhEQUF1QjtBQUMvQjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3Jhdy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvcmVjdGFuZ2xlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy90ZXh0LnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy90ZXh0dXJlcy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdmFyaWFibGUudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2xhbmd1YWdlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvdXNlZnVsLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24gfSBmcm9tIFwiLi4vdXNlZnVsXCI7XHJcbmltcG9ydCAqIGFzIFJlY3RhbmdsZSBmcm9tICcuL3JlY3RhbmdsZSc7XHJcbmltcG9ydCAqIGFzIFJhdyBmcm9tICcuL3Jhdyc7XHJcbmltcG9ydCAqIGFzIFZhcmlhYmxlIGZyb20gJy4vdmFyaWFibGUnO1xyXG5pbXBvcnQgKiBhcyBUZXh0IGZyb20gJy4vdGV4dCc7XHJcbmxldCBmb2N1c0VsZW1lbnRzID0gW107XHJcbmxldCB2YXJpYWJsZXMgPSB7fTtcclxubGV0IG1haW5GcmFtZTtcclxubGV0IGN1cnJlbnRWYXJpYWJsZSA9IHVuZGVmaW5lZDtcclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q3VycmVudFZhcmlhYmxlKCkge1xyXG4gICAgY3VycmVudFZhcmlhYmxlID0gdW5kZWZpbmVkO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNYWluRnJhbWUoZnJhbWUpIHtcclxuICAgIG1haW5GcmFtZSA9IGZyYW1lO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEZvY3VzRWxlbWVudHMoKSB7XHJcbiAgICBmb2N1c0VsZW1lbnRzID0gW107XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlUG9zaXRpb24obmFtZSwgcG9zaXRpb24pIHtcclxuICAgIHZhcmlhYmxlc1tuYW1lXSA9IHBvc2l0aW9uO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gMDtcclxuICAgIGZvciAobGV0IG5hbWUgaW4gdmFyaWFibGVzKVxyXG4gICAgICAgIGxlbmd0aCsrO1xyXG4gICAgaWYgKGxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIGxldCBjb2RlID0gJ2xvY2FsIHNldHRpbmdzID0ge1xcbic7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIHZhcmlhYmxlcykge1xyXG4gICAgICAgIGNvZGUgKz0gYFxcdFsnJHtuYW1lfSddID0geyR7dmFyaWFibGVzW25hbWVdfX1cXG5gO1xyXG4gICAgfVxyXG4gICAgY29kZSArPSAnfSc7XHJcbiAgICByZXR1cm4gY29kZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRWYXJpYWJsZXMoKSB7XHJcbiAgICB2YXJpYWJsZXMgPSB7fTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNNYXNrR3JvdXAobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCdpc01hc2snIGluIGNoaWxkICYmIGNoaWxkLmlzTWFzaylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWJzb2x1dGVQb3NpdGlvbihwb3NpdGlvbiwgYW5nbGUpIHtcclxuICAgIGxldCBsdCA9IHsgeDogcG9zaXRpb24ueCwgeTogcG9zaXRpb24ueSB9O1xyXG4gICAgbGV0IHJ0ID0gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbihwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi53aWR0aCwgYW5nbGUpO1xyXG4gICAgbGV0IGxiID0gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbihwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi5oZWlnaHQsIGFuZ2xlICsgOTApO1xyXG4gICAgbGV0IHJiID0gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbihydC54LCBydC55LCBwb3NpdGlvbi5oZWlnaHQsIGFuZ2xlICsgOTApO1xyXG4gICAgbGV0IHggPSBNYXRoLm1pbihsdC54LCBydC54LCBsYi54LCByYi54KTtcclxuICAgIGxldCB5ID0gTWF0aC5taW4obHQueSwgcnQueSwgbGIueSwgcmIueSk7XHJcbiAgICBsZXQgdHggPSBNYXRoLm1heChsdC54LCBydC54LCBsYi54LCByYi54KTtcclxuICAgIGxldCB0eSA9IE1hdGgubWF4KGx0LnksIHJ0LnksIGxiLnksIHJiLnkpO1xyXG4gICAgbGV0IHdpZHRoID0gdHggLSB4O1xyXG4gICAgbGV0IGhlaWdodCA9IHR5IC0geTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICB5OiB5LFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCkge1xyXG4gICAgZm9jdXNFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb2N1c09uRWxlbWVudHMoZnJhbWUpIHtcclxuICAgIC8vIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhbZnJhbWVdIHx8IGZvY3VzRWxlbWVudHMpO1xyXG4gICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gZm9jdXNFbGVtZW50cztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9zaXRpb24ocG9zaXRpb24sIG9mZnNldCwgbm9Xb3JkV3JhcCA9IHRydWUsIHRleHRYQWxpZ24gPSAnbGVmdCcsIHRleHRZQWxpZ24gPSAndG9wJykge1xyXG4gICAgbGV0IHggPSBwb3NpdGlvbi54O1xyXG4gICAgbGV0IHkgPSBwb3NpdGlvbi55O1xyXG4gICAgbGV0IHdpZHRoID0gcG9zaXRpb24ud2lkdGg7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcG9zaXRpb24uaGVpZ2h0O1xyXG4gICAgbGV0IHpvb20gPSBzZXR0aW5ncy56b29tID8gJy96b29tJyA6ICcnO1xyXG4gICAgbGV0IHhBbGlnbiA9IG9mZnNldC5hbGlnbi5jaGFyQXQoMCk7XHJcbiAgICBsZXQgeUFsaWduID0gb2Zmc2V0LmFsaWduLmNoYXJBdCgxKTtcclxuICAgIGlmIChub1dvcmRXcmFwKSB7XHJcbiAgICAgICAgbGV0IHhzID0gJycsIHlzID0gJyc7XHJcbiAgICAgICAgaWYgKHhBbGlnbiA9PSAnTCcpIHtcclxuICAgICAgICAgICAgaWYgKHRleHRYQWxpZ24gPT0gJ2xlZnQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgJHt4ICsgd2lkdGggLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdyaWdodCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGAke3ggKyB3aWR0aH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdDJykge1xyXG4gICAgICAgICAgICB4ID0geCAtIG9mZnNldC53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WEFsaWduID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4LzIgKyAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeC8yICsgJHt4ICsgd2lkdGggLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdyaWdodCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeC8yICsgJHt4ICsgd2lkdGh9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnUicpIHtcclxuICAgICAgICAgICAgeCA9IG9mZnNldC53aWR0aCAtIHg7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WEFsaWduID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4IC0gJHt4ICsgd2lkdGh9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeCAtICR7eCArIHdpZHRoIC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAncmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3ggLSAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5QWxpZ24gPT0gJ1QnKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WUFsaWduID09ICd0b3AnKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgJHt5ICsgaGVpZ2h0IC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnYm90dG9tJylcclxuICAgICAgICAgICAgICAgIHlzID0gYCR7eSArIGhlaWdodH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUFsaWduID09ICdNJykge1xyXG4gICAgICAgICAgICB5ID0geSAtIG9mZnNldC5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBpZiAodGV4dFlBbGlnbiA9PSAndG9wJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5LzIgKyAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeS8yICsgJHt5ICsgaGVpZ2h0IC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnYm90dG9tJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5LzIgKyAke3kgKyBoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnQicpIHtcclxuICAgICAgICAgICAgeSA9IG9mZnNldC5oZWlnaHQgLSB5O1xyXG4gICAgICAgICAgICBpZiAodGV4dFlBbGlnbiA9PSAndG9wJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5IC0gJHt5ICsgaGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kgLSAke3kgKyBoZWlnaHQgLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdib3R0b20nKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kgLSAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHt4c30sICR7eXN9LCBuaWwsIG5pbGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoeEFsaWduID09ICdMJylcclxuICAgICAgICAgICAgeCA9IGAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdDJykge1xyXG4gICAgICAgICAgICB4ID0geCAtIG9mZnNldC53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHggPSBgc3gvMiArICR7eH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdSJykge1xyXG4gICAgICAgICAgICB4ID0gb2Zmc2V0LndpZHRoIC0geDtcclxuICAgICAgICAgICAgeCA9IGBzeCAtICR7eH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHlBbGlnbiA9PSAnVCcpXHJcbiAgICAgICAgICAgIHkgPSBgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnTScpIHtcclxuICAgICAgICAgICAgeSA9IHkgLSBvZmZzZXQuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgeSA9IGBzeS8yICsgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ0InKSB7XHJcbiAgICAgICAgICAgIHkgPSBvZmZzZXQuaGVpZ2h0IC0geTtcclxuICAgICAgICAgICAgeSA9IGBzeSAtICR7eX0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRWYXJpYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYHNldHRpbmdzWycke2N1cnJlbnRWYXJpYWJsZX0nXVsxXSArICR7eH0ke3pvb219LCBzZXR0aW5nc1snJHtjdXJyZW50VmFyaWFibGV9J11bMl0gKyAke3l9JHt6b29tfSwgJHt3aWR0aH0ke3pvb219LCAke2hlaWdodH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3h9LCAke3l9LCAke3dpZHRofSR7em9vbX0sICR7aGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0b0NvbG9yKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gYHRvY29sb3IoJHtNYXRoLmZsb29yKGNvbG9yLmNvbG9yLnIgKiAyNTUpfSwgJHtNYXRoLmZsb29yKGNvbG9yLmNvbG9yLmcgKiAyNTUpfSwgJHtNYXRoLmZsb29yKGNvbG9yLmNvbG9yLmIgKiAyNTUpfSwgJHtNYXRoLmZsb29yKGNvbG9yLm9wYWNpdHkgKiAyNTUpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzTm9kZShlbGVtZW50LCBvZmZzZXQsIHZhcmlhYmxlKSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gJyc7XHJcbiAgICBsZXQgcHJlVmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIGlmIChlbGVtZW50LnR5cGUgPT0gJ0ZSQU1FJyAmJiBlbGVtZW50ICE9IG1haW5GcmFtZSkge1xyXG4gICAgICAgIHZhcmlhYmxlID0gVmFyaWFibGUucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIHZhcmlhYmxlKTtcclxuICAgICAgICBjdXJyZW50VmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIH1cclxuICAgIC8vIGNvZGUgKz0gYC0tICR7ZWxlbWVudC50eXBlfTogJHtlbGVtZW50Lm5hbWV9ICR7Y3VycmVudFZhcmlhYmxlIHx8ICcnfVxcbmA7XHJcbiAgICBpZiAoZWxlbWVudC50eXBlID09ICdHUk9VUCcgJiYgZWxlbWVudC5uYW1lLnN0YXJ0c1dpdGgoJzxzaW5nbGU+JykpIHtcclxuICAgICAgICBsZXQgbmFtZSA9ICdfc2luZ2xlXycgKyBlbGVtZW50Lm5hbWUuc2xpY2UoJzxzaW5nbGU+Jy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBkYXRhID0gUmF3LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCBuYW1lKTtcclxuICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIGFkZEZvY3VzRWxlbWVudChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzTWFza0dyb3VwKGVsZW1lbnQpIHx8IGVsZW1lbnQudHlwZSA9PSAnVkVDVE9SJykge1xyXG4gICAgICAgIGxldCBkYXRhID0gUmF3LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCBlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIGNvZGUgKz0gZGF0YS5jb2RlO1xyXG4gICAgICAgIG1ldGFDb2RlICs9IGRhdGEubWV0YUNvZGU7XHJcbiAgICAgICAgYWRkRm9jdXNFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoJ2NoaWxkcmVuJyBpbiBlbGVtZW50KSB7XHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgZWxlbWVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHByb2Nlc3NOb2RlKGNoaWxkLCBvZmZzZXQsIHZhcmlhYmxlKTtcclxuICAgICAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgICAgIG1ldGFDb2RlICs9IGRhdGEubWV0YUNvZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PSAnUkVDVEFOR0xFJykge1xyXG4gICAgICAgIGxldCBkYXRhID0gUmVjdGFuZ2xlLnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KTtcclxuICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIGFkZEZvY3VzRWxlbWVudChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PSAnVEVYVCcpIHtcclxuICAgICAgICBjb2RlICs9IFRleHQucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQpO1xyXG4gICAgfVxyXG4gICAgdmFyaWFibGUgPSBwcmVWYXJpYWJsZTtcclxuICAgIGN1cnJlbnRWYXJpYWJsZSA9IHZhcmlhYmxlO1xyXG4gICAgLy8gd3lqZWJhYyBsb2FkVGV4dHVyZXNcclxuICAgIC8vIG5pZSBla3Nwb3J0b3dhYyBraWxrYSB0YWtpY2ggc2FteWNoXHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCsgLS9nLCAnLSAnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKyAwXFwvem9vbS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8tIDBcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKyAwL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLy0gMC9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCogMVxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwvIDFcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKiAxL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcLyAxL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLyhcXGQrXFwuXFxkezN9KVxcZCsvZywgJyQxJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8gLC9nLCAnLCcpO1xyXG4gICAgcmV0dXJuIHsgY29kZSwgbWV0YUNvZGUgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmltcG9ydCAqIGFzIFRleHR1cmVzIGZyb20gJy4vdGV4dHVyZXMnO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIG5hbWUpIHtcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSAnJztcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIEVmZmVjdHNcclxuICAgIC8vIEBUT0RPXHJcbiAgICAvLyBDYWxjdWxhdGUgYWJzb2x1dGUgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHJvdGF0aW9uXHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCAncm90YXRpb24nIGluIGVsZW1lbnQgPyBlbGVtZW50LnJvdGF0aW9uIDogMCk7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBFbGVtZW50LmdldFBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgb2Zmc2V0KTtcclxuICAgIC8vIEdlbmVyYXRlIGNvZGVcclxuICAgIGNvZGUgPSBgXFx0ZHhEcmF3SW1hZ2UoJHtwb3NpdGlvbn0sICcke1RleHR1cmVzLmltYWdlUGF0aChuYW1lKX0nKVxcbmA7XHJcbiAgICBtZXRhQ29kZSA9IGBcXHQ8ZmlsZSBzcmM9XCIke1RleHR1cmVzLmltYWdlUGF0aChuYW1lKX1cIi8+XFxuYDtcclxuICAgIHJldHVybiB7IGNvZGUsIG1ldGFDb2RlIH07XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnO1xyXG5pbXBvcnQgKiBhcyBUZXh0dXJlcyBmcm9tICcuL3RleHR1cmVzJztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gJyc7XHJcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6IGVsZW1lbnQueCxcclxuICAgICAgICB5OiBlbGVtZW50LnksXHJcbiAgICAgICAgd2lkdGg6IGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmhlaWdodCxcclxuICAgIH07XHJcbiAgICAvLyBTdHJva2VzXHJcbiAgICBsZXQgb2ZmU2l6ZSA9IDA7XHJcbiAgICBpZiAoZWxlbWVudC5zdHJva2VBbGlnbiA9PSAnT1VUU0lERScpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdDRU5URVInKSB7XHJcbiAgICAgICAgb2ZmU2l6ZSA9IGVsZW1lbnQuc3Ryb2tlV2VpZ2h0IC8gMjtcclxuICAgIH1cclxuICAgIC8vIEVmZmVjdHNcclxuICAgIC8vIEBUT0RPXHJcbiAgICBlbGVtZW50UG9zaXRpb24ueCAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLnkgLT0gb2ZmU2l6ZTtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi53aWR0aCArPSBvZmZTaXplICogMjtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi5oZWlnaHQgKz0gb2ZmU2l6ZSAqIDI7XHJcbiAgICAvLyBDYWxjdWxhdGUgYWJzb2x1dGUgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHJvdGF0aW9uXHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBlbGVtZW50LnJvdGF0aW9uKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgLy8gR2VuZXJhdGUgY29kZVxyXG4gICAgY29kZSA9IGBcXHRkeERyYXdJbWFnZSgke3Bvc2l0aW9ufSwgJyR7VGV4dHVyZXMuaW1hZ2VQYXRoKGVsZW1lbnQubmFtZSl9JylcXG5gO1xyXG4gICAgbWV0YUNvZGUgPSBgXFx0PGZpbGUgc3JjPVwiJHtUZXh0dXJlcy5pbWFnZVBhdGgoZWxlbWVudC5uYW1lKX1cIi8+XFxuYDtcclxuICAgIHJldHVybiB7IGNvZGUsIG1ldGFDb2RlIH07XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzJztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gU3Ryb2tlc1xyXG4gICAgbGV0IG9mZlNpemUgPSAwO1xyXG4gICAgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ09VVFNJREUnKSB7XHJcbiAgICAgICAgb2ZmU2l6ZSA9IGVsZW1lbnQuc3Ryb2tlV2VpZ2h0O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZWxlbWVudC5zdHJva2VBbGlnbiA9PSAnQ0VOVEVSJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodCAvIDI7XHJcbiAgICB9XHJcbiAgICAvLyBFZmZlY3RzXHJcbiAgICAvLyBAVE9ET1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLnggLT0gb2ZmU2l6ZTtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi55IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ud2lkdGggKz0gb2ZmU2l6ZSAqIDI7XHJcbiAgICBlbGVtZW50UG9zaXRpb24uaGVpZ2h0ICs9IG9mZlNpemUgKiAyO1xyXG4gICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHBvc2l0aW9uIGRlcGVuZGluZyBvbiByb3RhdGlvblxyXG4gICAgbGV0IHhBbGlnbiA9IGVsZW1lbnQudGV4dEFsaWduSG9yaXpvbnRhbC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHlBbGlnbiA9IGVsZW1lbnQudGV4dEFsaWduVmVydGljYWwudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIGxldCB6b29tID0gc2V0dGluZ3Muem9vbSA/ICcvem9vbScgOiAnJztcclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIGVsZW1lbnQucm90YXRpb24pO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCwgIXNldHRpbmdzLndvcmRXcmFwLCB4QWxpZ24sIHlBbGlnbik7XHJcbiAgICBsZXQgW3gsIHksIHcsIGhdID0gcG9zaXRpb24uc3BsaXQoJywnKS5tYXAoZSA9PiBlLnRyaW0oKSk7XHJcbiAgICBpZiAoc2V0dGluZ3Mud29yZFdyYXApIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGAke3h9LCAke3l9LCAoJHt4fSkgKyAoJHt3fSksICgke3l9KSArICgke2h9KWA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGAke3h9LCAke3l9LCBuaWwsIG5pbGA7XHJcbiAgICB9XHJcbiAgICBsZXQgY29sb3IgPSBlbGVtZW50LmZpbGxzWzBdO1xyXG4gICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBlbGVtZW50LmNoYXJhY3RlcnM7XHJcbiAgICAgICAgd2hpbGUgKHRleHQuaW5jbHVkZXMoJ1xcbicpKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoJ1xcbicsICc8IW5ld2xpbmUhPicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2l6ZSA9IHBhcnNlRmxvYXQoZWxlbWVudC5mb250U2l6ZS50b0xvY2FsZVN0cmluZygpKSAvIDEuNTtcclxuICAgICAgICBsZXQgZm9udCA9IGBnZXRGaWdtYUZvbnQoJyR7ZWxlbWVudC5mb250TmFtZS5mYW1pbHl9LSR7ZWxlbWVudC5mb250TmFtZS5zdHlsZX0nLCAke3NpemV9JHt6b29tfSlgO1xyXG4gICAgICAgIGNvZGUgPSBgXFx0ZHhEcmF3VGV4dCgnJHt0ZXh0fScsICR7cG9zaXRpb259LCAke0VsZW1lbnQudG9Db2xvcihjb2xvcil9LCAxLCAke2ZvbnR9LCAnJHt4QWxpZ259JywgJyR7eUFsaWdufScke3NldHRpbmdzLndvcmRXcmFwID8gJywgZmFsc2UsIHRydWUnIDogJyd9KVxcbmA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZTtcclxufVxyXG4iLCJpbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VQYXRoKGlucHV0KSB7XHJcbiAgICBjb25zdCBjbGVhbmVkID0gaW5wdXQucmVwbGFjZSgvW15hLXpBLVowLTlfLV0vZywgJycpO1xyXG4gICAgLy8gY29uc3QgdHJ1bmNhdGVkID0gY2xlYW5lZC5zdWJzdHJpbmcoMCwgMTYpO1xyXG4gICAgLy8gcmV0dXJuIGAke3NldHRpbmdzLnBhdGh9JHt0cnVuY2F0ZWR9LnBuZ2A7XHJcbiAgICByZXR1cm4gYCR7c2V0dGluZ3MucGF0aH0ke2lucHV0fS5wbmdgO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCB2YXJpYWJsZSkge1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHBvc2l0aW9uIGRlcGVuZGluZyBvbiByb3RhdGlvblxyXG4gICAgZWxlbWVudFBvc2l0aW9uID0gRWxlbWVudC5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgJ3JvdGF0aW9uJyBpbiBlbGVtZW50ID8gZWxlbWVudC5yb3RhdGlvbiA6IDApO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCk7XHJcbiAgICB2YXJpYWJsZSA9IGVsZW1lbnQubmFtZTtcclxuICAgIEVsZW1lbnQuZGVmaW5lVmFyaWFibGVQb3NpdGlvbihlbGVtZW50Lm5hbWUsIHBvc2l0aW9uKTtcclxuICAgIC8vIEdlbmVyYXRlIGNvZGVcclxuICAgIHJldHVybiB2YXJpYWJsZTtcclxufVxyXG4iLCI7XHJcbmxldCBsYW5ndWFnZSA9ICdFTic7XHJcbmNvbnN0IGxhbmd1YWdlcyA9IHtcclxuICAgICdQTCc6IHtcclxuICAgICAgICAnbm8tc2VsZWN0aW9uJzogJ05pZSB3eWJyYW5vIMW8YWRuZWdvIGVsZW1lbnR1JyxcclxuICAgICAgICAnbW9yZS10aGFuLW9uZSc6ICdaYXpuYWN6b25vIHdpxJljZWogbmnFvCBqZWRlbiBlbGVtZW50JyxcclxuICAgICAgICAnbm8tZnJhbWUnOiAnWmF6bmFjem9ueSBlbGVtZW50IHRvIG5pZSBmcmFtZScsXHJcbiAgICB9LFxyXG4gICAgJ0VOJzoge1xyXG4gICAgICAgICduby1zZWxlY3Rpb24nOiAnVGhlcmVcXCdzIG5vdGhpbmcgc2VsZWN0ZWQnLFxyXG4gICAgICAgICdtb3JlLXRoYW4tb25lJzogJ1RoZXJlXFwncyBtb3JlIHRoYW4gb25lIGVsZW1lbnQgc2VsZWN0ZWQnLFxyXG4gICAgICAgICduby1mcmFtZSc6ICdTZWxlY3RlZCBlbGVtZW50IGlzblxcJ3QgZnJhbWUnXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zbGF0aW9uKGtleSkge1xyXG4gICAgcmV0dXJuIGxhbmd1YWdlc1tsYW5ndWFnZV0gJiYgbGFuZ3VhZ2VzW2xhbmd1YWdlXVtrZXldIHx8IGtleTtcclxufVxyXG4iLCJjb25zdCBtZXRhVGVtcGxhdGUgPSBgPG1ldGE+XHJcbiAgICA8c2NyaXB0IHNyYz0ndXNlZnVsLmx1YScgdHlwZT0nY2xpZW50JyBjYWNoZT0nZmFsc2UnLz5cclxuICAgIDxzY3JpcHQgc3JjPSdjbGllbnQubHVhJyB0eXBlPSdjbGllbnQnIGNhY2hlPSdmYWxzZScvPlxyXG5cclxuPEZJTEVfU09VUkNFUz5cclxuPC9tZXRhPmA7XHJcbmNvbnN0IGNvZGVUZW1wbGF0ZSA9IGBcclxuPFZBUklBQkxFUz5cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclVJKClcclxuPENPREU+XHJcbmVuZFxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVUkodmlzaWJsZSlcclxuICAgIGxvY2FsIGV2ZW50Q2FsbGJhY2sgPSB2aXNpYmxlIGFuZCBhZGRFdmVudEhhbmRsZXIgb3IgcmVtb3ZlRXZlbnRIYW5kbGVyXHJcblxyXG4gICAgZXZlbnRDYWxsYmFjaygnb25DbGllbnRSZW5kZXInLCByb290LCByZW5kZXJVSSlcclxuZW5kXHJcblxyXG50b2dnbGVVSSh0cnVlKWA7XHJcbmNvbnN0IHVzZWZ1bENvZGUgPSBgc3gsIHN5ID0gZ3VpR2V0U2NyZWVuU2l6ZSgpXHJcbnpvb20gPSAoc3ggPCAyMDQ4KSBhbmQgbWF0aC5taW4oMi4yLCAyMDQ4L3N4KSBvciAxXHJcbmZvbnRzID0ge1xyXG4gICAgZmlnbWFGb250cyA9IHt9LFxyXG59XHJcblxyXG5mdW5jdGlvbiB1bmxvYWRGb250cygpXHJcbiAgICBmb3Igayx2IGluIHBhaXJzKGZvbnRzKSBkb1xyXG4gICAgICAgIGlmIHYgYW5kIGlzRWxlbWVudCh2KSB0aGVuIGRlc3Ryb3lFbGVtZW50KHYpIGVuZFxyXG4gICAgZW5kXHJcbiAgICBmb250cyA9IHtcclxuICAgICAgICBmaWdtYUZvbnRzID0ge30sXHJcbiAgICB9XHJcbmVuZFxyXG5cclxuZnVuY3Rpb24gbG9hZEZvbnRzKGFycmF5KVxyXG4gICAgdW5sb2FkRm9udHMoKVxyXG4gICAgZm9yIF8sdiBpbiBwYWlycyhhcnJheSkgZG9cclxuICAgICAgICBmb250c1t2WzFdXSA9IGR4Q3JlYXRlRm9udCh2WzJdLCB2WzNdLCB2WzRdLCAncHJvb2YnKVxyXG4gICAgZW5kXHJcbmVuZFxyXG5cclxuZnVuY3Rpb24gZ2V0RmlnbWFGb250KGZvbnQsIHNpemUpXHJcbiAgICBsb2NhbCBmaWdtYUZvbnRzID0gZm9udHMuZmlnbWFGb250c1xyXG4gICAgaWYgbm90IGZpZ21hRm9udHNbZm9udC4uc2l6ZV0gdGhlblxyXG4gICAgICAgIGZpZ21hRm9udHNbZm9udC4uc2l6ZV0gPSBleHBvcnRzWydmaWdtYSddOmdldEZvbnQoZm9udCwgc2l6ZSlcclxuICAgIGVuZFxyXG5cclxuICAgIHJldHVybiBmaWdtYUZvbnRzW2ZvbnQuLnNpemVdXHJcbmVuZGA7XHJcbmV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgIHpvb206IHRydWUsXHJcbiAgICBwYXRoOiAnZGF0YS8nLFxyXG4gICAgbWV0YVRlbXBsYXRlOiBtZXRhVGVtcGxhdGUsXHJcbiAgICBjb2RlVGVtcGxhdGU6IGNvZGVUZW1wbGF0ZSxcclxuICAgIHVzZWZ1bENvZGU6IHVzZWZ1bENvZGUsXHJcbiAgICB3b3JkV3JhcDogZmFsc2UsXHJcbn07XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9DYW1lbENhc2Uoc3RyKSB7XHJcbiAgICAvLyBSZW1vdmUgYWxsIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgcmVwbGFjZSBzcGFjZXMgd2l0aCB1bmRlcnNjb3Jlc1xyXG4gICAgY29uc3QgY2xlYW5lZCA9IHN0ci5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csIFwiXCIpLnJlcGxhY2UoL1xccysvZywgXCJfXCIpO1xyXG4gICAgLy8gU3BsaXQgdGhlIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHdvcmRzXHJcbiAgICBjb25zdCB3b3JkcyA9IGNsZWFuZWQuc3BsaXQoXCJfXCIpO1xyXG4gICAgLy8gQ2FwaXRhbGl6ZSB0aGUgZmlyc3QgbGV0dGVyIG9mIGVhY2ggd29yZCAoZXhjZXB0IHRoZSBmaXJzdCB3b3JkKVxyXG4gICAgY29uc3QgY2FwaXRhbGl6ZWQgPSB3b3Jkc1xyXG4gICAgICAgIC5tYXAoKHdvcmQsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gd29yZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgcmV0dXJuIGNhcGl0YWxpemVkLmNoYXJBdCgwKS50b0xvY2FsZUxvd2VyQ2FzZSgpICsgY2FwaXRhbGl6ZWQuc2xpY2UoMSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24oeCwgeSwgZGlzdGFuY2UsIGFuZ2xlKSB7XHJcbiAgICAvLyBDb252ZXJ0IGFuZ2xlIGZyb20gZGVncmVlcyB0byByYWRpYW5zXHJcbiAgICBjb25zdCByYWRpYW5zID0gYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIG5ldyB4IGFuZCB5IGNvb3JkaW5hdGVzXHJcbiAgICBjb25zdCBuZXdYID0geCArIGRpc3RhbmNlICogTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICBjb25zdCBuZXdZID0geSArIGRpc3RhbmNlICogTWF0aC5zaW4ocmFkaWFucyk7XHJcbiAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZIH07XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHJhbnNsYXRpb24gZnJvbSBcIi4vbGFuZ3VhZ2VcIjtcclxuaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnRzL2VsZW1lbnQnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xyXG4gICAgdGl0bGU6ICdNVEEgRXhwb3J0ZXIgMi4wIGJ5IEBib3JzdWN6eW5hJyxcclxuICAgIHdpZHRoOiAzMDAsXHJcbiAgICBoZWlnaHQ6IDQ1MCxcclxuICAgIHZpc2libGU6IHRydWVcclxufSk7XHJcbmZ1bmN0aW9uIGV4cG9ydEZyYW1lKGZyYW1lLCBhbGlnbikge1xyXG4gICAgbGV0IG9mZnNldCA9IHtcclxuICAgICAgICB4OiBmcmFtZS54LFxyXG4gICAgICAgIHk6IGZyYW1lLnksXHJcbiAgICAgICAgd2lkdGg6IGZyYW1lLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZnJhbWUuaGVpZ2h0LFxyXG4gICAgICAgIGFsaWduOiBhbGlnblxyXG4gICAgfTtcclxuICAgIGxldCBkYXRhID0gRWxlbWVudC5wcm9jZXNzTm9kZShmcmFtZSwgb2Zmc2V0LCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IGNvZGUgPSBkYXRhLmNvZGU7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgLy8gcmVtb3ZlIGxhc3QgbmV3IGxpbmUgZnJvbSBjb2RlIGFuZCBtZXRhQ29kZVxyXG4gICAgY29kZSA9IGNvZGUuc2xpY2UoMCwgLTEpO1xyXG4gICAgbWV0YUNvZGUgPSBtZXRhQ29kZS5zbGljZSgwLCAtMSk7XHJcbiAgICBjb2RlID0gc2V0dGluZ3MuY29kZVRlbXBsYXRlLnJlcGxhY2UoJzxDT0RFPicsIGNvZGUpLnJlcGxhY2UoJzxWQVJJQUJMRVM+JywgRWxlbWVudC5nZXRWYXJpYWJsZXMoKSk7XHJcbiAgICBtZXRhQ29kZSA9IHNldHRpbmdzLm1ldGFUZW1wbGF0ZS5yZXBsYWNlKCc8RklMRV9TT1VSQ0VTPicsIG1ldGFDb2RlKTtcclxuICAgIGNvZGUgPSBjb2RlLnRyaW0oKTtcclxuICAgIGZpZ21hLnNob3dVSShgPHNjcmlwdD5cclxuICAgIGZ1bmN0aW9uIG9wZW5VUkwodXJsLCBhcmd1bWVudHMpIHtcclxuICAgICAgICB2YXIgYXJndW1lbnRzU3RyaW5nID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpO1xyXG4gICAgICAgIHZhciBmaW5hbFVybCA9IHVybCArIFwiP2FyZ3VtZW50cz1cIiArIGFyZ3VtZW50c1N0cmluZztcclxuICAgICAgICB3aW5kb3cub3BlbihmaW5hbFVybCwgXCJfYmxhbmtcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlblVSTCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsIHtcclxuICAgICAgICBmaWxlczoge1xyXG4gICAgICAgICAgICAnbWV0YS54bWwnOiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcXGAke21ldGFDb2RlfVxcYCxcclxuICAgICAgICAgICAgICAgIGxhbmc6ICd4bWwnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnY2xpZW50Lmx1YSc6IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFxcYCR7Y29kZX1cXGAsXHJcbiAgICAgICAgICAgICAgICBsYW5nOiAnbHVhJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ3VzZWZ1bC5sdWEnOiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcXGAke3NldHRpbmdzLnVzZWZ1bENvZGV9XFxgLFxyXG4gICAgICAgICAgICAgICAgbGFuZzogJ2x1YScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICA8L3NjcmlwdD5gLCB7XHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnTVRBIEV4cG9ydGVyIGJ5IGJvcnN1aycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAxMDAwKTtcclxufVxyXG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xyXG4gICAgaWYgKG1zZy50eXBlID09PSAnZXhwb3J0LWFzLWNvZGUnKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbnMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbnMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ25vLXNlbGVjdGlvbicpLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ21vcmUtdGhhbi1vbmUnKSwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uID0gc2VsZWN0aW9uc1swXTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT0gJ0ZSQU1FJylcclxuICAgICAgICAgICAgcmV0dXJuIGZpZ21hLm5vdGlmeSh0cmFuc2xhdGlvbignbm8tZnJhbWUnKSwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICBFbGVtZW50LnJlc2V0VmFyaWFibGVzKCk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldEZvY3VzRWxlbWVudHMoKTtcclxuICAgICAgICBFbGVtZW50LnJlc2V0Q3VycmVudFZhcmlhYmxlKCk7XHJcbiAgICAgICAgRWxlbWVudC5zZXRNYWluRnJhbWUoc2VsZWN0aW9uKTtcclxuICAgICAgICBzZXR0aW5ncy56b29tID0gbXNnLnVzZVpvb207XHJcbiAgICAgICAgc2V0dGluZ3Mud29yZFdyYXAgPSBtc2cud29yZFdyYXA7XHJcbiAgICAgICAgZXhwb3J0RnJhbWUoc2VsZWN0aW9uLCBtc2cuYWxpZ24pO1xyXG4gICAgICAgIEVsZW1lbnQuZm9jdXNPbkVsZW1lbnRzKHNlbGVjdGlvbik7XHJcbiAgICB9XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==