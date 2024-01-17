import { Button, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { IBill } from "../../models/bill";
import { IUser } from "../../models/user";
import { fetchBillAll } from "../../redux/bill.reducer";

interface BillData extends IBill {
  recordKey: string;
}

interface DataType {
  key: string;
  name: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  userId: IUser;
  cartId: any;
  phone: number;
  totalPrice: number;
  status: any;
}

const ListBillPage = () => {
  const { bill } = useSelector((state: RootState) => state.bills);
  const dispatch = useDispatch<AppDispatch>();
  console.log(bill);
  
  useEffect(() => {
    dispatch(fetchBillAll());
  }, []);
  const datass: IBill[] = bill

  // LỌC THEO TRẠN THÁI ĐƠN HÀNG
  const uniqueStatus = Array.from(
    new Set(datass?.map((bill: any) => bill.status))
  );
  const statusFilters = uniqueStatus.map((status) => ({ text: status, value: status }));

  // LỌC THEO TÊN KHÁCH HÀNG
  // LỌC THEO PHƯƠNG THỨC THANH TOÁN
  const uniquePayment = Array.from(
    new Set(datass?.map((bill: any) => bill.paymentMethod))
  );
  const payMentFilters = uniquePayment.map((payment) => ({ text: payment, value: payment }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên khách hàng",
      dataIndex: "userId",
      width: "30%",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      width: "30%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "30%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "shippingAddress",
      width: "30%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      width: "30%",
    },
    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      width: "30%",
      filters: payMentFilters,
      onFilter: (value, record) => record.paymentMethod.indexOf(value.toString()) === 0,
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "30%",
      filters: statusFilters,
      onFilter: (value, record) => record.status.indexOf(value.toString()) === 0,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/updateBill/${record.key}`}>
            <Button danger className="btn-edit text-[#30D200] border-[#31d200cb] hover:text-[#31d200ba] hover:border-[#30D200] active:border-[#30D200]">
              Edit
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const data: DataType[] = datass?.map((bill) => ({
    key: bill._id,
    name: bill.name,
    shippingAddress: bill.shippingAddress,
    paymentMethod: bill.paymentMethod,
    paymentStatus: bill.paymentStatus,
    userId: bill?.userId?.name,
    cartId: bill.cartId,
    phone: bill.phone,
    totalPrice: bill.totalPrice,
    status: bill.status
  }));

  const billData: BillData[] = datass?.map((bill) => ({
    ...bill,
    recordKey: bill._id,
  }));
  console.log(billData);

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table parameters:", pagination, filters, sorter, extra);
  };

  return (
    <div id="adminhome">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4 }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ListBillPage;
