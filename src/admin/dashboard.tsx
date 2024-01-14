import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyChart from "../components/statistics/statistics";

const DashboardPage = () => {
  const navigate = useNavigate();
  const accessRole = localStorage.getItem("accessRole");

  useEffect(() => {
    if (!accessRole) {
      message.warning("Bạn cần phải đăng nhập !");
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
      <MyChart />
    </>
  );
};

export default DashboardPage;
