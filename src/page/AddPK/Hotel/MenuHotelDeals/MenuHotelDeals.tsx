import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate } from "react-router-dom";

function MenuHotelDealPage() {
  const navigate = useNavigate();

  function navigateToAddHotelDealDataPage() {
    navigate("/AddHotelDealData");
  }
  function navigateToHotelDealPage() {
    navigate("/HotelDeal");
  }
  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="menuhoteldeal-cont">
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
              โปรดเลือกเมนูการทำแพ็คเกจ
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
                onClick={navigateToAddHotelDealDataPage}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ListAltIcon sx={{ fontSize: "150px" }} />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    สร้างข้อมูลยื่นข้อเสนอ
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <div style={{ display: "flex", marginLeft: "100px" }}>
              <Card>
                <CardActionArea
                  // onClick={navigateToHotelDealPage}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FactCheckIcon sx={{ fontSize: "150px" }} />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      ตรวจสอบข้อมูลข้อเสนอ
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div style={{ display: "flex", marginLeft: "150px" }}>
              <Card>
                <CardActionArea
                  onClick={navigateToHotelDealPage}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Diversity3Icon sx={{ fontSize: "150px" }} />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      การจับคู่
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
export default MenuHotelDealPage;
