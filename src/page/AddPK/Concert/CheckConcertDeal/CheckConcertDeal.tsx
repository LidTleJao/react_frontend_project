import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import HeaderUserTypeManager2 from "../../../../components/HeadUserTypeManager2";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConcertDealsService } from "../../../../service/concertDealService";
import { ConcertDealsGetByUserRes } from "../../../../model/Response/Packet/Concert/ConcertDealsGetByUserRes";

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

function CheckConcertDealPage() {
  const navigate = useNavigate();
  const concertDealService = new ConcertDealsService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [ConcertDealByUser, setConcertDealByUser] = useState<
    ConcertDealsGetByUserRes[]
  >([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadDataAsync = async () => {
      const reshotel = await concertDealService.getConcertDealAllByUser(user?.uid);
      const data: ConcertDealsGetByUserRes[] = reshotel.data;
      setConcertDealByUser(data);
    };
    loadDataAsync();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  function navigateToMenuConcertDealPage() {
    navigate("/MenuConcertDeal");
  }

  return (
    <>
      <HeaderUserTypeManager2 />
      <div className="checkconcertdeal-cont">
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
              onClick={navigateToMenuConcertDealPage}
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
                      <Tab label="ข้อมูลข้อเสนอ" {...a11yProps(0)} />
                      <Tab label="รายละเอียดเพิ่มเติม" {...a11yProps(1)} />
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
                              ชื่อคอนเสิร์ต
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              จังหวัด
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ชนิดตั๋ว
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              จำนวนตั๋ว
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              ราคาตั๋ว
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
                            {ConcertDealByUser.map((concertdeal) => (
                              <TableRow>
                                <TableCell>{concertdeal.name_concert}</TableCell>
                                <TableCell>{concertdeal.province}</TableCell>
                                <TableCell>{concertdeal.name_type_ticket}</TableCell>
                                <TableCell>
                                  {concertdeal.number_of_tickets}
                                </TableCell>
                                <TableCell>
                                  {concertdeal.concert_deal_price}
                                </TableCell>
                                <TableCell>
                                  {concertdeal.e_datetime.toString()}
                                </TableCell>
                                <TableCell>
                                  {concertdeal.name_status}
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
export default CheckConcertDealPage;
