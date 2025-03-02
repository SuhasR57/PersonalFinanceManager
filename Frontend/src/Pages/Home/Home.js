import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to login page if the user is not logged in
      navigate("/login");
    }
  }, [navigate]);

  const handleExpenseTrackerClick = () => {
    navigate("/expense-tracker");
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: `url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Header />
          <Container
            style={{
              position: "relative",
              zIndex: 2,
              color: "white",
              textAlign: "center",
              paddingTop: "100px",
            }}
          >
            <h1>Welcome to SpendWise</h1>
            <h3 className="mt-4">
              "Financial freedom is available to those who learn about it and
              work for it." – Robert Kiyosaki
            </h3>
            <p className="mt-4" style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
              Our Expense Management System helps you track your income and
              expenses, analyze your spending habits, and achieve your financial
              goals. Take control of your finances today!
            </p>
            <Button
              variant="primary"
              onClick={handleExpenseTrackerClick}
              className="mt-5"
              style={{ padding: "10px 30px", fontSize: "18px" }}
            >
              Go to Expense Tracker
            </Button>
          </Container>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;