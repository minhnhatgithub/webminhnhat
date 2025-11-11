import { Outlet } from "react-router-dom";
import "./assets/css/layout.css";
import "./assets/css/fonts.css";
import MenuBox from "./layouts/MenuBox";
import Footer from "./layouts/Footer";
const Layout = () => {
  return (
    <div className="cute-body"> 
      <header id="header" className="cute-header" style={{ minHeight: 120 }}>
        {/* main_menu div trống này bị trùng lặp, giữ lại div có nội dung */}
        {/* <div id="main_menu"></div> */}

        <div className="header">
          <div className="container_main">
            {/* Logo mới, nhỏ hơn và nổi bật hơn */}
            <div className="logo cute-logo"> 
              <a href="/">
                <img
                style={{width: "100%"}}
                  src="https://photo.gameladeshop.com/cdn-cgi/imagedelivery/FtoMAR4WjhAfUHALpsM8nA/d0344a83-e092-4e6d-b401-eaee723cd200/w=1277,h=481"
                  alt="Cute Logo" // Đã thay đổi alt text
                />
              </a>
            </div>

            <div id="main_menu">
              <MenuBox />
            </div>
          </div>
        </div>
      </header>
      
      {/* Thêm một lớp bọc chính để quản lý padding và background */}
      <main className="main-content-wrapper"> 
          <div className="news-home cute-news-home">
            <div className="container_main" style={{ minHeight: 600 }}>
              <Outlet />
            </div>
          </div>
      </main>

      <Footer />
    </div>
  );
};
export default Layout;
