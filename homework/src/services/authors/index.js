import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();
//------------------- File Path as no DB connection-------------------

const currentFilePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentFilePath);
const authorsJSONPath = join(currentFolderPath, "authors.json");
//--------------------------------------
/* 
name
surname
ID (Unique and server-generated)
email
date of birth
avatar (e.g. https://ui-avatars.com/api/?name=John+Doe) 
*/
//------------------- ENDPOINTS-------------------

authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath);
  const authors = JSON.parse(fileContent);
  res.status(201).send(authors);
});

authorsRouter.post("/", (req, res) => {
  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    id: uniqid(),
    avatar: req.body.avatar,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
  };
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  authors.push(newAuthor);
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
  res.status(201).send({ id: newAuthor.id });
});

authorsRouter.get("/authorId", (req, res) => {
  res.send("Hello from authors");
});

authorsRouter.put("/authorId", (req, res) => {
  res.send("Hello from authors");
});

authorsRouter.delete("/authorId", (req, res) => {
  res.send("Hello from authors");
});

export default authorsRouter;
