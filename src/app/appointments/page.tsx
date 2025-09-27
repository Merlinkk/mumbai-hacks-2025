'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  type: 'video' | 'physical';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    date: '2024-01-20',
    time: '10:00 AM',
    doctor: 'Dr. Rajesh Kumar',
    specialty: 'General Physician',
    type: 'video',
    status: 'upcoming',
    notes: 'Follow-up for blood pressure medication'
  },
  {
    id: '2',
    date: '2024-01-18',
    time: '02:00 PM',
    doctor: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    type: 'physical',
    status: 'completed',
    notes: 'Routine health checkup'
  },
  {
    id: '3',
    date: '2024-01-15',
    time: '11:00 AM',
    doctor: 'Dr. Amit Singh',
    specialty: 'Orthopedist',
    type: 'video',
    status: 'completed',
    notes: 'Knee pain consultation'
  }
];

export default function Appointments() {
  const { t, language, setLanguage } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredAppointments = appointments.filter(appointment => 
    selectedStatus === 'all' || appointment.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? '📹' : '🏥';
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
  };

  const handleRescheduleAppointment = (id: string) => {
    // Navigate to booking page with pre-filled data
    alert('Redirecting to reschedule appointment...');
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
          <h1 className="font-semibold text-lg">{t('appointments.title')}</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-full text-xs font-medium text-blue-900 transition-all"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <Link href="/book-appointment" className="text-white text-sm font-medium">
              Book
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedStatus(tab.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedStatus === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{getTypeIcon(appointment.type)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{appointment.specialty}</p>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm text-gray-700">
                        📅 {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-gray-700">🕐 {appointment.time}</span>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mb-3">{appointment.notes}</p>
                    )}
                    
                    {/* Action Buttons */}
                    {appointment.status === 'upcoming' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          Cancel
                        </button>
                        {appointment.type === 'video' && (
                          <Link
                            href="/video-consult"
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium"
                          >
                            Join Call
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedStatus === 'all' 
                  ? "You don't have any appointments yet"
                  : `No ${selectedStatus} appointments`
                }
              </p>
              <Link
                href="/book-appointment"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Book New Appointment
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/book-appointment"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="text-sm font-medium text-blue-800">Book Appointment</div>
            <div className="text-xs text-blue-600">Schedule new visit</div>
          </Link>
          <Link 
            href="/ai-chat"
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-medium text-green-800">AI Assistant</div>
            <div className="text-xs text-green-600">Get quick help</div>
          </Link>
        </div>

        {/* Upcoming Appointment Reminder */}
        {appointments.some(apt => apt.status === 'upcoming') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">⏰</span>
              <div>
                <h4 className="font-medium text-yellow-800">Upcoming Appointment</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  You have an appointment tomorrow at 10:00 AM with Dr. Rajesh Kumar
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
          <Link href="/appointments" className="flex flex-col items-center space-y-1 text-blue-600">
            <span className="text-lg">📅</span>
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/records" className="flex flex-col items-center space-y-1 text-gray-400">
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
