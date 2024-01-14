import { Image, message } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPass } from "../../api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const onsignin = async (value: any) => {
    try {
      console.log(value);
      const reponse = await ForgotPass(value);
      localStorage.setItem("accessToken", reponse?.data?.accessToken);
      localStorage.setItem("accessRole", reponse?.data?.user?.role);
      localStorage.setItem("user", JSON.stringify(reponse?.data?.user));
      console.log("A", reponse);
      message.success(
        "Chúng tôi đã gửi lại mật khẩu mới cho bạn. Vui lòng kiểm tra email!"
      );
      navigate("/signin")

    } catch (error: any) {
      console.log(error);
      message.error(`${error.response.data.message}`)


    }
  }



  return (
    <>
      <form onSubmit={handleSubmit(onsignin)}>

        <div className="form-group ">
          <label >Email của bạn </label>
          <input type="email" className="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
            {...register("email")}
          />

        </div>



        <button
          type="submit" className="btn btn-warning rounded "
        
        // style={{
        //   backgroundColor: "#0e7ccf",
        //   border: "none",
        //   borderRadius: "5px",
        // }}
        >
          Lấy lại mật khẩu
        </button>
        
        {/* <Link to="forgotpassword">Quên mật khẩu</Link> */}
      </form>
    </>
  )
}

export default ForgotPassword


