import React, { useState, useEffect } from "react";

const HeaderCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "../../../src/assets/img/carousel-1.jpg",
    "../../../src/assets/img/carousel-2.jpg",
    "../../../src/assets/img/carousel-3.jpg",
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div
            className="carousel slide carousel-fade mb-30 mb-lg-0"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              {images.map((image, index) => (
                <li
                  key={index}
                  data-target="#header-carousel"
                  data-slide-to={index}
                  className={index === activeIndex ? "active" : ""}
                />
              ))}
            </ol>
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item position-relative ${
                    index === activeIndex ? "active" : ""
                  }`}
                  style={{ height: 430 }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src={image}
                    style={{ objectFit: "cover" }}
                    alt={`Slide ${index + 1}`}
                  />
                  {index === activeIndex && (
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: 700 }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                          Anime Dragon Ball Shop
                        </h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                          Như những viên gạch nhỏ xây dựng một tòa nhà lớn, mỗi
                          mô hình sưu tầm là một bước nhỏ để hiểu sâu hơn về thế
                          giới xung quanh chúng ta.
                        </p>
                        <a
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                          href="#"
                        >
                          Sản phẩm
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: 200 }}>
            <img
              className="img-fluid"
              src="../../../src/assets/img/offer-1.jpg"
              alt=""
            />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Tiết kiệm 20%</h6>
              <h3 className="text-white mb-3">Khi đăng ký tài khoản</h3>
              <a href="" className="btn btn-primary">
                Mua ngay
              </a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: 200 }}>
            <img
              className="img-fluid"
              src="../../../src/assets/img/offer-2.jpg"
              alt=""
            />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Giảm giá 20%</h6>
              <h3 className="text-white mb-3">Nhiều ưu đãi đặc biệt</h3>
              <a href="" className="btn btn-primary">
                Mua ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCarousel;
