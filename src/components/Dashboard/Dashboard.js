import React from 'react';
import clsx from 'clsx';
import { Link ,  navigate } from '@reach/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {HomeRounded} from '@material-ui/icons';
import {CategoryRounded} from '@material-ui/icons';
import {PhonelinkRounded} from '@material-ui/icons';
import {ConfirmationNumberRounded} from '@material-ui/icons';
import {GTranslateRounded} from '@material-ui/icons';
import {HomeWorkRounded} from '@material-ui/icons';
import {SettingsRounded} from '@material-ui/icons';
import {ExitToAppRounded} from '@material-ui/icons';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Cookies from 'js-cookie';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import Tooltip from '@material-ui/core/Tooltip';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Background from "./../../assets/img/background.jpg"
import AppBarBackground from "./../../assets/img/appbarbackground.png"
import FlatAllotment from './../../assets/icons/flatallotment.png';
import Customer from './../../assets/icons/customer.png';
import Tasks from "./../../assets/icons/tasks.png"
import Finance from "./../../assets/icons/finance.png"
import Reports from "./../../assets/icons/reports.png"
import Configurations from "./../../assets/icons/configurations.png"
import Logo from "./../../assets/icons/logo.png"
import FullLogo from "./../../assets/img/logofull.png"
import "./../../assets/css/style.css"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerPaper: {
    backgroundImage: 'url(' + Background + ')'
  },
}));

 const Dashboard=(props) =>{
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{backgroundImage: 'linear-gradient(to right, #56ab2f, #a8e063)'}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
     >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
              [classes.appBarPaper] : open,
            })}
          >
            <img src={Logo} height="40" width="40"/>
          </IconButton>
          <Typography variant="h6" noWrap>
           Westroad Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.drawerPaper] : open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerPaper] : !open || open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src={FullLogo} height="45" width="160" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          
            <ListItem button >
              <Link to="/test2"><ListItemIcon><Tooltip title="Flat Allotment"><img src={FlatAllotment} height="55" width="55" /></Tooltip></ListItemIcon></Link>
              <h5 className="pl-2" onClick={()=>navigate("/notfound")}>Flat Allotment</h5>
            </ListItem>
            <ListItem button >
            <Link to="/"><ListItemIcon><Tooltip title="Customer"><img src={Customer} height="53" width="55"/></Tooltip></ListItemIcon></Link>
              <h5 className="pl-2">Customer</h5>
            </ListItem>
            
            <ListItem button >
              <Link to="/"><ListItemIcon><Tooltip title="Task Lists"><img src={Tasks} height="55" width="56"/></Tooltip></ListItemIcon></Link>
              <h5 className="pl-2">Task Lists</h5>
            </ListItem>
           
            <ListItem button >
            <Link to="/" ><ListItemIcon><Tooltip title="Finance"><img className="pl-1"src={Finance} height="45" width="50"/></Tooltip></ListItemIcon></Link>
            <h5 className="pl-2">Finance</h5>
            </ListItem>
            <ListItem button >
            <Link to="/" ><ListItemIcon><Tooltip title="Reports"><img src={Reports} heigth="51" width="55" /></Tooltip></ListItemIcon></Link>
            <h5 className="pl-2" >Reports</h5>
            </ListItem>
            
            <ListItem button >
              <Link to="/"><ListItemIcon><Tooltip title="Configurations"><img src={Configurations} heigth="51" width="55" /></Tooltip></ListItemIcon></Link>
              <h5 className="pl-2">Configurations</h5>
            </ListItem>
            
            
          
          
        </List>
        
        
       
      
            
        
        
      </Drawer>
      <main className={classes.content}>
      {props.children}
      </main>
      
    </div>
  );
}
export default Dashboard;