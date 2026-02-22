mongoose.connection.db.listCollections().toArray((err, names) => {
  console.log(names); // shows all collections
});
