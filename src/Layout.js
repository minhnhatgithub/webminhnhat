import { Outlet } from "react-router-dom";
import "./assets/css/layout.css";
import "./assets/css/fonts.css";
import MenuBox from "./layouts/MenuBox";
import Footer from "./layouts/Footer";
const Layout = () => {
  return (
    <body>
      <header id="header" style={{ minHeight: 169 }}>
        <div id="main_menu"></div>

        <div class="header">
          <div class="container_main">
            <div class="logo">
              <a href="/">
                <img
                  src="https://photo.gameladeshop.com/cdn-cgi/imagedelivery/FtoMAR4WjhAfUHALpsM8nA/d0344a83-e092-4e6d-b401-eaee723cd200/w=1277,h=481"
                  alt="Logo"
                />
              </a>
            </div>

            <div id="main_menu">
              <MenuBox />
            </div>
          </div>
        </div>
      </header>

      <div class="news-home">
        <div class="container_main" style={{ minHeight: 600 }}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </body>
  );
};

export default Layout;
