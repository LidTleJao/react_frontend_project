import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import SearchIcon from "@mui/icons-material/Search";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { useEffect, useState } from "react";
import { PacketGetAllRes } from "../../model/Response/Packet/Packet/PacketGetAllRes";
// import { PacketGetPIDRes } from "../../model/Response/Packet/Packet/PacketGetByPIDRes";
import { PacketService } from "../../service/packetService";
import { useNavigate } from "react-router-dom";

function PackagePage() {
  const navigate = useNavigate();
  const packetService = new PacketService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [packetAll, setPacketAll] = useState<PacketGetAllRes[]>([]);
  const [filteredData, setFilteredData] = useState<PacketGetAllRes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTypeRoom, setSearchTypeRoom] = useState("");
  const [searchTypeView, setSearchTypeView] = useState("");
  const [searchTypeTicket, setSearchTypeTicket] = useState("");
  const [searchAboutTicket, setSearchAboutTicket] = useState(0);
  useEffect(() => {
    const loadDataAsync = async () => {
      const respacket = await packetService.getAll();
      const data: PacketGetAllRes[] = respacket.data;
      setPacketAll(data);
      setFilteredData(data);
    };
    loadDataAsync();
  }, []);
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // กรองข้อมูลจาก searchData ที่ตรงกับ province
      // console.log(searchQuery);

      const filtered = packetAll.filter((concert) =>
        concert.province.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      console.log("ผลการค้นหา:", filtered);
    } else {
      setFilteredData(packetAll);
    }
  };
  const handleSearchAdv = () => {
    const filtered = packetAll.filter((concert) => {
      return (
        (searchTypeRoom === "none" ||
          searchTypeRoom === "" ||
          concert.type_room.toLowerCase() === searchTypeRoom.toLowerCase()) &&
        (searchTypeView === "none" ||
          searchTypeView === "" ||
          concert.type_view_name_room.toLowerCase() ===
            searchTypeView.toLowerCase()) &&
        (searchTypeTicket === "none" ||
          searchTypeTicket === "" ||
          concert.name_type_ticket.toLowerCase() ===
            searchTypeTicket.toLowerCase()) &&
        (searchAboutTicket === 0 ||
          concert.number_of_tickets === searchAboutTicket)
      );
    });
    setFilteredData(filtered);
  };
  // useEffect(() => {
  //   const loadDataAsync = async () => {
  //     setPacket_ID(4);
  //     const respacket = await packetService.getPacketByPID(
  //       packet_ID.toString()
  //     );
  //     const data: PacketGetAllRes[] = respacket.data;
  //     setPacket(data);
  //   };
  //   loadDataAsync();
  // }, [packet_ID]);

  // console.log(packet);

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
      <div className="concert-cont">
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
                width: 350,
                height: 450,
                marginTop: "50px",
                borderRadius: 10,
                bgcolor: "#D9D9D9",
                border: 2,
                padding: "20px", // เพิ่ม padding เพื่อความสวยงาม
              }}
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "'Mitr', sans-serif", // ใช้ฟอนต์ Mitr
                  fontStyle: "normal",
                  fontSize: "24px", // ปรับขนาดฟอนต์ตามต้องการ
                  lineHeight: "1.5", // เพิ่มความสูงบรรทัด
                  marginBottom: "30px", // เพิ่ม margin ด้านล่าง
                }}
                variant="h5"
              >
                ค้นหาข้อมูลแพ็คเกจ
              </Typography>

              {/* ชนิดห้อง */}
              <FormControl sx={{ marginBottom: "25px" }}>
                {" "}
                {/* เพิ่ม marginBottom */}
                <InputLabel id="room-type-label" sx={{ top: "-8px" }}>
                  ชนิดห้อง
                </InputLabel>
                <Select
                  labelId="room-type-label"
                  id="room-type-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    switch (value) {
                      case 1:
                        setSearchTypeRoom("Standard Room");
                        break;
                      case 2:
                        setSearchTypeRoom("Deluxe Room");
                        break;
                      case 3:
                        setSearchTypeRoom("Executive Room");
                        break;
                      case 4:
                        setSearchTypeRoom("Connecting Rooms");
                        break;
                      case 5:
                        setSearchTypeRoom("Suite");
                        break;
                      case 6:
                        setSearchTypeRoom("Superior Room");
                        break;
                      case 7:
                        setSearchTypeRoom("Accessible Room");
                        break;
                      default:
                        setSearchTypeRoom("none");
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
                  <MenuItem value={6}>ห้องสุพีเรียร์ (Superior Room)</MenuItem>
                  <MenuItem value={7}>
                    ห้องพักพิเศษสำหรับผู้พิการ (Accessible Room)
                  </MenuItem>
                </Select>
              </FormControl>

              {/* ชนิดวิวของห้อง */}
              <FormControl sx={{ marginBottom: "25px" }}>
                {" "}
                {/* เพิ่ม marginBottom */}
                <InputLabel id="view-type-label" sx={{ top: "-8px" }}>
                  ชนิดวิวห้อง
                </InputLabel>
                <Select
                  labelId="view-type-label"
                  id="view-type-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    switch (value) {
                      case 1:
                        setSearchTypeView("ทะเล");
                        break;
                      case 2:
                        setSearchTypeView("ภูเขา");
                        break;
                      case 3:
                        setSearchTypeView("เมือง");
                        break;
                      default:
                        setSearchTypeView("none");
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

              {/* ชนิดของตั๋ว */}
              <FormControl sx={{ marginBottom: "25px" }}>
                {" "}
                {/* เพิ่ม marginBottom */}
                <InputLabel id="ticket-type-label" sx={{ top: "-8px" }}>
                  ชนิดตั๋ว
                </InputLabel>
                <Select
                  labelId="ticket-type-label"
                  id="ticket-type-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    switch (value) {
                      case 1:
                        setSearchTypeTicket("General Admission / GA");
                        break;
                      case 2:
                        setSearchTypeTicket("VIP Ticket");
                        break;
                      case 3:
                        setSearchTypeTicket("Front Row / Pit Ticket");
                        break;
                      case 4:
                        setSearchTypeTicket("Premium Zone Ticket");
                        break;
                      case 5:
                        setSearchTypeTicket("Reserved Seating");
                        break;
                      case 6:
                        setSearchTypeTicket("Early Entry Ticket");
                        break;
                      case 7:
                        setSearchTypeTicket("Virtual Concert Ticket");
                        break;
                      default:
                        setSearchTypeTicket("none");
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

              {/* จำนวนตั๋ว */}
              <TextField
                placeholder="จำนวนตั๋ว"
                type="number"
                sx={{ marginBottom: "25px", width: "100%" }} // เพิ่ม marginBottom
                onChange={(e) => setSearchAboutTicket(Number(e.target.value))}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "40px",
                  },
                }}
                inputProps={{ min: 0 }} // ป้องกันการกรอกค่าติดลบ
              />

              {/* ปุ่มค้นหา */}
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
                  onClick={handleSearchAdv} // ฟังก์ชันสำหรับการค้นหา
                >
                  ค้นหา
                </Button>
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
                    borderRadius: 6,
                    bgcolor: "#D9D9D9",
                    border: 2,
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
                      sx={{ m: 1, width: "35pc" }}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                        },
                        startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                      }}
                    />
                    <IconButton
                      sx={{
                        width: "50px",
                        color: "black",
                      }}
                      onClick={handleSearch}
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
                  filteredData.map((concert) => (
                    <Card
                      key={concert.PID}
                      className="bg-[#4E6A97]  border-gray-400 shadow-lg transition-transform duration-200 hover:scale-105 max-w-80  " // ปรับขนาดการ์ดให้เล็กลง
                    >
                      <CardMedia
                        component="img"
                        alt={concert.name_concert}
                        height="100"
                        className="object-cover rounded-t-lg"
                        image={concert.poster_concert}
                      />
                      <CardContent className="flex flex-col p-4 bg-white rounded-b-lg">
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="text-black font-semibold mb-2"
                        >
                          {concert.name}
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                          วันที่การแสดง:{" "}
                          {concert.show_schedule_concert.toString()}
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                          ที่อยู่โรมแรม: {concert.province}
                        </Typography>
                      </CardContent>
                      <CardActions className="flex justify-between p-4">
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
                            navigate(`/PackageDetail/${concert.PID}`)
                          }
                        >
                          รายละเอียด
                        </Button>
                      </CardActions>
                    </Card>
                  ))
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

export default PackagePage;
