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
let focusElementsNames = [];
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
    focusElementsNames = [];
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
function addFocusElement(element, name) {
    if (focusElementsNames.indexOf(name) != -1)
        return;
    focusElementsNames.push(name);
    focusElements.push(element);
}
function focusOnElements(frame) {
    // figma.viewport.scrollAndZoomIntoView([frame] || focusElements);
    figma.currentPage.selection = focusElements;
}
function getPosition(position, offset, noWordWrap = false, textXAlign = 'left', textYAlign = 'top') {
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
        addFocusElement(element, name);
    }
    else if (isMaskGroup(element) || element.type == 'VECTOR') {
        let data = _raw__WEBPACK_IMPORTED_MODULE_3__.process(element, offset, element.name);
        code += data.code;
        metaCode += data.metaCode;
        addFocusElement(element, element.name);
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
        addFocusElement(element, element.name);
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
/* harmony export */   "addTexture": () => (/* binding */ addTexture),
/* harmony export */   "getTextureVariable": () => (/* binding */ getTextureVariable),
/* harmony export */   "imagePath": () => (/* binding */ imagePath),
/* harmony export */   "resetTextures": () => (/* binding */ resetTextures),
/* harmony export */   "variableName": () => (/* binding */ variableName)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/settings.ts");
/* harmony import */ var _useful__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../useful */ "./src/useful.ts");


