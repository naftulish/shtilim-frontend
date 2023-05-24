import React, { useState } from 'react';
import './Layout.css';
import Main from '../Main/Main';
import Aside from '../Aside/Aside';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export function Layout() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDrawer = () => {
        setIsExpanded(!isExpanded);
    };

    const list = (
        <Box sx={{ width: 'auto', marginTop: '50px' }}>
            <List>
                {['סטודנטים'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <div style={{ height: '50px', width: '100vw', backgroundColor: 'blue', position: 'fixed', top: 0 }}>
                <Button style={{ color: 'red' }} onClick={toggleDrawer}>
                    {isExpanded ? 'Close Drawer' : 'Open Drawer'}
                </Button>
            </div>

            <Drawer
                anchor="right"
                open={isExpanded}
                onClose={toggleDrawer}
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isExpanded ? 240 : 60,
                        boxSizing: 'border-box',
                        transition: 'width 0.2s ease-in-out',
                        marginTop: '50px', // Adjust the margin top as per your needs
                    },
                }}
            >
                {list}
            </Drawer>
        </div>
    );
}

export default Layout;
