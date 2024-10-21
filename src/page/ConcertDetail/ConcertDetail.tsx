// import { Button } from "@mui/material";
import { Box } from "@mui/system";
import PlaceIcon from "@mui/icons-material/Place";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import { useEffect, useState } from "react";
import { ConcertService } from "../../service/concertService";
import { GetConcertTicketByCIDRes } from "../../model/Response/Concert/GetConcertTicketByCIDRes";
import { GetConcertShowByCIDRes } from "../../model/Response/Concert/GetConcertShowByCIDRes";
import { GetConcertChannelByCIDRes } from "../../model/Response/Concert/GetConcertChannelByCIDRes";
import { useNavigate, useParams } from "react-router-dom";
import { GetConcertByCIDRes } from "../../model/Response/Concert/GetConcertByCIDRes";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button, Typography } from "@mui/material";

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
              รายละเอียดของคอนเสิรต์
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
            <div className="bg-sky-200 p-6 rounded-2xl mt-1">
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
                <img
                  className="object-cover h-64 w-48 rounded-xl "
                  src={concert.poster_concert}
                ></img>
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
                    <div className="flex flex-row justify-between ">
                      <h1 className="text-lg text-gray-500">ราคาบัตร :</h1>

                      {concertTicket.map((concertTic) => (
                        <h1 className="text-lg text-gray-500 justify-start pl-3 "
                        style={{maxWidth:350}}>
                          {concertTic.name_type_ticket}/{concertTic.price} บาท
                        </h1>
                      ))}
                    </div>
                    <div className="flex flex-row justify-start ">
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
              <div className=" flex h-auto w-auto  bg-white mt-2 rounded-xl p-2">
                <img
                  className=" h-40 w-48  object-fill rounded-xl"
                  src={concert.performance_chart}
                ></img>
                <div className=" flex h-auto w-auto  bg-white ml-7 rounded-xl p-2">
                  <div className="h-auto flex flex-col">
                    {" "}
                    <h1 className="text-lg text-gray-500">
                      สถานที่จัดการแสดง {concert.address_concert}
                    </h1>
                    <div className="flex flex-row justify-start ">
                      <h1 className="text-lg text-gray-500 ">ราคาบัตร :</h1>
                      <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-lg whitespace-normal">
                        {concertTicket.map((concertTic) => (
                          <h1 className="text-lg text-gray-500 justify-start pl-3 max-w-lg">
                            {concertTic.name_type_ticket}/{concertTic.price} บาท
                          </h1>
                        ))}
                      </h1>
                    </div>
                    <div className="flex flex-col  ">
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
