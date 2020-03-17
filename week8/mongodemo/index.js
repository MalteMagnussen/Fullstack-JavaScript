require("dotenv").config();

// Set up connection
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://fullstackUser:${process.env.MONGODB_USER}@fullstack-cluster-3gtn6.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongoTest = async () => {
  try {
    // Make connection
    await client.connect();
    // Make collection
    const dogs = client.db("kennel");
    const dogsCollection = dogs.collection("dogs");
    // Insert
    await dogsCollection.insertMany([
      { name: "Togo" },
      { name: "Fido" },
      { name: "Tut", race: "dog" }
    ]);
    await dogsCollection.insertOne({ name: "Fido2" });
    // Extract
    const allDogs = await dogsCollection.find({}).toArray();
    print(allDogs);
  } catch (err) {
    print(err);
  } finally {
    client.close();
    print("Closed.");
  }
};

mongoTest();

const print = python => {
  console.log(python);
};
