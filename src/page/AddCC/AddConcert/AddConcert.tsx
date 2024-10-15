import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import { useState } from "react";

function AddConcertPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [name_concert, setName_concert] = useState("");
  const [lineup, setLineup] = useState("");
  const [concert_type, setConcert_type] = useState(1);
  const [show_schedule_concert, setShow_schedule_concert] = useState("");
  const [address_concert, setAddress_concert] = useState("");
  const [province, setProvince] = useState("");
  const [detail_concert, setDetail_concert] = useState("");
  const [isLoad, setLoad] = useState(false);

  function navigateToAddConcertDataPage() {
    navigate("/AddConcertData");
  }
  function navigateToAddConcertP2Page() {
    navigate("/AddConcertP2", {
      state: {
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
      <div className="addconcert-cont">
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
              เพิ่มคอนเสิร์ต
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 570,
              maxHeight: 570,
              paddingBottom: 5,
              borderRadius: 3,
              bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                placeholder="ชื่อคอนเสิร์ต"
                type="name"
                sx={{ mt: 3, width: "25pc" }}
                value={name_concert}
                onChange={(e) => setName_concert(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <TextField
                placeholder="ไลน์อัพ"
                // type="name"
                sx={{ mt: 3, width: "25pc" }}
                value={lineup}
                onChange={(e) => setLineup(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  ประเภทของคอนเสิร์ต
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={concert_type}
                  label="ประเภทของคอนเสิร์ต"
                  onChange={(e) => setConcert_type(Number(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={1}>คอนเสิร์ตเดี่ยว (Solo Concert)</MenuItem>
                  <MenuItem value={2}>
                    คอนเสิร์ตรวมศิลปิน (Music Festival/All-Star Concert)
                  </MenuItem>
                  <MenuItem value={3}>
                    คอนเสิร์ตการกุศล (Charity Concert)
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                placeholder="วันที่ทำการแสดง"
                type="Date"
                sx={{ mt: 2, width: "25pc" }}
                value={show_schedule_concert}
                onChange={(e) => setShow_schedule_concert(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <TextField
                placeholder="ที่อยู่"
                type="address"
                sx={{ mt: 2, width: "25pc" }}
                value={address_concert}
                onChange={(e) => setAddress_concert(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <FormControl sx={{ width: "25pc", mt: 2 }}>
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ marginTop: "-5px" }}
                >
                  จังหวัด
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="จังหวัด"
                  // defaultValue={"กาฬสินธุ์"}
                  value={province}
                  // type="city"
                  onChange={(e) => setProvince(e.target.value)}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={"กาฬสินธุ์"}>กาฬสินธุ์</MenuItem>
                  <MenuItem value={"ขอนแก่น"}>ขอนแก่น</MenuItem>
                  <MenuItem value={"มหาสารคาม"}>มหาสารคาม</MenuItem>
                </Select>
              </FormControl>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                maxRows={3}
                placeholder="รายละเอียดของคอนเสิรต์"
                value={detail_concert}
                onChange={(e) => setDetail_concert(e.target.value)}
                style={{
                  borderRadius: "5px",
                  marginTop: 10,
                  backgroundColor: "white",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "30px",
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
                  onClick={navigateToAddConcertDataPage}
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
                    // onClick={navigateToAddConcertP2Page}
                    onClick={async () => {
                      try {
                        setLoad(true);
                        if (name_concert == "") {
                          window.alert(
                            "ชื่อคอนเสิร์ตไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                          );
                        } else {
                          if (lineup == "") {
                            window.alert(
                              "ไลน์อัพไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                            );
                          } else {
                            if (show_schedule_concert == "") {
                              window.alert(
                                "วันที่ไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                              );
                            } else {
                              if (address_concert == "") {
                                window.alert(
                                  "ที่อยู่ไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                );
                              } else {
                                if (province == "") {
                                  window.alert(
                                    "จังหวัดไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                  );
                                } else {
                                  if (detail_concert == "") {
                                    window.alert(
                                      "รายละเอียดไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                                    );
                                  } else {
                                    console.log(name_concert);
                                    console.log(lineup);
                                    console.log(concert_type);
                                    console.log(show_schedule_concert);
                                    console.log(address_concert);
                                    console.log(province);
                                    console.log(detail_concert);
                                    navigateToAddConcertP2Page();
                                  }
                                }
                              }
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
export default AddConcertPage;
