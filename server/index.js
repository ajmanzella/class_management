const express = require("express");
const homeRoutes = require("./home");
const studentroutes = require("./studentpage");
const classroutes = require("./classpage");

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json()) 
app.use("/home", homeRoutes);
app.use("/studentEnrollment", studentroutes);
app.use("/classEnrollment", classroutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});