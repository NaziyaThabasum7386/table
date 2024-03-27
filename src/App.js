import React, { useState, useEffect } from "react";

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
    <div>
      <table>
        <thead>
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
      <div>
        {/* Pagination controls */}
        <div>
          {/* Pagination controls */}
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button>{currentPage}</button>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={endIndex === data.length}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContriesData = async () => {
      try {
        const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (!res.ok) {
          throw Error('could not fetch the data')
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        // Display alert message without throwing the error
        setError("failed to fetch data")
      }
      
    };

    getContriesData();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <h1>Employee Data Table</h1>
      <TableWithPagination data={data} itemsPerPage={10} />
      
    </div>
  );
}

export default App;
