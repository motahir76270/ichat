import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DemoChating = () => {
  return (
    <Box sx={{
      width: "100%  ",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "60vh",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
    }}>
      <Box sx={{
        width: { xs: "50%", sm: "80%", md:"100%"},
        backgroundColor: "#2e7d32", // Darker green for better contrast
        color: "white",
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 3,
        mb: 4,
        p: 2,
        borderRadius: "4px 4px 0px 0px",
      }}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem" },
          textAlign: "center",  
        }}>
          Welcome to My App
        </Typography>
      </Box>

      <Button 
        variant="contained"
        sx={{
          mt: { xs: 4, sm: 10, md: 15 },
          width: { xs: "80%", sm: 300 },
          height: 48,
          borderRadius: "24px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          backgroundColor: "#2e7d32",
          "&:hover": {
            backgroundColor: "#1b5e20",
            transform: "scale(1.02)"
          },
          transition: "all 0.3s ease",
          boxShadow: 2
        }}
      >
        Start Chatting
      </Button>
    </Box>
  )
}

export default DemoChating;