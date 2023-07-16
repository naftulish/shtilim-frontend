

import axios from "axios";
import * as React from "react";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";

import logo from "../../../Assets/logo.png";
import logokivun from "../../../Assets/logo_kivun.png";

import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import { Box } from "@mui/material";
import { SchoolRounded } from "@mui/icons-material";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...openedMixin(theme),
  "& .MuiDrawer-paper": openedMixin(theme)
}));

export function Layout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = React.useState("");
  const token = localStorage.getItem("token");
  
  let user = null;

  if(token){
    const payloadjJwt = jwtDecode(token);
    
    user = (payloadjJwt as any).user;
  }

  
  if(!token) return <Navigate to='/login' />;
  

  
  

  axios.interceptors.request.use(request => {
    const token = localStorage.getItem("token");
    if (token) request.headers.Authorization =  "Bearer " + token ;
    return request;
});

  // React.useEffect(() => {
  //   setActiveButton(location.pathname);
  // }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Replace "/login" with the actual login page path
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setActiveButton(path);
  };

  return (
    <div dir="rtl" style={{ paddingBottom: '100px' }}>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" anchor="right">
          <img src={logo} alt="" />

          <Box sx={{ width: "60px", marginTop: "20px" }}>
            <List>
              {[
                { text: 'ראשי', path: '/', icon: <HomeIcon /> },
                { text: 'תלמידים', path: '/students', icon: <SchoolRounded /> },
                
                { text: 'קבוצות', path: '/groups', icon: <GroupsIcon /> },
                { text: 'תוכניות', path: '/plans', icon: <AssignmentIcon /> },
                
                { text: 'הגדרות', path: '/users', icon: <SettingsIcon /> },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => handleMenuItemClick(item.path)}
                    selected={activeButton === item.path}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          

          <div className="credit">
              <div className="user">
                {user?.firstName} {user?.lastName}
              </div>
              <Button variant="contained" onClick={handleLogout}>
              התנתקות
              </Button>
              <br />
            <div>
              
              <span>פותח בשיתוף</span>
              <img src={logokivun} alt=""  />
            </div>
            <span>Version 1.0.0</span>
          </div>

        </Drawer>
        <Box className="box-main-naf" component="div" sx={{ flexGrow: 1, p: 3 }}>
          <Main />
        </Box>

      </Box>

    </div>
  );
}

export default Layout;
