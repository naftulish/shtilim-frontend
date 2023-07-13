// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import GroupsIcon from '@mui/icons-material/Groups';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import Main from "../Main/Main";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen
//   }),
//   overflowX: "hidden"
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`
//   }
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open"
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   ...(open && {
//     marginRight: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   })
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open"
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme)
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme)
//   })
// }));

// export  function Layout() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div dir="rtl">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="fixed" open={open}>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//             //    edge="start"
//               sx={{
//                 marginRight:0,
//                 ...(open && { display: "none" })
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div" style= {{color: 'black'}}>
//              תפריט
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open} anchor="right">
//           <DrawerHeader>
//             <IconButton onClick={handleDrawerClose}>
//               {theme.direction === "rtl" ? (
//                 <ChevronRightIcon />
//               ) : (
//                 <ChevronLeftIcon />
//               )}
//             </IconButton>
//           </DrawerHeader>
//           <Divider />

//          <Box sx={{ width: '60px', marginTop: '20px' }}>
//              <List>
//                  {['תלמידים', 'תוכניות', 'הוספת תלמידים', 'הגדרות'].map((text, index) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                             {index  === 0 ? <GroupsIcon /> :  <></>}
//                             {index  === 1 ? <AssignmentIcon /> :  <></>}
//                             {index  === 2 ? <PersonAddIcon /> :  <></>}
//                             {index  === 3 ? <SettingsIcon />: <></>}
//                             </ListItemIcon>
//                             <ListItemText primary={text} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>

//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <DrawerHeader />
//           <Main/>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Layout;


// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import GroupsIcon from '@mui/icons-material/Groups';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';


// import { Routes, Route, useNavigate } from 'react-router-dom';

// import Main from "../Main/Main";

// // import ImageComponent from '../ImageComponen/ImageComponent';


// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen
//   }),
//   overflowX: "hidden"
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`
//   }
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open"
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   ...(open && {
//     marginRight: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   })
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open"
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme)
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme)
//   })
// }));

// export function Layout() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const navigate = useNavigate();

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleMenuItemClick = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <div dir="rtl">


//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="fixed" open={open}>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               sx={{
//                 marginRight: 0,
//                 ...(open && { display: "none" })
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div" style={{ color: 'black' }}>
//               תפריט
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open} anchor="right">
//           <DrawerHeader>
//             <IconButton onClick={handleDrawerClose}>
//               {theme.direction === "rtl" ? (
//                 <ChevronRightIcon />
//               ) : (
//                 <ChevronLeftIcon />
//               )}
//             </IconButton>
//           </DrawerHeader>
//           <Divider />

//           <Box sx={{ width: '60px', marginTop: '20px' }}>
//             <List>
//               {[
//                 { text: 'תלמידים', path: '/students', icon: <GroupsIcon /> },
//                 { text: 'תוכניות', path: '/plans', icon: <AssignmentIcon /> },
//                 { text: 'הוספת תלמידים', path: '/addstudent', icon: <PersonAddIcon /> },
//                 { text: 'הגדרות', path: '/settings', icon: <SettingsIcon /> }
//               ].map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
//                     <ListItemIcon>
//                       {item.icon}
//                     </ListItemIcon>
//                     <ListItemText primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>

//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <DrawerHeader />
//           <Main />
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Layout;


// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import GroupsIcon from '@mui/icons-material/Groups';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// import { Routes, Route, useNavigate } from 'react-router-dom';

// import Main from "../Main/Main";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen
//   }),
//   overflowX: "hidden"
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open"
// })<AppBarProps>(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open"
// })(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...openedMixin(theme),
//   "& .MuiDrawer-paper": openedMixin(theme)
// }));

// export function Layout() {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const handleMenuItemClick = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <div dir="rtl">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="fixed">
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               sx={{
//                 marginRight: 0,
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div" style={{ color: 'black' }}>
//               תפריט
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" anchor="right">
//           <DrawerHeader />
//           <Divider />

//           <Box sx={{ width: '60px', marginTop: '20px' }}>
//             <List>
//               {[
//                 { text: 'תלמידים', path: '/students', icon: <GroupsIcon /> },
//                 { text: 'תוכניות', path: '/plans', icon: <AssignmentIcon /> },
//                 { text: 'הוספת תלמידים', path: '/addstudent', icon: <PersonAddIcon /> },
//                 { text: 'הגדרות', path: '/settings', icon: <SettingsIcon /> }
//               ].map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
//                     <ListItemIcon>
//                       {item.icon}
//                     </ListItemIcon>
//                     <ListItemText primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <DrawerHeader />
//           <Main />
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Layout;



import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/materia/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import logo from "../../../Assets/logo.png";
import logokivun from "../../../Assets/logo_kivun.png";
import PeopleIcon from '@mui/icons-material/People'

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Main from "../Main/Main";
import { Box } from "@mui/material";
import { PeopleRounded, SchoolRounded } from "@mui/icons-material";


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

  React.useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setActiveButton(path);
  };

  return (
    <div dir="rtl" style={{ paddingBottom: '100px' }}>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: 0
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" style={{ color: "black" }}>
              תפריט
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Drawer variant="permanent" anchor="right">
          <img src={logo} alt="" />



          {/* <DrawerHeader /> */}
          {/* <Divider /> */}

          <Box sx={{ width: "60px", marginTop: "20px" }}>
            <List>
              {[

                { text: 'תלמידים', path: '/students', icon: <SchoolRounded /> },
                { text: 'משתמשים', path: '/users', icon: <PeopleRounded /> },
                { text: 'תוכניות', path: '/plans', icon: <AssignmentIcon /> },
                { text: 'קבוצות', path: '/groups', icon: <GroupsIcon /> },
                { text: 'הגדרות', path: '/settings', icon: <SettingsIcon /> },
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


          <Typography variant="subtitle1" sx={{ textAlign: 'right', marginTop: '200px', marginRight: '10px' }}>
            פותח בשיתוף
          </Typography>
          <img src={logokivun} alt="" style={{ marginTop: '10px', marginRight: '10px', display: 'block', width: '200px', height: 'auto' }} />
          {/* margin: '10px auto' */}

        </Drawer>
        <Box className="box-main-naf" component="div" sx={{ flexGrow: 1, p: 3 }}>
          <Main />

        </Box>

      </Box>

    </div>
  );
}

export default Layout;