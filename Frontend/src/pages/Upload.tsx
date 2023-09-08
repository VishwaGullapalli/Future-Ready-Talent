import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import Axios

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);

      fileReader.onload = (event) => {
        const data = event.target?.result as string;
        const workbook = XLSX.read(data, { type: 'binary' });

        workbook.SheetNames.forEach((sheet) => {
          const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          // Output the JSON data to the console
          console.log(rowObject);

          // Send the data to the server using Axios
          axios.post('http://localhost:5000/api/store', rowObject)
            .then((response) => {
              console.log('Data sent to the server:', response.data);
              // Handle the response from the server as needed
            })
            .catch((error) => {
              console.error('Error sending data to the server:', error);
              // Handle errors if any
            });
        });
      };
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-7xl text-primary-600 dark:text-primary-500">Flashgen</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white">Flash tool to create flashcards</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Upload your questions in excel format here. We automate the options and flashcards generation for you.</p>
          <div className="col-md-3">
            <input className="form-control" type="file" id="input" accept=".xls,.xlsx" onChange={handleFileChange} />
          </div>
          <button className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4" onClick={handleUpload} id="button">Upload .xlsx file</button>
        </div>
      </div>
    </section>
  );
};

export default Upload;
