import { Link, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  ProjectOutlined,
  UserOutlined,
  BorderlessTableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

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
    icon: <UserOutlined />,
    label: <Link to={"/admin/listUser"}>Quản lý người dùng</Link>,
  },
  {
    key: "sub5",
    icon: <BorderlessTableOutlined />,
    label: <Link to={"/admin/listMate"}>Quản lý xuất xứ</Link>,
  },
  {
    key: "sub6",
    icon: <AppstoreOutlined />,
    label: <Link to={"/admin/listOri"}>Quản lý chất liệu</Link>,
  },
  {
    key: "sub7",
    icon: <ShoppingCartOutlined />,
    label: <Link to={"/admin/listCate"}>Quản lý đơn hàng</Link>,
  },
];

const HeaderAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
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
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
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
