import translation from "./language";
import * as Element from './elements/element';
import { settings } from "./settings";
import { Offset, Align } from "./Types";

figma.showUI(__html__, {
    title: 'MTA Exporter by borsuk',
    width: 300,
    height: 400,
});

function exportFrame(frame: FrameNode, align: Align) {
    let offset: Offset = {
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
        align: align
    }

    let data = Element.processNode(frame, offset);
    let code = data.code;
    let metaCode = data.metaCode;

    code = settings.codeTemplate.replace('<CODE>', code);
    metaCode = settings.metaTemplate.replace('<FILE_SOURCES>', metaCode);

    console.log(metaCode);
    console.log(code);
}

figma.ui.onmessage = msg => {
    if (msg.type === 'export-as-code') {
        let selections = figma.currentPage.selection;

        if(selections.length == 0) return figma.notify(translation('no-selection'), {error: true});
        if(selections.length > 1) return figma.notify(translation('more-than-one'), {error: true});
        let selection: SceneNode = selections[0];
        if(selection.type != 'FRAME') return figma.notify(translation('no-frame'), {error: true});

        Element.resetFocusElements();
        settings.zoom = msg.useZoom;
        exportFrame(selection, msg.align);
        Element.focusOnElements(selection);
    }
};