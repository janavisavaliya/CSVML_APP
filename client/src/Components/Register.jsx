import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/auth/register", formData);
            alert(res.data.message);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg animate__animated animate__fadeInUp" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4 text-success">📝 Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            name="name"
                            placeholder="👤 Name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            name="email"
                            type="email"
                            placeholder="📧 Email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            name="password"
                            type="password"
                            placeholder="🔒 Password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        🚀 Register
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">Already have an account?</small><br />
                    <Link to="/" className="btn btn-link">🔐 Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
