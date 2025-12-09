import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import Footer from "./Footer";

const History = () => {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); 
  };

  return (
    <>
    <Box sx={{ padding: "20px" }}>
      <IconButton
        onClick={() => routeTo("/home")}
        sx={{ marginBottom: "15px" }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>

      <Typography variant="h4" fontWeight={400} mb={3}>
        Meeting History
      </Typography>

      {meetings.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            marginTop: "8vh",
            opacity: 0.7,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No meeting history found.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your meetings will appear here after you host or join a session.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {meetings.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.meetingCode + index}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 4,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <CardContent>
                <Typography
                  sx={{ color: "text.secondary", fontSize: 14 }}
                  gutterBottom
                >
                  Meeting Code: <strong>{item.meetingCode}</strong>
                </Typography>

                <Typography sx={{ mb: 1.5, color: "text.secondary" }}>
                  Date: <strong>{formatDate(item.date)}</strong>
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  This meeting was automatically saved to your history.
                </Typography>
              </CardContent>

              {/* <CardActions>
                <Button size="small">View Details</Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
      
    </Box>
    <Footer/>
    </>
  );
};

export default History;
