import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./page/Login/Login.css";
import "./page/Register/Register.css";
import "./page/Home/Home.css";
import "./page/ProfileUser/ProfileUser.css";
import "./page/EditData/EditProfileUser/EditProfileUser.css";
import "./page/EditData/Hotel/EditDataHotel/EditDataHotel.css";
import "./page/Hotel/Hotel.css";
import "./page/Concert/Concert.css";
import "./page/Package/Package.css";
import "./page/PackageDetail/PackageDetail.css";
import "./page/AddHT/AddHotel/AddHotel.css";
import "./page/AddHT/AddHotelP2/AddHotelP2.css";
import "./page/AddHT/AddHotelP3/AddHotelP3.css";
import "./page/AddHT/AddHotelData/AddHotelData.css";
import "./page/AddHT/AddRoom/AddRoom.css";
import "./page/AddHT/AddRoomP2/AddRoomP2.css";
import "./page/AddHT/CheckDataHotel/CheckDataHotel.css";
import "./page/AddCC/AddConcertData/AddConcertData.css";
import "./page/AddCC/AddConcert/AddConcert.css";
import "./page/AddCC/AddConcertP2/AddConcertP2.css";
import "./page/AddCC/AddConcertP3/AddConcertP3.css";
import "./page/AddCC/AddConcertP4/AddConcertP4.css";
import "./page/AddCC/AddTicket/AddTicket.css";
import "./page/AddCC/AddTicketP2/AddTicketP2.css";
import "./page/AddCC/CheckDataConcert/CheckDataConcert.css";
import "./page/AddPK/SelectData/SelectData.css";
import "./page/AddPK/Hotel/MenuHotelDeals/MenuHotelDeals.css";
import "./page/AddPK/Concert/MenuConcertDeals/MenuConcertDeals.css";
import "./page/AddPK/Hotel/AddHotelDealData/AddHotelDealData.css";
import "./page/AddPK/Concert/AddConcertDealData/AddConcertDealData.css";
import "./page/AddPK/Hotel/HotelDeals/HotelDeals.css";
import "./page/AddPK/Concert/ConcertDeals/ConcertDeals.css";
import "./page/AddPK/Hotel/CheckHotelDeal/CheckHotelDeal.css";
import "./page/AddPK/Concert/CheckConcertDeal/CheckConcertDeal.css";
import LoginPage from "./page/Login/Login";
import RegisterPage from "./page/Register/Register";
import HomePage from "./page/Home/Home";
import HotelPage from "./page/Hotel/Hotel";
import ConcertPage from "./page/Concert/Concert";
import PackagePage from "./page/Package/Package";
import AddHotelPage from "./page/AddHT/AddHotel/AddHotel";
import AddHotelP2Page from "./page/AddHT/AddHotelP2/AddHotelP2";
import AddHotelP3Page from "./page/AddHT/AddHotelP3/AddHotelP3";
import AddHotelDataPage from "./page/AddHT/AddHotelData/AddHotelData";
import AddRoomPage from "./page/AddHT/AddRoom/AddRoom";
import AddRoomP2Page from "./page/AddHT/AddRoomP2/AddRoomP2";
import AddConcertDataPage from "./page/AddCC/AddConcertData/AddConcertData";
import AddConcertPage from "./page/AddCC/AddConcert/AddConcert";
import AddConcertP3Page from "./page/AddCC/AddConcertP3/AddConcertP3";
import AddConcertP4Page from "./page/AddCC/AddConcertP4/AddConcertP4";
import ProfileUserPage from "./page/ProfileUser/ProfileUser";
import EditProfileUserPage from "./page/EditData/EditProfileUser/EditProfileUser";
import CheckDataHotelPage from "./page/AddHT/CheckDataHotel/CheckDataHotel";
import EditDataHotelPage from "./page/EditData/Hotel/EditDataHotel/EditDataHotel";
import AddConcertP2Page from "./page/AddCC/AddConcertP2/AddConcertP2";
import AddTicketPage from "./page/AddCC/AddTicket/AddTicket";
import AddTicketP2Page from "./page/AddCC/AddTicketP2/AddTickketP2";
import SelectDataPage from "./page/AddPK/SelectData/SelectData";
import MenuHotelDealPage from "./page/AddPK/Hotel/MenuHotelDeals/MenuHotelDeals";
import MenuConcertDealPage from "./page/AddPK/Concert/MenuConcertDeals/MenuConcertDeals";
import AddHotelDealDataPage from "./page/AddPK/Hotel/AddHotelDealData/AddHotelDealData";
import AddConcertDealDataPage from "./page/AddPK/Concert/AddConcertDealData/AddConcertDealData";
import CheckDataConcertPage from "./page/AddCC/CheckDataConcert/CheckDataConcert";
import HotelDealPage from "./page/AddPK/Hotel/HotelDeals/HotelDeals";
import ConcertDealPage from "./page/AddPK/Concert/ConcertDeals/ConcertDeals";
import ConcertDetailPage from "./page/ConcertDetail/ConcertDetail";
import HotelDetailPage from "./page/HotelDetail/HotelDetail";
import CheckHotelDealPage from "./page/AddPK/Hotel/CheckHotelDeal/CheckHotelDeal";
import CheckConcertDealPage from "./page/AddPK/Concert/CheckConcertDeal/CheckConcertDeal";
import PackageDetailPage from "./page/PackageDetail/PackageDetail";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const routers = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/Register", element: <RegisterPage /> },
    { path: "/Home", element: <HomePage /> },
    { path: "/Profile", element: <ProfileUserPage /> },
    { path: "/EditProfile", element: <EditProfileUserPage /> },
    { path: "/EditDataHotel", element: <EditDataHotelPage /> },
    { path: "/Hotel", element: <HotelPage /> },
    { path: "/Concert", element: <ConcertPage /> },
    { path: "/ConcertDetail/:cid", element: <ConcertDetailPage /> },
    { path: "/Package", element: <PackagePage /> },
    { path: "/PackageDetail/:pid", element: <PackageDetailPage /> },
    { path: "/AddHotel", element: <AddHotelPage /> },
    { path: "/AddHotelP2", element: <AddHotelP2Page /> },
    { path: "/AddHotelP3", element: <AddHotelP3Page /> },
    { path: "/AddHotelData", element: <AddHotelDataPage /> },
    { path: "/AddRoom", element: <AddRoomPage /> },
    { path: "/AddRoomP2", element: <AddRoomP2Page /> },
    { path: "/CheckDataHotel", element: <CheckDataHotelPage /> },
    { path: "/CheckDataConcert", element: <CheckDataConcertPage /> },
    { path: "/AddConcertData", element: <AddConcertDataPage /> },
    { path: "/AddConcert", element: <AddConcertPage /> },
    { path: "/AddConcertP2", element: <AddConcertP2Page /> },
    { path: "/AddConcertP3", element: <AddConcertP3Page /> },
    { path: "/AddConcertP4", element: <AddConcertP4Page /> },
    { path: "/AddTicket", element: <AddTicketPage /> },
    { path: "/AddTicketP2", element: <AddTicketP2Page /> },
    { path: "/SelectData", element: <SelectDataPage /> },
    { path: "/MenuHotelDeal", element: <MenuHotelDealPage /> },
    { path: "/AddHotelDealData", element: <AddHotelDealDataPage /> },
    { path: "/CheckHotelDeal", element: <CheckHotelDealPage /> },
    { path: "/HotelDeal", element: <HotelDealPage /> },
    { path: "/MenuConcertDeal", element: <MenuConcertDealPage /> },
    { path: "/AddConcertDealData", element: <AddConcertDealDataPage /> },
    { path: "/CheckConcertDeal", element: <CheckConcertDealPage /> },
    { path: "/ConcertDeal", element: <ConcertDealPage /> },
    { path: "/HotelDetail/:hid", element: <HotelDetailPage /> },
  ]);

  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routers} />
      </ThemeProvider>
    </>
  );
}

export default App;
