import React from "react";
import { createContext, useState, useContext } from "react";
import MatTable from "./MatTable";
import Map from "./Map";

const towerAlarmContext = createContext(null);
function Layout() {
  const towerAlarmInit = {
    Tower1: false,
    Tower2: false,
    Tower3: false,
    Tower4: false,
    Tower5: false,
    Tower6: false,
    Tower7: false,
    Tower8: false,
    Tower9: false,
    Tower10: false,
  };
  const [towerAlarm, setTowerAlarm] = useState(towerAlarmInit);
  return (
    <div>
      <towerAlarmContext.Provider value={{ towerAlarm, setTowerAlarm }}>
        <Map />
        <MatTable />
      </towerAlarmContext.Provider>
    </div>
  );
}

export const useTowerAlarmContext = () => {
  return useContext(towerAlarmContext);
};
export default Layout;
