import { Link, Outlet, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Space, Avatar, message } from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  ProjectOutlined,
  UserOutlined,
  BorderlessTableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";

const { Header, Content, Sider } = Layout;

const accessToken = localStorage.getItem("accessToken");

const onLogout = async () => {
  console.log(accessToken);

  try {
    await localStorage.clear();
    message.success({
      content: "Bạn đã đăng xuất xuất thành công",
    });
    const navigate = useNavigate();
    navigate("/signin");
  } catch (error) {
    console.log(error);
  }
};
const items2: MenuProps["items"] = [
  {
    key: "sub1",
    icon: <HomeOutlined />,
    label: <Link to={"/admin"}>Trang Chủ</Link>,
  },
  {
    key: "sub2",
    icon: <ProjectOutlined />,
    label: <Link to={"/admin/listPro"}>Quản lý sản phẩm</Link>,
  },
  {
    key: "sub3",
    icon: <UnorderedListOutlined />,
    label: <Link to={"/admin/listCate"}>Quản lý danh mục</Link>,
  },
  {
    key: "sub4",
    icon: <UnorderedListOutlined />,
    label: <Link to={"/admin/listComment"}>Quản lý bình luận</Link>,
  },
  {
    key: "sub5",
    icon: <UserOutlined />,
    label: <Link to={"/admin/listUser"}>Quản lý người dùng</Link>,
  },
  {
    key: "sub6",
    icon: <BorderlessTableOutlined />,
    label: <Link to={"/admin/listMate"}>Quản lý xuất xứ</Link>,
  },
  {
    key: "sub7",
    icon: <AppstoreOutlined />,
    label: <Link to={"/admin/listOri"}>Quản lý chất liệu</Link>,
  },
  {
    key: "sub8",
    icon: <ShoppingCartOutlined />,
    label: <Link to={"/admin/listBill"}>Quản lý đơn hàng</Link>,
  },
];

const HeaderAdmin = () => {
  const { handleSubmit } = useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#d9d9d9", // Màu nền Header
          height: "40px",
          padding: "0 20px", // Khoảng cách giữa nội dung và mép của Header
        }}
      >
        <Space style={{ marginLeft: "auto" }} direction="vertical" size={16}>
          <Space wrap size={16}>
            {/* <Avatar size={64} icon={<UserOutlined />} /> */}
            {/* <Avatar size="large" icon={<UserOutlined />} /> */}
            {/* <Avatar icon={<UserOutlined />} /> */}
            <Avatar size="small" icon={<UserOutlined />} />
            <span>Admin</span>
            <button
              onClick={handleSubmit(onLogout)}
              style={{ border: "none", background: "#d9d9d9" }}
            >
              Đăng xuất
            </button>
          </Space>
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <main>
              <Outlet />
            </main>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HeaderAdmin;
