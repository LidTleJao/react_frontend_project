// import { Button } from "@mui/material";
import { Box, fontSize, styled } from "@mui/system";
import PlaceIcon from "@mui/icons-material/Place";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { RoomGetAllRes } from "../../model/Response/Hotel/RoomGetAllRes";
import { HotelGetAllRes } from "../../model/Response/Hotel/HotelGetAllRes";
import { HotelService } from "../../service/hotelService";
import { RoomHotelService } from "../../service/roomHotelService";
import { HotelGetByHIDRes } from "../../model/Response/Hotel/HotelGetByHIDRes";
import { HotelImageGetByHotelIDRes } from "../../model/Response/Hotel/HotelImageGetByHotelIDRes";
import { RoomGetByHotelIDRes } from "../../model/Response/Hotel/RoomGetByHotelIDRes";
import { HotelURLGetByHotelIDRes } from "../../model/Response/Hotel/HotelUrlGetByHotelIDRes";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
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

  // const [hotel_ID, setHotel_ID] = useState("");

  // const {concertID} = location.state;
  const { hid } = useParams(); // สมมติว่าเส้นทางเป็น "/concert/:cid"
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      color: "black",
      fontWeight: "bold",
      fontSize: 16,
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
      <div className="concert-cont pt-40">
        <div className="flex flex-col justify-center items-center">
          {hotel.map((hotel) => (
            <div className="bg-sky-200 p-6 rounded-2xl mt-1">
              <div className=" flex flex-row justify-between">
                <div className="h-auto flex flex-col ">
                  <div className="h-auto flex flex-row">
                    <h1 className="text-2xl font-bold pr-10 text-black">
                      {hotel.name}
                    </h1>
                  </div>
                  <div className="h-auto flex flex-row items-center mt-1 justify-start">
                    <PlaceIcon sx={{ fontSize: 30 }} className="text-sky-700" />
                    <h1 className="text-xl font-semibold text-gray-500 j">
                      จังหวัด{hotel.province}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="  flex  justify-center items-center">
                <div className="relative overflow-hidden mt-2  mb-4 w-[700px] h-[400px] ">
                  <div
                    className="flex transition-transform duration-500 ease-in-out "
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {hotelImage.map((banner, index) => (
                      <img
                        key={index}
                        src={banner.url_image}
                        alt={`Banner ${index}`}
                        className="w-auto h-auto object-cover  flex-shrink-0 rounded-xl"
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

              <div className=" flex h-auto w-auto  bg-white mt-2 rounded-xl p-2">
                <div className=" flex h-auto w-auto  bg-white ml- rounded-xl p-2">
                  <div className="h-auto flex flex-col">
                    {" "}
                    <h1 className="text-xl font-bold text-black">
                      รายละเอียดโรงแรม
                    </h1>
                    <h1 className="text-lg text-gray-500 ">{hotel.detail}</h1>
                    <h1 className="text-xl font-bold text-black pt-2">
                      ช่องทางการติดต่อ
                    </h1>
                    {hotelUrl.map((h, index) => (
                      <Link
                        key={index}
                        to={h.url}
                        className="text-lg text-gray-500 hover:text-gray-700"
                      >
                        {h.url} 
                      </Link>
                    ))}
                    <TableContainer component={Paper} className="mt-2">
                      <Table sx={{ minWidth: 650 }} aria-label="">
                        <TableHead sx={{ border: "1px solid black" }}>
                          <TableRow sx={{ border: "1px solid black" }}>
                            <StyledTableCell
                              sx={{ border: "1px solid black" }}
                              align="center"
                            >
                              ชนิดห้องพัก
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ border: "1px solid black" }}
                              align="center"
                            >
                              วิวของห้อง
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ border: "1px solid black" }}
                              align="center"
                            >
                              ราคาห้องต่อคือ
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ border: "1px solid black" }}
                              align="center"
                            >
                              จำนวนคนเข้าพัก
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ border: "1px solid black" }}
                              align="center"
                            >
                              จำนวนห้อง
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ border: "1px solid black" }}
                              align="center"
                            >
                              สถานะห้อง
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ border: "1px solid black" }}>
                          {rooms.map((room) => (
                            <TableRow key={room.hotel_ID}>
                              <TableCell sx={{ border: "1px solid black" }}>
                                {room.type_room}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{ border: "1px solid black" }}
                              >
                                {room.type_view_name_room}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {room.price}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {room.Number_of_guests}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {room.Number_of_rooms}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {room.status_name_room}
                              </TableCell>
                            </TableRow>
                          ))}
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