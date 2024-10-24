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
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelGetByIDRes } from "../../../model/Response/Hotel/HotelGetByIDRes";
import { HotelService } from "../../../service/hotelService";
import { RoomHotelService } from "../../../service/roomHotelService";
import { toast, ToastContainer } from "react-toastify";

function AddRoomPage() {
  const hotelService = new HotelService();
  const roomHotelService = new RoomHotelService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [hotels, setHotel] = useState<HotelGetByIDRes[]>([]);
  const navigate = useNavigate();
  const [isValidate, setValidate] = useState(false);
  const [Room_Hotel_ID, setRoom_Hotel_ID] = useState("");
  const [Room_Type, setRoom_Type] = useState(1);
  const [Room_View_Type, setRoom_View_Type] = useState(1);
  const [Price, setPrice] = useState("500");
  const [Number_of_guests, setNumber_of_guests] = useState(1);
  const [Number_of_rooms, setNumber_of_rooms] = useState("1");
  const [Room_Status, setRoom_Status] = useState(1);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await hotelService.getHotelByUid(user?.uid);
      const data: HotelGetByIDRes[] = res.data;
      setHotel(data);
    };
    loadDataAsync();
  }, [hotelService, user?.uid]);

  // console.log(Room_Hotel_ID);

  function navigateToAddHotelDataPage() {
    navigate("/AddHotelData");
  }
  // function navigateToAddRoomP2Page() {
  //   navigate("/AddRoomP2", {
  //     state: {
  //       Room_Hotel_ID,
  //       Room_Type,
  //       Room_View_Type,
  //       Price,
  //       Number_of_guests,
  //       Number_of_rooms,
  //       Room_Status,
  //     },
  //   });
  // }

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="addroom-cont pt-20">
        <div className="flex flex-col gap-3 px-14 py-8 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                display: "flex",
                color: "black",
                fontSize: "25px",
              }}
            >
              เพิ่มข้อมูลห้อง
            </Typography>
          </div>

          {hotels.length > 0 ? (
            <>
              <div className="flex gap-5 flex-row justify-between">
                <div className="flex flex-col justify-center items-center">
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-select-small-label" size="small">
                      เลือกโรมแรม
                    </InputLabel>

                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      label="ชนิดห้อง"
                      // type="city"
                      onChange={(e) => setRoom_Hotel_ID(String(e.target.value))}
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "white",
                      }}
                      error={isValidate && !Room_Hotel_ID}
                    >
                      {hotels.map((hotel, index) => (
                        <MenuItem value={hotel.HID}>
                          {1 + index} - {hotel.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {isValidate && !Room_Hotel_ID ? <h5 className="ps-3 text-xs text-red-500">กรุณาเลือกโรงแรม</h5> : ""}
                  </FormControl>
                  <FormControl sx={{ width: "25pc", mt: 3 }}>
                    <InputLabel id="demo-select-small-label" size="small">
                      ชนิดห้อง
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      label="ชนิดห้อง"
                      // defaultValue={1}
                      value={Room_Type}
                      onChange={(e) => setRoom_Type(Number(e.target.value))}
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "white",
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
                      <MenuItem value={6}>
                        ห้องสุพีเรียร์ (Superior Room)
                      </MenuItem>
                      <MenuItem value={7}>
                        ห้องพักพิเศษสำหรับผู้พิการ (Accessible Room)
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "25pc", mt: 3 }}>
                    <InputLabel id="demo-select-small-label" size="small">
                      วิวห้อง
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      label="วิวห้อง"
                      value={Room_View_Type}
                      onChange={(e) =>
                        setRoom_View_Type(Number(e.target.value))
                      }
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "white",
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
                    sx={{ mt: 3, width: "25pc" }}
                    defaultValue={500}
                    size="small"
                    label="ราคาห้อง"
                      onChange={(e) => setPrice(e.target.value)}
                    // onChange={handlePrice}
                    onKeyDown={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                    InputProps={{
                      sx: {
                        borderRadius: "10px",
                        bgcolor: "white",
                      },
                      inputProps: { min: 1 },
                      startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                    }}
                    required
                    error={isValidate && (!Price || Number(Price) < 1)}
                    helperText={
                      isValidate
                        ? !Price
                          ? "กรุณากรอกราคาห้อง"
                          : Number(Price) < 1
                          ? "ราคาห้องไม่ถูกต้อง"
                          : ""
                        : ""
                    }
                  />
                  <FormControl sx={{ width: "25pc", mt: 3 }}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ marginTop: "-5px" }}
                    >
                      จำนวนคนเข้าพัก
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      label="จำนวนคนเข้าพัก"
                      // defaultValue={1}
                      value={Number_of_guests}
                      onChange={(e) =>
                        setNumber_of_guests(Number(e.target.value))
                      }
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "white",
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
                    sx={{ mt: 3, width: "25pc" }}
                    size="small"
                    defaultValue={1}
                    label="จำนวนห้อง"
                      onChange={(e) => setNumber_of_rooms(e.target.value)}
                    // onChange={handleNumberRoom}
                    onKeyDown={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                    InputProps={{
                      sx: {
                        borderRadius: "10px",
                        bgcolor: "white",
                      },
                      inputProps: { min: 1 },
                      startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                    }}
                    required
                    error={isValidate && (!Number_of_rooms || Number(Number_of_rooms) < 1)}
                    helperText={
                      isValidate
                        ? !Number_of_rooms
                          ? "กรุณากรอกจำนวนห้อง"
                          : Number(Number_of_rooms) < 1
                          ? "จำนวนห้องไม่ถูกต้อง"
                          : ""
                        : ""
                    }
                  />
                  <FormControl sx={{ width: "25pc", mt: 3 }}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ marginTop: "-5px" }}
                    >
                      สถานะของห้อง (ว่างหรือไม่ว่าง)
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      size="small"
                      label="สถานะของห้อง (ว่างหรือไม่ว่าง)"
                      // defaultValue={1}
                      value={Room_Status}
                      onChange={(e) => setRoom_Status(Number(e.target.value))}
                      sx={{
                        borderRadius: "10px",
                        bgcolor: "white",
                      }}
                    >
                      <MenuItem value={1}>ว่าง</MenuItem>
                      <MenuItem value={2}>ไม่ว่าง</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="w-full flex flex-row justify-between mt-5">
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
                        // onClick={navigateToAddRoomP2Page}
                        onClick={async () => {
                          try {
                            setLoad(true);
                            setValidate(true);
                            if (
                              (Price && Number(Price) > 0) &&
                              (Number_of_rooms && Number(Number_of_rooms) > 0) &&
                              Room_Hotel_ID
                            ) {
                              const resroom = await roomHotelService.AddRoom(
                                Room_Hotel_ID,
                                Price,
                                Number_of_guests,
                                Number_of_rooms,
                                Room_Type,
                                Room_View_Type,
                                Room_Status
                              );
                              console.log(resroom.status);
                              if (resroom.status === 201) {
                                toast.success("เพิ่มข้อมูลห้องในโรงแรมสำเร็จ!");
                                setTimeout(() => {
                                  setLoad(false);
                                  navigateToAddHotelDataPage();
                                }, 3000);
                              } else {
                                window.alert(
                                  "ข้อมูลของห้อง ลงทะเบียนไม่สำเร็จ โปรดดำเนินการใหม่อีกครั้ง"
                                );
                              }
                            } else {
                              setLoad(false);
                            }
                          } catch (error) {
                            setLoad(false);
                            console.log(error);
                          }
                        }}
                      >
                        เพิ่ม
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <ToastContainer />
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>ยังไม่มีข้อมูลโรงแรม โปรดดำเนินการเพิ่มข้อมูลโรงแรม</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default AddRoomPage;
