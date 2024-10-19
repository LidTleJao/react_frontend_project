import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import { useState } from "react";

function AddHotelPage() {
  const [hotelName, setHotelName] = useState("");
  const [hotelType, setHotelType] = useState(1);
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(false);

  function navigateToAddHotelP2Page() {
    navigate("/AddHotelP2", {
      state: {
        hotelName,
        hotelType,
        province,
        address,
        description,
      },
    });
  }
  function navigateToAddHotelDataPage() {
    navigate("/AddHotelData");
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
      <div className="addhotel-cont">
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
              เพิ่มโรงแรม
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 470,
              maxHeight: 470,
              paddingBottom: 2,
              borderRadius: 3,
              bgcolor: "#D9D9D9",
              border: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                placeholder="ชื่อโรงแรม"
                type="name"
                sx={{ mt: 3, width: "25pc" }}
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                //   onChange={(e) => setName(e.target.value)}
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
                  ชนิดโรมแรม
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="ชนิดโรงแรม"
                  defaultValue={1}
                  value={hotelType}
                  // type="city"
                  onChange={(e) => setHotelType(Number(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={1}>โรงแรม</MenuItem>
                  <MenuItem value={2}>รีสอร์ท</MenuItem>
                  <MenuItem value={3}>บังกะโล</MenuItem>
                </Select>
              </FormControl>
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
                  defaultValue={"กาฬสินธุ์"}
                  value={province}
                  // type="city"
                  onChange={(e) => setProvince(String(e.target.value))}
                  sx={{
                    borderRadius: 20,
                    bgcolor: "white",
                    height: "40px",
                  }}
                >
                  <MenuItem value={"กรุงเทพมหานคร"}>กรุงเทพมหานคร</MenuItem>
                  <MenuItem value={"กระบี่"}>กระบี่</MenuItem>
                  <MenuItem value={"กาญจนบุรี"}>กาญจนบุรี</MenuItem>
                  <MenuItem value={"กาฬสินธุ์"}>กาฬสินธุ์</MenuItem>
                  <MenuItem value={"กำแพงเพชร"}>กำแพงเพชร</MenuItem>
                  <MenuItem value={"ขอนแก่น"}>ขอนแก่น</MenuItem>
                  <MenuItem value={"จันทบุรี"}>จันทบุรี</MenuItem>
                  <MenuItem value={"ฉะเชิงเทรา"}>ฉะเชิงเทรา</MenuItem>
                  <MenuItem value={"ชลบุรี"}>ชลบุรี</MenuItem>
                  <MenuItem value={"ชัยนาท"}>ชัยนาท</MenuItem>
                  <MenuItem value={"ชัยภูมิ"}>ชัยภูมิ</MenuItem>
                  <MenuItem value={"ชุมพร"}>ชุมพร</MenuItem>
                  <MenuItem value={"เชียงราย"}>เชียงราย</MenuItem>
                  <MenuItem value={"เชียงใหม่"}>เชียงใหม่</MenuItem>
                  <MenuItem value={"ตรัง"}>ตรัง</MenuItem>
                  <MenuItem value={"ตราด"}>ตราด</MenuItem>
                  <MenuItem value={"ตาก"}>ตาก</MenuItem>
                  <MenuItem value={"นครนายก"}>นครนายก</MenuItem>
                  <MenuItem value={"นครปฐม"}>นครปฐม</MenuItem>
                  <MenuItem value={"นครพนม"}>นครพนม</MenuItem>
                  <MenuItem value={"นครราชสีมา"}>นครราชสีมา</MenuItem>
                  <MenuItem value={"นครศรีธรรมราช"}>นครศรีธรรมราช</MenuItem>
                  <MenuItem value={"นครสวรรค์"}>นครสวรรค์</MenuItem>
                  <MenuItem value={"นนทบุรี"}>นนทบุรี</MenuItem>
                  <MenuItem value={"นราธิวาส"}>นราธิวาส</MenuItem>
                  <MenuItem value={"น่าน"}>น่าน</MenuItem>
                  <MenuItem value={"บึงกาฬ"}>บึงกาฬ</MenuItem>
                  <MenuItem value={"บุรีรัมย์"}>บุรีรัมย์</MenuItem>
                  <MenuItem value={"ปทุมธานี"}>ปทุมธานี</MenuItem>
                  <MenuItem value={"ประจวบคีรีขันธ์"}>ประจวบคีรีขันธ์</MenuItem>
                  <MenuItem value={"ปราจีนบุรี"}>ปราจีนบุรี</MenuItem>
                  <MenuItem value={"ปัตตานี"}>ปัตตานี</MenuItem>
                  <MenuItem value={"พระนครศรีอยุธยา"}>พระนครศรีอยุธยา</MenuItem>
                  <MenuItem value={"พังงา"}>พังงา</MenuItem>
                  <MenuItem value={"พัทลุง"}>พัทลุง</MenuItem>
                  <MenuItem value={"พิจิตร"}>พิจิตร</MenuItem>
                  <MenuItem value={"พิษณุโลก"}>พิษณุโลก</MenuItem>
                  <MenuItem value={"เพชรบุรี"}>เพชรบุรี</MenuItem>
                  <MenuItem value={"เพชรบูรณ์"}>เพชรบูรณ์</MenuItem>
                  <MenuItem value={"แพร่"}>แพร่</MenuItem>
                  <MenuItem value={"พะเยา"}>พะเยา</MenuItem>
                  <MenuItem value={"ภูเก็ต"}>ภูเก็ต</MenuItem>
                  <MenuItem value={"มหาสารคาม"}>มหาสารคาม</MenuItem>
                  <MenuItem value={"มุกดาหาร"}>มุกดาหาร</MenuItem>
                  <MenuItem value={"แม่ฮ่องสอน"}>แม่ฮ่องสอน</MenuItem>
                  <MenuItem value={"ยโสธร"}>ยโสธร</MenuItem>
                  <MenuItem value={"ยะลา"}>ยะลา</MenuItem>
                  <MenuItem value={"ร้อยเอ็ด"}>ร้อยเอ็ด</MenuItem>
                  <MenuItem value={"ระนอง"}>ระนอง</MenuItem>
                  <MenuItem value={"ระยอง"}>ระยอง</MenuItem>
                  <MenuItem value={"ราชบุรี"}>ราชบุรี</MenuItem>
                  <MenuItem value={"ลพบุรี"}>ลพบุรี</MenuItem>
                  <MenuItem value={"ลำปาง"}>ลำปาง</MenuItem>
                  <MenuItem value={"ลำพูน"}>ลำพูน</MenuItem>
                  <MenuItem value={"เลย"}>เลย</MenuItem>
                  <MenuItem value={"ศรีสะเกษ"}>ศรีสะเกษ</MenuItem>
                  <MenuItem value={"สกลนคร"}>สกลนคร</MenuItem>
                  <MenuItem value={"สงขลา"}>สงขลา</MenuItem>
                  <MenuItem value={"สตูล"}>สตูล</MenuItem>
                  <MenuItem value={"สมุทรปราการ"}>สมุทรปราการ</MenuItem>
                  <MenuItem value={"สมุทรสงคราม"}>สมุทรสงคราม</MenuItem>
                  <MenuItem value={"สมุทรสาคร"}>สมุทรสาคร</MenuItem>
                  <MenuItem value={"สระแก้ว"}>สระแก้ว</MenuItem>
                  <MenuItem value={"สระบุรี"}>สระบุรี</MenuItem>
                  <MenuItem value={"สิงห์บุรี"}>สิงห์บุรี</MenuItem>
                  <MenuItem value={"สุโขทัย"}>สุโขทัย</MenuItem>
                  <MenuItem value={"สุพรรณบุรี"}>สุพรรณบุรี</MenuItem>
                  <MenuItem value={"สุราษฎร์ธานี"}>สุราษฎร์ธานี</MenuItem>
                  <MenuItem value={"สุรินทร์"}>สุรินทร์</MenuItem>
                  <MenuItem value={"หนองคาย"}>หนองคาย</MenuItem>
                  <MenuItem value={"หนองบัวลำภู"}>หนองบัวลำภู</MenuItem>
                  <MenuItem value={"อ่างทอง"}>อ่างทอง</MenuItem>
                  <MenuItem value={"อำนาจเจริญ"}>อำนาจเจริญ</MenuItem>
                  <MenuItem value={"อุดรธานี"}>อุดรธานี</MenuItem>
                  <MenuItem value={"อุตรดิตถ์"}>อุตรดิตถ์</MenuItem>
                  <MenuItem value={"อุทัยธานี"}>อุทัยธานี</MenuItem>
                  <MenuItem value={"อุบลราชธานี"}>อุบลราชธานี</MenuItem>
                </Select>
              </FormControl>
              <TextField
                placeholder="ที่อยู่ของโรมแรม"
                type="map"
                value={address}
                sx={{ mt: 2, width: "25pc" }}
                onChange={(e) => setAddress(String(e.target.value))}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    bgcolor: "white",
                    height: "35px",
                  },
                  startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                }}
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                maxRows={4}
                placeholder="รายละเอียดของโรงแรม"
                value={description}
                onChange={(e) => setDescription(String(e.target.value))}
                style={{
                  borderRadius: "5px",
                  marginTop: 20,
                  backgroundColor: "white",
                }}
              />
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
                  onClick={navigateToAddHotelDataPage}
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
                    // onClick={navigateToAddHotelP2Page}
                    onClick={async () => {
                      try {
                        setLoad(true);
                        if (hotelName == "") {
                          window.alert(
                            "ชื่อโรงแรมไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                          );
                        } else {
                          if (province == "") {
                            window.alert(
                              "ข้อมูลจังหวัดไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                            );
                          } else {
                            if (address == "") {
                              window.alert(
                                "ที่อยู่โรงแรมไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                              );
                            } else {
                              if (description == "") {
                                window.alert(
                                  "รายละเอียดโรงแรมไม่ถูกต้อง โปรดกรอกข้อมูลใหม่"
                                );
                              } else {
                                navigateToAddHotelP2Page();
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
export default AddHotelPage;
