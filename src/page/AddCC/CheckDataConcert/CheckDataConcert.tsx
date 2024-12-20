import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  Link,
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
import SaveIcon from "@mui/icons-material/Save";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { GetConcertByUserIDRes } from "../../../model/Response/Concert/GetConcertByUserIDRes";
import { ConcertService } from "../../../service/concertService";
import { Box } from "@mui/system";
import { GetConcertByCIDRes } from "../../../model/Response/Concert/GetConcertByCIDRes";
import { GetConcertChannelByCIDRes } from "../../../model/Response/Concert/GetConcertChannelByCIDRes";
import { GetConcertShowByCIDRes } from "../../../model/Response/Concert/GetConcertShowByCIDRes";
import { GetConcertTicketByCIDRes } from "../../../model/Response/Concert/GetConcertTicketByCIDRes";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  DateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import Calendar from "@mui/icons-material/Event";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz("Asia/Bangkok");

function CheckDataConcertPage() {
  const concertService = new ConcertService();
  const [concertAll, setConcertAll] = useState<GetConcertByUserIDRes[]>([]);
  const [concert, setConcert] = useState<GetConcertByCIDRes[]>([]);
  const [concertChannel, setConcertChannel] = useState<
    GetConcertChannelByCIDRes[]
  >([]);
  const [concertShow, setConcertShow] = useState<GetConcertShowByCIDRes[]>([]);
  const [concertTicket, setConcertTicket] = useState<
    GetConcertTicketByCIDRes[]
  >([]);
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [concert_ID, setConcert_ID] = useState("");
  const [concert_type, setConcert_type] = useState(1);
  const [show_schedule_concert, setShow_schedule_concert] = useState("");
  const lineupRef = useRef<HTMLInputElement>();
  const address_concertRef = useRef<HTMLInputElement>();
  const detail_concertRef = useRef<HTMLInputElement>();
  const [ticket_ID, setTicket_ID] = useState("");
  const [ticket_zone, setTicket_zone] = useState("");
  const [ticket_type, setTicket_Type] = useState(1);
  const [price, setprice] = useState("");
  const [editing1, setEditing1] = useState(false);
  const [editing2, setEditing2] = useState(false);
  const [editing3, setEditing3] = useState(false);
  const [editing4, setEditing4] = useState(false);
  const [getshow3, setGetShow3] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [gettime3, setGetTime3] = useState("");
  const [getshow, setGetShow] = useState<Array<Dayjs | null>>([null]); // Array for dates
  const [gettime, setGetTime] = useState<string[]>([""]); // Array for times

  function handleGetTicketID(getTicketID: number) {
    setTicket_ID(getTicketID.toString());
    setEditing4(true);
  }

  function handleGetOutTicketID() {
    setTicket_ID("");
    setEditing4(false);
  }

  function handlePrice(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === "" || (Number(value) > 0 && !value.includes("-"))) {
      setprice(value);
    } else {
      window.alert("ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่");
    }
  }

  // Function to handle date change
  const handleDateChange = (newValue: Dayjs | null, index: number) => {
    const updatedDates = [...getshow];
    updatedDates[index] = newValue;
    setGetShow(updatedDates);
  };

  // Function to handle time change
  const handleTimeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedTimes = [...gettime];
    updatedTimes[index] = event.target.value;
    setGetTime(updatedTimes);
  };

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcertByUid(user?.uid);
      const data: GetConcertByUserIDRes[] = resconcert.data;
      setConcertAll(data);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcert(concert_ID);
      const dataconcert: GetConcertByCIDRes[] = resconcert.data;
      setConcert(dataconcert);

      const resconchan = await concertService.getConcertChannel(concert_ID);
      const datachannel: GetConcertChannelByCIDRes[] = resconchan.data;
      setConcertChannel(datachannel);

      const resconshow = await concertService.getConcertShow(concert_ID);
      const datashow: GetConcertShowByCIDRes[] = resconshow.data;
      setConcertShow(datashow);

      const resconticket = await concertService.getConcertTicket(concert_ID);
      const dataticket: GetConcertTicketByCIDRes[] = resconticket.data;
      setConcertTicket(dataticket);
    };
    loadDataAsync();
  }, [concert_ID]);

  const cstidCount = concertShow.map((concertselect) => concertselect.CSTID);

  // console.log(cstidCount.length);

  // State สำหรับเก็บข้อมูล URL ของ concertChannel
  const [urls, setUrls] = useState(
    concertChannel?.map((concert) => concert?.channel || "") || ["", "", ""]
  );
  const getCCID = concertChannel.map((concert) => concert.CCID || "");

  // ฟังก์ชันที่ใช้ในการเปลี่ยนค่าใน state เมื่อมีการเปลี่ยนแปลงใน TextField
  const handleUrlChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newUrls = [...urls];
    newUrls[index] = event.target.value; // อัปเดตค่าของช่องที่มีการเปลี่ยนแปลง
    setUrls(newUrls);
  };

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="checkdataconcert-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "150px",
          }}
        >
          <div
            style={{
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
              variant="h4"
            >
              ตรวจสอบข้อมูลคอนเสิร์ต
            </Typography>
          </div>
          {concertAll.length > 0 ? (
            <>
              <div style={{ display: "flex", justifyContent: "start" }}>
                <FormControl sx={{ ml: 15, minWidth: 150 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                    sx={{ marginTop: "-5px" }}
                  >
                    เลือกคอนเสิร์ต
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={concert_ID}
                    onChange={(e) => setConcert_ID(e.target.value)}
                    sx={{ borderRadius: 20, overflow: "auto" }}
                    autoWidth
                  >
                    {concertAll.map((concert, index) => (
                      <MenuItem key={concert.CID} value={concert.CID}>
                        {1 + index} - {concert.name_concert}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {concert.length > 0 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 1250,
                        height: 900,
                        maxHeight: 3000,
                        borderRadius: 3,
                        border: 2,
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "50px",
                          marginTop: "30px",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Box
                            sx={{
                              width: 350,
                              height: 450,
                              // maxHeight: 900,
                              borderRadius: 3,
                              border: 2,
                              display: "flex",
                              justifyContent: "start",
                              flexDirection: "column",
                            }}
                          >
                            {concert.map((concertselect) => (
                              <img
                                src={concertselect.poster_concert}
                                width={350}
                                height={450}
                                style={{ maxHeight: 450, maxWidth: 350 }}
                                className="rounded-lg"
                              />
                            ))}
                          </Box>
                          <Box
                            sx={{
                              width: 350,
                              height: 260,
                              // maxHeight: 900,
                              borderRadius: 3,
                              border: 2,
                              display: "flex",
                              marginTop: "30px",
                              justifyContent: "start",
                              flexDirection: "column",
                            }}
                          >
                            {concert.map((concertselect) => (
                              <img
                                src={concertselect.performance_chart}
                                width={350}
                                height={260}
                                style={{ maxHeight: 260, maxWidth: 350 }}
                                className="rounded-lg"
                              />
                            ))}
                          </Box>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "50px",
                          }}
                        >
                          <Box
                            sx={{
                              width: 750,
                              height: 830,
                              maxHeight: 830,
                              borderRadius: 3,
                              border: 2,
                              display: "flex",
                              overflow: "auto",
                              justifyContent: "start",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                marginLeft: "20px",
                                marginTop: "10px",
                                justifyContent: "space-between",
                                flexDirection: "row",
                              }}
                            >
                              {concert.map((concertselect) => (
                                <>
                                  <Typography
                                    gutterBottom
                                    sx={{
                                      display: "flex",
                                      fontWeight: "bold",
                                      overflow: "auto",
                                      maxHeight: 100,
                                      color: "black",
                                      fontFamily: "Mitr, sans-serif",
                                      fontStyle: "normal",
                                    }}
                                    variant="h4"
                                  >
                                    {concertselect.name_concert}
                                  </Typography>
                                  <div
                                    style={{
                                      display: "flex",
                                      marginRight: "10px",
                                    }}
                                  >
                                    {editing1 ? (
                                      <>
                                        <Card
                                          className="mr-2"
                                          sx={{ height: 40, border: 1 }}
                                        >
                                          <CardActionArea>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <SaveIcon
                                                onClick={async () => {
                                                  try {
                                                    if (
                                                      concert_ID &&
                                                      concert_type &&
                                                      show_schedule_concert &&
                                                      lineupRef.current
                                                        ?.value &&
                                                      address_concertRef.current
                                                        ?.value &&
                                                      detail_concertRef.current
                                                        ?.value
                                                    ) {
                                                      console.log(concert_ID);
                                                      console.log(concert_type);
                                                      const resconcert =
                                                        await concertService.updateConcert(
                                                          concert_ID,
                                                          concert_type,
                                                          show_schedule_concert,
                                                          lineupRef.current!
                                                            .value,
                                                          address_concertRef.current!
                                                            .value,
                                                          detail_concertRef.current!
                                                            .value
                                                        );
                                                      console.log(
                                                        resconcert.status
                                                      );
                                                      if (
                                                        resconcert.status ===
                                                        200
                                                      ) {
                                                        window.alert(
                                                          "แก้ไขข้อมูลคอนเสิร์ตเสร็จสิ้น!!!"
                                                        );
                                                        console.log(
                                                          resconcert.data
                                                        );
                                                      }
                                                    } else {
                                                      window.alert(
                                                        "โปรดทำการแก้ไขข้อมูลคอนเสิร์ตอีกครั้ง"
                                                      );
                                                    }
                                                    // setEditing1(false);
                                                  } catch (error) {
                                                    setEditing1(false);
                                                    console.log(error);
                                                  }
                                                }}
                                                sx={{
                                                  fontSize: "40px",
                                                  color: "skyblue",
                                                }}
                                              />
                                            </div>
                                          </CardActionArea>
                                        </Card>
                                      </>
                                    ) : (
                                      <> </>
                                    )}
                                    <Card sx={{ height: 40, border: 1 }}>
                                      <CardActionArea>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {editing1 ? (
                                            <>
                                              <HighlightOffIcon
                                                onClick={() =>
                                                  setEditing1(false)
                                                }
                                                sx={{
                                                  fontSize: "40px",
                                                  color: "red",
                                                }}
                                              />
                                            </>
                                          ) : (
                                            <EditIcon
                                              onClick={() => setEditing1(true)}
                                              sx={{
                                                fontSize: "40px",
                                                color: "black",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </CardActionArea>
                                    </Card>
                                  </div>
                                </>
                              ))}
                            </div>
                            {editing1 ? (
                              <>
                                <div className="flex flex-row pl-5 items-center">
                                  <h1 className="text-2xl font-medium pr-3">
                                    LineUp :
                                  </h1>
                                  {concert.map((concertselect) => (
                                    <TextField
                                      placeholder={concertselect?.lineup}
                                      className="w-[600px]"
                                      label="LineUp"
                                      variant="outlined"
                                      inputRef={lineupRef}
                                      // value={lineup}
                                      // onChange={(e) => setLineup(e.target.value)}
                                      defaultValue={concertselect?.lineup}
                                    />
                                  ))}
                                </div>
                                <div className="flex flex-row pl-5 mt-5 items-center">
                                  <h1 className="text-2xl font-medium pr-3">
                                    ชนิดประเภทการแสดง :
                                  </h1>
                                  {concert.map((concertselect) => (
                                    <Select
                                      labelId="demo-select-small-label"
                                      id="demo-select-small"
                                      value={concert_type}
                                      label="ประเภทของคอนเสิร์ต"
                                      defaultValue={
                                        concertselect.concert_type_ID
                                      }
                                      onChange={(e) =>
                                        setConcert_type(Number(e.target.value))
                                      }
                                      sx={{
                                        borderRadius: 20,
                                        bgcolor: "white",
                                        height: "40px",
                                      }}
                                    >
                                      <MenuItem value={1}>
                                        คอนเสิร์ตเดี่ยว (Solo Concert)
                                      </MenuItem>
                                      <MenuItem value={2}>
                                        คอนเสิร์ตรวมศิลปิน (Music
                                        Festival/All-Star Concert)
                                      </MenuItem>
                                      <MenuItem value={3}>
                                        คอนเสิร์ตการกุศล (Charity Concert)
                                      </MenuItem>
                                    </Select>
                                  ))}
                                </div>
                                <div className="flex flex-row pl-5 mt-5 items-center">
                                  <h1 className="text-2xl font-medium pr-3">
                                    วันที่การแสดง :
                                  </h1>

                                  {concert.map((concertselect) => (
                                    <TextField
                                      placeholder={concertselect.show_schedule_concert.toString()}
                                      type="Date"
                                      sx={{ mt: 2, width: "10pc" }}
                                      value={show_schedule_concert}
                                      defaultValue={concertselect.show_schedule_concert.toString()}
                                      onChange={(e) =>
                                        setShow_schedule_concert(e.target.value)
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: "20px",
                                          bgcolor: "white",
                                          height: "35px",
                                        },
                                        startAdornment: (
                                          <>{/* <h3>Prapanpong</h3> */}</>
                                        ),
                                      }}
                                    />
                                  ))}
                                </div>
                                <div className="flex flex-row pl-5 mt-5 items-center">
                                  <h1 className="text-2xl font-medium pr-3">
                                    รายละเอียดของคอนเสิร์ต :
                                  </h1>

                                  {concert.map((concertselect) => (
                                    <TextField
                                      placeholder={
                                        concertselect?.detail_concert
                                      }
                                      defaultValue={
                                        concertselect?.detail_concert
                                      }
                                      className="w-[400px]"
                                      label="รายละเอียดของคอนเสิร์ต"
                                      variant="outlined"
                                      inputRef={detail_concertRef}
                                    />
                                  ))}
                                </div>
                                <div className="flex flex-row pl-5 mt-5 items-center">
                                  <Card
                                    sx={{
                                      maxWidth: 30,
                                      maxHeight: 30,
                                      marginRight: 2,
                                      borderBlockColor: "white",
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      alt="green iguana"
                                      image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fplaceholder.png?alt=media&token=7928f28b-1307-49b6-ae06-36cb8123e5d5"
                                    />
                                  </Card>
                                  {concert.map((concertselect) => (
                                    <TextField
                                      label="Address Concert"
                                      placeholder={
                                        concertselect?.address_concert
                                      }
                                      multiline
                                      rows={4} // กำหนดจำนวนแถวที่จะแสดง
                                      defaultValue={
                                        concertselect?.address_concert
                                      }
                                      inputRef={address_concertRef}
                                      variant="outlined" // หรือจะใช้ "filled" หรือ "standard" ตามต้องการ
                                      className="w-[405px]"
                                    />
                                  ))}
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    sx={{
                                      display: "flex",
                                      // fontWeight: "bold",
                                      color: "black",
                                      fontFamily: "Mitr, sans-serif",
                                      fontStyle: "normal",
                                    }}
                                    variant="h5"
                                  >
                                    LineUp:
                                  </Typography>
                                  {concert.map((concertselect) => (
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        display: "flex",
                                        color: "black",
                                        overflow: "auto",
                                        maxWidth: 650,
                                        maxHeight: 80,
                                        marginLeft: "10px",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h5"
                                    >
                                      {concertselect?.lineup}
                                    </Typography>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    sx={{
                                      display: "flex",
                                      // fontWeight: "bold",
                                      color: "black",
                                      fontFamily: "Mitr, sans-serif",
                                      fontStyle: "normal",
                                    }}
                                    variant="h5"
                                  >
                                    ชนิดประเภทการแสดง:
                                  </Typography>
                                  {concert.map((concertselect) => (
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        display: "flex",
                                        color: "black",
                                        marginLeft: "10px",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h5"
                                    >
                                      {/* ชื่อคอนเสิร์ต */}
                                      {concertselect?.name_type_concert}
                                    </Typography>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    sx={{
                                      display: "flex",
                                      // fontWeight: "bold",
                                      color: "black",
                                      fontFamily: "Mitr, sans-serif",
                                      fontStyle: "normal",
                                    }}
                                    variant="h5"
                                  >
                                    วันที่การแสดง:
                                  </Typography>
                                  {concert.map((concertselect) => (
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        display: "flex",
                                        color: "black",
                                        marginLeft: "10px",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h5"
                                    >
                                      {concertselect?.show_schedule_concert.toString()}
                                    </Typography>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    sx={{
                                      display: "flex",
                                      // fontWeight: "bold",
                                      color: "black",
                                      fontFamily: "Mitr, sans-serif",
                                      fontStyle: "normal",
                                    }}
                                    variant="h5"
                                  >
                                    รายละเอียดของคอนเสิร์ต:
                                  </Typography>
                                  {concert.map((concertselect) => (
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        display: "flex",
                                        maxWidth: 450,
                                        maxHeight: 150,
                                        overflow: "auto",
                                        color: "black",
                                        marginLeft: "10px",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h5"
                                    >
                                      {concertselect?.detail_concert}
                                    </Typography>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <Card
                                    sx={{
                                      maxWidth: 30,
                                      maxHeight: 30,
                                      borderBlockColor: "white",
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      alt="green iguana"
                                      image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fplaceholder.png?alt=media&token=7928f28b-1307-49b6-ae06-36cb8123e5d5"
                                    />
                                  </Card>
                                  <div
                                    style={{
                                      display: "flex",
                                      marginLeft: "5px",
                                      paddingTop: "5px",
                                    }}
                                  >
                                    {concert.map((concertselect) => (
                                      <Typography
                                        gutterBottom
                                        sx={{
                                          display: "flex",
                                          color: "#857878",
                                          overflow: "auto",
                                          maxWidth: 650,
                                          maxHeight: 100,
                                          marginLeft: "10px",
                                          fontFamily: "Mitr, sans-serif",
                                          fontStyle: "normal",
                                        }}
                                        variant="h5"
                                      >
                                        {concertselect?.address_concert}
                                      </Typography>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "20px",
                                marginTop: "30px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 350,
                                  maxWidth: 350,
                                  maxHeight: 900,
                                  borderRadius: 3,
                                  border: 2,
                                  display: "flex",
                                  justifyContent: "start",
                                  flexDirection: "column",
                                  mb: 2,
                                  padding: 1,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        display: "flex",
                                        // fontWeight: "bold",
                                        color: "black",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h4"
                                    >
                                      รอบการแสดง
                                    </Typography>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginRight: "10px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      {editing2 ? (
                                        <>
                                          <Card
                                            className="mr-2"
                                            sx={{ height: 40, border: 1 }}
                                          >
                                            <CardActionArea>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <SaveIcon
                                                  onClick={async () => {
                                                    try {
                                                      if (
                                                        cstidCount.length === 1
                                                      ) {
                                                        // console.log(getshow3);
                                                        if (
                                                          getshow3 == null ||
                                                          gettime3 == ""
                                                        ) {
                                                          window.alert(
                                                            "ข้อมูลวันที่หรือเวลาไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                                          );
                                                        } else {
                                                          if (
                                                            getshow3[0] &&
                                                            getshow3[1] &&
                                                            gettime3 !== ""
                                                          ) {
                                                            const getarrayshow1 =
                                                              getshow3[0]
                                                                ?.get("D")
                                                                .valueOf() || 0;
                                                            const getarrayshow2 =
                                                              getshow3[0]
                                                                ?.get("M")
                                                                .valueOf() || 0;
                                                            const getarrayshow3 =
                                                              getshow3[0]
                                                                ?.get("y")
                                                                .valueOf() || 0;
                                                            const getstr1 = `${getarrayshow3}-${
                                                              getarrayshow2 + 1
                                                            }-${getarrayshow1}`;

                                                            const getarrayshow4 =
                                                              getshow3[1]
                                                                ?.get("D")
                                                                .valueOf() || 0;
                                                            const getarrayshow5 =
                                                              getshow3[1]
                                                                ?.get("M")
                                                                .valueOf() || 0;
                                                            const getarrayshow6 =
                                                              getshow3[1]
                                                                ?.get("y")
                                                                .valueOf() || 0;
                                                            const getstr2 = `${getarrayshow6}-${
                                                              getarrayshow5 + 1
                                                            }-${getarrayshow4}`;

                                                            const getstr3 = `${getstr1} - ${getstr2}`;

                                                            console.log(
                                                              getstr3
                                                            );
                                                            console.log(
                                                              cstidCount[0]
                                                            );
                                                            console.log(
                                                              gettime3
                                                            );

                                                            const resconcert =
                                                              await concertService.updateConcertShowtime(
                                                                concert_ID,
                                                                cstidCount[0].toString(),
                                                                getstr3,
                                                                gettime3
                                                              );
                                                            if (
                                                              resconcert.status ===
                                                              200
                                                            ) {
                                                              window.alert(
                                                                "แก้ไขข้อมูลรอบการแสดงเสร็จสิ้น!!!"
                                                              );
                                                            }
                                                          } else {
                                                            window.alert(
                                                              "ข้อมูลไม่ถูกต้อง โปรดเพิ่มข้อมูลรอบการแสดงใหม่"
                                                            );
                                                          }
                                                          setEditing2(false);
                                                        }
                                                      } else {
                                                        // ตรวจสอบว่าทั้ง getshow และ gettime มีจำนวนเท่ากับ 2
                                                        if (
                                                          getshow.length ===
                                                            2 &&
                                                          gettime.length === 2
                                                        ) {
                                                          for (
                                                            let i = 0;
                                                            i < getshow.length;
                                                            i++
                                                          ) {
                                                            // ตรวจสอบว่าค่า getshow[i] ไม่ใช่ null และ gettime[i] ไม่ใช่ค่าว่าง
                                                            if (
                                                              getshow[i] !==
                                                                null &&
                                                              gettime[
                                                                i
                                                              ].trim() !== ""
                                                            ) {
                                                              let getstr = "";
                                                              const getarrayshow1 =
                                                                getshow[i]
                                                                  ?.get("D")
                                                                  .valueOf() ||
                                                                0;
                                                              const getarrayshow2 =
                                                                getshow[i]
                                                                  ?.get("M")
                                                                  .valueOf() ||
                                                                0;
                                                              const getarrayshow3 =
                                                                getshow[i]
                                                                  ?.get("y")
                                                                  .valueOf() ||
                                                                0;
                                                              getstr = `${getarrayshow3}-${
                                                                getarrayshow2 +
                                                                1
                                                              }-${getarrayshow1}`;

                                                              // แปลงวันที่จาก string ให้เป็น Date
                                                              const parsedDate =
                                                                new Date(
                                                                  getstr
                                                                );

                                                              // ฟังก์ชันสำหรับฟอร์แมทวันที่
                                                              const formatDate =
                                                                (
                                                                  date: Date
                                                                ): string => {
                                                                  const year =
                                                                    date.getFullYear();
                                                                  const month =
                                                                    String(
                                                                      date.getMonth() +
                                                                        1
                                                                    ).padStart(
                                                                      2,
                                                                      "0"
                                                                    ); // เดือนเริ่มที่ 0, ต้อง +1
                                                                  const day =
                                                                    String(
                                                                      date.getDate()
                                                                    ).padStart(
                                                                      2,
                                                                      "0"
                                                                    ); // เพิ่ม 0 ข้างหน้า ถ้าวันหรือเดือนมีแค่หลักเดียว
                                                                  return `${year}-${month}-${day}`;
                                                                };

                                                              // แสดงค่าที่แปลงแล้วใน console
                                                              console.log(
                                                                formatDate(
                                                                  parsedDate
                                                                )
                                                              );
                                                              console.log(
                                                                gettime[i]
                                                              );

                                                              // เรียกใช้งานฟังก์ชันเพื่ออัปเดตข้อมูล
                                                              try {
                                                                const resconcert =
                                                                  await concertService.updateConcertShowtime(
                                                                    concert_ID,
                                                                    cstidCount[
                                                                      i
                                                                    ].toString(),
                                                                    formatDate(
                                                                      parsedDate
                                                                    ),
                                                                    gettime[i]
                                                                  );

                                                                // ตรวจสอบสถานะของ response
                                                                if (
                                                                  resconcert.status ===
                                                                  200
                                                                ) {
                                                                  console.log(
                                                                    resconcert.data
                                                                  );
                                                                  window.alert(
                                                                    "แก้ไขข้อมูลรอบการแสดงเสร็จสิ้น!!!"
                                                                  );
                                                                } else {
                                                                  throw new Error(
                                                                    "ไม่สามารถแก้ไขข้อมูลรอบการแสดงได้"
                                                                  );
                                                                }
                                                              } catch (error) {
                                                                console.error(
                                                                  "Error updating concert:",
                                                                  error
                                                                );
                                                                window.alert(
                                                                  "เกิดข้อผิดพลาดในการแก้ไขข้อมูลรอบการแสดง"
                                                                );
                                                              }
                                                            } else {
                                                              window.alert(
                                                                "โปรดทำการแก้ไขข้อมูลรอบการแสดงอีกครั้ง"
                                                              );
                                                              break; // ออกจากลูปหากพบข้อผิดพลาด
                                                            }
                                                          }
                                                        } else {
                                                          // ถ้า getshow หรือ gettime ไม่เท่ากับ 2 ให้แสดงข้อความเตือน
                                                          window.alert(
                                                            "ข้อมูลไม่ครบถ้วน โปรดตรวจสอบอีกครั้ง"
                                                          );
                                                        }
                                                      }

                                                      setEditing2(false);
                                                    } catch (error) {
                                                      // window.alert(
                                                      //   "โปรดทำการแก้ไขข้อมูลอีกครั้ง"
                                                      // );
                                                      setEditing2(false);
                                                      console.log(error);
                                                    }
                                                  }}
                                                  sx={{
                                                    fontSize: "40px",
                                                    color: "skyblue",
                                                  }}
                                                />
                                              </div>
                                            </CardActionArea>
                                          </Card>
                                        </>
                                      ) : (
                                        <> </>
                                      )}
                                      <Card sx={{ height: 40, border: 1 }}>
                                        <CardActionArea>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            {editing2 ? (
                                              <>
                                                <HighlightOffIcon
                                                  onClick={() =>
                                                    setEditing2(false)
                                                  }
                                                  sx={{
                                                    fontSize: "40px",
                                                    color: "red",
                                                  }}
                                                />
                                              </>
                                            ) : (
                                              <EditIcon
                                                onClick={() =>
                                                  setEditing2(true)
                                                }
                                                sx={{
                                                  fontSize: "40px",
                                                  color: "black",
                                                }}
                                              />
                                            )}
                                          </div>
                                        </CardActionArea>
                                      </Card>
                                    </div>
                                  </div>
                                  {concertShow.length > 0 ? (
                                    <>
                                      {concertShow.map(
                                        (concertselect, index) => (
                                          <>
                                            {editing2 ? (
                                              <>
                                                <div className="flex flex-row  items-center">
                                                  <h1 className="text-xl font-medium pr-3">
                                                    รอบการแสดง
                                                  </h1>

                                                  {cstidCount.length === 1 ? (
                                                    // ถ้าจำนวน CSTID เท่ากับ 1 ใช้ DateRangePicker
                                                    <div className="flex flex-col pl-5 mt-5 items-start">
                                                      <LocalizationProvider
                                                        dateAdapter={
                                                          AdapterDayjs
                                                        }
                                                      >
                                                        <DateRangePicker
                                                          value={getshow3} // ค่าจาก state
                                                          onChange={(e) =>
                                                            setGetShow3(e)
                                                          } // ฟังก์ชันเปลี่ยนค่า
                                                          slots={{
                                                            field:
                                                              SingleInputDateRangeField,
                                                          }}
                                                          slotProps={{
                                                            textField: {
                                                              InputProps: {
                                                                endAdornment: (
                                                                  <Calendar />
                                                                ),
                                                              },
                                                            },
                                                          }}
                                                          disablePast
                                                        />
                                                      </LocalizationProvider>
                                                      <TextField
                                                        sx={{ marginTop: 1 }}
                                                        type="time"
                                                        defaultValue={
                                                          concertselect?.time_show_concert
                                                        }
                                                        value={gettime3}
                                                        onChange={(e) =>
                                                          setGetTime3(
                                                            e.target.value
                                                          )
                                                        }
                                                        variant="outlined"
                                                      />
                                                    </div>
                                                  ) : (
                                                    // ถ้าจำนวน CSTID ไม่เท่ากับ 1 ใช้ DatePicker และ TextField แบบเดิม
                                                    <div
                                                      key={index}
                                                      className="flex flex-col pl-5 mt-5 items-start"
                                                    >
                                                      <LocalizationProvider
                                                        dateAdapter={
                                                          AdapterDayjs
                                                        }
                                                      >
                                                        <DemoContainer
                                                          components={[
                                                            "DatePicker",
                                                          ]}
                                                        >
                                                          <DatePicker
                                                            label="วันที่"
                                                            value={
                                                              getshow[index]
                                                            }
                                                            onChange={(e) =>
                                                              handleDateChange(
                                                                e,
                                                                index
                                                              )
                                                            }
                                                            disablePast
                                                          />
                                                        </DemoContainer>
                                                      </LocalizationProvider>
                                                      <TextField
                                                        sx={{ marginTop: 1 }}
                                                        type="time"
                                                        onChange={(event) =>
                                                          handleTimeChange(
                                                            event,
                                                            index
                                                          )
                                                        } // อัปเดตเวลา
                                                        defaultValue={
                                                          concertselect?.time_show_concert ||
                                                          gettime[index]
                                                        }
                                                        variant="outlined"
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                  }}
                                                >
                                                  <Typography
                                                    gutterBottom
                                                    sx={{
                                                      display: "flex",
                                                      color: "black",
                                                      fontFamily:
                                                        "Mitr, sans-serif",
                                                      fontStyle: "normal",
                                                    }}
                                                    variant="h5"
                                                  >
                                                    วันที่{" "}
                                                    {
                                                      concertselect?.show_concert
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    gutterBottom
                                                    sx={{
                                                      display: "flex",
                                                      marginLeft: "10px",
                                                      color: "#857878",
                                                      fontFamily:
                                                        "Mitr, sans-serif",
                                                      fontStyle: "normal",
                                                    }}
                                                    variant="h5"
                                                  >
                                                    เวลา{" "}
                                                    {
                                                      concertselect?.time_show_concert
                                                    }
                                                  </Typography>
                                                </div>
                                              </>
                                            )}
                                          </>
                                        )
                                      )}
                                    </>
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <p>ยังไม่มีข้อมูลรอบการแสดง</p>
                                    </div>
                                  )}
                                </div>
                              </Box>
                              <div
                                style={{ display: "flex", marginLeft: "10px" }}
                              >
                                <Box
                                  sx={{
                                    width: 350,
                                    maxHeight: 900,
                                    borderRadius: 3,
                                    border: 2,
                                    display: "flex",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    mb: 2,
                                    padding: 2,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography
                                        gutterBottom
                                        sx={{
                                          display: "flex",
                                          // fontWeight: "bold",
                                          color: "black",
                                          fontFamily: "Mitr, sans-serif",
                                          fontStyle: "normal",
                                        }}
                                        variant="h4"
                                      >
                                        ช่องทางการติดต่อ
                                      </Typography>
                                      <div
                                        style={{
                                          display: "flex",
                                          // marginRight: "5px",
                                          marginTop: "5px",
                                        }}
                                      >
                                        {editing3 ? (
                                          <>
                                            <Card
                                              className="mr-2"
                                              sx={{ height: 40, border: 1 }}
                                            >
                                              <CardActionArea>
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  <SaveIcon
                                                    onClick={async () => {
                                                      try {
                                                        console.log(urls.length);
                                                        if (urls.length > 0) {
                                                          for (
                                                            let index = 0;
                                                            index < urls.length;
                                                            index++
                                                          ) {
                                                            console.log(
                                                              urls[index]
                                                            );
                                                            console.log(
                                                              getCCID[index]
                                                            );
                                                            // const addUrl = urls[index];
                                                            const ccid =
                                                              getCCID[index];
  
                                                            const resconcert =
                                                              await concertService.updateConcertChannel(
                                                                concert_ID,
                                                                ccid.toString(),
                                                                urls[index]
                                                              );
                                                            console.log(
                                                              resconcert.status
                                                            );
                                                          }
                                                          window.alert(
                                                            "แก้ไขข้อมูลช่องทางการติดต่อเสร็จสิ้น!!!"
                                                          );
                                                        } else {
                                                          window.alert(
                                                            "แก้ไขข้อมูลช่องทางการติดต่อไม่สำเร็จ โปรดดำเนินการแก้ไขอีกครั้ง"
                                                          );
                                                        }
                                                        setEditing3(false);
                                                      } catch (error) {
                                                        setEditing3(false);
                                                        console.log(error);
                                                      }
                                                    }}
                                                    sx={{
                                                      fontSize: "40px",
                                                      color: "skyblue",
                                                    }}
                                                  />
                                                </div>
                                              </CardActionArea>
                                            </Card>
                                          </>
                                        ) : (
                                          <> </>
                                        )}
                                        <Card sx={{ height: 40, border: 1 }}>
                                          <CardActionArea>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              {editing3 ? (
                                                <>
                                                  <HighlightOffIcon
                                                    onClick={() =>
                                                      setEditing3(false)
                                                    }
                                                    sx={{
                                                      fontSize: "40px",
                                                      color: "red",
                                                    }}
                                                  />
                                                </>
                                              ) : (
                                                <EditIcon
                                                  onClick={() =>
                                                    setEditing3(true)
                                                  }
                                                  sx={{
                                                    fontSize: "40px",
                                                    color: "black",
                                                  }}
                                                />
                                              )}
                                            </div>
                                          </CardActionArea>
                                        </Card>
                                      </div>
                                    </div>
                                    {editing3 ? (
                                      <>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          {concertChannel &&
                                          concertChannel.length > 0 ? (
                                            <>
                                              {/* ถ้ามีข้อมูลใน concertChannel แสดงข้อมูลที่มี และสร้าง TextField ที่ขาดให้ครบ 3 */}
                                              {concertChannel.map(
                                                (concertselect, index) => (
                                                  <div
                                                    key={index}
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      marginBottom: 10,
                                                    }}
                                                  >
                                                    <TextField
                                                      placeholder={
                                                        concertselect.channel
                                                      }
                                                      className="w-[200px] mb-5"
                                                      label="Url"
                                                      variant="outlined"
                                                      value={urls[index] || ""}
                                                      onChange={(e) =>
                                                        handleUrlChange(
                                                          index,
                                                          e
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                )
                                              )}
                                              {/* เติม TextField ให้ครบ 3 ถ้าข้อมูลไม่ถึง */}
                                              {[
                                                ...Array(
                                                  3 - concertChannel.length
                                                ),
                                              ].map((_, idx) => (
                                                <div
                                                  key={
                                                    concertChannel.length + idx
                                                  }
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    marginBottom: 10,
                                                  }}
                                                >
                                                  <TextField
                                                    className="w-[200px] mb-5"
                                                    label="Url"
                                                    variant="outlined"
                                                    value={
                                                      urls[
                                                        concertChannel.length +
                                                          idx
                                                      ] || ""
                                                    }
                                                    onChange={(e) =>
                                                      handleUrlChange(
                                                        concertChannel.length +
                                                          idx,
                                                        e
                                                      )
                                                    }
                                                  />
                                                </div>
                                              ))}
                                            </>
                                          ) : (
                                            <>
                                              {/* ถ้าไม่มีข้อมูลใน concertChannel ให้สร้าง TextField 3 ช่อง */}
                                              {[...Array(3)].map((_, idx) => (
                                                <div
                                                  key={idx}
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    marginBottom: 10,
                                                  }}
                                                >
                                                  <TextField
                                                    className="w-[200px] mb-5"
                                                    label="Url"
                                                    variant="outlined"
                                                    value={urls[idx] || ""}
                                                    onChange={(e) =>
                                                      handleUrlChange(idx, e)
                                                    }
                                                  />
                                                </div>
                                              ))}
                                            </>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {/* แสดงข้อมูลแบบลิงก์เมื่อไม่ได้อยู่ในโหมดแก้ไข */}
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          {concertChannel.length > 0 ? (
                                            <>
                                              <Grid
                                                container
                                                spacing={2}
                                                sx={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  overflow: "auto",
                                                  maxHeight: 250,
                                                  maxWidth: 350,
                                                }}
                                              >
                                                {concertChannel.map(
                                                  (concertselect, index) => (
                                                    <Grid item key={index}>
                                                      <Link
                                                        href={
                                                          concertselect?.channel
                                                        }
                                                        sx={{
                                                          color: "#3A3A3A",
                                                          "&:hover": {
                                                            color: "#3A3A3A",
                                                          },
                                                        }}
                                                        underline="hover"
                                                      >
                                                        -{" "}
                                                        {concertselect?.channel}
                                                      </Link>
                                                    </Grid>
                                                  )
                                                )}
                                              </Grid>
                                            </>
                                          ) : (
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <p>ยังไม่มีข้อมูลช่องการติดต่อ</p>
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </Box>
                              </div>
                            </div>
                          </Box>
                        </div>
                      </div>
                    </Box>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "50px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 1250,
                        height: 400,
                        maxHeight: 900,
                        borderRadius: 3,
                        border: 2,
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                        marginBottom: "50px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          marginLeft: "20px",
                        }}
                      >
                        <Typography
                          gutterBottom
                          sx={{
                            display: "flex",
                            marginTop: "5px",
                            // fontWeight: "bold",
                            color: "black",
                            fontFamily: "Mitr, sans-serif",
                            fontStyle: "normal",
                          }}
                          variant="h4"
                        >
                          ข้อมูลตั๋ว
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          // marginTop: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "10px",
                          }}
                        >
                          <TableContainer
                            component={Paper}
                            sx={{
                              marginTop: "10px",
                              height: 300,
                              maxHeight: 300,
                              width: 1200,
                              maxWidth: 1200,
                              border: 2,
                              borderRadius: 2,
                            }}
                          >
                            {concertTicket.length > 0 ? (
                              <>
                                <Table aria-label="room information table">
                                  {" "}
                                  {editing4 ? (
                                    <>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>โซนที่นั่ง</TableCell>
                                          <TableCell>ราคาตั๋ว</TableCell>
                                          <TableCell>ชนิดตั๋ว</TableCell>
                                          <TableCell>วันที่การแสดง</TableCell>
                                          <TableCell>เวลา</TableCell>
                                          <TableCell>
                                            บันทึกข้อมูลตั๋ว
                                          </TableCell>
                                          <TableCell>แก้ไขข้อมูลตั๋ว</TableCell>
                                        </TableRow>
                                      </TableHead>
                                    </>
                                  ) : (
                                    <>
                                      <TableCell>โซนที่นั่ง</TableCell>
                                      <TableCell>ราคาตั๋ว</TableCell>
                                      <TableCell>ชนิดตั๋ว</TableCell>
                                      <TableCell>วันที่การแสดง</TableCell>
                                      <TableCell>เวลา</TableCell>
                                      <TableCell>แก้ไขข้อมูลตั๋ว</TableCell>
                                    </>
                                  )}
                                  <TableBody>
                                    {concertTicket.map((concertselect) => (
                                      <>
                                        {editing4 ? (
                                          <>
                                            <TableRow>
                                              <TableCell>
                                                <TextField
                                                  label="โซนที่นั่ง"
                                                  defaultValue={
                                                    concertselect?.ticket_zone
                                                  }
                                                  onChange={(e) =>
                                                    setTicket_zone(
                                                      e.target.value
                                                    )
                                                  }
                                                  variant="outlined"
                                                  className="w-[100px]"
                                                />
                                              </TableCell>
                                              <TableCell>
                                                <TextField
                                                  label="	ราคาตั๋ว"
                                                  type="number"
                                                  onChange={handlePrice}
                                                  defaultValue={
                                                    concertselect?.price
                                                  }
                                                  inputProps={{ min: 1 }}
                                                  variant="outlined"
                                                  className="w-[100px]"
                                                />
                                              </TableCell>
                                              <TableCell>
                                                <TextField
                                                  id="outlined-select-currency"
                                                  className="w-[200px]"
                                                  select
                                                  value={ticket_type}
                                                  onChange={(e) =>
                                                    setTicket_Type(
                                                      Number(e.target.value)
                                                    )
                                                  }
                                                  defaultValue={
                                                    concertselect.type_ticket_ID
                                                  }
                                                  label="	ชนิดตั๋ว"
                                                >
                                                  <MenuItem value={1}>
                                                    ตั๋วเข้าชมทั่วไป (General
                                                    Admission / GA)
                                                  </MenuItem>
                                                  <MenuItem value={2}>
                                                    ตั๋ววีไอพี (VIP Ticket)
                                                  </MenuItem>
                                                  <MenuItem value={3}>
                                                    ตั๋วหน้าเวที (Front Row /
                                                    Pit Ticket)
                                                  </MenuItem>
                                                  <MenuItem value={4}>
                                                    ตั๋วโซนพิเศษ (Premium Zone
                                                    Ticket)
                                                  </MenuItem>
                                                  <MenuItem value={5}>
                                                    ตั๋วที่นั่งสำรอง (Reserved
                                                    Seating)
                                                  </MenuItem>
                                                  <MenuItem value={6}>
                                                    ตั๋วเข้าชมก่อน (Early Entry
                                                    Ticket)
                                                  </MenuItem>
                                                  <MenuItem value={7}>
                                                    ตั๋วเข้าชมคอนเสิร์ตออนไลน์
                                                    (Virtual Concert Ticket)
                                                  </MenuItem>
                                                </TextField>
                                              </TableCell>
                                              <TableCell>
                                                {concertselect?.show_concert.toString()}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  concertselect?.time_show_concert
                                                }
                                              </TableCell>
                                              <TableCell>
                                                <Button
                                                  variant="contained"
                                                  style={{
                                                    backgroundColor: "#343434",
                                                  }}
                                                  sx={{
                                                    width: "150px",
                                                    borderRadius: "10px",
                                                  }}
                                                  startIcon={<SaveIcon />}
                                                  onClick={async () => {
                                                    try {
                                                      if (
                                                        ticket_zone.trim() ===
                                                        ""
                                                      ) {
                                                        window.alert(
                                                          "โซนที่นั่งไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                                        );
                                                      } else {
                                                        if (
                                                          price === "" ||
                                                          (Number(price) < 1 &&
                                                            !price.includes(
                                                              "-"
                                                            ))
                                                        ) {
                                                          window.alert(
                                                            "ราคาไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                                          );
                                                        } else {
                                                          const resconcert =
                                                            await concertService.updateConcertTicket(
                                                              ticket_ID,
                                                              concert_ID,
                                                              ticket_type.toString(),
                                                              ticket_zone,
                                                              price
                                                            );
                                                          if (
                                                            resconcert.status ===
                                                            200
                                                          ) {
                                                            window.alert(
                                                              "แก้ไขข้อมูลตั๋วเสร็จสิ้น!!!"
                                                            );
                                                            console.log(
                                                              resconcert.data
                                                            );
                                                            setEditing4(false);
                                                          } else {
                                                            window.alert(
                                                              "โปรดทำการแก้ไขข้อมูลตั๋วอีกครั้ง"
                                                            );
                                                          }
                                                        }
                                                      }
                                                    } catch (error) {
                                                      setEditing4(false);
                                                      console.log(error);
                                                    }
                                                  }}
                                                >
                                                  บันทึกข้อมูล
                                                </Button>
                                              </TableCell>
                                              <TableCell>
                                                <Button
                                                  variant="contained"
                                                  style={{
                                                    backgroundColor:
                                                      "chocolate",
                                                  }}
                                                  sx={{
                                                    width: "200px",
                                                    borderRadius: "10px",
                                                  }}
                                                  startIcon={
                                                    <HighlightOffIcon
                                                      sx={{ color: "white" }}
                                                    />
                                                  }
                                                  onClick={() =>
                                                    handleGetOutTicketID()
                                                  }
                                                >
                                                  ยกเลิกการแก้ไข
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          </>
                                        ) : (
                                          <>
                                            <TableRow>
                                              <TableCell>
                                                {concertselect?.ticket_zone}
                                              </TableCell>
                                              <TableCell>
                                                {concertselect?.price}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  concertselect?.name_type_ticket
                                                }
                                              </TableCell>
                                              <TableCell>
                                                {concertselect?.show_concert.toString()}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  concertselect?.time_show_concert
                                                }
                                              </TableCell>
                                              <TableCell>
                                                <Button
                                                  variant="contained"
                                                  style={{
                                                    backgroundColor: "#343434",
                                                  }}
                                                  sx={{
                                                    // width: "100px",
                                                    borderRadius: "10px",
                                                  }}
                                                  startIcon={<EditIcon />}
                                                  onClick={() =>
                                                    handleGetTicketID(
                                                      concertselect?.CTID
                                                    )
                                                  }
                                                >
                                                  แก้ไขข้อมูลของตั๋ว
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          </>
                                        )}
                                      </>
                                    ))}
                                  </TableBody>
                                </Table>
                              </>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: "150px",
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
                </>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p>ยังไม่มีข้อมูลคอนเสิร์ต โปรดดำเนินการเลือกข้อมูลคอนเสิร์ต</p>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>ยังไม่มีข้อมูลคอนเสิร์ต โปรดดำเนินการเพิ่มข้อมูลคอนเสิร์ต</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default CheckDataConcertPage;
