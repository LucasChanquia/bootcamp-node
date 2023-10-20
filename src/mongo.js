const mongoose = require("mongoose");


const connectionString = process.env.MONGO_DB_URI;

// conexion a mongodb

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Note.find({}).then((result) => {
//   console.log(result)
//   mongoose.connection.close()
// });

// const note = new Note({
//   content: "MondoDB en modo de prueba",
//   date: new Date(),
//   important: true,
// });

// note
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error(err);
//   });
