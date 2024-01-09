
const CartPage = () => {
  return (
   <><>
   {/* Breadcrumb Start */}
   <div className="container-fluid">
     <div className="row px-xl-5">
       <div className="col-12">
         <nav className="breadcrumb bg-light mb-30">
           <a className="breadcrumb-item text-dark" href="#">
             Trang chủ
           </a>
           <span className="breadcrumb-item active">Giỏ hàng</span>
         </nav>
       </div>
     </div>
   </div>
   {/* Breadcrumb End */}
   {/* Cart Start */}
   <div className="container-fluid">
     <div className="row px-xl-5">
       <div className="col-lg-8 table-responsive mb-5">
         <table className="table table-light table-borderless table-hover text-center mb-0">
           <thead className="thead-dark">
             <tr>

               <th>Sản phẩm</th>
               <th>
                 Hình ảnh
               </th>
               <th>Giá tiền</th>
               <th>Số lượng</th>
               <th>Tổng tiền</th>
               <th>Xóa</th>
             </tr>
           </thead>
           <tbody className="align-middle">
             {products?.products?.map((item: any) => (
               <tr>
                 <td>
                 {item?.productId?.name}
                 </td>
                 <td className="align-middle">
                   <img src={item?.productId?.img[0]} alt="" style={{ width: 50 }} />{" "}
                 </td>
                 <td className="align-middle">{item?.productId?.price}.000 VND</td>
                 <td className="align-middle">
                   <div
                     className="input-group quantity mx-auto"
                     style={{ width: 100 }}
                   >
                     <div className="input-group-btn">
                       <button className="btn btn-sm btn-primary btn-minus"
                       onClick={() => onHandleDecrease(
                         item?.productId?._id,
                         item?.quantity
                       )}
                       >
                         <i className="fa fa-minus" />
                       </button>
                     </div>
                     <input
                       type="text"
                       min={1}
                       className="form-control form-control-sm bg-secondary border-0 text-center"
                       value={item?.quantity}
                       onChange={(event) =>
                         onHandleChangeQuantity(
                           item?.productId?._id,
                           Number(event.target.value)
                         )
                       }
                     />
                     <div className="input-group-btn">
                       <button className="btn btn-sm btn-primary btn-plus"
                       onClick={() => onHandleIncrease(
                         item?.productId?._id,
                         item?.quantity
                       )}>
                         <i className="fa fa-plus" />
                       </button>
                     </div>
                   </div>
                 </td>
                 <td className="align-middle">{item?.productId?.price * item?.quantity}.000 VND</td>
                 <td className="align-middle">
                   <button className="btn btn-sm btn-danger"
                   onClick={() => onHandleDeteleProductCart(item?.productId?._id)}>
                     <i className="fa fa-times" />
                   </button>
                 </td>
               </tr>
             ))}

           </tbody>
         </table>
       </div>
       <div className="col-lg-4">
         <form className="mb-30" action="">
           <div className="input-group">
             <input
               type="text"
               className="form-control border-0 p-4"
               placeholder="Mã giảm giá"
             />
             <div className="input-group-append">
               <button className="btn btn-primary">Áp dụng</button>
             </div>
           </div>
         </form>
         <h5 className="section-title position-relative text-uppercase mb-3">
           <span className="bg-secondary pr-3">Tóm tắt giỏ hàng</span>
         </h5>
         <div className="bg-light p-30 mb-5">
           <div className="border-bottom pb-2">
             <div className="d-flex justify-content-between mb-3">
               <h6>Tổng tiền</h6>
               <h6>{products?.totalPrice}000 VND</h6>
             </div>
             <div className="d-flex justify-content-between">
               <h6 className="font-weight-medium">Vận chuyển</h6>
               <h6 className="font-weight-medium">{products?.shippingFee}000VND</h6>
             </div>
           </div>
           <div className="pt-2">
             <div className="d-flex justify-content-between mt-2">
               <h5>Tổng thu</h5>
               <h5>{products?.totalOrder}</h5>
             </div>
             <Link to="/checkout">
             <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
               Tiến hành thanh toán
             </button>
             </Link>
           </div>
         </div>
       </div>
     </div>
   </div>
   {/* Cart End */}
 </></>
  );
};

export default CartPage;
