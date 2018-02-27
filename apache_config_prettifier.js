if (process.argv.length < 3) {
    console.log("please provide atleast one file or foldername as argument");
    throw new Error("missing arguments");
}

process.argv.forEach((fileName, index) => {
    if (index < 2) {
        return;
    }
    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(fileName)
    });
    let tagArray = [];
    lineReader.on('line', function (line) {
        let trimmedLine = line.trim();
        let lastTag = tagArray.slice(-1).pop();
        if (lastTag && lastTag.replace(/\s+.*>$/, '>') === '<' + trimmedLine.substr(2)) {
            tagArray.pop();
        }
        console.log('    '.repeat(tagArray.length) + trimmedLine);
        if (/^<[^\/][^<>]+>$/.test(trimmedLine)) {
            tagArray.push(trimmedLine);
        }
    });
});

