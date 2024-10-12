import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const getArticleBySlug = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Assuming `data.data[0]` is the article you're looking for
      setArticle(data.data[0] || null);
    } catch (error) {
      console.error("Error fetching article:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getArticleBySlug();
  }, [slug]); // Re-fetch if the slug changes
  if (error) {
    return (
      <div className="text-red-500 text-center mt-8 text-xl">
        Error: {error}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center text-gray-600 text-xl">
        Loading article...
      </div>
    );
  }
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
        <p className="text-gray-700 my-4">{article.description}</p>
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
      </div>
    </div>
  );
};

export default BlogPost;
