/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt([
    {
        name: 'userSite',
        message: 'Please enter the site for QR generator: '
    },
  ])
  .then((answers) => {
        console.info('Answer:', answers.userSite);
        
        // Code for generating QR png and then saving it using filestream
        var qr_png = qr.image(answers.userSite);
        qr_png.pipe(fs.createWriteStream('UserSiteQR.png'));

        // Code for saving the user answer using fileStream
        fs.writeFile("usersite.txt", answers.userSite, (err) => {
            if (err) throw err;
            console.log("The file is saved!");
        });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Rendering error");
    } else {
      console.log("Some error is happening");
    }
  });