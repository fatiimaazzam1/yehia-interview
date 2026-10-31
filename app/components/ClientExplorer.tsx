'use client';

import { useState } from 'react';
import { ApiError } from '@/app/lib/api-error';

// Define what a Post looks like based on JSONPlaceholder
type Post = {
  id: number;
  title: string;
  body: string;
};

export default function ClientExplorer() {
  // 1. Track the 5 states
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'empty' | 'error'>('idle');
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. The fetch function (only runs when clicked)
  const handleLoadPosts = async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');

      // HTTP Error check (Our ApiError from Mission 2)
      if (!res.ok) {
        throw new ApiError('Failed to fetch posts', res.status);
      }

      const data: Post[] = await res.json();

      // Empty state check
      if (data.length === 0) {
        setStatus('empty');
        return;
      }

      // Success state
      setPosts(data);
      setStatus('success');

    } catch (error) {
      // Error state (Distinguishing API vs Network error)
      setStatus('error');
      if (error instanceof ApiError) {
        setErrorMessage(`API Error: ${error.message} (Status: ${error.status})`);
      } else {
        setErrorMessage('Network error: Could not reach the server.');
      }
    }
  };

  // 3. Render the UI based on the current state
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">Explore All Posts</h2>

      {/* State 1: Idle */}
      {status === 'idle' && (
        <div>
          <p className="text-gray-600 mb-4">Click the button to load the full list of posts.</p>
          <button
            onClick={handleLoadPosts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Load posts
          </button>
        </div>
      )}

      {/* State 2: Loading */}
      {status === 'loading' && (
        <div>
          <p className="text-blue-600 mb-4">Loading posts... Please wait.</p>
          {/* Disable the button to prevent duplicate clicks */}
          <button disabled className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
            Loading...
          </button>
        </div>
      )}

      {/* State 4: Empty */}
      {status === 'empty' && (
        <div>
          <p className="text-yellow-600 font-medium mb-4">No posts found.</p>
          <button
            onClick={handleLoadPosts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* State 5: Error */}
      {status === 'error' && (
        <div>
          <p className="text-red-600 font-medium mb-2">Oops! Something went wrong.</p>
          <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
          <button
            onClick={handleLoadPosts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* State 3: Success */}
      {status === 'success' && (
        <div>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border-b pb-2">
                <h3 className="font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.body}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLoadPosts}
            className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Reload Posts
          </button>
        </div>
      )}
    </div>
  );
}