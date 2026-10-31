import { connection } from 'next/server';
import { ApiError } from '@/app/lib/api-error';

export default async function RecentPostsPreview() {
  try {
    // 1. FORCE DYNAMIC RENDERING (Hint 2)
    // This prevents Next.js from pre-rendering the delay at build time.
    // await connection();

    // 2. INTENTIONAL LEARNING SIMULATION (2-second delay)
    // This is here ONLY to demonstrate the Suspense fallback.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. FETCH DATA
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');

    if (!res.ok) {
      throw new ApiError('Failed to fetch recent posts', res.status);
    }

    const posts = await res.json();
    const recentPosts = posts.slice(0, 3); // Only up to 3 titles

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
  } catch (error) {
    if (error instanceof ApiError) {
      return (
        <div className="p-4 border rounded-lg bg-red-50 text-red-700">
          <h2 className="text-xl font-bold mb-2">Recent Posts Preview</h2>
          <p>Sorry, we couldn't load the recent posts.</p>
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
}