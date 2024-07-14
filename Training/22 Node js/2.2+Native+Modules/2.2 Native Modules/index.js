const fs = require("fs");

// fs.writeFile("satyamMessage.txt", "Hello From Futere web dev!", (err) => {
//     if (err) throw err;
//     console.log("The file is saved!");
// });

fs.readFile("satyamMessage.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
})