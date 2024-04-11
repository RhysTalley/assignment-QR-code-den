/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';

import { writeFile } from 'node:fs';

import qr from 'qr-image';

import fs from 'fs';

const question = [
    {
        type: "input",
        name: "URL",
        message: "Enter a URL"
    }
]


inquirer
  .prompt(question).then((answers) => {
    // Use user feedback for... whatever!!
    writeFile("URL.txt", answers.URL, (err)=> {
        if (err){
            console.log("Error occured");
        }
    });
    var qr_svg = qr.image(answers.URL);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));
    var svg_string = qr.imageSync(answers.URL, { type: 'png' });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
      console.log(error);
    }
  });