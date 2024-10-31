import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Box, Container } from '@mui/material';
import { Menu, MenuItem, Button } from '@mui/material';
import { Room } from '@mui/icons-material';



export default function CustomDayOfWeekFormat() {
    const [value, setValue] = React.useState(dayjs()); // Sets the current date
    const mobileTimePickerRef = React.useRef(null);
    const [dateCalendarMaxWidth, setDateCalendarMaxWidth] = React.useState(0);
    const [selectedDates, setSelectedDates] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentDate, setCurrentDate] = React.useState(null);
    const [dateColors, setDateColors] = React.useState({});
    const calendarRef = React.useRef(null);

    
    const MultiSelectCalendar = () => {
        const [selectedDates, setSelectedDates] = React.useState([]);

        const handleDateChange = (newDate, event) => {
            if (event.ctrlKey) {
                // Add or remove date from the selection
                setSelectedDates((prevDates) => {
                    const dateStr = newDate.format('YYYY-MM-DD');
                    if (prevDates.includes(dateStr)) {
                            // If date is already selected, remove it
                            return prevDates.filter(date => date !== dateStr);
                        } else {
                            // Add new date to the selection
                            return [...prevDates, dateStr];
                        }
                });
            } else {
                // If ctrl key is not pressed, just select the new date
                setSelectedDates([newDate.format('YYYY-MM-DD')]);
            }
        };
    }

        const saveSelectedDates = () => {
            const datesByMonth = {};

            selectedDates.forEach(dateStr => {
                const date = dayjs(dateStr);
                const month = date.format('MMMM');
                const day = date.date();

                if (!datesByMonth[month]) {
                    datesByMonth[month] = [];
                }
                datesByMonth[month].push(day);
            });

            const result = {};
            Object.keys(datesByMonth).forEach(month => {
                result[month] = datesByMonth[month].sort((a, b) => a - b);
            });

            console.log(result);
            alert(JSON.stringify(result));
        };

    

    // function handleDateChange(enteredate, e){
        
    // }

    return (
        <Box id='boxRoomCenter' 
            display="flex" 
            flexDirection={'column'}
            alignItems="center"
            sx={{ border: '5px solid red' }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    id="mydatecalendar"
                    value={null}
                    // onChange={(date, event) => handleDateChange(date, event)}
                    renderDay={(day, selectedDate, DayComponentProps) => {
                        const dateStr = day.format('YYYY-MM-DD');
                        const isSelected = selectedDates.includes(dateStr);

                        return (
                            <div
                                // onClick={(event) => handleDateChange(day, event)}
                                style={{
                                    backgroundColor: isSelected ? 'blue' : 'transparent',
                                    color: isSelected ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                            >
                                {day.date()}
                            </div>
                        );
                    }}
                />

                <MobileTimePicker
                    id="mobiletimepicker"
                    defaultValue={dayjs()}
                    ref={mobileTimePickerRef}
                    sx={{   border: '5px solid yellow', 
                            minWidth: '240', 
                            maxWidth: '240',
                            width:    '240'
                        }}
                />    

            </LocalizationProvider>
            
        
        </Box>
    );
}
