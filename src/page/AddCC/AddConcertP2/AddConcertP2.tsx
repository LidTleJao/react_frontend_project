import { useLocation, useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../../components/HeadUserTypeManager2";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function AddConcertP2Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const {
    name_concert,
    lineup,
    concert_type,
    show_schedule_concert,
    address_concert,
    province,
    detail_concert,
  } = location.state;
  const [dialogDeletePoster, setDialogDeletePoster] = useState(false);
  const [dialogDeleteImage, setDialogDeleteImage] = useState(false);
  const [poster, setPoster] = useState<File | null>(null); // เก็บไฟล์รูปภาพ
  const [image, setImage] = useState<File | null>(null); // เก็บไฟล์รูปภาพ
  const [isLoad, setLoad] = useState(false);

  function navigateToAddConcertPage() {
    navigate("/AddConcert");
  }
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
  // ขนาดสูงสุดของไฟล์ (64 MB)
  const MAX_FILE_SIZE = 64 * 1024 * 1024; // 64 MB

  // ฟังก์ชันจัดการการอัปโหลดรูป
  const handlePosterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // รับเฉพาะไฟล์แรก

    // ตรวจสอบขนาดไฟล์
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        setPoster(file); // เพิ่มเฉพาะไฟล์ที่ขนาด <= 64MB
      } else {
        window.alert(`ไฟล์ ${file.name} มีขนาดใหญ่เกินไป (ต้องไม่เกิน 64 MB)`);
      }
    }
  };

  // ฟังก์ชันลบรูปภาพ
  const handleDeletePoster = () => {
    setPoster(null);
    setDialogDeletePoster(false);
  };

  // ฟังก์ชันจัดการการอัปโหลดรูป
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // รับเฉพาะไฟล์แรก

    // ตรวจสอบขนาดไฟล์
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        setImage(file); // เพิ่มเฉพาะไฟล์ที่ขนาด <= 64MB
      } else {
        window.alert(`ไฟล์ ${file.name} มีขนาดใหญ่เกินไป (ต้องไม่เกิน 64 MB)`);
      }
    }
  };

  // ฟังก์ชันลบรูปภาพ
  const handleDeleteImage = () => {
    setImage(null);
    setDialogDeleteImage(false);
  };

  const VisuallyHiddenInputPoster = styled("input")({
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
      <div className="addconcertp2-cont">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
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
              เพิ่มรูปภาพโปสเตอร์
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Box
              sx={{
                width: 650,
                height: 400,
                maxHeight: 400,
                borderRadius: 3,
                paddingBottom: 2,
                // bgcolor: "#D9D9D9",
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
                      width: 580,
                      height: 320,
                      maxHeight: 320,
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        {poster && (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
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
                                  onClick={() => {
                                    // setImageToDelete();
                                    setDialogDeletePoster(true);
                                  }}
                                >
                                  <ClearIcon
                                    fontSize="medium"
                                    sx={{ height: 50 }}
                                  />
                                </Button>
                              </div>
                              <Card
                                // key={index}
                                sx={{
                                  maxWidth: 580,
                                  maxHeight: 340,
                                  borderRadius: 3,
                                }}
                              >
                                <CardMedia
                                  sx={{ maxHeight: 240, maxWidth: 380 }}
                                  component="img"
                                  //   height="300"
                                  image={URL.createObjectURL(poster)}
                                />
                              </Card>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <Dialog
                      open={dialogDeletePoster}
                      onClose={() => {
                        setDialogDeletePoster(false);
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
                            onClick={handleDeletePoster}
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
                      <VisuallyHiddenInputPoster
                        type="file"
                        accept="image/*"
                        onChange={handlePosterChange}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
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
              เพิ่มรูปภาพผังการแสดง
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Box
              sx={{
                width: 650,
                height: 400,
                maxHeight: 400,
                borderRadius: 3,
                paddingBottom: 2,
                // bgcolor: "#D9D9D9",
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
                      width: 580,
                      height: 320,
                      maxHeight: 320,
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        {image && (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
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
                                  onClick={() => {
                                    // setImageToDelete();
                                    setDialogDeleteImage(true);
                                  }}
                                >
                                  <ClearIcon
                                    fontSize="medium"
                                    sx={{ height: 50 }}
                                  />
                                </Button>
                              </div>
                              <Card
                                // key={index}
                                sx={{
                                  maxWidth: 580,
                                  maxHeight: 380,
                                  borderRadius: 3,
                                }}
                              >
                                <CardMedia
                                  sx={{ maxHeight: 240, maxWidth: 380 }}
                                  component="img"
                                  height="300"
                                  image={URL.createObjectURL(image)}
                                />
                              </Card>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <Dialog
                      open={dialogDeleteImage}
                      onClose={() => {
                        setDialogDeleteImage(false);
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
                            onClick={handleDeleteImage}
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
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
          </div>
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
              onClick={navigateToAddConcertPage}
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
                    if (poster == null || image == null) {
                      window.alert(
                        "ข้อมูลรูปภาพไม่ถูกต้อง โปรดเพิ่มข้อมูลใหม่"
                      );
                    } else {
                      console.log(poster);
                      console.log(image);
                      console.log(name_concert);
                      console.log(lineup);
                      console.log(concert_type);
                      console.log(show_schedule_concert);
                      console.log(address_concert);
                      console.log(province);
                      console.log(detail_concert);
                      navigateToAddConcertP3Page();
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
      </div>
    </>
  );
}

export default AddConcertP2Page;
