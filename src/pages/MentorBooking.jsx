import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

export default function MentorBooking() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem("mentoraUser"));

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "mentor"));
        const snapshot = await getDocs(q);
        
        const mentorsList = [];
        snapshot.forEach(doc => {
          const mentorData = doc.data();
          if (doc.id !== user.uid) {
            mentorsList.push({
              id: doc.id,
              ...mentorData,
              availability: mentorData.availability || []
            });
          }
        });
        
        setMentors(mentorsList);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [user]);

  const handleBooking = async () => {
    if (!selectedMentor || !selectedDate || !selectedTime) return;

    try {
      const bookingRef = collection(db, "bookings");
      await addDoc(bookingRef, {
        mentorId: selectedMentor.id,
        menteeId: user.uid,
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        createdAt: Timestamp.now(),
        mentorName: selectedMentor.name,
        menteeName: user.name,
        skill: selectedMentor.teachSkills[0] // For simplicity, using first skill
      });

      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book a Mentor</h1>
          <p className="mt-2 text-gray-600">
            Find and book sessions with expert mentors
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
                      selectedMentor?.id === mentor.id ? 'ring-2 ring-indigo-600' : ''
                    }`}
                    onClick={() => setSelectedMentor(mentor)}
                  >
                    <div className="p-6">
                      <div className="flex items-center">
                        <img
                          src={mentor.photoURL || `https://ui-avatars.com/api/?name=${mentor.name}&background=random`}
                          alt={mentor.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {mentor.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {mentor.teachSkills?.join(", ")}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">⭐</span>
                          <span>{mentor.rating || "New Mentor"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="mr-2">👥</span>
                          <span>{mentor.sessionsCompleted || 0} sessions</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              {selectedMentor ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Book Session with {selectedMentor.name}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select a time</option>
                        {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleBooking}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Book Session
                    </button>

                    {bookingSuccess && (
                      <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                        Session booked successfully!
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
                  Select a mentor to book a session
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 