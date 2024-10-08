import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import { useState } from "react";

function AddHotelP2Page() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  const localtion = useLocation();
  const [isLoad, setLoad] = useState(false);
  const { hotelName, hotelType, province, address, description } =
    localtion.state;

  const [getUrl1, setGetUrl1] = useState("");
  const [getUrl2, setGetUrl2] = useState("");
  const [getUrl3, setGetUrl3] = useState("");

  console.log(hotelName, hotelType, province, address, description);

  function navigateToAddHotelPage() {
    navigate("/AddHotel");
  }
  function navigateToAddHotelP3Page() {
    navigate("/AddHotelP3", {
      state: {
        hotelName,
        hotelType,
        province,
        address,
        description,
        getUrl1,
        getUrl2,
        getUrl3,
      },
    });
  }
  return (
    <>
      {(user?.type_user === 2 && (
        <>
          <HeaderUserTypeManager2 />
        </>
      )) ||
        (user?.type_user === 1 && (
          <>
            <HeaderUserTypeGeneral2 />
          </>
        ))}
      <div className="addhotelp2-cont">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                fontWeight: "bold",
                color: "black",
                fontFamily: "Mitr, sans-serif",
                fontStyle: "normal",
              }}
              variant="h4"
            >
              เพิ่มข้อมูลช่องทางการติดต่อ
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 370,
              borderRadius: 3,
              bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "30px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontSize: "20px",
                  }}
                  //   variant="h4"
                >
                  URL WebSite:
                </Typography>
                <div style={{ marginLeft: "15px" }}>
                  <TextField
                    placeholder="URL"
                    // type="URL"
                    sx={{ width: "25pc" }}
                    value={getUrl1}
                    onChange={(e) => setGetUrl1(String(e.target.value))}
                    InputProps={{
                      sx: {
                        borderRadius: "20px",
                        bgcolor: "white",
                        height: "35px",
                      },
                      startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "30px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontSize: "20px",
                  }}
                  //   variant="h4"
                >
                  URL WebSite:
                </Typography>
                <div style={{ marginLeft: "15px" }}>
                  <TextField
                    placeholder="URL"
                    // type="address"
                    sx={{ width: "25pc" }}
                    value={getUrl2}
                    onChange={(e) => setGetUrl2(String(e.target.value))}
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
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "30px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontSize: "20px",
                  }}
                  //   variant="h4"
                >
                  URL WebSite:
                </Typography>
                <div style={{ marginLeft: "15px" }}>
                  <TextField
                    placeholder="URL"
                    // type="address"
                    sx={{ width: "25pc" }}
                    value={getUrl3}
                    onChange={(e) => setGetUrl3(String(e.target.value))}
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
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#343434" }}
                  sx={{
                    width: "110px",
                    borderRadius: "10px",
                  }}
                  startIcon={<KeyboardArrowLeftIcon />}
                  onClick={navigateToAddHotelPage}
                >
                  กลับหน้า
                </Button>
                {isLoad ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      style={{ marginRight: "20px", color: "black" }}
                    />
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#3B7AF4" }}
                    sx={{
                      width: "100px",
                      borderRadius: "10px",
                    }}
                    startIcon={<ChevronRightIcon />}
                    // onClick={navigateToAddHotelP3Page}
                    onClick={async () => {
                      try{
                        setLoad(true);
                        navigateToAddHotelP3Page();
                        setLoad(false);
                      } catch(error) {
                        setLoad(false);
                        console.log(error);
                      }
                    }}
                  >
                    ถัดไป
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AddHotelP2Page;
