import {
  Alert,
  Box,
  Button,
  Dialog,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import HeaderUserTypeGeneral2 from "../../../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { styled } from "@mui/system";

function EditDataHotelPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [dialogDelete, setDialogDelete] = useState(false);

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

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];
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
      <div className="editdatahotel-cont">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "120px",
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
                display: "flex",
                fontWeight: "bold",
                color: "black",
                fontFamily: "Mitr, sans-serif",
                fontStyle: "normal",
              }}
              variant="h4"
            >
              แก้ไขข้อมูลโรงแรม
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: 750,
                maxWidth: 750,
                // height: 620,
                maxHeight: 620,
                borderRadius: 3,
                paddingBottom: 2,
                // bgcolor: "#D9D9D9",
                border: 3,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                // marginBottom:"10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
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
                  variant="h5"
                >
                  รูปภาพโรงแรม
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Box
                  sx={{
                    width: 500,
                    height: 470,
                    border: 2,
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ImageList
                    sx={{
                      maxWidth: 500,
                      height: 455,
                      maxHeight: 455,
                      marginTop: "5px",
                      marginLeft: "5px",
                      borderRadius: 3,
                    }}
                    // variant="woven"
                    cols={3}
                    gap={6}
                    rowHeight={"auto"}
                  >
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
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
                                setDialogDelete(true);
                              }}
                            >
                              <ClearIcon
                                fontSize="medium"
                                sx={{ height: 50 }}
                              />
                            </Button>
                          </div>
                          <img
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </div>
                      </ImageListItem>
                    ))}
                  </ImageList>
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
                    // onChange={handleImageChange}
                    // onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              </div>
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Box
              sx={{
                width: 750,
                maxWidth: 750,
                height: 620,
                maxHeight: 620,
                borderRadius: 3,
                paddingBottom: 2,
                // bgcolor: "#D9D9D9",
                border: 3,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                // marginBottom:"10px"
              }}
            ></Box>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditDataHotelPage;
