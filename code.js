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
    // Add texture to cache
    _textures__WEBPACK_IMPORTED_MODULE_1__.addTexture(name);
    // Generate code
    let variable = `textures.${_textures__WEBPACK_IMPORTED_MODULE_1__.getTextureVariable(name)}`;
    code = `\tdxDrawImage(${position}, ${variable}.texture)\n`;
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
    // Add texture to cache
    _textures__WEBPACK_IMPORTED_MODULE_1__.addTexture(element.name);
    // Generate code
    let variable = `textures.${_textures__WEBPACK_IMPORTED_MODULE_1__.variableName(element.name)}`;
    code = `\tdxDrawImage(${position}, ${variable}.texture)\n`;
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
/* harmony export */   "getTexturesCode": () => (/* binding */ getTexturesCode),
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
function getTexturesCode() {
    let code = '\t\t\t\tloadTextures({\n';
    for (let texture of textures) {
        code += `\t\t\t\t\t\t{'${texture.variable}', '${texture.texture}'},\n`;
    }
    code += '\t\t\t\t});';
    return code;
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

    if visible then
<TEXTURES>
    else
        unloadTextures()
    end
end

toggleUI(true)`;
const usefulCode = `sx, sy = guiGetScreenSize()
zoom = (sx < 2048) and math.min(2.2, 2048/sx) or 1
fonts = {
    figmaFonts = {},
}
textures = {}

function unloadTextures()
    for k,v in pairs(textures) do
        if v and isElement(v) then destroyElement(v) end
    end
    textures = {}
end

function unloadFonts()
    for k,v in pairs(fonts) do
        if v and isElement(v) then destroyElement(v) end
    end
    fonts = {
        figmaFonts = {},
    }
end

function loadTextures(array)
    unloadTextures()
    for _,v in pairs(array) do
        local texture = dxCreateTexture(v[2], 'argb', true, 'clamp')
        local width, height = dxGetMaterialSize(texture)
        textures[v[1]] = {
            texture = texture,
            width = width,
            height = height,
        }
    end
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
/* harmony import */ var _elements_textures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/textures */ "./src/elements/textures.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings */ "./src/settings.ts");




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
    code = _settings__WEBPACK_IMPORTED_MODULE_3__.settings.codeTemplate.replace('<CODE>', code).replace('<TEXTURES>', _elements_textures__WEBPACK_IMPORTED_MODULE_2__.getTexturesCode()).replace('<VARIABLES>', _elements_element__WEBPACK_IMPORTED_MODULE_1__.getVariables());
    metaCode = _settings__WEBPACK_IMPORTED_MODULE_3__.settings.metaTemplate.replace('<FILE_SOURCES>', metaCode);
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
                code: \`${_settings__WEBPACK_IMPORTED_MODULE_3__.settings.usefulCode}\`,
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
        _elements_textures__WEBPACK_IMPORTED_MODULE_2__.resetTextures();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.resetVariables();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.resetFocusElements();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.resetCurrentVariable();
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.setMainFrame(selection);
        _settings__WEBPACK_IMPORTED_MODULE_3__.settings.zoom = msg.useZoom;
        _settings__WEBPACK_IMPORTED_MODULE_3__.settings.wordWrap = msg.wordWrap;
        exportFrame(selection, msg.align);
        _elements_element__WEBPACK_IMPORTED_MODULE_1__.focusOnElements(selection);
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtBQUN4RSxRQUFRLDZEQUFzQjtBQUM5QixRQUFRLDZEQUFzQjtBQUM5QixRQUFRLGlFQUEwQjtBQUNsQyxRQUFRLG1FQUE0QjtBQUNwQyxRQUFRLDJEQUFvQjtBQUM1QixRQUFRLG9EQUFhO0FBQ3JCLFFBQVEsd0RBQWlCO0FBQ3pCO0FBQ0EsUUFBUSw4REFBdUI7QUFDL0I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy9lbGVtZW50LnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy9yYXcudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdGV4dC50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdGV4dHVyZXMudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3ZhcmlhYmxlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9sYW5ndWFnZS50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL3VzZWZ1bC50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uIH0gZnJvbSBcIi4uL3VzZWZ1bFwiO1xyXG5pbXBvcnQgKiBhcyBSZWN0YW5nbGUgZnJvbSAnLi9yZWN0YW5nbGUnO1xyXG5pbXBvcnQgKiBhcyBSYXcgZnJvbSAnLi9yYXcnO1xyXG5pbXBvcnQgKiBhcyBWYXJpYWJsZSBmcm9tICcuL3ZhcmlhYmxlJztcclxuaW1wb3J0ICogYXMgVGV4dCBmcm9tICcuL3RleHQnO1xyXG5sZXQgZm9jdXNFbGVtZW50cyA9IFtdO1xyXG5sZXQgdmFyaWFibGVzID0ge307XHJcbmxldCBtYWluRnJhbWU7XHJcbmxldCBjdXJyZW50VmFyaWFibGUgPSB1bmRlZmluZWQ7XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEN1cnJlbnRWYXJpYWJsZSgpIHtcclxuICAgIGN1cnJlbnRWYXJpYWJsZSA9IHVuZGVmaW5lZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWFpbkZyYW1lKGZyYW1lKSB7XHJcbiAgICBtYWluRnJhbWUgPSBmcmFtZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRGb2N1c0VsZW1lbnRzKCkge1xyXG4gICAgZm9jdXNFbGVtZW50cyA9IFtdO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVWYXJpYWJsZVBvc2l0aW9uKG5hbWUsIHBvc2l0aW9uKSB7XHJcbiAgICB2YXJpYWJsZXNbbmFtZV0gPSBwb3NpdGlvbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzKCkge1xyXG4gICAgbGV0IGxlbmd0aCA9IDA7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIHZhcmlhYmxlcylcclxuICAgICAgICBsZW5ndGgrKztcclxuICAgIGlmIChsZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICBsZXQgY29kZSA9ICdsb2NhbCBzZXR0aW5ncyA9IHtcXG4nO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiB2YXJpYWJsZXMpIHtcclxuICAgICAgICBjb2RlICs9IGBcXHRbJyR7bmFtZX0nXSA9IHske3ZhcmlhYmxlc1tuYW1lXX19XFxuYDtcclxuICAgIH1cclxuICAgIGNvZGUgKz0gJ30nO1xyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VmFyaWFibGVzKCkge1xyXG4gICAgdmFyaWFibGVzID0ge307XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFza0dyb3VwKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICgnaXNNYXNrJyBpbiBjaGlsZCAmJiBjaGlsZC5pc01hc2spXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFic29sdXRlUG9zaXRpb24ocG9zaXRpb24sIGFuZ2xlKSB7XHJcbiAgICBsZXQgbHQgPSB7IHg6IHBvc2l0aW9uLngsIHk6IHBvc2l0aW9uLnkgfTtcclxuICAgIGxldCBydCA9IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24ocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ud2lkdGgsIGFuZ2xlKTtcclxuICAgIGxldCBsYiA9IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24ocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24uaGVpZ2h0LCBhbmdsZSArIDkwKTtcclxuICAgIGxldCByYiA9IGdldFBvaW50RnJvbURpc3RhbmNlUm90YXRpb24ocnQueCwgcnQueSwgcG9zaXRpb24uaGVpZ2h0LCBhbmdsZSArIDkwKTtcclxuICAgIGxldCB4ID0gTWF0aC5taW4obHQueCwgcnQueCwgbGIueCwgcmIueCk7XHJcbiAgICBsZXQgeSA9IE1hdGgubWluKGx0LnksIHJ0LnksIGxiLnksIHJiLnkpO1xyXG4gICAgbGV0IHR4ID0gTWF0aC5tYXgobHQueCwgcnQueCwgbGIueCwgcmIueCk7XHJcbiAgICBsZXQgdHkgPSBNYXRoLm1heChsdC55LCBydC55LCBsYi55LCByYi55KTtcclxuICAgIGxldCB3aWR0aCA9IHR4IC0geDtcclxuICAgIGxldCBoZWlnaHQgPSB0eSAtIHk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gYWRkRm9jdXNFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgIGZvY3VzRWxlbWVudHMucHVzaChlbGVtZW50KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9jdXNPbkVsZW1lbnRzKGZyYW1lKSB7XHJcbiAgICAvLyBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW2ZyYW1lXSB8fCBmb2N1c0VsZW1lbnRzKTtcclxuICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IGZvY3VzRWxlbWVudHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvc2l0aW9uKHBvc2l0aW9uLCBvZmZzZXQsIG5vV29yZFdyYXAgPSB0cnVlLCB0ZXh0WEFsaWduID0gJ2xlZnQnLCB0ZXh0WUFsaWduID0gJ3RvcCcpIHtcclxuICAgIGxldCB4ID0gcG9zaXRpb24ueDtcclxuICAgIGxldCB5ID0gcG9zaXRpb24ueTtcclxuICAgIGxldCB3aWR0aCA9IHBvc2l0aW9uLndpZHRoO1xyXG4gICAgbGV0IGhlaWdodCA9IHBvc2l0aW9uLmhlaWdodDtcclxuICAgIGxldCB6b29tID0gc2V0dGluZ3Muem9vbSA/ICcvem9vbScgOiAnJztcclxuICAgIGxldCB4QWxpZ24gPSBvZmZzZXQuYWxpZ24uY2hhckF0KDApO1xyXG4gICAgbGV0IHlBbGlnbiA9IG9mZnNldC5hbGlnbi5jaGFyQXQoMSk7XHJcbiAgICBpZiAobm9Xb3JkV3JhcCkge1xyXG4gICAgICAgIGxldCB4cyA9ICcnLCB5cyA9ICcnO1xyXG4gICAgICAgIGlmICh4QWxpZ24gPT0gJ0wnKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WEFsaWduID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYCR7eH0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHhzID0gYCR7eCArIHdpZHRoIC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAncmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgJHt4ICsgd2lkdGh9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnQycpIHtcclxuICAgICAgICAgICAgeCA9IHggLSBvZmZzZXQud2lkdGggLyAyO1xyXG4gICAgICAgICAgICBpZiAodGV4dFhBbGlnbiA9PSAnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeC8yICsgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3gvMiArICR7eCArIHdpZHRoIC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAncmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3gvMiArICR7eCArIHdpZHRofSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh4QWxpZ24gPT0gJ1InKSB7XHJcbiAgICAgICAgICAgIHggPSBvZmZzZXQud2lkdGggLSB4O1xyXG4gICAgICAgICAgICBpZiAodGV4dFhBbGlnbiA9PSAnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeCAtICR7eCArIHdpZHRofSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3ggLSAke3ggKyB3aWR0aCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ3JpZ2h0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4IC0gJHt4fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeUFsaWduID09ICdUJykge1xyXG4gICAgICAgICAgICBpZiAodGV4dFlBbGlnbiA9PSAndG9wJylcclxuICAgICAgICAgICAgICAgIHlzID0gYCR7eX0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHlzID0gYCR7eSArIGhlaWdodCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2JvdHRvbScpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGAke3kgKyBoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnTScpIHtcclxuICAgICAgICAgICAgeSA9IHkgLSBvZmZzZXQuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgaWYgKHRleHRZQWxpZ24gPT0gJ3RvcCcpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeS8yICsgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kvMiArICR7eSArIGhlaWdodCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2JvdHRvbScpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeS8yICsgJHt5ICsgaGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ0InKSB7XHJcbiAgICAgICAgICAgIHkgPSBvZmZzZXQuaGVpZ2h0IC0geTtcclxuICAgICAgICAgICAgaWYgKHRleHRZQWxpZ24gPT0gJ3RvcCcpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeSAtICR7eSArIGhlaWdodH0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5IC0gJHt5ICsgaGVpZ2h0IC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnYm90dG9tJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5IC0gJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7eHN9LCAke3lzfSwgbmlsLCBuaWxgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKHhBbGlnbiA9PSAnTCcpXHJcbiAgICAgICAgICAgIHggPSBgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnQycpIHtcclxuICAgICAgICAgICAgeCA9IHggLSBvZmZzZXQud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB4ID0gYHN4LzIgKyAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnUicpIHtcclxuICAgICAgICAgICAgeCA9IG9mZnNldC53aWR0aCAtIHg7XHJcbiAgICAgICAgICAgIHggPSBgc3ggLSAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5QWxpZ24gPT0gJ1QnKVxyXG4gICAgICAgICAgICB5ID0gYCR7eX0ke3pvb219YDtcclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ00nKSB7XHJcbiAgICAgICAgICAgIHkgPSB5IC0gb2Zmc2V0LmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHkgPSBgc3kvMiArICR7eX0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUFsaWduID09ICdCJykge1xyXG4gICAgICAgICAgICB5ID0gb2Zmc2V0LmhlaWdodCAtIHk7XHJcbiAgICAgICAgICAgIHkgPSBgc3kgLSAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50VmFyaWFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBzZXR0aW5nc1snJHtjdXJyZW50VmFyaWFibGV9J11bMV0gKyAke3h9JHt6b29tfSwgc2V0dGluZ3NbJyR7Y3VycmVudFZhcmlhYmxlfSddWzJdICsgJHt5fSR7em9vbX0sICR7d2lkdGh9JHt6b29tfSwgJHtoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHt4fSwgJHt5fSwgJHt3aWR0aH0ke3pvb219LCAke2hlaWdodH0ke3pvb219YDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdG9Db2xvcihjb2xvcikge1xyXG4gICAgcmV0dXJuIGB0b2NvbG9yKCR7TWF0aC5mbG9vcihjb2xvci5jb2xvci5yICogMjU1KX0sICR7TWF0aC5mbG9vcihjb2xvci5jb2xvci5nICogMjU1KX0sICR7TWF0aC5mbG9vcihjb2xvci5jb2xvci5iICogMjU1KX0sICR7TWF0aC5mbG9vcihjb2xvci5vcGFjaXR5ICogMjU1KX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc05vZGUoZWxlbWVudCwgb2Zmc2V0LCB2YXJpYWJsZSkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBtZXRhQ29kZSA9ICcnO1xyXG4gICAgbGV0IHByZVZhcmlhYmxlID0gdmFyaWFibGU7XHJcbiAgICBpZiAoZWxlbWVudC50eXBlID09ICdGUkFNRScgJiYgZWxlbWVudCAhPSBtYWluRnJhbWUpIHtcclxuICAgICAgICB2YXJpYWJsZSA9IFZhcmlhYmxlLnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCB2YXJpYWJsZSk7XHJcbiAgICAgICAgY3VycmVudFZhcmlhYmxlID0gdmFyaWFibGU7XHJcbiAgICB9XHJcbiAgICAvLyBjb2RlICs9IGAtLSAke2VsZW1lbnQudHlwZX06ICR7ZWxlbWVudC5uYW1lfSAke2N1cnJlbnRWYXJpYWJsZSB8fCAnJ31cXG5gO1xyXG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PSAnR1JPVVAnICYmIGVsZW1lbnQubmFtZS5zdGFydHNXaXRoKCc8c2luZ2xlPicpKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnX3NpbmdsZV8nICsgZWxlbWVudC5uYW1lLnNsaWNlKCc8c2luZ2xlPicubGVuZ3RoKTtcclxuICAgICAgICBsZXQgZGF0YSA9IFJhdy5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgbmFtZSk7XHJcbiAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgbWV0YUNvZGUgKz0gZGF0YS5tZXRhQ29kZTtcclxuICAgICAgICBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc01hc2tHcm91cChlbGVtZW50KSB8fCBlbGVtZW50LnR5cGUgPT0gJ1ZFQ1RPUicpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IFJhdy5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgZWxlbWVudC5uYW1lKTtcclxuICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIGFkZEZvY3VzRWxlbWVudChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCdjaGlsZHJlbicgaW4gZWxlbWVudCkge1xyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGVsZW1lbnQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBwcm9jZXNzTm9kZShjaGlsZCwgb2Zmc2V0LCB2YXJpYWJsZSk7XHJcbiAgICAgICAgICAgIGNvZGUgKz0gZGF0YS5jb2RlO1xyXG4gICAgICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChlbGVtZW50LnR5cGUgPT0gJ1JFQ1RBTkdMRScpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IFJlY3RhbmdsZS5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCk7XHJcbiAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgbWV0YUNvZGUgKz0gZGF0YS5tZXRhQ29kZTtcclxuICAgICAgICBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgY29kZSArPSBUZXh0LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KTtcclxuICAgIH1cclxuICAgIHZhcmlhYmxlID0gcHJlVmFyaWFibGU7XHJcbiAgICBjdXJyZW50VmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKyAtL2csICctICcpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwrIDBcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLy0gMFxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwrIDAvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvLSAwL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKiAxXFwvem9vbS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXC8gMVxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwqIDEvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwvIDEvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvKFxcZCtcXC5cXGR7M30pXFxkKy9nLCAnJDEnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLyAsL2csICcsJyk7XHJcbiAgICByZXR1cm4geyBjb2RlLCBtZXRhQ29kZSB9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuaW1wb3J0ICogYXMgVGV4dHVyZXMgZnJvbSAnLi90ZXh0dXJlcyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgbmFtZSkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBtZXRhQ29kZSA9ICcnO1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gRWZmZWN0c1xyXG4gICAgLy8gQFRPRE9cclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sICdyb3RhdGlvbicgaW4gZWxlbWVudCA/IGVsZW1lbnQucm90YXRpb24gOiAwKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgLy8gQWRkIHRleHR1cmUgdG8gY2FjaGVcclxuICAgIFRleHR1cmVzLmFkZFRleHR1cmUobmFtZSk7XHJcbiAgICAvLyBHZW5lcmF0ZSBjb2RlXHJcbiAgICBsZXQgdmFyaWFibGUgPSBgdGV4dHVyZXMuJHtUZXh0dXJlcy5nZXRUZXh0dXJlVmFyaWFibGUobmFtZSl9YDtcclxuICAgIGNvZGUgPSBgXFx0ZHhEcmF3SW1hZ2UoJHtwb3NpdGlvbn0sICR7dmFyaWFibGV9LnRleHR1cmUpXFxuYDtcclxuICAgIG1ldGFDb2RlID0gYFxcdDxmaWxlIHNyYz1cIiR7VGV4dHVyZXMuaW1hZ2VQYXRoKG5hbWUpfVwiLz5cXG5gO1xyXG4gICAgcmV0dXJuIHsgY29kZSwgbWV0YUNvZGUgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmltcG9ydCAqIGFzIFRleHR1cmVzIGZyb20gJy4vdGV4dHVyZXMnO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyhlbGVtZW50LCBvZmZzZXQpIHtcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSAnJztcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIFN0cm9rZXNcclxuICAgIGxldCBvZmZTaXplID0gMDtcclxuICAgIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdPVVRTSURFJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ0NFTlRFUicpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQgLyAyO1xyXG4gICAgfVxyXG4gICAgLy8gRWZmZWN0c1xyXG4gICAgLy8gQFRPRE9cclxuICAgIGVsZW1lbnRQb3NpdGlvbi54IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ueSAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLndpZHRoICs9IG9mZlNpemUgKiAyO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLmhlaWdodCArPSBvZmZTaXplICogMjtcclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIGVsZW1lbnQucm90YXRpb24pO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCk7XHJcbiAgICAvLyBBZGQgdGV4dHVyZSB0byBjYWNoZVxyXG4gICAgVGV4dHVyZXMuYWRkVGV4dHVyZShlbGVtZW50Lm5hbWUpO1xyXG4gICAgLy8gR2VuZXJhdGUgY29kZVxyXG4gICAgbGV0IHZhcmlhYmxlID0gYHRleHR1cmVzLiR7VGV4dHVyZXMudmFyaWFibGVOYW1lKGVsZW1lbnQubmFtZSl9YDtcclxuICAgIGNvZGUgPSBgXFx0ZHhEcmF3SW1hZ2UoJHtwb3NpdGlvbn0sICR7dmFyaWFibGV9LnRleHR1cmUpXFxuYDtcclxuICAgIG1ldGFDb2RlID0gYFxcdDxmaWxlIHNyYz1cIiR7VGV4dHVyZXMuaW1hZ2VQYXRoKGVsZW1lbnQubmFtZSl9XCIvPlxcbmA7XHJcbiAgICByZXR1cm4geyBjb2RlLCBtZXRhQ29kZSB9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIFN0cm9rZXNcclxuICAgIGxldCBvZmZTaXplID0gMDtcclxuICAgIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdPVVRTSURFJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ0NFTlRFUicpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQgLyAyO1xyXG4gICAgfVxyXG4gICAgLy8gRWZmZWN0c1xyXG4gICAgLy8gQFRPRE9cclxuICAgIGVsZW1lbnRQb3NpdGlvbi54IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ueSAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLndpZHRoICs9IG9mZlNpemUgKiAyO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLmhlaWdodCArPSBvZmZTaXplICogMjtcclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGxldCB4QWxpZ24gPSBlbGVtZW50LnRleHRBbGlnbkhvcml6b250YWwudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIGxldCB5QWxpZ24gPSBlbGVtZW50LnRleHRBbGlnblZlcnRpY2FsLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgem9vbSA9IHNldHRpbmdzLnpvb20gPyAnL3pvb20nIDogJyc7XHJcbiAgICBlbGVtZW50UG9zaXRpb24gPSBFbGVtZW50LmdldEFic29sdXRlUG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBlbGVtZW50LnJvdGF0aW9uKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQsICFzZXR0aW5ncy53b3JkV3JhcCwgeEFsaWduLCB5QWxpZ24pO1xyXG4gICAgbGV0IFt4LCB5LCB3LCBoXSA9IHBvc2l0aW9uLnNwbGl0KCcsJykubWFwKGUgPT4gZS50cmltKCkpO1xyXG4gICAgaWYgKHNldHRpbmdzLndvcmRXcmFwKSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBgJHt4fSwgJHt5fSwgKCR7eH0pICsgKCR7d30pLCAoJHt5fSkgKyAoJHtofSlgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBgJHt4fSwgJHt5fSwgbmlsLCBuaWxgO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvbG9yID0gZWxlbWVudC5maWxsc1swXTtcclxuICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gZWxlbWVudC5jaGFyYWN0ZXJzO1xyXG4gICAgICAgIHdoaWxlICh0ZXh0LmluY2x1ZGVzKCdcXG4nKSkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKCdcXG4nLCAnPCFuZXdsaW5lIT4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNpemUgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZm9udFNpemUudG9Mb2NhbGVTdHJpbmcoKSkgLyAxLjU7XHJcbiAgICAgICAgbGV0IGZvbnQgPSBgZ2V0RmlnbWFGb250KCcke2VsZW1lbnQuZm9udE5hbWUuZmFtaWx5fS0ke2VsZW1lbnQuZm9udE5hbWUuc3R5bGV9JywgJHtzaXplfSR7em9vbX0pYDtcclxuICAgICAgICBjb2RlID0gYFxcdGR4RHJhd1RleHQoJyR7dGV4dH0nLCAke3Bvc2l0aW9ufSwgJHtFbGVtZW50LnRvQ29sb3IoY29sb3IpfSwgMSwgJHtmb250fSwgJyR7eEFsaWdufScsICcke3lBbGlnbn0nJHtzZXR0aW5ncy53b3JkV3JhcCA/ICcsIGZhbHNlLCB0cnVlJyA6ICcnfSlcXG5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGU7XHJcbn1cclxuIiwiaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgY29udmVydFRvQ2FtZWxDYXNlIH0gZnJvbSBcIi4uL3VzZWZ1bFwiO1xyXG5sZXQgdGV4dHVyZXMgPSBbXTtcclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VGV4dHVyZXMoKSB7XHJcbiAgICB0ZXh0dXJlcyA9IFtdO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbWFnZVBhdGgoaW5wdXQpIHtcclxuICAgIGNvbnN0IGNsZWFuZWQgPSBpbnB1dC5yZXBsYWNlKC9bXmEtekEtWjAtOV8tXS9nLCAnJyk7XHJcbiAgICAvLyBjb25zdCB0cnVuY2F0ZWQgPSBjbGVhbmVkLnN1YnN0cmluZygwLCAxNik7XHJcbiAgICAvLyByZXR1cm4gYCR7c2V0dGluZ3MucGF0aH0ke3RydW5jYXRlZH0ucG5nYDtcclxuICAgIHJldHVybiBgJHtzZXR0aW5ncy5wYXRofSR7aW5wdXR9LnBuZ2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhYmxlTmFtZShpbnB1dCkge1xyXG4gICAgY29uc3QgY2xlYW5lZCA9IGlucHV0LnJlcGxhY2UoL1teYS16QS1aMC05X10vZywgJycpO1xyXG4gICAgLy8gY29uc3QgdHJ1bmNhdGVkID0gY2xlYW5lZC5zdWJzdHJpbmcoMCwgMTYpO1xyXG4gICAgcmV0dXJuIGNsZWFuZWQudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dHVyZVZhcmlhYmxlKHRleHR1cmUpIHtcclxuICAgIHJldHVybiBjb252ZXJ0VG9DYW1lbENhc2UodGV4dHVyZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRleHR1cmUodGV4dHVyZSkge1xyXG4gICAgaWYgKHRleHR1cmVzLmZpbmQoZSA9PiBlLnRleHR1cmUgPT0gdGV4dHVyZSkgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGxldCB2YXJpYWJsZSA9IGdldFRleHR1cmVWYXJpYWJsZSh0ZXh0dXJlKTtcclxuICAgIC8vIGxldCB0ZW1wVmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICAgIC8vIGxldCBpID0gMTtcclxuICAgIC8vIHdoaWxlKHRleHR1cmVzLmZpbmQoZSA9PiBlLnZhcmlhYmxlID09IHRlbXBWYXJpYWJsZSkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgdGVtcFZhcmlhYmxlID0gdmFyaWFibGUgKyAoaSsrKTtcclxuICAgIC8vIH1cclxuICAgIC8vIHZhcmlhYmxlID0gdGVtcFZhcmlhYmxlO1xyXG4gICAgdGV4dHVyZXMucHVzaCh7XHJcbiAgICAgICAgdmFyaWFibGU6IHZhcmlhYmxlLFxyXG4gICAgICAgIHRleHR1cmU6IGltYWdlUGF0aCh0ZXh0dXJlKVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHR1cmVzQ29kZSgpIHtcclxuICAgIGxldCBjb2RlID0gJ1xcdFxcdFxcdFxcdGxvYWRUZXh0dXJlcyh7XFxuJztcclxuICAgIGZvciAobGV0IHRleHR1cmUgb2YgdGV4dHVyZXMpIHtcclxuICAgICAgICBjb2RlICs9IGBcXHRcXHRcXHRcXHRcXHRcXHR7JyR7dGV4dHVyZS52YXJpYWJsZX0nLCAnJHt0ZXh0dXJlLnRleHR1cmV9J30sXFxuYDtcclxuICAgIH1cclxuICAgIGNvZGUgKz0gJ1xcdFxcdFxcdFxcdH0pOyc7XHJcbiAgICByZXR1cm4gY29kZTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgdmFyaWFibGUpIHtcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sICdyb3RhdGlvbicgaW4gZWxlbWVudCA/IGVsZW1lbnQucm90YXRpb24gOiAwKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgdmFyaWFibGUgPSBlbGVtZW50Lm5hbWU7XHJcbiAgICBFbGVtZW50LmRlZmluZVZhcmlhYmxlUG9zaXRpb24oZWxlbWVudC5uYW1lLCBwb3NpdGlvbik7XHJcbiAgICAvLyBHZW5lcmF0ZSBjb2RlXHJcbiAgICByZXR1cm4gdmFyaWFibGU7XHJcbn1cclxuIiwiO1xyXG5sZXQgbGFuZ3VhZ2UgPSAnRU4nO1xyXG5jb25zdCBsYW5ndWFnZXMgPSB7XHJcbiAgICAnUEwnOiB7XHJcbiAgICAgICAgJ25vLXNlbGVjdGlvbic6ICdOaWUgd3licmFubyDFvGFkbmVnbyBlbGVtZW50dScsXHJcbiAgICAgICAgJ21vcmUtdGhhbi1vbmUnOiAnWmF6bmFjem9ubyB3acSZY2VqIG5pxbwgamVkZW4gZWxlbWVudCcsXHJcbiAgICAgICAgJ25vLWZyYW1lJzogJ1phem5hY3pvbnkgZWxlbWVudCB0byBuaWUgZnJhbWUnLFxyXG4gICAgfSxcclxuICAgICdFTic6IHtcclxuICAgICAgICAnbm8tc2VsZWN0aW9uJzogJ1RoZXJlXFwncyBub3RoaW5nIHNlbGVjdGVkJyxcclxuICAgICAgICAnbW9yZS10aGFuLW9uZSc6ICdUaGVyZVxcJ3MgbW9yZSB0aGFuIG9uZSBlbGVtZW50IHNlbGVjdGVkJyxcclxuICAgICAgICAnbm8tZnJhbWUnOiAnU2VsZWN0ZWQgZWxlbWVudCBpc25cXCd0IGZyYW1lJ1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGlvbihrZXkpIHtcclxuICAgIHJldHVybiBsYW5ndWFnZXNbbGFuZ3VhZ2VdICYmIGxhbmd1YWdlc1tsYW5ndWFnZV1ba2V5XSB8fCBrZXk7XHJcbn1cclxuIiwiY29uc3QgbWV0YVRlbXBsYXRlID0gYDxtZXRhPlxyXG4gICAgPHNjcmlwdCBzcmM9J3VzZWZ1bC5sdWEnIHR5cGU9J2NsaWVudCcgY2FjaGU9J2ZhbHNlJy8+XHJcbiAgICA8c2NyaXB0IHNyYz0nY2xpZW50Lmx1YScgdHlwZT0nY2xpZW50JyBjYWNoZT0nZmFsc2UnLz5cclxuXHJcbjxGSUxFX1NPVVJDRVM+XHJcbjwvbWV0YT5gO1xyXG5jb25zdCBjb2RlVGVtcGxhdGUgPSBgXHJcbjxWQVJJQUJMRVM+XHJcblxyXG5mdW5jdGlvbiByZW5kZXJVSSgpXHJcbjxDT0RFPlxyXG5lbmRcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVVJKHZpc2libGUpXHJcbiAgICBsb2NhbCBldmVudENhbGxiYWNrID0gdmlzaWJsZSBhbmQgYWRkRXZlbnRIYW5kbGVyIG9yIHJlbW92ZUV2ZW50SGFuZGxlclxyXG5cclxuICAgIGV2ZW50Q2FsbGJhY2soJ29uQ2xpZW50UmVuZGVyJywgcm9vdCwgcmVuZGVyVUkpXHJcblxyXG4gICAgaWYgdmlzaWJsZSB0aGVuXHJcbjxURVhUVVJFUz5cclxuICAgIGVsc2VcclxuICAgICAgICB1bmxvYWRUZXh0dXJlcygpXHJcbiAgICBlbmRcclxuZW5kXHJcblxyXG50b2dnbGVVSSh0cnVlKWA7XHJcbmNvbnN0IHVzZWZ1bENvZGUgPSBgc3gsIHN5ID0gZ3VpR2V0U2NyZWVuU2l6ZSgpXHJcbnpvb20gPSAoc3ggPCAyMDQ4KSBhbmQgbWF0aC5taW4oMi4yLCAyMDQ4L3N4KSBvciAxXHJcbmZvbnRzID0ge1xyXG4gICAgZmlnbWFGb250cyA9IHt9LFxyXG59XHJcbnRleHR1cmVzID0ge31cclxuXHJcbmZ1bmN0aW9uIHVubG9hZFRleHR1cmVzKClcclxuICAgIGZvciBrLHYgaW4gcGFpcnModGV4dHVyZXMpIGRvXHJcbiAgICAgICAgaWYgdiBhbmQgaXNFbGVtZW50KHYpIHRoZW4gZGVzdHJveUVsZW1lbnQodikgZW5kXHJcbiAgICBlbmRcclxuICAgIHRleHR1cmVzID0ge31cclxuZW5kXHJcblxyXG5mdW5jdGlvbiB1bmxvYWRGb250cygpXHJcbiAgICBmb3Igayx2IGluIHBhaXJzKGZvbnRzKSBkb1xyXG4gICAgICAgIGlmIHYgYW5kIGlzRWxlbWVudCh2KSB0aGVuIGRlc3Ryb3lFbGVtZW50KHYpIGVuZFxyXG4gICAgZW5kXHJcbiAgICBmb250cyA9IHtcclxuICAgICAgICBmaWdtYUZvbnRzID0ge30sXHJcbiAgICB9XHJcbmVuZFxyXG5cclxuZnVuY3Rpb24gbG9hZFRleHR1cmVzKGFycmF5KVxyXG4gICAgdW5sb2FkVGV4dHVyZXMoKVxyXG4gICAgZm9yIF8sdiBpbiBwYWlycyhhcnJheSkgZG9cclxuICAgICAgICBsb2NhbCB0ZXh0dXJlID0gZHhDcmVhdGVUZXh0dXJlKHZbMl0sICdhcmdiJywgdHJ1ZSwgJ2NsYW1wJylcclxuICAgICAgICBsb2NhbCB3aWR0aCwgaGVpZ2h0ID0gZHhHZXRNYXRlcmlhbFNpemUodGV4dHVyZSlcclxuICAgICAgICB0ZXh0dXJlc1t2WzFdXSA9IHtcclxuICAgICAgICAgICAgdGV4dHVyZSA9IHRleHR1cmUsXHJcbiAgICAgICAgICAgIHdpZHRoID0gd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCxcclxuICAgICAgICB9XHJcbiAgICBlbmRcclxuZW5kXHJcblxyXG5mdW5jdGlvbiBsb2FkRm9udHMoYXJyYXkpXHJcbiAgICB1bmxvYWRGb250cygpXHJcbiAgICBmb3IgXyx2IGluIHBhaXJzKGFycmF5KSBkb1xyXG4gICAgICAgIGZvbnRzW3ZbMV1dID0gZHhDcmVhdGVGb250KHZbMl0sIHZbM10sIHZbNF0sICdwcm9vZicpXHJcbiAgICBlbmRcclxuZW5kXHJcblxyXG5mdW5jdGlvbiBnZXRGaWdtYUZvbnQoZm9udCwgc2l6ZSlcclxuICAgIGxvY2FsIGZpZ21hRm9udHMgPSBmb250cy5maWdtYUZvbnRzXHJcbiAgICBpZiBub3QgZmlnbWFGb250c1tmb250Li5zaXplXSB0aGVuXHJcbiAgICAgICAgZmlnbWFGb250c1tmb250Li5zaXplXSA9IGV4cG9ydHNbJ2ZpZ21hJ106Z2V0Rm9udChmb250LCBzaXplKVxyXG4gICAgZW5kXHJcblxyXG4gICAgcmV0dXJuIGZpZ21hRm9udHNbZm9udC4uc2l6ZV1cclxuZW5kYDtcclxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgem9vbTogdHJ1ZSxcclxuICAgIHBhdGg6ICdkYXRhLycsXHJcbiAgICBtZXRhVGVtcGxhdGU6IG1ldGFUZW1wbGF0ZSxcclxuICAgIGNvZGVUZW1wbGF0ZTogY29kZVRlbXBsYXRlLFxyXG4gICAgdXNlZnVsQ29kZTogdXNlZnVsQ29kZSxcclxuICAgIHdvcmRXcmFwOiBmYWxzZSxcclxufTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0NhbWVsQ2FzZShzdHIpIHtcclxuICAgIC8vIFJlbW92ZSBhbGwgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCByZXBsYWNlIHNwYWNlcyB3aXRoIHVuZGVyc2NvcmVzXHJcbiAgICBjb25zdCBjbGVhbmVkID0gc3RyLnJlcGxhY2UoL1teYS16QS1aMC05X10vZywgXCJcIikucmVwbGFjZSgvXFxzKy9nLCBcIl9cIik7XHJcbiAgICAvLyBTcGxpdCB0aGUgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygd29yZHNcclxuICAgIGNvbnN0IHdvcmRzID0gY2xlYW5lZC5zcGxpdChcIl9cIik7XHJcbiAgICAvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkIChleGNlcHQgdGhlIGZpcnN0IHdvcmQpXHJcbiAgICBjb25zdCBjYXBpdGFsaXplZCA9IHdvcmRzXHJcbiAgICAgICAgLm1hcCgod29yZCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICByZXR1cm4gY2FwaXRhbGl6ZWQuY2hhckF0KDApLnRvTG9jYWxlTG93ZXJDYXNlKCkgKyBjYXBpdGFsaXplZC5zbGljZSgxKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbih4LCB5LCBkaXN0YW5jZSwgYW5nbGUpIHtcclxuICAgIC8vIENvbnZlcnQgYW5nbGUgZnJvbSBkZWdyZWVzIHRvIHJhZGlhbnNcclxuICAgIGNvbnN0IHJhZGlhbnMgPSBhbmdsZSAqIChNYXRoLlBJIC8gMTgwKTtcclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgbmV3IHggYW5kIHkgY29vcmRpbmF0ZXNcclxuICAgIGNvbnN0IG5ld1ggPSB4ICsgZGlzdGFuY2UgKiBNYXRoLmNvcyhyYWRpYW5zKTtcclxuICAgIGNvbnN0IG5ld1kgPSB5ICsgZGlzdGFuY2UgKiBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0cmFuc2xhdGlvbiBmcm9tIFwiLi9sYW5ndWFnZVwiO1xyXG5pbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudHMvZWxlbWVudCc7XHJcbmltcG9ydCAqIGFzIFRleHR1cmVzIGZyb20gJy4vZWxlbWVudHMvdGV4dHVyZXMnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xyXG4gICAgdGl0bGU6ICdNVEEgRXhwb3J0ZXIgMi4wIGJ5IEBib3JzdWN6eW5hJyxcclxuICAgIHdpZHRoOiAzMDAsXHJcbiAgICBoZWlnaHQ6IDQ1MCxcclxuICAgIHZpc2libGU6IHRydWVcclxufSk7XHJcbmZ1bmN0aW9uIGV4cG9ydEZyYW1lKGZyYW1lLCBhbGlnbikge1xyXG4gICAgbGV0IG9mZnNldCA9IHtcclxuICAgICAgICB4OiBmcmFtZS54LFxyXG4gICAgICAgIHk6IGZyYW1lLnksXHJcbiAgICAgICAgd2lkdGg6IGZyYW1lLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZnJhbWUuaGVpZ2h0LFxyXG4gICAgICAgIGFsaWduOiBhbGlnblxyXG4gICAgfTtcclxuICAgIGxldCBkYXRhID0gRWxlbWVudC5wcm9jZXNzTm9kZShmcmFtZSwgb2Zmc2V0LCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IGNvZGUgPSBkYXRhLmNvZGU7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgLy8gcmVtb3ZlIGxhc3QgbmV3IGxpbmUgZnJvbSBjb2RlIGFuZCBtZXRhQ29kZVxyXG4gICAgY29kZSA9IGNvZGUuc2xpY2UoMCwgLTEpO1xyXG4gICAgbWV0YUNvZGUgPSBtZXRhQ29kZS5zbGljZSgwLCAtMSk7XHJcbiAgICBjb2RlID0gc2V0dGluZ3MuY29kZVRlbXBsYXRlLnJlcGxhY2UoJzxDT0RFPicsIGNvZGUpLnJlcGxhY2UoJzxURVhUVVJFUz4nLCBUZXh0dXJlcy5nZXRUZXh0dXJlc0NvZGUoKSkucmVwbGFjZSgnPFZBUklBQkxFUz4nLCBFbGVtZW50LmdldFZhcmlhYmxlcygpKTtcclxuICAgIG1ldGFDb2RlID0gc2V0dGluZ3MubWV0YVRlbXBsYXRlLnJlcGxhY2UoJzxGSUxFX1NPVVJDRVM+JywgbWV0YUNvZGUpO1xyXG4gICAgY29kZSA9IGNvZGUudHJpbSgpO1xyXG4gICAgZmlnbWEuc2hvd1VJKGA8c2NyaXB0PlxyXG4gICAgZnVuY3Rpb24gb3BlblVSTCh1cmwsIGFyZ3VtZW50cykge1xyXG4gICAgICAgIHZhciBhcmd1bWVudHNTdHJpbmcgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKSk7XHJcbiAgICAgICAgdmFyIGZpbmFsVXJsID0gdXJsICsgXCI/YXJndW1lbnRzPVwiICsgYXJndW1lbnRzU3RyaW5nO1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKGZpbmFsVXJsLCBcIl9ibGFua1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuVVJMKCdodHRwOi8vbG9jYWxob3N0OjgwODAvJywge1xyXG4gICAgICAgIGZpbGVzOiB7XHJcbiAgICAgICAgICAgICdtZXRhLnhtbCc6IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFxcYCR7bWV0YUNvZGV9XFxgLFxyXG4gICAgICAgICAgICAgICAgbGFuZzogJ3htbCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICdjbGllbnQubHVhJzoge1xyXG4gICAgICAgICAgICAgICAgY29kZTogXFxgJHtjb2RlfVxcYCxcclxuICAgICAgICAgICAgICAgIGxhbmc6ICdsdWEnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAndXNlZnVsLmx1YSc6IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFxcYCR7c2V0dGluZ3MudXNlZnVsQ29kZX1cXGAsXHJcbiAgICAgICAgICAgICAgICBsYW5nOiAnbHVhJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIDwvc2NyaXB0PmAsIHtcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdNVEEgRXhwb3J0ZXIgYnkgYm9yc3VrJyxcclxuICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH0sIDEwMDApO1xyXG59XHJcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICBpZiAobXNnLnR5cGUgPT09ICdleHBvcnQtYXMtY29kZScpIHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9ucyA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcclxuICAgICAgICBpZiAoc2VsZWN0aW9ucy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIGZpZ21hLm5vdGlmeSh0cmFuc2xhdGlvbignbm8tc2VsZWN0aW9uJyksIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbnMubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgcmV0dXJuIGZpZ21hLm5vdGlmeSh0cmFuc2xhdGlvbignbW9yZS10aGFuLW9uZScpLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb24gPSBzZWxlY3Rpb25zWzBdO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb24udHlwZSAhPSAnRlJBTUUnKVxyXG4gICAgICAgICAgICByZXR1cm4gZmlnbWEubm90aWZ5KHRyYW5zbGF0aW9uKCduby1mcmFtZScpLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIFRleHR1cmVzLnJlc2V0VGV4dHVyZXMoKTtcclxuICAgICAgICBFbGVtZW50LnJlc2V0VmFyaWFibGVzKCk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldEZvY3VzRWxlbWVudHMoKTtcclxuICAgICAgICBFbGVtZW50LnJlc2V0Q3VycmVudFZhcmlhYmxlKCk7XHJcbiAgICAgICAgRWxlbWVudC5zZXRNYWluRnJhbWUoc2VsZWN0aW9uKTtcclxuICAgICAgICBzZXR0aW5ncy56b29tID0gbXNnLnVzZVpvb207XHJcbiAgICAgICAgc2V0dGluZ3Mud29yZFdyYXAgPSBtc2cud29yZFdyYXA7XHJcbiAgICAgICAgZXhwb3J0RnJhbWUoc2VsZWN0aW9uLCBtc2cuYWxpZ24pO1xyXG4gICAgICAgIEVsZW1lbnQuZm9jdXNPbkVsZW1lbnRzKHNlbGVjdGlvbik7XHJcbiAgICB9XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==