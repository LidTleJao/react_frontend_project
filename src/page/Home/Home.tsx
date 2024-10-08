import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HeaderUserTypeGeneral from "../../components/HeaderUserTypeGeneral";
import HeaderUserTypeManager from "../../components/HeaderUserTypeManager";

function HomePage() {

  const user = JSON.parse(localStorage.getItem("objUser")!);

  return (
    <>
      {user?.type_user === 2 && (
        <>
          <HeaderUserTypeManager />
        </>
      ) || user?.type_user === 1 && (
        <>
          <HeaderUserTypeGeneral />
        </>
      )}
      <div className="home-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              marginTop: 100,
            }}
          >
            <Box
              sx={{
                width: 350,
                height: 170,
                borderRadius: 3,
                bgcolor: "#D9D9D9",
                border: 2,
              }}
            ></Box>
            <div>
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"15px"}
                marginLeft={"250px"}
              >
                Welcome to Teemi
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "150px",
                }}
              >
                <Box
                  sx={{
                    width: 650,
                    height: 60,
                    borderRadius: 3,
                    bgcolor: "#D9D9D9",
                    border: 2,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <TextField
                      placeholder="ค้นหาพื้นที่ใกล้เคียง"
                      type="search"
                      sx={{ m: 1, width: "35pc" }}
                      //   onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                        },
                        startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                      }}
                    />
                    <IconButton
                      sx={{
                        width: "50px",
                        color: "black",
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"25px"}
                // marginLeft={"250px"}
              >
                Concert
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // marginLeft:"160px"
                }}
              >
                <Card sx={{ maxWidth: 345, background: "#4E6A97", border: 2 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="src\img\webteemi.png"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "150px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"25px"}
                // marginLeft={"250px"}
              >
                Hotel
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // marginLeft:"160px"
                }}
              >
                <Card sx={{ maxWidth: 345, background: "#A3A3AB", border: 2 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="src\img\webteemi.png"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "150px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"25px"}
                // marginLeft={"250px"}
              >
                Package
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // marginLeft:"160px"
                }}
              >
                <Card sx={{ maxWidth: 345, background: "#D9D9D9", border: 2 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="src\img\webteemi.png"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
