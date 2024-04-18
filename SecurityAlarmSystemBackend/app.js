const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { EventEmitter } = require("events");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const eventEmitter = new EventEmitter();

app.get("/webhook", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const messageHandler = (data) => {
    console.log("Sending data to client...", data);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  eventEmitter.on("message", messageHandler);

  req.on("close", () => {
    eventEmitter.off("message", messageHandler);
  });
});

app.post("/trigger-event", (req, res) => {
  const { data } = req.body;
  eventEmitter.emit("message", { type: "sensor_data", data: data });
  res.status(200).send("Event triggered successfully");
});

app.post("/iot-sensor-data", (req, res) => {
  axios
    .post("http://localhost:5000/trigger-event", { data: req.body })
    .then((response) => {
      if (response.status === 200) {
        console.log("Webhook sent successfully");
      } else {
        console.error("Failed to send webhook:", response.statusText);
      }
    })
    .catch((error) => console.error("Error sending webhook:", error));

  res.status(200).send("Sensor data saved and webhook sent");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
