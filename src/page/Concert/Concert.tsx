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
                maxHeight: 400,
                borderRadius: 10,
                bgcolor: "#D9D9D9",
                border: 2,
                padding: "20px",
              }}
              justifyContent={"start"}
              flexDirection={"column"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Mitr, sans-serif",
                  }}
                  variant="h5"
                >
                  ค้นหาข้อมูลคอนเสิร์ต
                </Typography>
              </div>

              <TextField
                placeholder="ชื่อคอนเสิร์ต"
                type="name"
                sx={{ width: "100%", marginBottom: "25px" }} // เพิ่ม marginBottom
                onChange={(e) => setSearchName(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                }}
              />

              <FormControl sx={{ width: "100%", marginBottom: "25px" }}>
                {" "}
                {/* เพิ่ม marginBottom */}
                <InputLabel id="concert-type-label" sx={{ top: "-8px" }}>
                  ชนิดคอนเสิร์ต
                </InputLabel>
                <Select
                  labelId="concert-type-label"
                  id="concert-type-select"
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
                  <MenuItem value="1">คอนเสิร์ตเดี่ยว (Solo Concert)</MenuItem>
                  <MenuItem value="2">
                    คอนเสิร์ตรวมศิลปิน (Music Festival/All-Star Concert)
                  </MenuItem>
                  <MenuItem value="3">
                    คอนเสิร์ตการกุศล (Charity Concert)
                  </MenuItem>
                </Select>
              </FormControl>

              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                วันที่การแสดง
              </Typography>
              <TextField
                type="date"
                sx={{ width: "100%", marginBottom: "25px" }} // เพิ่ม marginBottom
                onChange={(e) => setSearchDate(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                }}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 20,
                    bgcolor: "#4E6A97",
                    color: "white",
                    height: "40px",
                    width: "150px",
                  }}
                  onClick={handleSearchAdv}
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
                  filteredData.map((concert) => (
                    <Card
                      key={concert.CID}
                      className="bg-[#4E6A97] border-gray-400 shadow-lg transition-transform duration-200 hover:scale-105 max-w-80 flex flex-col"
                    >
                      <CardMedia
                        component="img"
                        alt={concert.name_concert}
                        height="140"
                        className="object-cover rounded-t-lg"
                        image={concert.poster_concert}
                      />
                      <CardContent className="flex flex-col p-4 bg-white rounded-b-lg flex-1">
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="text-black font-semibold mb-2"
                        >
                          {concert.name_concert}
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                          รายละเอียด:{" "}
                            {concert.detail_concert.length > 100
                              ? `${concert.detail_concert.slice(0, 100)}...`
                              : concert.detail_concert}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="text-gray-700 mb-2"
                        >
                          วันที่การแสดง:{" "}
                          {concert.show_schedule_concert.toString()}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="text-gray-700 mb-2"
                          sx={{ marginTop: "10px" }}
                        >
                          ที่อยู่คอนเสิร์ต: {concert.province}
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
export default ConcertPage;
