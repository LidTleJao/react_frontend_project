import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  // ImageList,
  // ImageListItem,
  InputLabel,
  Link,
  MenuItem,
  // MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import EditIcon from "@mui/icons-material/Edit";
import { HotelService } from "../../../service/hotelService";
import { RoomHotelService } from "../../../service/roomHotelService";
import { useEffect, useRef, useState } from "react";
import { HotelGetByIDRes } from "../../../model/Response/Hotel/HotelGetByIDRes";
import { RoomGetByHotelIDRes } from "../../../model/Response/Hotel/RoomGetByHotelIDRes";
import { HotelURLGetByHotelIDRes } from "../../../model/Response/Hotel/HotelUrlGetByHotelIDRes";
import { HotelImageGetByHotelIDRes } from "../../../model/Response/Hotel/HotelImageGetByHotelIDRes";
import { HotelGetByHIDRes } from "../../../model/Response/Hotel/HotelGetByHIDRes";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";

function CheckDataHotelPage() {
  const hotelService = new HotelService();
  const roomHotelService = new RoomHotelService();
  const [hotelAlls, setHotelAll] = useState<HotelGetByIDRes[]>([]);
  const [hotel, setHotel] = useState<HotelGetByHIDRes[]>([]);
  const [hotelUrl, setHotelUrl] = useState<HotelURLGetByHotelIDRes[]>([]);
  const [hotelImage, setHotelImage] = useState<HotelImageGetByHotelIDRes[]>([]);
  const [rooms, setRoom] = useState<RoomGetByHotelIDRes[]>([]);
  const user = JSON.parse(localStorage.getItem("objUser")!);
  // const navigate = useNavigate();
  const [Hotel_ID, setHotel_ID] = useState("");
  const [editing1, setEditing1] = useState(false);
  const [editing2, setEditing2] = useState(false);
  const nameHotelRef = useRef<HTMLInputElement>();
  const addressHotelRef = useRef<HTMLInputElement>();
  const detailHotelRef = useRef<HTMLInputElement>();
  const [hotel_type, setHotel_type] = useState(0);
  const [contact, setContact] = useState<HotelURLGetByHotelIDRes[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<RoomGetByHotelIDRes | null>(
    null
  );
  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await hotelService.getHotelByUid(user?.uid);
      const data: HotelGetByIDRes[] = res.data;
      setHotelAll(data);

      // const resRoom = await roomHotelService.getRoomByHotelID()
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataHotelAsync = async () => {
      const resHotel = await hotelService.getShowHotelByHid(Hotel_ID);
      const data: HotelGetByHIDRes[] = resHotel.data;
      setHotel(data);

      const resUrl = await hotelService.getHotelUrlByHid(Hotel_ID);
      const dataUrl: HotelURLGetByHotelIDRes[] = resUrl.data;
      setHotelUrl(dataUrl);

      const resImage = await hotelService.getHotelImageByHid(Hotel_ID);
      const dataImage: HotelImageGetByHotelIDRes[] = resImage.data;
      setHotelImage(dataImage);

      const resRoom = await roomHotelService.getRoomByHotelID(Hotel_ID);
      const dataRoom: RoomGetByHotelIDRes[] = resRoom.data;
      setRoom(dataRoom);
    };
    loadDataHotelAsync();
  }, [Hotel_ID]);
  // ฟังก์ชันเริ่มแก้ไข
  const handleEditClick = (index: number) => {
    setEditingRow(index);
    setEditedData(rooms[index]);
  };

  // ฟังก์ชันยกเลิกการแก้ไข
  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedData(null);
  };

  // ฟังก์ชันบันทึกการแก้ไข
  const handleSaveClick = () => {
    if (editedData) {
      // ทำการบันทึกข้อมูลที่แก้ไข (คุณสามารถเพิ่มฟังก์ชันการบันทึกไปยัง API หรืออื่นๆ ได้ที่นี่)
      console.log("บันทึกข้อมูล:", editedData);
      setEditingRow(null); // ปิดโหมดแก้ไข
    }
  };

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
      <div className="checkdatahotel-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "120px",
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
              ตรวจสอบข้อมูล
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <FormControl sx={{ ml: 15, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                เลือกโรงแรม
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={Hotel_ID}
                onChange={(e) => {
                  setHotel_ID(e.target.value);
                  setEditing1(false);
                  setEditing2(false);

                  setEditingRow(null);
                  setEditedData(null);
                }}
                sx={{ borderRadius: 20, overflow: "auto" }}
                autoWidth
              >
                {hotelAlls.map((hotel, index) => (
                  <MenuItem key={hotel.HID} value={hotel.HID}>
                    {1 + index} - {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {editing1 ? (
              <>
                <Box
                  sx={{
                    width: 1250,
                    maxHeight: 900,
                    borderRadius: 3,
                    border: 2,
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "20px",
                      marginTop: "10px",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    {hotel.map((concertselect) => (
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "20px",
                          marginTop: "20px",
                          flexDirection: "row",
                          alignItems: "center", // จัดแนว h1 ให้อยู่ตรงกลางในแนวแกน Y
                          justifyContent: "space-between", // เว้นระยะห่างพอดีระหว่าง h1 กับ TextField
                        }}
                      >
                        <h1 style={{ marginRight: "20px" }}>ชื่อโรงแรม :</h1>
                        <TextField
                          placeholder={concertselect?.name}
                          className="w-[600px]"
                          // label="ชื่อโรงแรม"
                          variant="outlined"
                          defaultValue={concertselect?.name}
                          inputRef={nameHotelRef}
                        />
                      </div>
                    ))}
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      {editing1 ? (
                        <>
                          <Card className="mr-2" sx={{ height: 40, border: 1 }}>
                            <CardActionArea>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <SaveIcon
                                  onClick={async () => {
                                    console.log("ข้อมูลส่วนแรก");
                                    console.log(nameHotelRef.current?.value);
                                    console.log(addressHotelRef.current?.value);
                                    if (hotel_type == 0) {
                                      hotel.map((concertselect) => {
                                        console.log(
                                          concertselect.hotel_type_ID
                                        );
                                      });
                                    } else {
                                      console.log(hotel_type);
                                    }
                                    console.log(detailHotelRef.current?.value);
                                    console.log(
                                      "================================================================="
                                    );
                                  }}
                                  sx={{
                                    fontSize: "40px",
                                    color: "skyblue",
                                  }}
                                />
                              </div>
                            </CardActionArea>
                          </Card>
                        </>
                      ) : (
                        <> </>
                      )}
                      <Card sx={{ height: 40, border: 1 }}>
                        <CardActionArea>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {editing1 ? (
                              <>
                                <HighlightOffIcon
                                  onClick={() => setEditing1(false)}
                                  sx={{ fontSize: "40px", color: "red" }}
                                />
                              </>
                            ) : (
                              <EditIcon
                                onClick={() => setEditing1(true)}
                                sx={{ fontSize: "40px", color: "black" }}
                              />
                            )}
                          </div>
                        </CardActionArea>
                      </Card>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "20px",
                    }}
                  >
                    <Card
                      sx={{
                        maxWidth: 30,
                        maxHeight: 30,
                        marginTop: 2,
                        borderBlockColor: "white",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fplaceholder.png?alt=media&token=7928f28b-1307-49b6-ae06-36cb8123e5d5"
                      />
                    </Card>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "5px",
                        paddingTop: "5px",
                      }}
                    >
                      {/* ที่อยู่ */}
                      {hotel.map((concertselect) => (
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "20px",
                            // marginTop: "20px",
                            flexDirection: "row",
                            alignItems: "center", // จัดแนว h1 ให้อยู่ตรงกลางในแนวแกน Y
                            justifyContent: "space-between", // เว้นระยะห่างพอดีระหว่าง h1 กับ TextField
                          }}
                        >
                          <h1 style={{ marginRight: "20px" }}>ที่อยู่ :</h1>
                          <TextField
                            placeholder={concertselect?.address}
                            className="w-[600px]"
                            // label="ชื่อโรงแรม"
                            variant="outlined"
                            defaultValue={concertselect?.address}
                            inputRef={addressHotelRef}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 520,
                        height: 470,
                        borderRadius: 3,
                        // bgcolor: "#D9D9D9",
                        border: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // flexDirection: "column",
                      }}
                    >
                      <ImageList
                        sx={{
                          maxWidth: 500,
                          height: 455,
                          maxHeight: 455,
                          marginTop: "5px",
                          marginLeft: "5px",
                          borderRadius: 3,
                        }}
                        // variant="woven"
                        cols={3}
                        gap={6}
                        // rowHeight={"auto"}

                        rowHeight={200}
                      >
                        {hotelImage.map((item) => (
                          <ImageListItem key={item?.url_image}>
                            <img
                              srcSet={`${item?.url_image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              src={`${item?.url_image}?w=164&h=164&fit=crop&auto=format`}
                              alt={item?.HIMGID.toString()}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Box>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                      marginLeft: "20px",
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        // fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                        fontStyle: "normal",
                      }}
                      variant="h5"
                    >
                      ชนิดโรงแรม :{" "}
                      {hotel.map((concertselect) => (
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={concertselect.hotel_type_ID}
                          label="ประเภทของคอนเสิร์ต"
                          defaultValue={concertselect.hotel_type_ID}
                          onChange={(e) => {
                            setHotel_type(Number(e.target.value));
                          }}
                          sx={{
                            borderRadius: 20,
                            bgcolor: "white",
                            height: "40px",
                          }}
                        >
                          <MenuItem value={1}>โรงแรม</MenuItem>
                          <MenuItem value={2}>รีสอร์ท</MenuItem>
                          <MenuItem value={3}>บังกะโล</MenuItem>
                        </Select>
                      ))}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                      marginLeft: "20px",
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        // fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                        fontStyle: "normal",
                      }}
                      variant="h5"
                    >
                      รายละเอียดของโรงแรม
                    </Typography>
                    <Divider sx={{ width: "550px", border: 1 }} />
                    {hotel.map((concertselect) => (
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "10px",
                          marginRight: "15px",
                          marginTop: "10px",
                          marginBottom: "30px",
                          flexDirection: "row",
                          alignItems: "center", // จัดแนว h1 ให้อยู่ตรงกลางในแนวแกน Y
                          // เว้นระยะห่างพอดีระหว่าง h1 กับ TextField
                        }}
                      >
                        <TextField
                          placeholder={concertselect?.detail}
                          className="w-full"
                          // label="ชื่อโรงแรม"
                          variant="outlined"
                          defaultValue={concertselect?.detail}
                          inputRef={detailHotelRef}
                        />
                      </div>
                    ))}
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: 1250,
                    maxHeight: 900,
                    borderRadius: 3,
                    border: 2,
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "20px",
                      marginTop: "10px",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        // fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                        fontStyle: "normal",
                      }}
                      variant="h5"
                    >
                      {hotel.map((hotelselect) => (
                        <>{hotelselect.name}</>
                      ))}
                    </Typography>
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      <Card sx={{ height: 55, border: 1 }}>
                        <CardActionArea
                        // onClick={navigateToEditDataHotelPage}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <EditIcon
                              sx={{ fontSize: "50px" }}
                              onClick={() => setEditing1(true)}
                            />
                          </div>
                          {/* <CardContent></CardContent> */}
                        </CardActionArea>
                      </Card>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "20px",
                    }}
                  >
                    <Card
                      sx={{
                        maxWidth: 30,
                        maxHeight: 30,
                        borderBlockColor: "white",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fplaceholder.png?alt=media&token=7928f28b-1307-49b6-ae06-36cb8123e5d5"
                      />
                    </Card>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "5px",
                        paddingTop: "5px",
                      }}
                    >
                      <Typography
                        gutterBottom
                        sx={{
                          display: "flex",
                          // fontWeight: "bold",
                          color: "#857878",
                          fontFamily: "Mitr, sans-serif",
                          fontStyle: "normal",
                        }}
                        // variant="h6"
                      >
                        {/* ที่อยู่ */}
                        {hotel.map((hotelselect) => (
                          <>{hotelselect.address}</>
                        ))}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 520,
                        height: 470,
                        borderRadius: 3,
                        // bgcolor: "#D9D9D9",
                        border: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // flexDirection: "column",
                      }}
                    >
                      <ImageList
                        sx={{
                          maxWidth: 500,
                          height: 455,
                          maxHeight: 455,
                          marginTop: "5px",
                          marginLeft: "5px",
                          borderRadius: 3,
                        }}
                        // variant="woven"
                        cols={3}
                        gap={6}
                        // rowHeight={"auto"}

                        rowHeight={200}
                      >
                        {hotelImage.map((item) => (
                          <ImageListItem key={item?.url_image}>
                            <img
                              srcSet={`${item?.url_image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              src={`${item?.url_image}?w=164&h=164&fit=crop&auto=format`}
                              alt={item?.HIMGID.toString()}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Box>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                      marginLeft: "20px",
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        // fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                        fontStyle: "normal",
                      }}
                      variant="h5"
                    >
                      ชนิดโรงแรม :{" "}
                      {hotel.map((hotelselect) => (
                        <>{hotelselect.typename_hotel}</>
                      ))}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                      marginLeft: "20px",
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        // fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
                        fontStyle: "normal",
                      }}
                      variant="h5"
                    >
                      รายละเอียดของโรงแรม
                    </Typography>
                    <Divider sx={{ width: "550px", border: 1 }} />
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <Typography
                        gutterBottom
                        sx={{
                          display: "flex",
                          fontWeight: "bold",
                          border: 2,
                          borderColor: "black",
                          borderRadius: 2,
                          color: "#857878",
                          fontFamily: "Mitr, sans-serif",
                          fontStyle: "normal",
                          overflow: "auto",
                          maxHeight: "200px",
                          maxWidth: "1200px",
                        }}
                        // variant="h5"
                      >
                        {hotel.map((hotelselect) => (
                          <>{hotelselect.detail}</>
                        ))}
                      </Typography>
                    </div>
                  </div>
                </Box>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginRight: "700px",
              justifyContent: "center",
            }}
          >
            {editing2 ? (
              <>
                <Box
                  sx={{
                    width: 550,
                    // height: 300,
                    maxHeight: 300,
                    borderRadius: 3,
                    // bgcolor: "#D9D9D9",
                    border: 2,
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "10px",
                      marginTop: "10px",
                      justifyContent: "space-between",
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
                      variant="h5"
                    >
                      ช่องทางการติดต่อ
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ display: "flex", marginRight: "10px" }}>
                        {editing2 ? (
                          <>
                            <Card
                              className="mr-2"
                              sx={{ height: 40, border: 1 }}
                            >
                              <CardActionArea>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <SaveIcon
                                    onClick={async () => {
                                      console.log("ข้อมูลส่วนที่สอง");
                                      console.log(contact);

                                      if (contact.length == 0) {
                                        console.log(hotelUrl);
                                      } else {
                                        console.log(contact);
                                      }

                                      console.log(
                                        "================================================================="
                                      );
                                    }}
                                    sx={{
                                      fontSize: "40px",
                                      color: "skyblue",
                                    }}
                                  />
                                </div>
                              </CardActionArea>
                            </Card>
                          </>
                        ) : (
                          <> </>
                        )}
                        <Card sx={{ height: 40, border: 1 }}>
                          <CardActionArea>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {editing2 ? (
                                <>
                                  <HighlightOffIcon
                                    onClick={() => setEditing2(false)}
                                    sx={{ fontSize: "40px", color: "red" }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => setEditing2(true)}
                                  sx={{ fontSize: "40px", color: "black" }}
                                />
                              )}
                            </div>
                          </CardActionArea>
                        </Card>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "10px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        width: 500,
                        // height: 230,
                        maxHeight: 230,
                        borderRadius: 3,
                        marginBottom: 1,
                        // bgcolor: "#D9D9D9",
                        border: 1,
                        overflow: "auto",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          marginLeft: "10px",
                          marginBottom: 2,
                        }}
                      >
                        <Grid container spacing={2}>
                          {hotelUrl.map((hotelselect, index) => (
                            <>
                              <Grid item>
                                <TextField
                                  sx={{
                                    width: "100%", // ปรับขนาดตามความต้องการ
                                    "& .MuiInputBase-root": {
                                      color: "#3A3A3A", // สีของข้อความ
                                    },
                                  }}
                                  // variant="outlined"
                                  defaultValue={hotelselect.url}
                                  onChange={(e) => {
                                    const updatedUrl = e.target.value;
                                    const updatedHotelUrl = [...hotelUrl]; // สร้างสำเนาของ array
                                    updatedHotelUrl[index].url = updatedUrl; // แก้ไขค่าในตำแหน่งที่ถูกต้อง
                                    console.log(updatedHotelUrl);
                                    setContact(updatedHotelUrl);
                                  }}
                                />
                              </Grid>
                            </>
                          ))}
                        </Grid>
                      </div>
                    </Box>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: 550,
                    // height: 300,
                    maxHeight: 300,
                    borderRadius: 3,
                    // bgcolor: "#D9D9D9",
                    border: 2,
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "10px",
                      marginTop: "10px",
                      justifyContent: "space-between",
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
                      variant="h5"
                    >
                      ช่องทางการติดต่อ
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Card sx={{ height: 40, border: 1 }}>
                        <CardActionArea
                        // onClick={navigateToEditDataHotelPage}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <EditIcon
                              sx={{ fontSize: "40px" }}
                              onClick={() => setEditing2(true)}
                            />
                          </div>
                          {/* <CardContent></CardContent> */}
                        </CardActionArea>
                      </Card>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "10px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        width: 500,
                        // height: 230,
                        maxHeight: 230,
                        borderRadius: 3,
                        marginBottom: 1,
                        // bgcolor: "#D9D9D9",
                        border: 1,
                        overflow: "auto",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          marginLeft: "10px",
                          marginBottom: 2,
                        }}
                      >
                        <Grid container spacing={2}>
                          {hotelUrl.map((hotelselect) => (
                            <>
                              <Grid item>
                                <Link
                                  sx={{
                                    color: "#3A3A3A",
                                    "&:hover": {
                                      color: "#3A3A3A",
                                    },
                                  }}
                                  underline="hover"
                                >
                                  {hotelselect.url}
                                </Link>
                              </Grid>
                            </>
                          ))}
                        </Grid>
                      </div>
                    </Box>
                  </div>
                </Box>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                width: 1250,
                maxHeight: 400,
                paddingBottom: 1,
                borderRadius: 3,
                border: 2,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    marginTop: "5px",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                    fontStyle: "normal",
                  }}
                  variant="h5"
                >
                  ข้อมูลห้อง
                </Typography>
              </div>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <TableContainer
                  component={Paper}
                  sx={{
                    marginTop: "10px",
                    maxHeight: 300,
                    width: 1200,
                    maxWidth: 1200,
                    border: 2,
                    borderRadius: 2,
                  }}
                >
                  <Table aria-label="room information table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ชนิดห้องพัก</TableCell>
                        <TableCell>วิวของห้อง</TableCell>
                        <TableCell>ราคาห้องต่อคืน</TableCell>
                        <TableCell>จำนวนคนเข้าพัก</TableCell>
                        <TableCell>จำนวนห้อง</TableCell>
                        <TableCell>สถานะของห้อง</TableCell>
                        <TableCell>แก้ไขข้อมูลห้อง</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rooms.map((hotelselect, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {editingRow === index ? (
                              <Select
                                value={editedData?.type_room}
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData!,
                                    type_room: e.target.value,
                                  })
                                }
                                label="ชนิดห้องพัก"
                              >
                                {/* แสดงรายการชนิดห้องพัก */}
                                <MenuItem value="Standard Room">
                                  ห้องธรรมดา (Standard Room)
                                </MenuItem>
                                <MenuItem value="Deluxe Room">
                                  ห้องดีลักซ์ (Deluxe Room)
                                </MenuItem>
                                <MenuItem value="Executive Room">
                                  ห้องเอกซ์คลูซีฟ (Executive Room)
                                </MenuItem>
                                <MenuItem value="Connecting Rooms">
                                  ห้องที่มีประตูเชื่อมต่อกัน (Connecting Rooms)
                                </MenuItem>
                                <MenuItem value="Suite Room">
                                  ห้องสวีท (Suite Room)
                                </MenuItem>
                                <MenuItem value="Superior Room">
                                  ห้องสุพีเรียร์ (Superior Room)
                                </MenuItem>
                                <MenuItem value="Accessible Room">
                                  ห้องพักพิเศษสำหรับผู้พิการ (Accessible Room)
                                </MenuItem>
                              </Select>
                            ) : (
                              hotelselect.type_room
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === index ? (
                              <Select
                                value={editedData?.type_view_name_room || ""}
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData!,
                                    type_view_name_room: e.target.value,
                                  })
                                }
                                label="วิวของห้อง"
                              >
                                {/* เพิ่มรายการสำหรับวิวห้อง */}
                                <MenuItem value="ทะเล">ทะเล</MenuItem>
                                <MenuItem value="ภูเขา">ภูเขา</MenuItem>
                                <MenuItem value="เมือง">เมือง</MenuItem>
                              </Select>
                            ) : (
                              hotelselect.type_view_name_room
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === index ? (
                              <TextField
                                type="number"
                                value={editedData?.price || ""}
                                label="ราคาห้องต่อคืน"
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData!,
                                    price: Number(e.target.value),
                                  })
                                }
                              />
                            ) : (
                              hotelselect.price
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === index ? (
                              <TextField
                                type="number"
                                value={editedData?.Number_of_guests || ""}
                                label="จำนวนคนเข้าพัก"
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData!,
                                    Number_of_guests: Number(e.target.value),
                                  })
                                }
                              />
                            ) : (
                              hotelselect.Number_of_guests
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === index ? (
                              <TextField
                                type="number"
                                value={editedData?.Number_of_rooms || ""}
                                label="จำนวนห้อง"
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData!,
                                    Number_of_rooms: Number(e.target.value),
                                  })
                                }
                              />
                            ) : (
                              hotelselect.Number_of_rooms
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === index ? (
                              <Select
                                value={editedData?.status_name_room || ""}
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData!,
                                    status_name_room: e.target.value,
                                  })
                                }
                                label="สถานะของห้อง"
                              >
                                {/* เพิ่มรายการสำหรับสถานะห้อง */}
                                <MenuItem value="ว่าง">ว่าง</MenuItem>
                                <MenuItem value="ไม่ว่าง">ไม่ว่าง</MenuItem>
                              </Select>
                            ) : (
                              hotelselect.status_name_room
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === index ? (
                              <div>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "#343434",
                                    marginRight: "10px",
                                  }}
                                  onClick={handleCancelClick}
                                >
                                  ยกเลิก
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "#4CAF50" }}
                                  onClick={handleSaveClick}
                                >
                                  บันทึก
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "#343434" }}
                                onClick={() => handleEditClick(index)}
                                startIcon={<EditIcon />}
                              >
                                รายละเอียดของห้อง
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckDataHotelPage;
