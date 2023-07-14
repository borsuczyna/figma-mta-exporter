import translation from "./language";
import * as Element from './elements/element';
import * as Textures from './elements/textures';
import { settings } from "./settings";
import { Offset, Align } from "./Types";
let cnsl = console;
let clog = console.log;

figma.showUI(__html__, {
    title: 'MTA Exporter 2.0 by @borsuczyna',
    width: 300,
    height: 450,
    visible: true
});

function exportFrame(frame: FrameNode, align: Align) {
    let offset: Offset = {
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
        align: align
    }

    let data = Element.processNode(frame, offset, undefined);
    let code = data.code;
    let metaCode = data.metaCode;

    // remove last new line from code and metaCode
    code = code.slice(0, -1);
    metaCode = metaCode.slice(0, -1);

    code = settings.codeTemplate.replace('<CODE>', code).replace('<VARIABLES>', Element.getVariables());
    metaCode = settings.metaTemplate.replace('<FILE_SOURCES>', metaCode);

    code = code.trim();

    clog(code);
    figma.notify(translation('code-ready'), {timeout: 3000});

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

        if(selections.length == 0) return figma.notify(translation('no-selection'), {error: true});
        if(selections.length > 1) return figma.notify(translation('more-than-one'), {error: true});
        let selection: SceneNode = selections[0];
        if(selection.type != 'FRAME') return figma.notify(translation('no-frame'), {error: true});

        Element.resetVariables();
        Element.resetFocusElements();
        Element.resetCurrentVariable();
        Element.setMainFrame(selection);
        settings.zoom = msg.useZoom;
        settings.wordWrap = msg.wordWrap;
        exportFrame(selection, msg.align);
        Element.focusOnElements(selection);
    }
};