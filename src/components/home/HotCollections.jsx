import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 1000, easing: "ease", throttleDelay: 99 });

// data-aos="fade-up" data-aos-delay="500"

const HotCollections = () => {
  const [posts, setPosts] = useState([]);

  async function getHotCollectionData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setPosts(data);
  }

  useEffect(() => {
    getHotCollectionData();
  }, []);

  const options = {
    margin: 10,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {posts.length ? (
            <OwlCarousel {...options}>
              {posts.map((post, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${post.nftId}`}>
                      <img
                        src={post.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${post.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={post.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{post.title}</h4>
                    </Link>
                    <span>ERC-{post.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={``}>
                        <Skeleton width="100%" height="200px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
