const express = require("express");
const homeRoutes = require("./home");

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json()) 
app.use("/home", homeRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});