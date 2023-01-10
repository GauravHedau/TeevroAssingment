import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { Table } from "react-bootstrap";
import "./fileUpload.css";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [data, setData] = useState([]);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedFile && !data.length) {
      const reader = new FileReader();
      reader.onload = (e) => {
        /* parse the data and set it in the state */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setData(data);
      };
      reader.readAsBinaryString(selectedFile);
    }
  };
  const handleDownload = () => {
    if (data) {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate an excel file and prompt the user to save */
      XLSX.writeFile(wb, "sheetjs.xlsx", { bookSST: true, type: "binary" });
    }
  };

  return (
    <>
      <div className="file-upload">
        <form className="file-upload__form">
          <input
            type="file"
            className="file-upload__input"
            onChange={handleFileInput}
          />
          <button className="file-upload__button" type="submit">
            Upload
          </button>
        </form>
        <Table striped bordered hover>
          <thead>
            <tr>
              {data &&
                data[0] &&
                data[0].map((heading, index) => <th key={index}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.slice(1).map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
        <button
          className="file-upload__download-button"
          onClick={handleDownload}
          disabled={!data.length}
        >
          Download
        </button>
      </div>{" "}
    </>
  );
}
export default FileUpload;
