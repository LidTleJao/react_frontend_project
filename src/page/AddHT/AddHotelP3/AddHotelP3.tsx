import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { useState } from "react";
import { HotelService } from "../../../service/hotelService";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";

function AddHotelP3Page() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  const location = useLocation();
  const hotelService = new HotelService();
  const {
    hotelName,
    hotelType,
    province,
    address,
    description,
    getUrl1,
    getUrl2,
    getUrl3,
  } = location.state;
  const [dialogDelete, setDialogDelete] = useState(false);
  const [images, setImages] = useState<File[]>([]); // เก็บไฟล์รูปภาพ
  const [imageToDelete, setImageToDelete] = useState<number | null>(null); // เก็บ index รูปภาพที่ต้องการลบ
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
    window.alert(`คุณ ${user.name_user} ได้เพิ่มข้อมูลโรงแรมแล้ว!!!`);
    navigate("/AddHotelData");
  }

  // ขนาดสูงสุดของไฟล์ (64 MB)
  const MAX_FILE_SIZE = 64 * 1024 * 1024; // 64 MB

  // ฟังก์ชันจัดการการอัปโหลดรูป
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
      <div className="addhotelp3-cont">
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
              เพิ่มรูปภาพโรงแรม
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 400,
              maxHeight: 400,
              borderRadius: 3,
              paddingBottom: 2,
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
                    width: 380,
                    height: 240,
                    maxHeight: 240,
                    borderRadius: 3,
                    overflow: "auto",
                    bgcolor: "white",
                    border: 2,
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
                        flexDirection: "row",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      {images.map((image, index) => (
                        <>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                width: "100%",
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  borderRadius: 100,
                                }}
                                color="error"
                                onClick={async () => {
                                  setImageToDelete(index);
                                  setDialogDelete(true);
                                }}
                              >
                                <ClearIcon
                                  fontSize="medium"
                                  sx={{ height: 50 }}
                                />
                              </Button>
                            </div>
                            <Card
                              key={index}
                              sx={{
                                maxWidth: 380,
                                maxHeight: 170,
                                borderRadius: 3,
                              }}
                            >
                              <CardMedia
                                sx={{ maxHeight: 170, maxWidth: 380 }}
                                component="img"
                                height="300"
                                image={URL.createObjectURL(image)}
                              />
                            </Card>
                          </div>
                        </>
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
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ marginTop: "5px" }}>
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
              </div>
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
                  onClick={navigateToAddHotelP2Page}
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
                    // onClick={navigateToAddHotelDataPage}
                    onClick={async () => {
                      try {
                        setLoad(true);
                        if (images.length != 0) {
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
                            if (getUrl1) {
                              const resurl1 = await hotelService.AddHotelUrl(
                                last_idx,
                                getUrl1
                              );
                              console.log(resurl1.status);
                            }
                            if (getUrl2) {
                              const resurl2 = await hotelService.AddHotelUrl(
                                last_idx,
                                getUrl2
                              );
                              console.log(resurl2.status);
                            }
                            if (getUrl3) {
                              const resurl3 = await hotelService.AddHotelUrl(
                                last_idx,
                                getUrl3
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
                          navigateToAddHotelDataPage();
                        } else {
                          window.alert("โปรดเพิ่มข้อมูลรูปภาพด้วย!!!");
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

export default AddHotelP3Page;
