import { useEffect, useState } from "react";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import { PacketGetPIDRes } from "../../model/Response/Packet/Packet/PacketGetByPIDRes";
import { PacketService } from "../../service/packetService";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  }, [packetselect.map((packet) => packet.hotel_ID)]);

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
      <div className="concert-cont mt-20">
        <div className="flex flex-col justify-center">
          <div style={{ display: "flex", justifyContent: "center" ,marginTop:20}}>
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
            <div className="bg-sky-200 p-6 rounded-2xl mt-1">
              <div className=" flex flex-row justify-between">
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

              <div className=" flex h-auto w-auto  bg-white mt-2 rounded-xl p-2 flex-col">
                <div className=" flex h-auto w-auto  bg-white ml- rounded-xl p-2">
                  <div className="h-auto flex flex-col">
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
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ border: "1px solid black" }}>
                          <TableRow key={packet.hotel_ID}>
                            <TableCell sx={{ border: "1px solid black" }}>
                              {packet.type_room}
                            </TableCell>
                            <TableCell
                              align="left"
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
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h1 className="text-xl font-bold text-black pt-2">
                    ช่องทางการติดต่อ
                  </h1>
                  {hotelChannel.map((h, index) => (
                    <Link
                      key={index}
                      to={h.url}
                      className="text-lg text-gray-500 hover:text-gray-700"
                    >
                      {h.url}
                    </Link>
                  ))}
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
                  <img
                    className="object-cover h-64 w-48 rounded-xl "
                    src={packet.poster_concert}
                  ></img>
                  <div className=" flex h-auto w-auto  bg-white ml-7 rounded-xl p-2">
                    <div className="h-auto flex flex-col">
                      {" "}
                      <h1 className="text-lg text-gray-500">
                        สถานที่จัดการแสดง ณ {packet.province}
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
                      <div className="flex flex-row justify-between ">
                        <h1 className="text-lg text-gray-500">ราคาบัตร :</h1>

                        <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-lg">
                          {packet.name_type_ticket}/{packet.concert_deal_price}{" "}
                          บาท
                        </h1>
                      </div>
                      <div className="flex flex-row justify-start ">
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
