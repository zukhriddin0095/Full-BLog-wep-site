import { Fragment, useEffect, useState } from "react";
import request from "../../../server";
import { message } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";  
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../../components/loading/Loading";

import "./home.scss";
import { ENDPOINT } from "../../../constants";
const HomePage = () => {
  const [data, setData] = useState([]);
  const [popular, setPopular] = useState([])
  const [category, setCategory] = useState([]);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    getPopular();
    getCategry();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      let { data } = await request.get("post/lastone");
      setData(data);
      setTime(data.updatedAt.split("T")[0]);
    } catch (error) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }
  async function getPopular() {
    try {
      setLoading(true);
      let { data } = await request.get("post/lastones");
      setPopular(data);
    } catch (error) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }
  async function getCategry() {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get("/category");
      setCategory(data);
      setLoading(false);
    } catch (err) {
      message.error("serverda hatolik");
    }
  }

  let res = new Date(time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  console.log(popular);

  return (
    <Fragment>
      {" "}
      <section
        className="home"
        style={{
          backgroundImage:
            "url(https://cdn.serif.com/affinity/img/photo/og-photo-080820220738.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="home__wrapper">
              <h4>
                Posted on <span style={{ fontWeight: "900" }}>startup</span>
              </h4>
              <h5>Step-by-step guide to choosing great font pairs</h5>
              <h6>
                By{" "}
                <span>
                  {data?.user?.first_name} {data?.user?.last_name}
                </span>{" "}
                | {res}
              </h6>
              <h6>{data.description}</h6>
              <button
                onClick={() => navigate(`blogs/${data._id}`)}
                className="ReadMOre"
              >
                Read More
              </button>
            </div>
          </div>
        )}
      </section>
      <section>
        <div className="container border">
          <div className="popular-title">
            <h1>Popular blogs</h1>
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              350: {
                width: 370,
                slidesPerView: 1,
              },
              576: {
                width: 576,
                slidesPerView: 2,
              },
              950: {
                width: 576,
                slidesPerView: 3,
              },
              1280: {
                width: 1300,
                slidesPerView: 3,
              },
            }}
          >
            {popular.map((el, i) => {
              return (
                <SwiperSlide key={i} {...el}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div
                      onClick={() => navigate(`blogs/${el._id}`)}
                      className="cards__card"
                    >
                      <div className="cards__card__img">
                        <LazyLoadImage
                          effect="blur"
                          style={{
                            width: "100%",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                          }}
                          src={`${ENDPOINT}upload/${el.photo._id}.${
                            el.photo.name.split(".")[1]
                          }`}
                          alt="assd"
                        />
                      </div>
                      <div className="cards__card__title">
                        <h5>
                          By{" "}
                          <span>
                            {el.user?.first_name} {el.user?.last_name}{" "}
                          </span>
                          | {el.updatedAt.split("T")[0]}
                        </h5>
                        <h3>{el.category?.description}</h3>
                        <p>{el.description}</p>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="category">
            <h1>Choose A Catagory</h1>
          </div>

          <Swiper
            // install Swiper modules
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              350: {
                width: 370,
                slidesPerView: 1,
              },
              576: {
                width: 576,
                slidesPerView: 2,
              },
              950: {
                width: 576,
                slidesPerView: 3,
              },
              1280: {
                width: 1300,
                slidesPerView: 3,
              },
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              category.map((el) => {
                return (
                  <SwiperSlide key={el._id}>
                    <div
                      onClick={() => navigate(`category/${el._id}`)}
                      className="card"
                    >
                      <LazyLoadImage
                        style={{ width: "48px", height: "48px", borderRadius: "10px" }}
                        effect="blur"
                        src={`${ENDPOINT}upload/${el.photo._id}.${
                          el.photo.name.split(".")[1]
                        }`}
                        alt=""
                      />
                      <h5>{el.name}</h5>
                      <p>{el.description}</p>
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
