import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import Calendar from "@mui/icons-material/Event";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  { useState } from "react";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";
import { ConcertService } from "../../../service/concertService";

function AddConcertP4Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const concertService = new ConcertService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [selectedValue, setSelectedValue] = useState(1);
  const {
    poster,
    image,
    name_concert,
    lineup,
    concert_type,
    show_schedule_concert,
    address_concert,
    province,
    detail_concert,
    getUrl1,
    getUrl2,
    getUrl3,
  } = location.state;
  const [getshow1, setGetShow1] = useState<Dayjs | null>(null);
  const [gettime1, setGetTime1] = useState("");
  const [getshow2, setGetShow2] = useState<Dayjs | null>(null);
  const [gettime2, setGetTime2] = useState("");
  const [getshow3, setGetShow3] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [gettime3, setGetTime3] = useState("");
  const [isLoad, setLoad] = useState(false);

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  function navigateToAddConcertP3Page() {
    navigate("/AddConcertP3", {
      state: {
        poster,
        image,
        name_concert,
        lineup,
        concert_type,
        show_schedule_concert,
        address_concert,
        province,
        detail_concert,
      },
    });
  }
  function navigateToAddConcertDataPage() {
    window.alert("ข้อมูลของคอนเสิร์ต ได้ลงทะเบียนแล้ว!!!");
    navigate("/AddConcertData");
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
      <div className="addconcertp4-cont">
        <div style={{ display: "flex", flexDirection: "column" }}>
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
              เพิ่มข้อมูลรอบการแสดง
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 370,
              borderRadius: 3,
              bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl sx={{ width: "550px", mt: 3 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  รอบการแสดง
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                  // defaultValue={2}
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={1}>วันต่อวัน</MenuItem>
                  <MenuItem value={2}>รวมวันแสดง</MenuItem>
                </Select>
              </FormControl>

              {(selectedValue === 1 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={getshow1}
                        onChange={(e) => setGetShow1(e)}
                      />
                    </LocalizationProvider>
                    <div
                      style={{
                        marginLeft: "15px",
                        display: "flex",
                        marginTop: "10px",
                      }}
                    >
                      <TextField
                        // disabled
                        placeholder="เวลา"
                        type="Time"
                        sx={{ width: "285px" }}
                        value={gettime1}
                        onChange={(e) => setGetTime1(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "20px",
                            bgcolor: "white",
                            height: "35px",
                          },
                          startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={getshow2}
                        onChange={(e) => setGetShow2(e)}
                      />
                    </LocalizationProvider>
                    <div
                      style={{
                        marginLeft: "15px",
                        display: "flex",
                        marginTop: "10px",
                      }}
                    >
                      <TextField
                        placeholder="เวลา"
                        type="Time"
                        sx={{ width: "285px" }}
                        value={gettime2}
                        onChange={(e) => setGetTime2(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "20px",
                            bgcolor: "white",
                            height: "35px",
                          },
                          startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                        }}
                      />
                    </div>
                  </div>
                </>
              )) ||
                (selectedValue === 2 && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: "30px",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                          value={getshow3}
                          onChange={(e) => setGetShow3(e)}
                          slots={{ field: SingleInputDateRangeField }}
                          slotProps={{
                            textField: {
                              InputProps: { endAdornment: <Calendar /> },
                            },
                          }}
                        />
                      </LocalizationProvider>
                      <div
                        style={{
                          marginLeft: "15px",
                          display: "flex",
                          marginTop: "10px",
                        }}
                      >
                        <TextField
                          // disabled
                          placeholder="เวลา"
                          type="Time"
                          sx={{ width: "285px" }}
                          value={gettime3}
                          onChange={(e) => setGetTime3(e.target.value)}
                          InputProps={{
                            sx: {
                              borderRadius: "20px",
                              bgcolor: "white",
                              height: "35px",
                            },
                            startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                          }}
                        />
                      </div>
                    </div>
                  </>
                ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#343434" }}
                  sx={{
                    width: "110px",
                    borderRadius: "10px",
                  }}
                  startIcon={<KeyboardArrowLeftIcon />}
                  onClick={navigateToAddConcertP3Page}
                >
                  กลับหน้า
                </Button>
                {isLoad ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      style={{ marginRight: "20px", color: "black" }}
                    />
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#3B7AF4" }}
                    sx={{
                      width: "100px",
                      borderRadius: "10px",
                    }}
                    startIcon={<ChevronRightIcon />}
                    onClick={async () => {
                      try {
                        setLoad(true);

                        if (selectedValue == 1) {
                          if (
                            getshow1 == null ||
                            gettime1 == "" ||
                            getshow2 == null ||
                            gettime2 == ""
                          ) {
                            window.alert(
                              "ข้อมูลไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                            );
                          } else {
                            const getarrayshow1 = getshow1?.get("D").valueOf();
                            const getarrayshow2 = getshow1?.get("M").valueOf();
                            const getarrayshow3 = getshow1?.get("y").valueOf();
                            const getstr1 =
                              getarrayshow3 +
                              "-" +
                              (getarrayshow2 + 1) +
                              "-" +
                              getarrayshow1;
                            const getarrayshow4 = getshow2?.get("D").valueOf();
                            const getarrayshow5 = getshow2?.get("M").valueOf();
                            const getarrayshow6 = getshow2?.get("y").valueOf();
                            const getstr2 =
                              getarrayshow6 +
                              "-" +
                              (getarrayshow5 + 1) +
                              "-" +
                              getarrayshow4;

                            const resconcert = await concertService.AddConcert(
                              user?.uid,
                              concert_type,
                              poster,
                              image,
                              show_schedule_concert,
                              name_concert,
                              lineup,
                              address_concert,
                              province,
                              detail_concert
                            );
                            const last_idx: string = resconcert.data.last_idx;
                            // console.log(last_idx);
                            if (resconcert.status == 201) {
                              if (getUrl1) {
                                const resurl1 =
                                  await concertService.AddConcertUrl(
                                    last_idx,
                                    getUrl1
                                  );
                                console.log(resurl1.status);
                              }
                              if (getUrl2) {
                                const resurl2 =
                                  await concertService.AddConcertUrl(
                                    last_idx,
                                    getUrl2
                                  );
                                console.log(resurl2.status);
                              }
                              if (getUrl3) {
                                const resurl3 =
                                  await concertService.AddConcertUrl(
                                    last_idx,
                                    getUrl3
                                  );
                                console.log(resurl3.status);
                              }

                              if (getstr1 && gettime1) {
                                const resshow1 =
                                  await concertService.AddShowTime(
                                    last_idx,
                                    getstr1,
                                    gettime1
                                  );
                                console.log(resshow1.status);
                              }

                              if (getstr2 && gettime2) {
                                const resshow2 =
                                  await concertService.AddShowTime(
                                    last_idx,
                                    getstr2,
                                    gettime2
                                  );
                                console.log(resshow2.status);
                                navigateToAddConcertDataPage();
                              }
                            }
                          }
                        } else {
                          // console.log(getshow3);
                          if (getshow3 == null || gettime3 == "") {
                            window.alert(
                              "ข้อมูลไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                            );
                          } else {
                            if (getshow3[0] && getshow3[1] && gettime3 !== "") {
                              const getarrayshow1 = getshow3[0]?.get("D").valueOf() || 0;
                              const getarrayshow2 = getshow3[0]?.get("M").valueOf() || 0;
                              const getarrayshow3 = getshow3[0]?.get("y").valueOf() || 0;
                              const getstr1 = `${getarrayshow3}-${getarrayshow2 + 1}-${getarrayshow1}`;
                            
                              const getarrayshow4 = getshow3[1]?.get("D").valueOf() || 0;
                              const getarrayshow5 = getshow3[1]?.get("M").valueOf() || 0;
                              const getarrayshow6 = getshow3[1]?.get("y").valueOf() || 0;
                              const getstr2 = `${getarrayshow6}-${getarrayshow5 + 1}-${getarrayshow4}`;
                            
                              const getstr3 = `${getstr1} - ${getstr2}`;
                            
                              // ดำเนินการเพิ่มคอนเสิร์ต
                              const resconcert = await concertService.AddConcert(
                                user?.uid,
                                concert_type,
                                poster,
                                image,
                                show_schedule_concert,
                                name_concert,
                                lineup,
                                address_concert,
                                province,
                                detail_concert
                              );
                              
                              const last_idx: string = resconcert.data.last_idx;
                              
                              if (resconcert.status === 201) {
                                if (getUrl1) {
                                  const resurl1 = await concertService.AddConcertUrl(last_idx, getUrl1);
                                  console.log(resurl1.status);
                                }
                                if (getUrl2) {
                                  const resurl2 = await concertService.AddConcertUrl(last_idx, getUrl2);
                                  console.log(resurl2.status);
                                }
                                if (getUrl3) {
                                  const resurl3 = await concertService.AddConcertUrl(last_idx, getUrl3);
                                  console.log(resurl3.status);
                                }
                            
                                if (getstr3 && gettime3) {
                                  const resshow = await concertService.AddShowTime(last_idx, getstr3, gettime3);
                                  console.log(resshow.status);
                                  navigateToAddConcertDataPage();
                                }
                              }
                            } else {
                              window.alert("ข้อมูลไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่");
                            }
                            
                          }
                        }
                        setLoad(false);
                      } catch (error) {
                        setLoad(false);
                        console.log(error);
                      }
                    }}
                  >
                    ถัดไป
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
export default AddConcertP4Page;
