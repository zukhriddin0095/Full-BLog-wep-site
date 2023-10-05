import { Button, Form, Input, Modal, Space, Table, Upload, message } from "antd";
import request from "../../../server";
import { Fragment, useEffect, useState } from "react";
import { ENDPOINT } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";


import "./categories.scss"
const CategoriesPage = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);
  const [searchText, setsearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => {
        return (
          <LazyLoadImage
            effect="blur"
            style={{ borderRadius: "10px" }}
            height={50}
            src={`${ENDPOINT}/upload/${data?._id}.${data.name.split(".")[1]}`}
            alt={data.name}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <button
            onClick={() => editData(record._id)}
            className="button__control"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => deleteData(record._id)}
            className="button__control"
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];

  // fetData

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get(`category?page=1&limit=10`);
      setData(data);
    } catch (err) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  // fetData
  // modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setSelected(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      if (photo) {
        setLoading(true);
        let values = await form.validateFields();
        let categoryData = { ...values, photo: photo._id };
        if (selected === null) {
          await request.post("category", categoryData);
        } else {
          await request.put(`category/${selected}`, categoryData);
        }
        getData();
        form.resetFields();
        setIsModalOpen(false);
      } else {
        message.error("Upload photo");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // modal

  const uploadImage = async (e) => {
    try {
      // console.log(e.target.files[0]);
      let form = new FormData();
      form.append("file", e.file.originFileObj);
      console.log(form);
      let { data } = await request.post("upload", form);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };
  // edit
  async function editData(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.put(`category/${id}`);
    form.setFieldsValue(data);
    console.log(data);
  }

  async function deleteData(id) {
    const conDelete = confirm("haqiqatdan o'chirishni hohlesizmi?");

    if (conDelete) {
      await request.delete(`category/${id}`);
      getData();
    }
  }
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper">
          <h1>All Categories </h1>
        </div>
        <div className="ant-layout-content">
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
                <input
                  placeholder="searching ...."
                  style={{
                    paddingLeft: "10px",
                    width: "50%",
                    height: "40px",
                    borderRadius: "15px",
                    border: "1px solid #888",
                    outline: "none",
                  }}
                  type="text"
                  onChange={(e) => setsearchText(e.target.value)}
                />
                <button
                  onClick={showModal}
                  className="addButton"
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add Teacher
                </button>
              </div>
            )}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
          ;
        </div>

        <Modal
          loading={loading}
          title="Add Teacher"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={selected === null ? "Add Teacher" : "Save Teacher"}
        >
          <Form
            form={form}
            name="modal"
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
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please Fill!",
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
            {/* <input type="file" onChange={uploadImage} /> */}
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
}

export default CategoriesPage