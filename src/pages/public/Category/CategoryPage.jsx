import { message } from "antd";
import "./category.scss";
import { Fragment, useEffect, useState } from "react";
import request from "../../../server";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../../components/loading/Loading";
import { ENDPOINT } from "../../../constants";
const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const idCategory = useParams();
  const [loading, setLoading] = useState(false);
  console.log(idCategory);
  async function getData() {
    try {
      setLoading(true);
      const { data } = await request.get(`category/${idCategory?.idCategory}`);
      setData_1(data);
      setLoading(false);
    } catch (err) {
      message.error("serverda hatolik");
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await request.get(
        `post?page=${currentPage}&limit=10&category=${idCategory.idCategory}`
      );
      setTotalPage(data.pagination.total);
      setData(data.data);
      setLoading(false);
    } catch (err) {
      message.error("serverda hatolik");
    }
  }

  const maxPage = Math.ceil(totalPost / 10);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      fetchData();
    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData();
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
      fetchData();
    }
  };

  async function handleSearch(e) {
    try {
      setLoading(true);
      const { data } = await request.get(
        `post?page=${currentPage}&limit=10&search=${e.target.value}&category=${idCategory.idCategory}`
      );
      setData(data.data);
      setTotalPage(data.pagination.total);
      getData();
    } catch (err) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(currentPage);
    fetchData(currentPage);
  }, [currentPage]);
  return (
    <Fragment>
      <section className="category">
        <div className="category__title">
          <h1>{data_1.name}</h1>
          <p>{data_1.description}</p>
          <h3>BLOG || {data_1.name}</h3>
        </div>

        <div className="container">
          <div className="category__Search">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search . . ."
            />
          </div>
          <div className="cards1">
            {loading ? (
              <Loading />
            ) : (
              data.map((el) => {
                return (
                  <div key={el._id} className="card1">
                    <div className="card1__img">
                      <LazyLoadImage
                      className="img"
                        effect="blur"
                        src={`${ENDPOINT}upload/${el.photo._id}.${
                          el.photo.name.split(".")[1]
                        }`}
                        alt={`${el.name}`}
                      />
                    </div>
                    <div className="card1__title">
                      <h5>{el.category.name}</h5>
                      <h3>Top 6 free website mockup tools 2022</h3>
                      <p>{el.description}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {data.length ? (
            <div className="pagination-buttons">
              <button
                className={
                  currentPage === 1
                    ? "disabled pagination-button"
                    : "pagination-button"
                }
                onClick={prevPageFunc}
              >
                {"< Prev"}
              </button>
              {Array.from({ length: maxPage }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "pagination-button active-page"
                      : "pagination-button"
                  }
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={
                  currentPage === maxPage
                    ? "disabled pagination-button"
                    : "pagination-button"
                }
                onClick={nextPageFunc}
              >
                {"> Next"}
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </Fragment>
  );
};

export default CategoryPage;
