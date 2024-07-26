import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Variables and Methods
const app = express();
const port = 3000;
let userAuthenticated = false;

let blog = {
    id : "",
    title : "",
    content : "",
    author : ""
};

const generateId = (() => {
    let id = 0;
    return () => id++;
})();

var passwordExtractor = (req, res, next) => {
    let password = req.body["password"];
    let username = req.body["username"]
    if(password === "abc123" && username === "devnoob@noobda.com")
        userAuthenticated = true;
    next();
};


// Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan("combined"));
app.use(passwordExtractor);


// Routers
app.get("/", (req, res) => {
    res.render("sign-in.ejs");
});

app.post("/login", (req,res) => {
    if(userAuthenticated){
        res.render("home.ejs", {
            blogList : blogList
        });
    }
    else{
        res.render("sign-in.ejs");
    }
});

app.post('/create', (req, res) => {
    let existingBlogIndex = blogList.findIndex(blog =>
        (blog.title === req.body["title"]) || (blog.content === req.body["content"])
        || (blog.author === req.body["author"])
    );

    console.log(req.body["title"]);
    console.log(req.body["content"]);
    console.log(req.body["author"]);
    console.log(existingBlogIndex);

    if(existingBlogIndex !== 'undefined'){
        blogList.splice(existingBlogIndex,1);
    }

    let blog = {
        id: generateId(),
        title : req.body["title"],
        content : req.body["content"],
        author : req.body["author"]
    };

    blogList.push(blog);

    res.render("home.ejs", {
        blogList : blogList
    });
});

app.post("/delete", (req,res) => {
    
    let deleteBlogIndex = blogList.findIndex(blog =>
        (blog.title === req.body["title"]) || (blog.content === req.body["content"])
        || (blog.author === req.body["author"])
    );

    if(deleteBlogIndex !== 'undefined'){
        blogList.splice(deleteBlogIndex,1);
    }

    res.render("home.ejs", {
        blogList: blogList 
    });
});

app.listen(port, () => {
    console.log(`Server is listening on the port: ${port}`);
});


//Dummy data
let blogList = [
    {
        id: generateId(),
        title: "Introduction to HTML",
        content: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages using elements like headings, paragraphs, lists, links, images, and more. Every HTML document starts with a <!DOCTYPE html> declaration.",
        author: "John Doe"
    },
    {
        id: generateId(),
        title: "Getting Started with CSS",
        content: "CSS stands for Cascading Style Sheets. It is used to style and layout web pages. With CSS, you can control the color, font, size, spacing, and positioning of elements on a web page. CSS can be added to HTML documents in three ways: inline, internal, and external.",
        author: "Jane Smith"
    },
    {
        id: generateId(),
        title: "Understanding JavaScript Variables",
        content: "Variables in JavaScript are used to store data that can be referenced and manipulated later. You can declare variables using var, let, or const. The let and const keywords were introduced in ES6 and are block-scoped, whereas var is function-scoped.",
        author: "Alice Johnson"
    },
    {
        id: generateId(),
        title: "HTML Semantic Elements",
        content: "Semantic elements in HTML provide meaning to the content of the web page. Examples include <header>, <footer>, <article>, <section>, and <nav>. Using semantic elements improves accessibility and SEO.",
        author: "Bob Brown"
    },
    {
        id: generateId(),
        title: "CSS Flexbox Basics",
        content: "Flexbox is a layout module in CSS that makes it easier to design flexible and responsive layout structures. It allows you to align and distribute space among items in a container, even when the size of the items is unknown or dynamic.",
        author: "Charlie Green"
    },
    {
        id: generateId(),
        title: "JavaScript Functions",
        content: "Functions in JavaScript are blocks of code designed to perform a particular task. A function is executed when it is called (invoked). You can define functions using function declarations or function expressions.",
        author: "Diana White"
    },
    {
        id: generateId(),
        title: "HTML Forms and Input Elements",
        content: "HTML forms are used to collect user input. Form elements include input, textarea, select, button, and label. Forms can be submitted to a server for processing using the action and method attributes.",
        author: "Evan Black"
    },
    {
        id: generateId(),
        title: "CSS Grid Layout",
        content: "CSS Grid Layout is a powerful layout system that allows you to create complex, responsive web designs. It uses a grid of rows and columns to place elements precisely on the page. Properties like grid-template-columns and grid-template-rows help define the grid structure.",
        author: "Fiona Blue"
    },
    {
        id: generateId(),
        title: "JavaScript Events",
        content: "Events in JavaScript are actions or occurrences that happen in the browser, such as clicking a button, submitting a form, or loading a page. You can use event listeners to execute code in response to these events.",
        author: "George Red"
    },
    {
        id: generateId(),
        title: "Using HTML5 Audio and Video",
        content: "HTML5 introduced new elements for embedding audio and video: <audio> and <video>. These elements provide a standard way to include media content on web pages without needing external plugins.",
        author: "Helen Grey"
    }
];
