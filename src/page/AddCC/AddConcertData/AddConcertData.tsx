import { Typography, Card, CardActionArea, CardContent } from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import StadiumIcon from '@mui/icons-material/Stadium';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";

function AddConcertDataPage() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("objUser")!);

  function navigateToAddConcertPage() {
    navigate("/AddConcert");
  }
  function navigateToAddTicketPage() {
    navigate("/AddTicket");
  }
  function navigateToCheckDataConcertPage() {
    navigate("/CheckDataConcert");
  }

  return (
    <>
      {user?.type_user === 2 && (
        <>
          <HeaderUserTypeManager2 />
        </>
      ) || user?.type_user === 1 && (
        <>
          <HeaderUserTypeGeneral2 />
        </>
      )}
      <div className="addconcertdata-cont">
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
              <CardActionArea
                onClick={navigateToAddConcertPage}
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
                    เพิ่มข้อมูลคอนเสิรต์
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <div style={{ display: "flex", marginLeft: "150px" }}>
              <Card>
                <CardActionArea
                onClick={navigateToAddTicketPage}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <LocalActivityIcon sx={{ fontSize: "150px" }} />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      เพิ่มข้อมูลตั๋ว
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div style={{ display: "flex", marginLeft: "150px" }}>
              <Card>
                <CardActionArea
                onClick={navigateToCheckDataConcertPage}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FactCheckIcon sx={{ fontSize: "150px" }} />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      ตรวจสอบข้อมูล
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

export default AddConcertDataPage;
