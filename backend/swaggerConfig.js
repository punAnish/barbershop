const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment API",
      version: "1.0.0",
      description: "API for managing appointments",
    },
    servers: [
      {
        url: "http://localhost:4000/api", // Update with your API server URL
      },
    ],
  },
  apis: ["routes/appointmentRoutes.js", "controllers/appointmentController.js"], // Update with the path to your route file
  components: {
    schemas: {
      Appointment: {
        type: "object",
        properties: {
          customerName: { type: "string" },
          serviceType: { type: "string" },
          date: { type: "date-time" },
          timeSlot: { type: "string" },
          notes: { type: "string" },
        },
        example: {
          customerName: { type: "hafiz" },
          serviceType: { type: "haircut" },
          date: { type: "2023-10-16T12:00:00Z" },
          timeSlot: { type: "12:00" },
          notes: { type: "i need short haircut" },
        },
      },
    },
  },
};

const specs = swaggerJsdoc(options);
module.exports = specs;
