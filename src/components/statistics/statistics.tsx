import { useState } from "react";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Empty, Select, Space, Spin, TimePicker } from "antd";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import axios from "axios";

const MyChart = () => {
  const [monthlyPrices, setMonthlyPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chartData1, setChartData1] = useState({
    options: {
      chart: {
        id: "bar-chart1",
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
        name: "Sales",
        data: [],
      },
    ],
  });

  const [datamonthlyPrices, setDatamonthlyPrices] = useState({
    chart: {
      height: 450,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: "Doanh thu (VNĐ)",
      },
    },
    title: {
      text: "Biểu đồ doanh thu hàng năm",
      floating: false,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  const [chartData2, setChartData2] = useState({
    options: {
      chart: {
        id: "line-chart1",
      },
      xaxis: {
        categories: [
          "2024",
          "2023",
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

  const [chartData3, setChartData3] = useState({
    options: {
      chart: {
        id: "pie-chart",
        type: "pie",
      },
      labels: ["Đặt thành công", "Hủy đơn hàng"],
      dataLabels: {
        enabled: false,
      },
    },
    series: [],
  });

  const [chartData4, setChartData4] = useState({
    options: {
      chart: {
        id: "bar-chart2",
      },
      xaxis: {
        categories: [
          "Category A",
          "Category B",
          "Category C",
          "Category D",
          "Category E",
        ],
      },
    },
    series: [
      {
        name: "Data Set 1",
        data: [],
      },
      {
        name: "Data Set 2",
        data: [],
      },
    ],
  });

  // THỐNG KÊ DOANH THU TRONG NĂM
  // const fetchData = async (apiUrl: any) => {
  //   try {
  //     const response = await axios.get(apiUrl);
  //     const apiData = response.data;
  //     console.log(apiData.data);
  //     const monthsFromAPI = apiData.data.months;
  //     const updatedMonthlyPrices = monthsFromAPI?.map(
  //       (month: any) => month.totalPrice
  //     );
  //     const updatedCategories = monthsFromAPI.map(
  //       (month: any) => `Tháng ${month.month}`
  //     );

  //     setMonthlyPrices(updatedMonthlyPrices);
  //     setDatamonthlyPrices((prevState) => ({
  //       ...prevState,
  //       xaxis: {
  //         ...prevState.xaxis,
  //         categories: updatedCategories,
  //       },
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onChange: DatePickerProps["onChange"] = (_, dateString) => {
  //   //console.log(date, dateString);
  //   if (dateString) {
  //     const apiUrl = `http://localhost:8080/filter?year=${dateString}`;
  //     fetchData(apiUrl);
  //   }
  // };

  // const [seriesData, setSeriesData] = useState([
  //   { name: "Total Price", data: [] },
  // ]);
  // const [options, setOptions] = useState({
  //   chart: {
  //     height: 350,
  //     // type: 'bar',
  //   },
  //   xaxis: {
  //     categories: [],
  //   },
  // });

  // const onChangeDate: DatePickerProps["onChange"] = async (_, dateString) => {
  //   if (dateString) {
  //     const month = dateString.split("-")[1];

  //     //console.log(date);

  //     const apiUrl = `http://localhost:8080/filter?year=2024&month=${month}`;

  //     try {
  //       const response = await axios.get(apiUrl);
  //       const apiData = response.data.data;
  //       const updatedSeriesData = apiData.day.map(
  //         (day: any) => day.totalPrice
  //       );
  //       const updatedCategories = apiData.days.map((day: any) => day.day);
  //       //console.log(updatedSeriesData, updatedCategories);

  //       setSeriesData([{ name: "Total Price", data: updatedSeriesData }]);
  //       setOptions((prevOptions) => ({
  //         ...prevOptions,
  //         xaxis: {
  //           ...prevOptions.xaxis,
  //           categories: updatedCategories,
  //         },
  //         title: {
  //           text: "Doanh Thu Các Ngày Trong Tháng",
  //           floating: false,
  //           align: "center",
  //           style: {
  //             color: "#444",
  //           },
  //         },
  //       }));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // Hàm fetch dữ liệu từ API
  const fetchData = async (year) => {
    try {
      setLoading(true);

      // Gọi API để lấy dữ liệu doanh thu cho năm được chọn
      const response = await axios.get(`http://localhost:8080/filter?year=${year}`);
      const apiData = response.data.totalPrice;
      console.log(apiData);
      

      // Cập nhật dữ liệu và options cho biểu đồ hàng tháng
      const monthsFromAPI = apiData;
      console.log(monthsFromAPI);
      
      const updatedSeriesData = apiData && apiData.totalPrice; // Kiểm tra xem apiData có tồn tại không
      setMonthlyPrices(updatedSeriesData);
      setChartData1((prevState) => ({
        ...prevState,
        series: [{ name: "Total Price", data: updatedSeriesData }],
      }));

      // Cập nhật dữ liệu và options cho biểu đồ hàng năm
      const updatedCategories = apiData.map((month) => `Tháng ${month.month}`);
      setChartData2((prevState) => ({
        ...prevState,
        xaxis: {
          ...prevState.xaxis,
          categories: updatedCategories,
        },
        series: [{ name: "Total Price", data: updatedSeriesData }],
      }));

      // Cập nhật dữ liệu và options cho các biểu đồ khác nếu cần
      // ...

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Hàm được gọi khi người dùng thay đổi năm trên DatePicker
  const onChangeYear: DatePickerProps["onChange"] = (_, dateString) => {
    if (dateString) {
      fetchData(dateString);
    }
  };

  return (
    <div>
      {/* <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ flex: 1 }}>
          <h3>Select Date:</h3>
          <Space>
            <Select value={type} onChange={setType}>
              <Option value="time">Time</Option>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
            <PickerWithType
              type={type}
              onChange={(value) => console.log(value)}
            />
          </Space>
        </div>
      </div> */}
      {/* Phần Biểu đồ hàng tháng */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <div className="flex justify-between">
            <h3 className="text-[30px]">Doanh thu hàng tháng </h3>
            <DatePicker
              className="w-[300px] rounded-lg shadow-md"
              onChange={onChangeYear}
              picker="year"
            />
          </div>
          <ReactApexChart
            options={chartData1.options}
            series={chartData1.series}
            type="bar"
            height={350}
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
                type="area"
                height={350}
              />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <h2>Tỷ lệ đặt hàng thành công</h2>
          <ReactApexChart
            options={chartData3.options}
            series={chartData3.series}
            type="pie"
            height={350}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Danh mục bán chạy nhất</h2>
          <ReactApexChart
            options={chartData4.options}
            series={chartData4.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default MyChart;
