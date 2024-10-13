import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
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
  Typography,
} from "@mui/material";
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
                maxHeight: 900,
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
                      // maxHeight: 900,
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
                            <Card sx={{ height: 55, border: 1 }}>
                              <CardActionArea>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <EditIcon sx={{ fontSize: "50px" }} />
                                </div>
                              </CardActionArea>
                            </Card>
                          </div>
                        </>
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
                            color: "black",
                            overflow: "auto",
                            maxWidth: 450,
                            maxHeight: 250,
                            marginLeft: "10px",
                            fontFamily: "Mitr, sans-serif",
                            fontStyle: "normal",
                          }}
                          variant="h5"
                        >
                          {/* Pre-sale วันจันทร์ที่ 19 มิถุนายน 2566 เวลา 10:00
                          เปิดจำหน่ายวันอังคารที่ 20 มิถุนายน 2566 เวลา 10:00
                          วันศุกร์ที่ 30 มิถุนายน 2566, 10:00 น.
                          บัตรมีจำนวนจำกัด ณ สถานที่สนามกีฬา มภร มหาสารคาม */}
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "50px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 350,
                          height: 200,
                          // maxHeight: 900,
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
                              <Card sx={{ height: 45, border: 1 }}>
                                <CardActionArea
                                // onClick={navigateToEditDataHotelPage}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <EditIcon sx={{ fontSize: "40px" }} />
                                  </div>
                                </CardActionArea>
                              </Card>
                            </div>
                          </div>
                          {concertShow.map((concertselect) => (
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
                          ))}
                        </div>
                      </Box>
                      <div style={{ display: "flex", marginLeft: "10px" }}>
                        <Box
                          sx={{
                            width: 350,
                            height: 200,
                            // maxHeight: 900,
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
                                <Card sx={{ height: 45, border: 1 }}>
                                  <CardActionArea
                                  // onClick={navigateToEditDataHotelPage}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <EditIcon sx={{ fontSize: "40px" }} />
                                    </div>
                                  </CardActionArea>
                                </Card>
                              </div>
                            </div>
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
                      <TableHead>
                        <TableRow>
                          <TableCell>โซนที่นั่ง</TableCell>
                          <TableCell>ราคาตั๋ว</TableCell>
                          <TableCell>ชนิดตั๋ว</TableCell>
                          <TableCell>วันที่การแสดง</TableCell>
                          <TableCell>เวลา</TableCell>
                          <TableCell>แก้ไขข้อมูลห้อง</TableCell>
                          <TableCell>ลบข้อมูลห้อง</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {concertTicket.map((concertselect) => (
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
