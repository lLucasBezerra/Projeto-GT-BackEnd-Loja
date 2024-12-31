const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");


const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")

dotenv.config();
const app = express();
app.use(express.json());
app.use(userRoutes)
app.use(categoryRoutes)


sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });

module.exports = app;
