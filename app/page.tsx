import { Suspense } from 'react';
import EmployeeProfile from './components/EmployeeProfile';
import RecentPostsPreview from './components/RecentPostsPreview';
import ClientExplorer from './components/ClientExplorer'; // Import here

export default function Home() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Employee Explorer</h1>
      <p className="mb-8 text-gray-600">Welcome to the dashboard.</p>

      <div className="grid gap-6">
        {/* <Suspense fallback={<div className="p-4 border rounded-lg bg-gray-100">Loading profile...</div>}>
          // <EmployeeProfile />
        </Suspense> */}

         <EmployeeProfile/>
         
        <Suspense fallback={<div className="p-4 border rounded-lg bg-gray-100">Loading recent posts preview... (2s delay)</div>}>
          <RecentPostsPreview />
        </Suspense>

        {/* Client Explorer does NOT need a Suspense boundary */}
        <ClientExplorer /> 
      </div>
    </main>
  );
}