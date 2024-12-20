import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { ConcertService } from "../../../service/concertService";
import { ChangeEvent, useEffect, useState } from "react";
import { GetConcertByUserIDRes } from "../../../model/Response/Concert/GetConcertByUserIDRes";

function AddTicketPage() {
  const concertService = new ConcertService();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [concerts, setConcert] = useState<GetConcertByUserIDRes[]>([]);
  const [ticket_concert_ID, setTicket_concert_ID] = useState("");
  const [ticket_zone, setTicket_zone] = useState("");
  const [price, setPrice] = useState("");
  const [ticket_type, setTicket_type] = useState(1);
  const [isLoad, setLoad] = useState(false);
  const [isValidate, setValidate] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcertByUid(user?.uid);
      const data: GetConcertByUserIDRes[] = resconcert.data;
      setConcert(data);
    };
    loadDataAsync();
  }, []);

  function navigateToAddConcertDataPage() {
    navigate("/AddConcertData");
  }
  function navigateToAddTicketP2Page() {
    navigate("/AddTicketP2", {
      state: {
        ticket_concert_ID,
        ticket_zone,
        price,
        ticket_type,
      },
    });
  }

  function handlePrice(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === "" || (Number(value) > 0 && !value.includes("-"))) {
      setPrice(value);
    } else {
      window.alert("ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
    }
  }
  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="addticket-cont">
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
              เพิ่มข้อมูลตั๋ว
            </Typography>
          </div>
          {concerts.length > 0 ? (
            <>
              <Box
                sx={{
                  width: 650,
                  // height: 370,
                  maxHeight: 370,
                  borderRadius: 3,
                  // bgcolor: "#D9D9D9",
                  border: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormControl sx={{ width: "25pc", mt: 3 }}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ marginTop: "-5px" }}
                    >
                      เลือกคอนเสิร์ต*
                    </InputLabel>

                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="ชนิดห้อง"
                      // type="city"
                      onChange={(e) =>
                        setTicket_concert_ID(String(e.target.value))
                      }
                      sx={{
                        borderRadius: 20,
                        border: "1px solid grey",
                        bgcolor: "white",
                        height: "40px",
                      }}
                      error={isValidate && !ticket_concert_ID}
                    >
                      {concerts.map((concert, index) => (
                        <MenuItem value={concert.CID}>
                          {1 + index} - {concert.name_concert}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value={1}>ห้องธรรมดา (Standard Room)</MenuItem> */}
                    </Select>
                    {isValidate && !ticket_concert_ID ? (
                      <h5 className="ps-3 text-xs text-red-500">
                        กรุณาเลือกคอนเสิร์ต
                      </h5>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <TextField
                    placeholder="ชื่อชนิดของตั๋วโซนที่นั่ง*"
                    // type="number"
                    sx={{ mt: 2, width: "25pc" }}
                    onChange={(e) => setTicket_zone(e.target.value)}
                    value={ticket_zone}
                    InputProps={{
                      sx: {
                        borderRadius: "20px",
                        border: "1px solid grey",
                        bgcolor: "white",
                        height: "35px",
                      },
                      startAdornment: <></>,
                    }}
                    error={isValidate && !ticket_zone}
                    helperText={
                      !ticket_zone && isValidate
                        ? "โปรดกรอกชื่อชนิดของตั๋วโซนที่นั่ง"
                        : ""
                    }
                  />
                  <TextField
                    placeholder="ราคาตั๋ว*"
                    type="number"
                    sx={{ mt: 2, width: "25pc" }}
                    //   onChange={(e) => setName(e.target.value)}
                    onChange={handlePrice}
                    inputProps={{ min: 1 }}
                    InputProps={{
                      sx: {
                        borderRadius: "20px",
                        border: "1px solid grey",
                        bgcolor: "white",
                        height: "35px",
                      },
                      startAdornment: <></>,
                    }}
                    required
                    error={isValidate && (!price || Number(price) < 1)}
                    helperText={
                      isValidate
                        ? !price
                          ? "กรุณากรอกราคาตั๋ว"
                          : Number(price) < 1
                          ? "ราคาตั๋วไม่ถูกต้อง"
                          : ""
                        : ""
                    }
                  />
                  <FormControl sx={{ width: "25pc", mt: 3 }}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ marginTop: "-10px" }}
                    >
                      ชนิดตั๋ว
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="ชนิดตั๋ว"
                      // defaultValue={1}
                      value={ticket_type}
                      onChange={(e) => setTicket_type(Number(e.target.value))}
                      sx={{
                        borderRadius: 20,
                        border: "1px solid grey",
                        bgcolor: "white",
                        height: "40px",
                      }}
                    >
                      <MenuItem value={1}>
                        ตั๋วเข้าชมทั่วไป (General Admission / GA)
                      </MenuItem>
                      <MenuItem value={2}>ตั๋ววีไอพี (VIP Ticket)</MenuItem>
                      <MenuItem value={3}>
                        ตั๋วหน้าเวที (Front Row / Pit Ticket)
                      </MenuItem>
                      <MenuItem value={4}>
                        ตั๋วโซนพิเศษ (Premium Zone Ticket)
                      </MenuItem>
                      <MenuItem value={5}>
                        ตั๋วที่นั่งสำรอง (Reserved Seating)
                      </MenuItem>
                      <MenuItem value={6}>
                        ตั๋วเข้าชมก่อน (Early Entry Ticket)
                      </MenuItem>
                      <MenuItem value={7}>
                        ตั๋วเข้าชมคอนเสิร์ตออนไลน์ (Virtual Concert Ticket)
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "30px",
                      marginBottom: "30px",
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
                      onClick={navigateToAddConcertDataPage}
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
                            setValidate(true);

                            if (price && Number(price) > 0) {
                              navigateToAddTicketP2Page();
                            } else {
                              setLoad(false);
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
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>ยังไม่มีข้อมูลคอนเสิร์ต โปรดดำเนินการเพิ่มข้อมูลคอนเสิร์ต</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default AddTicketPage;
