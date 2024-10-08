import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";

function ProfileUserPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  // Helper function to decode base64 to image URL
  // const base64ToImageURL = (base64: string) => {
  //   if (!base64) return undefined;
  //   // Add the appropriate MIME type
  //   const mimeType = base64.startsWith('iVBORw0KGgo') ? 'image/png' : 'image/jpeg';
  //   console.log(`data:${mimeType};base64,${base64}`);
  //   console.log(user?.image_user);
  //   return `data:${mimeType};base64,${base64}`;
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
      <div className="profileuser-cont">
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
              โปรไฟล์ของฉัน
            </Typography>
          </div>
          <Box
            sx={{
              width: 650,
              height: 670,
              borderRadius: 3,
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
                    width: 180,
                    height: 170,
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card sx={{ maxWidth: 180, borderRadius: 3 }}>
                    <CardActionArea>
                      <CardMedia
                        sx={{ maxHeight: 170, maxWidth: 170 }}
                        component="img"
                        height="300"
                        image={user?.image_user}
                        // image={base64ToImageURL(user?.image_user)}
                        
                      />
                    </CardActionArea>
                  </Card>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                    ชื่อ-นามสกุล:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.name_user}
                    </Typography>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                  ชื่อเล่น:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.nick_user}
                    </Typography>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                    จังหวัด:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.province}
                    </Typography>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                    เบอร์โทร:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.phone}
                    </Typography>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                    Facebook:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.facebook}
                    </Typography>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                    LineID:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.lineID}
                    </Typography>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginRight: "100px",
                }}
              >
                <div style={{ marginRight: "50px" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Mitr, sans-serif",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                    variant="h6"
                  >
                    ประเภทผู้ใช้งาน:
                  </Typography>
                </div>

                <Box
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    border: 2,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
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
                      variant="h6"
                    >
                      {user?.typename_user}
                    </Typography>
                  </div>
                </Box>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
export default ProfileUserPage;
