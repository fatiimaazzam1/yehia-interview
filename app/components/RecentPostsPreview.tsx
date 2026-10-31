import { connection } from 'next/server';
import { ApiError } from '@/app/lib/api-error';
import { Suspense } from 'react';

export default async function RecentPostsPreview() {
  let recentPosts = null;
  let error = null;

  try {
    
    await connection();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
    if (!res.ok) {
      throw new ApiError('Failed to fetch recent posts', res.status);
    }
    const posts = await res.json();
    recentPosts = posts.slice(0, 3);
  } catch (err) {
    error = err;
  }

  
  // ERROR UI
  if (error) {
    if (error instanceof ApiError) {
      return (
        <div className="p-4 border rounded-lg bg-red-50 text-red-700">
          <h2 className="text-xl font-bold mb-2">Recent Posts Preview</h2>
          <p>Sorry, we could not load the recent posts.</p>
          <p className="text-sm">Error: {error.message} (Status: {error.status})</p>
        </div>
      );
    }
    return (
      <div className="p-4 border rounded-lg bg-red-50 text-red-700">
        <h2 className="text-xl font-bold mb-2">Recent Posts Preview</h2>
        <p>An unexpected error occurred.</p>
      </div>
    );
  }

  // SUCCESS UI
  if (!recentPosts) return null;

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Recent Posts Preview</h2>
      <ul className="list-disc pl-5">
        {recentPosts.map((post: { id: number; title: string }) => (
          <li key={post.id} className="text-gray-700">{post.title}</li>
        ))}
      </ul>
    </div>
  );
}