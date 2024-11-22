import React, { useCallback, useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [authorData, setAuthorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followButtonText, setFollowButtonText] = useState("Follow");
  const id = useParams().id;

  async function getAuthorData() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorData(data);
    setTotalFollowers(data.followers);
    setIsLoading(false);
  }

  function followButton() {
    if (isFollowing === false) {
      setIsFollowing(true);
      setFollowButtonText("Unfollow");
      setTotalFollowers(totalFollowers + 1);
    } else {
      setIsFollowing(false);
      setFollowButtonText("Follow");
      setTotalFollowers(totalFollowers - 1);
    }
  }

  useEffect(() => {
    getAuthorData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {isLoading === false ? (
          <>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${AuthorBanner}) top` }}
            ></section>
          </>
        ) : (
          <>
            <section>
              <Skeleton width="100%" height="400px" />
            </section>
          </>
        )}

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {totalFollowers} followers
                      </div>
                      <Link
                        to={"#"}
                        onClick={followButton}
                        className="btn-main"
                      >
                        {followButtonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
