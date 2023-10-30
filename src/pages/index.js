import React, { useState, useEffect } from "react";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: "#663399",
};
const paragraphStyles = {
  marginBottom: 48,
};
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
};

const IndexPage = () => {
  const [responseData, setResponseData] = useState(null);

  // Define the URL for the API endpoint
  const url =
    "https://p6xdojl6k6.execute-api.eu-west-2.amazonaws.com/default/gatsby-site-function?TableName=gatsby-site-table";

  useEffect(() => {
    // Make an HTTP GET request to the URL
    fetch(url)
      .then((response) => {
        // Check if the response status is OK (HTTP 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response as JSON and set it in the state
        return response.json();
      })
      .then((data) => {
        // Set the JSON response in the state
        setResponseData(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once

  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Congratulations George
        <br />
        <span style={headingAccentStyles}>
          — you just made a Gatsby site! 🎉🎉🎉
        </span>
      </h1>
      <p style={paragraphStyles}>
        Edit <code style={codeStyles}>src/pages/index.js</code> to see this page
        update in real-time. 😎
      </p>
      <p>Fetched DynamoDB data:</p>
      <br />
      {responseData && responseData.Items ? (
        responseData.Items.map((user, index) => (
          <>
            <div key={index}>
              <p>User ID: {user.UserID}</p>
              <p>Name: {user.Name}</p>
              <p>Email: {user.Email}</p>
              <p>Devopsws: {user.devopsws}</p>
            </div>
            <br />
          </>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </main>
  );
};

export default IndexPage;
