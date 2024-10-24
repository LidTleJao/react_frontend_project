// import { Button } from "@mui/material";
import { styled } from "@mui/system";
import PlaceIcon from "@mui/icons-material/Place";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import { RoomGetAllRes } from "../../model/Response/Hotel/RoomGetAllRes";
// import { HotelGetAllRes } from "../../model/Response/Hotel/HotelGetAllRes";
import { HotelService } from "../../service/hotelService";
import { RoomHotelService } from "../../service/roomHotelService";
import { HotelGetByHIDRes } from "../../model/Response/Hotel/HotelGetByHIDRes";
import { HotelImageGetByHotelIDRes } from "../../model/Response/Hotel/HotelImageGetByHotelIDRes";
import { RoomGetByHotelIDRes } from "../../model/Response/Hotel/RoomGetByHotelIDRes";
import { HotelURLGetByHotelIDRes } from "../../model/Response/Hotel/HotelUrlGetByHotelIDRes";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
function HotelDetailPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const hotelService = new HotelService();
  const roomService = new RoomHotelService();
  const [hotel, setHotel] = useState<HotelGetByHIDRes[]>([]);
  const [hotelUrl, setHotelUrl] = useState<HotelURLGetByHotelIDRes[]>([]);
  const [hotelImage, setHotelImage] = useState<HotelImageGetByHotelIDRes[]>([]);
  const [rooms, setRoom] = useState<RoomGetByHotelIDRes[]>([]);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { hid } = useParams(); // สมมติว่าเส้นทางเป็น "/concert/:cid"
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      color: "black",
      fontWeight: "bold",
      fontSize: 17,
    },
  }));

  const StyledTableRow = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      color: "#6B7280",
      fontWeight: "normal",
      fontSize: 17,
    },
  }));

  console.log(hid);
  useEffect(() => {
    if (!hid) return;
    const loadDataHotelAsync = async () => {
      const resHotel = await hotelService.getShowHotelByHid(hid);
      const data: HotelGetByHIDRes[] = resHotel.data;
      setHotel(data);

      const resUrl = await hotelService.getHotelUrlByHid(hid);
      const dataUrl: HotelURLGetByHotelIDRes[] = resUrl.data;
      setHotelUrl(dataUrl);

      const resImage = await hotelService.getHotelImageByHid(hid);
      const dataImage: HotelImageGetByHotelIDRes[] = resImage.data;
      setHotelImage(dataImage);

      const resRoom = await roomService.getRoomByHotelID(hid);
      const dataRoom: RoomGetByHotelIDRes[] = resRoom.data;
      setRoom(dataRoom);
    };
    loadDataHotelAsync();
  }, [hid]);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? hotelImage.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === hotelImage.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  function navigateToHotelPage() {
    navigate("/Hotel");
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

      <div className="concert-cont pt-20">
        <div className="flex flex-col justify-center ">
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
             <h1 className="text-[25px] font-semibold pr-10 text-black">
              รายละเอียดของโรงแรม
            </h1>
          </div>
          <div style={{ display: "flex", marginBottom: 5 }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#343434" }}
              sx={{
                width: "110px",
                borderRadius: "10px",
              }}
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={navigateToHotelPage}
            >
              กลับหน้า
            </Button>
          </div>
          {hotel.map((hotel) => (
            <div
              className="bg-white p-6 rounded-2xl mt-1  shadow-[0_2px_4px_rgba(0,0,0,0.3)] mb-10"
              style={{ maxWidth: 1000 }}
            >
              <div className=" flex flex-row justify-between">
                <div className="h-auto flex flex-col ">
                  <div className="h-auto flex flex-row">
                    <h1 className="text-2xl font-bold pr-10 text-black">
                      {hotel.name}
                    </h1>
                  </div>
                  <div className="h-auto flex flex-row items-center mt-1 justify-start">
                    <PlaceIcon sx={{ fontSize: 30 }} className="text-sky-700" />
                    <h1 className="text-xl  text-gray-500">
                      จังหวัด{hotel.province}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="  flex  justify-center items-center bg-black rounded-xl mt-2">
                <div className="relative overflow-hidden mt-2  mb-4 w-[1000px] h-[700px]">
                  <div
                    className="flex transition-transform duration-500 ease-in-out "
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {hotelImage.map((banner, index) => (
                      <img
                        key={index}
                        src={banner.url_image}
                        alt={`Banner ${index}`}
                        className="w-[1000px] h-[700px] object-scale-down flex-shrink-0 rounded-xl"
                      />
                    ))}
                  </div>
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-sky-900 text-white rounded-md p-3 shadow-md hover:bg-sky-900 transition-colors duration-300 z-10 opacity-75 hover:opacity-100"
                  >
                    <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-sky-900 text-white rounded-md p-3 shadow-md hover:bg-sky-900 transition-colors duration-300 z-10 opacity-75 hover:opacity-100"
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 30 }} />
                  </button>
                </div>
              </div>

              <div className=" flex h-auto  bg-white mt-2 rounded-xl p-2">
                <div className=" flex h-auto   bg-white ml- rounded-xl p-2">
                  <div className="h-auto flex flex-col">
                    {" "}
                    <h1 className="text-xl font-bold text-black">
                      รายละเอียดโรงแรม
                    </h1>
                    <h1 className="text-lg text-gray-500 ">{hotel.detail}</h1>
                    <h1 className="text-xl font-bold text-black pt-2">
                      ช่องทางการติดต่อ
                    </h1>
                    <div
                      style={{
                        display: "flex",
                        overflow: "auto",
                      }}
                    >
                      {hotelUrl.length > 0 ? (
                        hotelUrl.map((h, index) => (
                          <a
                            key={index}
                            href={h.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-gray-500 hover:text-gray-700 mr-4"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <button
                              type="button"
                              className="py-2 px-4 font-medium rounded-lg transition duration-500 border-2 border-sky-600 text-gray-500 hover:text-white hover:bg-sky-800 text-lg"
                            >
                              ลิงก์ {index + 1}
                            </button>
                          </a>
                        ))
                      ) : (
                        <p className="text-lg text-red-500">
                          ไม่มีช่องทางการติดต่อ
                        </p>
                      )}
                    </div>
                    <TableContainer
                      component={Paper}
                      className="mt-3"
                      sx={{ minWidth: 600 }}
                    >
                      <Table sx={{ minWidth: 600 }} aria-label="">
                        <TableHead sx={{ border: "1px solid black" }}>
                          <TableRow sx={{ border: "1px solid black" }}>
                            <StyledTableCell
                               sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                              align="center"
                            >
                              ชนิดห้องพัก
                            </StyledTableCell>
                            <StyledTableCell
                               sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                              align="center"
                            >
                              วิวของห้อง
                            </StyledTableCell>
                            <StyledTableCell
                               sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                              align="center"
                            >
                              ราคาห้องต่อคือ
                            </StyledTableCell>
                            <StyledTableCell
                               sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                              align="center"
                            >
                              จำนวนคนเข้าพัก
                            </StyledTableCell>
                            <StyledTableCell
                               sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                              align="center"
                            >
                              จำนวนห้อง
                            </StyledTableCell>
                            <StyledTableCell
                               sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                              align="center"
                            >
                              สถานะห้อง
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ border: "1px solid black" }}>
                          {rooms.length > 0 ? (
                            rooms.map((room) => (
                              <TableRow key={room.hotel_ID}>
                                <StyledTableRow sx={{ border: "1px solid black" }}>
                                  {room.type_room}
                                </StyledTableRow>
                                <StyledTableRow
                                  align="left"
                                  sx={{ border: "1px solid black" }}
                                >
                                  {room.type_view_name_room}
                                </StyledTableRow>
                                <StyledTableRow
                                  align="center"
                                  sx={{ border: "1px solid black" }}
                                >
                                  {room.price}
                                </StyledTableRow>
                                <StyledTableRow
                                  align="center"
                                  sx={{ border: "1px solid black" }}
                                >
                                  {room.Number_of_guests}
                                </StyledTableRow>
                                <StyledTableRow
                                  align="center"
                                  sx={{ border: "1px solid black" }}
                                >
                                  {room.Number_of_rooms}
                                </StyledTableRow>
                                <StyledTableRow
                                  align="center"
                                  sx={{ border: "1px solid black" }}
                                >
                                  {room.status_name_room}
                                </StyledTableRow>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <StyledTableRow
                                colSpan={6}
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                ยังไม่มีข้อมูลห้องพัก
                              </StyledTableRow>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default HotelDetailPage;
