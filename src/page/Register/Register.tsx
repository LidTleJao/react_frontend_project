import {
  CardMedia,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import Header from "../../components/Head";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { UserService } from "../../service/userService";

function RegisterPage() {
  const nameRef = useRef<HTMLInputElement>();
  const nicknameRef = useRef<HTMLInputElement>();
  const facebookRef = useRef<HTMLInputElement>();
  const provinceRef = useRef<HTMLInputElement>();
  const type_userRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();

  const userservice = new UserService();

  const navigate = useNavigate();

  // Loading
  const [isLoad, setLoad] = useState(false);

  function navigateToLoginPage() {
    navigate("/");
  }

  return (
    <>
      <Header />
      <div className="register-cont">
        <div
          style={{
            justifyContent: "start",
            flexDirection: "row",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "155px",
            }}
          >
            <CardMedia
              sx={{
                height: 400,
                width: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fwebteemi.png?alt=media&token=530da670-02e1-42e6-ae4c-67a96b423e51"
            />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "80px",
              marginLeft: "300px",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Kanit, sans-serif"
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Kanit, sans-serif"
                }}
                variant="h5"
              >
                ลงทะเบียน
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: 500,
                  height: 600,
                  borderRadius: 10,
                  backgroundColor: "#D9D9D9",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "30px",
                  }}
                >
                  <div style={{ display: "flex", marginLeft: "40px" }}>
                    <Typography gutterBottom variant="h6" sx={{ fontFamily: "Kanit, sans-serif" }}>
                      ข้อมูลส่วนตัว
                    </Typography>
                  </div>
                  <div style={{ display: "flex", marginLeft: "30px" }}>
                    <TextField
                      placeholder="ชื่อ-นามสกุล"
                      inputRef={nameRef}
                      sx={{ m: 1, width: "26pc" }}
                      //   onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                          fontFamily: "Kanit, sans-serif"
                        },
                        startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "30px" }}>
                    <TextField
                      placeholder="ชื่อเล่น"
                      inputRef={nicknameRef}
                      type="nickname"
                      sx={{ m: 1, width: "26pc" }}
                      //   onChange={(e) => setNickname(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                          fontFamily: "Kanit, sans-serif"
                        },
                        startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "30px" }}>
                    <TextField
                      placeholder="Facebook"
                      inputRef={facebookRef}
                      // type="link"
                      sx={{ m: 1, width: "26pc" }}
                      //   onChange={(e) => setBirthday(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                          fontFamily: "Kanit, sans-serif"
                        },
                        startAdornment: <></>,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "40px", marginTop: "15px" }}>
                    <FormControl sx={{ width: 415 }}>
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ marginTop: "-12px", fontFamily: "Kanit, sans-serif", fontSize: "20px", }}
                      >
                        จังหวัด
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="จังหวัด"
                        inputRef={provinceRef}
                        defaultValue={"ขอนแก่น"}
                        // onChange={(e) => setCity(e.target.value)}
                        sx={{
                          borderRadius: 20,
                          bgcolor: "white",
                          height: "40px",
                          fontFamily: "Kanit, sans-serif"
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                fontFamily: "Kanit, sans-serif", // กำหนดฟอนต์ให้กับทุก MenuItem
                                fontSize: "16px",
                                padding: "10px",
                              },
                              "& .MuiMenuItem-root:hover": {
                                bgcolor: "#f0f0f0", // สีพื้นหลังเมื่อ hover
                              }
                            }
                          }
                        }}
                      >
                        <MenuItem value={"กรุงเทพมหานคร"}>
                          กรุงเทพมหานคร
                        </MenuItem>
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
                        <MenuItem value={"นครศรีธรรมราช"}>
                          นครศรีธรรมราช
                        </MenuItem>
                        <MenuItem value={"นครสวรรค์"}>นครสวรรค์</MenuItem>
                        <MenuItem value={"นนทบุรี"}>นนทบุรี</MenuItem>
                        <MenuItem value={"นราธิวาส"}>นราธิวาส</MenuItem>
                        <MenuItem value={"น่าน"}>น่าน</MenuItem>
                        <MenuItem value={"บึงกาฬ"}>บึงกาฬ</MenuItem>
                        <MenuItem value={"บุรีรัมย์"}>บุรีรัมย์</MenuItem>
                        <MenuItem value={"ปทุมธานี"}>ปทุมธานี</MenuItem>
                        <MenuItem value={"ประจวบคีรีขันธ์"}>
                          ประจวบคีรีขันธ์
                        </MenuItem>
                        <MenuItem value={"ปราจีนบุรี"}>ปราจีนบุรี</MenuItem>
                        <MenuItem value={"ปัตตานี"}>ปัตตานี</MenuItem>
                        <MenuItem value={"พระนครศรีอยุธยา"}>
                          พระนครศรีอยุธยา
                        </MenuItem>
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
                  </div>
                  <div style={{ display: "flex", marginLeft: "40px", marginTop: "15px" }}>
                    <FormControl sx={{ mt: 1, width: 415 }}>
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ marginTop: "-12px", fontFamily: "Kanit, sans-serif", fontSize: "20px", }}
                      >
                        ประเภทของผู้ใช้
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        inputRef={type_userRef}
                        defaultValue={1}
                        sx={{
                          borderRadius: 20,
                          bgcolor: "white",
                          height: "40px",
                          fontFamily: "Kanit, sans-serif"
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                fontFamily: "Kanit, sans-serif", // กำหนดฟอนต์ให้กับทุก MenuItem
                                fontSize: "16px",
                                padding: "10px",
                              },
                              "& .MuiMenuItem-root:hover": {
                                bgcolor: "#f0f0f0", // สีพื้นหลังเมื่อ hover
                              }
                            }
                          }
                        }}
                      >
                        <MenuItem value={1}>ผู้ใช้ทั่วไป</MenuItem>
                        <MenuItem value={2}>ผู้ประกอบการ</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", marginLeft: "30px" }}>
                    <TextField
                      placeholder="เบอร์โทรศัพท์"
                      type="phone"
                      inputRef={phoneRef}
                      sx={{ m: 1, width: "26pc" }}
                      //   onChange={(e) => setPhone(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                          fontFamily: "Kanit, sans-serif"
                        },
                        startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "40px" }}>
                    <Typography gutterBottom variant="h6" sx={{ fontFamily: "Kanit, sans-serif" }}>
                      อีเมลและรหัสผ่าน
                    </Typography>
                  </div>
                  <div style={{ display: "flex", marginLeft: "30px" }}>
                    <TextField
                      placeholder="อีเมล"
                      inputRef={emailRef}
                      type="email"
                      sx={{ m: 1, width: "26pc" }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                          fontFamily: "Kanit, sans-serif"
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "30px" }}>
                    <TextField
                      placeholder="รหัสผ่าน"
                      inputRef={passRef}
                      type="password"
                      autoComplete="current-password"
                      sx={{ m: 1, width: "26pc" }}
                      //   onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                          fontFamily: "Kanit, sans-serif"
                        },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "end",
                      marginTop: "20px",
                    }}
                  >
                    {isLoad ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress
                          style={{ marginRight: "40px", color: "black" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          marginRight: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="info"
                          sx={{ width: "100px", borderRadius: "10px", fontFamily: "Kanit, sans-serif" }}
                          onClick={async () => {
                            try {
                              if (passRef.current!.value.length < 6) {
                                window.alert(`รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร`);
                              } else if (!/^\d{10}$/.test(phoneRef.current!.value)) {
                                window.alert(`เบอร์โทรศัพท์ต้องเป็นตัวเลขและมีความยาว 10 หลัก`);
                              } else if (!emailRef.current!.value.includes("@")) {
                                window.alert(`โปรดตรวจสอบอีเมลว่าถูกต้องหรือไม่`);
                              } else {
                                if (
                                  nameRef.current?.value &&
                                  nicknameRef.current?.value &&
                                  facebookRef.current?.value &&
                                  provinceRef.current?.value &&
                                  phoneRef.current?.value &&
                                  type_userRef.current?.value &&
                                  emailRef.current?.value.includes("@") &&
                                  passRef.current?.value
                                ) {
                                  setLoad(true);
                                  const res = await userservice.register(
                                    nameRef.current!.value,
                                    nicknameRef.current!.value,
                                    facebookRef.current!.value,
                                    phoneRef.current!.value,
                                    provinceRef.current!.value,
                                    emailRef.current!.value,
                                    passRef.current!.value,
                                    parseInt(type_userRef.current!.value)
                                  );
                                  setLoad(false);
                                  if (res.status === 201) {
                                    window.alert("ข้อมูลของผู้ใช้งาน ได้ลงทะเบียนแล้ว!!!");
                                    navigate("/");
                                  }
                                } else {
                                  window.alert(`โปรดตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่`);
                                }
                              }
                            } catch (error) {
                              setLoad(false);
                              window.alert("ข้อมูลอีเมลมีแล้ว โปรดตรวจสอบข้อมูลใหม่อีกครั้ง");
                              console.log(error);
                            }
                          }}

                        >
                          ยืนยัน
                        </Button>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        marginRight: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#343434" }}
                        sx={{
                          width: "100px",
                          borderRadius: "10px",
                          fontFamily: "Kanit, sans-serif"
                        }}
                        onClick={navigateToLoginPage}
                      >
                        กลับ
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
