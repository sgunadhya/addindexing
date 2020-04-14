const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const EPUBToText = require('epub-to-text');

function writeTextToFile(pdfSourceFile, txtDirectory, textData) {
    let baseName = path.basename(pdfSourceFile, path.extname(pdfSourceFile));
    let newFileName = path.join(txtDirectory, baseName + '.txt');
    fs.writeFile(newFileName, textData, function (err) {
        if (err) return console.log(err);
    });
}

function pdftotext(pdfSourceFile, txtDirectory) {
    let dataBuffer = fs.readFileSync(pdfSourceFile);
    pdf(dataBuffer).then(function (data) {
        let textData = data.text;
        writeTextToFile(pdfSourceFile, txtDirectory, textData);
    })
}

function epubToText(epubSourceFile, txtDirectory) {
    var epubToText = new EPUBToText;
    epubToText.extract(epubSourceFile, (err, txt, n) => {
        writeTextToFile(epubSourceFile, txtDirectory, txt);
    })
}

process.argv.forEach(function (val, index, array) {
    let filePath = array[2];
    let textDir = array[3]
    let extension = path.extname(filePath);
    switch (extension) {
        case '.pdf':
            pdftotext(filePath, textDir);
            break;
        case '.epub':
            epubToText(filePath, textDir);
            break;

    }
});

