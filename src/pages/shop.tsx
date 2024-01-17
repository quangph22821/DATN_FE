import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProductsAll, fetchProductsOne } from "../redux/products.reducer";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "antd";
import { fetchCategoriesAll } from "../redux/categories.reducer";
import { useForm } from "react-hook-form";
import { IProducts } from "../models/products";
import { search } from "./search";

const ShopPage = () => {
  const { _id }: any = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);
  const { handleSubmit, register, setValue } = useForm();
  const [products, setproducts] = useState<IProducts>({} as IProducts);
  /// search
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [search, setsearch] = useState([]);
  console.log(search);
  const [checkAll, setcheckAll] = useState(true);
  // Lọc sản phẩm theo searchTerm
  const filteredProducts = useMemo(
    () =>
      product.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [product, searchTerm]
  );

  // Set giá trị cho search bằng mảng filteredProducts

  /// phân trang

  const pageSize = 6; // Số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  //kết thúc phântrang
  const fetchProductById = async (_id: string) => {
    const { product } = await dispatch(fetchProductsOne(_id)).unwrap();
    //   console.log(product);

    setproducts(product);
    // console.log(products);
  };
  useEffect(() => {
    setsearch(filteredProducts);
    if (search.length > 0) {
      setcheckAll(false);
    }
  }, [filteredProducts]);

  const fetchProducts = async () => {
    try {
      await dispatch(fetchProductsAll()).unwrap();
    } catch (error) {}
  };
  console.log(product);

  // categories
  const dispatchcategory = useDispatch<AppDispatch>();
  const { category } = useSelector((state: RootState) => state.categories);
  const [cate, setcate] = useState([]);
  const fetchCategories = async () => {
    try {
      await dispatchcategory(fetchCategoriesAll()).unwrap();
    } catch (error) {
      error.message;
    }
  };

  // lấy sản phẩm theo idcategory
  const idcategory = async (id: any) => {
    const catego = await product.filter(
      (item: any) => item.categoryId && item.categoryId._id == id
    );
    setcate(catego as any);
  };

  // lọc ra 2 cái bảng cùng id để lấy ra sản phẩm cùng id , đếm sản phẩm trong danh mục có bao nhiêu sản phẩm

  const count1 = product.filter(
    (item: any) => item.categoryId && item.categoryId._id == category[0]?._id
  );
  const count2 = product.filter(
    (item: any) => item.categoryId && item.categoryId._id == category[1]?._id
  );
  const count3 = product.filter(
    (item: any) => item.categoryId && item.categoryId._id == category[2]?._id
  );
  const count4 = product.filter(
    (item: any) => item.categoryId && item.categoryId._id == category[3]?._id
  );
  const count5 = product.filter(
    (item: any) => item.categoryId && item.categoryId._id == category[4]?._id
  );

  /// nếu có tatats cả sản phẩm thì không hiển thị theo danh sách và ngược lại
  const [check, setcheck] = useState(true);

  // Phải cung cấp mảng dependency để chỉ gọi useEffect khi giá trị thay đổi
  useEffect(() => {
    fetchProductById(_id);
    fetchProducts();
    fetchCategories();
    setValue("productId", products._id);
  }, [products._id, setValue]);
  // if (minh.length > 1) {
  //   setcheckAll(true);
  // } else {
  //   setcheckAll(false);
  // }
  // console.log(search);

  console.log(filteredProducts);
  console.log(currentProducts);
  console.log(search);

  const accessToken = localStorage.getItem("accessToken");
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
                Của hàng
              </a>
              <span className="breadcrumb-item active">Danh sách sản phẩm</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-4">
            {/* Price Start */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Lọc theo danh mục</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              {/* danh sách theo danh muc */}
              <form>
                <div
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                  onClick={() => setcheckAll(true)}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                    onClick={() => setcheck(true)}
                  />
                  <label className="custom-control-label" htmlFor="price-all">
                    Tất cả sản phẩm
                  </label>
                  <span className="badge border font-weight-normal">
                    {product.length}
                  </span>
                </div>
                <div
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                  onClick={() => setcheck(false)}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label
                    className="custom-control-label"
                    onClick={() => idcategory(category[0]._id)}
                    htmlFor="price-1"
                  >
                    {category[0]?.name}
                  </label>
                  <span className="badge border font-weight-normal">
                    ({count1.length})
                  </span>
                </div>
                <div
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                  onClick={() => setcheck(false)}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label
                    className="custom-control-label"
                    onClick={() => idcategory(category[1]._id)}
                    htmlFor="price-1"
                  >
                    {category[1]?.name}
                  </label>
                  <span className="badge border font-weight-normal">
                    ({count2.length})
                  </span>
                </div>
                <div
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                  onClick={() => setcheck(false)}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label
                    className="custom-control-label"
                    onClick={() => idcategory(category[2]._id)}
                    htmlFor="price-1"
                  >
                    {category[2]?.name}
                  </label>
                  <span className="badge border font-weight-normal">
                    ({count3.length})
                  </span>
                </div>
                <div
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                  onClick={() => setcheck(false)}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label
                    className="custom-control-label"
                    onClick={() => idcategory(category[3]._id)}
                    htmlFor="price-1"
                  >
                    {category[3]?.name}
                  </label>
                  <span className="badge border font-weight-normal">
                    ({count4.length})
                  </span>
                </div>
                <div
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                  onClick={() => setcheck(false)}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label
                    className="custom-control-label"
                    onClick={() => idcategory(category[4]._id)}
                    htmlFor="price-1"
                  >
                    {category[4]?.name}
                  </label>
                  <span className="badge border font-weight-normal">
                    ({count5.length})
                  </span>
                </div>
              </form>
              {/* kết thúc tên danh mục */}
            </div>
            {/* Price End */}
          </div>
          {/* Shop Sidebar End */}

          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              {check ? (
                <>
                  {checkAll ? (
                    <>
                      {" "}
                      {currentProducts &&
                        currentProducts.slice(0, 6).map((item) => (
                          <div
                            className="col-lg-4 col-md-6 col-sm-6 pb-1"
                            key={item._id}
                          >
                            <div className="product-item bg-light mb-4">
                              <div className="product-img position-relative overflow-hidden">
                                <img
                                  className="img-fluid w-100"
                                  src={item.img?.[0]}
                                  alt=""
                                  style={{ width: 302, height: 302 }}
                                />
                                <div className="product-action">
                                  <a
                                    className="btn btn-outline-dark btn-square"
                                    href=""
                                  >
                                    <i className="fa fa-shopping-cart" />
                                  </a>
                                  <a
                                    className="btn btn-outline-dark btn-square"
                                    href=""
                                  >
                                    <i className="far fa-heart" />
                                  </a>
                                  <Link
                                    className="btn btn-outline-dark btn-square"
                                    to={`/detail/${item._id}`}
                                  >
                                    <i className="fa fa-search" />
                                  </Link>
                                </div>
                              </div>
                              <div className="text-center py-4">
                                <Link
                                  className="h6 text-decoration-none text-truncate"
                                  to={`/detail/${item._id}`}
                                >
                                  {item.name}
                                </Link>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                  <h5>
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(item.price)}
                                  </h5>
                                  <h6 className="text-muted ml-2">
                                    {/* <del>$123.00</del> */}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="col-12">
                        <nav>
                          <ul className="pagination justify-content-center">
                            <Pagination
                              current={currentPage}
                              total={product.length}
                              pageSize={pageSize}
                              onChange={handlePageChange}
                            />
                          </ul>
                        </nav>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      {search.map((item) => (
                        <div
                          className="col-lg-4 col-md-6 col-sm-6 pb-1"
                          key={item._id}
                        >
                          <div className="product-item bg-light mb-4">
                            <div className="product-img position-relative overflow-hidden">
                              <img
                                className="img-fluid w-100"
                                src={item.img?.[0]}
                                alt=""
                                style={{ width: 302, height: 302 }}
                              />
                              <div className="product-action">
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href=""
                                >
                                  <i className="fa fa-shopping-cart" />
                                </a>
                                <a
                                  className="btn btn-outline-dark btn-square"
                                  href=""
                                >
                                  <i className="far fa-heart" />
                                </a>
                                <Link
                                  className="btn btn-outline-dark btn-square"
                                  to={`/detail/${item._id}`}
                                >
                                  <i className="fa fa-search" />
                                </Link>
                              </div>
                            </div>
                            <div className="text-center py-4">
                              <Link
                                className="h6 text-decoration-none text-truncate"
                                to={`/detail/${item._id}`}
                              >
                                {item.name}
                              </Link>
                              <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(item.price)}
                                </h5>
                                <h6 className="text-muted ml-2">
                                  {/* <del>$123.00</del> */}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  {cate.map((item) => (
                    <>
                      <div
                        className="col-lg-4 col-md-6 col-sm-6 pb-1"
                        key={item._id}
                      >
                        <div className="product-item bg-light mb-4">
                          <div className="product-img position-relative overflow-hidden">
                            <img
                              className="img-fluid w-100"
                              src={item.img?.[0]}
                              alt=""
                              style={{ width: 302, height: 302 }}
                            />
                            <div className="product-action">
                              <a
                                className="btn btn-outline-dark btn-square"
                                href=""
                              >
                                <i className="fa fa-shopping-cart" />
                              </a>
                              <a
                                className="btn btn-outline-dark btn-square"
                                href=""
                              >
                                <i className="far fa-heart" />
                              </a>
                              <Link
                                className="btn btn-outline-dark btn-square"
                                to={`/detail/${item._id}`}
                              >
                                <i className="fa fa-search" />
                              </Link>
                            </div>
                          </div>
                          <div className="text-center py-4">
                            <Link
                              className="h6 text-decoration-none text-truncate"
                              to={`/detail/${item._id}`}
                            >
                              {item.name}
                            </Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                              <h5>{item.price}.000 VNĐ</h5>
                              <h6 className="text-muted ml-2"></h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="col-12">
                    {cate.length > 0 && (
                      <nav>
                        <ul className="pagination justify-content-center">
                          <Pagination
                            current={currentPage}
                            total={cate.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                          />
                        </ul>
                      </nav>
                    )}
                  </div>
                </>
              )}

              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    {/* Hiển thị thanh phân trang */}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}
    </>
  );
};

export default ShopPage;
