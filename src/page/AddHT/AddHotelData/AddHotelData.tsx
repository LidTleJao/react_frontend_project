import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import AddHomeIcon from "@mui/icons-material/AddHome";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";

function AddHotelDataPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
    const navigate = useNavigate();

    function navigateToAddHotelPage() {
        navigate("/AddHotel");
    }
    function navigateToAddRoomPage() {
        navigate("/AddRoom");
    }
    function navigateToCheckDataHotelPage() {
      navigate("/CheckDataHotel");
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
      <div className="addhoteldata-cont">
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
              <CardActionArea onClick={navigateToAddHotelPage}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AddHomeIcon sx={{ fontSize: "150px" }} />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    เพิ่มข้อมูลโรงแรม
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <div style={{display:"flex",marginLeft:"150px"}}>
              <Card>
                <CardActionArea onClick={navigateToAddRoomPage}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <DomainAddIcon sx={{ fontSize: "150px" }} />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      เพิ่มข้อมูลห้อง
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div style={{display:"flex",marginLeft:"150px"}}>
              <Card>
                <CardActionArea onClick={navigateToCheckDataHotelPage}>
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
export default AddHotelDataPage;
