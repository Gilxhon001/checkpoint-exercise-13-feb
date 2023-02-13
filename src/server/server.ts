import express, { Request, Response } from "express";

import cors from "cors";

const app: express.Application = express();

app.use(cors());

let Db = [
  { id: 1, text: "Test", timestamp: Date.now() },
  { id: 2, text: "Test 2", timestamp: Date.now() },
];

const port: number = 3001;

const getAll = (request: Request, response: Response) => {
  response.json(Db);
};

const create = (request: Request, response: Response) => {
  console.log(request.body);

  const receivedText = request.body.text;

  Db.push({ id: Db.length + 1, text: receivedText, timestamp: Date.now() });

  response.status(201).json({ msg: "Added Successfully" });
};

const deleteById = (request: Request, response: Response) => {
  const receivedId = request.params.id;

  const newDb = Db.filter((el) => el.id !== +receivedId);

  Db = newDb;

  console.log(Db);

  response.json({ msg: "Deleted Successfully" });
};

const updateById = (request: Request, response: Response) => {
  const receivedId = request.params.id;
  const incomingText = request.body.text;
  const newDb = Db.map((el) =>
    el.id === +receivedId ? [...Db, (el.text = incomingText)]: el
  );

  //Db = newDb;

  console.log(Db);
};


app.get("/api/posts", getAll) ;

app.post("/api/posts", create) ;

app.delete("/api/posts/:id", deleteById) ;

app.put("/api/posts/:id", updateById) ;

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
}) ;

