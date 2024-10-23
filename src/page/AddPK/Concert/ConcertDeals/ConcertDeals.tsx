import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
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
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelDealsService } from "../../../../service/hotelDealService";
import { ConcertDealsService } from "../../../../service/concertDealService";
import { ConcertDealsGetByUserRes } from "../../../../model/Response/Packet/Concert/ConcertDealsGetByUserRes";
import { ConcertDealsGetByCDIDRes } from "../../../../model/Response/Packet/Concert/ConcertDealsGetByCDIDRes";
import { HotelDealsGetAllRes } from "../../../../model/Response/Packet/Hotel/HotelDealsGetAllRes";
import { DealsService } from "../../../../service/dealsService";
import { PacketService } from "../../../../service/packetService";
import dayjs from "dayjs";

function ConcertDealPage() {
  const navigate = useNavigate();
  const hoteldeals = new HotelDealsService();
  const concertDealService = new ConcertDealsService();
  const dealsService = new DealsService();
  const packetService = new PacketService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [ConcertDealByUser, setConcertDealByUser] = useState<
    ConcertDealsGetByUserRes[]
  >([]);
  const [ConcertDealByCDID, setConcertDealByCDID] = useState<
    ConcertDealsGetByCDIDRes[]
  >([]);
  const [hotelDealAll, setHotelDealAll] = useState<HotelDealsGetAllRes[]>([]);
  const [concertdeal_ID, setConcertdeal_ID] = useState("");
  const [selectedValueRadio, setSelectedValueRadio] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [open, setOpen] = useState(false);

  // เพิ่มสถานะสำหรับฟิลด์ค้นหา
  const [filteredHotelDeals, setFilteredHotelDeals] = useState<
    HotelDealsGetAllRes[]
  >([]);
  const [searchName, setSearchName] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
  const [searchRoomType, setSearchRoomType] = useState<number | string>("");
  const [searchViewType, setSearchViewType] = useState<number | string>("");
  const [searchRoomCount, setSearchRoomCount] = useState<number | string>("");
  const [searchPrice, setSearchPrice] = useState<number | string>("");

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertDealService.getConcertDealByUser(
        user?.uid
      );
      const data: ConcertDealsGetByUserRes[] = resconcert.data;
      setConcertDealByUser(data);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcertdeal = await concertDealService.getConcertDealByCDID(
        concertdeal_ID
      );
      const data: ConcertDealsGetByCDIDRes[] = resconcertdeal.data;
      setConcertDealByCDID(data);
    };
    loadDataAsync();
  }, [concertdeal_ID]);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshoteldeal = await hoteldeals.getAllHotelDeals();
      const data: HotelDealsGetAllRes[] = reshoteldeal.data;
      setHotelDealAll(data);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshoteldeal = await hoteldeals.getAllHotelDeals();
      const data: HotelDealsGetAllRes[] = reshoteldeal.data;
      console.log("Hotel Deals Data:", data);
      setHotelDealAll(data);
      setFilteredHotelDeals(data);
    };
    loadDataAsync();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(concertdeal_ID);
    console.log(selectedValueRadio);
  };

  const handleCloseByCancel = () => {
    setOpen(false);
  };

  const handleCloseByContinue = async () => {
    try {
      const resdeal = await dealsService.AddDeal(
        selectedValueRadio,
        concertdeal_ID
      );
      console.log(resdeal.status);
      const last_idx: string = resdeal.data.last_idx;
      if (resdeal.status == 201) {
        const respacket = await packetService.AddPacket(last_idx);
        if (respacket.status == 201) {
          window.alert("ข้อมูลของแพ็คเกจ ได้ลงทะเบียนแล้ว!!!");
          navigateToMenuConcertDealPage();
          setOpen(false);
        } else {
          window.alert("เกิดข้อผิดพลาด โปรดเลือกข้อมูลใหม่");
        }
      } else {
        window.alert("เกิดข้อผิดพลาด โปรดเลือกข้อมูลใหม่");
      }
    } catch (error) {
      setOpen(false);
      console.log(error);
    }
    setOpen(false);
  };

  const filterHotelDeals = () => {
    const isSearching =
      searchName !== "" ||
      searchProvince !== "" ||
      searchRoomType !== "" ||
      searchViewType !== "" ||
      searchRoomCount !== "" ||
      searchPrice !== "";

    if (!isSearching) {
      setFilteredHotelDeals(hotelDealAll);
      return;
    }

    const results = hotelDealAll.filter((deal) => {
      const isNameMatch = searchName === "" || deal.name.includes(searchName);
      const isProvinceMatch =
        searchProvince === "" || deal.province.includes(searchProvince);
      const isRoomTypeMatch =
        searchRoomType === "" || deal.room_type_ID === Number(searchRoomType);
      const isViewTypeMatch =
        searchViewType === "" ||
        deal.room_view_type_ID === Number(searchViewType);
      const isRoomCountMatch =
        searchRoomCount === "" ||
        deal.number_of_rooms === Number(searchRoomCount);
      const isPriceMatch =
        searchPrice === "" || deal.hotel_deal_price === Number(searchPrice);

      return (
        isNameMatch &&
        isProvinceMatch &&
        isRoomTypeMatch &&
        isViewTypeMatch &&
        isRoomCountMatch &&
        isPriceMatch
      );
    });

    console.log("Filtered Hotel Deals:", results);
    setFilteredHotelDeals(results);
  };

  function navigateToMenuConcertDealPage() {
    navigate("/MenuConcertDeal");
  }

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="concertdeal-cont">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "120px",
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
              variant="h4"
            >
              ข้อมูลข้อเสนอ
            </Typography>
          </div>
          {ConcertDealByUser.length > 0 ? (<>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: "80px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <FormControl sx={{ width: "25pc", mt: 2 }}>
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    เลือกข้อมูลคอนเสิร์ต
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={concertdeal_ID}
                    onChange={(e) => setConcertdeal_ID(e.target.value)}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    {ConcertDealByUser.map((concertdealselect, index) => (
                      <MenuItem value={concertdealselect.CDID}>
                        {index + 1} - {concertdealselect.name_concert}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Box
                  sx={{
                    width: 400,
                    maxWidth: 400,
                    height: 480,
                    maxHeight: 480,
                    borderRadius: 3,
                    border: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "20px",
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
                        การค้นหา
                      </Typography>
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <TextField
                        placeholder="ชื่อโรงแรม"
                        type="text"
                        sx={{ width: "20pc" }}
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "20px",
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "35px",
                          },
                          startAdornment: <></>,
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <FormControl sx={{ width: "20pc" }}>
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ marginTop: "-5px" }}
                        >
                          จังหวัด
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="จังหวัด"
                          value={searchProvince}
                          onChange={(e) => setSearchProvince(e.target.value)}
                          sx={{
                            borderRadius: 20,
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "40px",
                          }}
                        >
                          <MenuItem value={"กรุงเทพมหานคร"}>
                            กรุงเทพมหานคร
                          </MenuItem>
                          <MenuItem value={"กระบี่"}>กระบี่</MenuItem>
                          <MenuItem value={"กาญจนบุรี"}>กาญจนบุรี</MenuItem>
                          <MenuItem value={"กาฬสินธุ์"}>กาฬสินธุ์</MenuItem>
                          <MenuItem value={"กำแพงเพชร"}>กำแพงเพชร</MenuItem>
                          <MenuItem value={"ขอนแก่น"}>ขอนแก่น</MenuItem>
                          <MenuItem value={"จันทบุรี"}>จันทบุรี</MenuItem>
                          <MenuItem value={"ฉะเชิงเทรา"}>ฉะเชิงเทรา</MenuItem>
                          <MenuItem value={"ชลบุรี"}>ชลบุรี</MenuItem>
                          <MenuItem value={"ชัยนาท"}>ชัยนาท</MenuItem>
                          <MenuItem value={"ชัยภูมิ"}>ชัยภูมิ</MenuItem>
                          <MenuItem value={"ชุมพร"}>ชุมพร</MenuItem>
                          <MenuItem value={"เชียงราย"}>เชียงราย</MenuItem>
                          <MenuItem value={"เชียงใหม่"}>เชียงใหม่</MenuItem>
                          <MenuItem value={"ตรัง"}>ตรัง</MenuItem>
                          <MenuItem value={"ตราด"}>ตราด</MenuItem>
                          <MenuItem value={"ตาก"}>ตาก</MenuItem>
                          <MenuItem value={"นครนายก"}>นครนายก</MenuItem>
                          <MenuItem value={"นครปฐม"}>นครปฐม</MenuItem>
                          <MenuItem value={"นครพนม"}>นครพนม</MenuItem>
                          <MenuItem value={"นครราชสีมา"}>นครราชสีมา</MenuItem>
                          <MenuItem value={"นครศรีธรรมราช"}>
                            นครศรีธรรมราช
                          </MenuItem>
                          <MenuItem value={"นครสวรรค์"}>นครสวรรค์</MenuItem>
                          <MenuItem value={"นนทบุรี"}>นนทบุรี</MenuItem>
                          <MenuItem value={"นราธิวาส"}>นราธิวาส</MenuItem>
                          <MenuItem value={"น่าน"}>น่าน</MenuItem>
                          <MenuItem value={"บึงกาฬ"}>บึงกาฬ</MenuItem>
                          <MenuItem value={"บุรีรัมย์"}>บุรีรัมย์</MenuItem>
                          <MenuItem value={"ปทุมธานี"}>ปทุมธานี</MenuItem>
                          <MenuItem value={"ประจวบคีรีขันธ์"}>
                            ประจวบคีรีขันธ์
                          </MenuItem>
                          <MenuItem value={"ปราจีนบุรี"}>ปราจีนบุรี</MenuItem>
                          <MenuItem value={"ปัตตานี"}>ปัตตานี</MenuItem>
                          <MenuItem value={"พระนครศรีอยุธยา"}>
                            พระนครศรีอยุธยา
                          </MenuItem>
                          <MenuItem value={"พังงา"}>พังงา</MenuItem>
                          <MenuItem value={"พัทลุง"}>พัทลุง</MenuItem>
                          <MenuItem value={"พิจิตร"}>พิจิตร</MenuItem>
                          <MenuItem value={"พิษณุโลก"}>พิษณุโลก</MenuItem>
                          <MenuItem value={"เพชรบุรี"}>เพชรบุรี</MenuItem>
                          <MenuItem value={"เพชรบูรณ์"}>เพชรบูรณ์</MenuItem>
                          <MenuItem value={"แพร่"}>แพร่</MenuItem>
                          <MenuItem value={"พะเยา"}>พะเยา</MenuItem>
                          <MenuItem value={"ภูเก็ต"}>ภูเก็ต</MenuItem>
                          <MenuItem value={"มหาสารคาม"}>มหาสารคาม</MenuItem>
                          <MenuItem value={"มุกดาหาร"}>มุกดาหาร</MenuItem>
                          <MenuItem value={"แม่ฮ่องสอน"}>แม่ฮ่องสอน</MenuItem>
                          <MenuItem value={"ยโสธร"}>ยโสธร</MenuItem>
                          <MenuItem value={"ยะลา"}>ยะลา</MenuItem>
                          <MenuItem value={"ร้อยเอ็ด"}>ร้อยเอ็ด</MenuItem>
                          <MenuItem value={"ระนอง"}>ระนอง</MenuItem>
                          <MenuItem value={"ระยอง"}>ระยอง</MenuItem>
                          <MenuItem value={"ราชบุรี"}>ราชบุรี</MenuItem>
                          <MenuItem value={"ลพบุรี"}>ลพบุรี</MenuItem>
                          <MenuItem value={"ลำปาง"}>ลำปาง</MenuItem>
                          <MenuItem value={"ลำพูน"}>ลำพูน</MenuItem>
                          <MenuItem value={"เลย"}>เลย</MenuItem>
                          <MenuItem value={"ศรีสะเกษ"}>ศรีสะเกษ</MenuItem>
                          <MenuItem value={"สกลนคร"}>สกลนคร</MenuItem>
                          <MenuItem value={"สงขลา"}>สงขลา</MenuItem>
                          <MenuItem value={"สตูล"}>สตูล</MenuItem>
                          <MenuItem value={"สมุทรปราการ"}>สมุทรปราการ</MenuItem>
                          <MenuItem value={"สมุทรสงคราม"}>สมุทรสงคราม</MenuItem>
                          <MenuItem value={"สมุทรสาคร"}>สมุทรสาคร</MenuItem>
                          <MenuItem value={"สระแก้ว"}>สระแก้ว</MenuItem>
                          <MenuItem value={"สระบุรี"}>สระบุรี</MenuItem>
                          <MenuItem value={"สิงห์บุรี"}>สิงห์บุรี</MenuItem>
                          <MenuItem value={"สุโขทัย"}>สุโขทัย</MenuItem>
                          <MenuItem value={"สุพรรณบุรี"}>สุพรรณบุรี</MenuItem>
                          <MenuItem value={"สุราษฎร์ธานี"}>
                            สุราษฎร์ธานี
                          </MenuItem>
                          <MenuItem value={"สุรินทร์"}>สุรินทร์</MenuItem>
                          <MenuItem value={"หนองคาย"}>หนองคาย</MenuItem>
                          <MenuItem value={"หนองบัวลำภู"}>หนองบัวลำภู</MenuItem>
                          <MenuItem value={"อ่างทอง"}>อ่างทอง</MenuItem>
                          <MenuItem value={"อำนาจเจริญ"}>อำนาจเจริญ</MenuItem>
                          <MenuItem value={"อุดรธานี"}>อุดรธานี</MenuItem>
                          <MenuItem value={"อุตรดิตถ์"}>อุตรดิตถ์</MenuItem>
                          <MenuItem value={"อุทัยธานี"}>อุทัยธานี</MenuItem>
                          <MenuItem value={"อุบลราชธานี"}>อุบลราชธานี</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <FormControl sx={{ width: "20pc" }}>
                        <InputLabel
                          id="room-type-label"
                          sx={{ marginTop: "-5px" }}
                        >
                          ชนิดห้อง
                        </InputLabel>
                        <Select
                          labelId="room-type-label"
                          id="room-type-select"
                          label="ชนิดห้อง"
                          value={searchRoomType}
                          onChange={(e) => setSearchRoomType(e.target.value)}
                          sx={{
                            borderRadius: 20,
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "40px",
                          }}
                        >
                          <MenuItem value="">ล้างค่า</MenuItem>
                          <MenuItem value="1">
                            ห้องธรรมดา (Standard Room)
                          </MenuItem>
                          <MenuItem value="2">
                            ห้องดีลักซ์ (Deluxe Room)
                          </MenuItem>
                          <MenuItem value="3">
                            ห้องเอกซ์คลูซีฟ (Executive Room)
                          </MenuItem>
                          <MenuItem value="4">
                            ห้องที่มีประตูเชื่อมต่อกัน (Connecting Rooms)
                          </MenuItem>
                          <MenuItem value="5">ห้องสวีท (Suite)</MenuItem>
                          <MenuItem value="6">
                            ห้องสุพีเรียร์ (Superior Room)
                          </MenuItem>
                          <MenuItem value="7">
                            ห้องพักพิเศษสำหรับผู้พิการ (Accessible Room)
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <FormControl sx={{ width: "20pc" }}>
                        <InputLabel
                          id="view-type-label"
                          sx={{ marginTop: "-5px" }}
                        >
                          ชนิดวิว
                        </InputLabel>
                        <Select
                          labelId="view-type-label"
                          id="view-type-select"
                          label="ชนิดวิว"
                          value={searchViewType}
                          onChange={(e) => setSearchViewType(e.target.value)}
                          sx={{
                            borderRadius: 20,
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "40px",
                          }}
                        >
                          <MenuItem value="">ล้างค่า</MenuItem>
                          <MenuItem value="1">ทะเล</MenuItem>
                          <MenuItem value="2">ภูเขา</MenuItem>
                          <MenuItem value="3">เมือง</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <TextField
                        placeholder="จำนวนห้อง"
                        type="number"
                        sx={{ width: "20pc" }}
                        value={searchRoomCount || ""}
                        onChange={(e) =>
                          setSearchRoomCount(Number(e.target.value))
                        }
                        InputProps={{
                          sx: {
                            borderRadius: "20px",
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "35px",
                          },
                          startAdornment: <></>,
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <TextField
                        placeholder="ราคาห้อง"
                        type="number"
                        sx={{ width: "20pc" }}
                        value={searchPrice || ""}
                        onChange={(e) => setSearchPrice(Number(e.target.value))}
                        InputProps={{
                          sx: {
                            borderRadius: "20px",
                            border: 1,
                            borderColor: "black",
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
                        marginTop: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#343434" }}
                        sx={{ width: "110px", borderRadius: "10px" }}
                        startIcon={<SearchIcon />}
                        onClick={filterHotelDeals}
                      >
                        ค้นหา
                      </Button>

                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ width: "110px", borderRadius: "10px" }}
                        onClick={() => {
                          setSearchName("");
                          setSearchRoomType("");
                          setSearchViewType("");
                          setSearchRoomCount("");
                          setSearchPrice("");
                        }}
                      >
                        ล้างค่า
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
            <Dialog
              open={open}
              onClose={handleCloseByCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"ต้องการดำเนินการจับคู่ ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ข้อเสนอของโรงแรมและข้อเสนอของคอนนเสิร์ต
                  จะถูกดำเนินการสร้างแพ็คเกจทันที
                  โปรดตรวจข้อมูลข้อเสนอที่เลือกให้ถูกต้องอีกครั้ง !!!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseByCancel}>ยกเลิก</Button>
                <Button onClick={handleCloseByContinue} autoFocus>
                  ตกลง
                </Button>
              </DialogActions>
            </Dialog>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                marginLeft: "30px",
              }}
            >
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <TableContainer
                  sx={{
                    height: 120,
                    maxHeight: 120,
                    width: 950,
                    maxWidth: 950,
                    border: 2,
                    borderRadius: 2,
                    overflow: "auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          ชื่อคอนเสิร์ต
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          จังหวัด
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          ชนิดตั๋ว
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          จำนวนตั๋ว
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          ราคาตั๋ว
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          วันที่สิ้นสุดข้อเสนอ
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ConcertDealByCDID.map((concertdeal) => (
                        <TableRow>
                          <TableCell>{concertdeal.name_concert}</TableCell>
                          <TableCell>{concertdeal.province}</TableCell>
                          <TableCell>{concertdeal.name_type_ticket}</TableCell>
                          <TableCell>
                            {concertdeal.concert_deal_price}
                          </TableCell>
                          <TableCell>{concertdeal.number_of_tickets}</TableCell>
                          <TableCell>
                            {dayjs(concertdeal.e_datetime).format("YYYY-MM-DD")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <Box
                sx={{
                  width: 950,
                  height: 520,
                  borderRadius: 3,
                  // bgcolor: "#D9D9D9",
                  marginBottom: "20px",
                  border: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    flexDirection: "column",
                    // marginLeft: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      // marginLeft: "10px",
                    }}
                  >
                    <TableContainer
                      component={Paper}
                      sx={{
                        marginTop: "10px",
                        height: 400,
                        maxHeight: 400,
                        width: 900,
                        maxWidth: 900,
                        border: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ชื่อโรงแรม
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              จังหวัด
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ชนิดห้อง
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ชนิดวิว
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              จำนวนห้อง
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ราคาห้อง
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              วันที่สิ้นสุดข้อเสนอ
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              สถานะ
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              เลือก
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredHotelDeals.map((hoteldeals) => (
                            <TableRow key={hoteldeals.HDID}>
                              <TableCell>{hoteldeals.name}</TableCell>
                              <TableCell>{hoteldeals.province}</TableCell>
                              <TableCell>{hoteldeals.type_room}</TableCell>
                              <TableCell>
                                {hoteldeals.type_view_name_room}
                              </TableCell>
                              <TableCell>
                                {hoteldeals.number_of_rooms}
                              </TableCell>
                              <TableCell>
                                {hoteldeals.hotel_deal_price}
                              </TableCell>
                              <TableCell>
                                {dayjs(hoteldeals.e_datetime).format(
                                  "YYYY-MM-DD"
                                )}
                              </TableCell>
                              <TableCell>{hoteldeals.name_status}</TableCell>
                              <TableCell>
                                <Radio
                                  checked={
                                    selectedValueRadio ===
                                    hoteldeals.HDID.toString()
                                  }
                                  onChange={() =>
                                    setSelectedValueRadio(
                                      hoteldeals.HDID.toString()
                                    )
                                  }
                                  value={hoteldeals.HDID.toString()}
                                  name="radio-buttons"
                                  inputProps={{
                                    "aria-label": hoteldeals.HDID.toString(),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
                      onClick={navigateToMenuConcertDealPage}
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
                        sx={{
                          width: "120px",
                          borderRadius: "10px",
                        }}
                        startIcon={<ChevronRightIcon />}
                        // onClick={navigateToAddTicketP2Page}
                        onClick={async () => {
                          try {
                            setLoad(true);
                            if (concertdeal_ID && selectedValueRadio != "") {
                              handleClickOpen();
                            } else {
                              window.alert(
                                "ข้อมูลไม่ถูกต้อง โปรดเลือกข้อมูลใหม่"
                              );
                            }
                            setLoad(false);
                          } catch (error) {
                            setLoad(false);
                            console.log(error);
                          }
                        }}
                      >
                        ส่งคำร้อง
                      </Button>
                    )}
                  </div>
                </div>
              </Box>
            </div>
          </div>
          </>):(
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            <p>
              ยังไม่มีข้อมูลข้อเสนอคอนเสิร์ต
              โปรดดำเนินการเพิ่มข้อมูลข้อเสนอคอนเสิร์ต
            </p>
          </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConcertDealPage;
