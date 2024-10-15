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
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetConcertByUserIDRes } from "../../../model/Response/Concert/GetConcertByUserIDRes";
import { ConcertService } from "../../../service/concertService";
import { Box } from "@mui/system";
import { GetConcertByCIDRes } from "../../../model/Response/Concert/GetConcertByCIDRes";
import { GetConcertChannelByCIDRes } from "../../../model/Response/Concert/GetConcertChannelByCIDRes";
import { GetConcertShowByCIDRes } from "../../../model/Response/Concert/GetConcertShowByCIDRes";
import { GetConcertTicketByCIDRes } from "../../../model/Response/Concert/GetConcertTicketByCIDRes";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
function CheckDataConcertPage() {
  const concertService = new ConcertService();
  const [concertAll, setConcertAll] = useState<GetConcertByUserIDRes[]>([]);
  const [concert, setConcert] = useState<GetConcertByCIDRes[]>([]);
  // const [val, setVal] = useState(0);
  const [concertChannel, setConcertChannel] = useState<
    GetConcertChannelByCIDRes[]
  >([]);
  const [concertShow, setConcertShow] = useState<GetConcertShowByCIDRes[]>([]);
  const [concertTicket, setConcertTicket] = useState<
    GetConcertTicketByCIDRes[]
  >([]);
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [concert_ID, setConcert_ID] = useState("");
  const [editing1, setEditing1] = useState(false);
  const [editing2, setEditing2] = useState(false);
  const [editing3, setEditing3] = useState(false);
  const [editing4, setEditing4] = useState(false);
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
              ตรวจสอบข้อมูล
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <FormControl sx={{ ml: 15, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
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
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                        width={340}
                        height={450}
                        className="rounded-lg"
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      width: 350,
                      height: 350,
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
                        height={350}
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
                              color: "black",
                              fontFamily: "Mitr, sans-serif",
                              fontStyle: "normal",
                            }}
                            variant="h4"
                          >
                            {concertselect.name_concert}
                          </Typography>
                          <div style={{ display: "flex", marginRight: "10px" }}>
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
                                        onClick={() => setEditing1(false)}
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
                                        onClick={() => setEditing1(false)}
                                        sx={{ fontSize: "40px", color: "red" }}
                                      />
                                    </>
                                  ) : (
                                    <EditIcon
                                      onClick={() => setEditing1(true)}
                                      sx={{ fontSize: "40px", color: "black" }}
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
                              className="w-[600px]"
                              label="LineUp"
                              variant="outlined"
                              defaultValue={concertselect?.lineup}
                            />
                          ))}
                        </div>
                        <div className="flex flex-row pl-5 mt-5 items-center">
                          <h1 className="text-2xl font-medium pr-3">
                            ชนิดประเภทการแสดง :
                          </h1>
                          {concert.map((concertselect) => (
                            <TextField
                              id="outlined-select-currency"
                              className="w-[465px]"
                              select
                              defaultValue={concertselect.concert_type_ID}
                              label="ชนิดประเภทการแสดง"
                              // defaultValue="EUR"
                            >
                              <MenuItem value={1}>
                                คอนเสิร์ตเดี่ยว (Solo Concert)
                              </MenuItem>
                              <MenuItem value={2}>
                                คอนเสิร์ตรวมศิลปิน (Music Festival/All-Star
                                Concert)
                              </MenuItem>
                              <MenuItem value={3}>
                                คอนเสิร์ตการกุศล (Charity Concert)
                              </MenuItem>
                            </TextField>
                          ))}
                        </div>
                        <div className="flex flex-row pl-5 mt-5 items-center">
                          <h1 className="text-2xl font-medium pr-3">
                            วันที่การแสดง :
                          </h1>

                          {concert.map((concertselect) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                              >
                                <DatePicker
                                  label="วันที่การแสดง"
                                  value={dayjs(
                                    concertselect?.datetime_add_concert
                                  )}
                                  // onChange={(newValue) => setValue(newValue)}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
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
                              image="src\img\placeholder.png"
                            />
                          </Card>

                          {concert.map((concertselect) => (
                            <TextField
                              label="Address Concert"
                              multiline
                              rows={4} // กำหนดจำนวนแถวที่จะแสดง
                              defaultValue={concertselect?.address_concert}
                              variant="outlined" // หรือจะใช้ "filled" หรือ "standard" ตามต้องการ
                              className="w-[465px]"
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
                              image="src\img\placeholder.png"
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
                                {/* ที่อยู่คอนเสิร์ต Pre-sale วันจันทร์ที่ 19 มิถุนายน
                            2566 เวลา 10:00 เปิดจำหน่ายวันอังคารที่ 20 มิถุนายน
                            2566 เวลา 10:00 วันศุกร์ที่ 30 มิถุนายน 2566, 10:00
                            น. บัตรมีจำนวนจำกัด ณ สถานที่สนามกีฬา มภร มหาสารคาม */}
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
                          // height: 300,
                          maxHeight: 900,

                          borderRadius: 3,
                          border: 2,
                          display: "flex",
                          justifyContent: "start",
                          flexDirection: "column",
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
                                          onClick={() => setEditing2(false)}
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
                                          onClick={() => setEditing2(false)}
                                          sx={{
                                            fontSize: "40px",
                                            color: "red",
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <EditIcon
                                        onClick={() => setEditing2(true)}
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
                          {concertShow.map((concertselect) => (
                            <>
                              {editing2 ? (
                                <>
                                  <div className="flex flex-row  items-center">
                                    <h1 className="text-xl font-medium pr-3">
                                      รอบการแสดง
                                    </h1>
                                    <div className="flex flex-col pl-5 mt-5 items-start">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DemoContainer
                                          components={["DatePicker"]}
                                        >
                                          <DatePicker
                                            label="วันที่"
                                            value={dayjs(
                                              concertselect?.show_concert
                                            )}
                                            // onChange={(newValue) => setValue(newValue)}
                                          />
                                        </DemoContainer>
                                      </LocalizationProvider>
                                      <TextField
                                        sx={{ marginTop: 1 }}
                                        type="time"
                                        defaultValue={
                                          concertselect?.time_show_concert
                                        }
                                        variant="outlined"
                                      />
                                    </div>
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
                                        // fontWeight: "bold",
                                        color: "black",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h5"
                                    >
                                      วันที่ {concertselect?.show_concert}
                                    </Typography>
                                    <Typography
                                      gutterBottom
                                      sx={{
                                        display: "flex",
                                        // fontWeight: "bold",
                                        marginLeft: "10px",
                                        color: "#857878",
                                        fontFamily: "Mitr, sans-serif",
                                        fontStyle: "normal",
                                      }}
                                      variant="h5"
                                    >
                                      เวลา {concertselect?.time_show_concert}
                                    </Typography>
                                  </div>
                                </>
                              )}
                            </>
                          ))}
                        </div>
                      </Box>
                      <div style={{ display: "flex", marginLeft: "10px" }}>
                        <Box
                          sx={{
                            width: 350,
                            // height: 200,
                            maxHeight: 900,
                            borderRadius: 3,
                            border: 2,
                            display: "flex",
                            justifyContent: "start",
                            flexDirection: "column",
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
                                รอบการแสดง
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  marginRight: "10px",
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
                                            onClick={() => setEditing3(false)}
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
                                            onClick={() => setEditing3(false)}
                                            sx={{
                                              fontSize: "40px",
                                              color: "red",
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          onClick={() => setEditing3(true)}
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
                                  {concertChannel.map((concertselect) => (
                                    <div
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
                                        defaultValue={concertselect?.url}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    // flexDirection: "column",
                                  }}
                                >
                                  <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      overflow: "auto",
                                      maxHeight: 150,
                                      maxWidth: 350,
                                    }}
                                  >
                                    {concertChannel.map((concertselect) => (
                                      <Grid item>
                                        <Link
                                          sx={{
                                            color: "#3A3A3A",
                                            "&:hover": {
                                              color: "#3A3A3A",
                                            },
                                          }}
                                          underline="hover"
                                        >
                                          {concertselect?.url}
                                        </Link>
                                      </Grid>
                                    ))}
                                  </Grid>
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
                              <TableCell>บันทึกข้อมูลห้อง</TableCell>
                              <TableCell>แก้ไขข้อมูลห้อง</TableCell>

                              <TableCell>ลบข้อมูลห้อง</TableCell>
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
                          <TableCell>แก้ไขข้อมูลห้อง</TableCell>

                          <TableCell>ลบข้อมูลห้อง</TableCell>
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
                                      defaultValue={concertselect?.ticket_zone}
                                      variant="outlined"
                                      className="w-[100px]"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      label="	ราคาตั๋ว"
                                      defaultValue={concertselect?.price}
                                      variant="outlined"
                                      className="w-[100px]"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      id="outlined-select-currency"
                                      className="w-[200px]"
                                      select
                                      value={concertselect.type_ticket_ID}
                                      label="	ชนิดตั๋ว"
                                      // defaultValue="EUR"
                                    >
                                      <MenuItem value={1}>
                                        ตั๋วเข้าชมทั่วไป (General Admission /
                                        GA)
                                      </MenuItem>
                                      <MenuItem value={2}>
                                        ตั๋ววีไอพี (VIP Ticket)
                                      </MenuItem>
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
                                        ตั๋วเข้าชมคอนเสิร์ตออนไลน์ (Virtual
                                        Concert Ticket)
                                      </MenuItem>
                                    </TextField>
                                  </TableCell>
                                  <TableCell>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DemoContainer
                                        components={["DatePicker"]}
                                      >
                                        <DatePicker
                                          label="วันที่"
                                          value={dayjs(
                                            concertselect?.show_concert
                                          )}
                                          // onChange={(newValue) => setValue(newValue)}
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      sx={{ marginTop: 1 }}
                                      type="time"
                                      defaultValue={
                                        concertselect?.time_show_concert
                                      }
                                      variant="outlined"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      style={{ backgroundColor: "#343434" }}
                                      sx={{
                                        width: "150px",
                                        borderRadius: "10px",
                                      }}
                                      startIcon={<SaveIcon />}
                                      onClick={() => setEditing4(true)}
                                    >
                                      บันทึกข้อมูล
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      style={{ backgroundColor: "chocolate" }}
                                      sx={{
                                        width: "200px",
                                        borderRadius: "10px",
                                      }}
                                      startIcon={
                                        <HighlightOffIcon
                                          sx={{ color: "white" }}
                                        />
                                      }
                                      onClick={() => setEditing4(false)}
                                    >
                                      ยกเลิกการแก้ไข
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      style={{ backgroundColor: "red" }}
                                      sx={{
                                        width: "200px",
                                        borderRadius: "10px",
                                      }}
                                      startIcon={<DeleteIcon />}
                                    >
                                      ลบข้อมูลตั๋ว
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
                                  <TableCell>{concertselect?.price}</TableCell>
                                  <TableCell>
                                    {concertselect?.name_type_ticket}
                                  </TableCell>
                                  <TableCell>
                                    {concertselect?.show_concert.toString()}
                                  </TableCell>
                                  <TableCell>
                                    {concertselect?.time_show_concert}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      style={{ backgroundColor: "#343434" }}
                                      sx={{
                                        // width: "100px",
                                        borderRadius: "10px",
                                      }}
                                      startIcon={<EditIcon />}
                                      onClick={() => setEditing4(true)}
                                    >
                                      แก้ไขข้อมูลของตั๋ว
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      style={{ backgroundColor: "red" }}
                                      sx={{
                                        // width: "100px",
                                        borderRadius: "10px",
                                      }}
                                      startIcon={<DeleteIcon />}
                                    >
                                      ลบข้อมูลตั๋ว
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </>
                            )}
                          </>
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
    </>
  );
}
export default CheckDataConcertPage;
