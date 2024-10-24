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
          room.type_room === searchTypeRoom) &&
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
    // console.log("sssssssssssssssssssssssssssssssssss");
    // console.log(roomAll);
    // console.log("sssssssssssssssssssssssssssssssssss");
    // console.log(filtered_room);
    // console.log("sssssssssssssssssssssssssssssssssss");
    // console.log(hotelImages);
    // console.log("sssssssssssssssssssssssssssssssssss");
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
  // console.log(hotelAll);
  // console.log(filteredData);

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
                height: 560,
                borderRadius: 10,
                bgcolor: "#D9D9D9",
                marginBottom: 10,
                border: 2,
                flexDirection: "column",
              }}
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
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                    marginTop:"10px",
                    fontStyle: "normal",
                    fontSize: "24px", // ปรับขนาดฟอนต์ตามต้องการ
                    lineHeight: "1.5", // เพิ่มความสูงบรรทัด
                    marginBottom: "30px", // เพิ่ม margin ด้านล่าง
                  }}
                  variant="h5"
                >
                  ค้นหาข้อมูลโรงแรม
                </Typography>
              </div>

              <FormControl sx={{ width: 315, marginLeft: 2 }}>
                <InputLabel id="hotel-type-label" sx={{ top: "-8px" }}>
                  ชนิดของโรงแรม
                </InputLabel>
                <Select
                  labelId="hotel-type-label"
                  id="hotel-type"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 1) setSearchTypeHotel("โรงแรม");
                    else if (value === 2) setSearchTypeHotel("รีสอร์ท");
                    else if (value === 3) setSearchTypeHotel("บังกะโล");
                    else setSearchTypeHotel("none");
                  }}
                  sx={{ borderRadius: 20, bgcolor: "white", height: "40px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>โรงแรม</MenuItem>
                  <MenuItem value={2}>รีสอร์ท</MenuItem>
                  <MenuItem value={3}>บังกะโล</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: 315, marginLeft: 2, marginTop: 3 }}>
                <InputLabel id="room-type-label" sx={{ top: "-8px" }}>
                  ชนิดห้อง
                </InputLabel>
                <Select
                  labelId="room-type-label"
                  id="room-type"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 1) setSearchTypeRoom("Standard Room");
                    else if (value === 2) setSearchTypeRoom("Deluxe Room");
                    else if (value === 3) setSearchTypeRoom("Executive Room");
                    else if (value === 4) setSearchTypeRoom("Connecting Rooms");
                    else if (value === 5) setSearchTypeRoom("Suite");
                    else if (value === 6) setSearchTypeRoom("Superior Room");
                    else if (value === 7) setSearchTypeRoom("Accessible Room");
                    else setSearchTypeRoom("none");
                  }}
                  sx={{ borderRadius: 20, bgcolor: "white", height: "40px" }}
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
                  <MenuItem value={6}>ห้องสุพีเรียร์ (Superior Room)</MenuItem>
                  <MenuItem value={7}>
                    ห้องพักพิเศษสำหรับผู้พิการ (Accessible Room)
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: 315, marginLeft: 2, marginTop: 3 }}>
                <InputLabel id="price-label" sx={{ top: "-8px" }}>
                  ราคาห้องต่อคืน
                </InputLabel>
                <Select
                  labelId="price-label"
                  id="price"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 1) setSearchTypePrice("500-1500");
                    else if (value === 2) setSearchTypePrice("1500-3000");
                    else if (value === 3) setSearchTypePrice("3000-10000");
                    else setSearchTypePrice("none");
                  }}
                  sx={{ borderRadius: 20, bgcolor: "white", height: "40px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>500-1500</MenuItem>
                  <MenuItem value={2}>1500-3000</MenuItem>
                  <MenuItem value={3}>3000-10000</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: 315, marginLeft: 2, marginTop: 3 }}>
                <InputLabel id="view-label" sx={{ top: "-8px" }}>
                  ชนิดวิวของห้อง
                </InputLabel>
                <Select
                  labelId="view-label"
                  id="view"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 1) setSearchTypeView("ทะเล");
                    else if (value === 2) setSearchTypeView("ภูเขา");
                    else if (value === 3) setSearchTypeView("เมือง");
                    else setSearchTypeView("none");
                  }}
                  sx={{ borderRadius: 20, bgcolor: "white", height: "40px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>ทะเล</MenuItem>
                  <MenuItem value={2}>ภูเขา</MenuItem>
                  <MenuItem value={3}>เมือง</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: 315, marginLeft: 2, marginTop: 3 }}>
                <InputLabel id="people-label" sx={{ top: "-8px" }}>
                  จำนวนคนเข้าพัก
                </InputLabel>
                <Select
                  labelId="people-label"
                  id="people"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 1) setSearchTypePeple(1);
                    else if (value === 2) setSearchTypePeple(2);
                    else if (value === 3) setSearchTypePeple(3);
                    else if (value === 4) setSearchTypePeple(4);
                    else if (value === 5) setSearchTypePeple(5);
                    else setSearchTypePeple(0);
                  }}
                  sx={{ borderRadius: 20, bgcolor: "white", height: "40px" }}
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

              <FormControl sx={{ width: 315, marginLeft: 2, marginTop: 3 }}>
                <InputLabel id="room-status-label" sx={{ top: "-8px" }}>
                  สถานะห้อง
                </InputLabel>
                <Select
                  labelId="room-status-label"
                  id="room-status"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 1) setSearchTypeStatusRoom("ว่าง");
                    else setSearchTypeStatusRoom("none");
                  }}
                  sx={{ borderRadius: 20, bgcolor: "white", height: "40px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>ว่าง</MenuItem>
                </Select>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 20,
                      bgcolor: "#4E6A97",
                      color: "white",
                      height: "40px",
                      width: "150px",
                      marginTop: "20px",
                    }}
                    onClick={handleSearchAdv}
                  >
                    ค้นหา
                  </Button>
                </div>
              </FormControl>
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
                    borderRadius: 6,
                    bgcolor: "#D9D9D9",
                    border: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      marginTop: "3px",
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
                className="grid grid-cols-2 gap-5 mt-4 mx-auto mb-5 max-w-6xl px-5"
                style={{ marginTop: "25px", marginLeft: "145px" }}
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
                        className="bg-[#4E6A97] border-gray-400 shadow-lg transition-transform duration-200 hover:scale-105 max-w-80 flex flex-col"
                      >
                        <CardMedia
                          component="img"
                          alt={concert.name}
                          height="120"
                          className="object-cover rounded-t-lg"
                          image={
                            hotelImage
                              ? hotelImage.url_image
                              : "/path/to/default/image.jpg"
                          }
                        />
                        <CardContent className="flex flex-col p-4 bg-white rounded-b-lg flex-1">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="text-black font-semibold mb-2"
                          >
                            {concert.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            className="text-gray-700 "
                          >
                            รายละเอียด:{" "}
                            {concert.detail.length > 100
                              ? `${concert.detail.slice(0, 100)}...`
                              : concert.detail}
                          </Typography>
                          <Typography
                            variant="body1"
                            className="text-gray-700 mb-2"
                          >
                            ที่อยู่โรงแรม: {concert.province}
                          </Typography>
                        </CardContent>
                        <CardActions className="flex justify-between p-2">
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: 8,
                              bgcolor: "#4E6A97",
                              color: "white",
                              height: "40px",
                              marginBottom: "10px",
                            }}
                            className="rounded-lg hover:bg-gray-800 transition-colors"
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
                  <div className="pt-40 text-center">
                    <p className="text-gray-600">ไม่มีข้อมูล</p>
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
