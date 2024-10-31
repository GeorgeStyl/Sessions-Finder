import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// ------------------  import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Box, Container, Typography } from '@mui/material';
import { Menu, MenuItem, Button } from '@mui/material';

import { useState, useEffect, useRef } from "react";
// import { LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';



export default function Room() {
    // const [value, setValue] = React.useState(dayjs()); // Sets the current date
    const mobileTimePickerRef = useRef(null);
    const [dateCalendarMaxWidth, setDateCalendarMaxWidth] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const [dateColors, setDateColors] = useState({});
    const calendarRef = useRef(null);

    const [value, setValue] = useState(null);

    const refDates = useRef([]);

    const handleSetNewVal = (date) => {
    
        if (!date) return;
        setValue(date);
        const pickedDay = new Date(date).getTime();
        const refsDays = refDates.current;
        const inxPickedDay = refsDays.indexOf(pickedDay);
        if (inxPickedDay >= 0) {
            refsDays.splice(inxPickedDay, 1);
        } else {
            refsDays.push(pickedDay);
        }
    };

    const clearSelectedDates = () => {
        setPickedDates([]);
        const refsDays = refDates.current;
        refsDays.splice(0, refsDays.length);
    }

    const displayDateCalendraProps = () => {

    }

    const [pickedDates, setPickedDates] = useState([]);
    console.log("dates", pickedDates);

    useEffect(() => {
        setPickedDates(refDates.current);
    }, [refDates.current.length]);


    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                    value = {value}
                    disablePast
                    onChange = {(newValue) => handleSetNewVal(newValue)}
                    slots = {{
                        day: (props) => {
                            const dayNumber = new Date(props.day).getTime();
                            const refDays = refDates.current;
                            const isSelected = refDays.indexOf(dayNumber) >= 0;
                            return <PickersDay {...props} selected={isSelected} />;
                        },
                    }}
                />
            </LocalizationProvider>

            <Button onClick = {() => displayDateCalendraProps()}>
                OK
            </Button>

            <Button onClick = {() => clearSelectedDates()}>
                Cancel
            </Button>
            
                {refDates.current.map( (item) => <Typography>{item}</Typography>)}
            
        </Box>
    );
};
