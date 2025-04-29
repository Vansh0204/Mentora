import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const certifications = [
  {
    id: 'web-dev-cert',
    title: 'Web Development Certification',
    description: 'Complete the web development learning track to earn this certification',
    icon: '🌐',
    color: 'bg-blue-100 text-blue-800',
    requirements: [
      'Complete all 5 levels of Web Development track',
      'Score 80% or higher in final assessment',
      'Complete 3 practical projects'
    ]
  },
  {
    id: 'design-cert',
    title: 'UI/UX Design Certification',
    description: 'Master UI/UX design principles and tools',
    icon: '🎨',
    color: 'bg-purple-100 text-purple-800',
    requirements: [
      'Complete all 5 levels of UI/UX Design track',
      'Create a design portfolio',
      'Complete 2 real-world design challenges'
    ]
  },
  {
    id: 'data-science-cert',
    title: 'Data Science Certification',
    description: 'Become a certified data scientist',
    icon: '📊',
    color: 'bg-green-100 text-green-800',
    requirements: [
      'Complete all 5 levels of Data Science track',
      'Analyze 3 real-world datasets',
      'Build and deploy a machine learning model'
    ]
  }
];

export default function Certifications() {
  const [userCertifications, setUserCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("mentoraUser"));

  useEffect(() => {
    const fetchUserCertifications = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserCertifications(data.certifications || []);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCertifications();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Certifications</h1>
          <p className="mt-2 text-gray-600">
            Earn certifications by completing learning tracks and challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                userCertifications.includes(cert.id) ? '' : 'opacity-50'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{cert.icon}</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-500">{cert.description}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {cert.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  {userCertifications.includes(cert.id) ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      ✓ Earned
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Certification Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Certifications</span>
              <span className="font-medium">
                {userCertifications.length} / {certifications.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(userCertifications.length / certifications.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 