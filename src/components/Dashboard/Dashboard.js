import {Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from "js-cookie"
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
import { Link, navigate } from "@reach/router";
import '../../assets/css/sidebar.css';
import logo from '../../assets/img/appbar_logo.jpg'
import sidebarbg from '../../assets/img/sidebar-bg.jpg'
import {BsBuilding} from 'react-icons/bs'
import {BsPeople} from 'react-icons/bs'
import {GiTakeMyMoney} from 'react-icons/gi'
import {BsFillPieChartFill} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
import {AiOutlineCalculator} from 'react-icons/ai'
import {FaTools} from 'react-icons/fa'
import {BsBellFill} from 'react-icons/bs'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from "../../assets/img/avatar.png"



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
    navigate('/')
    
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);
function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
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
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/initiateallotment'>
                    <ListItem button key={'Create Application'}>
                    <h7>Create Application</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofapplicationform'>
                    <ListItem button key={'Create Lead'}>
                    <h7>List of Application</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofunits'>
                    <ListItem button key={'Create Lead'}>
                    <h7>Flats / Units</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/carparkinglist'>
                    <ListItem button key={'Create Lead'}>
                    <h7>Car Parking</h7>
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
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/viewcustomers'>
                    <ListItem button key={'Customer List'}>
                    <h7>Customer List</h7>
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
                
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofdemand'>
                    <ListItem button key={'Demands'}>
                    <h7>Demands</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofdemand'>
                    <ListItem button key={'Credit Voucher'}>
                    <h7>Credit Voucher</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofdemand'>
                    <ListItem button key={'Debit Voucher'}>
                    <h7>Debit Voucher</h7>
                    </ListItem>
                    </Link>

                    

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/addcash'>
                    <ListItem button key={'Deposit Cash'}>
                    <h7>Deposit Cash</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofcashdeposit'>
                    <ListItem button key={'Cash Book'}>
                    <h7>Cash Book</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/issuecheque'>
                    <ListItem button key={'Issue Cheque'}>
                    <h7>Issue Cheque</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofcheque'>
                    <ListItem button key={'Cheque Book'}>
                    <h7>Cheque Book</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/viewtds'>
                    <ListItem button key={'TDS'}>
                    <h7>TDS</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listoftransaction'>
                    <ListItem button key={'Transactions'}>
                    <h7>Transactions</h7>
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
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/addmember'>
                    <ListItem button key={'Add User'}>
                    <h7>Add User</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/viewuser'>
                    <ListItem button key={'View User'}>
                    <h7>View User</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/addsite'>
                    <ListItem button key={'Add Site'}>
                    <h7>Add Site</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/managesite'>
                    <ListItem button key={'Manage Site'}>
                    <h7>Manage Site</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/addtdsrates'>
                    <ListItem button key={'Add TDS Rates'}>
                    <h7>Add TDS Rates</h7>
                    </ListItem>
                    </Link>
                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/viewtdsrates'>
                    <ListItem button key={'View TDS Rates'}>
                    <h7>View TDS Rates</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/addloanbank'>
                    <ListItem button key={'Add Loan Bank'}>
                    <h7>Add Loan Bank</h7>
                    </ListItem>
                    </Link>

                    <Link style={{ color: '#073b4c', textDecoration: 'none'}} to='/dashboard/listofbanks'>
                    <ListItem button key={'List of Loan Bank'}>
                    <h7>Loan Banks</h7>
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
          <Link to="/dashboard/homeloancalculator" className="icon-link"><AiOutlineCalculator /></Link>
          <Link to="/" className="icon-link"><BsBellFill/></Link>
          <Link to="/dashboard/tasklist" className="icon-link"><FaTools  onClick={() => {Cookies.set('TaskActiveKey', 'first')}}/></Link>
          <Button
          style={{backgroundColor:"white",borderTopLeftRadius:"30px",borderBottomLeftRadius:"30px"}}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {Cookies.get('FullName')}&nbsp;&nbsp;<img style={{height : "35px", borderRadius: "50%", width: "35px"}}  src={Avatar} />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    
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
