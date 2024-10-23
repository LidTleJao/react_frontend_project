import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UserService } from "../../../service/userService";

function EditProfileUserPage() {
  const userService = new UserService();
  const [user] = useState(JSON.parse(localStorage.getItem("objUser")!));
  const [imagePreview, setImagePreview] = useState(user?.image_user || "");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const name_userRef = useRef<HTMLInputElement>();
  const nick_userRef = useRef<HTMLInputElement>();
  const provinceRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const facebookRef = useRef<HTMLInputElement>();
  const lineIDRef = useRef<HTMLInputElement>();

  // Loading
  const [isLoad, setLoad] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // ใช้ ? เพื่อให้แน่ใจว่ามีไฟล์ถูกเลือก
    if (file) {
      setSelectedFile(file); // เก็บไฟล์ที่เลือกไว้ใน state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // อัพเดท preview
      };
      reader.readAsDataURL(file);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
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
      <div className="editprofileuser-cont">
        {/* <h1>Hello world editprofileuser</h1> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                แก้ไขข้อมูล
              </Typography>
            </div>
            <Box
              sx={{
                width: 650,
                height: 770,
                borderRadius: 3,
                bgcolor: "#D9D9D9",
                border: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: 180,
                      height: 170,
                      borderRadius: 3,
                      bgcolor: "white",
                      border: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      sx={{ maxHeight: 180, maxWidth: 180, borderRadius: 3 }}
                    >
                      <CardActionArea>
                        <CardMedia
                          sx={{ display: "flex", justifyContent: "center" }}
                          component="img"
                          // height="300"
                          image={imagePreview}
                        />
                      </CardActionArea>
                    </Card>
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    component="label"
                    // role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    style={{ backgroundColor: "#343434" }}
                    sx={{
                      width: "120px",
                      borderRadius: "10px",
                    }}
                  >
                    Upload
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      // onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    // marginRight: "100px",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        color: "black",
                        fontStyle: "normal",
                        marginTop: "5px",
                      }}
                      variant="h6"
                    >
                      ชื่อ-นามสกุล:
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <TextField
                      placeholder={user?.name_user}
                      defaultValue={user?.name_user}
                      inputRef={name_userRef}
                      sx={{ width: "15pc" }}
                      //   onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          bgcolor: "white",
                          height: "35px",
                        },
                        // startAdornment: <></>,
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    // marginRight: "100px",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        color: "black",
                        fontStyle: "normal",
                        marginTop: "5px",
                      }}
                      variant="h6"
                    >
                      ชื่อเล่น:
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <TextField
                      placeholder={user?.nick_user}
                      defaultValue={user?.nick_user}
                      inputRef={nick_userRef}
                      sx={{ width: "15pc" }}
                      //   onChange={(e) => setName(e.target.value)}
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
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    // marginRight: "100px",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        color: "black",
                        fontStyle: "normal",
                        marginTop: "5px",
                      }}
                      variant="h6"
                    >
                      จังหวัด:
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      // paddingTop: "5px",
                    }}
                  >
                    <FormControl sx={{ width: 230 }}>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="จังหวัด"
                        inputRef={provinceRef}
                        defaultValue={user?.province}
                        type="city"
                        sx={{
                          borderRadius: 20,
                          bgcolor: "white",
                          height: "40px",
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
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    // marginRight: "100px",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        color: "black",
                        fontStyle: "normal",
                        marginTop: "5px",
                      }}
                      variant="h6"
                    >
                      เบอร์โทร:
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <TextField
                      placeholder={user?.phone}
                      defaultValue={user?.phone}
                      inputRef={phoneRef}
                      sx={{ width: "15pc" }}
                      //   onChange={(e) => setName(e.target.value)}
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
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    // marginRight: "100px",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        color: "black",
                        fontStyle: "normal",
                        marginTop: "5px",
                      }}
                      variant="h6"
                    >
                      Facebook:
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <TextField
                      placeholder={user?.facebook}
                      defaultValue={user?.facebook}
                      inputRef={facebookRef}
                      sx={{ width: "15pc" }}
                      //   onChange={(e) => setName(e.target.value)}
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
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    // marginRight: "100px",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        color: "black",
                        fontStyle: "normal",
                        marginTop: "5px",
                      }}
                      variant="h6"
                    >
                      LineID:
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <TextField
                      placeholder={user?.lineID}
                      defaultValue={user?.lineID}
                      inputRef={lineIDRef}
                      sx={{ width: "15pc" }}
                      //   onChange={(e) => setName(e.target.value)}
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
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        style={{ marginRight: "20px", color: "black" }}
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
                        style={{ backgroundColor: "#343434" }}
                        sx={{ width: "100px", borderRadius: "10px" }}
                        onClick={async () => {
                          try {
                            // ตรวจสอบว่ามีเบอร์โทรศัพท์หรือไม่
                            const phoneNumber = phoneRef.current?.value;
                            if (!phoneNumber) {
                              window.alert("กรุณากรอกเบอร์โทรศัพท์");
                              return;
                            }

                            // ตรวจสอบว่าเบอร์โทรศัพท์มีความยาว 10 หลักและเป็นตัวเลขทั้งหมด
                            if (!/^\d{10}$/.test(phoneNumber)) {
                              window.alert(
                                "เบอร์โทรศัพท์ต้องเป็นตัวเลขและมีความยาว 10 หลัก"
                              );
                              return;
                            }

                            if (
                              selectedFile &&
                              name_userRef.current?.value &&
                              nick_userRef.current?.value &&
                              provinceRef.current?.value &&
                              phoneNumber &&
                              facebookRef.current?.value &&
                              lineIDRef.current?.value
                            ) {
                              setLoad(true);
                              const res = await userService.update(
                                user?.uid,
                                selectedFile,
                                name_userRef.current!.value,
                                nick_userRef.current!.value,
                                provinceRef.current!.value,
                                phoneNumber, // ส่งเบอร์โทรที่ผ่านการตรวจสอบ
                                facebookRef.current!.value,
                                lineIDRef.current!.value
                              );
                              console.log(res.status);
                              setLoad(false);
                              if (res.status === 200) {
                                window.alert(
                                  "แก้ไขข้อมูลเสร็จสิ้น!!! ถ้าต้องการตรวจสอบข้อมูล โปรดเข้าสู่ระบบอีกครั้ง"
                                );
                                console.log(res.data);
                              }
                            } else {
                              window.alert("โปรดทำการแก้ไขข้อมูลอีกครั้ง");
                            }
                          } catch (error) {
                            setLoad(false);
                            console.log(error);
                          }
                        }}
                      >
                        ยืนยัน
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProfileUserPage;
