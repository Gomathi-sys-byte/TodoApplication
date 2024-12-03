import exp from "express";
import mon from "mongoose";
import cors from "cors";
import dot from "dotenv";
import nodemon from "nodemon";

const app = exp();
dot.config();
app.use(exp.json());
app.use(cors());

const tschema = new mon.Schema({
  title: {
    type: String,
  },
  description: String,
});
const todoCollection = mon.model("todos", tschema);

//Get
app.get("/todo", async (req, res) => {
  try {
    const data = await todoCollection.find({}).exec();
    console.log("Getting Data Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Failes to get Data");
    res.status(404).json(err);
  }
});

//Post
app.post("/todo", async (req, res) => {
  try {
    const data = { title: req.body.title, description: req.body.description };
    const entry = new todoCollection(data);
    await entry.save();
    console.log("Data Inserted Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Failed to Insert data:", err);
    res.status(400).json(err);
  }
});

//Put
app.put("/todo/:id", async (req, res) => {
  try {
    const data = await todoCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("Data Updated Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Failed to update data");
    res.status(400).json(err);
  }
});

//Delete
app.delete("/todo/:id", async (req, res) => {
  try {
    await todoCollection.findByIdAndDelete(req.params.id);
    console.log("Data deleted successfully");
    res.status(200).json({ message: "Data Deleted successfully" });
  } catch (err) {
    console.log("Failed to delete data");
    res.status(400).json(err);
  }
});

const connect = async () => {
  try {
    await mon.connect(process.env.MONGO);
    console.log("Connection to DB successfully");
  } catch (err) {
    console.log("Error while connecting to db:", err);
  }
};

app.listen(process.env.PORT, () => {
  connect();
  console.log("Server is running....");
});
