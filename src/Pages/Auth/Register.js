import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    setLoading(true);

    try {
      const { data } = await axios.post(registerAPI, {
        name,
        email,
        password,
      });

      if (data.success === true) {
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setLoading(false);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Network error. Please try again later.", toastOptions);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')`,
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
      {/* Registration Form */}
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
            <h1 className="text-center">
              <img
                src="spendwiselogo.png"
                alt="SpendWise Logo"
                style={{ width: "120px" }}
              />
            </h1>
            <h2 className="text-white text-center mt-3">Registration</h2>
            <Form>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={values.name}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}
                />
              </Form.Group>
              <div className="mt-4 text-center">
                <Link to="/forgotPassword" className="text-white">
                  Forgot Password?
                </Link>
                <Button
                  type="submit"
                  className="mt-3 w-100"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                  style={{ backgroundColor: "#ffcc00", border: "none", color: "black" }}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>
                <p className="mt-3 text-light">
                  Already have an account?{" "}
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
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

export default Register;