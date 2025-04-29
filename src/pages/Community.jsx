import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import DashboardLayout from "../components/DashboardLayout";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate, useLocation } from 'react-router-dom';

const DUMMY_POSTS = [
  {
    id: 'dummy1',
    content: "Just completed my first JavaScript course! 🎉 The journey of learning to code has been amazing. Here are some tips for beginners:\n\n1. Start with the basics\n2. Practice daily\n3. Build small projects\n4. Don't be afraid to make mistakes",
    authorName: "Sarah Chen",
    authorId: "sarah123",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 15,
    likedBy: ['user1', 'user2'],
    comments: [
      { id: 'c1', text: "Great tips! I'm just starting out and this is really helpful.", author: "Mike Johnson", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { id: 'c2', text: "What resources did you use to learn?", author: "Emily Davis", timestamp: new Date(Date.now() - 30 * 60 * 1000) }
    ],
    badge: "Top Contributor"
  },
  {
    id: 'dummy2',
    content: "Looking for a study buddy for React! 📚 I'm working through the official docs and building some practice projects. Anyone interested in collaborating?",
    authorName: "Alex Rivera",
    authorId: "alex456",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 8,
    likedBy: ['user3'],
    comments: [
      { id: 'c3', text: "I'm also learning React! Let's connect!", author: "Jordan Lee", timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) }
    ],
    badge: "Active Learner"
  },
  {
    id: 'dummy3',
    content: "🌟 Achievement Unlocked: Just earned my Python certification! Here's what worked for me:\n\n• Consistent daily practice\n• Building real-world projects\n• Participating in coding challenges\n• Helping others learn\n\nKeep pushing forward, everyone!",
    authorName: "Maya Patel",
    authorId: "maya789",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likes: 42,
    likedBy: ['user1', 'user2', 'user3'],
    comments: [],
    badge: "Certified Developer"
  }
];

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showComments, setShowComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user from localStorage with error handling
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("mentoraUser");
      if (!userData) {
        return {
          uid: `guest_${Math.random().toString(36).substr(2, 9)}`,
          displayName: 'Guest User',
          isGuest: true
        };
      }
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return {
        uid: `guest_${Math.random().toString(36).substr(2, 9)}`,
        displayName: 'Guest User',
        isGuest: true
      };
    }
  };

  const user = getUserData();

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Combine dummy posts with fetched posts
      setPosts([...DUMMY_POSTS, ...fetchedPosts]);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = (postId) => {
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likedBy?.includes(user.uid);
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            likedBy: isLiked 
              ? (post.likedBy || []).filter(id => id !== user.uid)
              : [...(post.likedBy || []), user.uid]
          };
        }
        return post;
      })
    );
    setLikedPosts(current => {
      const newSet = new Set(current);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = (postId) => {
    if (!newComments[postId]?.trim()) return;

    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `c${Date.now()}`,
            text: newComments[postId],
            author: user.displayName,
            timestamp: new Date()
          };
          return {
            ...post,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );
    setNewComments(prev => ({ ...prev, [postId]: '' }));
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    try {
      setError('');
      const newPostData = {
        content: newPost,
        authorId: user.uid,
        authorName: user.displayName,
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        comments: [],
        isGuestPost: user.isGuest,
        badge: user.isGuest ? "Guest Explorer" : null
      };

      if (user.isGuest) {
        // For guest users, add post locally
        setPosts(currentPosts => [{
          ...newPostData,
          id: `guest_post_${Date.now()}`,
          timestamp: new Date()
        }, ...currentPosts]);
      } else {
        // For logged-in users, add to Firestore
        await addDoc(collection(db, "posts"), newPostData);
      }
      setNewPost('');
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';

    let date;
    try {
      if (timestamp.toDate && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        date = new Date(timestamp);
      }

      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
      };

      for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
          return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
      }

      return 'just now';
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'recently';
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden mb-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16" />
            <h1 className="text-3xl font-bold mb-4">Community Feed</h1>
            <p className="text-violet-100">Share your learning journey and connect with others</p>
            {user.isGuest && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                <p className="text-violet-200 text-sm mb-2">
                  👋 You're browsing as a guest. Your posts and interactions will be visible to others but won't be saved permanently.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign in for full features
                </button>
              </div>
            )}
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8"
            onSubmit={handleSubmitPost}
          >
            <div className="relative">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={user.isGuest ? "Share something with the community (posting as guest)..." : "Share something with the community..."}
                className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                rows="3"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Posting</span>
                  <span className="text-sm">as Guest</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Post
              </motion.button>
            </div>
          </motion.form>

          <AnimatePresence>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-lg font-medium text-violet-600 dark:text-violet-300">
                        {post.authorName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {post.authorName}
                            </h3>
                            {post.isGuestPost && (
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Guest
                              </span>
                            )}
                            {post.badge && (
                              <span className="text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300 rounded-full">
                                {post.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {getTimeAgo(post.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.content}</p>
                        <div className="mt-4 flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 transition-colors ${
                              post.likedBy?.includes(user.uid)
                                ? 'text-violet-600 dark:text-violet-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400'
                            }`}
                          >
                            <svg className="w-5 h-5" fill={post.likedBy?.includes(user.uid) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{post.likes || 0}</span>
                          </button>
                          <button
                            onClick={() => toggleComments(post.id)}
                            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.comments?.length || 0}</span>
                          </button>
                        </div>

                        <AnimatePresence>
                          {showComments[post.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                            >
                              <div className="space-y-4">
                                {post.comments?.map((comment) => (
                                  <div key={comment.id} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-sm font-medium text-violet-600 dark:text-violet-300">
                                      {comment.author.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                          {comment.author}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                          {getTimeAgo(comment.timestamp)}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {comment.text}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex gap-2 mt-3">
                                  <input
                                    type="text"
                                    value={newComments[post.id] || ''}
                                    onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                                    placeholder="Add a comment..."
                                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                  />
                                  <button
                                    onClick={() => handleAddComment(post.id)}
                                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                                  >
                                    Comment
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ThemeToggle />
      </div>
    </DashboardLayout>
  );
}