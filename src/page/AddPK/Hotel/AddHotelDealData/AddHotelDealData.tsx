import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker"; // ใช้จากไลบรารี @mui/x-date-pickers-pro
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelGetByIDRes } from "../../../../model/Response/Hotel/HotelGetByIDRes";
import { HotelService } from "../../../../service/hotelService";
import { RoomHotelService } from "../../../../service/roomHotelService";
import { RoomGetByHotelIDRes } from "../../../../model/Response/Hotel/RoomGetByHotelIDRes";
import { HotelDealsService } from "../../../../service/hotelDealService";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz("Asia/Bangkok");

function AddHotelDealDataPage() {
  const navigate = useNavigate();
  const hotelService = new HotelService();
  const roomHotelService = new RoomHotelService();
  const hotelDealService = new HotelDealsService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [hotels, setHotel] = useState<HotelGetByIDRes[]>([]);
  const [rooms, setRoom] = useState<RoomGetByHotelIDRes[]>([]);
  const [valueDate, setValueDate] = useState<[Dayjs, Dayjs | null]>([
    dayjs(),
    null,
  ]);
  const [Room_Hotel_ID, setRoom_Hotel_ID] = useState("");
  const [Room_Type, setRoom_Type] = useState("");
  const [Price, setPrice] = useState("");
  const [Number_of_rooms, setNumber_of_rooms] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [isLoadSelectRoom, setLoadSelectRoom] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshotel = await hotelService.getHotelByUid(user?.uid);
      const data: HotelGetByIDRes[] = reshotel.data;
      setHotel(data);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      if (Room_Hotel_ID) {
        setLoadSelectRoom(true);
        const resroom = await roomHotelService.getRoomByHotelID(Room_Hotel_ID);
        const data: RoomGetByHotelIDRes[] = resroom.data;
        setRoom(data);
        setLoadSelectRoom(false);
      }
    };
    loadDataAsync();
  }, [Room_Hotel_ID]); // ทำงานเมื่อ Room_Hotel_ID เปลี่ยน

  function navigateToMenuHotelDealPage() {
    navigate("/MenuHotelDeal");
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
      <div className="addhoteldealdata-cont">
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
              เพิ่มข้อมูลข้อเสนอ
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 470,
              maxHeight: 480,
              borderRadius: 3,
              bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                    fontStyle: "normal",
                  }}
                  variant="h6"
                >
                  ชื่อโรงแรม :
                </Typography>
                <FormControl sx={{ width: "20pc" }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-10px" }}
                  >
                    ชื่อโรงแรม
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="ชื่อโรงแรม"
                    value={Room_Hotel_ID}
                    onChange={async (e) => {
                      try {
                        setRoom_Hotel_ID(e.target.value);
                      } catch (error) {
                        setLoadSelectRoom(false);
                        console.log(error);
                      }
                    }}
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
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                {isLoadSelectRoom ? (
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
                  <>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                        fontStyle: "normal",
                      }}
                      variant="h6"
                    >
                      ชนิดห้อง :
                    </Typography>
                    <FormControl sx={{ width: "20pc" }}>
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ marginTop: "-10px" }}
                      >
                        ชนิดห้อง
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="ชนิดห้อง"
                        value={Room_Type}
                        onChange={(e) => setRoom_Type(e.target.value)}
                        sx={{
                          borderRadius: 20,
                          bgcolor: "white",
                          height: "40px",
                        }}
                      >
                        {rooms.map((room, index) => (
                          <MenuItem key={room.HRID} value={room.HRID}>
                            {1 + index} - {room.type_room} - จำนวนของห้อง{" "}
                            {room.Number_of_rooms}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontStyle: "normal",
                  }}
                  variant="h6"
                >
                  ราคาห้อง :
                </Typography>
                <TextField
                  placeholder="ราคาห้อง"
                  type="number"
                  sx={{ width: "20pc" }}
                  onChange={handlePrice}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                      bgcolor: "white",
                      height: "35px",
                    },
                    startAdornment: <></>,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontStyle: "normal",
                  }}
                  variant="h6"
                >
                  จำนวนห้อง :
                </Typography>
                <TextField
                  placeholder="จำนวนห้อง"
                  type="number"
                  sx={{ width: "20pc" }}
                  // onChange={(e) => setName(e.target.value)}
                  onChange={handleNumberRoom}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                      bgcolor: "white",
                      height: "35px",
                    },
                    startAdornment: <></>,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontStyle: "normal",
                    marginTop: "10px",
                  }}
                  variant="h6"
                >
                  วันที่สิ้นสุดการยื่นข้อเสนอ:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    sx={{ ml: 2, width: 250 }}
                    // startText="Check-in"
                    // endText="Check-out"
                    value={valueDate}
                    onChange={(newValueDate) => {
                      const newCheckOut = newValueDate[1]; // วันที่ Check-out ใหม่
                      // อัปเดตค่าเฉพาะ Check-out เท่านั้น
                      if (newCheckOut) {
                        const startDate = dayjs(newValueDate[0]).tz(
                          "Asia/Bangkok"
                        ); // ค่าตั้งต้น
                        const endDate = dayjs(newValueDate[1]).tz(
                          "Asia/Bangkok"
                        ); // วันที่ Check-out ใหม่
                        // setValueDate([valueDate[0].tz("Asia/Bangkok"), newCheckOut.tz("Asia/Bangkok")]);
                        setValueDate([startDate, endDate]);
                      }
                    }}
                    disablePast // ป้องกันการเลือกวันที่ในอดีตสำหรับ Check-out
                  />
                </LocalizationProvider>
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
                  onClick={navigateToMenuHotelDealPage}
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
                        let getstr1 = "";
                        let getstr2 = "";
                        if (valueDate[0]) {
                          //   console.log(valueDate[0]);
                          const getarrayshow1 =
                            valueDate[0]?.get("D").valueOf() || 0;
                          const getarrayshow2 =
                            valueDate[0]?.get("M").valueOf() || 0;
                          const getarrayshow3 =
                            valueDate[0]?.get("y").valueOf() || 0;
                          getstr1 = `${getarrayshow3}-${
                            getarrayshow2 + 1
                          }-${getarrayshow1}`;
                        }
                        if (valueDate[1]) {
                          //   console.log(valueDate[1]);
                          const getarrayshow1 =
                            valueDate[1]?.get("D").valueOf() || 0;
                          const getarrayshow2 =
                            valueDate[1]?.get("M").valueOf() || 0;
                          const getarrayshow3 =
                            valueDate[1]?.get("y").valueOf() || 0;
                          getstr2 = `${getarrayshow3}-${
                            getarrayshow2 + 1
                          }-${getarrayshow1}`;

                          const parsedDate1 = new Date(getstr1);
                          const parsedDate2 = new Date(getstr2);

                          const formatDate = (date: Date): string => {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); // เดือนเริ่มที่ 0, ต้อง +1
                            const day = String(date.getDate()).padStart(2, "0"); // เพิ่ม 0 ข้างหน้า ถ้าวันหรือเดือนมีแค่หลักเดียว
                            return `${year}-${month}-${day}`;
                          };

                          console.log(formatDate(parsedDate1));
                          console.log(formatDate(parsedDate2));

                          if (Room_Hotel_ID == "") {
                            window.alert(
                              "ข้อมูลโรงแรมไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                            );
                          } else {
                            if (Room_Type == "") {
                              window.alert(
                                "ข้อมูลห้องโรงแรมไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                              );
                            } else {
                              if (
                                Price === "" ||
                                (Number(Price) < 1 && !Price.includes("-"))
                              ) {
                                window.alert(
                                  "ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                );
                              } else {
                                if (
                                  Number_of_rooms === "" ||
                                  (Number(Number_of_rooms) == 0 &&
                                    !Number_of_rooms.includes("-"))
                                ) {
                                  window.alert(
                                    "จำนวนห้องไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                  );
                                } else {
                                  const reshoteldeal =
                                    await hotelDealService.AddHotelDealData(
                                      Room_Type,
                                      Number_of_rooms,
                                      Price,
                                      formatDate(parsedDate1),
                                      formatDate(parsedDate2)
                                    );
                                  if (reshoteldeal.status == 201) {
                                    window.alert(
                                      "ข้อมูลของข้อเสนอ ได้ลงทะเบียนแล้ว!!!"
                                    );
                                    navigateToMenuHotelDealPage();
                                  }
                                }
                              }
                            }
                          }
                        } else {
                          window.alert(
                            "ข้อมูลวันที่ไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                          );
                        }

                        setLoad(false);
                      } catch (error) {
                        setLoad(false);
                        window.alert(
                          "ข้อมูลห้องไม่ถูกต้อง ต้องมีจำนวนน้อยกว่าหรือเท่ากับจำนวนห้องที่ลงทะเบียน โปรดเพิ่มข้อมูลใหม่"
                        );
                        console.log(error);
                      }
                    }}
                  >
                    เพิ่มข้อมูลข้อเสนอ
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
export default AddHotelDealDataPage;
