'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

// Service card component
interface ServiceCardProps {
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  color: string;
}

function ServiceCard({ title, subtitle, icon, href, color }: ServiceCardProps) {
  return (
    <Link href={href} className="block">
      <div className="card p-4 h-full cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Specialty icon component
interface SpecialtyIconProps {
  icon: string;
  label: string;
  href: string;
}

function SpecialtyIcon({ icon, label, href }: SpecialtyIconProps) {
  return (
    <Link href={href} className="flex flex-col items-center space-y-2 p-2">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="text-xs text-center text-gray-700 font-medium leading-tight">{label}</span>
    </Link>
  );
}

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  // Removed unused currentTime state

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Safe area spacing for mobile status bar */}
      <div className="h-6 bg-white"></div>
      
      {/* Header with greeting */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-lg">👋</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{t('home.greeting')}</h1>
              <div className="flex items-center space-x-1">
                <span className="text-red-500 text-sm">📍</span>
                <p className="text-sm text-gray-600">Nabha, Punjab</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded-full text-xs font-medium text-purple-800 transition-colors"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')}
            className="w-full px-4 py-3 pl-12 bg-gray-50 text-gray-900 rounded-xl text-sm placeholder-gray-500 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
            {/* Service Categories - Two main cards */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/book-appointment" className="block">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 h-36 flex flex-col justify-center items-center shadow-lg">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">🏥</span>
                  </div>
                  <h3 className="font-bold text-lg text-center">{t('home.physicalAppointment')}</h3>
                  <p className="text-sm text-purple-100 mt-1 text-center">{t('home.atHospital')}</p>
                </div>
              </Link>

              <Link href="/video-consult" className="block">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 h-36 flex flex-col justify-center items-center hover:border-purple-300 transition-all shadow-sm">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">🏠</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 text-center">{t('home.videoConsult')}</h3>
                  <p className="text-sm text-gray-500 mt-1 text-center">{t('home.connectIn5Sec')}</p>
                </div>
              </Link>
            </div>

        {/* Symptom Checker */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">What are your symptoms?</h2>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center space-y-3 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors border border-pink-100">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">🌡️</span>
              </div>
              <span className="text-sm text-gray-800 font-medium">Temperature</span>
            </button>
            <button className="flex flex-col items-center space-y-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">🤧</span>
              </div>
              <span className="text-sm text-gray-800 font-medium">Cold</span>
            </button>
            <button className="flex flex-col items-center space-y-3 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors border border-yellow-100">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">🤕</span>
              </div>
              <span className="text-sm text-gray-800 font-medium">Headache</span>
            </button>
          </div>
        </div>

        {/* Popular Doctors */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Popular doctors</h2>
          <div className="space-y-4">
            {/* Doctor 1 */}
            <div className="flex items-center space-x-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Dr. Rajesh Kumar</h3>
                <p className="text-sm text-gray-600">General Physician</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <span className="text-sm font-semibold">4.9</span>
                  <span className="text-xs text-gray-500">(127 reviews)</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                {t('common.book')}
              </button>
            </div>

            {/* Doctor 2 */}
            <div className="flex items-center space-x-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Dr. Priya Sharma</h3>
                <p className="text-sm text-gray-600">Pediatrician</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <span className="text-sm font-semibold">4.8</span>
                  <span className="text-xs text-gray-500">(98 reviews)</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                {t('common.book')}
              </button>
            </div>

            {/* Doctor 3 */}
            <div className="flex items-center space-x-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Dr. Amit Singh</h3>
                <p className="text-sm text-gray-600">Orthopedist</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <span className="text-sm font-semibold">4.7</span>
                  <span className="text-xs text-gray-500">(156 reviews)</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                {t('common.book')}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/medicines" className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-purple-300 transition-all shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-xl">💊</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{t('home.medicines')}</span>
          </Link>
          <Link href="/lab-tests" className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-orange-300 transition-all shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-xl">🧪</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{t('home.labTests')}</span>
          </Link>
          <Link href="/emergency" className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-red-300 transition-all shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-xl">🚨</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{t('home.emergency')}</span>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center space-y-2 text-blue-600">
            <div className="relative">
              <span className="text-lg">🏠</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">N</span>
              </div>
            </div>
            <span className="text-xs font-medium">{t('common.home')}</span>
          </Link>
          <Link href="/appointments" className="flex flex-col items-center space-y-2 text-gray-400">
            <div className="relative">
              <span className="text-lg">📅</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">17</span>
              </div>
            </div>
            <span className="text-xs font-medium">{t('common.appointments')}</span>
          </Link>
          <Link href="/records" className="flex flex-col items-center space-y-2 text-gray-400">
            <span className="text-lg">📋</span>
            <span className="text-xs font-medium">{t('common.records')}</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center space-y-2 text-gray-400">
            <span className="text-lg">👤</span>
            <span className="text-xs font-medium">{t('common.profile')}</span>
          </Link>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
