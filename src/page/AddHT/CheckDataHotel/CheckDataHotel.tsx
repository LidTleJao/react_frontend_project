import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  // Divider,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  // ImageList,
  // ImageListItem,
  InputLabel,
  // Link,
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
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import EditIcon from "@mui/icons-material/Edit";
import { HotelService } from "../../../service/hotelService";
import { RoomHotelService } from "../../../service/roomHotelService";
import { SetStateAction, useEffect, useRef, useState } from "react";
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
  const [Hotel_ID, setHotel_ID] = useState("");
  const [editing1, setEditing1] = useState(false);
  const [editing2, setEditing2] = useState(false);
  const nameHotelRef = useRef<HTMLInputElement>();
  const addressHotelRef = useRef<HTMLInputElement>();
  const detailHotelRef = useRef<HTMLTextAreaElement>(null);
  const [hotel_type, setHotel_type] = useState(1);
  const [contact, setContact] = useState<HotelURLGetByHotelIDRes[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<RoomGetByHotelIDRes | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false); // สถานะการเปิด/ปิด modal
  const [selectedImage, setSelectedImage] = useState(""); // รูปภาพที่ถูกเลือก

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
  const handleOpen = (image: SetStateAction<string>) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage("");
  };

  // ฟังก์ชันบันทึกการแก้ไข
  const handleSaveClick = async () => {
    if (editedData) {
      // ทำการบันทึกข้อมูลที่แก้ไข (คุณสามารถเพิ่มฟังก์ชันการบันทึกไปยัง API หรืออื่นๆ ได้ที่นี่)
      console.log("บันทึกข้อมูล:", editedData);
      try {
        const reshotel = await roomHotelService.updateHotelRoom(
          String(editedData.hotel_ID),
          String(editedData.HRID),
          String(editedData.price),
          String(editedData.Number_of_guests),
          String(editedData.Number_of_rooms),
          String(editedData.room_type_ID),
          String(editedData.room_view_type_ID),
          String(editedData.room_status_ID)
        );

        if (reshotel.status === 200) {
          const resRoom = await roomHotelService.getRoomByHotelID(Hotel_ID);
          const dataRoom: RoomGetByHotelIDRes[] = resRoom.data;
          setRoom(dataRoom);
          console.log(rooms);
          console.log(editedData);
          window.alert("แก้ไขข้อมูลเสร็จสิ้น!!!");
          console.log(reshotel.data);
        }
        setEditingRow(null);
      } catch (error) {
        window.alert("โปรดทำการแก้ไขข้อมูลอีกครั้ง");
        setEditingRow(null);
        console.log(error);
      }
      // const reshotel = await
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
          {isOpen ? (
            <>
              <div
                className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
                onClick={handleClose}
              >
                <div className="relative">
                  <img
                    className="max-w-full max-h-full rounded-xl cursor-pointer"
                    src={selectedImage}
                    onClick={handleClose} // ปิด modal
                    alt="Selected Concert"
                  />
                  <button
                    onClick={handleClose} // ปิด modal
                    className="absolute top-2 right-2 text-white text-2xl"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  gutterBottom
                  sx={{
                    display: "flex",
                    fontWeight: "bold",
                    color: "black",
                    fontStyle: "normal",
                  }}
                  variant="h4"
                >
                  ตรวจสอบข้อมูลโรงแรม
                </Typography>
              </div>
              {hotelAlls.length > 0 ? (
                <>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <FormControl sx={{ ml: 15, minWidth: 150 }}>
                      <InputLabel
                        sx={{ textAlign: "center", width: "70%", top: "-8px" }}
                      >
                        เลือกโรงแรม
                      </InputLabel>
                      <Select
                        value={Hotel_ID}
                        onChange={(e) => {
                          setHotel_ID(e.target.value);
                          setEditing1(false);
                          setEditing2(false);

                          setEditingRow(null);
                          setEditedData(null);
                        }}
                        sx={{ borderRadius: 10 }}
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

                  {hotel.length > 0 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        {editing1 ? (
                          <>
                            <div className="w-[1250px] max-h-max rounded-lg border-2 border-gray-300 shadow-lg p-6 bg-white flex flex-col gap-4">
                              <Box
                                sx={{
                                  display: "flex ",
                                  gap: 1,
                                  justifyContent: "end",
                                }}
                              >
                                {editing1 && (
                                  <Card
                                    sx={{
                                      height: 40,
                                      border: 1,
                                      borderColor: "#4CAF50",
                                      boxShadow:
                                        "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <CardActionArea>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <SaveIcon
                                          onClick={async () => {
                                            try {
                                              if (
                                                Hotel_ID &&
                                                hotel_type &&
                                                nameHotelRef.current?.value &&
                                                addressHotelRef.current
                                                  ?.value &&
                                                detailHotelRef.current?.value
                                              ) {
                                                const reshotel =
                                                  await hotelService.updateHotel(
                                                    Hotel_ID,
                                                    nameHotelRef.current!.value,
                                                    addressHotelRef.current!
                                                      .value,
                                                    hotel_type.toString(),
                                                    detailHotelRef.current!
                                                      .value
                                                  );
                                                if (reshotel.status === 200) {
                                                  const resHotel =
                                                    await hotelService.getShowHotelByHid(
                                                      Hotel_ID
                                                    );
                                                  const data: HotelGetByHIDRes[] =
                                                    resHotel.data;
                                                  setHotel(data);
                                                  window.alert(
                                                    "แก้ไขข้อมูลเสร็จสิ้น!!!"
                                                  );
                                                }
                                              } else {
                                                window.alert(
                                                  "โปรดทำการแก้ไขข้อมูลอีกครั้ง"
                                                );
                                              }
                                              setEditing1(false);
                                            } catch (error) {
                                              setEditing1(false);
                                              console.log(error);
                                            }
                                          }}
                                          sx={{
                                            fontSize: "40px",
                                            color: "#4CAF50",
                                          }}
                                        />
                                      </Box>
                                    </CardActionArea>
                                  </Card>
                                )}
                                <Card
                                  sx={{
                                    height: 40,
                                    border: 1,
                                    borderColor: editing1 ? "red" : "#333",
                                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <CardActionArea>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      {editing1 ? (
                                        <HighlightOffIcon
                                          onClick={() => setEditing1(false)}
                                          sx={{
                                            fontSize: "40px",
                                            color: "red",
                                          }}
                                        />
                                      ) : (
                                        <EditIcon
                                          onClick={() => setEditing1(true)}
                                          sx={{
                                            fontSize: "40px",
                                            color: "#333",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </CardActionArea>
                                </Card>
                              </Box>
                              {/* Hotel images section (move to the top) */}
                              <div>
                                <ImageList
                                  className=""
                                  cols={5}
                                  gap={10}
                                  rowHeight={250}
                                >
                                  {hotelImage.map((item) => (
                                    <ImageListItem
                                      key={item?.url_image}
                                      className="relative overflow-hidden rounded-lg shadow-lg"
                                    >
                                      <img
                                        srcSet={`${item?.url_image}`}
                                        src={`${item?.url_image}`}
                                        alt={item?.HIMGID.toString()}
                                        onClick={() =>
                                          handleOpen(item?.url_image)
                                        }
                                        loading="lazy"
                                        className="object-cover w-full h-64 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                      />
                                    </ImageListItem>
                                  ))}
                                </ImageList>
                              </div>

                              {/* Hotel name section */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {hotel.map((concertselect) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                    }}
                                  >
                                    <Typography variant="h6">
                                      ชื่อโรงแรม:
                                    </Typography>
                                    <TextField
                                      placeholder={concertselect?.name}
                                      className="w-[600px]"
                                      variant="outlined"
                                      defaultValue={concertselect?.name}
                                      inputRef={nameHotelRef}
                                      sx={{
                                        bgcolor: "#F9F9F9",
                                        borderRadius: 2,
                                      }}
                                    />
                                  </Box>
                                ))}
                                {/* Edit and Save buttons */}
                              </Box>

                              {/* Hotel address section */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Card
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow:
                                      "0px 3px 10px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    alt="hotel logo"
                                    image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fplaceholder.png?alt=media&token=7928f28b-1307-49b6-ae06-36cb8123e5d5"
                                  />
                                </Card>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  {hotel.map((concertselect) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                      }}
                                    >
                                      <Typography variant="h6">
                                        ที่อยู่:
                                      </Typography>
                                      <TextField
                                        placeholder={concertselect?.address}
                                        className="w-[600px]"
                                        variant="outlined"
                                        defaultValue={concertselect?.address}
                                        inputRef={addressHotelRef}
                                        sx={{
                                          bgcolor: "#F9F9F9",
                                          borderRadius: 2,
                                        }}
                                      />
                                    </Box>
                                  ))}
                                </Box>
                              </Box>

                              {/* Hotel type and details */}
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 2,
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  ชนิดโรงแรม:
                                  <Select
                                    value={hotel_type}
                                    onChange={(e) =>
                                      setHotel_type(Number(e.target.value))
                                    }
                                    sx={{
                                      ml: 2,
                                      borderRadius: 20,
                                      bgcolor: "#F9F9F9",
                                      height: "40px",
                                      width: "200px",
                                      boxShadow:
                                        "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <MenuItem value={1}>โรงแรม</MenuItem>
                                    <MenuItem value={2}>รีสอร์ท</MenuItem>
                                    <MenuItem value={3}>บังกะโล</MenuItem>
                                  </Select>
                                </Typography>

                                <Typography variant="h5" sx={{ mt: 2 }}>
                                  รายละเอียดของโรงแรม
                                </Typography>
                                {/* <Divider
                              sx={{
                                width: "100%",
                                border: 1,
                                borderColor: "#E0E0E0",
                                my: 2,
                              }}
                            /> */}
                                {hotel.map((concertselect) => (
                                  <TextareaAutosize
                                    placeholder={concertselect?.detail}
                                    defaultValue={concertselect?.detail}
                                    minRows={4} // กำหนดให้เริ่มต้นแสดง 4 แถว
                                    ref={detailHotelRef}
                                    style={{
                                      width: "100%",
                                      marginBottom: "24px",
                                      backgroundColor: "#F9F9F9",
                                      borderRadius: "8px",
                                      padding: "16px",
                                      boxShadow:
                                        "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                      border: "1px solid #ddd",
                                      resize: "vertical", // ให้ผู้ใช้สามารถปรับขนาดแนวตั้งได้
                                    }}
                                  />
                                ))}
                              </Box>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-[1250px] max-h-max rounded-lg border-2 border-gray-300 shadow-lg p-6 bg-white flex flex-col gap-4">
                              <Box
                                sx={{
                                  display: "flex ",
                                  gap: 1,
                                  justifyContent: "end",
                                }}
                              >
                                <Card
                                  sx={{
                                    height: 40,
                                    border: 1,
                                    borderColor: editing1 ? "red" : "#333",
                                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <CardActionArea>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      {editing1 ? (
                                        <HighlightOffIcon
                                          onClick={() => setEditing1(false)}
                                          sx={{
                                            fontSize: "40px",
                                            color: "red",
                                          }}
                                        />
                                      ) : (
                                        <EditIcon
                                          onClick={() => setEditing1(true)}
                                          sx={{
                                            fontSize: "40px",
                                            color: "#333",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </CardActionArea>
                                </Card>
                              </Box>

                              {/* ส่วนแสดงภาพของโรงแรม */}
                              <div>
                                <ImageList
                                  className=""
                                  cols={5}
                                  gap={10}
                                  rowHeight={250}
                                >
                                  {hotelImage.map((item) => (
                                    <ImageListItem
                                      key={item?.url_image}
                                      className="relative overflow-hidden rounded-lg shadow-lg"
                                    >
                                      <img
                                        srcSet={`${item?.url_image}`}
                                        src={`${item?.url_image}`}
                                        alt={item?.HIMGID.toString()}
                                        onClick={() =>
                                          handleOpen(item?.url_image)
                                        }
                                        loading="lazy"
                                        className="object-cover w-full h-64 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                      />
                                    </ImageListItem>
                                  ))}
                                </ImageList>
                              </div>

                              {/* ส่วนชื่อโรงแรม */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {hotel.map((concertselect) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                    }}
                                  >
                                    <Typography variant="h6">
                                      ชื่อโรงแรม:
                                    </Typography>
                                    <div className="bg-gray-100 rounded-md px-4 py-2 w-auto">
                                      {concertselect?.name}
                                    </div>
                                  </Box>
                                ))}
                              </Box>

                              {/* ส่วนที่อยู่ของโรงแรม */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Card
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow:
                                      "0px 3px 10px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    alt="hotel logo"
                                    image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fplaceholder.png?alt=media&token=7928f28b-1307-49b6-ae06-36cb8123e5d5"
                                  />
                                </Card>
                                {hotel.map((concertselect) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                    }}
                                  >
                                    <Typography variant="h6">
                                      ที่อยู่:
                                    </Typography>
                                    <div className="bg-gray-100 rounded-md px-4 py-2 w-auto">
                                      {concertselect?.address}
                                    </div>
                                  </Box>
                                ))}
                              </Box>

                              {/* ส่วนชนิดโรงแรม */}
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 2,
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <Typography variant="h5">
                                    ชนิดโรงแรม:
                                  </Typography>
                                  <div className="bg-gray-100 rounded-md px-4 py-2 w-auto">
                                    {hotel_type === 1
                                      ? "โรงแรม"
                                      : hotel_type === 2
                                      ? "รีสอร์ท"
                                      : "บังกะโล"}
                                  </div>
                                </div>

                                {/* รายละเอียดของโรงแรม */}
                                <Typography variant="h5" sx={{ mt: 1 }}>
                                  รายละเอียดของโรงแรม
                                </Typography>
                                {hotel.map((concertselect) => (
                                  <Typography
                                    sx={{
                                      bgcolor: "#F9F9F9",
                                      borderRadius: 2,
                                      padding: "16px",
                                      boxShadow:
                                        "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                      border: "1px solid #ddd",
                                      width: "100%",
                                    }}
                                  >
                                    {concertselect?.detail}
                                  </Typography>
                                ))}
                              </Box>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                          marginRight: "550px",
                        }}
                      >
                        {editing2 ? (
                          <>
                            <div className="w-[700px] max-h-max rounded-lg border-2 flex flex-col">
                              <div className="flex justify-between ml-2 mt-2">
                                <h5 className="font-bold text-black text-xl">
                                  ช่องทางการติดต่อ
                                </h5>
                                <div className="flex mr-2 mb-2">
                                  <div className="flex mr-2">
                                    {editing2 ? (
                                      <div className="mr-2">
                                        <div className="border h-10 flex items-center justify-center rounded-md">
                                          <SaveIcon
                                            sx={{
                                              fontSize: "40px",
                                              color: "#4CAF50",
                                            }}
                                            // onClick={async () => {
                                            //   // console.log(hotelUrl);

                                            //   // console.log(contact);
                                            //   try {
                                            //     // console.log(contact);
                                            //     for (
                                            //       let index = 0;
                                            //       index < contact.length;
                                            //       index++
                                            //     ) {
                                            //       console.log(contact[index]);
                                            //       if (
                                            //         contact[index].HCID == 0
                                            //       ) {
                                            //         // เอา api ตัวเพิ่มลิงค์มาใส่ตรงนี้
                                            //         console.log(contact[index]);
                                            //         const hotel =
                                            //         contact[index];
                                            //         const reshotel =
                                            //           await hotelService.updateHotelChannel(
                                            //             String(hotel.hotel_ID),
                                            //             String(hotel.HCID),
                                            //             hotel.url
                                            //           );
                                            //         console.log(
                                            //           reshotel.status
                                            //         );
                                            //         window.alert(
                                            //           "แก้ไขข้อมูลช่องทางการติดต่อเสร็จสิ้น!!!"
                                            //         );
                                            //       } else {
                                            //         const hotel =
                                            //         hotelUrl[index];
                                            //         const reshotel =
                                            //           await hotelService.updateHotelChannel(
                                            //             String(hotel.hotel_ID),
                                            //             String(hotel.HCID),
                                            //             hotel.url
                                            //           );
                                            //         console.log(
                                            //           reshotel.status
                                            //         );
                                            //         window.alert(
                                            //           "แก้ไขข้อมูลช่องทางการติดต่อเสร็จสิ้น!!!"
                                            //         );
                                            //       }
                                            //     }
                                            //     // const resUrl =
                                            //     //   await hotelService.getHotelUrlByHid(
                                            //     //     Hotel_ID
                                            //     //   );
                                            //     // const dataUrl: HotelURLGetByHotelIDRes[] =
                                            //     //   resUrl.data;
                                            //     // setHotelUrl(dataUrl);
                                            //     // setContact([]);

                                            //     setEditing2(false);
                                            //   } catch (error) {
                                            //     setEditing2(false);
                                            //     console.log(error);
                                            //   }
                                            // }}
                                            onClick={async () => {
                                              console.log(hotelUrl);

                                              console.log(contact);
                                              try {
                                                console.log(contact);
                                                for (
                                                  let index = 0;
                                                  index < contact.length;
                                                  index++
                                                ) {
                                                  if (
                                                    contact[index] &&
                                                    contact[index].HCID == 0
                                                  ) {
                                                    // เอา api ตัวเพิ่มลิงค์มาใส่ตรงนี้
                                                    console.log(contact[index]);
                                                  } else if (contact[index]) {
                                                    const hotel =
                                                      contact[index];
                                                    const reshotel =
                                                      await hotelService.updateHotelChannel(
                                                        String(hotel.hotel_ID),
                                                        String(hotel.HCID),
                                                        hotel.url
                                                      );
                                                    console.log(
                                                      reshotel.status
                                                    );
                                                    window.alert(
                                                      "แก้ไขข้อมูลช่องทางการติดต่อเสร็จสิ้น!!!"
                                                    );
                                                  }
                                                }
                                                const resUrl =
                                                  await hotelService.getHotelUrlByHid(
                                                    Hotel_ID
                                                  );
                                                const dataUrl: HotelURLGetByHotelIDRes[] =
                                                  resUrl.data;
                                                setHotelUrl(dataUrl);
                                                setContact([]);
                                                
                                                setEditing2(false);
                                              } catch (error) {
                                                setEditing2(false);
                                                console.log(error);
                                              }
                                            }}
                                            className="text-skyblue text-2xl"
                                          />
                                        </div>
                                      </div>
                                    ) : null}
                                    <div className="border h-10 flex items-center justify-center rounded-md">
                                      {editing2 ? (
                                        <HighlightOffIcon
                                          onClick={() => {
                                            setEditing2(false);
                                            setContact([]);
                                          }}
                                          sx={{
                                            fontSize: "40px",
                                            color: "red",
                                          }}
                                        />
                                      ) : (
                                        <EditIcon
                                          onClick={() => setEditing2(true)}
                                          className="text-green-400 text-2xl"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex ml-2 mr-2">
                                <div className="flex flex-col w-full max-h-[330px] border rounded-lg overflow-auto mb-2">
                                  <div className="flex mt-2 ml-2 mb-2">
                                    <div className="flex flex-col w-full">
                                      {" "}
                                      {/* เพิ่ม w-full เพื่อให้ div ย่อยเต็มการ์ด */}
                                      {hotelUrl && hotelUrl.length > 0 ? (
                                        <>
                                          {hotelUrl.map(
                                            (hotelselect, index) => (
                                              <div
                                                key={index}
                                                className="flex mb-2 mt-2 ml-2 mr-2"
                                              >
                                                <TextField
                                                  placeholder={hotelselect.url}
                                                  label="Url"
                                                  variant="outlined"
                                                  className="w-full" // ทำให้ TextField กว้างเต็มที่
                                                  value={
                                                    contact[index]?.url ||
                                                    hotelselect.url
                                                  } // แสดงข้อมูลเดิม
                                                  onChange={(e) => {
                                                    const newUrl =
                                                      e.target.value;
                                                    const updatedHotelUrl = [
                                                      ...contact,
                                                    ];
                                                    updatedHotelUrl[index] = {
                                                      ...hotelselect,
                                                      url: newUrl,
                                                    };
                                                    setContact(updatedHotelUrl);
                                                  }}
                                                />
                                              </div>
                                            )
                                          )}
                                          {[...Array(3 - hotelUrl.length)].map(
                                            (_, idx) => (
                                              <div
                                                key={hotelUrl.length + idx}
                                                className="flex mb-2 mt-2 ml-2 mr-2"
                                              >
                                                <TextField
                                                  className="w-full " // ทำให้ TextField กว้างเต็มที่
                                                  label="Url"
                                                  variant="outlined"
                                                  value={
                                                    contact[
                                                      hotelUrl.length + idx
                                                    ]?.url || ""
                                                  }
                                                  onChange={(e) => {
                                                    const newUrl =
                                                      e.target.value;
                                                    const updatedHotelUrl = [
                                                      ...contact,
                                                    ];
                                                    updatedHotelUrl[
                                                      hotelUrl.length + idx
                                                    ] = {
                                                      url: newUrl,
                                                      HCID: 0,
                                                      hotel_ID:
                                                        Number(Hotel_ID),
                                                    };
                                                    setContact(updatedHotelUrl);
                                                  }}
                                                />
                                              </div>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {[...Array(3)].map((_, idx) => (
                                            <div
                                              key={idx}
                                              className="flex mb-2 mt-2 ml-2 mr-2"
                                            >
                                              <TextField
                                                className="w-full " // ทำให้ TextField กว้างเต็มที่
                                                label="Url"
                                                variant="outlined"
                                                value={contact[idx]?.url || ""}
                                                onChange={(e) => {
                                                  const newUrl = e.target.value;
                                                  const updatedHotelUrl = [
                                                    ...contact,
                                                  ];
                                                  updatedHotelUrl[idx] = {
                                                    url: newUrl,
                                                    HCID: 0,
                                                    hotel_ID: Number(Hotel_ID),
                                                  };
                                                  setContact(updatedHotelUrl);
                                                }}
                                              />
                                            </div>
                                          ))}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-[700px] max-h-max rounded-lg border-2 flex flex-col bg-white shadow-md mt">
                              <div className="flex justify-between items-center p-4 border-b">
                                <h5 className="font-bold text-black text-xl">
                                  ช่องทางการติดต่อ
                                </h5>
                                <div className="mr-2">
                                  <div className="border h-10 flex items-center justify-center rounded-md hover:bg-gray-200 transition duration-200">
                                    <EditIcon
                                      onClick={() => setEditing2(true)}
                                      sx={{
                                        fontSize: "40px",
                                        color: "#333",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-start mt-4 mb-2 ml-4">
                                <div className="flex flex-col w-auto  border rounded-lg shadow-lg overflow-hidden p-4 bg-white mb-3">
                                  {hotelUrl.length > 0 ? (
                                    <div className="flex flex-col space-y-2">
                                      <Grid container spacing={2}>
                                        {hotelUrl.map((hotelselect, index) => (
                                          <Grid item key={index} xs={12}>
                                            <a
                                              href={hotelselect.url}
                                              className="block p-2 text-gray-800 hover:text-blue-500 transition duration-200 rounded-lg bg-gray-100 hover:bg-gray-200"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              title={hotelselect.url}
                                            >
                                              {hotelselect.url.length > 70
                                                ? `${hotelselect.url.substring(
                                                    0,
                                                    67
                                                  )}...`
                                                : hotelselect.url}
                                            </a>
                                          </Grid>
                                        ))}
                                      </Grid>
                                    </div>
                                  ) : (
                                    <div className="flex justify-center items-center h-32">
                                      <p className="text-gray-600 text-lg">
                                        ยังไม่มีข้อมูลช่องการติดต่อ
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",

                          marginTop: "20px",
                          marginBottom: "70px",
                        }}
                      >
                        <Box
                          sx={{
                            width: 1250,
                            // height: 700,
                            paddingBottom: 1,
                            borderRadius: 3,
                            border: 2,
                            borderColor: "#e0e0e0", // เปลี่ยนสีขอบ
                            boxShadow: 3, // เพิ่มเงาให้กับการ์ด
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "20px",
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
                                fontWeight: "bold",
                                color: "#343434", // เปลี่ยนสีข้อความ
                                fontFamily: "Mitr, sans-serif",
                                fontStyle: "normal",
                                fontSize: "1.5rem", // เพิ่มขนาดตัวอักษร
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
                                maxHeight: 700,
                                width: 1200,
                                border: 2,
                                borderColor: "#e0e0e0", // เปลี่ยนสีขอบ
                                borderRadius: 2,
                                boxShadow: 1, // เพิ่มเงาให้กับตาราง
                              }}
                            >
                              {rooms.length > 0 ? (
                                <>
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
                                              >
                                                {/* แสดงรายการชนิดห้องพัก */}
                                                <MenuItem value="Standard Room">
                                                  ห้องธรรมดา (Standard Room)
                                                </MenuItem>
                                                <MenuItem value="Deluxe Room">
                                                  ห้องดีลักซ์ (Deluxe Room)
                                                </MenuItem>
                                                <MenuItem value="Executive Room">
                                                  ห้องเอกซ์คลูซีฟ (Executive
                                                  Room)
                                                </MenuItem>
                                                <MenuItem value="Connecting Rooms">
                                                  ห้องที่มีประตูเชื่อมต่อกัน
                                                  (Connecting Rooms)
                                                </MenuItem>
                                                <MenuItem value="Suite Room">
                                                  ห้องสวีท (Suite Room)
                                                </MenuItem>
                                                <MenuItem value="Superior Room">
                                                  ห้องสุพีเรียร์ (Superior Room)
                                                </MenuItem>
                                                <MenuItem value="Accessible Room">
                                                  ห้องพักพิเศษสำหรับผู้พิการ
                                                  (Accessible Room)
                                                </MenuItem>
                                              </Select>
                                            ) : (
                                              hotelselect.type_room
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {editingRow === index ? (
                                              <Select
                                                value={
                                                  editedData?.type_view_name_room ||
                                                  ""
                                                }
                                                onChange={(e) =>
                                                  setEditedData({
                                                    ...editedData!,
                                                    type_view_name_room:
                                                      e.target.value,
                                                  })
                                                }
                                              >
                                                {/* เพิ่มรายการสำหรับวิวห้อง */}
                                                <MenuItem value="ทะเล">
                                                  ทะเล
                                                </MenuItem>
                                                <MenuItem value="ภูเขา">
                                                  ภูเขา
                                                </MenuItem>
                                                <MenuItem value="เมือง">
                                                  เมือง
                                                </MenuItem>
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
                                                    price: Number(
                                                      e.target.value
                                                    ),
                                                  })
                                                }
                                                inputProps={{ min: 1 }}
                                                variant="outlined" // เพิ่มสไตล์ให้กับ TextField
                                              />
                                            ) : (
                                              hotelselect.price
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {editingRow === index ? (
                                              <TextField
                                                type="number"
                                                value={
                                                  editedData?.Number_of_guests ||
                                                  ""
                                                }
                                                label="จำนวนคนเข้าพัก"
                                                onChange={(e) =>
                                                  setEditedData({
                                                    ...editedData!,
                                                    Number_of_guests: Number(
                                                      e.target.value
                                                    ),
                                                  })
                                                }
                                                inputProps={{ min: 1 }}
                                                variant="outlined" // เพิ่มสไตล์ให้กับ TextField
                                              />
                                            ) : (
                                              hotelselect.Number_of_guests
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {editingRow === index ? (
                                              <TextField
                                                type="number"
                                                value={
                                                  editedData?.Number_of_rooms ||
                                                  ""
                                                }
                                                label="จำนวนห้อง"
                                                onChange={(e) =>
                                                  setEditedData({
                                                    ...editedData!,
                                                    Number_of_rooms: Number(
                                                      e.target.value
                                                    ),
                                                  })
                                                }
                                                inputProps={{ min: 1 }}
                                                variant="outlined" // เพิ่มสไตล์ให้กับ TextField
                                              />
                                            ) : (
                                              hotelselect.Number_of_rooms
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {editingRow === index ? (
                                              <Select
                                                value={
                                                  editedData?.room_status_ID ||
                                                  ""
                                                }
                                                onChange={(e) =>
                                                  setEditedData({
                                                    ...editedData!,
                                                    room_status_ID: Number(
                                                      e.target.value
                                                    ),
                                                  })
                                                }
                                              >
                                                {/* เพิ่มรายการสำหรับสถานะห้อง */}
                                                <MenuItem value={1}>
                                                  ว่าง
                                                </MenuItem>
                                                <MenuItem value={2}>
                                                  ไม่ว่าง
                                                </MenuItem>
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
                                                  style={{
                                                    backgroundColor: "#4CAF50",
                                                  }}
                                                  onClick={handleSaveClick}
                                                >
                                                  บันทึก
                                                </Button>
                                              </div>
                                            ) : (
                                              <Button
                                                variant="contained"
                                                style={{
                                                  backgroundColor: "#343434",
                                                }}
                                                onClick={() =>
                                                  handleEditClick(index)
                                                }
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
                                </>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px", // เพิ่ม padding
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    color="textSecondary"
                                  >
                                    ยังไม่มีข้อมูลห้อง
                                    โปรดดำเนินการเพิ่มข้อมูลห้อง
                                  </Typography>
                                </div>
                              )}
                            </TableContainer>
                          </div>
                        </Box>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <p>ยังไม่มีข้อมูลโรงแรม โปรดดำเนินการเลือกข้อมูลโรงแรม</p>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p>ยังไม่มีข้อมูลโรงแรม โปรดดำเนินการเพิ่มข้อมูลโรงแรม</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default CheckDataHotelPage;
