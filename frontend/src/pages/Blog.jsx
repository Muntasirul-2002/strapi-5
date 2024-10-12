import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const getArticles = async () => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/articles?populate=*"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data.data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-8 text-xl">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blogs</h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Loading articles...</p>
      ) : (
        <ul className="space-y-8">
          {articles.map((article) => {
            // Extract image URL from article's cover if it exists
            const coverImageUrl = article?.url
              ? `http://localhost:1337/uploads/${article.url}`
              : null;

            return (
              <li key={article.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Slug:{" "}
                  <span className="font-medium text-blue-700 underline">
                    <Link to={`/blog/${article.slug}`}>
                      {article.slug}
                    </Link>
                  </span>
                </p>
                <p className="text-gray-700 mb-4">{article.description}</p>

                {/* Display the image if it exists */}
                {coverImageUrl && (
                  <img
                    src={coverImageUrl}
                    alt= "Article image"
                    className="w-full h-auto rounded-md mb-4"
                  />
                )}

                <div className="flex flex-wrap text-sm text-gray-600">
                  <p className="mr-4 mb-2">
                    Created:{" "}
                    <span className="font-medium">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="mr-4 mb-2">
                    Published:{" "}
                    <span className="font-medium">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="mb-2">
                    Author: <span className="font-medium">{article.Email}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Blog;
