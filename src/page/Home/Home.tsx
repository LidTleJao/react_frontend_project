import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import HeaderUserTypeGeneral from "../../components/HeaderUserTypeGeneral";
import HeaderUserTypeManager from "../../components/HeaderUserTypeManager";
import { useEffect, useState } from "react";
import { HotelGetAllRes } from "../../model/Response/Hotel/HotelGetAllRes";
import { useNavigate } from "react-router-dom";
import { HotelService } from "../../service/hotelService";
import { GetAllConcertRes } from "../../model/Response/Concert/GetAllConcertRes";
import { ConcertService } from "../../service/concertService";
import { HotelImageGetByHotelIDRes } from "../../model/Response/Hotel/HotelImageGetByHotelIDRes";

function HomePage() {
  const navigate = useNavigate();
  const hotelService = new HotelService();
  const concertService = new ConcertService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [hotelAll, setHotelAll] = useState<HotelGetAllRes[]>([]);
  const [hotelImageByHID, sethotelImageByHID] = useState<
    HotelImageGetByHotelIDRes[]
  >([]);
  const [concertAll, setConcertAll] = useState<GetAllConcertRes[]>([]);

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        const reshotel = await hotelService.getAll();
        const data: HotelGetAllRes[] = reshotel.data;
        setHotelAll(data);

        const hotelID = data.map((hotel) => hotel.HID);
        await loadImage(hotelID);
      } catch (error) {
        console.error("Error loading hotels or rooms:", error);
      }
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    const loadDataAsync = async () => {
      const resconcert = await concertService.getAll();
      const data: GetAllConcertRes[] = resconcert.data;
      setConcertAll(data);
    };
    loadDataAsync();
  }, []);

  const loadImage = async (numbers: number[]) => {
    try {
      const imagePromises = numbers.map(async (number) => {
        const reshotel = await hotelService.getHotelImageByHid(
          number.toString()
        );
        const data: HotelImageGetByHotelIDRes[] = reshotel.data;
        return data.length > 0 ? data[0] : null;
      });

      const allImages = await Promise.all(imagePromises);
      sethotelImageByHID(allImages.filter((image) => image !== null));
    } catch (error) {
      console.error("Error loading hotel images:", error);
    }
  };

  function navigateToConcertDetailPage(cid: string) {
    navigate(`/ConcertDetail/${cid}`);
  }

  function navigateToHotelDetailPage(hid: string) {
    navigate(`/HotelDetail/${hid}`);
  }

  return (
    <>
      {(user?.type_user === 2 && <HeaderUserTypeManager />) ||
        (user?.type_user === 1 && <HeaderUserTypeGeneral />)}

      <div className="home-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 100,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                variant="h3"
                marginTop={"15px"}
              >
                Welcome to Teemi
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: 550,
                    height: 80,
                    borderRadius: 3,
                    border: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                    }}
                    variant="h4"
                    marginTop={"10px"}
                  >
                    โรงแรมและคอนเสิร์ตที่แนะนำ
                  </Typography>
                </Box>
              </div>
            </div>
          </div>

          {/* Concert Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"25px"}
              >
                Concert
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {concertAll.slice(0, 1).map((concert) => (
                  <Card
                    sx={{
                      maxWidth: 345,
                      width: 345,
                      maxHeight: 320,
                      height: 320,
                      background: "#4E6A97",
                      border: 2,
                    }}
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
                          height: 90,
                          maxHeight: 90,
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
                          >
                            {concert.name_concert}
                          </Typography>
                          <Typography variant="body1" color="black">
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        sx={{ width: "110px", borderRadius: "10px" }}
                        onClick={() =>
                          navigateToConcertDetailPage(concert.CID.toString())
                        }
                      >
                        รายละเอียด
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "150px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Mitr, sans-serif",
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"25px"}
              >
                Hotel
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {hotelAll.slice(0, 1).map((hotel) => (
                  <Card
                    sx={{
                      maxWidth: 345,
                      width: 345,
                      maxHeight: 320,
                      height: 320,
                      background: "#A3A3AB",
                      border: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      // alt={hotel.name_hotel}
                      height="140"
                      sx={{ maxHeight: 140 }}
                      image={
                        hotelImageByHID.length > 0
                          ? hotelImageByHID[0]?.url_image
                          : "src/img/webteemi.png"
                      }
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: 90,
                          maxHeight: 90,
                          overflow: "auto",
                          bgcolor: "white",
                          borderRadius: 2,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "10px",
                            flexDirection: "column",
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {hotel.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            รายละเอียด: {hotel.detail}
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body1"
                        color="black"
                        sx={{ marginLeft: "10px" }}
                      >
                        ที่อยู่โรงแรม: {hotel.province}
                      </Typography>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#343434" }}
                        sx={{ width: "110px", borderRadius: "10px" }}
                        onClick={() =>
                          navigateToHotelDetailPage(hotel.HID.toString())
                        }
                      >
                        รายละเอียด
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
