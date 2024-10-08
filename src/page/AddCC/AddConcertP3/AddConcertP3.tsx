import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import { useState } from "react";

function AddConcertP3Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const {
    poster,
    image,
    name_concert,
    lineup,
    concert_type,
    show_schedule_concert,
    address_concert,
    province,
    detail_concert,
  } = location.state;
  const [getUrl1, setGetUrl1] = useState("");
  const [getUrl2, setGetUrl2] = useState("");
  const [getUrl3, setGetUrl3] = useState("");
  const [isLoad, setLoad] = useState(false);

  function navigateToAddConcertP2Page() {
    navigate("/AddConcertP2", {
      state : {
        poster,
        image,
        name_concert,
        lineup,
        concert_type,
        show_schedule_concert,
        address_concert,
        province,
        detail_concert,
      }
    });
  }
  function navigateToAddConcertP4Page() {
    navigate("/AddConcertP4", {
      state : {
        poster,
        image,
        name_concert,
        lineup,
        concert_type,
        show_schedule_concert,
        address_concert,
        province,
        detail_concert,
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
      <div className="addconcertp3-cont">
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
                    type="address"
                    sx={{ width: "25pc" }}
                    value={getUrl1}
                    onChange={(e) => setGetUrl1(e.target.value)}
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
                    onChange={(e) => setGetUrl2(e.target.value)}
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
                    sx={{ width: "25pc" }}
                    value={getUrl3}
                    onChange={(e) => setGetUrl3(e.target.value)}
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
                  onClick={navigateToAddConcertP2Page}
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
                    // onClick={navigateToAddConcertP4Page}
                    onClick={async () => {
                      try {
                        setLoad(true);
                        console.log(poster);
                        console.log(image);
                        console.log(name_concert);
                        console.log(lineup);
                        console.log(concert_type);
                        console.log(show_schedule_concert);
                        console.log(address_concert);
                        console.log(province);
                        console.log(detail_concert);
                        console.log(getUrl1);
                        console.log(getUrl2);
                        console.log(getUrl3);
                        navigateToAddConcertP4Page();
                        setLoad(false);
                      } catch (error) {
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
export default AddConcertP3Page;
