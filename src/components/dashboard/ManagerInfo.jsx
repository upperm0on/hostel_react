import { User, Mail, MessageCircle } from 'lucide-react';
import '../../assets/css/dashboard/ManagerInfo.css';

function ManagerInfo() {
    const hostel = JSON.parse(localStorage.getItem('information'))
    const manager = hostel?.manager?.user

    if (!manager) {
        return (
            <div className="p-4 rounded-2xl shadow bg-red-50 text-red-700">
                <p>No manager info available.</p>
            </div>
        )
    }

    return (
        <div className="p-6 rounded-2xl shadow bg-white border">
            <h2 className="text-xl font-semibold mb-4"><User size={20} /> Host Information</h2>
            <div className="space-y-2">
                <p><span className="font-medium"><User size={16} /> Host Name:</span> {manager.username}</p>
                <p><span className="font-medium"><Mail size={16} /> Email:</span> {manager.email}</p>
                <button type='button' className='host_button'><MessageCircle size={16} /> Contact Host</button>
            </div>
        </div>
    )
}

export default ManagerInfo
