import { useDispatch } from "react-redux";
import { AppDispatch,  } from "../store";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { getOne } from "../api/user";
import { getOneBill } from "../api/bill";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const id = user?._id
  console.log(id);
  
  
  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOneBill(_id);
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      await getOne().then(({ data }) => setUser(data.user));
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {/* Cart view section */}
      <section id="checkout">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="checkout-area">
                <form action="">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="checkout-left">
                        <div className="panel-group" id="accordion">
                          {/* Coupon section */}
                          <div className="panel panel-default aa-checkout-coupon">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a
                                  data-toggle="collapse"
                                  data-parent="#accordion"
                                  href="#collapseOne"
                                >
                                  <Link to={`/bills/user/${id}`}>Lịch sử mua hàng</Link>
                                </a>
                              </h4>
                            </div>
                          </div>
                          {/* Login section */}
                          {/* Billing Details */}
                          {/* Shipping Address */}
                          <div className="panel panel-default aa-checkout-billaddress">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                              <Link to={`/bills/updatePassword/${id}`}>Thay đổi mật khẩu</Link>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* / Cart view section */}
    </>
  );
};

export default ProfilePage;
