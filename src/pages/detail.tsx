import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProducts } from "../models/products";
// import { fetchAddToCard } from "../redux/cart.reducer";
import { Image, Pagination, Rate, message } from "antd";
import { getAll, getOne } from "../api/products";
import { useForm } from "react-hook-form";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { CommentAll, FetchCommentCreate } from "../redux/comment.reducer";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<IProducts>({} as IProducts);
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit, register, setValue } = useForm();
  const [CommentProducts, setCommentProducts] = useState()
  const [dataComment, setDataComment] = useState([])
  const [value, setValues] = useState(Number);
  const [bodyProductCategory, setBodyProductCategory] = useState()

  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOne(_id);
      setProduct(data.product);
      // console.log(data.product.categoryId.name);

      setCommentProducts(data.product)
    } catch (error) { }
  };
  console.log(product?.categoryId?._id);
  // const fetchProductCategory=async()=>{
  //   const {data}= await getAll()
  //   const dataProductCategory= data.product
  //   // lọc tất cả products theeo category
  //   const ProductCategory= dataProductCategory.filter((item:any)=>item?.categoryId?._id===product?.categoryId?._id )
  //   setBodyProductCategory(ProductCategory)
  // }

  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user)


  // đếm comment
  const countcomment = dataComment.length



  const onsubmit = async (comment: any) => {
    const productId = CommentProducts
    const rate = value
    const body = { comment, productId, userId,rate }
    console.log(body);
    try {
      // if (accessToken) {
      // fetchProductById(id);
      // await comments()// gọi lại hiển thị  trc khi comment
      const data = dispatch(FetchCommentCreate(body)).unwrap()
      fetchProductById(id)
      
      comments()
      console.log(data);

      message.success("bạn đã bình luận thành công")
      //khi gửi nó xẽ trở về form trống
      setValue("comment", "")
      // } else {
      //   message.warning("bạn cần đăng nhập ")
      // }

    } catch (error) {
      message.error("lỗi")
    }

  }
  const comments = async () => {
    const data = await dispatch(CommentAll()).unwrap()
    const data1 = await data.filter((item: any) => {
      return item.productId[0]?._id === product._id
    })
    //sắp xếp bình theo giờ
    data1.sort((a: any, b: any) => new Date(b.updatedAt) - new Date(a.updatedAt))
    setDataComment(data1)
  }
  // console.log(dataComment)
  useEffect(() => {
    fetchProductById(id);
    // fetchProductCategory()
    if (product._id) {
      comments()
    }
    setValue("productId", product._id);
  }, [product._id, setValue]);

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
                {product.price}.000 VNĐ
              </h3>
              <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                magna duo dolor no sea Nonumy
              </p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Xuất xứ:</strong>
                <div className="">
                  <label className="" htmlFor="size-1">
                    {product.materialId?.name}
                  </label>
                </div>
              </div>
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Chất liệu:</strong>
                <div className="">
                  <label className="" htmlFor="color-1">
                    {product.originId?.name}
                  </label>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: 130 }}
                >
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    defaultValue={1}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary px-3">
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
                  <p>{product.description}</p>
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
                      <h4 className="mb-4">1 review for "Product Name"</h4>
                      {dataComment.slice(0, 6).map(comment =>

                        < div className="media mb-" >
                          <><img
                            src="../../src/assets/img/user.jpg"
                            alt="Image"
                            className="img-fluid mr-3 mt-1"
                            style={{ width: 45 }} /><div className="media-body">
                              <h6>
                                {comment?.userId?.name}
                                <small>
                                  {" "}
                                  - <i>{new Date(comment.updatedAt).toLocaleDateString()}</i>
                                </small>
                              </h6>
                              <div className="text-primary mb-2">
                                <Rate tooltips={desc} disabled value={comment?.rate} />
                                <span>{desc[comment.rate - 1]}</span>
                              </div>
                              <p>
                                {comment?.comment?.comment}
                              </p>
                            </div></>
                        </div>
                      )}
                      <Pagination defaultCurrent={1} total={100} />;
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
                            <Rate tooltips={desc} onChange={setValues} value={value} />
                            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Đánh giá của bạn *</label>
                          <textarea
                            rows={3}
                            id="message"
                            {...register('comment')}
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
      </div >
      {/* Shop Detail End */}

      {/* Products Start */}
      
      {/* Products End */}
    </>
  );
};

export default DetailPage;
