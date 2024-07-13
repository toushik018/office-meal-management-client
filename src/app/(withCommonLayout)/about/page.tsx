import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import Image from "next/image";

const AboutUs = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary">
          Connecting you with the perfect flatmate
        </Typography>
      </Box>
      <Box mb={6}>
        <Typography variant="body1" paragraph>
          At Flat Share, our mission is to make finding the perfect flatmate a
          seamless and enjoyable experience. We understand that finding a
          compatible flatmate can be challenging, so weve created a platform
          that simplifies the process and connects you with like-minded
          individuals.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether youre looking to share your flat or find a new place to live,
          Flat Share provides a comprehensive solution. Our platform offers
          advanced search options, detailed flat listings, and an easy-to-use
          interface to help you find the perfect living arrangement.
        </Typography>
        <Typography variant="body1" paragraph>
          Join us today and discover a new way of living with Flat Share.
        </Typography>
      </Box>
      <Box mb={6}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Image
                alt="About"
                src="/assets/Images/about2.jpg"
                width={500}
                height={400}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Our Mission
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Our mission is to simplify the flat-sharing process and help
                  you find the perfect flatmate. We aim to connect people based
                  on compatibility and create a community of happy, harmonious
                  living arrangements.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {/* <CardMedia
                component="img"
                alt="Our Vision"
                height="140"
                image="/assets/Images/about2.jpg"
                title="Our Vision"
              /> */}
              <Image
                alt="About"
                src="/assets/Images/about1.jpg"
                width={500}
                height={400}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Our Vision
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  We envision a world where finding a flatmate is stress-free
                  and straightforward. Our platform leverages technology to
                  bring convenience and ease to your flat-sharing journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Image
                alt="About"
                src="/assets/Images/about3.jpg"
                width={500}
                height={400}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Our Values
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  We value trust, transparency, and community. Our goal is to
                  foster a secure and supportive environment where users can
                  connect and find their ideal flatmate with confidence.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center" mt={6} mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Meet the Team
        </Typography>
        <Typography variant="body1" color="textSecondary">
          A dedicated team committed to helping you find your perfect flatmate
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box textAlign="center">
            <Avatar
              alt="John Doe"
              src="/assets/Images/profileabout.jpg"
              sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6" component="h3">
              John Doe
            </Typography>
            <Typography variant="body1" color="textSecondary">
              CEO & Founder
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box textAlign="center">
            <Avatar
              alt="Jane Smith"
              src="/assets/Images/profileabout.jpg"
              sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6" component="h3">
              Jane Smith
            </Typography>
            <Typography variant="body1" color="textSecondary">
              CTO & Co-Founder
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box textAlign="center">
            <Avatar
              alt="Emily Johnson"
              src="/assets/Images/profileabout.jpg"
              sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6" component="h3">
              Emily Johnson
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Head of Marketing
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
