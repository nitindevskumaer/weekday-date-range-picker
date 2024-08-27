// src/components/DateRangePicker.tsx
import React, { useState, useEffect } from "react";
import "./DateRangePicker.css";

type DateRangePickerProps = {
    onChange: (range: [Date | null, Date | null], weekends: Date[]) => void;
    predefinedRanges?: { label: string; range: () => [Date, Date] }[];
};

const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
};

const getWeekendsInRange = (startDate: Date, endDate: Date): Date[] => {
    const weekends: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (isWeekend(currentDate)) {
            weekends.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekends;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, predefinedRanges = [] }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [selectedRange, setSelectedRange] = useState<number | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            const weekends = getWeekendsInRange(startDate, endDate);
            onChange([startDate, endDate], weekends);
        }
    }, [startDate, endDate, onChange]);

    const handleDateClick = (date: Date) => {
        if (isWeekend(date)) return;

        if (!startDate || (startDate && endDate)) {
            // console.log("heerere")
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (date < startDate) {
                setStartDate(date);
                setEndDate(startDate);
            } else {
                setEndDate(date);
            }
        }
    };

    const handlePredefinedRangeClick = (range: [Date, Date], index: number) => {
        const [start, end] = range;
        setStartDate(start);
        setEndDate(end);
        setSelectedRange(index);
    };

    const renderDays = () => {
        const days = [];
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // console.log("daysInMonth : ", daysInMonth)

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }
        // console.log("start date :: ", startDate)
        // console.log("end date :: ", endDate)

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentYear, currentMonth, d);
            const isSelected =
                (startDate && date.toDateString() === startDate.toDateString()) ||
                (endDate && date.toDateString() === endDate.toDateString());
            const isInRange =
                startDate &&
                endDate &&
                date > startDate &&
                date < endDate &&
                !isWeekend(date);

        // console.log("isInRange :: ", isInRange)
        // console.log("days :: ", d)

            days.push(

                <div
                    key={d}
                    className={`day ${isSelected ? "selected" : ""} ${isInRange ? "in-range" : ""
                        } ${isWeekend(date) ? "weekend" : ""}`}
                    onClick={() => handleDateClick(date)}
                >
                    {d}
                </div>
            );
        }
        // console.log("days :: ", days)
        return days;
    };

    return (
        <div className="date-range-picker">
            <div className="controls">
                <button onClick={() => setCurrentMonth(currentMonth > 0 ? currentMonth - 1 : 11)}>
                    Prev Month
                </button>
                <span>{`${currentYear}-${currentMonth + 1}`}</span>
                <button onClick={() => setCurrentMonth(currentMonth < 11 ? currentMonth + 1 : 0)}>
                    Next Month
                </button>
                <button onClick={() => setCurrentYear(currentYear - 1)}>Prev Year</button>
                <button onClick={() => setCurrentYear(currentYear + 1)}>Next Year</button>
            </div>
            <div className="calendar">{renderDays()}</div>
            <div className="predefined-ranges">
                {predefinedRanges.map((range, index) => (
                    <button
                        key={index}
                        className={selectedRange === index ? 'active-predefined-range' : 'deactive-predefined-range'}
                        onClick={() => handlePredefinedRangeClick(range.range(), index)}
                    >
                        {range.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DateRangePicker;
