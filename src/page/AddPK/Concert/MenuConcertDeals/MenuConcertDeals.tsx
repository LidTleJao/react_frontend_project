import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

function MenuConcertDealPage() {
  const navigate = useNavigate();
    function navigateToAddConcertDealDataPage() {
        navigate("/AddConcertDealData");
      }
  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="menuconcertdeal-cont">
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
                onClick={navigateToAddConcertDealDataPage}
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
            <div style={{ display: "flex", marginLeft: "150px" }}>
              <Card>
                <CardActionArea
                //   onClick={navigateToAddHotelPage}
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
export default MenuConcertDealPage;
