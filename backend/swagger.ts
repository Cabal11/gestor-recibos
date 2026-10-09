import swaggerAutoGen from "swagger-autogen";

// const swagger = swaggerAutoGen({
//   openapi: "3.0.0",
// });

const doc = {
  openapi: "3.0.0",
  info: {
    title: "API Pagos",
    description: "API REST para la gestion de pagos y recibos de los usuarios",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://gestor-recibos.onrender.com/api",
      description: "Desarrollo produccion",
    },
    {
      url: "http://localhost:4000/api",
      description: "Desarrollo local",
    },
  ],
  // host: ["gestor-recibos.onrender.com", ""],
  // basePath: "/api",
  // schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/routes/*.ts"];

swaggerAutoGen(outputFile, endpointsFiles, doc);
