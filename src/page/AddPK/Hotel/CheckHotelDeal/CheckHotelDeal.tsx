import {
  Button,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import { Box } from "@mui/system";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDealsGetByUserRes } from "../../../../model/Response/Packet/Hotel/HotelDealsGetByUserRes";
import { HotelDealsService } from "../../../../service/hotelDealService";
import dayjs from "dayjs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CheckHotelDealPage() {
  const navigate = useNavigate();
  const hotelDealService = new HotelDealsService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [HotelDealByUser, setHotelDealByUser] = useState<
    HotelDealsGetByUserRes[]
  >([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshotel = await hotelDealService.getHotelDealByUser(user?.uid);
      const data: HotelDealsGetByUserRes[] = reshotel.data;
      setHotelDealByUser(data);
    };
    loadDataAsync();
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  function navigateToMenuHotelDealPage() {
    navigate("/MenuHotelDeal");
  }

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="checkhoteldeal-cont">
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
              ตรวจสอบข้อมูลข้อเสนอ
            </Typography>
          </div>
          <div style={{ display: "flex", marginLeft: "50px" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#343434" }}
              sx={{ width: "110px", borderRadius: "10px" }}
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={navigateToMenuHotelDealPage}
            >
              กลับหน้า
            </Button>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Box
              sx={{
                width: 1400,
                height: 520,
                borderRadius: 3,
                // bgcolor: "#D9D9D9",
                border: 2,
                display: "flex",
                // justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "20px",
                    marginLeft: "20px",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      aria-label="Hotel Deal Tabs"
                    >
                      <Tab label="ข้อมูลข้อเสนอที่ยังไม่บรรลุ" {...a11yProps(0)} />
                      <Tab label="ข้อมูลข้อเสนอที่บรรลุข้อตกลงแล้ว" {...a11yProps(1)} />
                      <Tab label="ข้อมูลข้อเสนอที่สิ้นสุดเวลาแล้ว" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                      <TableContainer
                        component={Paper}
                        sx={{
                          height: 400,
                          maxHeight: 400,
                          width: 1300,
                          maxWidth: 1300,
                          border: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                ชื่อโรงแรม
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                จังหวัด
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                ชนิดห้อง
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                ชนิดวิว
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                จำนวนห้อง
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                ราคาห้อง
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                วันที่สิ้นสุดข้อเสนอ
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                สถานะ
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                เลือก
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {HotelDealByUser.map((hoteldeal) => (
                              <TableRow>
                                <TableCell>{hoteldeal.name}</TableCell>
                                <TableCell>{hoteldeal.province}</TableCell>
                                <TableCell>{hoteldeal.type_room}</TableCell>
                                <TableCell>
                                  {hoteldeal.type_view_name_room}
                                </TableCell>
                                <TableCell>
                                  {hoteldeal.hotel_deal_price}
                                </TableCell>
                                <TableCell>
                                  {hoteldeal.number_of_rooms}
                                </TableCell>
                                <TableCell>
                                {dayjs(hoteldeal.e_datetime).format("YYYY-MM-DD")}
                                </TableCell>
                                <TableCell>
                                  {hoteldeal.name_status}
                                </TableCell>
                                
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      <Typography>
                        รายละเอียดเพิ่มเติมเกี่ยวกับข้อเสนอ
                      </Typography>
                    </TabPanel>
                  </Box>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckHotelDealPage;
