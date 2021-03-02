import React from 'react';
import clsx from 'clsx';
import { Link ,  useHistory } from 'react-router-dom';
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
import Background from "./../../assets/img/background.png"


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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
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
  let history = useHistory();

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
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      style={{backgroundColor : "#00A5E4"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          
            <ListItem button >
              <Link to="/test2"><h4 className="pl-2"><ListItemIcon><Tooltip title="Home"><HomeRounded /></Tooltip></ListItemIcon></h4></Link>
              <h5 onClick={()=>history.push("/test2")}>Home</h5>
            </ListItem>
            <ListItem button >
            <Link to="/"><h4 className="pl-2"><ListItemIcon><Tooltip title="Catelog"><CategoryRounded/></Tooltip></ListItemIcon></h4></Link>
              <h5 >Catelog</h5>
            </ListItem>
            
            <ListItem button >
              <Link to="/"><h4 className="pl-2"><ListItemIcon><Tooltip title="Promotions"><ConfirmationNumberRounded /></Tooltip></ListItemIcon></h4></Link>
              <h5 >Promotions</h5>
            </ListItem>
           
            <ListItem button >
            <Link to="/" ><h4 className="pl-2"><ListItemIcon><Tooltip title="Orders"><ShoppingCartRoundedIcon /></Tooltip></ListItemIcon></h4></Link>
            <h5 >Orders</h5>
            </ListItem>
            <ListItem button >
            <Link to="/" ><h4 className="pl-2"><ListItemIcon><Tooltip title="Customers"><PeopleAltRoundedIcon /></Tooltip></ListItemIcon></h4></Link>
            <h5 >Customers</h5>
            </ListItem>
            {/*<ListItem button >
            <Link to="/deliveryboy" ><h4 className="pl-2"><ListItemIcon><Tooltip title="Delivery Boy"><EmojiPeopleRoundedIcon /></Tooltip></ListItemIcon></h4></Link>
            <h5 onClick={setting}>Delivery Boy</h5>
            </ListItem>*/}
            {/*<ListItem button >
              <Link to="/inventory"><h4 className="pl-2"><ListItemIcon><Tooltip title="Inventory"><HomeWorkRounded/></Tooltip></ListItemIcon></h4></Link>
              <h5 onClick={inventory}>Inventory</h5>
            </ListItem>*/}
            <ListItem button >
              <Link to="/"><h4 className="pl-2"><ListItemIcon><Tooltip title="Reports"><AssessmentIcon/></Tooltip></ListItemIcon></h4></Link>
              <h5 >Reports</h5>
            </ListItem>
            <ListItem button >
            <Link to="/" ><h4 className="pl-2"><ListItemIcon><Tooltip title="Settings"><SettingsRounded /></Tooltip></ListItemIcon></h4></Link>
            <h5 >Settings</h5>
            </ListItem>
            
          
          
        </List>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
       
      
            
        
        
      </Drawer>
      <main className={classes.content}>
      {props.children}
      </main>
      
    </div>
  );
}
export default Dashboard;