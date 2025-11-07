import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Card, CardContent, CardActions, Typography, Button, Avatar, Paper } from "@mui/material";
import { Chat, Calculate, Description, Draw, Note, AutoStories, TipsAndUpdates, School } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const features = [
    { title: "AI Chat Assistant", description: "Get instant help with your academic questions", icon: Chat, color: "#1976d2", route: "/chat" },
    { title: "Math Solver", description: "Solve complex mathematical problems", icon: Calculate, color: "#2e7d32", route: "/solver" },
    { title: "Document Generator", description: "Create PDFs and presentations", icon: Description, color: "#ed6c02", route: "/documents" },
    { title: "Handwriting Converter", description: "Convert handwritten notes to text", icon: Draw, color: "#9c27b0", route: "/handwriting" },
    { title: "Smart Notes", description: "Organize and manage study notes", icon: Note, color: "#0288d1", route: "/notes" },
    { title: "Study Resources", description: "Access curated study materials", icon: AutoStories, color: "#d32f2f", route: "/resources" },
    { title: "Learning Tips", description: "Get personalized study tips", icon: TipsAndUpdates, color: "#7b1fa2", route: "/tips" },
    { title: "Course Assistant", description: "Track courses and assignments", icon: School, color: "#1565c0", route: "/courses" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)", color: "white", borderRadius: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>Welcome to Academic AI Assistant</Typography>
            <Typography variant="h6" sx={{ opacity: 0.95 }}>Your intelligent companion for academic excellence</Typography>
          </Paper>
          <Grid container spacing={3}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => navigate(feature.route)}>
                    <CardContent sx={{ textAlign: "center", pt: 4 }}>
                      <Avatar sx={{ bgcolor: feature.color, width: 80, height: 80, margin: "0 auto", mb: 2 }}>
                        <Icon sx={{ fontSize: 40 }} />
                      </Avatar>
                      <Typography variant="h5" gutterBottom fontWeight={600}>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                      <Button variant="contained" sx={{ bgcolor: feature.color }}>Open</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
