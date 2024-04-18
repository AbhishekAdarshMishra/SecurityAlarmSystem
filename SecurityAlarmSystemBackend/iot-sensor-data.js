const axios = require("axios");

const generatedData = [];

const towerData = [
  {
    id: "Tower1",
    location: {
      latitude: 37,
      longitude: -122,
    },
  },
  {
    id: "Tower2",
    location: {
      latitude: 34,
      longitude: 118,
    },
  },
  {
    id: "Tower3",
    location: {
      latitude: 40,
      longitude: -74,
    },
  },
  {
    id: "Tower4",
    location: {
      latitude: 41,
      longitude: 87,
    },
  },
  {
    id: "Tower5",
    location: {
      latitude: 9,
      longitude: -9,
    },
  },
  {
    id: "Tower6",
    location: {
      latitude: 12,
      longitude: 20,
    },
  },
  {
    id: "Tower7",
    location: {
      latitude: 19,
      longitude: 80,
    },
  },
  {
    id: "Tower8",
    location: {
      latitude: 33,
      longitude: -1,
    },
  },
  {
    id: "Tower9",
    location: {
      latitude: 37,
      longitude: 17,
    },
  },
  {
    id: "Tower10",
    location: {
      latitude: 47,
      longitude: 122,
    },
  },
];

const generateIOTSensorData = async () => {
  const randomNumber = Math.floor(Math.random() * towerData.length);
  const towerID = towerData[randomNumber].id;
  const towerLocation = towerData[randomNumber].location;
  const towerTemperature = Math.random() * 50;
  const powerSource = Math.random() < 0.8 ? "DG" : "Electric";
  const fuelStatus = Math.random() * 50;

  let anamoly = false;
  let type = 0;

  if (towerTemperature > 45) {
    anamoly = true;
    type = 1;
  } else if (fuelStatus < 20) {
    anamoly = true;
    type = 2;
  } else if (generatedData.length > 24) {
    const last24Data = generatedData.slice(-24); // For 120 min req 24 data as 5 min interval data are sending
    const hasElectricPowerSource = last24Data.some(
      (data) => data.powerSource === "Electric"
    );
    if (!hasElectricPowerSource) {
      anamoly = true;
      type = 3;
    }
  }

  return {
    towerID,
    towerLocation,
    towerTemperature,
    powerSource,
    fuelStatus,
    anamoly,
    type,
  };
};

async function sendDataToAPI(iotSensorData) {
  try {
    await axios.post("http://localhost:5000/iot-sensor-data", iotSensorData);
    console.log("Sensor data sent successfully:", iotSensorData);
  } catch (error) {
    console.error("Error sending sensor data:", error.message);
  }
}

setInterval(async () => {
  console.log("Generating and sending sensor data...");
  const iotSensorData = await generateIOTSensorData();
  sendDataToAPI(iotSensorData);
  generatedData.push(iotSensorData);
}, 5000);
