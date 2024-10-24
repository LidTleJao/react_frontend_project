import { useNavigate } from "react-router-dom";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
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
import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ChangeEvent, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { ConcertService } from "../../../../service/concertService";
import { ConcertDealsService } from "../../../../service/concertDealService";
import { GetConcertByUserIDRes } from "../../../../model/Response/Concert/GetConcertByUserIDRes";
import { GetConcertTicketByCIDRes } from "../../../../model/Response/Concert/GetConcertTicketByCIDRes";
import { GetConcertByCIDRes } from "../../../../model/Response/Concert/GetConcertByCIDRes";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz("Asia/Bangkok");

function AddConcertDealDataPage() {
  const navigate = useNavigate();
  const concertService = new ConcertService();
  const concertDealService = new ConcertDealsService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [concert, setConcert] = useState<GetConcertByUserIDRes[]>([]);
  const [concertselect, setConcertSeclect] = useState<GetConcertByCIDRes[]>([]);
  const [ticket, setTicket] = useState<GetConcertTicketByCIDRes[]>([]);
  const [valueDate, setValueDate] = useState<[Dayjs, Dayjs | null]>([
    dayjs(),
    null,
  ]);
  const [Concert_ID, setConcert_ID] = useState("");
  const [Ticket_Type, setTicket_Type] = useState("");
  const [Price, setPrice] = useState("");
  const [Number_of_tickets, setNumber_of_tickets] = useState("");
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcertByUid(user?.uid);
      const data: GetConcertByUserIDRes[] = resconcert.data;
      setConcert(data);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcert(Concert_ID);
      const data: GetConcertByCIDRes[] = resconcert.data;
      setConcertSeclect(data);
    };
    loadDataAsync();
  }, [Concert_ID]);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resticket = await concertService.getConcertTicket(Concert_ID);
      const data: GetConcertTicketByCIDRes[] = resticket.data;
      setTicket(data);
    };
    loadDataAsync();
  }, [Concert_ID]);

  function navigateToMenuConcertDealPage() {
    navigate("/MenuConcertDeal");
  }

  function handlePrice(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === "" || (Number(value) > 0 && !value.includes("-"))) {
      setPrice(value);
    } else {
      window.alert("ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
    }
  }

  function handleNumberTicket(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === "" || (Number(value) >= 0 && !value.includes("-"))) {
      setNumber_of_tickets(value);
    } else {
      window.alert("จำนวนของตั๋วไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
    }
  }

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="addconcertdealdata-cont">
        {concert.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
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
                    เพิ่มข้อมูลข้อเสนอคอนเสิร์ต
                  </Typography>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <FormControl sx={{ width: "35pc" }}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ marginTop: "-10px" }}
                    >
                      เลือกคอนเสิร์ต
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="ชื่อคอนเสิร์ต"
                      value={Concert_ID}
                      onChange={async (e) => {
                        try {
                          setConcert_ID(e.target.value);
                        } catch (error) {
                          // setLoadSelectTicket(false);
                          console.log(error);
                        }
                      }}
                      sx={{
                        borderRadius: 20,
                        bgcolor: "white",
                        height: "40px",
                      }}
                    >
                      {concert.map((concerts, index) => (
                        <MenuItem value={concerts.CID}>
                          {1 + index} - {concerts.name_concert}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {concertselect.length > 0 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "35px",
                      }}
                    >
                      {ticket.length > 0 ? (<>
                      <Box
                        sx={{
                          width: 650,
                          height: 350,
                          maxHeight: 350,
                          borderRadius: 3,
                          // bgcolor: "#D9D9D9",
                          border: 2,
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "20px",
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
                              variant="h6"
                            >
                              ชนิดตั๋ว :
                            </Typography>
                            <FormControl sx={{ width: "20pc" }}>
                              <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="ชนิดตั๋ว"
                                value={Ticket_Type}
                                onChange={(e) => setTicket_Type(e.target.value)}
                                sx={{
                                  borderRadius: 20,
                                  bgcolor: "white",
                                  height: "40px",
                                }}
                              >
                                {ticket.map((tickets, index) => (
                                  <MenuItem
                                    key={tickets.CTID}
                                    value={tickets.CTID}
                                  >
                                    {1 + index} - {tickets.name_type_ticket} -
                                    ชื่อโซนที่นั่ง {tickets.ticket_zone}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "20px",
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
                              variant="h6"
                            >
                              ราคาตั๋ว :
                            </Typography>
                            <TextField
                              placeholder="ราคาตั๋ว"
                              type="number"
                              sx={{ width: "20pc" }}
                              onChange={handlePrice}
                              inputProps={{ min: 1 }}
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "20px",
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
                              variant="h6"
                            >
                              จำนวนตั๋ว :
                            </Typography>
                            <TextField
                              placeholder="จำนวนตั๋ว"
                              type="number"
                              sx={{ width: "20pc" }}
                              // onChange={(e) => setName(e.target.value)}
                              onChange={handleNumberTicket}
                              inputProps={{ min: 1 }}
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "20px",
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
                                marginTop: "10px",
                              }}
                              variant="h6"
                            >
                              วันที่สิ้นสุดการยื่นข้อเสนอ:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateRangePicker
                                sx={{ ml: 2, width: 250 }}
                                value={valueDate}
                                onChange={(newValueDate) => {
                                  const newCheckIn = newValueDate[0];
                                  const newCheckOut = newValueDate[1]; // วันที่ Check-out ใหม่
                                  // อัปเดตค่าเฉพาะ Check-out เท่านั้น
                                  if (newCheckIn && newCheckOut) {
                                    const startDate = dayjs(newValueDate[0]).tz(
                                      "Asia/Bangkok"
                                    ); // ค่าตั้งต้น
                                    const endDate = dayjs(newValueDate[1]).tz(
                                      "Asia/Bangkok"
                                    ); // วันที่ Check-out ใหม่
                                    setValueDate([startDate, endDate]);
                                  }
                                }}
                                disablePast // ป้องกันการเลือกวันที่ในอดีตสำหรับ Check-out
                              />
                            </LocalizationProvider>
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
                                  style={{
                                    marginRight: "20px",
                                    color: "black",
                                  }}
                                />
                              </div>
                            ) : (
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "#3B7AF4" }}
                                sx={{
                                  width: "170px",
                                  borderRadius: "10px",
                                }}
                                startIcon={<ChevronRightIcon />}
                                onClick={async () => {
                                  try {
                                    setLoad(true);
                                    let getstr1 = "";
                                    let getstr2 = "";
                                    if (valueDate[0]) {
                                      //   console.log(valueDate[0]);
                                      const getarrayshow1 =
                                        valueDate[0]?.get("D").valueOf() || 0;
                                      const getarrayshow2 =
                                        valueDate[0]?.get("M").valueOf() || 0;
                                      const getarrayshow3 =
                                        valueDate[0]?.get("y").valueOf() || 0;
                                      getstr1 = `${getarrayshow3}-${
                                        getarrayshow2 + 1
                                      }-${getarrayshow1}`;
                                    }
                                    if (valueDate[1]) {
                                      const getarrayshow1 =
                                        valueDate[1]?.get("D").valueOf() || 0;
                                      const getarrayshow2 =
                                        valueDate[1]?.get("M").valueOf() || 0;
                                      const getarrayshow3 =
                                        valueDate[1]?.get("y").valueOf() || 0;
                                      getstr2 = `${getarrayshow3}-${
                                        getarrayshow2 + 1
                                      }-${getarrayshow1}`;

                                      const parsedDate1 = new Date(getstr1);
                                      const parsedDate2 = new Date(getstr2);

                                      const formatDate = (
                                        date: Date
                                      ): string => {
                                        const year = date.getFullYear();
                                        const month = String(
                                          date.getMonth() + 1
                                        ).padStart(2, "0"); // เดือนเริ่มที่ 0, ต้อง +1
                                        const day = String(
                                          date.getDate()
                                        ).padStart(2, "0"); // เพิ่ม 0 ข้างหน้า ถ้าวันหรือเดือนมีแค่หลักเดียว
                                        return `${year}-${month}-${day}`;
                                      };

                                      console.log(formatDate(parsedDate1));
                                      console.log(formatDate(parsedDate2));

                                      if (Concert_ID == "") {
                                        window.alert(
                                          "ข้อมูลคอนเสิร์ตไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                        );
                                      } else {
                                        if (Ticket_Type == "") {
                                          window.alert(
                                            "ข้อมูลตั๋วไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                          );
                                        } else {
                                          if (
                                            Price === "" ||
                                            (Number(Price) < 1 &&
                                              !Price.includes("-"))
                                          ) {
                                            window.alert(
                                              "ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                            );
                                          } else {
                                            if (
                                              Number_of_tickets === "" ||
                                              (Number(Number_of_tickets) == 0 &&
                                                !Number_of_tickets.includes(
                                                  "-"
                                                ))
                                            ) {
                                              window.alert(
                                                "จำนวนตั๋วไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                              );
                                            } else {
                                              const resconcertdeal =
                                                await concertDealService.AddConcertDealData(
                                                  Ticket_Type,
                                                  Number_of_tickets,
                                                  Price,
                                                  formatDate(parsedDate1),
                                                  formatDate(parsedDate2)
                                                );
                                              if (
                                                resconcertdeal.status == 201
                                              ) {
                                                window.alert(
                                                  "ข้อมูลของข้อเสนอ ได้ลงทะเบียนแล้ว!!!"
                                                );
                                                navigateToMenuConcertDealPage();
                                              }
                                            }
                                          }
                                        }
                                      }
                                    } else {
                                      window.alert(
                                        "ข้อมูลวันที่ไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                      );
                                    }
                                    setLoad(false);
                                  } catch (error) {
                                    setLoad(false);
                                    console.log(error);
                                  }
                                }}
                              >
                                เพิ่มข้อมูลข้อเสนอ
                              </Button>
                            )}
                          </div>
                        </div>
                      </Box>
                      </>) : (
                        <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "30px",
                        }}
                      >
                        <p>
                          ยังไม่มีข้อมูลตั๋ว โปรดดำเนินการเลือกข้อมูลตั๋ว
                        </p>
                      </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "120px",
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
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
                          ข้อมูลคอนเสิร์ตที่เลือก
                        </Typography>
                      </div>
                      <Box
                        sx={{
                          width: 650,
                          maxWidth: 650,
                          height: 470,
                          maxHeight: 480,
                          borderRadius: 3,
                          // bgcolor: "#D9D9D9",
                          border: 2,
                          display: "flex",
                          justifyContent: "center",
                          overflow: "auto"
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {concertselect.map((concert) => (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: "30px",
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
                                    maxWidth:550,
                                  }}
                                  variant="h6"
                                >
                                  ชื่อคอนเสิร์ต : {concert.name_concert}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: "30px",
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
                                  variant="h6"
                                >
                                  ชนิดประเภทการแสดง :{" "}
                                  {concert.name_type_concert}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: "30px",
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
                                  variant="h6"
                                >
                                  จังหวัด : {concert.province}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: "30px",
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
                                  variant="h6"
                                >
                                  วันที่การแสดง :{" "}
                                  {concert.show_schedule_concert.toString()}
                                </Typography>
                              </div>
                            </>
                          ))}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <TableContainer
                              component={Paper}
                              sx={{
                                height: 150,
                                maxHeight: 150,
                                width: 550,
                                maxWidth: 750,
                                border: 2,
                                borderRadius: 2,
                                marginBottom:"20px",
                                overflow: "auto",
                              }}
                            >
                              {ticket.length > 0 ? (
                                <>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                          โซนที่นั่ง
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                          ชนิดตั๋ว
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                          วันที่การแสดง
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                          ราคาตั๋ว
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {ticket.map((concert_ticket) => (
                                        <TableRow>
                                          <TableCell>
                                            {concert_ticket.ticket_zone}
                                          </TableCell>
                                          <TableCell>
                                            {concert_ticket.name_type_ticket}
                                          </TableCell>
                                          <TableCell>
                                            {concert_ticket.show_concert.toString()}
                                          </TableCell>
                                          <TableCell>
                                            {concert_ticket.price}
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
                                    marginTop: "60px",
                                  }}
                                >
                                  <p>
                                    ยังไม่มีข้อมูลตั๋ว
                                    โปรดดำเนินการเพิ่มข้อมูลตั๋ว
                                  </p>
                                </div>
                              )}
                            </TableContainer>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <p>
                    ยังไม่มีข้อมูลคอนเสิร์ต โปรดดำเนินการเลือกข้อมูลคอนเสิร์ต
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
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
                  เพิ่มข้อมูลข้อเสนอคอนเสิร์ต
                </Typography>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p>ยังไม่มีข้อมูลคอนเสิร์ต โปรดดำเนินการเพิ่มข้อมูลคอนเสิร์ต</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default AddConcertDealDataPage;
