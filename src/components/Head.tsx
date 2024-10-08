import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{ backgroundColor: "black", justifyContent: "end", height: 80 }}
        >
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Typography
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                ml: 2,
                fontFamily: "Mitr, sans-serif",
                fontStyle:"oblique"
              }}
              variant="h4"
              marginTop={"15px"}
            >
              Teemi
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
