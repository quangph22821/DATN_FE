
const DetailPage = () => {
  return (
    <>
      {/* Breadcrumb Start */}
      <div className="container-fluid">
            <div className="row px-xl-5">
              <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                  <a className="breadcrumb-item text-dark" href="#">
                    Trang chủ
                  </a>
                  <a className="breadcrumb-item text-dark" href="#">
                    Cửa hàng
                  </a>
                  <span className="breadcrumb-item active">Chi tết sản phẩm</span>
                </nav>
              </div>
            </div>
          </div>
          {/* Breadcrumb End */}
    </>
  )
};

export default DetailPage;
