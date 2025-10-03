import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import '../i18n';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MyNavbar(props) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const darkMode = props.darkMode;
  const toggleDarkMode = props.toggleDarkMode;
  const auth = props.auth || {};
  const setAuth = props.setAuth;

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById("contact-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        const section = document.getElementById("contact-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth({ token: '', role: '' });
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" key={i18n.language}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/img/logo2.png"
            alt="Logo"
            height="40"
            style={{ objectFit: "contain" }}
            className="me-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleHomeClick}>{t('navbar.home')}</Nav.Link>
            <Nav.Link as={Link} to="/kategoriler">{t('navbar.categories')}</Nav.Link>
            <Nav.Link href="#contact-section" onClick={handleContactClick}>{t('navbar.contact')}</Nav.Link>
            {auth.role === 'ADMIN' ? (
              <>
                <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Çıkış Yap</Nav.Link>
              </>
            ) : (
              auth.token ? (
                <Nav.Link onClick={handleLogout}>Çıkış Yap</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">Giriş Yap</Nav.Link>
              )
            )}
            <Nav.Link onClick={() => i18n.changeLanguage('tr')}>TR</Nav.Link>
            <Nav.Link onClick={() => i18n.changeLanguage('en')}>EN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center ms-auto me-2">
          <button
            onClick={toggleDarkMode}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            aria-label={darkMode ? t('navbar.lightMode') || "Açık Mod" : t('navbar.darkMode') || "Karanlık Mod"}
          >
            <i className={`bi ${darkMode ? "bi-moon-fill" : "bi-moon"}`} style={{ fontSize: "1.5rem" }}></i>
          </button>
        </div>
      </Container>
    </Navbar>
  );
}
