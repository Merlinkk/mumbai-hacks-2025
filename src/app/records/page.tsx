'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

interface HealthRecord {
  id: string;
  date: string;
  type: 'consultation' | 'lab_test' | 'prescription' | 'vaccination';
  title: string;
  doctor: string;
  description: string;
  status: 'completed' | 'pending' | 'scheduled';
  isOffline: boolean;
}

const sampleRecords: HealthRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'consultation',
    title: 'General Health Checkup',
    doctor: 'Dr. Rajesh Kumar',
    description: 'Routine health checkup, blood pressure normal, weight stable',
    status: 'completed',
    isOffline: true
  },
  {
    id: '2',
    date: '2024-01-10',
    type: 'lab_test',
    title: 'Blood Sugar Test',
    doctor: 'Dr. Priya Sharma',
    description: 'Fasting blood sugar: 95 mg/dL (Normal)',
    status: 'completed',
    isOffline: true
  },
  {
    id: '3',
    date: '2024-01-08',
    type: 'prescription',
    title: 'Medication for Fever',
    doctor: 'Dr. Amit Singh',
    description: 'Paracetamol 500mg - 3 times daily for 3 days',
    status: 'completed',
    isOffline: true
  },
  {
    id: '4',
    date: '2024-01-20',
    type: 'consultation',
    title: 'Follow-up Appointment',
    doctor: 'Dr. Rajesh Kumar',
    description: 'Follow-up for blood pressure medication',
    status: 'scheduled',
    isOffline: false
  }
];

export default function HealthRecords() {
  const { t, language, setLanguage } = useLanguage();
  const [records, setRecords] = useState<HealthRecord[]>(sampleRecords);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredRecords = records.filter(record => 
    selectedType === 'all' || record.type === selectedType
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '🩺';
      case 'lab_test': return '🧪';
      case 'prescription': return '💊';
      case 'vaccination': return '💉';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const syncRecords = async () => {
    if (!isOnline) {
      alert('You are offline. Records will sync when connection is restored.');
      return;
    }

    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Records synced successfully!');
    } catch (error) {
      alert('Sync failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Safe area spacing for mobile status bar */}
      <div className="h-6 bg-blue-600"></div>
      
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="font-semibold text-lg">{t('records.title')}</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-full text-xs font-medium text-blue-900 transition-all"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <button
              onClick={syncRecords}
              className="text-white text-sm font-medium"
            >
              {isOnline ? 'Sync' : 'Offline'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Connection Status */}
        <div className={`rounded-lg p-3 ${
          isOnline 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{isOnline ? '🟢' : '🟡'}</span>
            <div>
              <p className={`font-medium ${
                isOnline ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {isOnline ? 'Online' : 'Offline Mode'}
              </p>
              <p className={`text-sm ${
                isOnline ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {isOnline 
                  ? 'All records are synced' 
                  : 'Viewing cached records. Changes will sync when online.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All Records' },
              { key: 'consultation', label: 'Consultations' },
              { key: 'lab_test', label: 'Lab Tests' },
              { key: 'prescription', label: 'Prescriptions' },
              { key: 'vaccination', label: 'Vaccinations' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedType(tab.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedType === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{getTypeIcon(record.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{record.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{record.doctor}</p>
                  <p className="text-sm text-gray-700 mb-2">{record.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center space-x-2">
                      {record.isOffline && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          📱 Offline
                        </span>
                      )}
                      <button className="text-blue-600 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Record */}
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Add New Record</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload documents, add notes, or record new health information
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                📄 Upload Document
              </button>
              <button className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                📝 Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/appointments"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium text-blue-800">Appointments</div>
            <div className="text-xs text-blue-600">View upcoming</div>
          </Link>
          <Link 
            href="/pharmacy"
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
          >
            <div className="text-2xl mb-2">💊</div>
            <div className="text-sm font-medium text-green-800">Medicines</div>
            <div className="text-xs text-green-600">Check availability</div>
          </Link>
        </div>

        {/* Offline Notice */}
        {!isOnline && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <h4 className="font-medium text-yellow-800">Offline Mode</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  You are viewing cached records. New records will be saved locally and synced when you&apos;re back online.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center space-y-1 text-gray-400">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/appointments" className="flex flex-col items-center space-y-1 text-gray-400">
            <span className="text-lg">📅</span>
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/records" className="flex flex-col items-center space-y-1 text-blue-600">
            <span className="text-lg">📋</span>
            <span className="text-xs">Records</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center space-y-1 text-gray-400">
            <span className="text-lg">👤</span>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}
