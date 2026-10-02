import swaggerAutoGen from "swagger-autogen";

const doc = {
  info: {
    title: "API Pagos",
    description: "API REST para la gestion de pagos y recibos de los usuarios",
    version: "1.0.0",
  },
  host: "https://gestor-recibos.onrender.com",
  basePath: "/api",
  schemes: ["https"],
};


const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/routes/*.ts"];

swaggerAutoGen(outputFile, endpointsFiles, doc);
