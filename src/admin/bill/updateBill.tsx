import { message } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchBillById,
  fetchBillUpdate,
  fetchUserBill,
} from "../../redux/bill.reducer";
import { IBill } from "../../models/bill";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const UpdateBill = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [body, setbody] = useState();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBill>({
    defaultValues: async () => {
      if (id) {
        return await fetchUpdateStatus(id);
      }
    },
  });
  const onSubmit = async (body: any) => {
    try {
      await dispatch(fetchBillUpdate(body)).unwrap();
      message.success({
        content: "Cập nhật trạng thái đơn hàng thành công",
        key: "update",
      });
      navigate("/admin/listBill");
    } catch (error) {
      /* empty */
    }
  };

  const fetchUpdateStatus = async (id: string) => {
    const data = await dispatch(fetchBillById(id)).unwrap();
    setbody(data.bill);
    return data.bill;
  };

  useEffect(() => {
    if (id) {
      fetchUpdateStatus(id);
    }
  }, []);
  
  return (
    <>
      <main role="main" className="main-content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="card shadow mb-4">
                    <div className="card-header">
                      <strong className="card-title">
                        Cập nhật trạng thái đơn hàng
                      </strong>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Tên khác hàng</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputEmail5"
                              {...register("userId.name")}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              Số điện thoại
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="inputPassword5"
                              min="0"
                              {...register("phone")}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Thành phố</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputEmail5"
                              {...register("city")}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                             Quận / huyện
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="inputPassword5"
                              min="0"
                              {...register("district")}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Xã / phường</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputEmail5"
                              {...register("commune")}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              Địa chỉ cụ thể
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="inputPassword5"
                              min="0"
                              {...register("shippingAddress")}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Tổng tiền</label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputEmail5"
                              min="0"
                              {...register("totalOrder")}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Trạng thái</label>
                            <select
                              id="inputState5"
                              className="form-control"
                              {...register("status")}
                              defaultValue={"status"}
                            >
                              <option
                                value="Chờ xác nhận"
                                disabled={
                                  body?.status === "Đang giao hàng" ||
                                  body?.status === "Đã xác nhận" ||
                                  body?.status === "Đã giao hàng" ||
                                  body?.status === "Hủy đơn hàng"
                                }
                              >
                                Chờ xác nhận
                              </option>
                              <option
                                value="Hủy đơn hàng"
                                disabled={
                                  body?.status === "Đã xác nhận" ||
                                  body?.status === "Đã giao hàng" ||
                                  body?.status === "Đang giao hàng"
                                }
                              >
                                Hủy đơn hàng
                              </option>
                              <option
                                value="Đã xác nhận"
                                disabled={
                                  body?.status === "Hủy đơn hàng" ||
                                  body?.status === "Đang giao hàng" ||
                                  body?.status === "Đã giao hàng" ||
                                  body?.status === "Đang giao hàng"
                                }
                              >
                                Đã xác nhận
                              </option>
                              <option
                                value="Đã giao hàng"
                                disabled={
                                  body?.status === "Hủy đơn hàng" ||
                                  body?.status === "Đã xác nhận" ||
                                  body?.status === "Chờ xác nhận"
                                }
                              >
                                Đã giao hàng
                              </option>
                              <option
                                value="Đang giao hàng"
                                disabled={
                                  body?.status === "Hủy đơn hàng" ||
                                  body?.status === "Chờ xác nhận" ||
                                  body?.status === "Đã giao hàng"
                                }
                              >
                                Đang giao hàng
                              </option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success bg-green-600 color-while"
                          style={{ marginRight: 5, marginLeft: 18 }}
                        >
                          Update
                        </button>
                      </form>
                    </div>{" "}
                    {/* /. card-body */}
                  </div>{" "}
                  {/* /. card */}
                </div>{" "}
                {/* /. col */}
              </div>{" "}
              {/* /. end-section */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateBill;
