import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css";

function TableWithPagination({ data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        {/* Pagination controls */}
        <div className="text-center">
  {/* Pagination controls */}
  <button
    className="btn btn-primary mx-3"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <button className="btn btn-primary mx-3">{currentPage}</button>
  <button
    className="btn btn-primary mx-3"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={endIndex === data.length}
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
  const [answer, setAnswer] = useState(""); // State for storing the answer

  useEffect(() => {
    const getContriesData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!res.ok) {
          //throw new Error("Failed to fetch data"); // Throw error on failed fetch
          enqueueSnackbar("failed to fetch data", { variant: "error" }); // Display error message
          setAnswer("failed to fetch data"); // Set answer to "Failed to fetch data"
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        enqueueSnackbar("failed to fetch data", { variant: "error" }); // Display error message
        setAnswer("failed to fetch data"); // Set answer to "Failed to fetch data"
      }
    };

    getContriesData();
  }, [enqueueSnackbar]); // Add enqueueSnackbar to the dependency array

  return (
    <div className="container">
      <h1 className="table-heading">Employee Data Table</h1>
      <TableWithPagination data={data} itemsPerPage={10} />
      {answer && <div>{answer}</div>} {/* Render answer if it's not empty */}
    </div>
  );
}


export default App;

