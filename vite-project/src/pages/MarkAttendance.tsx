import React, { useEffect, useState } from 'react';
// Assuming you'll eventually use query parameters for the token
import { useLocation } from 'react-router-dom';
// You might want an icon library for success/error messages, e.g., react-icons
// npm install react-icons
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

const MarkAttendance = () => {
  const location = useLocation(); // To get URL query parameters
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const markAttendance = async () => {
      setAttendanceStatus('loading');
      setMessage('Processing your attendance...');

      // In a real application, you'd extract the token from the URL:
      // const params = new URLSearchParams(location.search);
      // const token = params.get('token');

      // Simulate an API call
      try {
        // Replace with your actual API call to verify token and mark attendance
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

        // Simulate success or error based on some condition or a random outcome for testing
        const success = Math.random() > 0.3; // 70% chance of success for testing

        if (success) {
          setAttendanceStatus('success');
          setMessage('Attendance marked successfully! Thank you.');
        } else {
          setAttendanceStatus('error');
          setMessage('Failed to mark attendance. The QR code might be expired or invalid.');
        }
      } catch (error) {
        setAttendanceStatus('error');
        setMessage('An unexpected error occurred. Please try again or contact support.');
        console.error('Attendance marking error:', error);
      }
    };

    // Trigger the attendance marking process when the component mounts
    markAttendance();
  }, [location.search]); // Re-run if query params change (e.g., different token)

  let iconComponent;
  let statusColorClass;
  let buttonContent;

  switch (attendanceStatus) {
    case 'loading':
      iconComponent = <FaSpinner className="animate-spin text-blue-500" size={60} />;
      statusColorClass = 'text-blue-500';
      buttonContent = 'Processing...';
      break;
    case 'success':
      iconComponent = <FaCheckCircle className="text-green-500" size={60} />;
      statusColorClass = 'text-green-500';
      buttonContent = 'Return to Dashboard';
      break;
    case 'error':
      iconComponent = <FaExclamationCircle className="text-red-500" size={60} />;
      statusColorClass = 'text-red-500';
      buttonContent = 'Try Again / Contact Support';
      break;
    case 'idle':
    default:
      iconComponent = null; // Or a default neutral icon
      statusColorClass = 'text-gray-500';
      buttonContent = 'Marking Attendance...'; // Should quickly transition from this
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform transition-all duration-300 scale-100">
        <div className="mb-8 flex justify-center">
          {iconComponent}
        </div>

        <h1 className={`text-3xl md:text-4xl font-extrabold mb-4 ${statusColorClass}`}>
          {attendanceStatus === 'loading' && 'Please Wait'}
          {attendanceStatus === 'success' && 'Attendance Confirmed!'}
          {attendanceStatus === 'error' && 'Attendance Failed'}
          {attendanceStatus === 'idle' && 'Marking Attendance'}
        </h1>

        <p className="text-gray-700 text-lg md:text-xl mb-8">
          {message}
        </p>

        {/* Action Button based on status */}
        {attendanceStatus !== 'loading' && (
          <button
            onClick={() => {
              // Implement navigation or retry logic here
              if (attendanceStatus === 'success') {
                window.location.href = '/dashboard'; // Example: navigate back
              } else if (attendanceStatus === 'error') {
                // You might offer a retry or a link to support
                window.location.href = '/contact-support'; // Example
              }
            }}
            className={`
              inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 ease-in-out
              ${attendanceStatus === 'success' ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl' : ''}
              ${attendanceStatus === 'error' ? 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl' : ''}
              ${attendanceStatus === 'idle' ? 'bg-gray-400 cursor-not-allowed' : ''}
              focus:outline-none focus:ring-4 focus:ring-offset-2
              ${attendanceStatus === 'success' ? 'focus:ring-green-500' : ''}
              ${attendanceStatus === 'error' ? 'focus:ring-red-500' : ''}
            `}
            disabled={attendanceStatus === 'idle'} // Disable button until a status is set
          >
            {buttonContent}
          </button>
        )}

        {attendanceStatus === 'error' && (
          <p className="text-gray-500 text-sm mt-4">
            If the problem persists, please try scanning again or contact your administrator.
          </p>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;