import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { FaFileCsv, FaUpload, FaTable, FaRobot } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, } from 'chart.js';
import LogoutButton from './Logout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const UploadForm = () => {
    const [csvData, setCsvData] = useState([]);
    const [file, setFile] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);

        Papa.parse(selected, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setCsvData(results.data);
            },
        });
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please upload a CSV file first!");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem("token"); // Get JWT from localStorage

        try {
            const res = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`, // 🔐 Attach token here
                    "Content-Type": "multipart/form-data"
                }
            });

            setPredictions(res.data.data);
            toast.success("File uploaded and predictions received!");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Upload failed. Check login or file format.");
        } finally {
            setUploading(false);
        }
    };


    const generateChartData = () => {
        const firstRow = predictions[0];
        const numericKeys = Object.keys(firstRow).filter((key) =>
            !isNaN(Number(firstRow[key]))
        );

        if (numericKeys.length === 0) return { labels: [], datasets: [{ data: [] }] };

        const selectedKey = numericKeys[0];

        const values = predictions.map((row) => Number(row[selectedKey]));

        return {
            labels: values.map((_, i) => `Candidate ${i + 1}`),
            datasets: [
                {
                    label: selectedKey,
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        };
    };


    return (
        <div className="container mt-5">
            <div className='d-flex align-items-center justify-content-between mb-5'>
                <h1>🤖 Upload & 📊 Unfold</h1>
                <LogoutButton />
            </div>
            <ToastContainer />

            <div className="card shadow-lg p-4 animate__animated animate__fadeIn">
                <h2 className="mb-4 text-primary text-center">
                    <FaUpload className="me-2" />
                    Upload CSV File
                </h2>

                <div className="mb-3 text-center">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-success" onClick={handleSubmit} disabled={uploading}>
                        <FaUpload className="me-2" />
                        {uploading ? 'Uploading...' : 'Submit'}
                    </button>
                </div>

                {uploading && (
                    <div className="progress mt-3">
                        <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                            style={{ width: '100%' }}
                        >
                            Uploading...
                        </div>
                    </div>
                )}
            </div>

            {csvData.length > 0 && (
                <div className="mt-5 animate__animated animate__fadeInUp">
                    <h4 className="text-secondary mb-3">
                        <FaTable className="me-2" />
                        Uploaded CSV Data
                    </h4>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    {Object.keys(csvData[0]).map((head, i) => (
                                        <th key={i}>{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {csvData.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {predictions.length > 0 && (
                <div className="mt-5 animate__animated animate__fadeInUp">
                    <h4 className="text-info mb-3">
                        <FaRobot className="me-2" />
                        Predictions
                    </h4>
                    <div className="table-responsive mb-4">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    {Object.keys(predictions[0]).map((key, i) => (
                                        <th key={i}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {predictions.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Chart Section */}
                    {generateChartData().datasets[0].data.length > 0 && (
                        <div className="card p-4 shadow-sm mb-5">
                            <h5 className="mb-3">Prediction Chart</h5>
                            <Bar data={generateChartData()} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadForm;
