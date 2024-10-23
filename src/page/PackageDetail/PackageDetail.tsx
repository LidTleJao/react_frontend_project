import { SetStateAction, useEffect, useState } from "react";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import { PacketGetPIDRes } from "../../model/Response/Packet/Packet/PacketGetByPIDRes";
import { PacketService } from "../../service/packetService";
import { useNavigate, useParams } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, styled } from "@mui/system";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  tableCellClasses,
  Button,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { HotelURLGetByHotelIDRes } from "../../model/Response/Hotel/HotelUrlGetByHotelIDRes";
import { HotelService } from "../../service/hotelService";

function PackageDetailPage() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const hotelService = new HotelService();
  const packetService = new PacketService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [packetselect, setPacketselect] = useState<PacketGetPIDRes[]>([]);
  const [hotelChannel, setHotelChannel] = useState<HotelURLGetByHotelIDRes[]>(
    []
  );

  useEffect(() => {
    if (!pid) return;
    const loadDataAsync = async () => {
      const respacket = await packetService.getPacketByPID(pid);
      const data: PacketGetPIDRes[] = respacket.data;
      setPacketselect(data);
    };
    loadDataAsync();
  }, [pid]);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshotel = await hotelService.getHotelUrlByHid(
        String(packetselect.map((packet) => packet.hotel_ID))
      );
      const data: HotelURLGetByHotelIDRes[] = reshotel.data;
      setHotelChannel(data);
    };
    loadDataAsync();
  }, [hotelService, packetselect]);

  console.log(packetselect);
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      color: "black",
      fontWeight: "bold",
      fontSize: 16,
    },
  }));

  function navigateToPackagePage() {
    navigate("/Package");
  }
  const [isOpen, setIsOpen] = useState(false); // สถานะการเปิด/ปิด modal
  const [selectedImage, setSelectedImage] = useState(""); // รูปภาพที่ถูกเลือก

  const handleOpen = (image: SetStateAction<string>) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage("");
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
      <div className="concert-cont mt-20 m-48">
        <div className="flex flex-col justify-center">
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
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
              รายละเอียดของแพ็คเกจ
            </Typography>
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
              onClick={navigateToPackagePage}
            >
              กลับหน้า
            </Button>
          </div>
          {packetselect.map((packet) => (
            <div className="bg-white p-6 rounded-2xl mt-1 shadow-[0_2px_4px_rgba(0,0,0,0.3)] mb-10">
              <div className=" flex flex-row justify-between ml-2">
                <div className="h-auto flex flex-col ">
                  <div className="h-auto flex flex-row">
                    <h1 className="text-2xl font-bold pr-10 text-black">
                      {packet.name} ({packet.typename_hotel})
                    </h1>
                  </div>
                  <div className="h-auto flex flex-row items-center mt-1 justify-start">
                    <PlaceIcon sx={{ fontSize: 30 }} className="text-sky-700" />
                    <h1 className="text-xl font-semibold text-gray-500 j">
                      จังหวัด{packet.province}
                    </h1>
                  </div>
                </div>
              </div>
              <div className=" flex h-auto w-auto  bg-white mt-2 rounded-xl pl-2 flex-col">
                <div className=" flex h-auto w-auto  bg-white ml- rounded-xl ">
                  <div className="h-auto flex flex-col">
                    <TableContainer
                      component={Paper}
                      className="mt-1 pl-1 shadow-lg"
                    >
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="hotel rooms table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell
                              align="center"
                              sx={{
                                backgroundColor: "#f2f2f2",
                                border: "1px solid black",
                                fontWeight: "bold",
                              }}
                            >
                              ชนิดห้องพัก
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              sx={{
                                backgroundColor: "#f2f2f2",
                                border: "1px solid black",
                                fontWeight: "bold",
                              }}
                            >
                              วิวของห้อง
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              sx={{
                                backgroundColor: "#f2f2f2",
                                border: "1px solid black",
                                fontWeight: "bold",
                              }}
                            >
                              ราคาห้องต่อคือ
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              sx={{
                                backgroundColor: "#f2f2f2",
                                border: "1px solid black",
                                fontWeight: "bold",
                              }}
                            >
                              จำนวนคนเข้าพัก
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              sx={{
                                backgroundColor: "#f2f2f2",
                                border: "1px solid black",
                                fontWeight: "bold",
                              }}
                            >
                              จำนวนห้อง
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {packetselect.length > 0 ? (
                            <TableRow key={packet.hotel_ID}>
                              <TableCell sx={{ border: "1px solid black" }}>
                                {packet.type_room}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {packet.type_view_name_room}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {packet.hotel_deal_price}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {packet.Number_of_guests}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                {packet.number_of_rooms}
                              </TableCell>
                            </TableRow>
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                align="center"
                                sx={{
                                  border: "1px solid black",
                                  color: "gray",
                                  fontStyle: "italic",
                                }}
                              >
                                ยังไม่มีข้อมูล
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
                <div
                  className="ml-2"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h1 className="text-xl font-bold text-black pt-2">
                    ช่องทางการติดต่อ
                  </h1>
                  {hotelChannel.length > 0 ? (
                    hotelChannel.map((h, index) => (
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
                          className="py-2 px-4 text-sm font-medium rounded-lg transition duration-500 border-2 border-sky-600 text-black hover:text-white hover:bg-sky-800"
                        >
                          ลิงก์ {index + 1}
                        </button>
                      </a>
                    ))
                  ) : (
                    <h2 className="text-lg text-red-500">
                      ไม่มีช่องทางการติดต่อ
                    </h2>
                  )}
                </div>

                <h1 className="text-2xl text-black ml-2 font-semibold mt-4">
                  concert : {packet.name_concert}
                </h1>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    overflow: "auto",
                    marginTop: 1,
                    marginLeft: 1,
                  }}
                >
                  <div className=" h-auto w-auto rounded-xl">
                    <img
                      className="object-cover  rounded-xl h-full w-full cursor-pointer"
                      src={packet.poster_concert}
                      onClick={() => handleOpen(packet.poster_concert)} // คลิกที่รูป
                      alt="Concert Poster"
                    />

                    {/* Modal สำหรับแสดงรูป */}
                    {isOpen && (
                      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
                        <div className="relative">
                          <img
                            className="max-w-full max-h-full  rounded-xl  cursor-pointer"
                            src={selectedImage}
                            onClick={handleClose} // ปิด modal
                            alt="Selected Concert"
                          />
                          <button
                            onClick={handleClose} // ปิด modal
                            className="absolute top-2 right-2 text-white text-2xl "
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" flex h-auto w-auto  bg-white ml-7 rounded-xl p-2">
                    <div className="h-auto flex flex-col">
                      <h1 className="text-lg text-gray-500">
                        สถานที่จัดการแสดง ณ {packet.address_concert}
                      </h1>
                      <h1 className="text-lg text-gray-500">
                        ไลน์อัพ : {packet.lineup}
                      </h1>
                      <h1 className="text-lg text-gray-500">
                        รายละเอียด : {packet.detail_concert}
                      </h1>
                      <h1 className="text-lg text-gray-500">
                        วันที่แสดง : {packet.show_schedule_concert.toString()}
                      </h1>
                      <div className="flex flex-row">
                        <h1 className="text-lg text-gray-500">จำนวนบัตร :</h1>
                        <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-md whitespace-normal">
                          {packet.number_of_tickets}
                        </h1>
                      </div>
                      <div className="flex flex-col justify-between">
                        <h1 className="text-lg text-gray-500">ราคาบัตร :</h1>

                        <TableContainer component={Paper} className="mt-2" sx={{width: 600}}>
                          <Table
                            sx={{ border: "1px solid black" }}
                            aria-label="concert tickets table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell
                                  align="center"
                                  sx={{backgroundColor: "#f2f2f2", border: "1px solid black" }}
                                >
                                  วันเวลาแสดง
                                </StyledTableCell>
                                <StyledTableCell
                                  align="center"
                                  sx={{backgroundColor: "#f2f2f2",  border: "1px solid black" }}
                                >
                                  ประเภทบัตร / ราคา
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {packetselect.length > 0 ? (
                                Object.entries(
                                  //แปลงข้อมูลในอาร์เรย์นี้ให้เป็นอ็อบเจ็กต์ โดยเราจะสร้างคีย์ที่เป็นการรวมกันของวันที่และเวลา เช่น "2024-10-23 20:00"
                                  packetselect.reduce<
                                    Record<
                                      string,
                                      Array<{
                                        name_type_ticket: string;
                                        price: number;
                                      }>
                                    >
                                  >((data, packege) => {
                                    //dateTimeKey ซึ่งจะมีรูปแบบเป็น "วันที่ เวลา"
                                    const dateTimeKey = `${packege.show_schedule_concert.toString()}`;
                                    if (!data[dateTimeKey]) {
                                      data[dateTimeKey] = [];
                                    }
                                    //เพิ่มข้อมูลของตั๋ว เช่น ประเภทตั๋วและราคาเข้าไปในอาร์เรย์ที่อยู่ภายใต้คีย์นั้น
                                    data[dateTimeKey].push({
                                      name_type_ticket:
                                        packege.name_type_ticket,
                                      price: packege.price,
                                    });
                                    return data;
                                  }, {})
                                ).map(([dateTimeKey, tickets]) => (
                                  <TableRow key={dateTimeKey}>
                                    <TableCell
                                      align="left"
                                      sx={{ border: "1px solid black" }}
                                    >
                                      {dateTimeKey}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      sx={{ border: "1px solid black" }}
                                    >
                                      {tickets.map((ticket, ticketIndex) => (
                                        <div key={ticketIndex}>
                                          {ticket.name_type_ticket} /{" "}
                                          {ticket.price} บาท
                                        </div>
                                      ))}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={2}
                                    align="center"
                                    style={{ color: "gray" }}
                                  >
                                    ยังไม่มีข้อมูล
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                      <div className="flex flex-row justify-start mt-2">
                        <h1 className="text-lg text-gray-500">
                          เวลาเริ่มแพ็คเกจ
                        </h1>

                        <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-lg">
                          {dayjs(packet.s_deadline_package).format(
                            "YYYY-MM-DD"
                          )}
                        </h1>
                      </div>
                      <div className="flex flex-row justify-start ">
                        <h1 className="text-lg text-gray-500">
                          เวลาสิ้นสุดแพ็คเกจ
                        </h1>

                        <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-lg">
                          {dayjs(packet.deadline_package).format("YYYY-MM-DD")}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default PackageDetailPage;
