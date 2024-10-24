import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ClearIcon from "@mui/icons-material/Clear";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import { useState } from "react";
import { HotelService } from "../../../service/hotelService";
import { toast, ToastContainer } from "react-toastify";

function AddHotelPage() {
  const [isValidate, setValidate] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [hotelType, setHotelType] = useState(1);
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [dialogDelete, setDialogDelete] = useState(false);
  const [images, setImages] = useState<File[]>([]); // เก็บไฟล์รูปภาพ
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const MAX_FILE_SIZE = 64 * 1024 * 1024;

  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(false);
  const hotelService = new HotelService();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    const validFiles: File[] = [];

    // ตรวจสอบขนาดไฟล์
    files.forEach((file) => {
      if (file.size <= MAX_FILE_SIZE) {
        validFiles.push(file); // เพิ่มเฉพาะไฟล์ที่ขนาด <= 64MB
      } else {
        window.alert(`ไฟล์ ${file.name} มีขนาดใหญ่เกินไป (ต้องไม่เกิน 64 MB)`);
      }
    });
    setImages([...images, ...files]); // เพิ่มไฟล์ใหม่เข้าไปใน state
  };

  // ฟังก์ชันลบรูปภาพ
  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setDialogDelete(false);
  };

  // function navigateToAddHotelP2Page() {
  //   navigate("/AddHotelP2", {
  //     state: {
  //       hotelName,
  //       hotelType,
  //       province,
  //       address,
  //       description,
  //     },
  //   });
  // }
  function navigateToAddHotelDataPage() {
    navigate("/AddHotelData");
  }

  // const [open, setOpen] = useState(false);

  // // const handleClick = () => {
  // //   setOpen(true);
  // // };

  // const handleClose = (
  //   _event: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

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
      <div className="addhotel-cont pt-20">
        <div className="flex flex-col gap-3 px-14 py-8 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                display: "flex",
                color: "black",
                fontSize: "25px",
              }}
            >
              เพิ่มข้อมูลโรงแรม
            </Typography>
          </div>
          <div className="flex gap-5 flex-row justify-between">
            <div className="flex flex-col justify-center items-center">
              <Box
                sx={{
                  width: "450px",
                  height: "auto",
                  maxHeight: "100%",
                  overflow: "auto",
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      height: "100%",
                      width: "100%",
                      overflowY: "auto",
                      maxHeight: "500px",
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "10px",
                        }}
                      >
                        <Card
                          sx={{
                            width: 120,
                            height: 120,
                            borderRadius: 3,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <IconButton
                              color="error"
                              onClick={async () => {
                                setImageToDelete(index);
                                setDialogDelete(true);
                              }}
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          </div>
                          <CardMedia
                            sx={{ height: 100, width: 100 }}
                            component="img"
                            image={URL.createObjectURL(image)}
                          />
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
                <Dialog
                  open={dialogDelete}
                  onClose={() => {
                    setDialogDelete(false);
                  }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <Alert
                    severity="warning"
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        onClick={async () => {
                          try {
                            if (imageToDelete !== null) {
                              handleDeleteImage(imageToDelete);
                            }
                            // const res = await imageService.delete(
                            //   imageDelete
                            // );
                            // console.log(res.data);

                            // loadImages();
                            setDialogDelete(false);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        ลบ
                      </Button>
                    }
                  >
                    จะลบรูปนี้หรือไม่
                  </Alert>
                </Dialog>
              </Box>
              <div className="mt-3 flex flex-row justify-center items-center">
                <button
                  type="button"
                  className={`text-sm border transition duration-500 rounded-lg px-3 py-2 ${
                    isValidate && images.length == 0
                      ? "bg-red-500 text-white"
                      : "border-[#343434] text-[#343434] hover:text-white hover:bg-[#343434]"
                  }`}
                >
                  <label className="cursor-pointer font-medium" htmlFor="file">
                    เพิ่มรูป
                  </label>
                </button>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  multiple
                />
              </div>
              {isValidate && images.length == 0 ? (
                <h5 className="pt-2 text-xs text-red-500">กรุณาเพิ่มรูปภาพ</h5>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-3">
              <TextField
                placeholder="ชื่อโรงแรม*"
                type="name"
                sx={{ width: "25pc" }}
                value={hotelName}
                size="small"
                onChange={(e) => {
                  setHotelName(e.target.value);
                }}
                //   onChange={(e) => setName(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    bgcolor: "white",
                  },
                }}
                required
                error={!hotelName && isValidate}
                helperText={!hotelName && isValidate ? "โปรดกรอกชื่อโรงแรม" : ""}
              />
              <div className="flex flex-row gap-2">
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-select-small-label" size="small">
                    ชนิดโรมแรม
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    size="small"
                    label="ชนิดโรงแรม"
                    defaultValue={1}
                    value={hotelType}
                    // type="city"
                    onChange={(e) => setHotelType(Number(e.target.value))}
                    sx={{
                      borderRadius: "10px",
                      bgcolor: "white",
                    }}
                  >
                    <MenuItem value={1}>โรงแรม</MenuItem>
                    <MenuItem value={2}>รีสอร์ท</MenuItem>
                    <MenuItem value={3}>บังกะโล</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-select-small-label" size="small">
                    จังหวัด
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    size="small"
                    label="จังหวัด"
                    defaultValue={"กาฬสินธุ์"}
                    value={province}
                    // type="city"
                    onChange={(e) => setProvince(String(e.target.value))}
                    sx={{
                      borderRadius: "10px",
                      bgcolor: "white",
                    }}
                    required
                    error={!province && isValidate}
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
              <TextField
                placeholder="ที่อยู่*"
                type="map"
                value={address}
                sx={{ width: "25pc" }}
                size="small"
                onChange={(e) => {
                  setAddress(String(e.target.value));
                }}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    bgcolor: "white",
                  },
                }}
                required
                error={!address && isValidate}
                helperText={!address && isValidate ? "โปรดกรอกที่อยู่" : ""}
              />
              <TextField
                minRows={2}
                maxRows={4}
                placeholder="รายละเอียด*"
                value={description}
                onChange={(e) => setDescription(String(e.target.value))}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
                InputProps={{
                  inputComponent: TextareaAutosize,
                }}
                multiline
                required
                error={!description && isValidate}
                helperText={
                  !description && isValidate ? "โปรดกรอกรายละเอียด" : ""
                }
              />
              <TextField
                placeholder="ลิงก์ช่องทางการติดต่อ 1"
                // type="URL"
                sx={{ width: "25pc" }}
                size="small"
                value={url1}
                onChange={(e) => setUrl1(String(e.target.value))}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    bgcolor: "white",
                  },
                }}
              />
              <TextField
                placeholder="ลิงก์ช่องทางการติดต่อ 2"
                // type="URL"
                sx={{ width: "25pc" }}
                size="small"
                value={url2}
                onChange={(e) => setUrl2(String(e.target.value))}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    bgcolor: "white",
                  },
                }}
              />
              <TextField
                placeholder="ลิงก์ช่องทางการติดต่อ 3"
                // type="URL"
                sx={{ width: "25pc" }}
                size="small"
                value={url3}
                onChange={(e) => setUrl3(String(e.target.value))}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    bgcolor: "white",
                  },
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
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
                // startIcon={<ChevronRightIcon />}
                // onClick={navigateToAddHotelP2Page}
                onClick={async () => {
                  setLoad(true);
                  setValidate(true);
                  try {
                    if (
                      hotelName != "" &&
                      province != "" &&
                      address != "" &&
                      description != "" &&
                      images.length > 0
                    ) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const res: any = await hotelService.AddHotel(
                        user?.uid,
                        hotelType,
                        hotelName,
                        province,
                        address,
                        description
                      );
                      const last_idx: string = res.data.last_idx;
                      console.log(last_idx);
                      if (res.status === 201) {
                        if (url1) {
                          const resurl1 = await hotelService.AddHotelUrl(
                            last_idx,
                            url1
                          );
                          console.log(resurl1.status);
                        }
                        if (url2) {
                          const resurl2 = await hotelService.AddHotelUrl(
                            last_idx,
                            url2
                          );
                          console.log(resurl2.status);
                        }
                        if (url3) {
                          const resurl3 = await hotelService.AddHotelUrl(
                            last_idx,
                            url3
                          );
                          console.log(resurl3.status);
                        }
                      }
                      for (let index = 0; index < images.length; index++) {
                        console.log(images[index]);
                        if (images[index]) {
                          const resimage = await hotelService.AddHotelImage(
                            last_idx,
                            images[index]
                          );
                          console.log(resimage.status);
                        }
                      }
                      toast.success("เพิ่มข้อมูลโรงแรมสำเร็จ!");
                      setTimeout(() => {
                        setLoad(false);
                        navigateToAddHotelDataPage();
                      }, 3000);
                    }else{
                      setLoad(false);
                    }
                  } catch (error) {
                    setLoad(false);
                    console.log(error);
                  } 
                }}
              >
                เพิ่ม
              </Button>
            )}
          </div>
          {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
        </div>
      </div>
      <ToastContainer />
      {/* <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="เพิ่มข้อมูลโรงแรมสำเร็จ"
      /> */}
    </>
  );
}
export default AddHotelPage;
