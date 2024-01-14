import { useEffect } from "react";
import { fetchUserOne, fetchUsersUpdate } from "../redux/user.reducer";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useForm } from "react-hook-form";
import { IUser } from "../models/user";
import { Image, message } from "antd";
import { WarapperContainerRight, WrapperTextLight } from "./signin/style";

const UpdatePassword = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch<AppDispatch>();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IUser>({
      defaultValues: async () => {
        if (id) {
          return await fetchUserById(id);
        }
      },
    });
    const onSubmit = async (body: any) => {
      try {
        await dispatch(fetchUsersUpdate(body)).unwrap();
        message.success({ content: "Cập nhật thành công", key: "" });
        localStorage.clear();
        navigate("/signin");
        console.log(body);
      } catch (error) {
        /* empty */
      }
    };
  
    const fetchUserById = async (id: string) => {
      const data = await dispatch(fetchUserOne(id)).unwrap();
      return data.user;
    
      
    };
    useEffect(() => {
      if (id) {
        fetchUserById(id);
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
                            <span className="breadcrumb-item active">Thay đổi mật khẩu</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}
            {/* Contact Start */}
            <div className="container-fluid">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">Thay đổi mật khẩu</span>
                </h2>
                <div className="row px-xl-5">
                    <div className="col-lg-7 mb-5">
                        <div className="contact-form bg-light p-30">
                            <div id="success" />
                            <div className="control-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="name"
                                    placeholder="Mật khẩu mới của bạn"
                                  
                                    
                                    {...register("password", {
                                        required: "Vui lòng nhập mật khẩu mới",
                                      })}
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <button
                                className="btn btn-primary py-2 px-4"
                                type="submit"
                                id="sendMessageButton"
                                onClick={handleSubmit(onSubmit)}
                            >
                               Cập nhật
                            </button>
                        </div>
                    </div>
                    
            <WarapperContainerRight>
              <Image
                src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
                preview={false}
                alt="iamge-logo"
                height="260px"
                width="230px"
              />
              <WrapperTextLight>
                Mua sắm tại Anime Dragon Ball shop
              </WrapperTextLight>
            </WarapperContainerRight>
                </div>
            </div>
            {/* Contact End */}
        </>
    );
};

export default UpdatePassword;
