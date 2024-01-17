import { Link, useNavigate, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import Image3D from "../components/image 3D/Image3d";
import { IProducts } from "../models/products";
import { Button, Flex, Image, Pagination, Rate, message } from "antd";
import { getAll, getOne } from "../api/products";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  CommentAll,
  CommentDelete,
  FetchCommentCreate,
} from "../redux/comment.reducer";
import { current } from "@reduxjs/toolkit";
import { addProductToCart } from "../redux/cart.reducer";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<IProducts>({} as IProducts);
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit, register, setValue } = useForm();
  const [CommentProducts, setCommentProducts] = useState();
  const [dataComment, setDataComment] = useState([]);
  const [value, setValues] = useState(Number);
  const [bodyProductCategory, setBodyProductCategory] = useState();
  const [quantity, setQuantity] = useState(1);

  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOne(_id);
      setProduct(data.product);
      // console.log(data.product.categoryId.name);

      setCommentProducts(data.product);
    } catch (error) {}
  };
  const fetchProductCategory = async () => {
    const { data } = await getAll();
    const dataProductCategory = data.product;
    // lọc tất cả products theeo category
    const ProductCategory = dataProductCategory.filter(
      (item: any) =>
        item?.categoryId?._id === product?.categoryId?._id &&
        item?._id !== product?._id
    );
    setBodyProductCategory(ProductCategory);
  };

  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);

  ////////// phân trang

  const pageSize = 4; // Số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentComment = dataComment.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //////kết thức phân trang

  // đếm comment
  const countcomment = dataComment.length;

  /// form bình luận
  const onsubmit = async (comment: any) => {
    const productId = CommentProducts;
    const rate = value;
    const body = { comment, productId, userId, rate };

    try {
      if (accessToken) {
        // fetchProductById(id);
        // await comments()// gọi lại hiển thị  trc khi comment
        const data = dispatch(FetchCommentCreate(body)).unwrap();
        fetchProductById(id);

        comments();
        message.success("bạn đã bình luận thành công");
        //khi gửi nó xẽ trở về form trống
        setValue("comment", "");
      } else {
        message.warning("bạn cần đăng nhập ");
      }
    } catch (error) {
      message.error("lỗi");
    }
  };

  const comments = async () => {
    const data = await dispatch(CommentAll()).unwrap();
    const data1 = await data.filter((item: any) => {
      return item.productId[0]?._id === product._id;
    });
    //sắp xếp bình theo giờ
    data1.sort(
      (a: any, b: any) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setDataComment(data1);
  };
  // console.log(dataComment)
  ////xóa comment của tài khoản
  const dele = async (id) => {
    try {
      await dispatch(CommentDelete(id));
      comments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  useEffect(() => {
    fetchProductById(id);
    fetchProductCategory();
    dele(id);
    if (product._id) {
      comments();
    }
    setValue("productId", product._id);
  }, [product._id, setValue]);

  // xem ảnh 3d
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onHandaleAdd = async (body: any) => {
    if (!accessToken) {
      message.success("Mời bạn đăng nhập!");
      navigate("/signin");
    } else {
      await dispatch(addProductToCart(body));
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
      console.log(body.quantity);
    }
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
              <a className="breadcrumb-item text-dark" href="#">
                Cửa hàng
              </a>
              <span className="breadcrumb-item active">Chi tết sản phẩm</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Detail Start */}
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner bg-light">
                <div className="carousel-item active">
                  {/* <img
                    className="w-100 h-100"
                    src={product.img?.[0]}
                    alt="Image"
                  /> */}
                  <Image className="w-100 h-100" src={product.img?.[0]} />
                </div>
                <div className="carousel-item">
                  <Image className="w-100 h-100" src={product.img?.[1]} />
                </div>
                <div className="carousel-item">
                  <Image className="w-100 h-100" src={product.img?.[2]} />
                </div>
                <div className="carousel-item">
                  <Image className="w-100 h-100" src={product.img?.[3]} />
                </div>
              </div>
              <Button
                style={{
                  marginLeft: "190px",
                  marginTop: "24px",
                  border: "none",
                  backgroundColor: "#0e7ccf",
                  color: "#fff",
                }}
                type="primary"
                onClick={showModal}
              >
                Xem ảnh 3D
              </Button>
              <Modal
                title="Ảnh 3D"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p style={{ height: "300px" }}>
                  <Image3D />
                </p>
              </Modal>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <i className="fa fa-2x fa-angle-left text-dark" />
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <i className="fa fa-2x fa-angle-right text-dark" />
              </a>
            </div>
          </div>
          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.name}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star-half-alt" />
                  <small className="far fa-star" />
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </h3>
              <p className="mb-4">{product.description}</p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Danh mục:</strong>
                <div className="">
                  <label className="" htmlFor="size-1">
                    {product?.categoryId?.name}
                  </label>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: 130 }}
                >
                  <div className="input-group-btn">
                    {/* <button className="btn btn-primary btn-minus"
                      onClick={() => setQuantity((pre) => pre - 1)}
                    >
                      <i className="fa fa-minus" />
                    </button> */}
                  </div>
                  <input
                    type="number"
                    className="form-control bg-secondary border-0 text-center"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                  />
                  <div className="input-group-btn">
                    {/* <button className="btn btn-primary btn-plus"
                      onClick={() => setQuantity((pre) => pre + 1)}
                    >
                      <i className="fa fa-plus" />
                    </button> */}
                  </div>
                </div>
                <button
                  className="btn btn-primary px-3"
                  onClick={() =>
                    onHandaleAdd({
                      productId: String(product?._id),
                      quantity,
                    })
                  }
                >
                  <i className="fa fa-shopping-cart mr-1" /> Thêm vào giỏ hàng
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Chia sẻ:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-2"
                >
                  Thông tin
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-3"
                >
                  Đánh giá ({countcomment})
                </a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-2">
                  <h4 className="mb-3">Thông tin chi tiết</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">Chiều cao</li>
                        <li className="list-group-item px-0">Cân nặng</li>
                        <li className="list-group-item px-0">Xuất xứ</li>
                        <li className="list-group-item px-0">Chất liệu</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                          {product.height} cm
                        </li>
                        <li className="list-group-item px-0">
                          {product.weight} gram
                        </li>
                        <li className="list-group-item px-0">
                          {product.materialId?.name}
                        </li>
                        <li className="list-group-item px-0">
                          {product.originId?.name}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4">
                        Đánh giá cho sản phẩm {product.name}
                      </h4>

                      {currentComment &&
                        currentComment.map((comment) => (
                          <>
                            <div key={comment.id} className="media mb-">
                              <Space direction="vertical" size={16}>
                                <Space wrap size={16}>
                                  {/* <Avatar size={64} icon={<UserOutlined />} /> */}
                                  <Avatar
                                    size="large"
                                    icon={<UserOutlined />}
                                    style={{ marginRight: "12px" }}
                                  />
                                  {/* <Avatar icon={<UserOutlined />} /> */}
                                  {/* <Avatar size="small" icon={<UserOutlined />} /> */}
                                </Space>
                              </Space>
                              <div className="media-body">
                                <h6>
                                  {comment?.userId?.name}
                                  <small>
                                    {" "}
                                    -{" "}
                                    <i>
                                      {new Date(
                                        comment.updatedAt
                                      ).toLocaleDateString()}
                                    </i>
                                  </small>
                                </h6>
                                <div className="text-primary mb-2">
                                  <Rate
                                    tooltips={desc}
                                    disabled
                                    value={comment?.rate}
                                  />
                                  <span>{desc[comment.rate - 1]}</span>
                                </div>
                                <p>{comment?.comment?.comment}</p>
                              </div>
                              {/* Đặt Pagination ở đây để tính toán số lượng trang đúng */}
                            </div>

                            {userId?._id === comment.userId._id && (
                              <Flex
                                gap="small"
                                style={{ marginLeft: 400 }}
                                wrap="wrap"
                              >
                                <Button onClick={() => dele(comment?._id)}>
                                  xóa bình luận
                                </Button>
                              </Flex>
                            )}
                          </>
                        ))}
                      <Pagination
                        total={dataComment.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="mb-4">Để lại đánh giá</h4>
                      <small>
                        Email của bạn sẽ không được hiển thị công khai. Các
                        trường bắt buộc được đánh dấu *
                      </small>

                      <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="d-flex my-3">
                          <p className="mb-0 mr-2">Đánh giá của bạn * :</p>
                          <div className="text-primary">
                            <Rate
                              tooltips={desc}
                              onChange={setValues}
                              value={value}
                            />
                            {value ? (
                              <span className="ant-rate-text">
                                {desc[value - 1]}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Đánh giá của bạn *</label>
                          <textarea
                            rows={3}
                            id="message"
                            {...register("comment")}
                            defaultValue={""}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <input
                            type="submit"
                            defaultValue="Leave Your Review"
                            className="btn btn-primary px-3"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Shop Detail End */}

      {/* Products Start */}
      <div className="container-fluid py-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Sản phẩm cùng danh mục</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col">
            <div className="d-flex flex-row mb-3">
              {bodyProductCategory &&
                bodyProductCategory.slice(0, 4).map((item) => (
                  <div className=" me-3 product-item bg-light">
                    <div className="product-img position-relative overflow-hidden">
                      <img
                        className="img-fluid w-100"
                        src={item.img[0]}
                        alt=""
                        style={{ maxWidth: 362, height: 362 }}
                      />
                    </div>
                    <div className="text-center py-4">
                      <a
                        className="h6 text-decoration-none text-truncate"
                        href={`/detail/${item._id}`}
                      >
                        {item.name}
                      </a>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(product.price)}
                        </h5>
                        <h6 className="text-muted ml-2"></h6>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Products End */}
    </>
  );
};

export default DetailPage;
