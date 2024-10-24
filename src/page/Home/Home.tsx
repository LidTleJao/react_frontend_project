import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelGetAllRes } from "../../model/Response/Hotel/HotelGetAllRes";
import { HotelImageGetByHotelIDRes } from "../../model/Response/Hotel/HotelImageGetByHotelIDRes";
import { GetAllConcertRes } from "../../model/Response/Concert/GetAllConcertRes";
import { HotelService } from "../../service/hotelService";
import { ConcertService } from "../../service/concertService";
import HeaderUserTypeGeneral from "../../components/HeaderUserTypeGeneral";
import HeaderUserTypeManager from "../../components/HeaderUserTypeManager";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [banners, setBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        // ดึงข้อมูลโรงแรม
        const reshotel = await hotelService.getAll();
        const hotels: HotelGetAllRes[] = reshotel.data;
        setHotelAll(hotels);

        const hotelIDs = hotels.map((hotel) => hotel.HID);
        await loadImage(hotelIDs);

        // ดึงภาพโรงแรม
        const hotelImages = await Promise.all(
          hotels.map(async (hotel) => {
            const resImage = await hotelService.getHotelImageByHid(
              hotel.HID.toString()
            );
            const images: HotelImageGetByHotelIDRes[] = resImage.data;
            return images.length > 0 ? images[0].url_image : null;
          })
        );

        // ดึงข้อมูลคอนเสิร์ต
        const resConcert = await concertService.getAll();
        const concerts: GetAllConcertRes[] = resConcert.data;
        setConcertAll(concerts);

        // ดึงภาพคอนเสิร์ต
        const concertImages = concerts.map((concert) => concert.poster_concert);

        // รวมภาพจากโรงแรมและคอนเสิร์ต
        setBanners([
          ...(hotelImages.filter(Boolean) as string[]),
          ...concertImages,
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
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
        return data.length > 0 ? data[0] : null; // คืนค่าภาพแรกหรือ null
      });

      // รอให้ทุกคำขอเสร็จสิ้น
      const allImages = await Promise.all(imagePromises);

      // กรองเฉพาะภาพที่ไม่เป็น null
      sethotelImageByHID(allImages.filter((image) => image !== null));
    } catch (error) {
      console.error("Error loading hotel images:", error);
    }
  };

  // การเลื่อนแบนเนอร์
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
          {/* Carousel แสดงแบนเนอร์ */}
          <div className="relative overflow-hidden bg-gray-900">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                marginTop: "100px",
              }}
            >
              {banners.map((banner, index) => (
                <div
                  className="flex-shrink-0 w-full h-[400px] md:h-[600px] lg:h-[650px] relative"
                  key={index}
                >
                  <img
                    src={banner}
                    alt={`Banner ${index}`}
                    className="banner-image"
                  />
                </div>
              ))}
            </div>

            {/* ปุ่มเลื่อนแบนเนอร์ */}
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-teal-700 text-white rounded-md p-3 shadow-md hover:bg-teal-600 transition-colors duration-300 z-10 opacity-75 hover:opacity-100"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-teal-700 text-white rounded-md p-3 shadow-md hover:bg-teal-600 transition-colors duration-300 z-10 opacity-75 hover:opacity-100"
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-6 w-6" />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
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
                  fontStyle: "normal",
                }}
                variant="h3"
                marginTop={"15px"}
              >
                ยินดีต้อนรับสู่เว็บไซต์
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "40px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="black"
                sx={{
                  fontStyle: "normal",
                  marginBottom: "20px",
                  mt: 10,
                }}
              >
                คอนเสิร์ต
              </Typography>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                width: "90%",
              }}
            >
              {concertAll.map((concert) => (
                <Card
                  key={concert.CID}
                  sx={{
                    background: "#f5f5f5",
                    borderRadius: "15px",
                    border: "1px solid #ddd",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={concert.name_concert}
                    height="180"
                    image={concert.poster_concert}
                    sx={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      fontWeight="bold"
                      color="black"
                    >
                      {concert.name_concert}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(
                        concert.show_schedule_concert
                      ).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <Typography variant="body2" color="black">
                      {concert.province}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#007bff",
                        borderRadius: "10px",
                        textTransform: "none",
                      }}
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
              alignItems: "center",
              marginBottom: "40px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="black"
                sx={{
                  fontStyle: "normal",
                  marginBottom: "20px",
                  mt: 10,
                }}
              >
                โรงแรม
              </Typography>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                width: "90%",
              }}
            >
              {hotelAll.map((hotel) => {
                const hotelImage = hotelImageByHID.find(
                  (image) => image.hotel_ID === hotel.HID
                );

                return (
                  <Card
                    key={hotel.HID}
                    sx={{
                      background: "#f5f5f5",
                      borderRadius: "15px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={hotel.name}
                      height="180"
                      image={
                        hotelImageByHID.length > 0
                          ? hotelImage?.url_image
                          : "src/img/webteemi.png"
                      }
                      sx={{
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        fontWeight="bold"
                        color="black"
                      >
                        {hotel.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {hotel.detail}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                      }}
                    >
                      <Typography variant="body2" color="black">
                        {hotel.province}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#007bff",
                          borderRadius: "10px",
                          textTransform: "none",
                        }}
                        onClick={() =>
                          navigateToHotelDetailPage(hotel.HID.toString())
                        }
                      >
                        รายละเอียด
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
