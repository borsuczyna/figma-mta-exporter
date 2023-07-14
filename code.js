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
        'export-success': 'Eksport zakończony sukcesem',
        'export-failed': 'Eksport zakończony niepowodzeniem',
        'code-ready': 'Kod jest gotowy w konsoli',
    },
    'EN': {
        'no-selection': 'There\'s nothing selected',
        'more-than-one': 'There\'s more than one element selected',
        'no-frame': 'Selected element isn\'t frame',
        'export-success': 'Export finished successfully',
        'export-failed': 'Export finished with error',
        'code-ready': 'Code is ready in console',
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



let cnsl = console;
let clog = console.log;
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
    clog(code);
    figma.notify((0,_language__WEBPACK_IMPORTED_MODULE_0__["default"])('code-ready'), { timeout: 3000 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ1M7QUFDUjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwwREFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0VBQTZCLHdDQUF3QywyREFBb0I7QUFDcEcsZUFBZSxvRUFBNkI7QUFDNUM7QUFDQTtBQUNBLGlCQUFpQixxREFBVyxrQkFBa0IsZUFBZTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscURBQVcsb0JBQW9CLGFBQWE7QUFDNUU7QUFDQSxnQ0FBZ0MscURBQVcscUJBQXFCLGFBQWE7QUFDN0U7QUFDQTtBQUNBLGdDQUFnQyxxREFBVyxnQkFBZ0IsYUFBYTtBQUN4RSxRQUFRLDZEQUFzQjtBQUM5QixRQUFRLGlFQUEwQjtBQUNsQyxRQUFRLG1FQUE0QjtBQUNwQyxRQUFRLDJEQUFvQjtBQUM1QixRQUFRLG9EQUFhO0FBQ3JCLFFBQVEsd0RBQWlCO0FBQ3pCO0FBQ0EsUUFBUSw4REFBdUI7QUFDL0I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy9lbGVtZW50LnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy9yYXcudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdGV4dC50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdGV4dHVyZXMudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3ZhcmlhYmxlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9sYW5ndWFnZS50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL3VzZWZ1bC50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uIH0gZnJvbSBcIi4uL3VzZWZ1bFwiO1xyXG5pbXBvcnQgKiBhcyBSZWN0YW5nbGUgZnJvbSAnLi9yZWN0YW5nbGUnO1xyXG5pbXBvcnQgKiBhcyBSYXcgZnJvbSAnLi9yYXcnO1xyXG5pbXBvcnQgKiBhcyBWYXJpYWJsZSBmcm9tICcuL3ZhcmlhYmxlJztcclxuaW1wb3J0ICogYXMgVGV4dCBmcm9tICcuL3RleHQnO1xyXG5sZXQgZm9jdXNFbGVtZW50cyA9IFtdO1xyXG5sZXQgZm9jdXNFbGVtZW50c05hbWVzID0gW107XHJcbmxldCB2YXJpYWJsZXMgPSB7fTtcclxubGV0IG1haW5GcmFtZTtcclxubGV0IGN1cnJlbnRWYXJpYWJsZSA9IHVuZGVmaW5lZDtcclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q3VycmVudFZhcmlhYmxlKCkge1xyXG4gICAgY3VycmVudFZhcmlhYmxlID0gdW5kZWZpbmVkO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNYWluRnJhbWUoZnJhbWUpIHtcclxuICAgIG1haW5GcmFtZSA9IGZyYW1lO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEZvY3VzRWxlbWVudHMoKSB7XHJcbiAgICBmb2N1c0VsZW1lbnRzID0gW107XHJcbiAgICBmb2N1c0VsZW1lbnRzTmFtZXMgPSBbXTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVmFyaWFibGVQb3NpdGlvbihuYW1lLCBwb3NpdGlvbikge1xyXG4gICAgdmFyaWFibGVzW25hbWVdID0gcG9zaXRpb247XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlcygpIHtcclxuICAgIGxldCBsZW5ndGggPSAwO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiB2YXJpYWJsZXMpXHJcbiAgICAgICAgbGVuZ3RoKys7XHJcbiAgICBpZiAobGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgbGV0IGNvZGUgPSAnbG9jYWwgc2V0dGluZ3MgPSB7XFxuJztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gdmFyaWFibGVzKSB7XHJcbiAgICAgICAgY29kZSArPSBgXFx0Wycke25hbWV9J10gPSB7JHt2YXJpYWJsZXNbbmFtZV19fVxcbmA7XHJcbiAgICB9XHJcbiAgICBjb2RlICs9ICd9JztcclxuICAgIHJldHVybiBjb2RlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldFZhcmlhYmxlcygpIHtcclxuICAgIHZhcmlhYmxlcyA9IHt9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc01hc2tHcm91cChub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIpIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoJ2lzTWFzaycgaW4gY2hpbGQgJiYgY2hpbGQuaXNNYXNrKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBYnNvbHV0ZVBvc2l0aW9uKHBvc2l0aW9uLCBhbmdsZSkge1xyXG4gICAgbGV0IGx0ID0geyB4OiBwb3NpdGlvbi54LCB5OiBwb3NpdGlvbi55IH07XHJcbiAgICBsZXQgcnQgPSBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLndpZHRoLCBhbmdsZSk7XHJcbiAgICBsZXQgbGIgPSBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLmhlaWdodCwgYW5nbGUgKyA5MCk7XHJcbiAgICBsZXQgcmIgPSBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uKHJ0LngsIHJ0LnksIHBvc2l0aW9uLmhlaWdodCwgYW5nbGUgKyA5MCk7XHJcbiAgICBsZXQgeCA9IE1hdGgubWluKGx0LngsIHJ0LngsIGxiLngsIHJiLngpO1xyXG4gICAgbGV0IHkgPSBNYXRoLm1pbihsdC55LCBydC55LCBsYi55LCByYi55KTtcclxuICAgIGxldCB0eCA9IE1hdGgubWF4KGx0LngsIHJ0LngsIGxiLngsIHJiLngpO1xyXG4gICAgbGV0IHR5ID0gTWF0aC5tYXgobHQueSwgcnQueSwgbGIueSwgcmIueSk7XHJcbiAgICBsZXQgd2lkdGggPSB0eCAtIHg7XHJcbiAgICBsZXQgaGVpZ2h0ID0gdHkgLSB5O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGFkZEZvY3VzRWxlbWVudChlbGVtZW50LCBuYW1lKSB7XHJcbiAgICBpZiAoZm9jdXNFbGVtZW50c05hbWVzLmluZGV4T2YobmFtZSkgIT0gLTEpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgZm9jdXNFbGVtZW50c05hbWVzLnB1c2gobmFtZSk7XHJcbiAgICBmb2N1c0VsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvY3VzT25FbGVtZW50cyhmcmFtZSkge1xyXG4gICAgLy8gZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFtmcmFtZV0gfHwgZm9jdXNFbGVtZW50cyk7XHJcbiAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBmb2N1c0VsZW1lbnRzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3NpdGlvbihwb3NpdGlvbiwgb2Zmc2V0LCBub1dvcmRXcmFwID0gZmFsc2UsIHRleHRYQWxpZ24gPSAnbGVmdCcsIHRleHRZQWxpZ24gPSAndG9wJykge1xyXG4gICAgbGV0IHggPSBwb3NpdGlvbi54O1xyXG4gICAgbGV0IHkgPSBwb3NpdGlvbi55O1xyXG4gICAgbGV0IHdpZHRoID0gcG9zaXRpb24ud2lkdGg7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcG9zaXRpb24uaGVpZ2h0O1xyXG4gICAgbGV0IHpvb20gPSBzZXR0aW5ncy56b29tID8gJy96b29tJyA6ICcnO1xyXG4gICAgbGV0IHhBbGlnbiA9IG9mZnNldC5hbGlnbi5jaGFyQXQoMCk7XHJcbiAgICBsZXQgeUFsaWduID0gb2Zmc2V0LmFsaWduLmNoYXJBdCgxKTtcclxuICAgIGlmIChub1dvcmRXcmFwKSB7XHJcbiAgICAgICAgbGV0IHhzID0gJycsIHlzID0gJyc7XHJcbiAgICAgICAgaWYgKHhBbGlnbiA9PSAnTCcpIHtcclxuICAgICAgICAgICAgaWYgKHRleHRYQWxpZ24gPT0gJ2xlZnQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgJHt4ICsgd2lkdGggLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdyaWdodCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGAke3ggKyB3aWR0aH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdDJykge1xyXG4gICAgICAgICAgICB4ID0geCAtIG9mZnNldC53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WEFsaWduID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4LzIgKyAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeC8yICsgJHt4ICsgd2lkdGggLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdyaWdodCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeC8yICsgJHt4ICsgd2lkdGh9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnUicpIHtcclxuICAgICAgICAgICAgeCA9IG9mZnNldC53aWR0aCAtIHg7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WEFsaWduID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4IC0gJHt4ICsgd2lkdGh9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeCAtICR7eCArIHdpZHRoIC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAncmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3ggLSAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5QWxpZ24gPT0gJ1QnKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WUFsaWduID09ICd0b3AnKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgJHt5ICsgaGVpZ2h0IC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnYm90dG9tJylcclxuICAgICAgICAgICAgICAgIHlzID0gYCR7eSArIGhlaWdodH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUFsaWduID09ICdNJykge1xyXG4gICAgICAgICAgICB5ID0geSAtIG9mZnNldC5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBpZiAodGV4dFlBbGlnbiA9PSAndG9wJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5LzIgKyAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeS8yICsgJHt5ICsgaGVpZ2h0IC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnYm90dG9tJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5LzIgKyAke3kgKyBoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnQicpIHtcclxuICAgICAgICAgICAgeSA9IG9mZnNldC5oZWlnaHQgLSB5O1xyXG4gICAgICAgICAgICBpZiAodGV4dFlBbGlnbiA9PSAndG9wJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5IC0gJHt5ICsgaGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kgLSAke3kgKyBoZWlnaHQgLyAyfSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdib3R0b20nKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kgLSAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHt4c30sICR7eXN9LCBuaWwsIG5pbGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoeEFsaWduID09ICdMJylcclxuICAgICAgICAgICAgeCA9IGAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdDJykge1xyXG4gICAgICAgICAgICB4ID0geCAtIG9mZnNldC53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHggPSBgc3gvMiArICR7eH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeEFsaWduID09ICdSJykge1xyXG4gICAgICAgICAgICB4ID0gb2Zmc2V0LndpZHRoIC0geDtcclxuICAgICAgICAgICAgeCA9IGBzeCAtICR7eH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHlBbGlnbiA9PSAnVCcpXHJcbiAgICAgICAgICAgIHkgPSBgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnTScpIHtcclxuICAgICAgICAgICAgeSA9IHkgLSBvZmZzZXQuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgeSA9IGBzeS8yICsgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ0InKSB7XHJcbiAgICAgICAgICAgIHkgPSBvZmZzZXQuaGVpZ2h0IC0geTtcclxuICAgICAgICAgICAgeSA9IGBzeSAtICR7eX0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRWYXJpYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYHNldHRpbmdzWycke2N1cnJlbnRWYXJpYWJsZX0nXVsxXSArICR7eH0ke3pvb219LCBzZXR0aW5nc1snJHtjdXJyZW50VmFyaWFibGV9J11bMl0gKyAke3l9JHt6b29tfSwgJHt3aWR0aH0ke3pvb219LCAke2hlaWdodH0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3h9LCAke3l9LCAke3dpZHRofSR7em9vbX0sICR7aGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0b0NvbG9yKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gYHRvY29sb3IoJHtNYXRoLmZsb29yKGNvbG9yLmNvbG9yLnIgKiAyNTUpfSwgJHtNYXRoLmZsb29yKGNvbG9yLmNvbG9yLmcgKiAyNTUpfSwgJHtNYXRoLmZsb29yKGNvbG9yLmNvbG9yLmIgKiAyNTUpfSwgJHtNYXRoLmZsb29yKGNvbG9yLm9wYWNpdHkgKiAyNTUpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzTm9kZShlbGVtZW50LCBvZmZzZXQsIHZhcmlhYmxlKSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gJyc7XHJcbiAgICBsZXQgcHJlVmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIGlmIChlbGVtZW50LnR5cGUgPT0gJ0ZSQU1FJyAmJiBlbGVtZW50ICE9IG1haW5GcmFtZSkge1xyXG4gICAgICAgIHZhcmlhYmxlID0gVmFyaWFibGUucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIHZhcmlhYmxlKTtcclxuICAgICAgICBjdXJyZW50VmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIH1cclxuICAgIC8vIGNvZGUgKz0gYC0tICR7ZWxlbWVudC50eXBlfTogJHtlbGVtZW50Lm5hbWV9ICR7Y3VycmVudFZhcmlhYmxlIHx8ICcnfVxcbmA7XHJcbiAgICBpZiAoZWxlbWVudC50eXBlID09ICdHUk9VUCcgJiYgZWxlbWVudC5uYW1lLnN0YXJ0c1dpdGgoJzxzaW5nbGU+JykpIHtcclxuICAgICAgICBsZXQgbmFtZSA9ICdfc2luZ2xlXycgKyBlbGVtZW50Lm5hbWUuc2xpY2UoJzxzaW5nbGU+Jy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBkYXRhID0gUmF3LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCBuYW1lKTtcclxuICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIGFkZEZvY3VzRWxlbWVudChlbGVtZW50LCBuYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzTWFza0dyb3VwKGVsZW1lbnQpIHx8IGVsZW1lbnQudHlwZSA9PSAnVkVDVE9SJykge1xyXG4gICAgICAgIGxldCBkYXRhID0gUmF3LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCBlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIGNvZGUgKz0gZGF0YS5jb2RlO1xyXG4gICAgICAgIG1ldGFDb2RlICs9IGRhdGEubWV0YUNvZGU7XHJcbiAgICAgICAgYWRkRm9jdXNFbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgnY2hpbGRyZW4nIGluIGVsZW1lbnQpIHtcclxuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBlbGVtZW50LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcHJvY2Vzc05vZGUoY2hpbGQsIG9mZnNldCwgdmFyaWFibGUpO1xyXG4gICAgICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICAgICAgbWV0YUNvZGUgKz0gZGF0YS5tZXRhQ29kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZWxlbWVudC50eXBlID09ICdSRUNUQU5HTEUnKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBSZWN0YW5nbGUucHJvY2VzcyhlbGVtZW50LCBvZmZzZXQpO1xyXG4gICAgICAgIGNvZGUgKz0gZGF0YS5jb2RlO1xyXG4gICAgICAgIG1ldGFDb2RlICs9IGRhdGEubWV0YUNvZGU7XHJcbiAgICAgICAgYWRkRm9jdXNFbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgY29kZSArPSBUZXh0LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KTtcclxuICAgIH1cclxuICAgIHZhcmlhYmxlID0gcHJlVmFyaWFibGU7XHJcbiAgICBjdXJyZW50VmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIC8vIHd5amViYWMgbG9hZFRleHR1cmVzXHJcbiAgICAvLyBuaWUgZWtzcG9ydG93YWMga2lsa2EgdGFraWNoIHNhbXljaFxyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwrIC0vZywgJy0gJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCsgMFxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvLSAwXFwvem9vbS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCsgMC9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8tIDAvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwqIDFcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcLyAxXFwvem9vbS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXCogMS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXC8gMS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8oXFxkK1xcLlxcZHszfSlcXGQrL2csICckMScpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvICwvZywgJywnKTtcclxuICAgIHJldHVybiB7IGNvZGUsIG1ldGFDb2RlIH07XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnO1xyXG5pbXBvcnQgKiBhcyBUZXh0dXJlcyBmcm9tICcuL3RleHR1cmVzJztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCBuYW1lKSB7XHJcbiAgICBsZXQgY29kZSA9ICcnO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gJyc7XHJcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6IGVsZW1lbnQueCxcclxuICAgICAgICB5OiBlbGVtZW50LnksXHJcbiAgICAgICAgd2lkdGg6IGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmhlaWdodCxcclxuICAgIH07XHJcbiAgICAvLyBFZmZlY3RzXHJcbiAgICAvLyBAVE9ET1xyXG4gICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHBvc2l0aW9uIGRlcGVuZGluZyBvbiByb3RhdGlvblxyXG4gICAgZWxlbWVudFBvc2l0aW9uID0gRWxlbWVudC5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgJ3JvdGF0aW9uJyBpbiBlbGVtZW50ID8gZWxlbWVudC5yb3RhdGlvbiA6IDApO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCk7XHJcbiAgICAvLyBHZW5lcmF0ZSBjb2RlXHJcbiAgICBjb2RlID0gYFxcdGR4RHJhd0ltYWdlKCR7cG9zaXRpb259LCAnJHtUZXh0dXJlcy5pbWFnZVBhdGgobmFtZSl9JylcXG5gO1xyXG4gICAgbWV0YUNvZGUgPSBgXFx0PGZpbGUgc3JjPVwiJHtUZXh0dXJlcy5pbWFnZVBhdGgobmFtZSl9XCIvPlxcbmA7XHJcbiAgICByZXR1cm4geyBjb2RlLCBtZXRhQ29kZSB9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuaW1wb3J0ICogYXMgVGV4dHVyZXMgZnJvbSAnLi90ZXh0dXJlcyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBtZXRhQ29kZSA9ICcnO1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gU3Ryb2tlc1xyXG4gICAgbGV0IG9mZlNpemUgPSAwO1xyXG4gICAgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ09VVFNJREUnKSB7XHJcbiAgICAgICAgb2ZmU2l6ZSA9IGVsZW1lbnQuc3Ryb2tlV2VpZ2h0O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZWxlbWVudC5zdHJva2VBbGlnbiA9PSAnQ0VOVEVSJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodCAvIDI7XHJcbiAgICB9XHJcbiAgICAvLyBFZmZlY3RzXHJcbiAgICAvLyBAVE9ET1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLnggLT0gb2ZmU2l6ZTtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi55IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ud2lkdGggKz0gb2ZmU2l6ZSAqIDI7XHJcbiAgICBlbGVtZW50UG9zaXRpb24uaGVpZ2h0ICs9IG9mZlNpemUgKiAyO1xyXG4gICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHBvc2l0aW9uIGRlcGVuZGluZyBvbiByb3RhdGlvblxyXG4gICAgZWxlbWVudFBvc2l0aW9uID0gRWxlbWVudC5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgZWxlbWVudC5yb3RhdGlvbik7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBFbGVtZW50LmdldFBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgb2Zmc2V0KTtcclxuICAgIC8vIEdlbmVyYXRlIGNvZGVcclxuICAgIGNvZGUgPSBgXFx0ZHhEcmF3SW1hZ2UoJHtwb3NpdGlvbn0sICcke1RleHR1cmVzLmltYWdlUGF0aChlbGVtZW50Lm5hbWUpfScpXFxuYDtcclxuICAgIG1ldGFDb2RlID0gYFxcdDxmaWxlIHNyYz1cIiR7VGV4dHVyZXMuaW1hZ2VQYXRoKGVsZW1lbnQubmFtZSl9XCIvPlxcbmA7XHJcbiAgICByZXR1cm4geyBjb2RlLCBtZXRhQ29kZSB9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIFN0cm9rZXNcclxuICAgIGxldCBvZmZTaXplID0gMDtcclxuICAgIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdPVVRTSURFJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ0NFTlRFUicpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQgLyAyO1xyXG4gICAgfVxyXG4gICAgLy8gRWZmZWN0c1xyXG4gICAgLy8gQFRPRE9cclxuICAgIGVsZW1lbnRQb3NpdGlvbi54IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ueSAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLndpZHRoICs9IG9mZlNpemUgKiAyO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLmhlaWdodCArPSBvZmZTaXplICogMjtcclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGxldCB4QWxpZ24gPSBlbGVtZW50LnRleHRBbGlnbkhvcml6b250YWwudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIGxldCB5QWxpZ24gPSBlbGVtZW50LnRleHRBbGlnblZlcnRpY2FsLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgem9vbSA9IHNldHRpbmdzLnpvb20gPyAnL3pvb20nIDogJyc7XHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBlbGVtZW50LnJvdGF0aW9uKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQsICFzZXR0aW5ncy53b3JkV3JhcCwgeEFsaWduLCB5QWxpZ24pO1xyXG4gICAgbGV0IFt4LCB5LCB3LCBoXSA9IHBvc2l0aW9uLnNwbGl0KCcsJykubWFwKGUgPT4gZS50cmltKCkpO1xyXG4gICAgaWYgKHNldHRpbmdzLndvcmRXcmFwKSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBgJHt4fSwgJHt5fSwgKCR7eH0pICsgKCR7d30pLCAoJHt5fSkgKyAoJHtofSlgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBgJHt4fSwgJHt5fSwgbmlsLCBuaWxgO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvbG9yID0gZWxlbWVudC5maWxsc1swXTtcclxuICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gZWxlbWVudC5jaGFyYWN0ZXJzO1xyXG4gICAgICAgIHdoaWxlICh0ZXh0LmluY2x1ZGVzKCdcXG4nKSkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKCdcXG4nLCAnPCFuZXdsaW5lIT4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNpemUgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZm9udFNpemUudG9Mb2NhbGVTdHJpbmcoKSkgLyAxLjU7XHJcbiAgICAgICAgbGV0IGZvbnQgPSBgZ2V0RmlnbWFGb250KCcke2VsZW1lbnQuZm9udE5hbWUuZmFtaWx5fS0ke2VsZW1lbnQuZm9udE5hbWUuc3R5bGV9JywgJHtzaXplfSR7em9vbX0pYDtcclxuICAgICAgICBjb2RlID0gYFxcdGR4RHJhd1RleHQoJyR7dGV4dH0nLCAke3Bvc2l0aW9ufSwgJHtFbGVtZW50LnRvQ29sb3IoY29sb3IpfSwgMSwgJHtmb250fSwgJyR7eEFsaWdufScsICcke3lBbGlnbn0nJHtzZXR0aW5ncy53b3JkV3JhcCA/ICcsIGZhbHNlLCB0cnVlJyA6ICcnfSlcXG5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn1cclxuIiwiaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgY29udmVydFRvQ2FtZWxDYXNlIH0gZnJvbSBcIi4uL3VzZWZ1bFwiO1xyXG5sZXQgdGV4dHVyZXMgPSBbXTtcclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VGV4dHVyZXMoKSB7XHJcbiAgICB0ZXh0dXJlcyA9IFtdO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbWFnZVBhdGgoaW5wdXQpIHtcclxuICAgIGNvbnN0IGNsZWFuZWQgPSBpbnB1dC5yZXBsYWNlKC9bXmEtekEtWjAtOV8tXS9nLCAnJyk7XHJcbiAgICAvLyBjb25zdCB0cnVuY2F0ZWQgPSBjbGVhbmVkLnN1YnN0cmluZygwLCAxNik7XHJcbiAgICAvLyByZXR1cm4gYCR7c2V0dGluZ3MucGF0aH0ke3RydW5jYXRlZH0ucG5nYDtcclxuICAgIHJldHVybiBgJHtzZXR0aW5ncy5wYXRofSR7aW5wdXR9LnBuZ2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhYmxlTmFtZShpbnB1dCkge1xyXG4gICAgY29uc3QgY2xlYW5lZCA9IGlucHV0LnJlcGxhY2UoL1teYS16QS1aMC05X10vZywgJycpO1xyXG4gICAgLy8gY29uc3QgdHJ1bmNhdGVkID0gY2xlYW5lZC5zdWJzdHJpbmcoMCwgMTYpO1xyXG4gICAgcmV0dXJuIGNsZWFuZWQudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dHVyZVZhcmlhYmxlKHRleHR1cmUpIHtcclxuICAgIHJldHVybiBjb252ZXJ0VG9DYW1lbENhc2UodGV4dHVyZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRleHR1cmUodGV4dHVyZSkge1xyXG4gICAgaWYgKHRleHR1cmVzLmZpbmQoZSA9PiBlLnRleHR1cmUgPT0gdGV4dHVyZSkgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGxldCB2YXJpYWJsZSA9IGdldFRleHR1cmVWYXJpYWJsZSh0ZXh0dXJlKTtcclxuICAgIC8vIGxldCB0ZW1wVmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIC8vIGxldCBpID0gMTtcclxuICAgIC8vIHdoaWxlKHRleHR1cmVzLmZpbmQoZSA9PiBlLnZhcmlhYmxlID09IHRlbXBWYXJpYWJsZSkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgdGVtcFZhcmlhYmxlID0gdmFyaWFibGUgKyAoaSsrKTtcclxuICAgIC8vIH1cclxuICAgIC8vIHZhcmlhYmxlID0gdGVtcFZhcmlhYmxlO1xyXG4gICAgdGV4dHVyZXMucHVzaCh7XHJcbiAgICAgICAgdmFyaWFibGU6IHZhcmlhYmxlLFxyXG4gICAgICAgIHRleHR1cmU6IGltYWdlUGF0aCh0ZXh0dXJlKVxyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQnO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyhlbGVtZW50LCBvZmZzZXQsIHZhcmlhYmxlKSB7XHJcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6IGVsZW1lbnQueCxcclxuICAgICAgICB5OiBlbGVtZW50LnksXHJcbiAgICAgICAgd2lkdGg6IGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmhlaWdodCxcclxuICAgIH07XHJcbiAgICAvLyBDYWxjdWxhdGUgYWJzb2x1dGUgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHJvdGF0aW9uXHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCAncm90YXRpb24nIGluIGVsZW1lbnQgPyBlbGVtZW50LnJvdGF0aW9uIDogMCk7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBFbGVtZW50LmdldFBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgb2Zmc2V0KTtcclxuICAgIHZhcmlhYmxlID0gZWxlbWVudC5uYW1lO1xyXG4gICAgRWxlbWVudC5kZWZpbmVWYXJpYWJsZVBvc2l0aW9uKGVsZW1lbnQubmFtZSwgcG9zaXRpb24pO1xyXG4gICAgLy8gR2VuZXJhdGUgY29kZVxyXG4gICAgcmV0dXJuIHZhcmlhYmxlO1xyXG59XHJcbiIsIjtcclxubGV0IGxhbmd1YWdlID0gJ0VOJztcclxuY29uc3QgbGFuZ3VhZ2VzID0ge1xyXG4gICAgJ1BMJzoge1xyXG4gICAgICAgICduby1zZWxlY3Rpb24nOiAnTmllIHd5YnJhbm8gxbxhZG5lZ28gZWxlbWVudHUnLFxyXG4gICAgICAgICdtb3JlLXRoYW4tb25lJzogJ1phem5hY3pvbm8gd2nEmWNlaiBuacW8IGplZGVuIGVsZW1lbnQnLFxyXG4gICAgICAgICduby1mcmFtZSc6ICdaYXpuYWN6b255IGVsZW1lbnQgdG8gbmllIGZyYW1lJyxcclxuICAgICAgICAnZXhwb3J0LXN1Y2Nlc3MnOiAnRWtzcG9ydCB6YWtvxYRjem9ueSBzdWtjZXNlbScsXHJcbiAgICAgICAgJ2V4cG9ydC1mYWlsZWQnOiAnRWtzcG9ydCB6YWtvxYRjem9ueSBuaWVwb3dvZHplbmllbScsXHJcbiAgICAgICAgJ2NvZGUtcmVhZHknOiAnS29kIGplc3QgZ290b3d5IHcga29uc29saScsXHJcbiAgICB9LFxyXG4gICAgJ0VOJzoge1xyXG4gICAgICAgICduby1zZWxlY3Rpb24nOiAnVGhlcmVcXCdzIG5vdGhpbmcgc2VsZWN0ZWQnLFxyXG4gICAgICAgICdtb3JlLXRoYW4tb25lJzogJ1RoZXJlXFwncyBtb3JlIHRoYW4gb25lIGVsZW1lbnQgc2VsZWN0ZWQnLFxyXG4gICAgICAgICduby1mcmFtZSc6ICdTZWxlY3RlZCBlbGVtZW50IGlzblxcJ3QgZnJhbWUnLFxyXG4gICAgICAgICdleHBvcnQtc3VjY2Vzcyc6ICdFeHBvcnQgZmluaXNoZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICAnZXhwb3J0LWZhaWxlZCc6ICdFeHBvcnQgZmluaXNoZWQgd2l0aCBlcnJvcicsXHJcbiAgICAgICAgJ2NvZGUtcmVhZHknOiAnQ29kZSBpcyByZWFkeSBpbiBjb25zb2xlJyxcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNsYXRpb24oa2V5KSB7XHJcbiAgICByZXR1cm4gbGFuZ3VhZ2VzW2xhbmd1YWdlXSAmJiBsYW5ndWFnZXNbbGFuZ3VhZ2VdW2tleV0gfHwga2V5O1xyXG59XHJcbiIsImNvbnN0IG1ldGFUZW1wbGF0ZSA9IGA8bWV0YT5cclxuICAgIDxzY3JpcHQgc3JjPSd1c2VmdWwubHVhJyB0eXBlPSdjbGllbnQnIGNhY2hlPSdmYWxzZScvPlxyXG4gICAgPHNjcmlwdCBzcmM9J2NsaWVudC5sdWEnIHR5cGU9J2NsaWVudCcgY2FjaGU9J2ZhbHNlJy8+XHJcblxyXG48RklMRV9TT1VSQ0VTPlxyXG48L21ldGE+YDtcclxuY29uc3QgY29kZVRlbXBsYXRlID0gYFxyXG48VkFSSUFCTEVTPlxyXG5cclxuZnVuY3Rpb24gcmVuZGVyVUkoKVxyXG48Q09ERT5cclxuZW5kXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVVSSh2aXNpYmxlKVxyXG4gICAgbG9jYWwgZXZlbnRDYWxsYmFjayA9IHZpc2libGUgYW5kIGFkZEV2ZW50SGFuZGxlciBvciByZW1vdmVFdmVudEhhbmRsZXJcclxuXHJcbiAgICBldmVudENhbGxiYWNrKCdvbkNsaWVudFJlbmRlcicsIHJvb3QsIHJlbmRlclVJKVxyXG5lbmRcclxuXHJcbnRvZ2dsZVVJKHRydWUpYDtcclxuY29uc3QgdXNlZnVsQ29kZSA9IGBzeCwgc3kgPSBndWlHZXRTY3JlZW5TaXplKClcclxuem9vbSA9IChzeCA8IDIwNDgpIGFuZCBtYXRoLm1pbigyLjIsIDIwNDgvc3gpIG9yIDFcclxuZm9udHMgPSB7XHJcbiAgICBmaWdtYUZvbnRzID0ge30sXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVubG9hZEZvbnRzKClcclxuICAgIGZvciBrLHYgaW4gcGFpcnMoZm9udHMpIGRvXHJcbiAgICAgICAgaWYgdiBhbmQgaXNFbGVtZW50KHYpIHRoZW4gZGVzdHJveUVsZW1lbnQodikgZW5kXHJcbiAgICBlbmRcclxuICAgIGZvbnRzID0ge1xyXG4gICAgICAgIGZpZ21hRm9udHMgPSB7fSxcclxuICAgIH1cclxuZW5kXHJcblxyXG5mdW5jdGlvbiBsb2FkRm9udHMoYXJyYXkpXHJcbiAgICB1bmxvYWRGb250cygpXHJcbiAgICBmb3IgXyx2IGluIHBhaXJzKGFycmF5KSBkb1xyXG4gICAgICAgIGZvbnRzW3ZbMV1dID0gZHhDcmVhdGVGb250KHZbMl0sIHZbM10sIHZbNF0sICdwcm9vZicpXHJcbiAgICBlbmRcclxuZW5kXHJcblxyXG5mdW5jdGlvbiBnZXRGaWdtYUZvbnQoZm9udCwgc2l6ZSlcclxuICAgIGxvY2FsIGZpZ21hRm9udHMgPSBmb250cy5maWdtYUZvbnRzXHJcbiAgICBpZiBub3QgZmlnbWFGb250c1tmb250Li5zaXplXSB0aGVuXHJcbiAgICAgICAgZmlnbWFGb250c1tmb250Li5zaXplXSA9IGV4cG9ydHNbJ2ZpZ21hJ106Z2V0Rm9udChmb250LCBzaXplKVxyXG4gICAgZW5kXHJcblxyXG4gICAgcmV0dXJuIGZpZ21hRm9udHNbZm9udC4uc2l6ZV1cclxuZW5kYDtcclxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgem9vbTogdHJ1ZSxcclxuICAgIHBhdGg6ICdkYXRhLycsXHJcbiAgICBtZXRhVGVtcGxhdGU6IG1ldGFUZW1wbGF0ZSxcclxuICAgIGNvZGVUZW1wbGF0ZTogY29kZVRlbXBsYXRlLFxyXG4gICAgdXNlZnVsQ29kZTogdXNlZnVsQ29kZSxcclxuICAgIHdvcmRXcmFwOiBmYWxzZSxcclxufTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0NhbWVsQ2FzZShzdHIpIHtcclxuICAgIC8vIFJlbW92ZSBhbGwgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCByZXBsYWNlIHNwYWNlcyB3aXRoIHVuZGVyc2NvcmVzXHJcbiAgICBjb25zdCBjbGVhbmVkID0gc3RyLnJlcGxhY2UoL1teYS16QS1aMC05X10vZywgXCJcIikucmVwbGFjZSgvXFxzKy9nLCBcIl9cIik7XHJcbiAgICAvLyBTcGxpdCB0aGUgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygd29yZHNcclxuICAgIGNvbnN0IHdvcmRzID0gY2xlYW5lZC5zcGxpdChcIl9cIik7XHJcbiAgICAvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkIChleGNlcHQgdGhlIGZpcnN0IHdvcmQpXHJcbiAgICBjb25zdCBjYXBpdGFsaXplZCA9IHdvcmRzXHJcbiAgICAgICAgLm1hcCgod29yZCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICByZXR1cm4gY2FwaXRhbGl6ZWQuY2hhckF0KDApLnRvTG9jYWxlTG93ZXJDYXNlKCkgKyBjYXBpdGFsaXplZC5zbGljZSgxKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbih4LCB5LCBkaXN0YW5jZSwgYW5nbGUpIHtcclxuICAgIC8vIENvbnZlcnQgYW5nbGUgZnJvbSBkZWdyZWVzIHRvIHJhZGlhbnNcclxuICAgIGNvbnN0IHJhZGlhbnMgPSBhbmdsZSAqIChNYXRoLlBJIC8gMTgwKTtcclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgbmV3IHggYW5kIHkgY29vcmRpbmF0ZXNcclxuICAgIGNvbnN0IG5ld1ggPSB4ICsgZGlzdGFuY2UgKiBNYXRoLmNvcyhyYWRpYW5zKTtcclxuICAgIGNvbnN0IG5ld1kgPSB5ICsgZGlzdGFuY2UgKiBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0cmFuc2xhdGlvbiBmcm9tIFwiLi9sYW5ndWFnZVwiO1xyXG5pbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudHMvZWxlbWVudCc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxubGV0IGNuc2wgPSBjb25zb2xlO1xyXG5sZXQgY2xvZyA9IGNvbnNvbGUubG9nO1xyXG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcclxuICAgIHRpdGxlOiAnTVRBIEV4cG9ydGVyIDIuMCBieSBAYm9yc3VjenluYScsXHJcbiAgICB3aWR0aDogMzAwLFxyXG4gICAgaGVpZ2h0OiA0NTAsXHJcbiAgICB2aXNpYmxlOiB0cnVlXHJcbn0pO1xyXG5mdW5jdGlvbiBleHBvcnRGcmFtZShmcmFtZSwgYWxpZ24pIHtcclxuICAgIGxldCBvZmZzZXQgPSB7XHJcbiAgICAgICAgeDogZnJhbWUueCxcclxuICAgICAgICB5OiBmcmFtZS55LFxyXG4gICAgICAgIHdpZHRoOiBmcmFtZS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGZyYW1lLmhlaWdodCxcclxuICAgICAgICBhbGlnbjogYWxpZ25cclxuICAgIH07XHJcbiAgICBsZXQgZGF0YSA9IEVsZW1lbnQucHJvY2Vzc05vZGUoZnJhbWUsIG9mZnNldCwgdW5kZWZpbmVkKTtcclxuICAgIGxldCBjb2RlID0gZGF0YS5jb2RlO1xyXG4gICAgbGV0IG1ldGFDb2RlID0gZGF0YS5tZXRhQ29kZTtcclxuICAgIC8vIHJlbW92ZSBsYXN0IG5ldyBsaW5lIGZyb20gY29kZSBhbmQgbWV0YUNvZGVcclxuICAgIGNvZGUgPSBjb2RlLnNsaWNlKDAsIC0xKTtcclxuICAgIG1ldGFDb2RlID0gbWV0YUNvZGUuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29kZSA9IHNldHRpbmdzLmNvZGVUZW1wbGF0ZS5yZXBsYWNlKCc8Q09ERT4nLCBjb2RlKS5yZXBsYWNlKCc8VkFSSUFCTEVTPicsIEVsZW1lbnQuZ2V0VmFyaWFibGVzKCkpO1xyXG4gICAgbWV0YUNvZGUgPSBzZXR0aW5ncy5tZXRhVGVtcGxhdGUucmVwbGFjZSgnPEZJTEVfU09VUkNFUz4nLCBtZXRhQ29kZSk7XHJcbiAgICBjb2RlID0gY29kZS50cmltKCk7XHJcbiAgICBjbG9nKGNvZGUpO1xyXG4gICAgZmlnbWEubm90aWZ5KHRyYW5zbGF0aW9uKCdjb2RlLXJlYWR5JyksIHsgdGltZW91dDogMzAwMCB9KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywge1xyXG4gICAgICAgICAgICB0aXRsZTogJ01UQSBFeHBvcnRlciBieSBib3JzdWsnLFxyXG4gICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgMTAwMCk7XHJcbn1cclxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2V4cG9ydC1hcy1jb2RlJykge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25zID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gZmlnbWEubm90aWZ5KHRyYW5zbGF0aW9uKCduby1zZWxlY3Rpb24nKSwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9ucy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICByZXR1cm4gZmlnbWEubm90aWZ5KHRyYW5zbGF0aW9uKCdtb3JlLXRoYW4tb25lJyksIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHNlbGVjdGlvbnNbMF07XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi50eXBlICE9ICdGUkFNRScpXHJcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ25vLWZyYW1lJyksIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldFZhcmlhYmxlcygpO1xyXG4gICAgICAgIEVsZW1lbnQucmVzZXRGb2N1c0VsZW1lbnRzKCk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldEN1cnJlbnRWYXJpYWJsZSgpO1xyXG4gICAgICAgIEVsZW1lbnQuc2V0TWFpbkZyYW1lKHNlbGVjdGlvbik7XHJcbiAgICAgICAgc2V0dGluZ3Muem9vbSA9IG1zZy51c2Vab29tO1xyXG4gICAgICAgIHNldHRpbmdzLndvcmRXcmFwID0gbXNnLndvcmRXcmFwO1xyXG4gICAgICAgIGV4cG9ydEZyYW1lKHNlbGVjdGlvbiwgbXNnLmFsaWduKTtcclxuICAgICAgICBFbGVtZW50LmZvY3VzT25FbGVtZW50cyhzZWxlY3Rpb24pO1xyXG4gICAgfVxyXG59O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=