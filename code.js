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
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../main */ "./src/main.ts");







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
    if (!element.visible)
        return { code: '', metaCode: '' };
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
        (0,_main__WEBPACK_IMPORTED_MODULE_6__.clog)(_text__WEBPACK_IMPORTED_MODULE_5__.process(element, offset));
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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clog": () => (/* binding */ clog)
/* harmony export */ });
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
    while (code.includes('<!newline!>')) {
        code = code.replace('<!newline!>', '\\n');
    }
    clog(_settings__WEBPACK_IMPORTED_MODULE_2__.settings.usefulCode);
    clog(metaCode);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekRPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOzs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2VsZW1lbnRzL3Jhdy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvcmVjdGFuZ2xlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy90ZXh0LnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9lbGVtZW50cy90ZXh0dXJlcy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvZWxlbWVudHMvdmFyaWFibGUudHMiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyLy4vc3JjL2xhbmd1YWdlLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci8uL3NyYy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvLi9zcmMvdXNlZnVsLnRzIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NVEEtRXhwb3J0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL01UQS1FeHBvcnRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vTVRBLUV4cG9ydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBnZXRQb2ludEZyb21EaXN0YW5jZVJvdGF0aW9uIH0gZnJvbSBcIi4uL3VzZWZ1bFwiO1xyXG5pbXBvcnQgKiBhcyBSZWN0YW5nbGUgZnJvbSAnLi9yZWN0YW5nbGUnO1xyXG5pbXBvcnQgKiBhcyBSYXcgZnJvbSAnLi9yYXcnO1xyXG5pbXBvcnQgKiBhcyBWYXJpYWJsZSBmcm9tICcuL3ZhcmlhYmxlJztcclxuaW1wb3J0ICogYXMgVGV4dCBmcm9tICcuL3RleHQnO1xyXG5pbXBvcnQgeyBjbG9nIH0gZnJvbSBcIi4uL21haW5cIjtcclxubGV0IGZvY3VzRWxlbWVudHMgPSBbXTtcclxubGV0IGZvY3VzRWxlbWVudHNOYW1lcyA9IFtdO1xyXG5sZXQgdmFyaWFibGVzID0ge307XHJcbmxldCBtYWluRnJhbWU7XHJcbmxldCBjdXJyZW50VmFyaWFibGUgPSB1bmRlZmluZWQ7XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEN1cnJlbnRWYXJpYWJsZSgpIHtcclxuICAgIGN1cnJlbnRWYXJpYWJsZSA9IHVuZGVmaW5lZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWFpbkZyYW1lKGZyYW1lKSB7XHJcbiAgICBtYWluRnJhbWUgPSBmcmFtZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRGb2N1c0VsZW1lbnRzKCkge1xyXG4gICAgZm9jdXNFbGVtZW50cyA9IFtdO1xyXG4gICAgZm9jdXNFbGVtZW50c05hbWVzID0gW107XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVZhcmlhYmxlUG9zaXRpb24obmFtZSwgcG9zaXRpb24pIHtcclxuICAgIHZhcmlhYmxlc1tuYW1lXSA9IHBvc2l0aW9uO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gMDtcclxuICAgIGZvciAobGV0IG5hbWUgaW4gdmFyaWFibGVzKVxyXG4gICAgICAgIGxlbmd0aCsrO1xyXG4gICAgaWYgKGxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIGxldCBjb2RlID0gJ2xvY2FsIHNldHRpbmdzID0ge1xcbic7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIHZhcmlhYmxlcykge1xyXG4gICAgICAgIGNvZGUgKz0gYFxcdFsnJHtuYW1lfSddID0geyR7dmFyaWFibGVzW25hbWVdfX1cXG5gO1xyXG4gICAgfVxyXG4gICAgY29kZSArPSAnfSc7XHJcbiAgICByZXR1cm4gY29kZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRWYXJpYWJsZXMoKSB7XHJcbiAgICB2YXJpYWJsZXMgPSB7fTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNNYXNrR3JvdXAobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCdpc01hc2snIGluIGNoaWxkICYmIGNoaWxkLmlzTWFzaylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWJzb2x1dGVQb3NpdGlvbihwb3NpdGlvbiwgYW5nbGUpIHtcclxuICAgIGxldCBsdCA9IHsgeDogcG9zaXRpb24ueCwgeTogcG9zaXRpb24ueSB9O1xyXG4gICAgbGV0IHJ0ID0gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbihwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi53aWR0aCwgYW5nbGUpO1xyXG4gICAgbGV0IGxiID0gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbihwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi5oZWlnaHQsIGFuZ2xlICsgOTApO1xyXG4gICAgbGV0IHJiID0gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbihydC54LCBydC55LCBwb3NpdGlvbi5oZWlnaHQsIGFuZ2xlICsgOTApO1xyXG4gICAgbGV0IHggPSBNYXRoLm1pbihsdC54LCBydC54LCBsYi54LCByYi54KTtcclxuICAgIGxldCB5ID0gTWF0aC5taW4obHQueSwgcnQueSwgbGIueSwgcmIueSk7XHJcbiAgICBsZXQgdHggPSBNYXRoLm1heChsdC54LCBydC54LCBsYi54LCByYi54KTtcclxuICAgIGxldCB0eSA9IE1hdGgubWF4KGx0LnksIHJ0LnksIGxiLnksIHJiLnkpO1xyXG4gICAgbGV0IHdpZHRoID0gdHggLSB4O1xyXG4gICAgbGV0IGhlaWdodCA9IHR5IC0geTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICB5OiB5LFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgaWYgKGZvY3VzRWxlbWVudHNOYW1lcy5pbmRleE9mKG5hbWUpICE9IC0xKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGZvY3VzRWxlbWVudHNOYW1lcy5wdXNoKG5hbWUpO1xyXG4gICAgZm9jdXNFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb2N1c09uRWxlbWVudHMoZnJhbWUpIHtcclxuICAgIC8vIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhbZnJhbWVdIHx8IGZvY3VzRWxlbWVudHMpO1xyXG4gICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gZm9jdXNFbGVtZW50cztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9zaXRpb24ocG9zaXRpb24sIG9mZnNldCwgbm9Xb3JkV3JhcCA9IGZhbHNlLCB0ZXh0WEFsaWduID0gJ2xlZnQnLCB0ZXh0WUFsaWduID0gJ3RvcCcpIHtcclxuICAgIGxldCB4ID0gcG9zaXRpb24ueDtcclxuICAgIGxldCB5ID0gcG9zaXRpb24ueTtcclxuICAgIGxldCB3aWR0aCA9IHBvc2l0aW9uLndpZHRoO1xyXG4gICAgbGV0IGhlaWdodCA9IHBvc2l0aW9uLmhlaWdodDtcclxuICAgIGxldCB6b29tID0gc2V0dGluZ3Muem9vbSA/ICcvem9vbScgOiAnJztcclxuICAgIGxldCB4QWxpZ24gPSBvZmZzZXQuYWxpZ24uY2hhckF0KDApO1xyXG4gICAgbGV0IHlBbGlnbiA9IG9mZnNldC5hbGlnbi5jaGFyQXQoMSk7XHJcbiAgICBpZiAobm9Xb3JkV3JhcCkge1xyXG4gICAgICAgIGxldCB4cyA9ICcnLCB5cyA9ICcnO1xyXG4gICAgICAgIGlmICh4QWxpZ24gPT0gJ0wnKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0WEFsaWduID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYCR7eH0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHhzID0gYCR7eCArIHdpZHRoIC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAncmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgJHt4ICsgd2lkdGh9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnQycpIHtcclxuICAgICAgICAgICAgeCA9IHggLSBvZmZzZXQud2lkdGggLyAyO1xyXG4gICAgICAgICAgICBpZiAodGV4dFhBbGlnbiA9PSAnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeC8yICsgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3gvMiArICR7eCArIHdpZHRoIC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFhBbGlnbiA9PSAncmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3gvMiArICR7eCArIHdpZHRofSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh4QWxpZ24gPT0gJ1InKSB7XHJcbiAgICAgICAgICAgIHggPSBvZmZzZXQud2lkdGggLSB4O1xyXG4gICAgICAgICAgICBpZiAodGV4dFhBbGlnbiA9PSAnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICB4cyA9IGBzeCAtICR7eCArIHdpZHRofSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WEFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeHMgPSBgc3ggLSAke3ggKyB3aWR0aCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRYQWxpZ24gPT0gJ3JpZ2h0JylcclxuICAgICAgICAgICAgICAgIHhzID0gYHN4IC0gJHt4fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeUFsaWduID09ICdUJykge1xyXG4gICAgICAgICAgICBpZiAodGV4dFlBbGlnbiA9PSAndG9wJylcclxuICAgICAgICAgICAgICAgIHlzID0gYCR7eX0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHlzID0gYCR7eSArIGhlaWdodCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2JvdHRvbScpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGAke3kgKyBoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBbGlnbiA9PSAnTScpIHtcclxuICAgICAgICAgICAgeSA9IHkgLSBvZmZzZXQuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgaWYgKHRleHRZQWxpZ24gPT0gJ3RvcCcpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeS8yICsgJHt5fSR7em9vbX1gO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0ZXh0WUFsaWduID09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgeXMgPSBgc3kvMiArICR7eSArIGhlaWdodCAvIDJ9JHt6b29tfWA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRleHRZQWxpZ24gPT0gJ2JvdHRvbScpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeS8yICsgJHt5ICsgaGVpZ2h0fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ0InKSB7XHJcbiAgICAgICAgICAgIHkgPSBvZmZzZXQuaGVpZ2h0IC0geTtcclxuICAgICAgICAgICAgaWYgKHRleHRZQWxpZ24gPT0gJ3RvcCcpXHJcbiAgICAgICAgICAgICAgICB5cyA9IGBzeSAtICR7eSArIGhlaWdodH0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5IC0gJHt5ICsgaGVpZ2h0IC8gMn0ke3pvb219YDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dFlBbGlnbiA9PSAnYm90dG9tJylcclxuICAgICAgICAgICAgICAgIHlzID0gYHN5IC0gJHt5fSR7em9vbX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7eHN9LCAke3lzfSwgbmlsLCBuaWxgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKHhBbGlnbiA9PSAnTCcpXHJcbiAgICAgICAgICAgIHggPSBgJHt4fSR7em9vbX1gO1xyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnQycpIHtcclxuICAgICAgICAgICAgeCA9IHggLSBvZmZzZXQud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB4ID0gYHN4LzIgKyAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhBbGlnbiA9PSAnUicpIHtcclxuICAgICAgICAgICAgeCA9IG9mZnNldC53aWR0aCAtIHg7XHJcbiAgICAgICAgICAgIHggPSBgc3ggLSAke3h9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5QWxpZ24gPT0gJ1QnKVxyXG4gICAgICAgICAgICB5ID0gYCR7eX0ke3pvb219YDtcclxuICAgICAgICBlbHNlIGlmICh5QWxpZ24gPT0gJ00nKSB7XHJcbiAgICAgICAgICAgIHkgPSB5IC0gb2Zmc2V0LmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHkgPSBgc3kvMiArICR7eX0ke3pvb219YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUFsaWduID09ICdCJykge1xyXG4gICAgICAgICAgICB5ID0gb2Zmc2V0LmhlaWdodCAtIHk7XHJcbiAgICAgICAgICAgIHkgPSBgc3kgLSAke3l9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50VmFyaWFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBzZXR0aW5nc1snJHtjdXJyZW50VmFyaWFibGV9J11bMV0gKyAke3h9JHt6b29tfSwgc2V0dGluZ3NbJyR7Y3VycmVudFZhcmlhYmxlfSddWzJdICsgJHt5fSR7em9vbX0sICR7d2lkdGh9JHt6b29tfSwgJHtoZWlnaHR9JHt6b29tfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHt4fSwgJHt5fSwgJHt3aWR0aH0ke3pvb219LCAke2hlaWdodH0ke3pvb219YDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdG9Db2xvcihjb2xvcikge1xyXG4gICAgcmV0dXJuIGB0b2NvbG9yKCR7TWF0aC5mbG9vcihjb2xvci5jb2xvci5yICogMjU1KX0sICR7TWF0aC5mbG9vcihjb2xvci5jb2xvci5nICogMjU1KX0sICR7TWF0aC5mbG9vcihjb2xvci5jb2xvci5iICogMjU1KX0sICR7TWF0aC5mbG9vcihjb2xvci5vcGFjaXR5ICogMjU1KX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc05vZGUoZWxlbWVudCwgb2Zmc2V0LCB2YXJpYWJsZSkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBtZXRhQ29kZSA9ICcnO1xyXG4gICAgbGV0IHByZVZhcmlhYmxlID0gdmFyaWFibGU7XHJcbiAgICBpZiAoZWxlbWVudC50eXBlID09ICdGUkFNRScgJiYgZWxlbWVudCAhPSBtYWluRnJhbWUpIHtcclxuICAgICAgICB2YXJpYWJsZSA9IFZhcmlhYmxlLnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCB2YXJpYWJsZSk7XHJcbiAgICAgICAgY3VycmVudFZhcmlhYmxlID0gdmFyaWFibGU7XHJcbiAgICB9XHJcbiAgICAvLyBjb2RlICs9IGAtLSAke2VsZW1lbnQudHlwZX06ICR7ZWxlbWVudC5uYW1lfSAke2N1cnJlbnRWYXJpYWJsZSB8fCAnJ31cXG5gO1xyXG4gICAgaWYgKCFlbGVtZW50LnZpc2libGUpXHJcbiAgICAgICAgcmV0dXJuIHsgY29kZTogJycsIG1ldGFDb2RlOiAnJyB9O1xyXG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PSAnR1JPVVAnICYmIGVsZW1lbnQubmFtZS5zdGFydHNXaXRoKCc8c2luZ2xlPicpKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnX3NpbmdsZV8nICsgZWxlbWVudC5uYW1lLnNsaWNlKCc8c2luZ2xlPicubGVuZ3RoKTtcclxuICAgICAgICBsZXQgZGF0YSA9IFJhdy5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgbmFtZSk7XHJcbiAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgbWV0YUNvZGUgKz0gZGF0YS5tZXRhQ29kZTtcclxuICAgICAgICBhZGRGb2N1c0VsZW1lbnQoZWxlbWVudCwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc01hc2tHcm91cChlbGVtZW50KSB8fCBlbGVtZW50LnR5cGUgPT0gJ1ZFQ1RPUicpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IFJhdy5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgZWxlbWVudC5uYW1lKTtcclxuICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIGFkZEZvY3VzRWxlbWVudChlbGVtZW50LCBlbGVtZW50Lm5hbWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoJ2NoaWxkcmVuJyBpbiBlbGVtZW50KSB7XHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgZWxlbWVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHByb2Nlc3NOb2RlKGNoaWxkLCBvZmZzZXQsIHZhcmlhYmxlKTtcclxuICAgICAgICAgICAgY29kZSArPSBkYXRhLmNvZGU7XHJcbiAgICAgICAgICAgIG1ldGFDb2RlICs9IGRhdGEubWV0YUNvZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PSAnUkVDVEFOR0xFJykge1xyXG4gICAgICAgIGxldCBkYXRhID0gUmVjdGFuZ2xlLnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KTtcclxuICAgICAgICBjb2RlICs9IGRhdGEuY29kZTtcclxuICAgICAgICBtZXRhQ29kZSArPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgICAgIGFkZEZvY3VzRWxlbWVudChlbGVtZW50LCBlbGVtZW50Lm5hbWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZWxlbWVudC50eXBlID09ICdURVhUJykge1xyXG4gICAgICAgIGNvZGUgKz0gVGV4dC5wcm9jZXNzKGVsZW1lbnQsIG9mZnNldCk7XHJcbiAgICAgICAgY2xvZyhUZXh0LnByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0KSk7XHJcbiAgICB9XHJcbiAgICB2YXJpYWJsZSA9IHByZVZhcmlhYmxlO1xyXG4gICAgY3VycmVudFZhcmlhYmxlID0gdmFyaWFibGU7XHJcbiAgICAvLyB3eWplYmFjIGxvYWRUZXh0dXJlc1xyXG4gICAgLy8gbmllIGVrc3BvcnRvd2FjIGtpbGthIHRha2ljaCBzYW15Y2hcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKyAtL2csICctICcpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwrIDBcXC96b29tL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLy0gMFxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwrIDAvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvLSAwL2csICcnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcKiAxXFwvem9vbS9nLCAnJyk7XHJcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXC8gMVxcL3pvb20vZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwqIDEvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFwvIDEvZywgJycpO1xyXG4gICAgY29kZSA9IGNvZGUucmVwbGFjZSgvKFxcZCtcXC5cXGR7M30pXFxkKy9nLCAnJDEnKTtcclxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoLyAsL2csICcsJyk7XHJcbiAgICByZXR1cm4geyBjb2RlLCBtZXRhQ29kZSB9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuaW1wb3J0ICogYXMgVGV4dHVyZXMgZnJvbSAnLi90ZXh0dXJlcyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzKGVsZW1lbnQsIG9mZnNldCwgbmFtZSkge1xyXG4gICAgbGV0IGNvZGUgPSAnJztcclxuICAgIGxldCBtZXRhQ29kZSA9ICcnO1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gRWZmZWN0c1xyXG4gICAgLy8gQFRPRE9cclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sICdyb3RhdGlvbicgaW4gZWxlbWVudCA/IGVsZW1lbnQucm90YXRpb24gOiAwKTtcclxuICAgIGxldCBwb3NpdGlvbiA9IEVsZW1lbnQuZ2V0UG9zaXRpb24oZWxlbWVudFBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgLy8gR2VuZXJhdGUgY29kZVxyXG4gICAgY29kZSA9IGBcXHRkeERyYXdJbWFnZSgke3Bvc2l0aW9ufSwgJyR7VGV4dHVyZXMuaW1hZ2VQYXRoKG5hbWUpfScpXFxuYDtcclxuICAgIG1ldGFDb2RlID0gYFxcdDxmaWxlIHNyYz1cIiR7VGV4dHVyZXMuaW1hZ2VQYXRoKG5hbWUpfVwiLz5cXG5gO1xyXG4gICAgcmV0dXJuIHsgY29kZSwgbWV0YUNvZGUgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmltcG9ydCAqIGFzIFRleHR1cmVzIGZyb20gJy4vdGV4dHVyZXMnO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyhlbGVtZW50LCBvZmZzZXQpIHtcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSAnJztcclxuICAgIGxldCBlbGVtZW50UG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogZWxlbWVudC54LFxyXG4gICAgICAgIHk6IGVsZW1lbnQueSxcclxuICAgICAgICB3aWR0aDogZWxlbWVudC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVsZW1lbnQuaGVpZ2h0LFxyXG4gICAgfTtcclxuICAgIC8vIFN0cm9rZXNcclxuICAgIGxldCBvZmZTaXplID0gMDtcclxuICAgIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdPVVRTSURFJykge1xyXG4gICAgICAgIG9mZlNpemUgPSBlbGVtZW50LnN0cm9rZVdlaWdodDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQuc3Ryb2tlQWxpZ24gPT0gJ0NFTlRFUicpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQgLyAyO1xyXG4gICAgfVxyXG4gICAgLy8gRWZmZWN0c1xyXG4gICAgLy8gQFRPRE9cclxuICAgIGVsZW1lbnRQb3NpdGlvbi54IC09IG9mZlNpemU7XHJcbiAgICBlbGVtZW50UG9zaXRpb24ueSAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLndpZHRoICs9IG9mZlNpemUgKiAyO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLmhlaWdodCArPSBvZmZTaXplICogMjtcclxuICAgIC8vIENhbGN1bGF0ZSBhYnNvbHV0ZSBwb3NpdGlvbiBkZXBlbmRpbmcgb24gcm90YXRpb25cclxuICAgIGVsZW1lbnRQb3NpdGlvbiA9IEVsZW1lbnQuZ2V0QWJzb2x1dGVQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIGVsZW1lbnQucm90YXRpb24pO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCk7XHJcbiAgICAvLyBHZW5lcmF0ZSBjb2RlXHJcbiAgICBjb2RlID0gYFxcdGR4RHJhd0ltYWdlKCR7cG9zaXRpb259LCAnJHtUZXh0dXJlcy5pbWFnZVBhdGgoZWxlbWVudC5uYW1lKX0nKVxcbmA7XHJcbiAgICBtZXRhQ29kZSA9IGBcXHQ8ZmlsZSBzcmM9XCIke1RleHR1cmVzLmltYWdlUGF0aChlbGVtZW50Lm5hbWUpfVwiLz5cXG5gO1xyXG4gICAgcmV0dXJuIHsgY29kZSwgbWV0YUNvZGUgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MnO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2VzcyhlbGVtZW50LCBvZmZzZXQpIHtcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBsZXQgZWxlbWVudFBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6IGVsZW1lbnQueCxcclxuICAgICAgICB5OiBlbGVtZW50LnksXHJcbiAgICAgICAgd2lkdGg6IGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmhlaWdodCxcclxuICAgIH07XHJcbiAgICAvLyBTdHJva2VzXHJcbiAgICBsZXQgb2ZmU2l6ZSA9IDA7XHJcbiAgICBpZiAoZWxlbWVudC5zdHJva2VBbGlnbiA9PSAnT1VUU0lERScpIHtcclxuICAgICAgICBvZmZTaXplID0gZWxlbWVudC5zdHJva2VXZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChlbGVtZW50LnN0cm9rZUFsaWduID09ICdDRU5URVInKSB7XHJcbiAgICAgICAgb2ZmU2l6ZSA9IGVsZW1lbnQuc3Ryb2tlV2VpZ2h0IC8gMjtcclxuICAgIH1cclxuICAgIC8vIEVmZmVjdHNcclxuICAgIC8vIEBUT0RPXHJcbiAgICBlbGVtZW50UG9zaXRpb24ueCAtPSBvZmZTaXplO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uLnkgLT0gb2ZmU2l6ZTtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi53aWR0aCArPSBvZmZTaXplICogMjtcclxuICAgIGVsZW1lbnRQb3NpdGlvbi5oZWlnaHQgKz0gb2ZmU2l6ZSAqIDI7XHJcbiAgICAvLyBDYWxjdWxhdGUgYWJzb2x1dGUgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHJvdGF0aW9uXHJcbiAgICBsZXQgeEFsaWduID0gZWxlbWVudC50ZXh0QWxpZ25Ib3Jpem9udGFsLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgeUFsaWduID0gZWxlbWVudC50ZXh0QWxpZ25WZXJ0aWNhbC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHpvb20gPSBzZXR0aW5ncy56b29tID8gJy96b29tJyA6ICcnO1xyXG4gICAgZWxlbWVudFBvc2l0aW9uID0gRWxlbWVudC5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgZWxlbWVudC5yb3RhdGlvbik7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBFbGVtZW50LmdldFBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgb2Zmc2V0LCAhc2V0dGluZ3Mud29yZFdyYXAsIHhBbGlnbiwgeUFsaWduKTtcclxuICAgIGxldCBbeCwgeSwgdywgaF0gPSBwb3NpdGlvbi5zcGxpdCgnLCcpLm1hcChlID0+IGUudHJpbSgpKTtcclxuICAgIGlmIChzZXR0aW5ncy53b3JkV3JhcCkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gYCR7eH0sICR7eX0sICgke3h9KSArICgke3d9KSwgKCR7eX0pICsgKCR7aH0pYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHBvc2l0aW9uID0gYCR7eH0sICR7eX0sIG5pbCwgbmlsYDtcclxuICAgIH1cclxuICAgIGxldCBjb2xvciA9IGVsZW1lbnQuZmlsbHNbMF07XHJcbiAgICBpZiAoY29sb3IpIHtcclxuICAgICAgICBsZXQgdGV4dCA9IGVsZW1lbnQuY2hhcmFjdGVycztcclxuICAgICAgICB3aGlsZSAodGV4dC5pbmNsdWRlcygnXFxuJykpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgnXFxuJywgJzwhbmV3bGluZSE+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzaXplID0gcGFyc2VGbG9hdChlbGVtZW50LmZvbnRTaXplLnRvTG9jYWxlU3RyaW5nKCkpIC8gMS41O1xyXG4gICAgICAgIGxldCBmb250ID0gYGdldEZpZ21hRm9udCgnJHtlbGVtZW50LmZvbnROYW1lLmZhbWlseX0tJHtlbGVtZW50LmZvbnROYW1lLnN0eWxlfScsICR7c2l6ZX0ke3pvb219KWA7XHJcbiAgICAgICAgY29kZSA9IGBcXHRkeERyYXdUZXh0KCcke3RleHR9JywgJHtwb3NpdGlvbn0sICR7RWxlbWVudC50b0NvbG9yKGNvbG9yKX0sIDEsICR7Zm9udH0sICcke3hBbGlnbn0nLCAnJHt5QWxpZ259JyR7c2V0dGluZ3Mud29yZFdyYXAgPyAnLCBmYWxzZSwgdHJ1ZScgOiAnJ30pXFxuYDtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlO1xyXG59XHJcbiIsImltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IGNvbnZlcnRUb0NhbWVsQ2FzZSB9IGZyb20gXCIuLi91c2VmdWxcIjtcclxubGV0IHRleHR1cmVzID0gW107XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldFRleHR1cmVzKCkge1xyXG4gICAgdGV4dHVyZXMgPSBbXTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VQYXRoKGlucHV0KSB7XHJcbiAgICBjb25zdCBjbGVhbmVkID0gaW5wdXQucmVwbGFjZSgvW15hLXpBLVowLTlfLV0vZywgJycpO1xyXG4gICAgLy8gY29uc3QgdHJ1bmNhdGVkID0gY2xlYW5lZC5zdWJzdHJpbmcoMCwgMTYpO1xyXG4gICAgLy8gcmV0dXJuIGAke3NldHRpbmdzLnBhdGh9JHt0cnVuY2F0ZWR9LnBuZ2A7XHJcbiAgICByZXR1cm4gYCR7c2V0dGluZ3MucGF0aH0ke2lucHV0fS5wbmdgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB2YXJpYWJsZU5hbWUoaW5wdXQpIHtcclxuICAgIGNvbnN0IGNsZWFuZWQgPSBpbnB1dC5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csICcnKTtcclxuICAgIC8vIGNvbnN0IHRydW5jYXRlZCA9IGNsZWFuZWQuc3Vic3RyaW5nKDAsIDE2KTtcclxuICAgIHJldHVybiBjbGVhbmVkLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHR1cmVWYXJpYWJsZSh0ZXh0dXJlKSB7XHJcbiAgICByZXR1cm4gY29udmVydFRvQ2FtZWxDYXNlKHRleHR1cmUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUZXh0dXJlKHRleHR1cmUpIHtcclxuICAgIGlmICh0ZXh0dXJlcy5maW5kKGUgPT4gZS50ZXh0dXJlID09IHRleHR1cmUpICE9IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm47XHJcbiAgICBsZXQgdmFyaWFibGUgPSBnZXRUZXh0dXJlVmFyaWFibGUodGV4dHVyZSk7XHJcbiAgICAvLyBsZXQgdGVtcFZhcmlhYmxlID0gdmFyaWFibGU7XHJcbiAgICAvLyBsZXQgaSA9IDE7XHJcbiAgICAvLyB3aGlsZSh0ZXh0dXJlcy5maW5kKGUgPT4gZS52YXJpYWJsZSA9PSB0ZW1wVmFyaWFibGUpICE9IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICAgIHRlbXBWYXJpYWJsZSA9IHZhcmlhYmxlICsgKGkrKyk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyB2YXJpYWJsZSA9IHRlbXBWYXJpYWJsZTtcclxuICAgIHRleHR1cmVzLnB1c2goe1xyXG4gICAgICAgIHZhcmlhYmxlOiB2YXJpYWJsZSxcclxuICAgICAgICB0ZXh0dXJlOiBpbWFnZVBhdGgodGV4dHVyZSlcclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50JztcclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3MoZWxlbWVudCwgb2Zmc2V0LCB2YXJpYWJsZSkge1xyXG4gICAgbGV0IGVsZW1lbnRQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlbGVtZW50LngsXHJcbiAgICAgICAgeTogZWxlbWVudC55LFxyXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZWxlbWVudC5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHBvc2l0aW9uIGRlcGVuZGluZyBvbiByb3RhdGlvblxyXG4gICAgZWxlbWVudFBvc2l0aW9uID0gRWxlbWVudC5nZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW1lbnRQb3NpdGlvbiwgJ3JvdGF0aW9uJyBpbiBlbGVtZW50ID8gZWxlbWVudC5yb3RhdGlvbiA6IDApO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gRWxlbWVudC5nZXRQb3NpdGlvbihlbGVtZW50UG9zaXRpb24sIG9mZnNldCk7XHJcbiAgICB2YXJpYWJsZSA9IGVsZW1lbnQubmFtZTtcclxuICAgIEVsZW1lbnQuZGVmaW5lVmFyaWFibGVQb3NpdGlvbihlbGVtZW50Lm5hbWUsIHBvc2l0aW9uKTtcclxuICAgIC8vIEdlbmVyYXRlIGNvZGVcclxuICAgIHJldHVybiB2YXJpYWJsZTtcclxufVxyXG4iLCI7XHJcbmxldCBsYW5ndWFnZSA9ICdFTic7XHJcbmNvbnN0IGxhbmd1YWdlcyA9IHtcclxuICAgICdQTCc6IHtcclxuICAgICAgICAnbm8tc2VsZWN0aW9uJzogJ05pZSB3eWJyYW5vIMW8YWRuZWdvIGVsZW1lbnR1JyxcclxuICAgICAgICAnbW9yZS10aGFuLW9uZSc6ICdaYXpuYWN6b25vIHdpxJljZWogbmnFvCBqZWRlbiBlbGVtZW50JyxcclxuICAgICAgICAnbm8tZnJhbWUnOiAnWmF6bmFjem9ueSBlbGVtZW50IHRvIG5pZSBmcmFtZScsXHJcbiAgICAgICAgJ2V4cG9ydC1zdWNjZXNzJzogJ0Vrc3BvcnQgemFrb8WEY3pvbnkgc3VrY2VzZW0nLFxyXG4gICAgICAgICdleHBvcnQtZmFpbGVkJzogJ0Vrc3BvcnQgemFrb8WEY3pvbnkgbmllcG93b2R6ZW5pZW0nLFxyXG4gICAgICAgICdjb2RlLXJlYWR5JzogJ0tvZCBqZXN0IGdvdG93eSB3IGtvbnNvbGknLFxyXG4gICAgfSxcclxuICAgICdFTic6IHtcclxuICAgICAgICAnbm8tc2VsZWN0aW9uJzogJ1RoZXJlXFwncyBub3RoaW5nIHNlbGVjdGVkJyxcclxuICAgICAgICAnbW9yZS10aGFuLW9uZSc6ICdUaGVyZVxcJ3MgbW9yZSB0aGFuIG9uZSBlbGVtZW50IHNlbGVjdGVkJyxcclxuICAgICAgICAnbm8tZnJhbWUnOiAnU2VsZWN0ZWQgZWxlbWVudCBpc25cXCd0IGZyYW1lJyxcclxuICAgICAgICAnZXhwb3J0LXN1Y2Nlc3MnOiAnRXhwb3J0IGZpbmlzaGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgJ2V4cG9ydC1mYWlsZWQnOiAnRXhwb3J0IGZpbmlzaGVkIHdpdGggZXJyb3InLFxyXG4gICAgICAgICdjb2RlLXJlYWR5JzogJ0NvZGUgaXMgcmVhZHkgaW4gY29uc29sZScsXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zbGF0aW9uKGtleSkge1xyXG4gICAgcmV0dXJuIGxhbmd1YWdlc1tsYW5ndWFnZV0gJiYgbGFuZ3VhZ2VzW2xhbmd1YWdlXVtrZXldIHx8IGtleTtcclxufVxyXG4iLCJpbXBvcnQgdHJhbnNsYXRpb24gZnJvbSBcIi4vbGFuZ3VhZ2VcIjtcclxuaW1wb3J0ICogYXMgRWxlbWVudCBmcm9tICcuL2VsZW1lbnRzL2VsZW1lbnQnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcbmxldCBjbnNsID0gY29uc29sZTtcclxuZXhwb3J0IGxldCBjbG9nID0gY29uc29sZS5sb2c7XHJcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xyXG4gICAgdGl0bGU6ICdNVEEgRXhwb3J0ZXIgMi4wIGJ5IEBib3JzdWN6eW5hJyxcclxuICAgIHdpZHRoOiAzMDAsXHJcbiAgICBoZWlnaHQ6IDQ1MCxcclxuICAgIHZpc2libGU6IHRydWVcclxufSk7XHJcbmZ1bmN0aW9uIGV4cG9ydEZyYW1lKGZyYW1lLCBhbGlnbikge1xyXG4gICAgbGV0IG9mZnNldCA9IHtcclxuICAgICAgICB4OiBmcmFtZS54LFxyXG4gICAgICAgIHk6IGZyYW1lLnksXHJcbiAgICAgICAgd2lkdGg6IGZyYW1lLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZnJhbWUuaGVpZ2h0LFxyXG4gICAgICAgIGFsaWduOiBhbGlnblxyXG4gICAgfTtcclxuICAgIGxldCBkYXRhID0gRWxlbWVudC5wcm9jZXNzTm9kZShmcmFtZSwgb2Zmc2V0LCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IGNvZGUgPSBkYXRhLmNvZGU7XHJcbiAgICBsZXQgbWV0YUNvZGUgPSBkYXRhLm1ldGFDb2RlO1xyXG4gICAgLy8gcmVtb3ZlIGxhc3QgbmV3IGxpbmUgZnJvbSBjb2RlIGFuZCBtZXRhQ29kZVxyXG4gICAgY29kZSA9IGNvZGUuc2xpY2UoMCwgLTEpO1xyXG4gICAgbWV0YUNvZGUgPSBtZXRhQ29kZS5zbGljZSgwLCAtMSk7XHJcbiAgICBjb2RlID0gc2V0dGluZ3MuY29kZVRlbXBsYXRlLnJlcGxhY2UoJzxDT0RFPicsIGNvZGUpLnJlcGxhY2UoJzxWQVJJQUJMRVM+JywgRWxlbWVudC5nZXRWYXJpYWJsZXMoKSk7XHJcbiAgICBtZXRhQ29kZSA9IHNldHRpbmdzLm1ldGFUZW1wbGF0ZS5yZXBsYWNlKCc8RklMRV9TT1VSQ0VTPicsIG1ldGFDb2RlKTtcclxuICAgIGNvZGUgPSBjb2RlLnRyaW0oKTtcclxuICAgIHdoaWxlIChjb2RlLmluY2x1ZGVzKCc8IW5ld2xpbmUhPicpKSB7XHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgnPCFuZXdsaW5lIT4nLCAnXFxcXG4nKTtcclxuICAgIH1cclxuICAgIGNsb2coc2V0dGluZ3MudXNlZnVsQ29kZSk7XHJcbiAgICBjbG9nKG1ldGFDb2RlKTtcclxuICAgIGNsb2coY29kZSk7XHJcbiAgICBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ2NvZGUtcmVhZHknKSwgeyB0aW1lb3V0OiAzMDAwIH0pO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnTVRBIEV4cG9ydGVyIGJ5IGJvcnN1aycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAxMDAwKTtcclxufVxyXG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xyXG4gICAgaWYgKG1zZy50eXBlID09PSAnZXhwb3J0LWFzLWNvZGUnKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbnMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbnMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ25vLXNlbGVjdGlvbicpLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS5ub3RpZnkodHJhbnNsYXRpb24oJ21vcmUtdGhhbi1vbmUnKSwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uID0gc2VsZWN0aW9uc1swXTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT0gJ0ZSQU1FJylcclxuICAgICAgICAgICAgcmV0dXJuIGZpZ21hLm5vdGlmeSh0cmFuc2xhdGlvbignbm8tZnJhbWUnKSwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICBFbGVtZW50LnJlc2V0VmFyaWFibGVzKCk7XHJcbiAgICAgICAgRWxlbWVudC5yZXNldEZvY3VzRWxlbWVudHMoKTtcclxuICAgICAgICBFbGVtZW50LnJlc2V0Q3VycmVudFZhcmlhYmxlKCk7XHJcbiAgICAgICAgRWxlbWVudC5zZXRNYWluRnJhbWUoc2VsZWN0aW9uKTtcclxuICAgICAgICBzZXR0aW5ncy56b29tID0gbXNnLnVzZVpvb207XHJcbiAgICAgICAgc2V0dGluZ3Mud29yZFdyYXAgPSBtc2cud29yZFdyYXA7XHJcbiAgICAgICAgZXhwb3J0RnJhbWUoc2VsZWN0aW9uLCBtc2cuYWxpZ24pO1xyXG4gICAgICAgIEVsZW1lbnQuZm9jdXNPbkVsZW1lbnRzKHNlbGVjdGlvbik7XHJcbiAgICB9XHJcbn07XHJcbiIsImNvbnN0IG1ldGFUZW1wbGF0ZSA9IGA8bWV0YT5cclxuICAgIDxzY3JpcHQgc3JjPSd1c2VmdWwubHVhJyB0eXBlPSdjbGllbnQnIGNhY2hlPSdmYWxzZScvPlxyXG4gICAgPHNjcmlwdCBzcmM9J2NsaWVudC5sdWEnIHR5cGU9J2NsaWVudCcgY2FjaGU9J2ZhbHNlJy8+XHJcblxyXG48RklMRV9TT1VSQ0VTPlxyXG48L21ldGE+YDtcclxuY29uc3QgY29kZVRlbXBsYXRlID0gYFxyXG48VkFSSUFCTEVTPlxyXG5cclxuZnVuY3Rpb24gcmVuZGVyVUkoKVxyXG48Q09ERT5cclxuZW5kXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVVSSh2aXNpYmxlKVxyXG4gICAgbG9jYWwgZXZlbnRDYWxsYmFjayA9IHZpc2libGUgYW5kIGFkZEV2ZW50SGFuZGxlciBvciByZW1vdmVFdmVudEhhbmRsZXJcclxuXHJcbiAgICBldmVudENhbGxiYWNrKCdvbkNsaWVudFJlbmRlcicsIHJvb3QsIHJlbmRlclVJKVxyXG5lbmRcclxuXHJcbnRvZ2dsZVVJKHRydWUpYDtcclxuY29uc3QgdXNlZnVsQ29kZSA9IGBzeCwgc3kgPSBndWlHZXRTY3JlZW5TaXplKClcclxuem9vbSA9IChzeCA8IDIwNDgpIGFuZCBtYXRoLm1pbigyLjIsIDIwNDgvc3gpIG9yIDFcclxuZm9udHMgPSB7XHJcbiAgICBmaWdtYUZvbnRzID0ge30sXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVubG9hZEZvbnRzKClcclxuICAgIGZvciBrLHYgaW4gcGFpcnMoZm9udHMpIGRvXHJcbiAgICAgICAgaWYgdiBhbmQgaXNFbGVtZW50KHYpIHRoZW4gZGVzdHJveUVsZW1lbnQodikgZW5kXHJcbiAgICBlbmRcclxuICAgIGZvbnRzID0ge1xyXG4gICAgICAgIGZpZ21hRm9udHMgPSB7fSxcclxuICAgIH1cclxuZW5kXHJcblxyXG5mdW5jdGlvbiBsb2FkRm9udHMoYXJyYXkpXHJcbiAgICB1bmxvYWRGb250cygpXHJcbiAgICBmb3IgXyx2IGluIHBhaXJzKGFycmF5KSBkb1xyXG4gICAgICAgIGZvbnRzW3ZbMV1dID0gZHhDcmVhdGVGb250KHZbMl0sIHZbM10sIHZbNF0sICdwcm9vZicpXHJcbiAgICBlbmRcclxuZW5kXHJcblxyXG5mdW5jdGlvbiBnZXRGaWdtYUZvbnQoZm9udCwgc2l6ZSlcclxuICAgIGxvY2FsIGZpZ21hRm9udHMgPSBmb250cy5maWdtYUZvbnRzXHJcbiAgICBpZiBub3QgZmlnbWFGb250c1tmb250Li5zaXplXSB0aGVuXHJcbiAgICAgICAgZmlnbWFGb250c1tmb250Li5zaXplXSA9IGV4cG9ydHNbJ2ZpZ21hJ106Z2V0Rm9udChmb250LCBzaXplKVxyXG4gICAgZW5kXHJcblxyXG4gICAgcmV0dXJuIGZpZ21hRm9udHNbZm9udC4uc2l6ZV1cclxuZW5kYDtcclxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgem9vbTogdHJ1ZSxcclxuICAgIHBhdGg6ICdkYXRhLycsXHJcbiAgICBtZXRhVGVtcGxhdGU6IG1ldGFUZW1wbGF0ZSxcclxuICAgIGNvZGVUZW1wbGF0ZTogY29kZVRlbXBsYXRlLFxyXG4gICAgdXNlZnVsQ29kZTogdXNlZnVsQ29kZSxcclxuICAgIHdvcmRXcmFwOiBmYWxzZSxcclxufTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0NhbWVsQ2FzZShzdHIpIHtcclxuICAgIC8vIFJlbW92ZSBhbGwgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCByZXBsYWNlIHNwYWNlcyB3aXRoIHVuZGVyc2NvcmVzXHJcbiAgICBjb25zdCBjbGVhbmVkID0gc3RyLnJlcGxhY2UoL1teYS16QS1aMC05X10vZywgXCJcIikucmVwbGFjZSgvXFxzKy9nLCBcIl9cIik7XHJcbiAgICAvLyBTcGxpdCB0aGUgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygd29yZHNcclxuICAgIGNvbnN0IHdvcmRzID0gY2xlYW5lZC5zcGxpdChcIl9cIik7XHJcbiAgICAvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkIChleGNlcHQgdGhlIGZpcnN0IHdvcmQpXHJcbiAgICBjb25zdCBjYXBpdGFsaXplZCA9IHdvcmRzXHJcbiAgICAgICAgLm1hcCgod29yZCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICByZXR1cm4gY2FwaXRhbGl6ZWQuY2hhckF0KDApLnRvTG9jYWxlTG93ZXJDYXNlKCkgKyBjYXBpdGFsaXplZC5zbGljZSgxKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tRGlzdGFuY2VSb3RhdGlvbih4LCB5LCBkaXN0YW5jZSwgYW5nbGUpIHtcclxuICAgIC8vIENvbnZlcnQgYW5nbGUgZnJvbSBkZWdyZWVzIHRvIHJhZGlhbnNcclxuICAgIGNvbnN0IHJhZGlhbnMgPSBhbmdsZSAqIChNYXRoLlBJIC8gMTgwKTtcclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgbmV3IHggYW5kIHkgY29vcmRpbmF0ZXNcclxuICAgIGNvbnN0IG5ld1ggPSB4ICsgZGlzdGFuY2UgKiBNYXRoLmNvcyhyYWRpYW5zKTtcclxuICAgIGNvbnN0IG5ld1kgPSB5ICsgZGlzdGFuY2UgKiBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=