import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  database: "permalist",
  host: "localhost",
  password: "password",
  port: 5432
});
let items = [];

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getAllItems() {
  const query = "SELECT * FROM items ORDER BY id ASC";
  const result = await db.query(query);
  console.log(result.rows);
  return result.rows;
}

async function addItem(itemToAdd) {
  const query = "INSERT INTO items (title) values ($1)";
  const values = [itemToAdd];

  await db.query(query, values);
}

async function editItem(idToUpdate, titleToUpdate) {
  const query = "UPDATE items SET title = $1 WHERE id = $2";
  const values = [titleToUpdate, idToUpdate];

  await db.query(query, values);
}

async function deleteItem(idToDelete) {
  const query = "DELETE FROM items WHERE id = $1";
  const values = [idToDelete];

  await db.query(query, values);
}

app.get("/", async (req, res) => {
  items = await getAllItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await addItem(item);
  res.redirect("/");
});

app.post("/edit",async (req, res) => {
  const idToUpdate = req.body.updatedItemId;
  const titleToUpdate = req.body.updatedItemTitle;
  await editItem(idToUpdate, titleToUpdate);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const idToDelete = req.body.deleteItemId;
  await deleteItem(idToDelete);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
