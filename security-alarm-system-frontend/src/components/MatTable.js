import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTowerAlarmContext } from "../components/Layout";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [sensorData, setSensorData] = useState([]);
  const { towerAlarm, setTowerAlarm } = useTowerAlarmContext();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/webhook");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData([...sensorData, data.data]);
      setTowerAlarm({ ...towerAlarm, [data.data.towerID]: data.data.anamoly });
    };

    return () => {
      eventSource.close();
    };
  }, [sensorData, setTowerAlarm, towerAlarm]);

  return (
    <Paper style={{ maxHeight: "50vh", overflow: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>TowerID</StyledTableCell>
              <StyledTableCell align="right">
                Tower Location Latitude
              </StyledTableCell>
              <StyledTableCell align="right">
                Tower Location Longitude
              </StyledTableCell>
              <StyledTableCell align="right">
                Tower Temperature&nbsp;
              </StyledTableCell>
              <StyledTableCell align="right">
                Tower PowerSource&nbsp;
              </StyledTableCell>
              <StyledTableCell align="right">
                Tower FuelStatus&nbsp;
              </StyledTableCell>
              <StyledTableCell align="right">Anamoly&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Type&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensorData.map((data) => (
              <StyledTableRow key={data.towerId}>
                <StyledTableCell component="th" scope="row">
                  {data.towerID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.towerLocation.latitude}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.towerLocation.longitude}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data?.towerTemperature}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data?.powerSource}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data?.fuelStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {String(data?.anamoly)}
                </StyledTableCell>
                <StyledTableCell align="right">{data?.type}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
