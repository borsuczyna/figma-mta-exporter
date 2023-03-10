import translation from "./language";
import * as Element from './elements/element';
import * as Textures from './elements/textures';
import { settings } from "./settings";
import { Offset, Align } from "./Types";

figma.showUI(__html__, {
    title: 'MTA Exporter by borsuk',
    width: 300,
    height: 400,
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

    code = settings.codeTemplate.replace('<CODE>', code).replace('<TEXTURES>', Textures.getTexturesCode()).replace('<VARIABLES>', Element.getVariables());
    metaCode = settings.metaTemplate.replace('<FILE_SOURCES>', metaCode);

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
                code: \`${settings.usefulCode}\`,
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

        if(selections.length == 0) return figma.notify(translation('no-selection'), {error: true});
        if(selections.length > 1) return figma.notify(translation('more-than-one'), {error: true});
        let selection: SceneNode = selections[0];
        if(selection.type != 'FRAME') return figma.notify(translation('no-frame'), {error: true});

        Textures.resetTextures();
        Element.resetVariables();
        Element.resetFocusElements();
        Element.resetCurrentVariable();
        Element.setMainFrame(selection);
        settings.zoom = msg.useZoom;
        exportFrame(selection, msg.align);
        Element.focusOnElements(selection);
    }
};