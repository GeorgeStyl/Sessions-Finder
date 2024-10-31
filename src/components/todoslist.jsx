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

export default function TodoList(props){
    return(
        <React.Fragment>
            <h2  style={{ color: "orange" , marginLeft: '3px'}}>TODO::</h2>
            <h2>
                <ul>
                    <li>fix "leave" button (Home.jsx)</li>
                    <li>fix redirection for all links</li>
                </ul>
            </h2>    
        </React.Fragment>
    )
}

