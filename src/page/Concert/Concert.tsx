import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { ConcertService } from "../../service/concertService";
import { useEffect, useState } from "react";
import { GetAllConcertRes } from "../../model/Response/Concert/GetAllConcertRes";
import { useNavigate } from "react-router-dom";

function ConcertPage() {
  const navigate = useNavigate();
  const concertService = new ConcertService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [concertAll, setConcertAll] = useState<GetAllConcertRes[]>([]);
  const [filteredData, setFilteredData] = useState<GetAllConcertRes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [concertID, setConcertID] = useState("");

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getAll();
      const data: GetAllConcertRes[] = resconcert.data;
      setConcertAll(data);
      setFilteredData(data);
    };
    loadDataAsync();
  }, []);
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // กรองข้อมูลจาก searchData ที่ตรงกับ province
      // console.log(searchQuery);

      const filtered = concertAll.filter((concert) =>
        concert.province.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      console.log("ผลการค้นหา:", filtered);
    } else {
      setFilteredData(concertAll);
    }
  };
  const handleSearchAdv = () => {
    const searchDateObj = searchDate ? new Date(searchDate) : null;
    const filtered = concertAll.filter((concert) => {
      const concertDate = new Date(concert.show_schedule_concert);
      return (
        (searchName === "" ||
          concert.name_concert
            .toLowerCase()
            .includes(searchName.toLowerCase())) &&
        (searchType === "none" ||
          searchType === "" ||
          concert.name_type_concert.toLowerCase() ===
            searchType.toLowerCase()) &&
        (searchDateObj === null ||
          concertDate.toDateString() === searchDateObj.toDateString())
      );
    });

    setFilteredData(filtered);
  };
  console.log(filteredData);

  function navigateToConcertDetailPage(cid: string) {
    setConcertID(cid);
    console.log(concertID);
    navigate(`/ConcertDetail/${cid}`);
  }

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
                display: "flex",
                marginTop: "50px",
                width: 350,
                // height: 400,
                maxHeight: 400,
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
                  ค้นหาข้อมูลคอนเสิร์ต
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
                  ชื่อคอนเสิร์ต :
                </Typography>
                <TextField
                  placeholder="ชื่อคอนเสิร์ต"
                  type="name"
                  sx={{ width: "19.5pc" }}
                  onChange={(e) => setSearchName(e.target.value)}
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
                  ชนิดของคอนเสิร์ต :
                </Typography>
                <FormControl sx={{ width: 315 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    ชนิดคอนเสิร์ต
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "1") {
                        setSearchType("Solo Concert");
                      } else if (value === "2") {
                        setSearchType("Music Festival");
                      } else if (value === "3") {
                        setSearchType("Charity Concert");
                      } else {
                        setSearchType("none"); // สำหรับ None
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
                    <MenuItem value="1">
                      คอนเสิร์ตเดี่ยว (Solo Concert)
                    </MenuItem>
                    <MenuItem value="2">
                      คอนเสิร์ตรวมศิลปิน (Music Festival/All-Star Concert)
                    </MenuItem>
                    <MenuItem value="3">
                      คอนเสิร์ตการกุศล (Charity Concert)
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
                  วันที่แสดง :
                </Typography>
                <TextField
                  placeholder="วันที่ทำการแสดง"
                  type="Date"
                  sx={{ width: "20pc" }}
                  // value={show_schedule_concert}
                  onChange={(e) => setSearchDate(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                      bgcolor: "white",
                      height: "35px",
                    },
                    startAdornment: <></>,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: "20px",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 20,
                      bgcolor: "#4E6A97", // เปลี่ยนสีปุ่มได้ตามต้องการ
                      color: "white",
                      height: "40px",
                      width: "150px",
                    }}
                    onClick={handleSearchAdv} // ฟังก์ชันสำหรับการค้นหา
                  >
                    ค้นหา
                  </Button>
                </div>
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
                  filteredData.map((concert) => (
                    <Card
                      key={concert.CID}
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
                              {concert.name_concert}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="black"
                              sx={{
                                display: "flex",
                                overflow: "auto",
                                maxWidth:300,
                                maxHeight: 50,
                              }}
                            >
                              รายละเอียด: {concert.detail_concert}
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
                          ที่อยู่คอนเสิร์ต: {concert.province}
                        </Typography>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#343434" }}
                          sx={{
                            width: "110px",
                            borderRadius: "10px",
                          }}
                          onClick={() =>
                            navigateToConcertDetailPage(concert.CID.toString())
                          }
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
export default ConcertPage;
