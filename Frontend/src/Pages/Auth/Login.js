import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
//import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = values;


    if (email === "test@example.com" && password === "password123") {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/");
      toast.success("Login successful!", toastOptions);
    } else {
      toast.error("Invalid email or password", toastOptions);
    }
    setLoading(false);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1553729459-efe14ef6055d')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.8) contrast(1.2) saturate(1.1)",
      }}
    >
      {/* Particles Overlay */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2 },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {/* Login Form */}
      <Container
        className="mt-5"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Row>
          <Col>
            <h1 className="img-center">
              <img src={"spendwiselogo.png"} alt="SpendWise Logo" style={{ width: "120px" }} />
            </h1>
            <h2 className="text-white text-center">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }} // Styled input
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }} // Styled input
                />
              </Form.Group>
              <div className="mt-4 text-center">
                <Link to="/forgotPassword" className="text-white">Forgot Password?</Link>
                <Button
                  type="submit"
                  className="mt-3 w-100"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                  style={{ backgroundColor: "#ffcc00", border: "none", color: "black" }}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>
                <p className="mt-3 text-light">
                  Don't have an account? <Link to="/register" className="text-white">Register</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;