const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stocksphere API",
      version: "1.0.0",
      description: "API documentation for Stocksphere System",
    },
    servers: [
      {
        url: "http://localhost:5000", // ✅ This is your API base, NOT /api-docs
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
  },
  apis: ["./routes/*.js"], // ✅ Make sure your JSDoc comments exist in these route files
};

const swaggerSpec = swaggerJSDoc(options);

// ✅ Export both to use in app.js
module.exports = {
  swaggerUi,
  swaggerSpec,
};
