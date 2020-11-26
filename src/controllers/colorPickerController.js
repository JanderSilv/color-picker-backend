require('dotenv/config');
const fs = require('fs');
const translate = require('translate');
const colorApi = require('../services/color.api');
const getColors = require('get-image-colors');
// const fs = require('fs');
// const path = require('path');
// const buffer = fs.readFileSync(path.join(__dirname, 'test.jpg'));
// const image = path.join(__dirname, 'test.jpg');

let savedColors;

module.exports = {
    generateImageColors: async (request, response) => {
        const filePath = request.file.path;

        const getNameColors = async (colorsArray) => {
            const colorsNameArray = [];
            for await (const color of colorsArray) {
                const auxColor = color.split('#')[1];
                const response = await colorApi.get(`/id?hex=${auxColor}`);
                colorsNameArray.push(response.data.name.value);
                // console.log(colorsNameArray);
            }
            return colorsNameArray;
        };

        const translateColors = async (colorsArray) => {
            const colorsString = colorsArray.join(', ');
            translate.key = process.env.GOOGLE_KEY;
            const options = { from: 'en', to: 'pt' };
            try {
                const text = await translate(colorsString, options);
                // console.log(text);
                return text.split(',');
            } catch (error) {
                console.error(error);
                return response.json(error);
            }
        };

        try {
            const colors = await getColors(filePath, { count: 3 });
            fs.unlinkSync(filePath);
            const colorsArray = colors.map((color) => color.hex());
            let colorsNameArray = await getNameColors(colorsArray);
            colorsNameArray = await translateColors(colorsNameArray);
            // console.log(colorsNameArray);
            savedColors = colorsNameArray;
            return response.json(colorsNameArray);
        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    },

    getColors: async (request, response) => {
        if (savedColors) return response.json(savedColors);
        else response.json('Ainda não tive acesso as cores');
    },

    // translateColors: async (colorsArray) => {
    //     const colorsString = 'Aqua Haze';
    //     translate.key = process.env.GOOGLE_KEY;
    //     const options = { from: 'en', to: 'pt' };
    //     try {
    //         const text = await translate(colorsString, options);
    //         console.log(text);
    //         response.json(text.split(','));
    //     } catch (error) {
    //         console.error(error);
    //         return response.json(error);
    //     }
    // },
};
