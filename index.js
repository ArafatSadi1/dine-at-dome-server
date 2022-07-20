const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntcs2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db("dineAtDome").collection("services");

    app.get("/services", async(req, res)=>{
      const services = await servicesCollection.find({}).toArray();
      res.send(services)
    });
    app.get("/service/:id", async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: ObjectId(id)};
      const service = await servicesCollection.findOne(filter);
      res.send(service)
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello dine at dome world");
});

app.listen(port, () => {
  console.log(`Dine at dome server running on ${port}`);
});
