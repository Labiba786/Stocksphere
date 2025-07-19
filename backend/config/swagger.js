const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stocksphere API",
      version: "1.0.0",
      description: "API documentation for the Stocksphere backend system",
    },
    servers: [
      {
        url: process.env.BASE_URL || "https://your-app-name.onrender.com", // ✅ Set in .env or fallback to production URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // ✅ Adjust if your route files are in a different path
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
