import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  // ImageList,
  // ImageListItem,
  InputLabel,
  Link,
  // MenuItem,
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
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
// import { HotelService } from "../../../service/hotelService";
// import { RoomHotelService } from "../../../service/roomHotelService";
// import { 
//   useEffect,
//    useState } from "react";
// import { HotelGetByIDRes } from "../../../model/Response/Hotel/HotelGetByIDRes";
// import { RoomGetByHotelIDRes } from "../../../model/Response/Hotel/RoomGetByHotelIDRes";
// import { HotelURLGetByHotelIDRes } from "../../../model/Response/Hotel/HotelUrlGetByHotelIDRes";
// import { HotelImageGetByHotelIDRes } from "../../../model/Response/Hotel/HotelImageGetByHotelIDRes";
// import { HotelGetByHIDRes } from "../../../model/Response/Hotel/HotelGetByHIDRes";


function CheckDataHotelPage() {
  // const hotelService = new HotelService();
  // const roomHotelService = new RoomHotelService();
  // const [hotelAlls, setHotelAll] = useState<HotelGetByIDRes[]>([]);
  // const [hotel, setHotel] = useState<HotelGetByHIDRes[]>([]);
  // const [hotelUrl, setHotelUrl] = useState<HotelURLGetByHotelIDRes[]>([]);
  // const [hotelImage, setHotelImage] = useState<HotelImageGetByHotelIDRes[]>([]);
  // const [rooms, setRoom] = useState<RoomGetByHotelIDRes[]>([]);
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  // const [Hotel_ID, setHotel_ID] = useState("");

  // useEffect(() => {
  //   const loadDataAsync = async () => {
  //     const res = await hotelService.getHotelByUid(user?.uid);
  //     const data: HotelGetByIDRes[] = res.data;
  //     setHotelAll(data);

  //     // const resRoom = await roomHotelService.getRoomByHotelID()
  //   };
  //   loadDataAsync();
  // },[]);

  // useEffect(() => {
  //   const loadDataHotelAsync = async () => {
  //     const resHotel = await hotelService.getShowHotelByHid(Hotel_ID);
  //     const data: HotelGetByHIDRes[] = resHotel.data;
  //     setHotel(data);

  //     const resUrl = await hotelService.getHotelUrlByHid(Hotel_ID);
  //     const dataUrl: HotelURLGetByHotelIDRes[] =  resUrl.data;
  //     setHotelUrl(dataUrl);

  //     const resImage = await hotelService.getHotelImageByHid(Hotel_ID);
  //     const dataImage: HotelImageGetByHotelIDRes[] = resImage.data;
  //     setHotelImage(dataImage);

  //     const resRoom = await roomHotelService.getRoomByHotelID(Hotel_ID);
  //     const dataRoom: RoomGetByHotelIDRes[] = resRoom.data;
  //     setRoom(dataRoom);
  //   }
  //   loadDataHotelAsync();
  // },[]);

  function navigateToEditDataHotelPage() {
    navigate("/EditDataHotel");
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
      <div className="checkdatahotel-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "120px",
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
              ตรวจสอบข้อมูล
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <FormControl sx={{ ml: 15, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                เลือกโรงแรม
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                // value={age}
                // onChange={(e) => setHotel_ID(String(e.target.value))}
                sx={{ borderRadius: 20 }}
                autoWidth
              >
                {/* {hotelAlls.map((hotel, index) => (
                    <MenuItem value={hotel.HID}>
                      {1 + index} - {hotel.name}
                    </MenuItem>
                  ))} */}
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
                borderRadius: 3,
                // bgcolor: "#D9D9D9",
                border: 2,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              {/* {hotel.map((hotel, index) =>(
              <>
              
              </>
            ))} */}
              <div
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  marginTop: "10px",
                  justifyContent: "space-between",
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
                  {/* {hotel} */}
                </Typography>
                <div style={{ display: "flex", marginRight: "10px" }}>
                  <Card sx={{ height: 55, border: 1 }}>
                    <CardActionArea onClick={navigateToEditDataHotelPage}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <EditIcon sx={{ fontSize: "50px" }} />
                      </div>
                      {/* <CardContent></CardContent> */}
                    </CardActionArea>
                  </Card>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "20px",
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
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      // fontWeight: "bold",
                      color: "#857878",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                    }}
                    // variant="h6"
                  >
                    ที่อยู่
                  </Typography>
                </div>
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
                    width: 520,
                    height: 470,
                    borderRadius: 3,
                    // bgcolor: "#D9D9D9",
                    border: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // flexDirection: "column",
                  }}
                >
                  {/* <Card
                    sx={{
                      maxWidth: 500,
                      // height:150
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      alt="green iguana"
                      image="src\img\webteemi.png"
                    />
                  </Card> */}
                  {/* <ImageList
                    sx={{
                      maxWidth: 500,
                      height: 455,
                      maxHeight: 455,
                      marginTop: "5px",
                      marginLeft: "5px",
                      borderRadius: 3,
                    }}
                    variant="woven"
                    cols={3}
                    gap={6}
                    rowHeight={"auto"}
                  >
                    {hotelImage.map((item) => (
                      // <ImageListItem key={item.img}>
                      //   <img
                      //     srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      //     src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      //     alt={item.title}
                      //     loading="lazy"
                      //   />
                      // </ImageListItem>

                      <ImageListItem key={item?.url_image}>
                        <img
                          srcSet={`${item?.url_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          src={`${item?.url_image}?w=248&fit=crop&auto=format`}
                          alt={`${item?.HIMGID}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList> */}
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  marginLeft: "20px",
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
                  ชนิดโรงแรม :
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  marginLeft: "20px",
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
                  รายละเอียดของโรงแรม
                </Typography>
                <Divider sx={{ width: "550px", border: 1 }} />
                <div style={{ display: "flex", marginTop: "5px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      border: 2,
                      borderColor: "black",
                      borderRadius: 2,
                      color: "#857878",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      overflow: "auto",
                      maxHeight: "200px",
                      maxWidth: "1200px",
                    }}
                    // variant="h5"
                  >
                    Our hotel boasts a prime location in the very heart of the
                    city, offering guests an unbeatable blend of convenience and
                    comfort. Situated just steps away from some of the city’s
                    most iconic landmarks, you’ll find yourself immersed in the
                    vibrant energy of the urban landscape. Whether you're
                    exploring historic sites, attending a conference, or
                    enjoying a leisurely vacation, our central position makes it
                    easy to navigate the city. The surrounding neighborhood is a
                    bustling hub of activity, with an eclectic mix of
                    restaurants, cafes, and boutiques just around the corner.
                    Whether you're in the mood for fine dining, a casual coffee,
                    or a shopping spree, you’ll find plenty of options to suit
                    your tastes and preferences. For those traveling by public
                    transportation, the hotel is ideally located near major bus
                    and subway lines, providing quick and easy access to all
                    parts of the city. If you're driving, we offer convenient
                    access to major highways, and there is ample parking
                    available nearby for our guests. After a day of exploring or
                    meetings, retreat to the tranquility of our hotel, where
                    modern amenities and comfortable accommodations await. Our
                    commitment to service ensures that your stay is as pleasant
                    and stress-free as possible, making our hotel the perfect
                    choice for both business and leisure travelers.
                  </Typography>
                </div>
              </div>
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginLeft: "110px",
              justifyContent: "start",
            }}
          >
            <Box
              sx={{
                width: 550,
                height: 300,
                borderRadius: 3,
                // bgcolor: "#D9D9D9",
                border: 2,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginLeft: "10px",
                  marginTop: "10px",
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
                  ช่องทางการติดต่อ
                </Typography>
              </div>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: 500,
                    height: 230,
                    maxHeight: 230,
                    borderRadius: 3,
                    // bgcolor: "#D9D9D9",
                    border: 1,
                    overflow: "auto",
                    justifyContent: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    <Grid container spacing={2}>
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
                          Booking.com
                        </Link>
                      </Grid>
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
                          Agoda.com
                        </Link>
                      </Grid>
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
                          Trip.com
                        </Link>
                      </Grid>
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
                          TripAdvisor.com
                        </Link>
                      </Grid>
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
                          Traveloka.com
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </div>
            </Box>
          </div>
          <div
            style={{ display: "flex", marginTop: "20px", marginLeft: "110px" }}
          >
            <Box
              sx={{
                width: 1250,
                // height: 400,
                maxHeight: 400,
                paddingBottom: 1,
                borderRadius: 3,
                // bgcolor: "#D9D9D9",
                border: 2,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginLeft: "10px",
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
                  ข้อมูลห้อง
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    // marginTop: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <TableContainer
                    component={Paper}
                    sx={{
                      marginTop: "10px",
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
                          <TableCell>ชนิดห้องพัก</TableCell>
                          <TableCell>วิวของห้อง</TableCell>
                          <TableCell>ราคาห้องต่อคืน</TableCell>
                          <TableCell>จำนวนคนเข้าพัก</TableCell>
                          <TableCell>สถานะของห้อง</TableCell>
                          <TableCell>แก้ไขข้อมูลห้อง</TableCell>
                          <TableCell>ลบข้อมูลห้อง</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Twin Bedded Room</TableCell>
                          <TableCell>วิวเมือง</TableCell>
                          <TableCell>1750</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>ว่าง</TableCell>
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
                              รายละเอียดของห้อง
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
                              ลบข้อมูลห้อง
                            </Button>
                          </TableCell>
                        </TableRow>
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
export default CheckDataHotelPage;
