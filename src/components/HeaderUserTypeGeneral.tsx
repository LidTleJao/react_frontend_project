import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function HeaderUserTypeGeneral() {
  const user = JSON.parse(localStorage.getItem("objUser")!);

  const [anchorElAccount, setAnchorElAccount] =
    React.useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorElAccount);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAnchorElAccount(null);
  };

  const navigate = useNavigate();

  function navigateToLoginPage() {
    navigate("/");
  }
  function navigateToHotelPage() {
    navigate("/Hotel");
  }
  function navigateToConcertPage() {
    navigate("/Concert");
  }
  function navigateToPackagePage() {
    navigate("/Package");
  }
  function navigateToProfilePage() {
    navigate("/Profile");
  }
  function navigateToEditProfilePage() {
    navigate("/EditProfile");
  }
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{ backgroundColor: "black", justifyContent: "end", height: 80 }}
        >
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Button
              variant="text"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                ml: 3,
                fontFamily: "Mitr, sans-serif",
                fontStyle: "oblique",
              }}
              onClick={navigateToPackagePage}
            >
              แพ็คเกจ
            </Button>
            <Button
              variant="text"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                ml: 5,
                fontFamily: "Mitr, sans-serif",
                fontStyle: "oblique",
              }}
              onClick={navigateToHotelPage}
            >
              โรงแรม
            </Button>
            <Button
              variant="text"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                ml: 5,
                fontFamily: "Mitr, sans-serif",
                fontStyle: "oblique",
              }}
              onClick={navigateToConcertPage}
            >
              คอนเสิรต์
            </Button>
          </div>
          <div style={{ flexGrow: 1.5, display: "flex", flexDirection: "row" }}>
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                ml: 2,
                fontFamily: "Mitr, sans-serif",
                fontStyle: "normal",
              }}
              variant="h2"
              marginTop={"25px"}
            >
              TEE
            </Typography>
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "skyblue",
                fontFamily: "Mitr, sans-serif",
                fontStyle: "normal",
              }}
              variant="h2"
              marginTop={"25px"}
            >
              MI
            </Typography>
          </div>
          <div
            style={{ display: "flex", marginRight: 55, flexDirection: "row" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleAccountClick}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={openAccount ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAccount ? "true" : undefined}
              >
                {(user?.image_user === "" && (
                  <>
                    <Avatar sx={{ width: 35, height: 32 }}>
                      {user?.name_user[0]}
                    </Avatar>
                  </>
                )) ||
                  (user?.image_user != "" && (
                    <>
                      <Avatar sx={{ width: 35, height: 32 }} src={user?.image_user}></Avatar>
                    </>
                  ))}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElAccount}
              id="account-menu"
              open={openAccount}
              onClose={handleAccountClose}
              onClick={handleAccountClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                  ml: 1,
                }}
                variant="h6"
                // marginTop={"-10px"}
              >
                {user?.name_user}
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  // fontWeight: "",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                  ml: 1,
                }}
                // variant="h6"
                // marginTop={"-10px"}
              >
                {user?.gmail_user}
              </Typography>
              <Divider />
              <MenuItem
              onClick={navigateToProfilePage}
              >
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={navigateToEditProfilePage}
              >
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                Setting Account
              </MenuItem>
              <MenuItem onClick={navigateToLoginPage}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderUserTypeGeneral;
