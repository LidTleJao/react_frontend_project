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
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
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
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
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
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
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
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ marginTop: "-8px" }}
                      >
                        จังหวัด
                      </InputLabel>
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
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={"ขอนแก่น"}>ขอนแก่น</MenuItem>
                        <MenuItem value={"กาฬสินธุ์"}>กาฬสินธุ์</MenuItem>
                        <MenuItem value={"มหาสารคาม"}>มหาสารคาม</MenuItem>
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
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
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
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
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
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: "Mitr, sans-serif",
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
                            if (
                              selectedFile &&
                              name_userRef.current?.value &&
                              nick_userRef.current?.value &&
                              provinceRef.current?.value &&
                              phoneRef.current?.value &&
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
                                phoneRef.current!.value,
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
