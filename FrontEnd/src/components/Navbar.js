import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import '../i18n';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MyNavbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

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

  // Ana Sayfa butonuna tıklandığında en üste scroll yapacak fonksiyon
  const handleHomeClick = (e) => {
    e.preventDefault();
    // Eğer zaten ana sayfadaysak, window.scrollTo ile en üste yumuşakça kaydır
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Eğer başka bir sayfadaysak önce ana sayfaya yönlendir, sonra en üste kaydır
      navigate("/", { replace: false });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  // App.js'den gelen darkMode ve toggleDarkMode props'unu al
  const props = arguments[0] || {};
  const darkMode = props.darkMode;
  const toggleDarkMode = props.toggleDarkMode;
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
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
            <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
            <Nav.Link onClick={() => i18n.changeLanguage('tr')}>TR</Nav.Link>
            <Nav.Link onClick={() => i18n.changeLanguage('en')}>EN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* Karanlık mod butonu navbar sağında */}
        <div className="d-flex align-items-center ms-auto me-2">
          <button
            onClick={toggleDarkMode}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            aria-label={darkMode ? "Açık Mod" : "Karanlık Mod"}
          >
            <i className={`bi ${darkMode ? "bi-moon-fill" : "bi-moon"}`} style={{ fontSize: "1.5rem" }}></i>
          </button>
        </div>
      </Container>
    </Navbar>
  );
}
