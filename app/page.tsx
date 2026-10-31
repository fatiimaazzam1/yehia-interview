import { Suspense } from 'react';
import EmployeeProfile from './components/EmployeeProfile';
import RecentPostsPreview from './components/RecentPostsPreview';

export default function Home() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      {/* OUTSIDE THE BOUNDARY: Always visible immediately */}
      <h1 className="text-3xl font-bold mb-6">Employee Explorer</h1>
      <p className="mb-8 text-gray-600">Welcome to the dashboard.</p>

      <div className="grid gap-6">
        <Suspense fallback={<div className="p-4 border rounded-lg bg-gray-100">Loading profile...</div>}>
          <EmployeeProfile />
        </Suspense>

        {/* FOCUSED BOUNDARY: Only this box waits */}
        <Suspense fallback={
          <div className="p-4 border rounded-lg bg-gray-100 text-gray-500">
            Loading recent posts preview... (Intentional 2-second delay)
          </div>
        }>
          <RecentPostsPreview />
        </Suspense>
      </div>
    </main>
  );
}