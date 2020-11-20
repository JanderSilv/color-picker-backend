const fs = require('fs');
const getColors = require('get-image-colors');
// const fs = require('fs');
// const path = require('path');
// const buffer = fs.readFileSync(path.join(__dirname, 'test.jpg'));
// const image = path.join(__dirname, 'test.jpg');

module.exports = {
    generateImageColors: (request, response) => {
        const filePath = request.file.path;
        getColors(filePath)
            .then((colors) => {
                fs.unlinkSync(filePath);
                const colorsArray = colors.map((color) => color.hex());
                // console.log(colorsArray);
                return response.json(colorsArray);
            })
            .catch((error) => {
                console.log(error);
                return response.json(error);
            });
    },
};
