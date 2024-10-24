import { useLocation, useNavigate } from "react-router-dom";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Button,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ConcertService } from "../../../service/concertService";
import { GetConcertShowByCIDRes } from "../../../model/Response/Concert/GetConcertShowByCIDRes";

function AddTicketP2Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const concertService = new ConcertService();
  const { ticket_concert_ID, ticket_zone, price, ticket_type } = location.state;
  const [concertShow, setConcertShow] = useState<GetConcertShowByCIDRes[]>([]);
  const [checked, setChecked] = useState([0]);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcertShow(ticket_concert_ID);
      const data: GetConcertShowByCIDRes[] = resconcert.data;
      setConcertShow(data);
    };
    loadDataAsync();
  }, []);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function navigateToAddTicketPage() {
    navigate("/AddTicket");
  }
  function navigateToAddConcertDataPage() {
    navigate("/AddConcertData");
  }
  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="addticketp2-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
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
              เลือกรอบการแสดง
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 350,
              maxHeight: 350,
              borderRadius: 3,
              // bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "70%" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <List
                  dense
                  sx={{
                    width: "100%",
                    maxHeight: 200,
                    overflow: "auto",
                    // maxWidth: 360,
                    // bgcolor: "background.paper",
                  }}
                >
                  {concertShow.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem
                        key={value.CSTID}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value.CSTID)}
                            checked={checked.includes(value.CSTID)}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemText
                            id={labelId}
                            primary={`วันที่ทำการแสดง: ${value.show_concert} เวลาในการแสดง: ${value.time_show_concert}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "30px",
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
                  onClick={navigateToAddTicketPage}
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
                    sx={{
                      width: "110px",
                      borderRadius: "10px",
                    }}
                    startIcon={<ChevronRightIcon />}
                    // onClick={navigateToAddTicketP2Page}
                    onClick={async () => {
                      try {
                        setLoad(true);

                        if (checked.length == 1) {
                          window.alert("ข้อมูลไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
                        } else {
                          // console.log(checked);
                          for (let index = 1; index < checked.length; index++) {
                            const show = checked[index];
                            // console.log(element);
                            const resconcert = await concertService.AddTicket(
                              ticket_concert_ID,
                              show,
                              ticket_type,
                              ticket_zone,
                              price
                            );
                            console.log(resconcert.status);
                          }
                          window.alert(
                            "ข้อมูลของตั๋วคอนเสิร์ต ได้ลงทะเบียนแล้ว!!!"
                          );
                          navigateToAddConcertDataPage();
                        }
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
export default AddTicketP2Page;
