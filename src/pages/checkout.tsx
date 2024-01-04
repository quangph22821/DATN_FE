const CheckoutPage = () => {
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
              <span className="breadcrumb-item active">Thanh toán</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Checkout Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Địa chỉ thanh toán</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Họ</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nguyễn"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Tên</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Văn A"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="a@gmail.com"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Số điện thoại</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="0987654321"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Tỉnh / Thành phố</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tỉnh / Thành phố"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Quận / Huyện</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Quận/Huyện"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Phường / Xã</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Phường/Xã"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Địa chỉ cụ thể</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="số 123 đường 345"
                  />
                </div>
                {/* <div className="col-md-12 form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="newaccount"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="newaccount"
                    >
                      Create an account
                    </label>
                  </div>
                </div> */}
                <div className="col-md-12">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="shipto"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="shipto"
                      data-toggle="collapse"
                      data-target="#shipping-address"
                    >
                      Địa chỉ nhận hàng khác
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse mb-5" id="shipping-address">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Địa chỉ giao hàng</span>
              </h5>
              <div className="bg-light p-30">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>Họ</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập họ của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Tên</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập tên của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Số điện thoại</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Số điện thoại của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Tỉnh / Thành phố</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Tỉnh/Thành phố của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Quận / Huyện</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Quận/Huyện của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Phường / Xã</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Phường/Xã của bạn"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Địa chỉ cụ thể</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Địa chỉ cụ thể"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Tổng số đơn hàng</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom">
                <h6 className="mb-3">Sản phẩm</h6>
                <div className="d-flex justify-content-between">
                  <p>Product Name 1</p>
                  <p>$150</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Product Name 2</p>
                  <p>$150</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Product Name 3</p>
                  <p>$150</p>
                </div>
              </div>
              <div className="border-bottom pt-3 pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Tổng tiền</h6>
                  <h6>$150</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Vận chuyển</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Thanh toán</h5>
                  <h5>$160</h5>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Thanh toán</span>
              </h5>
              <div className="bg-light p-30">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="paypal"
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      Quét mã QR
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="directcheck"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="directcheck"
                    >
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="banktransfer"
                    >
                     Chuyển khoản ngân hàng
                    </label>
                  </div>
                </div>
                <button className="btn btn-block btn-primary font-weight-bold py-3">
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Checkout End */}
    </>
  );
};

export default CheckoutPage;
