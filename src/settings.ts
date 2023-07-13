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

export const settings = {
    zoom: true,
    path: 'data/',
    metaTemplate: metaTemplate,
    codeTemplate: codeTemplate,
    usefulCode: usefulCode,
    wordWrap: false,
}