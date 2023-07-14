document.querySelectorAll('.moment').forEach((element) => {
    element.innerText = moment(parseInt(element.innerText)).fromNow();
});

async function deleteExport(id, msg) {
    if(confirm(msg || 'Delete?')) {
        await fetch(`/delete/${id}`);
        location.reload();
    }
}

async function download(id) {
    let data = await fetch(`/download/${id}`);
    data = await data.json();

    dhandle = await window.showDirectoryPicker()
    await dhandle.requestPermission({ writable: true })

    for(let file of data.files) {
        let content = file.code;
        content = content.replaceAll('<!newline!>', '\\n');
        let filehandle = await dhandle.getFileHandle(file.name, { create: true });
        let writeable = await filehandle.createWritable();
        await writeable.write(content);
        await writeable.close();
    }

    deleteExport(id, 'Successfully downloaded. Delete?');
}