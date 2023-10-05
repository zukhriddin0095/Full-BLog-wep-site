import { Fragment, useEffect, useState } from "react";
import { ENDPOINT } from "../../../constants";
import request from "../../../server";
import {
  Button,
  Input,
  Modal,
  Space,
  Table,
  Upload,
  message,
  Form,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./myblog.scss";
const MyBlogs = () => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchText, setsearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState();
  const [categ, setCateg] = useState()

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
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


  async function getCategory() {
    try {
      const res = await request.get("/category");
      setCategory(res.data.data);
    } catch (err) {
      message.error("serverda hatolik");
    }
  }
  useEffect(() => {
    getData();
    getCategory();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get(`post/user`);
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

  async function postData(values) {
    try {
      setLoading(true);
      const postData = { ...values, photo: photo };
      await request.post("post", postData);
      getData();
      form.resetFields();
      setIsModalOpen(false);
      handleCancel();
    } catch (error) {
      message.error(error);
    }
  }

  async function putData(id, values) {
    try {
      setLoading(true);
      const postData = { ...values, photo: photo };
      await request.put(`post/${id}`, postData);
      getData();
      form.resetFields();
      setIsModalOpen(false);
      handleCancel();
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
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

  const handleOk = async () => {
    try {
      if (photo) {
        let values = await form.validateFields();
        if (selected === null) {
          await postData(values);
        } else {
          await putData(selected, values);
        }
      } else {
        message.error("Rasmni yuklang");
      }
    } catch (err) {
      console.log(err);
      message.error(err.response.data.message);
    }
  };


  console.log(categ);

  function handleInput(e) {
    setCateg({ [e.target.id]: e.target.value });
  }
  // const handleOk = async () => {
  //   try {
  //     if (photo) {
  //       setLoading(true);
  //       let values = await form.validateFields();
  //       let postData = { ...values, photo: photo };
  //       console.log(values);
  //       if (selected === null) {
  //         await request.post("post", postData);
  //       } else {
  //         await request.put(`post/${selected}`, postData);
  //       }
  //       getData();
  //       form.resetFields();
  //       setIsModalOpen(false);
  //       handleCancel()
  //     } else {
  //       message.error("Upload photo");
  //     }
  //   } catch (err) {
  //     message.error(err)
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // modal

  // const uploadImage = async (e) => {
  //   try {
  //     // console.log(e.target.files[0]);
  //     let form = new FormData();
  //     form.append("file", e.file.originFileObj);
  //     console.log(form);
  //     let { data } = await request.post("upload", form);
  //     setPhoto(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // edit
  async function editData(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      let { data } = await request.put(`post/${id}`);
      form.setFieldsValue(data);
      console.log(data);
    } catch (error) {
      message.error(error);
    }
  }

  async function deleteData(id) {
    const conDelete = confirm("haqiqatdan o'chirishni hohlesizmi?");
    if (conDelete) {
      await request.delete(`post/${id}`);
      getData();
    }
  }

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper">
          <h1>All Categories: {data.length} </h1>
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
              label="title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please Fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <select
              name="category"
              id="category"
              onClick={(e) => handleInput(e)}
            >
              {category.map((el) => {
                return (
                  <option id={el.name} key={el._id} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
            </select>
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
};

export default MyBlogs;
