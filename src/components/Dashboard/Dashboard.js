import {Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchBar from "material-ui-search-bar";
import Cookies from "js-cookie"
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from "@reach/router";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import '../../assets/css/sidebar.css';
import logo from '../../assets/img/appbar_logo.jpg'
import sidebarbg from '../../assets/img/sidebar-bg.jpg'
import {BsBuilding} from 'react-icons/bs'
import {BsPeople} from 'react-icons/bs'
import {GiTakeMyMoney} from 'react-icons/gi'
import {BsFillPieChartFill} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
import {FaTools} from 'react-icons/fa'
import {BsBellFill} from 'react-icons/bs'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#95CC6F"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    outline:"none",
    border:"none",
    '&:focus':{
      outline:"none",
      border:"none",
    },
    '&:active':{
      outline:"none",
      border:"none",
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: "url(" + sidebarbg + ")",
    padding:'0'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  dropitems: {
    width: "100%",
  },
  headings: {
    color: "white",
    // fontSize:"16px"
  },
  headingblock: {
    
    '&:hover': {
     
      cursor: "pointer",
    }
  },
  topwrap:{
    display:"flex",
    justifyContent: "space-between",
    alignItems:"center",
    width: "100%",
    [theme.breakpoints.down('xs')]: {
      justifyContent: "flex-end",
    },
  },
  lead: {
    [theme.breakpoints.down('xs')]: {
      display: "none"
    },
  },
  profiledrop:{
    background: "#ffffff",
    padding:"0",
    width: "150px",
    height:"57px",
    outline:"none",
    borderTopLeftRadius:"35px",
    borderBottomLeftRadius:"35px",
    borderTopRightRadius:"0px",
    borderBottomRightRadius:"0px",
    '&:hover': {
      background: "#ffffff",
      padding:"0",
      outline:"none",
      border:"none",
    },
    '&:focus': {
      background: "#95CC6F",
      padding:"0",
      outline:"none",
      border:"none",
    }
  },
  itemdropdown: {
    background: "#4b6b34",
    padding: "0"
  },
  dropdownitems: {
    marginTop: "8px",
    '&:hover': {
      background: "#80c904",
      color: "#fff"
    },
 
  },
  subitems:{
    width: "100%",
    padding: "15px",
    paddingLeft: "40px",
    '&:hover': {
      background: "#80c904",
      cursor: "pointer"
    }
  }
}));
function ResponsiveDrawer(props) {

  const classes = useStyles();
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const logout = (e) => {
    Cookies.remove('User Name')
    Cookies.remove('Token')
    
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);
function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
const drawer = (
  <>
  <div   className={classes.headingblock} style={{padding:"16px"}}>  
  <List>
        
        
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                  <BsBuilding className="sidebar-icons"/>
                   <Typography variant="h7" className="sidebar-menu">
                   Flat Allotment
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/createlead'>
                    <ListItem button key={'Create Lead'}>
                    <h7>Create Lead</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/allactiveleads'>
                    <ListItem button key={'Active Lead'}>
                    <h7>Active Lead</h7>
                    </ListItem>
                    </Link>
                   
                    </List>
                
                </AccordionDetails>
            </Accordion>
        </List>
        
        <List>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >                 
                 <BsPeople className="sidebar-icons"/>
                  <Typography variant="h7" className="sidebar-menu">
                   Customers
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/addlead'>
                    <ListItem button key={'Add Lead'}>
                    <h7>Add Lead</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/viewlead'>
                    <ListItem button key={'View Lead'}>
                    <h7>View Lead</h7>
                    </ListItem>
                    </Link>
                    </List>
                
                </AccordionDetails>
            </Accordion>
        </List>

        <List>
        
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                   <GiTakeMyMoney className="sidebar-icons"/>
                   <Typography variant="h7" className="sidebar-menu">
                    Finance
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                    
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/viewdeveloper'>
                    <ListItem button key={'View Developer'}>
                    <h7>View Developer</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/adddeveloper'>
                    <ListItem button key={'Add Developer'}>
                    <h7>Add Developer</h7>
                    </ListItem>
                    </Link>
                   
                    </List>
                
                </AccordionDetails>
            </Accordion>
        </List>

        <List>
        
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <BsFillPieChartFill className="sidebar-icons"/>
                   <Typography variant="h7" className="sidebar-menu">
                   Reports
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/allopentasks'>
                    <ListItem button key={'View All Open Tasks'}>
                    <h7>View All Open Tasks</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/alltasks'>
                    <ListItem button key={'View All Tasks'}>
                    <h7>View All Tasks</h7>
                    </ListItem>
                    </Link>
                    
                    </List>
                
                </AccordionDetails>
            </Accordion>
        </List>

        <List>
        
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                        <AiOutlineSetting className="sidebar-icons"/>
                   <Typography variant="h7" className="sidebar-menu">
                   Configurations
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/viewinvoice'>
                    <ListItem button key={'View Invoices'}>
                    <h7>View Invoices</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/addinvoice'>
                    <ListItem button key={'Generate Invoice'}>
                    <h7>Generate Invoice</h7>
                    </ListItem>
                    </Link>
                    </List>
                
                </AccordionDetails>
            </Accordion>
        </List>
  </div>
</>
  );

return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{
          backgroundColor: "#EE4B46",
        }} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.topwrap}>
          <Typography className="ilead-heading" variant="h5" >
            <img className="logo" src={logo} alt="logo"/>
          </Typography>
          <div  style={{display: 'flex'}} >
          
          <a href="/" className="icon-link"><BsBellFill/></a>

          <a href="/" className="icon-link"><FaTools/></a>
          <Dropdown >
                    <Dropdown.Toggle className={classes.profiledrop} id="dropdown-basic">
                    <img style={{height : "35px", borderRadius: "50%", width: "35px", marginLeft:"80px"}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdr9qvYDbxDukbXL8OOpDCa7kqsh9dTXP3w&usqp=CAU" />
                     </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {/* <Dropdown.Item className={classes.username} >Signed in as<br/><h6 style={{marginTop: "5px"}} >Victor</h6></Dropdown.Item> */}
                    <div style={{paddingLeft : "25px"}} className={classes.username} >Signed in as<br/><h6 style={{marginTop: "5px"}} >{Cookies.get('User Name')}</h6></div>
                    <hr style={{margin: "0px"}} />
                      <Dropdown.Item className={classes.dropdownitems} onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
          </Dropdown>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon style={{color:"white"}}/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
<Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} style={{ padding: '0', margin:'0'}}/>
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {/* <VisibleItemList /> */}
        {props.children}
      </div>
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default ResponsiveDrawer;
