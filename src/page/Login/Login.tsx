import {
  CardMedia,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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

  // function navigateToHomePage() {
  //   navigate("/home");
  // }

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
              // marginTop: "155px",
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
              image="src/img/webteemi.png"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "400px",
              marginTop: "50px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                // id="outlined-start-adornment"
                label="email"
                type="email"
                // value={email}
                placeholder="อีเมล"
                inputRef={gmailRef}
                sx={{ m: 1, width: "45ch" }}
                // onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "10px" },
                  // onChange={}
                  startAdornment: <></>,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                placeholder="รหัสผ่าน"
                label="password"
                inputRef={passwordRef}
                // value={password}
                sx={{ mt: 3, width: "45ch" }}
                type="password"
                autoComplete="current-password"
                // onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "10px" },

                  startAdornment: <></>,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginTop: "30px", marginLeft: "10px" }}>
                <hr style={{ width: 120 }} />
              </div>
              <div style={{ marginTop: "20px", marginLeft: "50px" }}>
                <Typography
                  gutterBottom
                  sx={{
                    fontFamily: "Mitr, sans-serif",
                  }}
                  variant="h6"
                >
                  หรือ
                </Typography>
              </div>
              <div style={{ marginLeft: "55px", marginTop: "30px" }}>
                <hr style={{ width: 120 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <Button>เข้าสู่ระบบด้วย Google</Button> */}
              <Button
                variant="outlined"
                color="info"
                sx={{ width: 380, borderRadius: "10px", color: "gray" }}
                // onClick={handleGoogleSignIn}
              >
                เข้าสู่ระบบด้วย Google
                <img
                  src="src\img\google.png"
                  style={{ marginLeft: "10px", height: "20px", width: "20px" }}
                />
              </Button>
            </div>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                justifyContent: "start",
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
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "120px", borderRadius: "10px" }}
                    // onClick={navigateToHomePage}
                    onClick={async () => {
                      try {
                        if (
                          gmailRef.current?.value &&
                          passwordRef.current?.value
                        ) {
                          setLoad(true);
                          const res = await userservice.login(
                            gmailRef.current!.value,
                            passwordRef.current!.value
                          );
                          // console.log(gmailRef.current?.value);
                          // console.log(passwordRef.current?.value);
                          setLoad(false);
                          const login: UserPostRes[] = res.data;
                          if (res.status === 200) {
                            if (
                              login[0].type_user === 1 ||
                              login[0].type_user === 2
                            ) {
                              console.log(res.data);
                              // user
                              // เก็บข้อมูลผู้ใช้ใน localStorage เมื่อแก้ไขข้อมูล
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
                                typename_user: login[0].typename_user
                              };
                              localStorage.setItem(
                                "objUser",
                                JSON.stringify(user)
                              );
                              navigate("/Home");
                            }
                          }
                        }
                      } catch (error) {
                        setLoad(false);
                        console.log(error);
                      }
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginLeft: "141px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#343434" }}
                  sx={{
                    width: "120px",
                    borderRadius: "10px",
                  }}
                  onClick={navigateToRegisterPage}
                >
                  Register
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <p>คุณลืมรหัสผ่าน?</p>
              <div style={{ marginLeft: "20px" }}>
                <Link to={""}>ลืมรหัสผ่าน</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
