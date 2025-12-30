import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 

const Profile = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 transition cursor-pointer"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {/* Profile Picture */}
                <div className="flex justify-center -mt-12">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                        src="/user-profile.png"
                        alt="Profile"
                    />
                </div>

                {/* User Info */}
                <div className="text-center mt-4">
                    <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                    <p className="text-gray-500 mt-1">{user?.email}</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700">Full Name</span>
                        <span className="text-gray-600">{user?.name}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700">Email</span>
                        <span className="text-gray-600">{user?.email}</span>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
