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
import AddIcon from "@mui/icons-material/Add";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { Hotel, MusicNote, ConfirmationNumber, EditNote } from '@mui/icons-material';

function HeaderUserTypeManager2() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("objUser")!);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] =
    React.useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorElAccount);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAnchorElAccount(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function navigateToLoginPage() {
    navigate("/");
  }
  function navigateToHomePage() {
    navigate("/home");
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
  function navigateToAddHotelPage() {
    // console.log("Navigating to AddHotel page");
    navigate("/AddHotelData");
  }
  function navigateToAddConcertPage() {
    // console.log("Navigating to AddHotel page");
    navigate("/AddConcertData");
  }
  function navigateToAddPacketPage() {
    // console.log("Navigating to AddHotel page");
    navigate("/SelectData");
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
                // ml: 5,
                fontFamily: "Kanit, sans-serif",
                fontSize: "16px"
              }}
              onClick={navigateToHomePage}
            >
              หน้าแรก
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
          <div style={{ flexGrow: 2, display: "flex", flexDirection: "row" }}>
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
            <IconButton
              sx={{
                background: "linear-gradient(45deg, #085078, #85D8CE)",
                color: "white",
                width: 50,
                height: 50,
                borderRadius: "50%",
                "&:hover": {
                  background: "linear-gradient(45deg, #085078, #85D8CE)",
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
              onClick={handleClick}
            >
              <AddIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              color="#85D8CE"
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
                  fontSize: "20px",
                  mx: 2,
                  my: 2
                }}
                variant="h6"
                marginTop={"-10px"}
              >
                <EditNote sx={{ mr: 1 }} />
                สร้างข้อมูล
              </Typography>
              <Divider />

              <MenuItem onClick={navigateToAddHotelPage}>
                <Hotel sx={{ mr: 1 }} /> {/* ไอคอนสำหรับจัดการโรงแรม */}
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    color: "black",
                    fontFamily: "Kanit, sans-serif",
                    fontSize: "18px",
                    ml: 1,
                  }}
                  variant="h6"
                >
                  จัดการโรมแรม
                </Typography>
              </MenuItem>

              <MenuItem onClick={navigateToAddConcertPage}>
                <MusicNote sx={{ mr: 1 }} /> {/* ไอคอนสำหรับจัดการคอนเสิรต์ */}
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    color: "black",
                    fontFamily: "Kanit, sans-serif",
                    fontSize: "18px",
                    ml: 1,
                  }}
                  variant="h6"
                >
                  จัดการคอนเสิรต์
                </Typography>
              </MenuItem>

              <MenuItem onClick={navigateToAddPacketPage}>
                <ConfirmationNumber sx={{ mr: 1 }} /> {/* ไอคอนสำหรับจัดการโรงแรม */}
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    color: "black",
                    fontFamily: "Kanit, sans-serif",
                    fontSize: "18px",
                    ml: 1,
                  }}
                  variant="h6"
                >
                  จัดการแพ็คเกจ
                </Typography>
              </MenuItem>
            </Menu>
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
              <MenuItem onClick={navigateToProfilePage} sx={{ fontFamily: "Kanit, sans-serif", fontSize: "16px", }}>
                <ListItemIcon sx={{ minWidth: "40px", color: "#666" }}>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>

              <MenuItem onClick={navigateToEditProfilePage} sx={{ fontFamily: "Kanit, sans-serif", fontSize: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px", color: "#666" }}>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                Setting Account
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

export default HeaderUserTypeManager2;
