// src/components/UserProfileModal.jsx
export default function UserProfileModal({ user, onClose }) {
    if (!user) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          >
            ×
          </button>
  
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-indigo-300 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-indigo-700">
                {user.name}
              </h2>
              <p className="text-gray-600">XP: {user.xp}</p>
            </div>
          </div>
  
          <div>
            <h4 className="font-semibold mb-2 text-indigo-600">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
  
          {/* Add more fields here if available like bio, goals, etc */}
        </div>
      </div>
    );
  }
  