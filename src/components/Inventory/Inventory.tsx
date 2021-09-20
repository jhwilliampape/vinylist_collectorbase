import React, { useState } from 'react';
import { Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Theme,
    useTheme,
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { RouteComponentProps, withRouter, Switch, Route, Link } from "react-router-dom";

import { DataTable, SearchForm } from '../../components';

import SpotifyWebApi from 'spotify-web-api-node';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: '0',
            margin: '0',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: 'red'
        },
        icon: {
            color: 'red'
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            color: 'white',
            backgroundColor: 'black'
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        toolbar: {
            display: 'flex',
            backgroundColor: 'black'
        },
        toolbar_button: {
            marginLeft: 'auto',
            color: 'white'
        }
    }),
);

interface DashProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
};


export const Inventory = withRouter(( props:DashProps ) => {
    console.log(props)
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => { 
        setDialogOpen(false);
    }

    const itemList = [
        {
            text: 'Home',
            onClick: () => <Link to="/">Home</Link>
        },
        {
            text: 'Log Out',
            onClick: () => <Link to='/logout'>Log Out</Link>
        }
    ]
    
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,

                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Inventory
                    </Typography>
                    <Button className={classes.toolbar_button} onClick={handleDialogClickOpen}>Search Collectorbase</Button>

                        <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Search Collectorbase</DialogTitle>
                            <DialogContent>
                                <DialogContentText></DialogContentText>
                                    <SearchForm />
                            </DialogContent>
                            <DialogActions>
                                {/*<Button onclick = {handleDialogClickClose} color="secondary">Search</Button>*/}
                            </DialogActions>
                        </Dialog>
                </Toolbar>
            </AppBar>
            <MUIDrawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                {itemList.map((item, index) => {
                    const { text, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
                </List>
            </MUIDrawer>


            <main className={clsx(classes.content, {  //Main Area//
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <h1>Hello World until data shows up</h1>
                <DataTable />
            </main>
            
        </div>
        )
    });
