import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneBill } from "../api/bill";
import axios from "axios";
import { Modal, Pagination } from "antd";

const HistoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [bills, setBills] = useState();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("bạn muốn hủy đơn hàng ?");
  const [message, setMessage] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const UpdateBillStatus = async (billId: any) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/bills/cancel/status/${billId}`,
        {
          status: "Hủy đơn hàng",
        }
      );

      // Đặt nội dung thông báo cho Modal
      setModalText(response.data.message);

      // Mở Modal
      showModal();

      // Gọi hàm fetchProductById để cập nhật dữ liệu sản phẩm sau khi hủy đơn hàng
      await fetchProductById(id);
    } catch (error) {
      // Nếu có lỗi, đặt thông báo lỗi cho Modal
      setModalText(error.response.data.message);
      // Mở Modal
      showModal();
    }
  };

  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOneBill(_id);
      console.log(data.bills);
      setBills(data.bills);
    } catch (error) { }
  };

  /// phân trang

  const pageSize = 4; // Số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts =
    bills && bills.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  console.log(currentProducts);

  //kết thúc phântrang

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, []);

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
              <span className="breadcrumb-item active">Lịch sử mua hàng</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      <div className="container text-center"></div>
      {/* Cart Start */}
      <div className="container-fluid">
        <div className="">
          <div className="col table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Sản phẩm x số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Phương thức thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Hủy</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {currentProducts?.map((item: any) => (
                  <tr>
                    <td className="align-middle">{item?._id}</td>
                    {/* <td>
                      <img src={item?.city} alt="" style={{ width: 50 }} />
                      {item?.products?.price}
                    </td> */}
                    {item?.products?.map((index: any) => (
                      <div
                        style={{
                          width: "auto",
                          textAlign: "left",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <img
                          src={index?.productId?.img[0]}
                          alt=""
                          style={{ width: 60, height: 60 }}
                        />
                        <Link
                          className="h6 text-decoration-none text-truncate"
                          to={`/detail/${index?.productId?._id}`}
                        >
                          {" "}
                          <span style={{ paddingLeft: 15 }}>
                            {index?.productId?.name} x {index?.quantity}
                          </span>
                        </Link>
                      </div>
                    ))}
                    <td className="align-middle">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item?.totalOrder)}
                    </td>
                    <td className="align-middle">{item?.paymentMethod}</td>
                    <td className="align-middle">{item?.status}</td>
                    <td className="align-middle">
                      <td className="align-middle">
                        {item?.status === "Chờ xác nhận" &&
                          item?.paymentMethod != "Ví điện tử" ? (
                          <button
                            onClick={() => UpdateBillStatus(item?._id)}
                            className="btn btn-sm btn-danger"
                            style={{ marginLeft: 12 }}
                          >
                            <i className="fa fa-times" />
                          </button>
                        ) : null}

                        <Modal
                          title="Title"
                          open={open}
                          onOk={handleOk}
                          confirmLoading={confirmLoading}
                          onCancel={handleCancel}
                        >
                          <p>{modalText}</p>
                        </Modal>
                      </td>
                    </td>
                  </tr>
                ))}
                <div className="col-12">
                  <nav>
                    <ul className="pagination justify-content-center">
                      <Pagination
                        current={currentPage}
                        total={bills && bills?.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                      />
                    </ul>
                  </nav>
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Cart End */}
    </>
  );
};

export default HistoryPage;
