import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const dirName = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
let weekDay = "";
let whatToDo = "";

function dataRenderToSend(){
    let day = new Date().getDay();

    if(day === 0 || day === 6){
        weekDay = "the weekend";
        whatToDo = "have fun!";
    }
    else{
        weekDay = "a weekday";
        whatToDo = "work hard!";
    }
}

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    dataRenderToSend();
    res.render(dirName + "/views/index.ejs",
    {
        weekDay : weekDay,
        whatToDo : whatToDo
    });
});

app.listen(port, () => {
    console.log("Listening on port: " + `${port}`);
});