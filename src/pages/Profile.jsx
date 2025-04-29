import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "../components/DashboardLayout";
import ThemeToggle from "../components/ThemeToggle";

const demoProfile = {
  name: 'Guest User',
  bio: 'A passionate learner and mentor!',
  teachSkills: ['React', 'CSS'],
  learnSkills: ['Python', 'Django'],
  completedSessions: 3,
  xp: 1200,
  badges: 2,
};

export default function Profile() {
  const [profile, setProfile] = useState(demoProfile);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleEdit = () => {
    setEditing(true);
    setFormData(profile);
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="max-w-3xl mx-auto py-12 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-violet-200 dark:bg-violet-700 flex items-center justify-center font-bold text-2xl text-violet-700 dark:text-violet-100">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-violet-800 dark:text-violet-200">{profile.name}</h2>
                  <p className="text-gray-500 dark:text-gray-300">{profile.bio}</p>
                </div>
              </div>
              <button
                onClick={editing ? handleSave : handleEdit}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              >
                {editing ? 'Save' : 'Edit Profile'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-violet-700 dark:text-violet-200 mb-2">Skills to Teach</h3>
                {editing ? (
                  <textarea
                    className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100"
                    value={formData.teachSkills.join(', ')}
                    onChange={e => setFormData({ ...formData, teachSkills: e.target.value.split(',').map(s => s.trim()) })}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.teachSkills.map(skill => (
                      <span key={skill} className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100 px-3 py-1 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-violet-700 dark:text-violet-200 mb-2">Skills to Learn</h3>
                {editing ? (
                  <textarea
                    className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100"
                    value={formData.learnSkills.join(', ')}
                    onChange={e => setFormData({ ...formData, learnSkills: e.target.value.split(',').map(s => s.trim()) })}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.learnSkills.map(skill => (
                      <span key={skill} className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100 px-3 py-1 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-violet-50 dark:bg-violet-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-violet-700 dark:text-violet-200">{profile.completedSessions}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Completed Sessions</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700 dark:text-green-200">{profile.xp}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Total XP</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-200">{profile.badges}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Badges Earned</div>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </DashboardLayout>
  );
} 