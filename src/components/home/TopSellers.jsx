import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 1000, easing: "ease", throttleDelay: 99 });

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  async function getTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );

    setTopSellers(data);
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up" data-aos-delay="500">
            {topSellers.length ? (
              <ol className="author_list">
                {topSellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <span>
                        <Skeleton width="40px" height="20px" />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

{
  /* {new Array(12).fill(0).map((_, index) => (
  <li key={index}>
    <div className="author_list_pp">
      <Link to="/author">
        <img
          className="lazy pp-author"
          src={AuthorImage}
          alt=""
        />
        <i className="fa fa-check"></i>
      </Link>
    </div>
    <div className="author_list_info">
      <Link to="/author">Monica Lucas</Link>
      <span>2.1 ETH</span>
    </div>
  </li>
))} */
}
