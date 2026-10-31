import { ApiError } from '@/app/lib/api-error';

export default async function EmployeeProfile() {
  let employee = null;
  let error = null;

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    if (!res.ok) {
      throw new ApiError('Failed to fetch employee profile', res.status);
    }
    employee = await res.json();
  } catch (err) {
    error = err;
  }

  // ERROR UI (Outside the try/catch)
  if (error) {
    if (error instanceof ApiError) {
      return (
        <div className="p-4 border rounded-lg bg-red-50 text-red-700">
          <h2 className="text-xl font-bold mb-2">Employee Profile</h2>
          <p>Sorry, we could not load the employee profile.</p>
          <p className="text-sm">Error: {error.message} (Status: {error.status})</p>
        </div>
      );
    }
    return (
      <div className="p-4 border rounded-lg bg-red-50 text-red-700">
        <h2 className="text-xl font-bold mb-2">Employee Profile</h2>
        <p>An unexpected error occurred while loading the profile.</p>
      </div>
    );
  }

  // SUCCESS UI (Outside the try/catch)
  if (!employee) return null;

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Employee Profile</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Company:</strong> {employee.company.name}</p>
    </div>
  );
}