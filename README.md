# SecurityAlarmSystem

Welcome to the Security Alarm System! This repository contains the frontend and backend code for the following Application:

## Backend
We have to build a security alarm system for a mobile tower. There is few IOT sensor are placed on mobile tower which captures following sensor data
1. Tower ID
2. Tower location – Lat and Long 3. Tower temperature – In Celcius 4. Power source – DG/Electric
5. Fuel status – In liters
Since we don’t have any real IOT device so we will build a system which generates the following sensor data randomly with few anomalies in every 5 seconds.
Anomalies are like:
 ̈ If temperature of site is greater than 45 degree Celsius
 ̈ If fuel is less than 20 liters
 ̈ If power source is running on generator conAnuously for more than 2Hrs. You have to
check previous sensors data if conAnuously previous data has Power source as DG for 2 Hrs. then raise this alarm.

## Frontend
Based on above anomalies we have to generate the alarms and those alarms we have to show in the UI in real Ame.
Landing Page
1. Use a Geo Map to show the alarms in map. Alarms should be generated at real Ame
when above anomalies are matches for the locaAon. Use webhook so we no need to
do any page refresh.
2. Show a data table with all the sensor data. Data table should be refresh whenever we
get any new sensor.


## Backend Setup

To set up the backend, follow these steps:

1. Navigate to the `SecurityAlarmSystemBackend` directory:
    ```
    cd SecurityAlarmSystemBackend
    ```

2. Install dependencies using npm:
    ```
    npm install
    ```

3. Start the backend server:
    ```
    npm start
    ```

## Frontend Setup

To set up the frontend, follow these steps:

1. Navigate to the `security-alarm-system-frontend` directory:
    ```
    cd security-alarm-system-frontend
    ```

2. Install dependencies using npm:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm start
    ```

## Usage

Once both the frontend and backend are set up and running, you can access the Security Alarm System through your web browser. Make sure both servers are running concurrently for full functionality.


