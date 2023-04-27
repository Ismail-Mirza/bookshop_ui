import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, makeStyles, Menu, MenuItem, Button, Hidden, Drawer, useTheme, Divider, List, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import './NavBar.css';
import logo1 from "../../images/logo/logo1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext, SearchContext } from '../../App';
import { Link } from 'react-router-dom';
import Auth from '../Login/use-auth';
import LogOut from '../LogOut/LogOut';
import FullHeight from "react-full-height";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   display: 'none',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'block',
  //   },
  // },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo1: {
    width: '100px',
    margin: '16.5px',
  },
  listItemText: {
    fontSize: '18px',
    fontWeight: '900',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart] = useContext(CartContext);
  const [search, setSearch] = useContext(SearchContext);

  const { window } = props;

  const theme = useTheme();
  const classes = useStyles();
  const auth = Auth();

  // if (auth.user) {
  //   const {name} = auth.user;
  //   return name;
  // }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // useEffect(() => {
  //   if (auth.user) {
  //     setEmailVerified(auth.user.emailVerified);
  //   }
  //   else {
  //     setEmailVerified(null);
  //   }
  // }, [auth.user]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div style={{ padding: "0 10px" }} onClick={handleMenuClose}>
        {
          auth.user && <p style={{ fontWeight: "600" }}>{auth.user.name.slice(0, 8)}...</p>
        }
        <LogOut></LogOut>
      </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        auth.user ?
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              style={{ outline: "none", color: "#498EC5" }}
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </MenuItem> :
          <Link style={{ textDecoration: "none" }} to="/login">
            <Button className="signIn">Sign In</Button>
          </Link>
      }

    </Menu>
  );

  // left drawer
  const drawer = (
    <FullHeight className="section-styles" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}>
      <div style={{ width: "240px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Link onClick={handleDrawerToggle} to="/">
            <img className={classes.logo1} src={logo1} alt="" />
          </Link>
          <FontAwesomeIcon
            style={{
              marginRight: "10px",
              color: "#498EC5",
              cursor: "pointer",
              fontSize: "20px"
            }}
            onClick={handleDrawerToggle}
            icon={faTimes} />
        </div>
        <div className={classes.toolbar} />
        <Divider style={{ backgroundColor: "#498EC5" }} />
        <List className="drawer-btn">
          <Link to="/orders" style={{ textDecoration: "none", color: "#498EC5" }}>
            <ListItem onClick={handleDrawerToggle} button>
              <p style={{ margin: "5px 20px", fontWeight: "600" }}>Orders</p>
            </ListItem>
          </Link>
        </List>
      </div>
      {
        auth.user && <LogOut></LogOut>
      }
    </FullHeight>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="navBar">
      <div className={classes.grow}>
        <AppBar style={{
          backgroundColor: "white",
          color: "#498EC5",
          borderBottom: "1px solid #498EC5",
          boxShadow: "none"
        }} position="fixed">
          <Toolbar>
            <IconButton
              style={{ outline: "none" }}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon style={{ fontSize: "30px" }} />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link to="/">
                <img className="logo1" src={logo1} alt="" />
              </Link>
            </Typography>
            <div className="search">
              <input type="search" onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
              {
                search ?
                  <Link to={search && "/search=" + search} className="disabled">
                    <Button type="submit"><FontAwesomeIcon icon={faSearch} /></Button>
                  </Link> :
                  <span>
                    <Button><FontAwesomeIcon icon={faSearch} /></Button>
                  </span>
              }
            </div>
            <div className={classes.grow} />
            <Link style={{ color: "#498EC5" }} to="/cart">
              <IconButton style={{ outline: "none" }} color="inherit">
                <Badge badgeContent={cart && cart.length} color="secondary">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Badge>
              </IconButton>
            </Link>
            <div className={classes.sectionDesktop}>
              <div>
                {
                  auth.user ?
                    <IconButton
                      style={{ outline: "none" }}
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton> :
                    <Link style={{ textDecoration: "none" }} to="/login">
                      <Button className="signIn">Sign In</Button>
                    </Link>
                }
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                style={{ outline: "none" }}
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
          <div className="secondarySearch">
            <div>
              <input type="search" onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
              {
                search ?
                  <Link to={search && "/search=" + search} className="disabled">
                    <Button type="submit"><FontAwesomeIcon icon={faSearch} /></Button>
                  </Link> :
                  <span>
                    <Button><FontAwesomeIcon icon={faSearch} /></Button>
                  </span>
              }
            </div>
          </div>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <div>
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawPaper }}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </div>
        </Hidden>
      </nav>
    </div>
  );
};

export default NavBar;