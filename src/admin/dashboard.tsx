import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyChart from "../components/statistics/statistics";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchUsersAll } from "../redux/user.reducer";
import { fetchProductsAll } from "../redux/products.reducer";
import { fetchBillAll } from "../redux/bill.reducer";
import axios from "axios";

const DashboardPage = () => {
  const navigate = useNavigate();
  const accessRole = localStorage.getItem("accessRole");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.users);
  const { product } = useSelector((state: RootState) => state.products);
  const { bill } = useSelector((state: RootState) => state.bills);
  const [successRate, setSuccessRate] = useState(0);
  const [cancelRate, setCancelRate] = useState(0);

  // ĐẾM SỐ LƯỢNG NGƯỜI DÙNG VÀ SẢN PHẨM
  useEffect(() => {
    dispatch(fetchUsersAll());
    dispatch(fetchProductsAll());
    dispatch(fetchBillAll());
  }, []);
  const numberOfUsers = user.length;
  const numberOfProducts = product.length;

  // ĐẾM SỐ LƯỢNG ĐÃ NHẬN HÀNG
  // Lọc đơn hàng có trạng thái "đã nhận hàng"
  const receivedOrders = bill.filter(
    (order) => order.status === "Đã giao hàng"
  );

  // Số lượng đơn hàng đã nhận hàng
  const numberOfReceivedOrders = receivedOrders.length;

  // TỶ LỆ ĐẶT HÀNG THÀNH CÔNG
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const result = await axios.get("http://localhost:8080/rate");
        console.log(result.data);
        const cancelRate = result.data.cancelRate;
        const successRate = result.data.successRate;
        console.log("rate: " + successRate, cancelRate);
        setSuccessRate(successRate);
        setCancelRate(cancelRate);

        // Cập nhật giá trị series trong state với dữ liệu mới
      } catch (error) {
        console.error("Error fetching statistics:", error.message);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    if (!accessRole) {
      message.warning("bạn cần phải đăng nhập !");
      navigate("/signin");
    }
    if (accessRole == "member") {
      message.warning("Bạn không có quyền truy cập !");
      navigate("/signin");
    }
    if (accessRole == "admin") {
      navigate("/admin");
    }
  }, [accessRole, navigate]);
  return (
    <>
      <div className="container">
        <div className="row" style={{ marginBottom: "12px" }}>
          {/* ĐẾM SỐ LƯỢNG SẢN PHẨM */}
          <div
            style={{
              height: "120px",
              backgroundColor: "#f5f5f5", // Màu nền
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px", // Khoảng cách nội dung từ mép
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="col"
          >
            <i
              className="fa fa-shopping-bag"
              aria-hidden="true"
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1890ff",
              }}
            />
            {/* Icon */}
            <h5
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Số lượng sản phẩm
            </h5>
            <span
              style={{ fontSize: "24px", color: "#1890ff", fontWeight: "bold" }}
            >
              {numberOfProducts}
            </span>
          </div>

          {/* ĐẾM SỐ LƯỢNG ĐƠN HÀNG THÀNH CÔNG*/}
          <div
            style={{
              height: "120px",
              marginLeft:"10px",
              backgroundColor: "#f5f5f5", // Màu nền
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px", // Khoảng cách nội dung từ mép
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="col"
          >
            <i
              className="fa fa-check"
              aria-hidden="true"
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#ff4d4f",
              }}
            />
            {/* Icon */}
            <h5
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Đơn hàng thành công
            </h5>
            <span
              style={{ fontSize: "24px", color: "#ff4d4f", fontWeight: "bold" }}
            >
              {numberOfReceivedOrders}
            </span>
          </div>

          {/* TỶ LỆ ĐẶT HÀNG THÀNH CÔNG */}
          <div
            style={{
              height: "120px",
              backgroundColor: "#f5f5f5", // Màu nền
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px", // Khoảng cách nội dung từ mép
              display: "flex",
              marginLeft:"10px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="col"
          >
            <i
              className="fa fa-download"
              aria-hidden="true"
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "green",
              }}
            />
            {/* Icon */}
            <h5
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Tỷ lệ đặt hàng thành công
            </h5>
            <span
              style={{ fontSize: "24px", color: "green", fontWeight: "bold" }}
            >
              {successRate} %
            </span>
          </div>

          {/* ĐẾM SỐ LƯỢNG NGƯỜI DÙNG */}
          <div
            style={{
              height: "120px",
              backgroundColor: "#f5f5f5", // Màu nền
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px", // Khoảng cách nội dung từ mép
              display: "flex",
              marginLeft:"10px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="col"
          >
            <i
              className="fa fa-user"
              aria-hidden="true"
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#FFD333",
              }}
            />
            {/* Icon */}
            <h5
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Thành viên sử dụng
            </h5>
            <span
              style={{ fontSize: "24px", color: "#FFD333", fontWeight: "bold" }}
            >
              {numberOfUsers}
            </span>
          </div>
        </div>
      </div>
      <MyChart />
    </>
  );
};

export default DashboardPage;
