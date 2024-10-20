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

function PackagePage() {
  const packetService = new PacketService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [packetAll, setPacketAll] = useState<PacketGetAllRes[]>([]);
  const [filteredData, setFilteredData] = useState<PacketGetAllRes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTypeRoom, setSearchTypeRoom] = useState("");
  const [searchTypeView, setSearchTypeView] = useState("");
  const [searchTypeTicket, setSearchTypeTicket] = useState("");
  const [searchAboutTicket, setSearchAboutTicket] = useState("");
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
        (searchAboutTicket === "none" ||
          searchAboutTicket === "" ||
          concert.number_of_tickets === parseInt(searchAboutTicket, 10))
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

  console.log(packetAll);
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
                height: 570,
                marginTop: "50px",
                borderRadius: 3,
                bgcolor: "#D9D9D9",
                border: 2,
              }}
              display={"flex"}
              justifyContent={"start"}
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
                  ค้นหาข้อมูลแพ็คเกจ
                </Typography>
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
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   if (value === 1) {
                    //     setSearchTypeRoom("Standard Room");
                    //   } else if (value === 2) {
                    //     setSearchTypeRoom("Deluxe Room");
                    //   } else if (value === 3) {
                    //     setSearchTypeRoom("Executive Room");
                    //   } else if (value === 4) {
                    //     setSearchTypeRoom("Connecting Rooms");
                    //   } else if (value === 5) {
                    //     setSearchTypeRoom("Suite");
                    //   } else if (value === 6) {
                    //     setSearchTypeRoom("Superior Room");
                    //   } else if (value === 7) {
                    //     setSearchTypeRoom("Accessible Room");
                    //   } else {
                    //     setSearchTypeRoom("none"); // สำหรับ None
                    //   }
                    // }}
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
                  ชนิดของตั๋ว :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ชนิดตั๋ว
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
                        setSearchTypeTicket("General Admission / GA");
                      } else if (value === 2) {
                        setSearchTypeTicket("VIP Ticket");
                      } else if (value === 3) {
                        setSearchTypeTicket("Front Row / Pit Ticket");
                      } else if (value === 4) {
                        setSearchTypeTicket("Premium Zone Ticket");
                      } else if (value === 5) {
                        setSearchTypeTicket("Reserved Seating");
                      } else if (value === 6) {
                        setSearchTypeTicket("Early Entry Ticket");
                      } else if (value === 7) {
                        setSearchTypeTicket("Virtual Concert Ticket");
                      } else {
                        setSearchTypeTicket("none"); // สำหรับ None
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
                  จำนวนตั๋ว :
                </Typography>
                <TextField
                  placeholder="จำนวนตั๋ว"
                  type="number"
                  sx={{ width: "19.5pc" }}
                  onChange={(e) => setSearchAboutTicket(e.target.value)}
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
                  filteredData.map((concert) => (
                    <Card
                      key={concert.PID}
                      sx={{ maxWidth: 345, background: "#4E6A97", border: 2 }}
                    >
                      <CardMedia
                        component="img"
                        alt={concert.name_concert}
                        height="140"
                        sx={{ maxHeight: 140 }}
                        image={concert.poster_concert}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
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
                            >
                              {concert.name_concert}
                            </Typography>
                            <Typography variant="body1" color="black">
                              {/* รายละเอียด: {concert.detail_concert} */}
                            </Typography>
                            <Typography variant="body1" color="black">
                              วันที่การแสดง:{" "}
                              {concert.show_schedule_concert.toString()}
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
                          {/* ที่อยู่คอนเสิร์ต: {concert.address_concert} {concert.CID} */}
                        </Typography>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#343434" }}
                          sx={{
                            width: "110px",
                            borderRadius: "10px",
                          }}
                          // onClick={() => navigateToConcertDetailPage(concert.CID.toString())}
                        >
                          รายละเอียด
                        </Button>
                      </CardActions>
                    </Card>
                  ))
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

export default PackagePage;
