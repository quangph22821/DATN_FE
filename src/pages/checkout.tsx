import { useEffect, useState } from "react";
import { checkOut, getCartUser } from "../api/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import dotenv from "dotenv";
import axios from "axios";
const REACT_APP_API_PAYMENT = "http://topcode.fun/api/v1/payment/add";
const CheckoutPage = () => {
  const [products, setProducts] = useState();
  const { handleSubmit, register } = useForm();
  const [paymentMethod, setPaymentMethod] = useState(""); // Phương thức thanh toán
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = () => {
    getCartUser().then(({ data }) => setProducts(data.cart));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ... (Các phần mã khác)

  const onSubmit = async (body: any) => {
    try {
      let response = await checkOut(body);
      console.log("================== RESPONSE: ", response);

      if (response?.data?.bill) {
        let total = response.data.bill.totalOrder;

        if (response.data.bill.paymentMethod === "Ví điện tử") {
          // Nếu là "Ví điện tử", cập nhật state và không tiến hành đặt hàng ngay lúc này
          setPaymentMethod("Ví điện tử");
          // Thực hiện thanh toán trực tuyến với các thông tin cần thiết trực tiếp
          await performOnlinePayment(response.data.bill._id, total, onSuccessPayment);
        } else {
          // Phương thức thanh toán không phải là "Ví điện tử", tiến hành đặt hàng bình thường
          message.success("Bạn đã đặt hàng thành công");
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      message.warning("Bạn cần nhập đầy đủ thông tin")
    }
  };

  // Hàm thực hiện thanh toán trực tuyến
  const performOnlinePayment = async (orderId: string, amount: number) => {
    // Thực hiện các bước thanh toán trực tuyến tại đây
    console.log("=============== CALL TT ONLINE: ");
    let newData = {
      order_id: orderId,
      url_return: "http://localhost:5173",
      amount: amount,
      service_code: "anime",
      url_callback: "http://localhost:5173",
    };
    let paymentOnline = await axios.post(REACT_APP_API_PAYMENT, newData);
    console.log("============= paymentOnline", paymentOnline);

    if (paymentOnline.data.link) {
      window.location.href = paymentOnline.data.link;
    }
  };

  const onSuccessPayment = () => {
    message.success("Bạn đã thanh toán thành công và đặt hàng thành công");
    navigate("/");
  };

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
      <form>
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Địa chỉ thanh toán</span>
              </h5>
                <p style={{color: "red"}}>*Lưu ý: Khi bạn thanh toán bằng ví điện tử VNPAY, bạn sẽ không thể hủy đơn hàng!</p>
              <div className="bg-light p-30 mb-5">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>Tên</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={products?.userId?.name}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={products?.userId?.email}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Số điện thoại</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Số điện thoại"
                      {...register("phone")}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Tỉnh / Thành phố</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Tỉnh / Thành phố"
                      {...register("city")}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Quận / Huyện</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Quận/Huyện"
                      {...register("district")}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Phường / Xã</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Phường/Xã"
                      {...register("commune")}
                    />
                  </div>
                  <div className="col-md form-group">
                    <label>Địa chỉ cụ thể</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Địa chỉ cụ thể"
                      {...register("shippingAddress")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Tổng số đơn hàng</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom">
                  <h6 className="mb-3">Sản phẩm</h6>
                  {products?.products?.map((item: any) => (
                    <div className="d-flex justify-content-between">
                      <p>{item?.productId?.name}</p>
                      <p>{new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item?.productId?.price)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-bottom pt-3 pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Tổng tiền</h6>
                    <h6>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(products?.totalPrice)}
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Vận chuyển</h6>
                    <h6 className="font-weight-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(products?.shippingFee)}
                    </h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Thanh toán</h5>
                    <h5>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(products?.totalOrder)}
                    </h5>
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
                        {...register("paymentMethod")}
                        value="Ví điện tử"
                      />
                      <label className="custom-control-label" htmlFor="paypal">
                        Thanh toán qua ví điện tử
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
                        {...register("paymentMethod")}
                        value="Thanh toán khi nhận hàng"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="directcheck"
                      >
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-block btn-primary font-weight-bold py-3"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Checkout End */}
    </>
  );
};

export default CheckoutPage;
