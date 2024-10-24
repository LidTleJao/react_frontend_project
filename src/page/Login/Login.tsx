
import {
  CardMedia,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Head";
import { useRef, useState } from "react";
import { UserService } from "../../service/userService";
import { UserPostRes } from "../../model/Response/User/UserPostRes";

function LoginPage() {
  const navigate = useNavigate();
  const userservice = new UserService();
  const gmailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  // Loading
  const [isLoad, setLoad] = useState(false);

  function navigateToRegisterPage() {
    navigate("/register");
  }

  async function handleLogin() {
    try {
      if (gmailRef.current?.value && passwordRef.current?.value) {
        setLoad(true);
        const res = await userservice.login(
          gmailRef.current!.value,
          passwordRef.current!.value
        );
        setLoad(false);
        const login: UserPostRes[] = res.data;
        if (res.status === 200) {
          if (login[0].type_user === 1 || login[0].type_user === 2) {
            console.log(res.data);
            localStorage.removeItem("objUser");
            const user = {
              uid: login[0].UID,
              image_user: login[0].image_user,
              name_user: login[0].name_user,
              nick_user: login[0].nickname_user,
              province: login[0].province,
              gmail_user: login[0].gmail_user,
              password_user: login[0].password_user,
              phone: login[0].phone,
              facebook: login[0].facebook,
              lineID: login[0].lineID,
              type_user: login[0].type_user,
              typename_user: login[0].typename_user,
            };
            localStorage.setItem("objUser", JSON.stringify(user));
            navigate("/Home");
          }
        }
      }
    } catch (error) {
      window.alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดตรวจสอบข้อมูลใหม่");
      setLoad(false);
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className="login-cont">
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
            }}
          >
            <CardMedia
              sx={{
                height: 400,
                width: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              image="https://firebasestorage.googleapis.com/v0/b/teemi-backend-projectcs.appspot.com/o/Logo%2Fwebteemi.png?alt=media&token=530da670-02e1-42e6-ae4c-67a96b423e51"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "400px",
              marginTop: "80px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Kanit, sans-serif",
                }}
                variant="h5"
              >
                ยินดีต้อนรับ เข้าสู่ระบบ
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField

                label="Email"
                type="email"
                placeholder="อีเมล"
                inputRef={gmailRef}
                sx={{ m: 1, width: "45ch", }}
                InputProps={{
                  sx: { borderRadius: "10px", fontFamily: "Kanit, sans-serif" },
                }}
                InputLabelProps={{
                  sx: { fontFamily: "Kanit, sans-serif" },
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(); // เรียกฟังก์ชันล็อกอินเมื่อกด Enter
                  }
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                placeholder="รหัสผ่าน"
                label="Password"
                inputRef={passwordRef}
                sx={{ mt: 3, width: "45ch" }}
                type="password"
                autoComplete="current-password"
                InputProps={{
                  sx: { borderRadius: "10px", fontFamily: "Kanit, sans-serif", },
                }}
                InputLabelProps={{
                  sx: { fontFamily: "Kanit, sans-serif" },
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(); // เรียกฟังก์ชันล็อกอินเมื่อกด Enter
                  }
                }}
              />
            </div>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                justifyContent: "space-between", 
                marginTop: "50px",
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
                    style={{ marginLeft: "40px", color: "black" }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "120px", borderRadius: "10px", fontFamily: "Kanit, sans-serif", }}
                    onClick={handleLogin} // กดปุ่มนี้เพื่อเรียกฟังก์ชันล็อกอิน
                  >
                    Login
                  </Button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginLeft: "150px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#343434" }}
                  sx={{
                    width: "120px",
                    borderRadius: "10px",
                    fontFamily: "Kanit, sans-serif",
                  }}
                  onClick={navigateToRegisterPage}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
