import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/icon-left-font-monochrome-black.svg";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const PF = process.env.REACT_APP_PICTURES_URL;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="bg-danger">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="justify-content-between">
          <Box>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              <img className="navbar-brand" src={logo} alt="logo"></img>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <img className="navbar-brand" src={logo} alt="logo"></img>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="utilisateur" src={PF + "profile-picture.png"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to="/profil" className="nav-item nav-link active">
                    Profil
                  </Link>
                  <Logout />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

/* import React from "react";
import logo from "../assets/icon-left-font-monochrome-black.svg";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger d-flex">
        <div className="col-11">
          <img className="navbar-brand" src={logo} alt="logo"></img>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-1" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/profil" className="nav-item nav-link active">
              <FaUserAlt title="Mon profil" />
            </Link>
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar; */
