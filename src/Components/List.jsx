import React, { useEffect, useState, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./List.css";
import love from "../Asset/love.png";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { searchQuery } from "../Context/searchContext";

function List() {
  // Context
  const { searchData, setSearchData } = useContext(searchQuery);

  // State variables
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State to check loading status
  const [error, setError] = useState(null); // State to check error
  const [sortBy, setSortBy] = useState(null); // State to track sorting option
  const [showFullText, setShowFullText] = useState({}); // State to track whether to show full text

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Handle sorting of posts
  const handleSort = (option) => {
    setSortBy(option);
    let sortedPosts = [...posts];
    if (option === "mostLoved") {
      sortedPosts.sort((a, b) => b.reactions - a.reactions);
    } else if (option === "leastLoved") {
      sortedPosts.sort((a, b) => a.reactions - b.reactions);
    } else if (option === "default") {
      fetchData();
    }
    setPosts(sortedPosts);
  };

  // Handle "Read more" functionality
  const handleReadMore = (postId) => {
    setShowFullText((prevState) => ({
      [postId]: !prevState[postId],
    }));
  };

  // Filter posts based on search query
  const filteredPosts = searchData
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchData.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchData.toLowerCase())
          )
      )
    : posts;

  // Generate random RGB color
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Render loading message
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center">
        Loading...
      </div>
    );

  // Render error message if there's an error
  if (error) return <div>Error: {error.message}</div>;

  // Render the list of posts
  return (
    <div>
      <div className="main container border shadow rounded p-4 mt-3 mb-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-dark">Discover Compelling Stories!</h2>
          {/* Dropdown for sorting */}
          <Dropdown>
            <Dropdown.Toggle className="button" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("mostLoved")}>
                Most Loved
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("leastLoved")}>
                Least Loved
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("default")}>
                Default
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* List items */}
        <div>
          <Row>
            {/* Populate list */}
            {filteredPosts.map((post) => (
              <Col key={post.id} md={6} lg={6} sm={12}>
                <div className="card border bg-light rounded shadow mt-3 mb-2">
                  {/* Random color bar */}
                  <div
                    className="w-full shadow"
                    style={{
                      height: "5px",
                      backgroundColor: getRandomColor(),
                    }}
                  ></div>
                  <div className="p-2">
                    <h5 className="text-info">{post.title.slice(0, 62)}</h5>
                    <hr />
                    <p className="fontstyle">
                      {showFullText[post.id]
                        ? post.body
                        : post.body.slice(0, 200)}
                      {!showFullText[post.id] && (
                        <span
                          className="text-primary"
                          onClick={() => handleReadMore(post.id)}
                        >
                          {" "}
                          Read more...
                        </span>
                      )}
                      {showFullText[post.id] && (
                        <span
                          className="text-primary"
                          onClick={() => handleReadMore(post.id)}
                        >
                          Read less...
                        </span>
                      )}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text-primary">
                        {post.tags.map((tag) => `#${tag} `)}
                      </p>
                      <div className="position-relative">
                        <img
                          style={{ width: "60px" }}
                          className="img-fluid"
                          src={love}
                          alt="Love icon"
                        />
                        <p className="position-absolute top-50 start-50 translate-middle">
                          {post.reactions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default List;
