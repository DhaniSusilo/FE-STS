import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ip from "../../ip";

const MemberIntervalChart = () => {
  const [data, setData] = useState([]);

  const fetchIntervalData = async () => {
    const now = new Date();
    const intervals = [];
    const intervalMinutes = 5;

    for (let i = 6; i > 0; i--) {
      const end = new Date(now.getTime() - (i - 1) * intervalMinutes * 60000);
      const start = new Date(end.getTime() - intervalMinutes * 60000);

      intervals.push({
        start,
        end,
      });
    }

    try {
      const results = await Promise.all(
        intervals.map(async ({ start, end }) => {
          const response = await axios.post(ip + "admins/interval/data", {
            level: localStorage.getItem("level"),
            for: localStorage.getItem("for"),
            start: start.toISOString(),
            end: end.toISOString(),
          });

          return {
            time: `${start.getHours().toString().padStart(2, "0")}:${start
              .getMinutes()
              .toString()
              .padStart(2, "0")}`,
            count: response.data.total,
          };
        })
      );

      setData(results);
    } catch (error) {
      console.error("Error fetching interval data:", error);
    }
  };

  useEffect(() => {
    fetchIntervalData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MemberIntervalChart;
