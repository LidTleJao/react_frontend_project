// import { Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import PlaceIcon from "@mui/icons-material/Place";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { SetStateAction, useEffect, useState } from "react";
import { ConcertService } from "../../service/concertService";
import { GetConcertTicketByCIDRes } from "../../model/Response/Concert/GetConcertTicketByCIDRes";
import { GetConcertShowByCIDRes } from "../../model/Response/Concert/GetConcertShowByCIDRes";
import { GetConcertChannelByCIDRes } from "../../model/Response/Concert/GetConcertChannelByCIDRes";
import { useNavigate, useParams } from "react-router-dom";
import { GetConcertByCIDRes } from "../../model/Response/Concert/GetConcertByCIDRes";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
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
  Typography,
} from "@mui/material";

function ConcertDetailPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const concertService = new ConcertService();
  const [concert, setConcert] = useState<GetConcertByCIDRes[]>([]);
  const [concertShow, setConcertShow] = useState<GetConcertShowByCIDRes[]>([]);
  const [concertTicket, setConcertTicket] = useState<
    GetConcertTicketByCIDRes[]
  >([]);
  const { cid } = useParams(); // สมมติว่าเส้นทางเป็น "/concert/:cid"
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      color: "black",
      fontWeight: "bold",
      fontSize: 16,
    },
  }));

  console.log(cid);

  const [concertChannel, setConcertChannel] = useState<
    GetConcertChannelByCIDRes[]
  >([]);

  useEffect(() => {
    if (!cid) return; // ป้องกันการเรียก API หาก cid ไม่มี
    const loadDataAsync = async () => {
      const resconcert = await concertService.getConcert(cid);
      setConcert(resconcert.data);

      const resconchan = await concertService.getConcertChannel(cid);
      setConcertChannel(resconchan.data);

      const resconshow = await concertService.getConcertShow(cid);
      setConcertShow(resconshow.data);

      const resconticket = await concertService.getConcertTicket(cid);
      setConcertTicket(resconticket.data);
    };
    loadDataAsync();
  }, [cid]);

  console.log(concertChannel);

  function navigateToConcertPage() {
    navigate("/Concert");
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
      <div className="concert-cont pt-20">
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
              รายละเอียดของคอนเสิร์ต
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
              onClick={navigateToConcertPage}
            >
              กลับหน้า
            </Button>
          </div>
          {concert.map((concert) => (
            <div className="bg-white p-6 rounded-2xl mt-5 shadow-[0_2px_4px_rgba(0,0,0,0.3)] mb-10">
              <div className=" flex flex-row justify-between">
                <div className="h-auto flex flex-col ">
                  <div className="h-auto flex flex-row">
                    <h1 className="text-2xl font-semibold pr-10 text-black">
                      {concert.name_concert}
                    </h1>
                    <h1 className="text-xl font-semibold text-gray-500 j">
                      ประเภทการแสดง : {concert.name_type_concert}
                    </h1>
                  </div>
                  <div className="h-auto flex flex-row items-center mt-1 justify-start">
                    <PlaceIcon sx={{ fontSize: 30 }} className="text-sky-700" />
                    <h1 className="text-xl font-semibold text-gray-500 j">
                      จังหวัด{concert.province}
                    </h1>
                  </div>
                </div>
              </div>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  marginTop: 2,
                }}
              >
                <div>
                  <img
                    className="object-cover h-64 w-48 rounded-xl cursor-pointer"
                    src={concert.poster_concert}
                    onClick={() => handleOpen(concert.poster_concert)} // คลิกที่รูป
                    alt="Concert Poster"
                  />

                  {/* Modal สำหรับแสดงรูป */}
                  {isOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
                      <div className="relative">
                        <img
                          className="max-w-full max-h-full rounded-xl cursor-pointer"
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
                    {" "}
                    <h1 className="text-lg text-gray-500">
                      บัตรมีจำนวนจำกัด ณ {concert.address_concert}
                    </h1>
                    <h1 className="text-lg text-gray-500">
                      ไลน์อัพ : {concert.lineup}
                    </h1>
                    <h1 className="text-lg text-gray-500">
                      วันที่แสดง : {concert.show_schedule_concert.toString()}
                    </h1>
                    <div className="flex flex-row">
                      <h1 className="text-lg text-gray-500">รายละเอียด :</h1>
                      <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-md whitespace-normal">
                        {concert.detail_concert}
                      </h1>
                    </div>
                    <div className="flex flex-col justify-between">
                      <h1 className="text-lg text-gray-500">ราคาบัตร :</h1>

                      <TableContainer component={Paper} className="mt-2">
                        <Table
                          sx={{ border: "1px solid black" }}
                          aria-label="concert tickets table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                วันเวลาแสดง
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                ประเภทบัตร / ราคา
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {concertTicket.length > 0 ? (
                              Object.entries(
                                //แปลงข้อมูลในอาร์เรย์นี้ให้เป็นอ็อบเจ็กต์ โดยเราจะสร้างคีย์ที่เป็นการรวมกันของวันที่และเวลา เช่น "2024-10-23 20:00"
                                concertTicket.reduce<
                                  Record<
                                    string,
                                    Array<{
                                      name_type_ticket: string;
                                      price: number;
                                    }>
                                  >
                                >((data, concertTic) => {
                                  //dateTimeKey ซึ่งจะมีรูปแบบเป็น "วันที่ เวลา"
                                  const dateTimeKey = `${concertTic.show_concert.toString()} ${
                                    concertTic.time_show_concert
                                  }`;
                                  if (!data[dateTimeKey]) {
                                    data[dateTimeKey] = [];
                                  }
                                  //เพิ่มข้อมูลของตั๋ว เช่น ประเภทตั๋วและราคาเข้าไปในอาร์เรย์ที่อยู่ภายใต้คีย์นั้น
                                  data[dateTimeKey].push({
                                    name_type_ticket:
                                      concertTic.name_type_ticket,
                                    price: concertTic.price,
                                  });
                                  return data;
                                }, {})
                              ).map(([dateTimeKey, tickets]) => (
                                <TableRow key={dateTimeKey}>
                                  <TableCell
                                    align="left"
                                    sx={{ border: "1px solid black" }}
                                  >
                                    {dateTimeKey} น.
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
                      <h1 className="text-lg text-gray-500"> เวลา</h1>

                      {concertShow.map((concertShow) => (
                        <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-lg">
                          {concertShow.time_show_concert.toString()}
                        </h1>
                      ))}
                    </div>
                  </div>
                </div>
              </Box>
              <h1 className="text-2xl text-black font-semibold mt-1">
                ผังการแสดง & รอบการแสดง
              </h1>
              <div className=" flex h-auto w-auto  bg-white mt-2 rounded-xl p-5">
                <div className=" flex justify-center items-center">
                  <img
                    className=" h-64 w-80  object-fill rounded-xl cursor-pointer"
                    src={concert.performance_chart}
                    onClick={() => handleOpen(concert.performance_chart)} // คลิกที่รูป
                  ></img>

                  {/* Modal สำหรับแสดงรูป */}
                  {isOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                      <div className="relative">
                        <img
                          className="max-w-full max-h-full rounded-xl cursor-pointer"
                          src={selectedImage}
                          onClick={handleClose} // ปิด modal
                          alt="Selected Concert"
                        />
                        <button
                          onClick={handleClose} // ปิด modal
                          className="absolute top-2 right-2 text-white text-2xl"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className=" flex h-auto w-auto pl-10">
                  <div className="h-auto flex flex-col">
                    <h1 className="text-lg text-gray-500">
                      สถานที่จัดการแสดง {concert.address_concert}
                    </h1>
                    <div className="flex flex-col justify-between">
                      <h1 className="text-lg text-gray-500">ราคาบัตร :</h1>

                      <TableContainer component={Paper} className="mt-2">
                        <Table
                          sx={{ border: "1px solid black" }}
                          aria-label="concert tickets table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                วันเวลาแสดง
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                sx={{ border: "1px solid black" }}
                              >
                                ประเภทบัตร / ราคา
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {concertTicket.length > 0 ? (
                              Object.entries(
                                //แปลงข้อมูลในอาร์เรย์นี้ให้เป็นอ็อบเจ็กต์ โดยเราจะสร้างคีย์ที่เป็นการรวมกันของวันที่และเวลา เช่น "2024-10-23 20:00"
                                concertTicket.reduce<
                                  Record<
                                    string,
                                    Array<{
                                      name_type_ticket: string;
                                      price: number;
                                    }>
                                  >
                                >((data, concertTic) => {
                                  //dateTimeKey ซึ่งจะมีรูปแบบเป็น "วันที่ เวลา"
                                  const dateTimeKey = `${concertTic.show_concert.toString()} ${
                                    concertTic.time_show_concert
                                  }`;
                                  if (!data[dateTimeKey]) {
                                    data[dateTimeKey] = [];
                                  }
                                  //เพิ่มข้อมูลของตั๋ว เช่น ประเภทตั๋วและราคาเข้าไปในอาร์เรย์ที่อยู่ภายใต้คีย์นั้น
                                  data[dateTimeKey].push({
                                    name_type_ticket:
                                      concertTic.name_type_ticket,
                                    price: concertTic.price,
                                  });
                                  return data;
                                }, {})
                              ).map(([dateTimeKey, tickets]) => (
                                <TableRow key={dateTimeKey}>
                                  <TableCell
                                    align="left"
                                    sx={{ border: "1px solid black" }}
                                  >
                                    {dateTimeKey} น.
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
                    <div className="flex flex-col mt-3">
                      <h1 className="text-lg text-gray-500">วันที่แสดง :</h1>
                      {concertShow.map((concertShow) => (
                        <div className="flex flex-row justify-between mt-2">
                          <h1 className="text-lg text-gray-500">
                            {concertShow.show_concert.toString()}
                          </h1>

                          <div className="bg-blue-500 rounded-2xl w-20 text-center text-white">
                            {concertShow.time_show_concert.toString()}
                          </div>
                        </div>
                      ))}
                    </div>
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
export default ConcertDetailPage;
