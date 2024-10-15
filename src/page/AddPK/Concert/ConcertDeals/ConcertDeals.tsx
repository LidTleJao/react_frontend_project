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
                    height: 420,
                    maxHeight: 420,
                    borderRadius: 3,
                    // bgcolor: "#D9D9D9",
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
                        //   onChange={(e) => setName(e.target.value)}
                        // onChange={handlePrice}
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
                          ชนิดห้อง
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="ชนิดห้อง"
                          // defaultValue={1}
                          //   value={ticket_type}
                          //   onChange={(e) => setTicket_type(Number(e.target.value))}
                          sx={{
                            borderRadius: 20,
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "40px",
                          }}
                        >
                          <MenuItem value={1}>
                            ห้องธรรมดา (Standard Room)
                          </MenuItem>
                          <MenuItem value={2}>
                            ห้องดีลักซ์ (Deluxe Room)
                          </MenuItem>
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
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <FormControl sx={{ width: "20pc" }}>
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ marginTop: "-5px" }}
                        >
                          ชนิดวิว
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="ชนิดวิว"
                          // defaultValue={1}
                          //   value={ticket_type}
                          //   onChange={(e) => setTicket_type(Number(e.target.value))}
                          sx={{
                            borderRadius: 20,
                            border: 1,
                            borderColor: "black",
                            bgcolor: "white",
                            height: "40px",
                          }}
                        >
                          <MenuItem value={1}>ทะเล</MenuItem>
                          <MenuItem value={2}>ภูเขา</MenuItem>
                          <MenuItem value={3}>เมือง</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <TextField
                        placeholder="จำนวนห้อง"
                        type="number"
                        sx={{ width: "20pc" }}
                        //   onChange={(e) => setName(e.target.value)}
                        // onChange={handlePrice}
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
                        //   onChange={(e) => setName(e.target.value)}
                        // onChange={handlePrice}
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
                        justifyContent: "end",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#343434" }}
                        sx={{
                          width: "110px",
                          borderRadius: "10px",
                        }}
                        startIcon={<SearchIcon />}
                        // onClick={navigateToAddConcertDataPage}
                      >
                        ค้นหา
                      </Button>
                    </div>
                  </div>
                </Box>
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
                          window.alert("ข้อมูลไม่ถูกต้อง โปรดเลือกข้อมูลใหม่");
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
                    height: 60,
                    maxHeight: 60,
                    width: 950,
                    maxWidth: 950,
                    border: 2,
                    borderRadius: 2,
                    overflow: "auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {ConcertDealByCDID.map((concertdeal) => (
                    <TableRow>
                      <TableCell>
                        ชื่อคอนเสิร์ต: {concertdeal.name_concert}
                      </TableCell>
                      <TableCell>
                        ชนิดตั๋ว: {concertdeal.name_type_ticket}
                      </TableCell>
                      <TableCell>ราคาตั๋ว: {concertdeal.price}</TableCell>
                      <TableCell>
                        จำนวนตั๋ว: {concertdeal.number_of_tickets}
                      </TableCell>
                      <TableCell>
                        วันที่สิ้นสุดการยื่นข้อเสนอ:{" "}
                        {concertdeal.e_datetime.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableContainer>
              </div>
              <Box
                sx={{
                  width: 950,
                  height: 570,
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
                        height: 520,
                        maxHeight: 520,
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
                          {hotelDealAll.map((hoteldeals) => (
                            <TableRow>
                              <TableCell>{hoteldeals.name}</TableCell>
                              <TableCell>{hoteldeals.type_room}</TableCell>
                              <TableCell>
                                {hoteldeals.type_view_name_room}
                              </TableCell>
                              <TableCell>
                                {hoteldeals.number_of_rooms}
                              </TableCell>
                              <TableCell>{hoteldeals.price}</TableCell>
                              <TableCell>
                                {hoteldeals.e_datetime.toString()}
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
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConcertDealPage;
