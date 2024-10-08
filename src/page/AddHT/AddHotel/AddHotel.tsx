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
                  <MenuItem value={"กาฬสินธุ์"}>กาฬสินธุ์</MenuItem>
                  <MenuItem value={"ขอนแก่น"}>ขอนแก่น</MenuItem>
                  <MenuItem value={"มหาสารคาม"}>มหาสารคาม</MenuItem>
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
                        // const res = await hotelService.getHotelByUid(
                        //   user?.uid
                        // );
                        // console.log(res.status);
                        navigateToAddHotelP2Page();
                        setLoad(false);
                        // if (res.status === 200) {
                        //   console.log(res.data);
                        // }
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
