'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  medicines: Medicine[];
}

interface Medicine {
  name: string;
  available: boolean;
  price: number;
  generic: string;
}

const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Nabha Medical Store',
    address: 'Near Civil Hospital, Nabha',
    distance: '0.5 km',
    phone: '+91 98765 43210',
    medicines: [
      { name: 'Paracetamol 500mg', available: true, price: 15, generic: 'Paracetamol' },
      { name: 'Amoxicillin 250mg', available: true, price: 45, generic: 'Amoxicillin' },
      { name: 'Cetirizine 10mg', available: false, price: 0, generic: 'Cetirizine' }
    ]
  },
  {
    id: '2',
    name: 'Baddi Pharmacy',
    address: 'Main Market, Baddi',
    distance: '2.1 km',
    phone: '+91 98765 43211',
    medicines: [
      { name: 'Paracetamol 500mg', available: true, price: 18, generic: 'Paracetamol' },
      { name: 'Amoxicillin 250mg', available: false, price: 0, generic: 'Amoxicillin' },
      { name: 'Cetirizine 10mg', available: true, price: 25, generic: 'Cetirizine' }
    ]
  },
  {
    id: '3',
    name: 'Rural Health Center',
    address: 'Village Center, Nabha',
    distance: '1.2 km',
    phone: '+91 98765 43212',
    medicines: [
      { name: 'Paracetamol 500mg', available: true, price: 12, generic: 'Paracetamol' },
      { name: 'Amoxicillin 250mg', available: true, price: 40, generic: 'Amoxicillin' },
      { name: 'Cetirizine 10mg', available: true, price: 20, generic: 'Cetirizine' }
    ]
  }
];

export default function Pharmacy() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<string>('');

  const commonMedicines = [
    'Paracetamol 500mg',
    'Amoxicillin 250mg',
    'Cetirizine 10mg',
    'Omeprazole 20mg',
    'Metformin 500mg',
    'Amlodipine 5mg'
  ];

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.medicines.some(medicine =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.generic.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getAvailabilityStatus = (medicine: Medicine) => {
    if (medicine.available) {
      return { text: 'Available', color: 'text-green-600 bg-green-100' };
    }
    return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="font-semibold text-lg">{t('pharmacy.title')}</h1>
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg p-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for medicine or generic name"
              className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Common Medicines */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Common Medicines</h3>
          <div className="grid grid-cols-2 gap-2">
            {commonMedicines.map((medicine) => (
              <button
                key={medicine}
                onClick={() => setSearchQuery(medicine)}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-left transition-colors"
              >
                {medicine}
              </button>
            ))}
          </div>
        </div>

        {/* Pharmacy Results */}
        {searchQuery && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Available at:</h3>
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="bg-white rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{pharmacy.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{pharmacy.address}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          📍 {pharmacy.distance}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          📞 {pharmacy.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Medicine Availability */}
                  <div className="space-y-2">
                    {pharmacy.medicines
                      .filter(medicine =>
                        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        medicine.generic.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((medicine) => {
                        const status = getAvailabilityStatus(medicine);
                        return (
                          <div key={medicine.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{medicine.name}</p>
                              <p className="text-xs text-gray-600">Generic: {medicine.generic}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs px-2 py-1 rounded ${status.color}`}>
                                {status.text}
                              </span>
                              {medicine.available && (
                                <p className="text-sm font-medium text-gray-900 mt-1">₹{medicine.price}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                      📞 Call Pharmacy
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                      📍 Get Directions
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">😔</div>
                <h3 className="font-semibold text-gray-900 mb-2">Medicine not found</h3>
                <p className="text-sm text-gray-600 mb-4">
                  &quot;{searchQuery}&quot; is not available at nearby pharmacies
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                    🔍 Search Alternative Medicines
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
                    📞 Contact Doctor for Prescription
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/ai-chat"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-medium text-blue-800">AI Assistant</div>
            <div className="text-xs text-blue-600">Get medicine advice</div>
          </Link>
          <Link 
            href="/emergency"
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
          >
            <div className="text-2xl mb-2">🚨</div>
            <div className="text-sm font-medium text-red-800">Emergency</div>
            <div className="text-xs text-red-600">Call 108</div>
          </Link>
        </div>

        {/* Offline Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">⚠️</span>
            <div>
              <h4 className="font-medium text-yellow-800">Offline Mode Available</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This information is cached for offline access. Last updated: 2 hours ago.
              </p>
            </div>
          </div>
        </div>
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
          <Link href="/records" className="flex flex-col items-center space-y-1 text-gray-400">
            <span className="text-lg">📋</span>
            <span className="text-xs">Records</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center space-y-1 text-green-600">
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
