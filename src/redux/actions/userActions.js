import request from "../../server";
import { USER_MODAL, USER_STATE_CHANGE } from "../types/user";




const updateState = (data) => ({ type: USER_STATE_CHANGE, payload: data });

export const getUsers = (page = 1) => {
  return async (dispatch) => {
    try {
      dispatch(updateState({ loading: true }));
      let {
        data: { data, pagination },
      } = await request.get(`user?page=${page}`);
      data = data.map((el) => {
        el.key = el._id;
        return el;
      });
      dispatch(updateState({ users: data, total: pagination.total }));
    } catch (err) {
      dispatch(updateState({ error: err }));
    } finally {
      dispatch(updateState({ loading: false }));
    }
  };
};

export const changeActivePage = (page) => {
  return (dispatch) => {
    dispatch(updateState({ activePage: page }));
    dispatch(getUsers(page));
  };
};

export const controlModal = () => {
  return {
    type: USER_MODAL,
  };
};

export const openModal = (form) => {
  return (dispatch) => {
    dispatch(controlModal());
    dispatch(updateState({ selected: null }));
    form.resetFields();
  };
};

export const addUser = (form, selected, photoId) => {
  return async (dispatch) => {
    try {
      dispatch(updateState({ btnLoading: true }));
      let values = await form.validateFields();
      values.photo = photoId;
      if (selected === null) {
        await request.post("user", values);
      } else {
        await request.put(`user/${selected}`, values);
      }
      dispatch(controlModal());
      dispatch(getUsers());
    } catch (err) {
      dispatch(updateState({ error: err }));
    } finally {
      dispatch(updateState({ btnLoading: false }));
    }
  };
};

export const editUser = (id, form) => {
  return async (dispatch) => {
    try {
      dispatch(controlModal());
      dispatch(updateState({ selected: id }));
      let { data } = await request.get(`user/${id}`);
      form.setFieldsValue(data.data);
    } catch (err) {
      dispatch(updateState({ error: err }));
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await request.delete(`user/${id}`);
      dispatch(getUsers());
    } catch (err) {
      dispatch(updateState({ error: err }));
    }
  };
};
