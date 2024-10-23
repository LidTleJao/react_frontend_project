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
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
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
                fontFamily: "Kanit, sans-serif",
                fontSize: "16px"
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
                fontFamily: "Kanit, sans-serif",
                fontSize: "16px"
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
                fontFamily: "Kanit, sans-serif",
                fontSize: "16px"
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
            <Tooltip title="Account settings" arrow>
              <IconButton
                onClick={handleAccountClick}
                size="small"
                sx={{
                  ml: 1,
                  width: 50,
                  height: 50,
                }}
                aria-controls={openAccount ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAccount ? "true" : undefined}
              >
                {user?.image_user ? (
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid white",
                    }}
                    src={user?.image_user}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "primary.main",
                      fontSize: "1.5rem",
                    }}
                  >
                    {user?.name_user[0]}
                  </Avatar>
                )}
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
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "18px",
                  mr: 2, ml: 2, mt: 1
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
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "16px",
                  mr: 2, ml: 2, mb: 1
                }}
              // variant="h6"
              // marginTop={"-10px"}
              >
                {user?.gmail_user}
              </Typography>
              <Divider />
              <MenuItem onClick={navigateToProfilePage} sx={{ fontFamily: "Kanit, sans-serif", fontSize: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px", color: "#666" }}>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>

              <MenuItem onClick={navigateToLoginPage} sx={{ fontFamily: "Kanit, sans-serif", fontSize: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px", color: "#666" }}>
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
