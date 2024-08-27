import React from "react";
import DateRangePicker from "./components/DateRangePicker";
import "./components/DateRangePicker.css";

const App: React.FC = () => {
  const handleDateRangeChange = (
    range: [Date | null, Date | null],
    weekends: Date[]
  ) => {
    console.log("Selected range:", range);
    console.log("Weekend dates:", weekends);
  };

  const predefinedRanges: { label: string; range: () => [Date, Date] }[] = [
    {
      label: "Last 7 Days",
      range: () => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);
        return [startDate, endDate];
      },
    },
    {
      label: "Last 15 Days",
      range: () => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 14);
        return [startDate, endDate];
      },
    },
    {
      label: "Last 30 Days",
      range: () => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 29);
        return [startDate, endDate];
      },
    },
    {
      label: "Next 7 Days",
      range: () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 6);
        return [startDate, endDate];
      },
    },
    {
      label: "Next 15 Days",
      range: () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 14);
        return [startDate, endDate];
      },
    },
    {
      label: "Next 30 Days",
      range: () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 29);
        return [startDate, endDate];
      },
    },
  ];

  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>Weekday Date Range Picker</h1>
      <DateRangePicker
        onChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
      />
    </div>
  );
};

export default App;
