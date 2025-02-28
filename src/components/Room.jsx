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
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import isBetweenPlugin from 'dayjs/plugin/isBetween';


dayjs.extend(isBetweenPlugin);

    const CustomPickersDay = styled(PickersDay, {
        shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
    })(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.main,
            },
    }),
    ...(isHovered && {
            backgroundColor: theme.palette.primary.light,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.light,
            },
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.primary.dark,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 6 && {
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
        }),
    }));

    const isInSameWeek = (dayA, dayB) => {
        if (dayB == null) {
            return false;
        }

            return dayA.isSame(dayB, 'week');
        };

    function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
            <CustomPickersDay
                {...other}
                day={day}
                sx={{ px: 2.5 }}
                disableMargin
                selected={false}
                isSelected={isInSameWeek(day, selectedDay)}
                isHovered={isInSameWeek(day, hoveredDay)}
            />
        );
    }




const MultiSelectedDays = () => {    
    const [value, setValue] = useState(null);
    const refDates = useRef([]);


    const [pickedDates, setPickedDates] = useState([]);
    // console.log("dates", pickedDates);


    const clearSelectedDates = () => {
        setPickedDates([]);
        const refsDays = refDates.current;
        refsDays.splice(0, refsDays.length);
    }

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

    const [hoveredDay, setHoveredDay] = React.useState(null);

    useEffect(() => {
        setPickedDates(refDates.current);
    }, [refDates.current.length]);


//    if (props.isweekly === 'no' ) 
        return(
            <>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateCalendar
                            sx={{padding:'0', margin:'0',height:'100%', verticalAlign:'center'}}
                            value = {value}
                            // disablePast
                            onChange = {(newValue) => handleSetNewVal(newValue)}
                            slots = {{  //! Select multiple days
                                day: (props) => {
                                    const dayNumber = new Date(props.day).getTime();
                                    const refDays = refDates.current;
                                    const isSelected = refDays.indexOf(dayNumber) >= 0;
                                    return <PickersDay {...props} selected={isSelected} />;
                                },
                            }}
                        />
                </LocalizationProvider>

                <button onClick={ (e) => { console.log("button clicked",pickedDates) } }>OK</button>
                <button onClick={clearSelectedDates}>CANCEL</button>
            </>
        );
}






const WeeklySelectedDays = () => {
    const [value, setValue] = useState(null);
    const refDates = useRef([]);


    const [pickedDates, setPickedDates] = useState([]);

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

    useEffect(() => {
        setPickedDates(refDates.current);
    }, [refDates.current.length]);


    const [hoveredDay, setHoveredDay] = React.useState(null);
    

    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    showDaysOutsideCurrentMonth
                    displayWeekNumber
                    slots={{ day: Day }}
                    slotProps={{
                        day: (ownerState) => ({
                            selectedDay: value,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }),
                    }}
                />
            </LocalizationProvider>
        </>
    );
}




export default function Room() {
    // const [value, setValue] = React.useState(dayjs()); // Sets the current date
    const mobileTimePickerRef = useRef(null);
    const [dateCalendarMaxWidth, setDateCalendarMaxWidth] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const [dateColors, setDateColors] = useState({});
    const calendarRef = useRef(null);
    // Switch
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        console.log('toggleswitch')
        setIsEnabled(!isEnabled);
    }




    return (

        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Box sx={{padding:'0', margin:'0',height:'100%', verticalAlign:'center'}}>
                <FormGroup>
                    <FormControlLabel control={<Switch  onChange={toggleSwitch}/>} label={isEnabled ? "Disable Weekly Pick" : "Enable Weekly Pick"} />
                </FormGroup>
                { isEnabled && <WeeklySelectedDays />}
                { !isEnabled && <MultiSelectedDays />  }              
            </Box>
        </Box>
    );
};