let textures = [];
function resetTextures() {
    textures = [];
}
function imagePath(input) {
    const cleaned = input.replace(/[^a-zA-Z0-9_-]/g, '');
    // const truncated = cleaned.substring(0, 16);
    // return `${settings.path}${truncated}.png`;
    return `${_settings__WEBPACK_IMPORTED_MODULE_0__.settings.path}${input}.png`;
}
function variableName(input) {
    const cleaned = input.replace(/[^a-zA-Z0-9_]/g, '');
    // const truncated = cleaned.substring(0, 16);
    return cleaned.toLocaleLowerCase();
}
function getTextureVariable(texture) {
    return (0,_useful__WEBPACK_IMPORTED_MODULE_1__.convertToCamelCase)(texture);
}
function addTexture(texture) {
    if (textures.find(e => e.texture == texture) != undefined)
        return;
    let variable = getTextureVariable(texture);
    // let tempVariable = variable;
    // let i = 1;
    // while(textures.find(e => e.variable == tempVariable) != undefined) {
    //     tempVariable = variable + (i++);
    // }
    // variable = tempVariable;
    textures.push({
        variable: variable,
        texture: imagePath(texture)
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ1M7QUFDUjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDBEQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvRUFBNkIsd0NBQXdDLDJEQUFvQjtBQUNwRyxlQUFlLG9FQUE2QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQSxhQUFhO0FBQ2I7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBLGFBQWE7QUFDYjtBQUNBLDBCQUEwQiwwREFBbUIsQ0FBQztBQUM5QztBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxREFBVyxvQkFBb0IsYUFBYTtBQUM1RTtBQUNBLGdDQUFnQyxxREFBVyxxQkFBcUIsYUFBYTtBQUM3RTtBQUNBO0FBQ0EsZ0NBQWdDLHFEQUFXLGdCQUFnQixhQUFhO0FBQ3hFLFFBQVEsNkRBQXNCO0FBQzlCLFFBQVEsaUVBQTBCO0FBQ2xDLFFBQVEsbUVBQTRCO0FBQ3BDLFFBQVEsMkRBQW9CO0FBQzVCLFFBQVEsb0RBQWE7QUFDckIsUUFBUSx3REFBaUI7QUFDekI7QUFDQSxRQUFRLDhEQUF1QjtBQUMvQjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3Jhdy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvcmVjdGFuZ2xlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy90ZXh0LnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy90ZXh0dXJlcy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdmFyaWFibGUudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2xhbmd1YWdlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvdXNlZnVsLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24gfSBmcm9tIFwiLi4vdXNlZnVsXCI7XHJcbmltcG9ydCAqIGFzIFJlY3RhbmdsZSBmcm9tICcuL3JlY3RhbmdsZSc7XHJcbmltcG9ydCAqIGFzIFJhdyBmcm9tICcuL3Jhdyc7XHJcbmltcG9ydCAqIGFzIFZhcmlhYmxlIGZyb20gJy4vdmFyaWFibGUnO1xyXG5pbXBvcnQgKiBhcyBUZXh0IGZyb20gJy4vdGV4dCc7XHJcbmxldCBmb2N1c0VsZW1lbnRzID0gW107XHJcbmxldCBmb2N1c0VsZW1lbnRzTmFtZXMgPSBbXTtcclxubGV0IHZhcmlhYmxlcyA9IHt9O1xyXG5sZXQgbWFpbkZyYW1lO1xyXG5sZXQgY3VycmVudFZhcmlhYmxlID0gdW5kZWZpbmVkO1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRDdXJyZW50VmFyaWFibGUoKSB7XHJcbiAgICBjdXJyZW50VmFyaWFibGUgPSB1bmRlZmluZWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1haW5GcmFtZShmcmFtZSkge1xyXG4gICAgbWFpbkZyYW1lID0gZnJhbWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Rm9jdXNFbGVtZW50cygpIHtcclxuICAgIGZvY3VzRWxlbWVudHMgPSBbXTtcclxuICAgIGZvY3VzRWxlbWVudHNOYW1lcyA9IFtdO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZVBvc2l0aW9uKG5hbWUsIHBvc2l0aW9uKSB7XHJcbiAgICB2YXJpYWJsZXNbbmFtZV0gPSBwb3NpdGlvbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzKCkge1xyXG4gICAgbGV0IGxlbmd0aCA9IDA7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIHZhcmlhYmxlcylcclxuICAgICAgICBsZW5ndGgrKztcclxuICAgIGlmIChsZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICBsZXQgY29kZSA9ICdsb2NhbCBzZXR0aW5ncyA9IHtcXG4nO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiB2YXJpYWJsZXMpIHtcclxuICAgICAgICBjb2RlICs9IGBcXHRbJyR7bmFtZX0nXSA9IHske3ZhcmlhYmxlc1tuYW1lXX19XFxuYDtcclxuICAgIH1cclxuICAgIGNvZGUgKz0gJ30nO1xyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VmFyaWFibGVzKCkge1xyXG4gICAgdmFyaWFibGVzID0ge307XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFza0dyb3VwKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICgnaXNNYXNrJyBpbiBjaGlsZCAmJiBjaGlsZC5pc01hc2spXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFic29sdXRlUG9zaXRpb24ocG9zaXRpb24sIGFuZ2xlKSB7XHJcbiAgICBsZXQgbHQgPSB7IHg6IHBvc2l0aW9uLngsIHk6IHBvc2l0aW9uLnkgfTtcclxuICAgIGxldCBydCA9IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24ocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ud2lkdGgsIGFuZ2xlKTtcclxuICAgIGxldCBsYiA9IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24ocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24uaGVpZ2h0LCBhbmdsZSArIDkwKTtcclxuICAgIGxldCByYiA9IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24ocnQueCwgcnQueSwgcG9zaXRpb24uaGVpZ2h0LCBhbmdsZSArIDkwKTtcclxuICAgIGxldCB4ID0gTWF0aC5taW4obHQueCwgcnQueCwgbGIueCwgcmIueCk7XHJcbiAgICBsZXQgeSA9IE1hdGgubWluKGx0LnksIHJ0LnksIGxiLnksIHJiLnkpO1xyXG4gICAgbGV0IHR4ID0gTWF0aC5tYXgobHQueCwgcnQueCwgbGIueCwgcmIueCk7XHJcbiAgICBsZXQgdHkgPSBNYXRoLm1heChsdC55LCBydC55LCBsYi55LCByYi55KTtcclxuICAgIGxldCB3aWR0aCA9IHR4IC0geDtcclxuICAgIGxldCBoZWlnaHQgPSB0eSAtIHk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gYWRkRm9jdXNFbGVtZW50KGVsZW1lbnQsIG5hbWUpIHtcclxuICAgIGlmIChmb2N1c0VsZW1lbnRzTmFtZXMuaW5kZXhPZihuYW1lKSAhPSAtMSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBmb2N1c0VsZW1lbnRzTmFtZXMucHVzaChuYW1lKTtcclxuICAgIGZvY3VzRWxlbWVudHMucHVzaChlbGVtZW50KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9jdXNPbkVsZW1lbnRzKGZyYW1lKSB7XHJcbiAgICAvLyBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW2ZyYW1lXSB8fCBmb2N1c0VsZW1lbnRzKTtcclxuICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IGZvY3VzRWxlbWVudHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvc2l0aW9uKHBvc2l0aW9uLCBvZmZzZXQsIG5vV29yZFdyYXAgPSBmYWxzZSwgdGV4dFhBbGlnbiA9ICdsZWZ0JywgdGV4dFlBbGlnbiA9ICd0b3AnKSB7XHJcbiAgICBsZXQgeCA9IHBvc2l0aW9uLng7XHJcbiAgICBsZXQgeSA9IHBvc2l0aW9uLnk7XHJcbiAgICBsZXQgd2lkdGggPSBwb3NpdGlvbi53aWR0aDtcclxuICAgIGxldCBoZWlnaHQgPSBwb3NpdGlvbi5oZWlnaHQ7XHJcbiAgICBsZXQgem9vbSA9IHNldHRpbmdzLnpvb20gPyAnL3pvb20nIDogJyc7XHJcbiAgICBsZXQgeEFsaWduID0gb2Zmc2V0LmFsaWduLmNoYXJBdCgwKTtcclxuICAgIGxldCB5QWxpZ24gPSBvZmZzZXQuYWxpZ24uY2hhckF0KDEpO1xyXG4gICAgaWYgKG5vV29yZFdyYXApIHtcclxuICAgICAgICBsZXQgeHMgPSAnJywgeXMgPSAnJztcclxuICAgICAgICBpZiAoeEFsaWduID09ICdMJykge1xyXG4gICAgICAgICAgICBpZiAodGV4dFhBbGlnbiA9PSAnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGAke3ggKyB3aWR0aCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ3JpZ2h0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYCR7eCArIHdpZHRofSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh4QWxpZ24gPT0gJ0MnKSB7XHJcbiAgICAgICAgICAgIHggPSB4IC0gb2Zmc2V0LndpZHRoIC8gMjtcclxuICAgICAgICAgICAgaWYgKHRleHRYQWxpZ24gPT0gJ2xlZnQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3gvMiArICR7eH0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4LzIgKyAke3ggKyB3aWR0aCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ3JpZ2h0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4LzIgKyAke3ggKyB3aWR0aH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdSJykge1xyXG4gICAgICAgICAgICB4ID0gb2Zmc2V0LndpZHRoIC0geDtcclxuICAgICAgICAgICAgaWYgKHRleHRYQWxpZ24gPT0gJ2xlZnQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3ggLSAke3ggKyB3aWR0aH0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4IC0gJHt4ICsgd2lkdGggLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdyaWdodCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeCAtICR7eH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHlBbGlnbiA9PSAnVCcpIHtcclxuICAgICAgICAgICAgaWYgKHRleHRZQWxpZ24gPT0gJ3RvcCcpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGAke3kgKyBoZWlnaHQgLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdib3R0b20nKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgJHt5ICsgaGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ00nKSB7XHJcbiAgICAgICAgICAgIHkgPSB5IC0gb2Zmc2V0LmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WUFsaWduID09ICd0b3AnKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kvMiArICR7eX0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5LzIgKyAke3kgKyBoZWlnaHQgLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdib3R0b20nKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kvMiArICR7eSArIGhlaWdodH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUFsaWduID09ICdCJykge1xyXG4gICAgICAgICAgICB5ID0gb2Zmc2V0LmhlaWdodCAtIHk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WUFsaWduID09ICd0b3AnKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kgLSAke3kgKyBoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeSAtICR7eSArIGhlaWdodCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2JvdHRvbScpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeSAtICR7eX0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3hzfSwgJHt5c30sIG5pbCwgbmlsYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmICh4QWxpZ24gPT0gJ0wnKVxyXG4gICAgICAgICAgICB4ID0gYCR7eH0ke3pvb219YDtcclxuICAgICAgICBlbHNlIGlmICh4QWxpZ24gPT0gJ0MnKSB7XHJcbiAgICAgICAgICAgIHggPSB4IC0gb2Zmc2V0LndpZHRoIC8gMjtcclxuICAgICAgICAgICAgeCA9IGBzeC8yICsgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh4QWxpZ24gPT0gJ1InKSB7XHJcbiAgICAgICAgICAgIHggPSBvZmZzZXQud2lkdGggLSB4O1xyXG4gICAgICAgICAgICB4ID0gYHN4IC0gJHt4fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeUFsaWduID09ICdUJylcclxuICAgICAgICAgICAgeSA9IGAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgZWxzZSBpZiAoeUFsaWduID09ICdNJykge1xyXG4gICAgICAgICAgICB5ID0geSAtIG9mZnNldC5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICB5ID0gYHN5LzIgKyAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnQicpIHtcclxuICAgICAgICAgICAgeSA9IG9mZnNldC5oZWlnaHQgLSB5O1xyXG4gICAgICAgICAgICB5ID0gYHN5IC0gJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgc2V0dGluZ3NbJyR7Y3VycmVudFZhcmlhYmxlfSddWzFdICsgJHt4fSR7em9vbX0sIHNldHRpbmdzWycke2N1cnJlbnRWYXJpYWJsZX0nXVsyXSArICR7eX0ke3pvb219LCAke3dpZHRofSR7em9vbX0sICR7aGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7eH0sICR7eX0sICR7d2lkdGh9JHt6b29tfSwgJHtoZWlnaHR9JHt6b29tfWA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRvQ29sb3IoY29sb3IpIHtcclxuICAgIHJldHVybiBgdG9jb2xvcigke01hdGguZmxvb3IoY29sb3IuY29sb3IuciAqIDI1NSl9LCAke01hdGguZmxvb3IoY29sb3IuY29sb3IuZyAqIDI1NSl9LCAke01hdGguZmxvb3IoY29sb3IuY29sb3IuYiAqIDI1NSl9LCAke01hdGguZmxvb3IoY29sb3Iub3BhY2l0eSAqIDI1NSl9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NOb2RlKGVsZW1lbnQsIG9mZnNldCwgdmFyaWFibGUpIHtcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSAnJztcclxuICAgIGxldCBwcmVWYXJpYWJsZSA9IHZhcmlhYmxlO1xyXG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PSAnRlJBTUUnICYmIGVsZW1lbnQgIT0gbWFpbkZyYW1lKSB7XHJcbiAgICAgICAgdmFyaWFibGUgPSBWYXJpYWJsZS5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgdmFyaWFibGUpO1xyXG4gICAgICAgIGN1cnJlbnRWYXJpYWJsZSA9IHZhcmlhYmxlO1xyXG4gICAgfVxyXG4gICAgLy8gY29kZSArPSBgLS0gJHtlbGVtZW50LnR5cGV9OiAke2VsZW1lbnQubmFtZX0gJHtjdXJyZW50VmFyaWFibGUgfHwgJyd9XFxuYDtcclxuICAgIGlmIChlbGVtZW50LnR5cGUgPT0gJ0dST1VQJyAmJiBlbGVtZW50Lm5hbWUuc3RhcnRzV2l0aCgnPHNpbmdsZT4nKSkge1xyXG4gICAgICAgIGxldCBuYW1lID0gJ19zaW5nbGVfJyArIGVsZW1lbnQubmFtZS5zbGljZSgnPHNpbmdsZT4nLmxlbmd0aCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBSYXcucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIG5hbWUpO1xyXG4gICAgICAgIGNvZGUgKz0gZGF0YS5jb2RlO1xyXG4gICAgICAgIG1ldGFDb2RlICs9IGRhdGEubWV0YUNvZGU7XHJcbiAgICAgICAgYWRkRm9jdXNFbGVtZW50KGVsZW1lbnQsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNNYXNrR3JvdXAoZWxlbWVudCkgfHwgZWxlbWVudC50eXBlID09ICdWRUNUT1InKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBSYXcucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgbWV0YUNvZGUgKz0gZGF0YS5tZXRhQ29kZTtcclxuICAgICAgICBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCwgZWxlbWVudC5uYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCdjaGlsZHJlbicgaW4gZWxlbWVudCkge1xyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGVsZW1lbnQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBwcm9jZXNzTm9kZShjaGlsZCwgb2Zmc2V0LCB2YXJpYWJsZSk7XHJcbiAgICAgICAgICAgIGNvZGUgKz0gZGF0YS5jb2RlO1xyXG4gICAgICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChlbGVtZW50LnR5cGUgPT0gJ1JFQ1RBTkdMRScpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IFJlY3RhbmdsZS5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCk7XHJcbiAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgbWV0YUNvZGUgKz0gZGF0YS5tZXRhQ29kZTtcclxuICAgICAgICBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCwgZWxlbWVudC5uYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PSAnVEVYVCcpIHtcclxuICAgICAgICBjb2RlICs9IFRleHQucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQpO1xyXG4gICAgfVxyXG4gICAgdmFyaWFibGUgPSBwcmVWYXJpYWJsZTtcclxuICAgIGN1cnJlbnRWYXJpYWJsZSA9IHZhcmlhYmxlO1xyXG4gICAgLy8gd3lqZWJhYyBsb2FkVGV4dHVyZXNcclxuICAgIC8vIG5pZSBla3Nwb3J0b3dhYyBraWxrYSB0YWtpY2ggc2FteWNoXHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCsgLS9nLCAnLSAnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKyAwXFwvem9vbS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8tIDBcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKyAwL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLy0gMC9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCogMVxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwvIDFcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKiAxL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcLyAxL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLyhcXGQrXFwuXFxkezN9KVxcZCsvZywgJyQxJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8gLC9nLCAnLCcpO1xyXG4gICAgcmV0dXJuIHsgY29kZSwgbWV0YUNvZGUgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmltcG9ydCAqIGFzIFRleHR1cmVzIGZyb20gJy4vdGV4dHVyZXMnO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIG5hbWUpIHtcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSAnJztcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIEVmZmVjdHNcclxuICAgIC8vIEBUT0RPXHJcbiAgICAvLyBDYWxjdWxhdGUgYWJzb2x1dGUgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHJvdGF0aW9uXHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCAncm90YXRpb24nIGluIGVsZW1lbnQgPyBlbGVtZW50LnJvdGF0aW9uIDogMCk7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBFbGVtZW50LmdldFBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgb2Zmc2V0KTtcclxuICAgIC8vIEdlbmVyYXRlIGNvZGVcclxuICAgIGNvZGUgPSBgXFx0ZHhEcmF3SW1hZ2UoJHtwb3NpdGlvbn0sICcke1RleHR1cmVzLmltYWdlUGF0aChuYW1lKX0nKVxcbmA7XHJcbiAgICBtZXRhQ29kZSA9IGBcXHQ8ZmlsZSBzcmM9XCIke1RleHR1cmVzLmltYWdlUGF0aChuYW1lKX1cIi8+XFxuYDtcclxuICAgIHJldHVybiB7IGNvZGUsIG1ldGFDb2RlIH07XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnO1xyXG5pbXBvcnQgKiBhcyBUZXh0dXJlcyBmcm9tICcuL3RleHR1cmVzJztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gJyc7XHJcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6IGVsZW1lbnQueCxcclxuICAgICAgICB5OiBlbGVtZW50LnksXHJcbiAgICAgICAgd2lkdGg6IGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmhlaWdodCxcclxuICAgIH07XHJcbiAgICAvLyBTdHJva2VzXHJcbiAgICBsZXQgb2ZmU2l6ZSA9IDA7XHJcbiAgICBpZiAoZWxlbWVudC5zdHJva2VBbGlnbiA9PSAnT1VUU0lERScpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdDRU5URVInKSB7XHJcbiAgICAgICAgb2ZmU2l6ZSA9IGVsZW1lbnQuc3Ryb2tlV2VpZ2h0IC8gMjtcclxuICAgIH1cclxuICAgIC8vIEVmZmVjdHNcclxuICAgIC8vIEBUT0RPXHJcbiAgICBlbGVtZW50UG9zaXRpb24ueCAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLnkgLT0gb2ZmU2l6ZTtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi53aWR0aCArPSBvZmZTaXplICogMjtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi5oZWlnaHQgKz0gb2ZmU2l6ZSAqIDI7XHJcbiAgICAvLyBDYWxjdWxhdGUgYWJzb2x1dGUgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHJvdGF0aW9uXHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBlbGVtZW50LnJvdGF0aW9uKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgLy8gR2VuZXJhdGUgY29kZVxyXG4gICAgY29kZSA9IGBcXHRkeERyYXdJbWFnZSgke3Bvc2l0aW9ufSwgJyR7VGV4dHVyZXMuaW1hZ2VQYXRoKGVsZW1lbnQubmFtZSl9JylcXG5gO1xyXG4gICAgbWV0YUNvZGUgPSBgXFx0PGZpbGUgc3JjPVwiJHtUZXh0dXJlcy5pbWFnZVBhdGgoZWxlbWVudC5uYW1lKX1cIi8+XFxuYDtcclxuICAgIHJldHVybiB7IGNvZGUsIG1ldGFDb2RlIH07XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzJztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gU3Ryb2tlc1xyXG4gICAgbGV0IG9mZlNpemUgPSAwO1xyXG4gICAgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ09VVFNJREUnKSB7XHJcbiAgICAgICAgb2ZmU2l6ZSA9IGVsZW1lbnQuc3Ryb2tlV2VpZ2h0O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZWxlbWVudC5zdHJva2VBbGlnbiA9PSAnQ0VOVEVSJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodCAvIDI7XHJcbiAgICB9XHJcbiAgICAvLyBFZmZlY3RzXHJcbiAgICAvLyBAVE9ET1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLnggLT0gb2ZmU2l6ZTtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi55IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ud2lkdGggKz0gb2ZmU2l6ZSAqIDI7XHJcbiAgICBlbGVtZW50UG9zaXRpb24uaGVpZ2h0ICs9IG9mZlNpemUgKiAyO1xyXG4gICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHBvc2l0aW9uIGRlcGVuZGluZyBvbiByb3RhdGlvblxyXG4gICAgbGV0IHhBbGlnbiA9IGVsZW1lbnQudGV4dEFsaWduSG9yaXpvbnRhbC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHlBbGlnbiA9IGVsZW1lbnQudGV4dEFsaWduVmVydGljYWwudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIGxldCB6b29tID0gc2V0dGluZ3Muem9vbSA/ICcvem9vbScgOiAnJztcclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIGVsZW1lbnQucm90YXRpb24pO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCwgIXNldHRpbmdzLndvcmRXcmFwLCB4QWxpZ24sIHlBbGlnbik7XHJcbiAgICBsZXQgW3gsIHksIHcsIGhdID0gcG9zaXRpb24uc3BsaXQoJywnKS5tYXAoZSA9PiBlLnRyaW0oKSk7XHJcbiAgICBpZiAoc2V0dGluZ3Mud29yZFdyYXApIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGAke3h9LCAke3l9LCAoJHt4fSkgKyAoJHt3fSksICgke3l9KSArICgke2h9KWA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGAke3h9LCAke3l9LCBuaWwsIG5pbGA7XHJcbiAgICB9XHJcbiAgICBsZXQgY29sb3IgPSBlbGVtZW50LmZpbGxzWzBdO1xyXG4gICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBlbGVtZW50LmNoYXJhY3RlcnM7XHJcbiAgICAgICAgd2hpbGUgKHRleHQuaW5jbHVkZXMoJ1xcbicpKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoJ1xcbicsICc8IW5ld2xpbmUhPicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2l6ZSA9IHBhcnNlRmxvYXQoZWxlbWVudC5mb250U2l6ZS50b0xvY2FsZVN0cmluZygpKSAvIDEuNTtcclxuICAgICAgICBsZXQgZm9udCA9IGBnZXRGaWdtYUZvbnQoJyR7ZWxlbWVudC5mb250TmFtZS5mYW1pbHl9LSR7ZWxlbWVudC5mb250TmFtZS5zdHlsZX0nLCAke3NpemV9JHt6b29tfSlgO1xyXG4gICAgICAgIGNvZGUgPSBgXFx0ZHhEcmF3VGV4dCgnJHt0ZXh0fScsICR7cG9zaXRpb259LCAke0VsZW1lbnQudG9Db2xvcihjb2xvcil9LCAxLCAke2ZvbnR9LCAnJHt4QWxpZ259JywgJyR7eUFsaWdufScke3NldHRpbmdzLndvcmRXcmFwID8gJywgZmFsc2UsIHRydWUnIDogJyd9KVxcbmA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZTtcclxufVxyXG4iLCJpbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb252ZXJ0VG9DYW1lbENhc2UgfSBmcm9tIFwiLi4vdXNlZnVsXCI7XHJcbmxldCB0ZXh0dXJlcyA9IFtdO1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRUZXh0dXJlcygpIHtcclxuICAgIHRleHR1cmVzID0gW107XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlUGF0aChpbnB1dCkge1xyXG4gICAgY29uc3QgY2xlYW5lZCA9IGlucHV0LnJlcGxhY2UoL1teYS16QS1aMC05Xy1dL2csICcnKTtcclxuICAgIC8vIGNvbnN0IHRydW5jYXRlZCA9IGNsZWFuZWQuc3Vic3RyaW5nKDAsIDE2KTtcclxuICAgIC8vIHJldHVybiBgJHtzZXR0aW5ncy5wYXRofSR7dHJ1bmNhdGVkfS5wbmdgO1xyXG4gICAgcmV0dXJuIGAke3NldHRpbmdzLnBhdGh9JHtpbnB1dH0ucG5nYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdmFyaWFibGVOYW1lKGlucHV0KSB7XHJcbiAgICBjb25zdCBjbGVhbmVkID0gaW5wdXQucmVwbGFjZSgvW15hLXpBLVowLTlfXS9nLCAnJyk7XHJcbiAgICAvLyBjb25zdCB0cnVuY2F0ZWQgPSBjbGVhbmVkLnN1YnN0cmluZygwLCAxNik7XHJcbiAgICByZXR1cm4gY2xlYW5lZC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0dXJlVmFyaWFibGUodGV4dHVyZSkge1xyXG4gICAgcmV0dXJuIGNvbnZlcnRUb0NhbWVsQ2FzZSh0ZXh0dXJlKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVGV4dHVyZSh0ZXh0dXJlKSB7XHJcbiAgICBpZiAodGV4dHVyZXMuZmluZChlID0+IGUudGV4dHVyZSA9PSB0ZXh0dXJlKSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgbGV0IHZhcmlhYmxlID0gZ2V0VGV4dHVyZVZhcmlhYmxlKHRleHR1cmUpO1xyXG4gICAgLy8gbGV0IHRlbXBWYXJpYWJsZSA9IHZhcmlhYmxlO1xyXG4gICAgLy8gbGV0IGkgPSAxO1xyXG4gICAgLy8gd2hpbGUodGV4dHVyZXMuZmluZChlID0+IGUudmFyaWFibGUgPT0gdGVtcFZhcmlhYmxlKSAhPSB1bmRlZmluZWQpIHtcclxuICAgIC8vICAgICB0ZW1wVmFyaWFibGUgPSB2YXJpYWJsZSArIChpKyspO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gdmFyaWFibGUgPSB0ZW1wVmFyaWFibGU7XHJcbiAgICB0ZXh0dXJlcy5wdXNoKHtcclxuICAgICAgICB2YXJpYWJsZTogdmFyaWFibGUsXHJcbiAgICAgICAgdGV4dHVyZTogaW1hZ2VQYXRoKHRleHR1cmUpXHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgdmFyaWFibGUpIHtcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sICdyb3RhdGlvbicgaW4gZWxlbWVudCA/IGVsZW1lbnQucm90YXRpb24gOiAwKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgdmFyaWFibGUgPSBlbGVtZW50Lm5hbWU7XHJcbiAgICBFbGVtZW50LmRlZmluZVZhcmlhYmxlUG9zaXRpb24oZWxlbWVudC5uYW1lLCBwb3NpdGlvbik7XHJcbiAgICAvLyBHZW5lcmF0ZSBjb2RlXHJcbiAgICByZXR1cm4gdmFyaWFibGU7XHJcbn1cclxuIiwiO1xyXG5sZXQgbGFuZ3VhZ2UgPSAnRU4nO1xyXG5jb25zdCBsYW5ndWFnZXMgPSB7XHJcbiAgICAnUEwnOiB7XHJcbiAgICAgICAgJ25vLXNlbGVjdGlvbic6ICdOaWUgd3licmFubyDFvGFkbmVnbyBlbGVtZW50dScsXHJcbiAgICAgICAgJ21vcmUtdGhhbi1vbmUnOiAnWmF6bmFjem9ubyB3acSZY2VqIG5pxbwgamVkZW4gZWxlbWVudCcsXHJcbiAgICAgICAgJ25vLWZyYW1lJzogJ1phem5hY3pvbnkgZWxlbWVudCB0byBuaWUgZnJhbWUnLFxyXG4gICAgfSxcclxuICAgICdFTic6IHtcclxuICAgICAgICAnbm8tc2VsZWN0aW9uJzogJ1RoZXJlXFwncyBub3RoaW5nIHNlbGVjdGVkJyxcclxuICAgICAgICAnbW9yZS10aGFuLW9uZSc6ICdUaGVyZVxcJ3MgbW9yZSB0aGFuIG9uZSBlbGVtZW50IHNlbGVjdGVkJyxcclxuICAgICAgICAnbm8tZnJhbWUnOiAnU2VsZWN0ZWQgZWxlbWVudCBpc25cXCd0IGZyYW1lJ1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGlvbihrZXkpIHtcclxuICAgIHJldHVybiBsYW5ndWFnZXNbbGFuZ3VhZ2VdICYmIGxhbmd1YWdlc1tsYW5ndWFnZV1ba2V5XSB8fCBrZXk7XHJcbn1cclxuIiwiY29uc3QgbWV0YVRlbXBsYXRlID0gYDxtZXRhPlxyXG4gICAgPHNjcmlwdCBzcmM9J3VzZWZ1bC5sdWEnIHR5cGU9J2NsaWVudCcgY2FjaGU9J2ZhbHNlJy8+XHJcbiAgICA8c2NyaXB0IHNyYz0nY2xpZW50Lmx1YScgdHlwZT0nY2xpZW50JyBjYWNoZT0nZmFsc2UnLz5cclxuXHJcbjxGSUxFX1NPVVJDRVM+XHJcbjwvbWV0YT5gO1xyXG5jb25zdCBjb2RlVGVtcGxhdGUgPSBgXHJcbjxWQVJJQUJMRVM+XHJcblxyXG5mdW5jdGlvbiByZW5kZXJVSSgpXHJcbjxDT0RFPlxyXG5lbmRcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVVJKHZpc2libGUpXHJcbiAgICBsb2NhbCBldmVudENhbGxiYWNrID0gdmlzaWJsZSBhbmQgYWRkRXZlbnRIYW5kbGVyIG9yIHJlbW92ZUV2ZW50SGFuZGxlclxyXG5cclxuICAgIGV2ZW50Q2FsbGJhY2soJ29uQ2xpZW50UmVuZGVyJywgcm9vdCwgcmVuZGVyVUkpXHJcbmVuZFxyXG5cclxudG9nZ2xlVUkodHJ1ZSlgO1xyXG5jb25zdCB1c2VmdWxDb2RlID0gYHN4LCBzeSA9IGd1aUdldFNjcmVlblNpemUoKVxyXG56b29tID0gKHN4IDwgMjA0OCkgYW5kIG1hdGgubWluKDIuMiwgMjA0OC9zeCkgb3IgMVxyXG5mb250cyA9IHtcclxuICAgIGZpZ21hRm9udHMgPSB7fSxcclxufVxyXG5cclxuZnVuY3Rpb24gdW5sb2FkRm9udHMoKVxyXG4gICAgZm9yIGssdiBpbiBwYWlycyhmb250cykgZG9cclxuICAgICAgICBpZiB2IGFuZCBpc0VsZW1lbnQodikgdGhlbiBkZXN0cm95RWxlbWVudCh2KSBlbmRcclxuICAgIGVuZFxyXG4gICAgZm9udHMgPSB7XHJcbiAgICAgICAgZmlnbWFGb250cyA9IHt9LFxyXG4gICAgfVxyXG5lbmRcclxuXHJcbmZ1bmN0aW9uIGxvYWRGb250cyhhcnJheSlcclxuICAgIHVubG9hZEZvbnRzKClcclxuICAgIGZvciBfLHYgaW4gcGFpcnMoYXJyYXkpIGRvXHJcbiAgICAgICAgZm9udHNbdlsxXV0gPSBkeENyZWF0ZUZvbnQodlsyXSwgdlszXSwgdls0XSwgJ3Byb29mJylcclxuICAgIGVuZFxyXG5lbmRcclxuXHJcbmZ1bmN0aW9uIGdldEZpZ21hRm9udChmb250LCBzaXplKVxyXG4gICAgbG9jYWwgZmlnbWFGb250cyA9IGZvbnRzLmZpZ21hRm9udHNcclxuICAgIGlmIG5vdCBmaWdtYUZvbnRzW2ZvbnQuLnNpemVdIHRoZW5cclxuICAgICAgICBmaWdtYUZvbnRzW2ZvbnQuLnNpemVdID0gZXhwb3J0c1snZmlnbWEnXTpnZXRGb250KGZvbnQsIHNpemUpXHJcbiAgICBlbmRcclxuXHJcbiAgICByZXR1cm4gZmlnbWFGb250c1tmb250Li5zaXplXVxyXG5lbmRgO1xyXG5leHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XHJcbiAgICB6b29tOiB0cnVlLFxyXG4gICAgcGF0aDogJ2RhdGEvJyxcclxuICAgIG1ldGFUZW1wbGF0ZTogbWV0YVRlbXBsYXRlLFxyXG4gICAgY29kZVRlbXBsYXRlOiBjb2RlVGVtcGxhdGUsXHJcbiAgICB1c2VmdWxDb2RlOiB1c2VmdWxDb2RlLFxyXG4gICAgd29yZFdyYXA6IGZhbHNlLFxyXG59O1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gY29udmVydFRvQ2FtZWxDYXNlKHN0cikge1xyXG4gICAgLy8gUmVtb3ZlIGFsbCBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIHJlcGxhY2Ugc3BhY2VzIHdpdGggdW5kZXJzY29yZXNcclxuICAgIGNvbnN0IGNsZWFuZWQgPSBzdHIucmVwbGFjZSgvW15hLXpBLVowLTlfXS9nLCBcIlwiKS5yZXBsYWNlKC9cXHMrL2csIFwiX1wiKTtcclxuICAgIC8vIFNwbGl0IHRoZSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB3b3Jkc1xyXG4gICAgY29uc3Qgd29yZHMgPSBjbGVhbmVkLnNwbGl0KFwiX1wiKTtcclxuICAgIC8vIENhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIHdvcmQgKGV4Y2VwdCB0aGUgZmlyc3Qgd29yZClcclxuICAgIGNvbnN0IGNhcGl0YWxpemVkID0gd29yZHNcclxuICAgICAgICAubWFwKCh3b3JkLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKTtcclxuICAgIHJldHVybiBjYXBpdGFsaXplZC5jaGFyQXQoMCkudG9Mb2NhbGVMb3dlckNhc2UoKSArIGNhcGl0YWxpemVkLnNsaWNlKDEpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uKHgsIHksIGRpc3RhbmNlLCBhbmdsZSkge1xyXG4gICAgLy8gQ29udmVydCBhbmdsZSBmcm9tIGRlZ3JlZXMgdG8gcmFkaWFuc1xyXG4gICAgY29uc3QgcmFkaWFucyA9IGFuZ2xlICogKE1hdGguUEkgLyAxODApO1xyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBuZXcgeCBhbmQgeSBjb29yZGluYXRlc1xyXG4gICAgY29uc3QgbmV3WCA9IHggKyBkaXN0YW5jZSAqIE1hdGguY29zKHJhZGlhbnMpO1xyXG4gICAgY29uc3QgbmV3WSA9IHkgKyBkaXN0YW5jZSAqIE1hdGguc2luKHJhZGlhbnMpO1xyXG4gICAgcmV0dXJuIHsgeDogbmV3WCwgeTogbmV3WSB9O1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHRyYW5zbGF0aW9uIGZyb20gXCIuL2xhbmd1YWdlXCI7XHJcbmltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50cy9lbGVtZW50JztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcclxuICAgIHRpdGxlOiAnTVRBIEV4cG9ydGVyIDIuMCBieSBAYm9yc3VjenluYScsXHJcbiAgICB3aWR0aDogMzAwLFxyXG4gICAgaGVpZ2h0OiA0NTAsXHJcbiAgICB2aXNpYmxlOiB0cnVlXHJcbn0pO1xyXG5mdW5jdGlvbiBleHBvcnRGcmFtZShmcmFtZSwgYWxpZ24pIHtcclxuICAgIGxldCBvZmZzZXQgPSB7XHJcbiAgICAgICAgeDogZnJhbWUueCxcclxuICAgICAgICB5OiBmcmFtZS55LFxyXG4gICAgICAgIHdpZHRoOiBmcmFtZS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGZyYW1lLmhlaWdodCxcclxuICAgICAgICBhbGlnbjogYWxpZ25cclxuICAgIH07XHJcbiAgICBsZXQgZGF0YSA9IEVsZW1lbnQucHJvY2Vzc05vZGUoZnJhbWUsIG9mZnNldCwgdW5kZWZpbmVkKTtcclxuICAgIGxldCBjb2RlID0gZGF0YS5jb2RlO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gZGF0YS5tZXRhQ29kZTtcclxuICAgIC8vIHJlbW92ZSBsYXN0IG5ldyBsaW5lIGZyb20gY29kZSBhbmQgbWV0YUNvZGVcclxuICAgIGNvZGUgPSBjb2RlLnNsaWNlKDAsIC0xKTtcclxuICAgIG1ldGFDb2RlID0gbWV0YUNvZGUuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29kZSA9IHNldHRpbmdzLmNvZGVUZW1wbGF0ZS5yZXBsYWNlKCc8Q09ERT4nLCBjb2RlKS5yZXBsYWNlKCc8VkFSSUFCTEVTPicsIEVsZW1lbnQuZ2V0VmFyaWFibGVzKCkpO1xyXG4gICAgbWV0YUNvZGUgPSBzZXR0aW5ncy5tZXRhVGVtcGxhdGUucmVwbGFjZSgnPEZJTEVfU09VUkNFUz4nLCBtZXRhQ29kZSk7XHJcbiAgICBjb2RlID0gY29kZS50cmltKCk7XHJcbiAgICBmaWdtYS5zaG93VUkoYDxzY3JpcHQ+XHJcbiAgICBmdW5jdGlvbiBvcGVuVVJMKHVybCwgYXJndW1lbnRzKSB7XHJcbiAgICAgICAgdmFyIGFyZ3VtZW50c1N0cmluZyA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKTtcclxuICAgICAgICB2YXIgZmluYWxVcmwgPSB1cmwgKyBcIj9hcmd1bWVudHM9XCIgKyBhcmd1bWVudHNTdHJpbmc7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oZmluYWxVcmwsIFwiX2JsYW5rXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5VUkwoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8nLCB7XHJcbiAgICAgICAgZmlsZXM6IHtcclxuICAgICAgICAgICAgJ21ldGEueG1sJzoge1xyXG4gICAgICAgICAgICAgICAgY29kZTogXFxgJHttZXRhQ29kZX1cXGAsXHJcbiAgICAgICAgICAgICAgICBsYW5nOiAneG1sJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2NsaWVudC5sdWEnOiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcXGAke2NvZGV9XFxgLFxyXG4gICAgICAgICAgICAgICAgbGFuZzogJ2x1YScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICd1c2VmdWwubHVhJzoge1xyXG4gICAgICAgICAgICAgICAgY29kZTogXFxgJHtzZXR0aW5ncy51c2VmdWxDb2RlfVxcYCxcclxuICAgICAgICAgICAgICAgIGxhbmc6ICdsdWEnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgPC9zY3JpcHQ+YCwge1xyXG4gICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywge1xyXG4gICAgICAgICAgICB0aXRsZTogJ01UQSBFeHBvcnRlciBieSBib3JzdWsnLFxyXG4gICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgMTAwMCk7XHJcbn1cclxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2V4cG9ydC1hcy1jb2RlJykge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25zID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gZmlnbWEubm90aWZ5KHRyYW5zbGF0aW9uKCduby1zZWxlY3Rpb24nKSwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9ucy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICByZXR1cm4gZmlnbWEubm90aWZ5KHRyYW5zbGF0aW9uKCdtb3JlLXRoYW4tb25lJyksIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHNlbGVjdGlvbnNbMF07XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi50eXBlICE9ICdGUkFNRScpXHJcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ25vLWZyYW1lJyksIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldFZhcmlhYmxlcygpO1xyXG4gICAgICAgIEVsZW1lbnQucmVzZXRGb2N1c0VsZW1lbnRzKCk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldEN1cnJlbnRWYXJpYWJsZSgpO1xyXG4gICAgICAgIEVsZW1lbnQuc2V0TWFpbkZyYW1lKHNlbGVjdGlvbik7XHJcbiAgICAgICAgc2V0dGluZ3Muem9vbSA9IG1zZy51c2Vab29tO1xyXG4gICAgICAgIHNldHRpbmdzLndvcmRXcmFwID0gbXNnLndvcmRXcmFwO1xyXG4gICAgICAgIGV4cG9ydEZyYW1lKHNlbGVjdGlvbiwgbXNnLmFsaWduKTtcclxuICAgICAgICBFbGVtZW50LmZvY3VzT25FbGVtZW50cyhzZWxlY3Rpb24pO1xyXG4gICAgfVxyXG59O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=