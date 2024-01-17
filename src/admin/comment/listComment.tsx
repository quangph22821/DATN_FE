import { Button, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../store";
import { IUser } from "../../models/user";
import { fetchUsersAll, fetchUsersRemove } from "../../redux/user.reducer";
import { IProducts } from "../../models/products";
import { CommentAll, CommentDelete } from "../../redux/comment.reducer";

interface CategoryData extends Comment {
  recordKey: string;
}

interface DataType {
  key: string;
  useId: IUser;
  comment: string;
  productId: IProducts;
}

const ListCommentPage = () => {
  const { Comment } = useSelector((state: RootState) => state.Comment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CommentAll());
  }, []);
  const datass: Comment[] = Comment;
  const confirmDelete = async (CommentId: string) => {
    try {
      await dispatch(CommentDelete(CommentId));
      await dispatch(CommentAll());
      message.success("Xóa bình luận thành công");
    } catch (error) {
      if (!error) {
        setTimeout(message.loading("đang sử lí .."), 2000);
      } else {
        message.error(`Lỗi khi xóa người dùng này: ${error}`);
      }
    }
  };

  const cancelDelete = () => {
    message.error("Bạn đã hủy thao tác xóa");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "useId",
      width: "30%",
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      width: "30%"
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc chắn là muốn xóa người dùng này?"
            onConfirm={() => confirmDelete(record.key)}
            onCancel={cancelDelete}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  const data: DataType[] = datass?.map((item) => ({
    key: item._id,
    useId: item?.userId?.name,
    comment: item?.comment?.comment,
    productId: item?.productId?.name
  }));

  const categoryData: CategoryData[] = datass?.map((category) => ({
    ...category,
    recordKey: category._id,
  }));
  console.log(categoryData);

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

export default ListCommentPage;
