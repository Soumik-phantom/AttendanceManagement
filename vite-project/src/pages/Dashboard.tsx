import React, { useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';

const Dashboard = () => {
    // In a real application, this token would be dynamically generated
    const attendanceUrl = `https://yourdomain.com/mark-attendance?token=abc123`;
    const qrRef = useRef<HTMLCanvasElement>(null); // Ref for the QR code canvas

    // Function to handle the download
    const handleDownload = () => {
        if (qrRef.current) {
            const canvas = qrRef.current;
            const url = canvas.toDataURL('image/png'); // Get the canvas data as PNG

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.download = 'attendance_qr_code.png'; // Set the filename
            document.body.appendChild(link); // Append to the body
            link.click(); // Simulate a click to trigger the download
            document.body.removeChild(link); // Remove the link
        }
    };

    useEffect(() => {
        // You can add any initialization logic here if needed
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
                    Scan to Mark Attendance
                </h1>

                <p className="text-gray-600 mb-8 text-lg">
                    Present this QR code to quickly mark your presence.
                </p>

                <div className="flex flex-col items-center justify-center mb-8">
                    {/* QR Code Container */}
                    <div className="p-4 bg-gray-100 rounded-lg shadow-inner mb-4">
                        <QRCode
                            ref={qrRef} // Attach the ref here
                            value={attendanceUrl}
                            size={256}
                            level="H"
                            fgColor="#333333"
                            bgColor="#FFFFFF"
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <button
                        onClick={handleDownload}
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md py-2 px-4 transition-colors duration-200"
                    >
                        Download QR Code
                    </button>
                </div>

                <div className="text-sm text-gray-500 mt-6">
                    <p>Make sure your device has an active internet connection.</p>
                    <p className="mt-2">
                        If you have issues, contact support:
                        <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">
                            support@yourdomain.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
