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
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontWeight: "bold",
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
                    <Typography gutterBottom variant="h6">
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
                        },
                        startAdornment: <></>,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "40px" }}>
                    <FormControl sx={{ width: 415 }}>
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
                        inputRef={provinceRef}
                        defaultValue={"ขอนแก่น"}
                        // onChange={(e) => setCity(e.target.value)}
                        sx={{
                          borderRadius: 20,
                          bgcolor: "white",
                          height: "40px",
                        }}
                      >
                        <MenuItem value={"ขอนแก่น"}>ขอนแก่น</MenuItem>
                        <MenuItem value={"กาฬสินธุ์"}>กาฬสินธุ์</MenuItem>
                        <MenuItem value={"มหาสารคาม"}>มหาสารคาม</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", marginLeft: "40px" }}>
                    <FormControl sx={{ mt: 1, width: 415 }}>
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ marginTop: "-5px" }}
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
                        },
                        startAdornment: <>{/* <h3>Prapanpong</h3> */}</>,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginLeft: "40px" }}>
                    <Typography gutterBottom variant="h6">
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
                          style={{ marginLeft: "40px", color: "black" }}
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
                          sx={{ width: "100px", borderRadius: "10px" }}
                          // onClick={handleSubmit}
                          onClick={async () => {
                            try {
                              if (passRef.current!.value.length < 6) {
                                window.alert(
                                  `รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร`
                                );
                              } else {
                                if (!emailRef.current!.value.includes("@")) {
                                  window.alert(
                                    `โปรดตรวจสอบอีเมลว่าถูกต้องหรือไม่`
                                  );
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
                                    console.log(nameRef.current?.value);
                                    console.log(nicknameRef.current?.value);
                                    console.log(facebookRef.current?.value);
                                    console.log(provinceRef.current?.value);
                                    console.log(phoneRef.current?.value);
                                    console.log(type_userRef.current?.value);
                                    console.log(emailRef.current?.value);
                                    console.log(passRef.current?.value);
                                    setLoad(false);
                                    if (res.status === 201) {
                                      console.log(res.data);
                                      navigate("/");
                                    }
                                  } else {
                                    window.alert(
                                      `โปรดตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่`
                                    );
                                  }
                                }
                              }
                            } catch (error) {
                              setLoad(false);
                              window.alert(
                                "ข้อมูลไม่ถูกต้อง โปรดตรวจสอบข้อมูลใหม่"
                              );
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
