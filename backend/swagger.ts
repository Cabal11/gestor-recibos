import swaggerAutoGen from "swagger-autogen";

const doc = {
  info: {
    title: "API Pagos",
    description: "API REST para la gestion de pagos y recibos de los usuarios",
    version: "1.0.0",
  },
  host: `${process.env.API_URL_DEV}`,
  basePath: "/api",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/routes/*.ts"];

swaggerAutoGen(outputFile, endpointsFiles, doc);
