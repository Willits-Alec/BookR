const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE 341 - Final Project",
    description: "Book Review API",
  },
  host: "https://bookr-bpd4.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);