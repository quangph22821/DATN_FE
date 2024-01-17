import { useEffect, useState } from "react";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Empty, Select, Space, Spin, TimePicker } from "antd";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import axios from "axios";
const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

const MyChart = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [monthlyPrices, setMonthlyPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chartData1, setChartData1] = useState({
    options: {
      chart: {
        id: "bar-chart1",
      },
      xaxis: {
        categories: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
      },
    },
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
  });

  const [chartData2, setChartData2] = useState({
    options: {
      chart: {
        id: "line-chart1",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Profit",
        data: [],
      },
    ],
  });

  // Hàm fetch dữ liệu từ API
  const fetchData = async (year: any) => {
    try {
      setLoading(true);

      // Gọi API để lấy dữ liệu doanh thu cho năm được chọn
      const response = await axios.get(
        `http://localhost:8080/byyear?selectedYear=${year}`
      );
      const apiData = response.data.monthlyTotalPrices;
      console.log("apiYear", apiData);

      setChartData2((prevChartData: any) => ({
        ...prevChartData,
        series: [
          {
            ...prevChartData.series[0],
            data: apiData,
          },
        ],
      }));

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // CALL API THEO Tháng
  const fetchDataMonth = async (year: any, month: any) => {
    try {
      setLoading(true);

      // Gọi API để lấy dữ liệu doanh thu cho năm được chọn
      const response = await axios.get(
        `http://localhost:8080/bymonth?selectedYear=${year}&selectedMonth=${month}`
      );
      const apiData = response.data.dailyTotalPrices;
      console.log("apiMonth", apiData);

      setChartData1((prevChartData: any) => ({
        ...prevChartData,
        series: [
          {
            ...prevChartData.series[0],
            data: apiData,
          },
        ],
      }));

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // CALL API  THỐNG KÊ ĐẶT HÀNG
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const result = await axios.get("http://localhost:8080/rate");
        console.log(result.data);
        const cancelRate = result.data.cancelRate;
        const successRate = result.data.successRate;
        console.log("rate: " + successRate, cancelRate);

        // Cập nhật giá trị series trong state với dữ liệu mới
        setChartData3({
          ...chartData3,
          series: [successRate && cancelRate],
        });
      } catch (error) {
        console.error("Error fetching statistics:", error.message);
      }
    };

    fetchStatistics();
  }, []);

  // CALL SẢN PHẨM BÁN CHẠY
  useEffect(() => {
    const fetchTopProduct = async () => {
      try {
        const result = await axios.get("http://localhost:8080/topCategory");
        console.log(result.data.topSellingProducts);
        // Cập nhật giá trị series trong state với dữ liệu mới
        setTopSellingProducts(result.data.topSellingProducts);
      } catch (error) {
        console.error("Error fetching statistics:", error.message);
      }
    };

    fetchTopProduct();
  }, []);

  // Hàm được gọi khi người dùng thay đổi năm trên DatePicker
  const onChangeYear: DatePickerProps["onChange"] = (_, dateString) => {
    if (dateString) {
      fetchData(dateString);
    }
  };
  const onChangeMonth: DatePickerProps["onChange"] = (_, dateString) => {
    const lastTwoCharacters = dateString.slice(-2);
    const lastTwoYear = dateString.slice(0, 4);
    if (lastTwoCharacters && lastTwoYear) {
      fetchDataMonth(lastTwoYear, lastTwoCharacters);
    }
  };

  return (
    <div>
      {/* Phần Biểu đồ hàng tháng */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <div className="flex justify-between">
            <h3 className="text-[30px]">Doanh thu hàng tháng </h3>
            <DatePicker onChange={onChangeMonth} picker="month" />
          </div>
          <ReactApexChart
            options={chartData1.options}
            series={chartData1.series}
            type="line"
            height={350}
            width={475}
          />
        </div>
        {/* Phần Biểu đồ hàng năm */}
        <div style={{ flex: 1 }}>
          <div className="flex justify-between mt-[100px] mb-[40px]">
            <h3 className="h3 text-[25px]">Doanh Thu Hằng Năm</h3>
            <DatePicker
              className="w-[300px] rounded-lg shadow-md"
              onChange={onChangeYear}
              picker="year"
            />
          </div>
          <div
            id="chart"
            className="w-[65%] bg-[#ffffff] p-[30px] rounded-md shadow-lg"
          >
            <ReactApexChart
              options={chartData2.options}
              series={chartData2.series}
              type="bar"
              height={310}
              width={475}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Sản phẩm bán chạy nhất</h2>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Số lượt bán</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.slice(0, 5).map((product, index) => (
                  <tr key={product.productId}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChart;
