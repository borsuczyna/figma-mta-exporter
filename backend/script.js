let output = document.getElementById('output');
let params = new URLSearchParams(window.location.search);
let argumentsString = params.get('arguments');
let arguments = JSON.parse(decodeURIComponent(argumentsString));
if(!arguments || !arguments.files || typeof arguments.files != 'object') throw alert('Wrong url');
let urlarguments = arguments;

let files = [];
for(let file in arguments.files) {
    files.push(file);
}

document.getElementById('files').innerText = files.join(', ');

async function exportData() {
    dhandle = await window.showDirectoryPicker()
    await dhandle.requestPermission({ writable: true })

    for(let i in urlarguments.files) {
        let file = urlarguments.files[i]
        let content = file.code;
        let filehandle = await dhandle.getFileHandle(i, { create: true });
        let writeable = await filehandle.createWritable();
        await writeable.write(content);
        await writeable.close();
    }

    window.close();
}