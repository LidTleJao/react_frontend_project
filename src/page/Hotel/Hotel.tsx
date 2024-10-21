import {
  Typography,
  TextField,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import SearchIcon from "@mui/icons-material/Search";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { HotelService } from "../../service/hotelService";
import { useEffect, useState } from "react";
import { RoomHotelService } from "../../service/roomHotelService";
import { RoomGetAllRes } from "../../model/Response/Hotel/RoomGetAllRes";
import { HotelGetAllRes } from "../../model/Response/Hotel/HotelGetAllRes";
import { HotelImageGetByHotelIDRes } from "../../model/Response/Hotel/HotelImageGetByHotelIDRes";
import { useNavigate } from "react-router-dom";

function HotelPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const hotelService = new HotelService();
  const roomService = new RoomHotelService();
  const [hotelAll, setHotelAll] = useState<HotelGetAllRes[]>([]);
  const [hotelImageByHID, sethotelImageByHID] = useState<
    HotelImageGetByHotelIDRes[]
  >([]);
  const [roomAll, setRoomAll] = useState<RoomGetAllRes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<HotelGetAllRes[]>([]);

  const [searchTypeHotel, setSearchTypeHotel] = useState("");
  const [searchTypeRoom, setSearchTypeRoom] = useState("");
  const [searchTypePrice, setSearchTypePrice] = useState("");
  const [searchTypeView, setSearchTypeView] = useState("");
  const [searchTypePeple, setSearchTypePeple] = useState(0);
  const [searchTypeStatusRoom, setSearchTypeStatusRoom] = useState("");

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        const [resHotel, resRoom] = await Promise.all([
          hotelService.getAll(),
          roomService.getAll(),
        ]);

        const hotels: HotelGetAllRes[] = resHotel.data;
        const rooms: RoomGetAllRes[] = resRoom.data;

        setHotelAll(hotels);
        setRoomAll(rooms);

        const hotelIDs = hotels.map((hotel) => hotel.HID);

        setFilteredData(hotels);
        await loadImage(hotelIDs);
      } catch (error) {
        console.error("Error loading hotels or rooms:", error);
      }
    };

    loadDataAsync();
  }, []);

  const loadImage = async (numbers: number[]) => {
    try {
      const imagePromises = numbers.map(async (number) => {
        const reshotel = await hotelService.getHotelImageByHid(
          number.toString()
        );
        const data: HotelImageGetByHotelIDRes[] = reshotel.data;
        return data.length > 0 ? data[0] : null; // คืนค่าภาพแรกหรือ null
      });

      // รอให้ทุกคำขอเสร็จสิ้น
      const allImages = await Promise.all(imagePromises);

      // กรองเฉพาะภาพที่ไม่เป็น null
      sethotelImageByHID(allImages.filter((image) => image !== null));
    } catch (error) {
      console.error("Error loading hotel images:", error);
    }
  };

  // console.log(hotelAll);
  // console.log(roomAll);
  // console.log(hotelImageByHID);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // กรองข้อมูลจาก searchData ที่ตรงกับ province
      console.log(searchQuery);

      const filtered = hotelAll.filter((concert) =>
        concert.province.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      console.log("ผลการค้นหา:", filtered);
    } else {
      setFilteredData(hotelAll);
    }
  };
  const handleSearchAdv = () => {
    // กรองข้อมูลโรงแรม
    const filtered = hotelAll.filter((hotel) => {
      return (
        searchTypeHotel === "" ||
        searchTypeHotel === "none" ||
        hotel.typename_hotel
          .toLowerCase()
          .includes(searchTypeHotel.toLowerCase())
      );
    });

    // กรองข้อมูลห้อง
    const filtered_room = roomAll.filter((room) => {
      return (
        (searchTypeRoom === "" ||
          searchTypeRoom === "none" ||
          room.type_room
            .toLowerCase()
            .includes(searchTypeRoom.toLowerCase())) &&
        (searchTypePrice === "" ||
          searchTypePrice === "none" ||
          isPriceInRange(Number(room.price), searchTypePrice)) &&
        (searchTypeView === "" ||
          searchTypeView === "none" ||
          room.type_view_name_room
            .toLowerCase()
            .includes(searchTypeView.toLowerCase())) &&
        (searchTypePeple === 0 || room.Number_of_guests == searchTypePeple) &&
        (searchTypeStatusRoom === "" ||
          searchTypeStatusRoom === "none" ||
          room.status_name_room
            .toLowerCase()
            .includes(searchTypeStatusRoom.toLowerCase()))
      );
    });
    const uniqueHotelIDs = Array.from(
      new Set(filtered_room.map((room) => room.hotel_ID))
    );
    const hotelImages = filtered.filter((hotel) =>
      uniqueHotelIDs.includes(hotel.HID)
    );
    console.log("sssssssssssssssssssssssssssssssssss");
    console.log(filtered_room);
    console.log("sssssssssssssssssssssssssssssssssss");

    // ตั้งค่าให้ state
    setFilteredData(hotelImages);
  };
  const isPriceInRange = (price: number, range: string) => {
    if (range === "500-1500") {
      return price >= 500 && price <= 1500;
    } else if (range === "1500-3000") {
      return price > 1500 && price <= 3000;
    } else if (range === "3000-10000") {
      return price > 3000 && price <= 10000;
    }
    return false; // ไม่อยู่ในช่วงที่กำหนด
  };
  console.log(hotelAll);
  console.log(filteredData);

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
      <div className="hotel-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              marginTop: 100,
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginTop: "50px",
                width: 350,
                // height: 400,
                maxHeight: 700,
                borderRadius: 3,
                bgcolor: "#D9D9D9",
                marginBottom: 10,
                border: 2,
              }}
              // display={"flex"}
              // justifyContent={"start"}
              flexDirection={"column"}
            >
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
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
                  ค้นหาข้อมูลโรงแรม
                </Typography>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "20px" }}>
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
                  ชนิดของโรมแรม :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ชนิดโรมแรม
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // placeholder="จังหวัด"
                    // value={city}
                    label="ชนิดโรงแรม"
                    type="city"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 1) {
                        setSearchTypeHotel("โรงแรม");
                      } else if (value === 2) {
                        setSearchTypeHotel("รีสอร์ท");
                      } else if (value === 3) {
                        setSearchTypeHotel("บังกะโล");
                      } else {
                        setSearchTypeHotel("none"); // สำหรับ None
                      }
                    }}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>โรงแรม</MenuItem>
                    <MenuItem value={2}>รีสอร์ท</MenuItem>
                    <MenuItem value={3}>บังกะโล</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
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
                  ชนิดห้อง :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ชนิดห้อง
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // placeholder="จังหวัด"
                    // value={city}
                    // label="จังหวัด"
                    // type="city"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 1) {
                        setSearchTypeRoom("Standard Room");
                      } else if (value === 2) {
                        setSearchTypeRoom("Deluxe Room");
                      } else if (value === 3) {
                        setSearchTypeRoom("Executive Room");
                      } else if (value === 4) {
                        setSearchTypeRoom("Connecting Rooms");
                      } else if (value === 5) {
                        setSearchTypeRoom("Suite");
                      } else if (value === 6) {
                        setSearchTypeRoom("Superior Room");
                      } else if (value === 7) {
                        setSearchTypeRoom("Accessible Room");
                      } else {
                        setSearchTypeRoom("none"); // สำหรับ None
                      }
                    }}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
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
              </div>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
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
                  ราคาห้องต่อคืน :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ราคา
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 1) {
                        setSearchTypePrice("500-1500");
                      } else if (value === 2) {
                        setSearchTypePrice("1500-3000");
                      } else if (value === 3) {
                        setSearchTypePrice("3000-10000");
                      } else {
                        setSearchTypePrice("none"); // สำหรับ None
                      }
                    }}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>500-1500</MenuItem>
                    <MenuItem value={2}>1500-3000</MenuItem>
                    <MenuItem value={3}>3000-10000</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
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
                  ชนิดวิวของห้อง :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ชนิดวิวห้อง
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // placeholder="จังหวัด"
                    // value={city}
                    // label="จังหวัด"
                    // type="city"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 1) {
                        setSearchTypeView("ทะเล");
                      } else if (value === 2) {
                        setSearchTypeView("ภูเขา");
                      } else if (value === 3) {
                        setSearchTypeView("เมือง");
                      } else {
                        setSearchTypeView("none"); // สำหรับ None
                      }
                    }}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>ทะเล</MenuItem>
                    <MenuItem value={2}>ภูเขา</MenuItem>
                    <MenuItem value={3}>เมือง</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
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
                  จำนวนคนเข้าพัก :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    จำนวน 1-5
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // placeholder="จังหวัด"
                    // value={city}
                    label="จังหวัด"
                    type="city"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 1) {
                        setSearchTypePeple(1);
                      } else if (value === 2) {
                        setSearchTypePeple(2);
                      } else if (value === 3) {
                        setSearchTypePeple(3);
                      } else if (value === 4) {
                        setSearchTypePeple(4);
                      } else if (value === 5) {
                        setSearchTypePeple(5);
                      } else {
                        setSearchTypePeple(0); // สำหรับ None
                      }
                    }}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
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
                  สถานะห้อง :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ห้องที่ว่าง
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 1) {
                        setSearchTypeStatusRoom("ว่าง");
                      } else {
                        setSearchTypeStatusRoom("none"); // สำหรับ None
                      }
                    }}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>ว่าง</MenuItem>
                    {/* <MenuItem value={2}>ไม่ว่าง</MenuItem> */}
                  </Select>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 20,
                        bgcolor: "#4E6A97", // เปลี่ยนสีปุ่มได้ตามต้องการ
                        color: "white",
                        height: "40px",
                        width: "150px",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                      onClick={handleSearchAdv} // ฟังก์ชันสำหรับการค้นหา
                    >
                      ค้นหา
                    </Button>
                  </div>
                </FormControl>
              </div>
            </Box>
            <div>
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"15px"}
                marginLeft={"250px"}
              >
                Welcome to Teemi
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "150px",
                }}
              >
                <Box
                  sx={{
                    width: 650,
                    height: 60,
                    borderRadius: 3,
                    bgcolor: "#D9D9D9",
                    border: 2,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <TextField
                      placeholder="ค้นหาพื้นที่ใกล้เคียง"
                      type="search"
                      value={searchQuery} // ค่าที่พิมพ์จะแสดงใน TextField
                      onChange={(e) => setSearchQuery(e.target.value)} // เก็บค่าที่พิมพ์ลงใน state
                      sx={{ m: 1, width: "35pc" }}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                        },
                      }}
                    />
                    <IconButton
                      sx={{ width: "50px", color: "black" }}
                      onClick={handleSearch} // เรียกฟังก์ชั่นเมื่อกดปุ่มค้นหา
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                  marginTop: "16px",
                  marginLeft: "150px",
                  marginBottom: "20px",
                }}
              >
                {filteredData.length > 0 ? (
                  filteredData.map((concert) => {
                    // ค้นหาภาพจาก hotelImageByHID ที่ตรงกับ HID ของคอนเสิร์ต
                    const hotelImage = hotelImageByHID.find(
                      (image) => image.hotel_ID === concert.HID
                    );

                    return (
                      <Card
                        key={concert.HID}
                        sx={{ maxWidth: 345, background: "#4E6A97", border: 2 }}
                      >
                        <CardMedia
                          component="img"
                          alt={concert.name}
                          height="140"
                          sx={{ maxHeight: 140 }}
                          // ใช้ภาพจาก hotelImage
                          image={
                            hotelImage
                              ? hotelImage.url_image
                              : "/path/to/default/image.jpg"
                          } // ใช้ imageUrl ของ hotelImage หรือภาพเริ่มต้น
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              overflow: "auto",
                              maxHeight: 200,
                              bgcolor: "white",
                              borderRadius: 2,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "10px",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                color="black"
                                sx={{
                                  display: "flex",
                                  overflow: "auto",
                                  maxWidth:300,
                                  maxHeight:100,
                                }}
                              >
                                {concert.name}
                              </Typography>
                              <Typography
                                variant="body1"
                                color="black"
                                sx={{
                                  display: "flex",
                                  overflow: "auto",
                                  maxWidth: 300,
                                  maxHeight: 50,
                                }}
                              >
                                รายละเอียด: {concert.detail}
                              </Typography>
                            </div>
                          </Box>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="white"
                            sx={{ marginLeft: "10px" }}
                          >
                            ที่อยู่โรงแรม: {concert.province}
                          </Typography>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#343434" }}
                            sx={{
                              width: "110px",
                              borderRadius: "10px",
                            }}
                            onClick={() =>
                              navigate(`/HotelDetail/${concert.HID}`)
                            }
                          >
                            รายละเอียด
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })
                ) : (
                  <div className="pt-40 ml-40">
                    <p>ไม่มีข้อมูล</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HotelPage;
