import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setIsLoading(true); // Set loading state

        try {
            const res = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });

            const { token } = res.data;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (err) {
            // More specific error handling if your backend sends different error messages
            if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Invalid credentials. Please check your email and password.');
            }
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-md w-full transform transition-all duration-300 hover:scale-[1.01] animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Welcome Back!
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Sign in to your account to continue.
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading} // Disable input when loading
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading} // Disable input when loading
                        />
                    </div>

                    <button
                        type="submit"
                        className={`
                            w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white
                            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                            transition duration-300 ease-in-out
                            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
                        `}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging In...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>

                    {/* Optional: Add a "Forgot Password" link or "Sign Up" link */}
                    <div className="text-center mt-6">
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                            Forgot password?
                        </a>
                        <p className="mt-2 text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;