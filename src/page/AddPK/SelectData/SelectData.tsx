import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import AddHomeIcon from "@mui/icons-material/AddHome";
import StadiumIcon from "@mui/icons-material/Stadium";
import { useNavigate } from "react-router-dom";

function SelectDataPage() {
  const navigate = useNavigate();

  function navigateToMenuHotelDealPage() {
    navigate("/MenuHotelDeal");
  }
  function navigateToMenuConcertDealPage() {
    navigate("/MenuConcertDeal");
  }
  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="selectdata-cont">
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
              โปรดเลือกเมนู
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "100px",
            }}
          >
            <Card>
              <CardActionArea onClick={navigateToMenuHotelDealPage}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AddHomeIcon sx={{ fontSize: "150px" }} />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    ข้อมูลฝั่งโรงแรม
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <div style={{ display: "flex", marginLeft: "150px" }}>
              <Card>
                <CardActionArea
                  onClick={navigateToMenuConcertDealPage}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <StadiumIcon sx={{ fontSize: "150px" }} />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      ข้อมูลฝั่งคอนเสิร์ต
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectDataPage;
