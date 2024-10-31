import * as React from 'react'

import {
  Routes,
  Route,
  Link as RouterLink,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
  useParams,
  useHref
} from "react-router-dom";
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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


import logo from './logo.svg';
// import './App.css';
import Appmenu from './components/appmenu';
import MyButton from './components/MyButton';
import LoginForm from './components/loginform';
import Profile from './components/Profile';
import {AuthContext} from './context/AuthContext'
import Home from './components/Home';
import TodoList from './components/todoslist';
import Room from './components/Room'

function App() {

  const [user, setUser] = React.useState({ userName: "", id:0, level:"" });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const logout = () => {
    setUser({ userName: "", id:0, level:"" });
    setIsLoggedIn(false);
  };
  const contextfun = () => {
    console.log("....  context fun .....")
  }

  const [appstate, setAppstate] = React.useState({
    isloogedin: false,
    username: "",
    password: "",
  })





  console.log("app appstate is", appstate)




  // if(appstate.isloogedin===false)  return(  <LoginForm  cb={loginHandle}  /> )
  return (
    <AuthContext.Provider  value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout, contextfun }} >

      {/* {!isLoggedIn && <LoginForm />}  */}

      {/*  {isLoggedIn && (   */}
        <React.Fragment id='App_Fragment'>
          <Appmenu position="sticky" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/profile" element={<Profile />} /> 
              <Route path="/todolist" element={<TodoList />} />
              <Route path="/room" element={<Room />} />      
            </Routes>
          </React.Fragment>

    </AuthContext.Provider>
  );
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function oldHome(){
return(

  <div >
    <p>
    Home
    </p>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027', color:"white" }} >Item 1</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }}>Item 2</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }}>Item 3</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }}>Item 3</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }} >Item 1</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }}>Item 2</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }}>Item 3</Box>
        <Box sx={{padding:2, textAlign:'center', backgroundColor:'#1A2027' }}>Item 3</Box>
    </Stack>
      </div>
)
}


function NoPage(){
  return(<div>What do you want header</div>)
}

function OldMyButton(props){
  console.log("my bttom props", props)
  return(
    <React.Fragment>
      <button  style={{padding:'3px', backgroundColor: props.color}} >
        {props.title}
      </button>
        </React.Fragment>
  )
}

export default App;
