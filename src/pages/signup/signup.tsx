import { useForm } from "react-hook-form";
import { signup } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Image, message } from "antd";
import { WarapperContainerLeft, WarapperContainerRight, WrapperTextLight } from "./style";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSignup = async (values: any) => {
    console.log(values);
    try {
      const response = await signup(values);
      console.log({ response });
      message.success(`Đăng kí thành công ${response.data.user.name} !`)
      navigate('/signin');

    } catch (error: any) {
      console.log(error);
      message.warning(`${error?.response?.data.message}`)
    }

  }
