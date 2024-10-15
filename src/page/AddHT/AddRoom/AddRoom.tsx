import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { HotelGetByIDRes } from "../../../model/Response/Hotel/HotelGetByIDRes";
import { HotelService } from "../../../service/hotelService";
// import { RoomHotelService } from "../../../service/roomHotelService";

function AddRoomPage() {
  const hotelService = new HotelService();
  // const roomHotelService = new RoomHotelService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [hotels, setHotel] = useState<HotelGetByIDRes[]>([]);
  const navigate = useNavigate();
  const [Room_Hotel_ID, setRoom_Hotel_ID] = useState("");
  const [Room_Type, setRoom_Type] = useState(1);
  const [Room_View_Type, setRoom_View_Type] = useState(1);
  const [Price, setPrice] = useState("");
  const [Number_of_guests, setNumber_of_guests] = useState(1);
  const [Number_of_rooms, setNumber_of_rooms] = useState("");
  const [Room_Status, setRoom_Status] = useState(1);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await hotelService.getHotelByUid(user?.uid);
      const data: HotelGetByIDRes[] = res.data;
      setHotel(data);
    };
    loadDataAsync();
  }, []);

  // console.log(Room_Hotel_ID);

  function navigateToAddHotelDataPage() {
    navigate("/AddHotelData");
  }
  function navigateToAddRoomP2Page() {
    navigate("/AddRoomP2", {
      state: {
        Room_Hotel_ID,
        Room_Type,
        Room_View_Type,
        Price,
        Number_of_guests,
        Number_of_rooms,
        Room_Status,
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

  function handleNumberRoom(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === "" || (Number(value) >= 0 && !value.includes("-"))) {
      setNumber_of_rooms(value);
    } else {
      window.alert("จำนวนของห้องไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
    }
  }

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="addroom-cont">
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
              เพิ่มข้อมูลห้อง
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 470,
              borderRadius: 3,
              bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  เลือกโรมแรม
                </InputLabel>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="ชนิดห้อง"
                  // type="city"
                  onChange={(e) => setRoom_Hotel_ID(String(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  {hotels.map((hotel, index) => (
                    <MenuItem value={hotel.HID}>
                      {1 + index} - {hotel.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  ชนิดห้อง
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="ชนิดห้อง"
                  // defaultValue={1}
                  value={Room_Type}
                  onChange={(e) => setRoom_Type(Number(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={1}>ห้องธรรมดา (Standard Room)</MenuItem>
                  <MenuItem value={2}>ห้องดีลักซ์ (Deluxe Room)</MenuItem>
                  <MenuItem value={3}>
                    ห้องเอกซ์คลูซีฟ (Executive Room)
                  </MenuItem>
                  <MenuItem value={4}>
                    ห้องที่มีประตูเชื่อมต่อกัน (Connecting Rooms)
                  </MenuItem>
                  <MenuItem value={5}>ห้องสวีท (Suite)</MenuItem>
                  <MenuItem value={6}>ห้องสุพีเรียร์ (Superior Room)</MenuItem>
                  <MenuItem value={7}>
                    ห้องพักพิเศษสำหรับผู้พิการ (Accessible Room)
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  วิวห้อง
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // defaultValue={1}
                  value={Room_View_Type}
                  onChange={(e) => setRoom_View_Type(Number(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={1}>ทะเล</MenuItem>
                  <MenuItem value={2}>ภูเขา</MenuItem>
                  <MenuItem value={3}>เมือง</MenuItem>
                </Select>
              </FormControl>
              <TextField
                placeholder="ราคาห้อง"
                type="number"
                sx={{ mt: 2, width: "25pc" }}
                //   onChange={(e) => setName(e.target.value)}
                onChange={handlePrice}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  จำนวนคนเข้าพัก
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // defaultValue={1}
                  value={Number_of_guests}
                  onChange={(e) => setNumber_of_guests(Number(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              <TextField
                placeholder="จำนวนของห้อง"
                type="number"
                sx={{ mt: 2, width: "25pc" }}
                //   onChange={(e) => setName(e.target.value)}
                onChange={handleNumberRoom}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  สถานะของห้อง (ว่างหรือไม่ว่าง)
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // defaultValue={1}
                  value={Room_Status}
                  onChange={(e) => setRoom_Status(Number(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={1}>ว่าง</MenuItem>
                  <MenuItem value={2}>ไม่ว่าง</MenuItem>
                </Select>
              </FormControl>
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
                  onClick={navigateToAddHotelDataPage}
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
                    // onClick={navigateToAddRoomP2Page}
                    onClick={async () => {
                      try {
                        setLoad(true);

                        if (
                          Price === "" ||
                          (Number(Price) < 1 && !Price.includes("-"))
                        ) {
                          window.alert("ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
                        } else {
                          if (
                            Number_of_rooms === "" ||
                            (Number(Number_of_rooms) == 0 &&
                              !Number_of_rooms.includes("-"))
                          ) {
                            window.alert("จำนวนห้องไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
                          } else {
                            if (Room_Hotel_ID === "") {
                              window.alert(
                                "ข้อมูลไม่ถูกต้อง โปรดเลือกข้อมูลใหม่"
                              );
                            } else {
                              navigateToAddRoomP2Page();
                            }
                          }
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
export default AddRoomPage;
