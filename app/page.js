'use client';

import { useState } from 'react';
import { fetchFromBackend1, fetchFromBackend2, createTenant } from '../utils/api';

export default function Home() {
  const [backend1Data, setBackend1Data] = useState(null);
  const [backend2Data, setBackend2Data] = useState(null);
  const [crossBackendData, setCrossBackendData] = useState(null);
  const [username, setUsername] = useState('');
  const [newTenant, setNewTenant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBackend1 = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromBackend1('users/');
      setBackend1Data(data);
    } catch (err) {
      setError('Failed to fetch from Backend 1: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBackend2 = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromBackend2('info/');
      setBackend2Data(data);
    } catch (err) {
      setError('Failed to fetch from Backend 2: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCrossBackend = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromBackend1('call-backend2/');
      setCrossBackendData(data);
    } catch (err) {
      setError('Failed to fetch cross-backend data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTenant = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await createTenant({ username });
      setNewTenant(data);
    } catch (err) {
      setError('Failed to create tenant: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold mb-6">QuestNest Multi-Tenant Demo</h1>
      
      <div className="mb-10 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Tenant</h2>
        <form onSubmit={handleCreateTenant} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter username"
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Tenant'}
          </button>
        </form>
        
        {newTenant && (
          <div className="mt-4 p-4 border rounded bg-green-50">
            <h3 className="font-bold">Tenant Created!</h3>
            <p>Subdomain: <strong>{newTenant.tenant.subdomain}</strong></p>
            <p>Username: {newTenant.tenant.username}</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-4">Backend 1 Data</h2>
          <button 
            onClick={fetchBackend1} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            disabled={loading}
          >
            Fetch Users
          </button>
          {backend1Data && (
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {JSON.stringify(backend1Data, null, 2)}
            </pre>
          )}
        </div>
        
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-4">Backend 2 Data</h2>
          <button 
            onClick={fetchBackend2} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            disabled={loading}
          >
            Fetch Info
          </button>
          {backend2Data && (
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {JSON.stringify(backend2Data, null, 2)}
            </pre>
          )}
        </div>
        
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-4">Cross-Backend Communication</h2>
          <button 
            onClick={fetchCrossBackend} 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mb-4"
            disabled={loading}
          >
            Test Backend-to-Backend
          </button>
          {crossBackendData && (
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {JSON.stringify(crossBackendData, null, 2)}
            </pre>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 border rounded bg-red-50 text-red-700 w-full max-w-6xl">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      )}
    </main>
  );
}