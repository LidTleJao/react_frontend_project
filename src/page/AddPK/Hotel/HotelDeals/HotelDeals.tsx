import {
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
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { ConcertDealsService } from "../../../../service/concertDealService";
import { useEffect, useState } from "react";
import { ConcertDealsGetAllRes } from "../../../../model/Response/Packet/Concert/ConcertDealsGetAllRes";
import { HotelDealsService } from "../../../../service/hotelDealService";
import { HotelDealsGetByUserRes } from "../../../../model/Response/Packet/Hotel/HotelDealsGetByUserRes";
import { HotelDealsGetByHDIDRes } from "../../../../model/Response/Packet/Hotel/HotelDealsGetByHDIDRes";

function HotelDealPage() {
  const navigate = useNavigate();
  const concertdeals = new ConcertDealsService();
  const hotelDealService = new HotelDealsService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [HotelDealByUser, setHotelDealByUser] = useState<
    HotelDealsGetByUserRes[]
  >([]);
  const [HotelDealByHDID, setHotelDealByHDID] = useState<
    HotelDealsGetByHDIDRes[]
  >([]);
  const [concertDealAll, setConcertDealAll] = useState<ConcertDealsGetAllRes[]>(
    []
  );
  const [hoteldeal_ID, setHoteldeal_ID] = useState("");
  const [selectedValueRadio, setSelectedValueRadio] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshotel = await hotelDealService.getHotelDealByUser(user?.uid);
      const data: HotelDealsGetByUserRes[] = reshotel.data;
      setHotelDealByUser(data);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshoteldeal = await hotelDealService.getHotelDealByHDID(
        hoteldeal_ID
      );
      const data: HotelDealsGetByHDIDRes[] = reshoteldeal.data;
      setHotelDealByHDID(data);
    };
    loadDataAsync();
  }, [hoteldeal_ID]);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcertdeal = await concertdeals.getAllConcertDeals();
      const data: ConcertDealsGetAllRes[] = resconcertdeal.data;
      setConcertDealAll(data);
    };
    loadDataAsync();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function navigateToMenuHotelDealPage() {
    navigate("/MenuHotelDeal");
  }
  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="hoteldeal-cont">
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
                    เลือกข้อมูลโรงแรม
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={hoteldeal_ID}
                    onChange={(e) => setHoteldeal_ID(e.target.value)}
                    sx={{
                      borderRadius: 20,
                      bgcolor: "white",
                      height: "40px",
                    }}
                  >
                    {HotelDealByUser.map((hoteldealselect, index) => (
                      <MenuItem value={hoteldealselect.HDID}>
                        {index + 1} - {hoteldealselect.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Box
                  sx={{
                    width: 400,
                    height: 370,
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
                        placeholder="ชื่อคอนเสิร์ต"
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
                          ชนิดตั๋ว
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="ชนิดตั๋ว"
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
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <TextField
                        placeholder="จำนวนตั๋ว"
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
                        placeholder="ราคาตั๋ว"
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
                  onClick={navigateToMenuHotelDealPage}
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
                      width: "110px",
                      borderRadius: "10px",
                    }}
                    startIcon={<ChevronRightIcon />}
                    // onClick={navigateToAddTicketP2Page}
                    onClick={async () => {
                      try {
                        setLoad(true);
                        handleClickOpen();
                        setLoad(false);
                      } catch (error) {
                        setLoad(false);
                        console.log(error);
                      }
                    }}
                  >
                    ถัดไป
                  </Button>
                )}
              </div>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"ต้องการดำเนินการจับคู่ ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ข้อเสนอของโรงแรมและข้อเสนอของคอนนเสิร์ต จะถูกดำเนินการสร้างแพ็คเกจทันที
                  โปรดตรวจข้อมูลข้อเสนอที่เลือกให้ถูกต้องอีกครั้ง !!!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>ยกเลิก</Button>
                <Button onClick={handleClose} autoFocus>
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
                  {HotelDealByHDID.map((hoteldeal) => (
                    <TableRow>
                      <TableCell>ชื่อโรงแรม: {hoteldeal.name}</TableCell>
                      <TableCell>ชนิดห้อง: {hoteldeal.type_room}</TableCell>
                      <TableCell>
                        ชนิดวิว: {hoteldeal.type_view_name_room}
                      </TableCell>
                      <TableCell>ราคาห้อง: {hoteldeal.price}</TableCell>
                      <TableCell>
                        จำนวนห้อง: {hoteldeal.number_of_rooms}
                      </TableCell>
                      <TableCell>
                        วันที่สิ้นสุดการยื่นข้อเสนอ:{" "}
                        {hoteldeal.e_datetime.toString()}
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
                      <Table aria-label="room information table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ชื่อคอนเสิร์ต
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
                            <TableCell sx={{ fontWeight: "bold" }}>
                              สถานะ
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              เลือก
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {concertDealAll.map((concertdeal) => (
                            <TableRow>
                              <TableCell>{concertdeal.name_concert}</TableCell>
                              <TableCell>
                                {concertdeal.name_type_ticket}
                              </TableCell>
                              <TableCell>
                                {concertdeal.number_of_tickets}
                              </TableCell>
                              <TableCell>{concertdeal.price}</TableCell>
                              <TableCell>
                                {concertdeal.e_datetime.toString()}
                              </TableCell>
                              <TableCell>{concertdeal.name_status}</TableCell>
                              <TableCell>
                                <Radio
                                  checked={
                                    selectedValueRadio ===
                                    concertdeal.CDID.toString()
                                  }
                                  onChange={() =>
                                    setSelectedValueRadio(
                                      concertdeal.CDID.toString()
                                    )
                                  }
                                  value={concertdeal.CDID.toString()}
                                  name="radio-buttons"
                                  inputProps={{
                                    "aria-label": concertdeal.CDID.toString(),
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
export default HotelDealPage;
