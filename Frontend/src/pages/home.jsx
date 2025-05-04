import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../utils/constant";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const [params] = useSearchParams();
  const cat_id = params.get("cat_id");

  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  const [allCats, setAllCats] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("");

  useEffect(() => {
    let catUrl = `${api_url}/blog/blog-category`;
    axios
      .get(catUrl, {
        headers: {
          Authorization: `jwt ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setAllCats(res?.data?.categories || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setActiveCat(cat_id);
  }, [cat_id]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      let blogUrl = `${api_url}/blog?`;
      let searchParams = new URLSearchParams()
      search && searchParams.append("search", search)
      activeCat && searchParams.append("category", activeCat)

      blogUrl = blogUrl + searchParams

      axios
        .get(blogUrl, {
          headers: {
            Authorization: `jwt ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          setAllBlogs(res?.data?.blogs || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [search, activeCat]);

  return (
    <div className="container">
      <p className="fw-bold text-center fs-1 mt-5">
        Welcome to BlogHub
      </p>

      <div className="row">
        <div className="col-12">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Your Blog"
            className="form-control mt-2 mb-5"
          />
        </div>

        <div className="col-md-8">
          {allBlogs?.map((blog) => {
            return (
              <div className="shadow mb-3 text-center p-2 rounded-2">
                <p className="fs-3 fw-semibold">{blog.title}</p>
                <p>This is blog contenr</p>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <p className="text-center fs-2 text-warning">Blog Category</p>

          <div className="d-flex gap-2 flex-wrap">
            {allCats.map((cat) => (
              <p
                onClick={() => {
                  setActiveCat(cat._id === activeCat ? "" : cat._id);
                  navigate(
                    "/home?cat_id=" + (cat._id === activeCat ? "" : cat._id)
                  );
                }}
                className={`p-2 rounded-2 shadow ${
                  activeCat === cat._id ? "text-white bg-dark" : "text-dark"
                }`}
              >
                {cat.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
