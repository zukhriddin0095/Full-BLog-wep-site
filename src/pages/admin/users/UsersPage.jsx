


import {
  Button,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
  Form,
} from "antd";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { ENDPOINT } from "../../../constants";
import { addUser, changeActivePage, controlModal, deleteUser, editUser, getUsers, openModal } from "../../../redux/actions/userActions";
import { Fragment, useEffect, useState } from "react";
import request from "../../../server";
import { useDispatch, useSelector } from "react-redux";

import "./users.scss"
const UsersPage = () => {
  const dispatch = useDispatch();
  const {
    users,
    total,
    loading,
    activePage,
    selected,
    isModalOpen,
    btnLoading,
  } = useSelector((state) => state.user);
  const [photo, setPhoto] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    total || dispatch(getUsers());
  }, [dispatch, total]);

  const columns = [
    {
      title: "Firstname",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Lastname",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => {
        return (
          <Image
            height={50}
            src={
              photo
                ? `${ENDPOINT}upload/${photo}.jpg`
                : "https://media.licdn.com/dms/image/D4D03AQFBAVQkocH-jw/profile-displayphoto-shrink_800_800/0/1685788590708?e=2147483647&v=beta&t=KuR11h3YpSKu5RRrfN4rJevspHBEgDm0LucQcc36v3o"
            }
          />
        );
      },
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => dispatch(editUser(row._id, form))}
            >
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={() => confirmDeleteUser(row._id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  function confirmDeleteUser(id) {
    Modal.confirm({
      title: "Do you want to delete this user ?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => dispatch(deleteUser(id)),
      okText: "Yes",
      cancelText: "No",
    });
  }

  const uploadImage = async (e) => {
    try {
      let form = new FormData();
      form.append("file", e.file.originFileObj);
      let { data } = await request.post("upload", form);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>User ({total})</h1>
            <Button type="primary" onClick={() => dispatch(openModal(form))}>
              Add
            </Button>
          </div>
        )}
        pagination={false}
        columns={columns}
        dataSource={users}
      />
      <Pagination
        current={activePage}
        total={total}
        onChange={(page) => dispatch(changeActivePage(page))}
      />
      <Modal
        title="User data"
        open={isModalOpen}
        onOk={() => {
          dispatch(addUser(form, selected, photo._id));
          setPhoto(null);
        }}
        confirmLoading={btnLoading}
        onCancel={() => dispatch(controlModal())}
        okText={selected === null ? "Add user" : "Save user"}
      >
        <Form
          form={form}
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Upload
            onChange={uploadImage}
            listType="picture"
            maxCount={1}
            fileList={
              photo
                ? [
                    {
                      thumbUrl: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                      name: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                      url: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                    },
                  ]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>Upload photo (Max: 1)</Button>
          </Upload>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;