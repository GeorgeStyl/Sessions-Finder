import * as React from 'react';
import {
    Link as RouterLink,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
    useParams,
    useHref
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Room from './Room';
import { Dialog, DialogTitle,List, ListItem, ListItemButton } from '@mui/material';









const handleCardMediaClick = () => {
    alert('CardMedia clicked!');
};

const MyCard = (props) => {
    const isLargeScreen = useMediaQuery( {query:'(min-width: 1200px)'});
    const isMediumScreen = useMediaQuery({query: '(min-width: 768px)'}); // used for small screens too
    const navigate = useNavigate()     
    const [openDialog, setOpenDialog] = React.useState(false)

    
    return (        
        <Card 
            sx={{
                width: '75%', 
                maxWidth: { xs: 300, sm: 360, md: 500 },  // Responsive MaxWidth
                margin: '0 auto'  // Center the card horizontally on small screens
            }}>
        <CardMedia onClick={handleCardMediaClick} 
            sx={{ 
                height: { xs: 120, sm: 140, md: 180 },  // Responsive height
                backgroundColor: props.genRandColor,
                image:"/path/to/your/image.jpg",
                title:"Image",
                component:"img",
                alt:"Image Description",
                cursor: 'pointer',
                '&:hover': {opacity: 0.8}
            }}
        />
        <CardContent 
            sx={{
                alignItems: "flex",
                justifyContent: "center"
            }}>
            <Stack direction="row" spacing={1} sx={{justifyContent: "center"}}>
                <Chip label="Session Found!" variant="outlined" sx={{backgroundColor: 'green', color: 'white'}}/>
                <Chip label="Searching for date..." variant="outlined" sx={{backgroundColor: 'orange', color: 'white'}}/>
            </Stack>
            Owner's Rooom
        </CardContent>

        {isLargeScreen && <CardActions 
                            sx={{ 
                                alignItems: "stretch", 
                                justifyContent: "space-between",
                                flexDirection: { xs: 'column', sm: 'row' }  // Stack buttons vertically on small screens
                            }}>

                <Button size="small">Check</Button>
                <Button size="small" onClick={(e) => { navigate('/todolist', { replace: true }) }}>Settings</Button>
                <Button size="small" color="error" onClick={(e) => { navigate('/todolist', { replace: true }) }}>Leave</Button>
            </CardActions>
        }

        {(isMediumScreen && !isLargeScreen) &&
            <CardActions 
                sx={{ 
                    alignItems: "stretch", 
                    justifyContent: "space-between",
                    flexDirection: { xs: 'column', sm: 'row' }  // Stack buttons vertically on small screens
                }}>
                <Button size="small">Check</Button>
                <Button size="small" onClick={(e) => { navigate('/todolist', { replace: true }) }}>Settings</Button>
                <Button size="small" color="error" onClick={(e) => { navigate('/todolist', { replace: true }) }}>Leave</Button>
            </CardActions>
        }
        { (!isMediumScreen && !isLargeScreen) &&
            <CardActions 
                sx={{
                    justifyContent:"center",
                    alignItems: "stretch", 
                    flexDirection: { xs: 'column', sm: 'row' }  // Stack buttons vertically on small screens
                }}>
                <Button size="small">Check</Button>
                <Button size="small" onClick={(e) => { navigate('/todolist', { replace: true }) }}>Settings</Button>
                <Button size="small" color="error" onClick={(e) => { navigate('/todolist', { replace: true }) }}>Leave</Button>
            </CardActions>
        }
        
    </Card>

    );
};



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const colorsbg = ["white", "red", "yellow"]


export default function Home() {
    const [rooms, setRooms] = React.useState( [{roomID: "1", roomTitle: "Testing1", avatar: "avatar1", cardImage: "cardImage1", cardOwnerName: "User's 1 card"}, {roomID: "2", roomTitle: "Testing2", avatar: "avatar2", cardImage: "cardImage2", cardOwnerName: "User's 2 card"}, {roomID: "3", roomTitle: "Testing3", avatar: "avatar3", cardImage: "cardImage3", cardOwnerName: "User's 4 card"} ] );
    const navigate = useNavigate()      
    

    function genRandColor(){
        let letters = "0123456789ABCDEF"; 
        // HTML color code starts with # 
        let color = '#'; 
        // Generating 6 times as HTML color code  
        // consist of 6 letter or digits 
        for (let i = 0; i < 6; i++)  color += letters[(Math.floor(Math.random() * 16))];         
        return color
    }


    return (
        /* *OWNED ROOMS */
        <Container id='ownedDividerContainer' sx={{witdh: "100%", marginTop: "20px"}} >
            <Accordion sx={{marginBottom: "20px"}} slotProps={{ transition: { unmountOnExit: true } }} /* for perfomance */>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>Your Rooms</Typography>
                </AccordionSummary> 
                    <Box sx={{width: '100%', minHeight:"60vh", maxHeight:"60vh", height:"60vh" ,overflow:"scroll"}}>
                        <Grid   container 
                                rowSpacing={1} 
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                                rowGap={5}
                        >  {/* Center items horizontally */}
                            {rooms.map((room) => (
                                <Grid key={room.roomID} xs={12} sm={6} display="flex" justifyContent="center"> {/* Center cards horizontally */}
                                    <MyCard  genRandColor={genRandColor()} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
            </Accordion> 
            
            {/* *JOINED ROOMS* */}
            <Accordion slotProps={{ transition: { unmountOnExit: true } }} /* for perfomance */>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel2-header"
                    >
                        <Typography>Rooms You Have Joined</Typography>
                    </AccordionSummary> 
                <Box sx={{width: '100%', minHeight:"60vh", maxHeight:"60vh", height:"60vh" ,overflow:"scroll"}}>
                        <Grid   container 
                                rowSpacing={1}  
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                                rowGap={5}
                                margin='auto'
                        > 
                            {rooms.map((room) => (
                                <Grid key={room.roomID} xs={12} sm={6} display="flex" justifyContent="center"> {/* Center cards horizontally */}
                                    <MyCard  genRandColor={genRandColor()} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
            </Accordion>
        </Container>
    )
}


