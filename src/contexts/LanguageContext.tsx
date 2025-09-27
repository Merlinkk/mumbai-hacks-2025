'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Home page
    'home.title': 'Nabha Health',
    'home.greeting': 'Hello, Rajesh Kumar',
    'home.physicalAppointment': 'Physical Appointment',
    'home.atHospital': 'At Hospital',
    'home.videoConsult': 'Video Consult',
    'home.connectIn5Sec': 'Connect in 5 sec',
    'home.medicines': 'Medicines',
    'home.pharmacyDelivery': 'Pharmacy Delivery',
    'home.labTests': 'Lab Tests',
    'home.homeCollection': 'Home Collection',
    'home.surgeries': 'Surgeries',
    'home.bookProcedure': 'Book Procedure',
    'home.findDoctor': 'Find a Doctor for your Health Problem',
    'home.generalPhysician': 'General Physician',
    'home.skinHair': 'Skin & Hair',
    'home.womensHealth': 'Women\'s Health',
    'home.dentalCare': 'Dental Care',
    'home.childSpecialist': 'Child Specialist',
    'home.ent': 'Ear, Nose, Throat',
    'home.mentalWellness': 'Mental Wellness',
    'home.more': '20+ more',
    'home.askHealthAI': 'Ask Health AI',
    'home.free': 'FREE',
    'home.queriesResolved': '20000+ health queries resolved in last month',
    'home.emergency': 'Emergency',
    'home.call108': 'Call 108',
    'home.pharmacy': 'Pharmacy',
    'home.checkAvailability': 'Check Availability',
    
    // Common
    'common.home': 'Home',
    'common.appointments': 'Appointments',
    'common.records': 'Records',
    'common.profile': 'Profile',
    'common.search': 'Search',
    'common.book': 'Book',
    'common.cancel': 'Cancel',
    'common.reschedule': 'Reschedule',
    'common.viewDetails': 'View Details',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Appointments
    'appointments.title': 'Appointments',
    'appointments.upcoming': 'Upcoming',
    'appointments.completed': 'Completed',
    'appointments.cancelled': 'Cancelled',
    'appointments.all': 'All',
    'appointments.noAppointments': 'No appointments found',
    'appointments.bookNew': 'Book New Appointment',
    'appointments.nearestVisit': 'Nearest Visit',
    'appointments.confirmed': 'Confirmed',
    'appointments.joinCall': 'Join Call',
    'appointments.upcomingReminder': 'Upcoming Appointment',
    
    // Profile
    'profile.title': 'Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.medicalInfo': 'Medical Information',
    'profile.fullName': 'Full Name',
    'profile.age': 'Age',
    'profile.phoneNumber': 'Phone Number',
    'profile.location': 'Location',
    'profile.bloodGroup': 'Blood Group',
    'profile.allergies': 'Allergies',
    'profile.medicalConditions': 'Medical Conditions',
    'profile.emergencyContact': 'Emergency Contact',
    'profile.settings': 'Settings',
    'profile.notifications': 'Notifications',
    'profile.language': 'Language',
    'profile.privacySecurity': 'Privacy & Security',
    'profile.offlineMode': 'Offline Mode',
    'profile.needHelp': 'Need Help?',
    'profile.contactSupport': 'Contact Support',
    'profile.userGuide': 'User Guide',
    'profile.saveChanges': 'Save Changes',
    
    // Emergency
    'emergency.title': 'Emergency',
    'emergency.medicalEmergency': 'Medical Emergency',
    'emergency.callForHelp': 'Call for immediate medical assistance',
    'emergency.callAmbulance': 'Call 108 - Ambulance',
    'emergency.emergencySymptoms': 'Emergency Symptoms',
    'emergency.emergencyContacts': 'Emergency Contacts',
    'emergency.nearbyHospitals': 'Nearby Hospitals',
    'emergency.firstAidTips': 'Quick First Aid Tips',
    'emergency.notEmergency': 'Not an emergency?',
    'emergency.high': 'High',
    'emergency.medium': 'Medium',
    'emergency.low': 'Low',
    
    // Pharmacy
    'pharmacy.title': 'Pharmacy Lookup',
    'pharmacy.searchMedicine': 'Search for medicine or generic name',
    'pharmacy.commonMedicines': 'Common Medicines',
    'pharmacy.availableAt': 'Available at:',
    'pharmacy.medicineNotFound': 'Medicine not found',
    'pharmacy.notAvailable': '"{query}" is not available at nearby pharmacies',
    'pharmacy.searchAlternatives': 'Search Alternative Medicines',
    'pharmacy.contactDoctor': 'Contact Doctor for Prescription',
    'pharmacy.available': 'Available',
    'pharmacy.outOfStock': 'Out of Stock',
    'pharmacy.callPharmacy': 'Call Pharmacy',
    'pharmacy.getDirections': 'Get Directions',
    'pharmacy.offlineMode': 'Offline Mode',
    'pharmacy.cachedInfo': 'This information is cached for offline access',
    
    // Records
    'records.title': 'Health Records',
    'records.online': 'Online',
    'records.offline': 'Offline Mode',
    'records.allSynced': 'All records are synced',
    'records.viewingCached': 'Viewing cached records. Changes will sync when online.',
    'records.allRecords': 'All Records',
    'records.consultations': 'Consultations',
    'records.labTests': 'Lab Tests',
    'records.prescriptions': 'Prescriptions',
    'records.vaccinations': 'Vaccinations',
    'records.addNewRecord': 'Add New Record',
    'records.uploadDocument': 'Upload Document',
    'records.addNote': 'Add Note',
    'records.sync': 'Sync',
    'records.offlineNotice': 'You are viewing cached records',
    
    // AI Chat
    'aiChat.title': 'Health AI',
    'aiChat.active': 'Active',
    'aiChat.enterMessage': 'Enter message',
    'aiChat.aiGenerated': 'AI generated, not a substitute to professional medical advice',
    'aiChat.quickActions': 'Quick Actions',
    'aiChat.checkFever': 'Check Fever',
    'aiChat.throatPain': 'Throat Pain',
    'aiChat.stomachPain': 'Stomach Pain',
    'aiChat.talkToDoctor': 'Talk to Doctor',
    
    // Video Consult
    'videoConsult.title': 'Video Consultation',
    'videoConsult.connecting': 'Connecting to Doctor...',
    'videoConsult.pleaseWait': 'Please wait while we connect you',
    'videoConsult.consultationDetails': 'Consultation Details',
    'videoConsult.duration': 'Duration',
    'videoConsult.fee': 'Fee',
    'videoConsult.available': 'Available',
    'videoConsult.yourConcerns': 'Your Concerns',
    'videoConsult.describeSymptoms': 'Describe your symptoms or health concerns...',
    'videoConsult.quickSymptoms': 'Quick Symptoms',
    'videoConsult.startConsultation': 'Start Video Consultation',
    'videoConsult.connectionIssues': 'Having connection issues?',
    'videoConsult.tryAI': 'Try AI Assistant (Free)',
    'videoConsult.switchVoice': 'Switch to Voice Call',
    'videoConsult.technicalRequirements': 'Technical Requirements',
    'videoConsult.callDuration': 'Call Duration',
    'videoConsult.endCall': 'End Call',
    
    // Book Appointment
    'bookAppointment.title': 'Book Appointment',
    'bookAppointment.consultationFor': 'Consultation for:',
    'bookAppointment.specialty': 'Specialty',
    'bookAppointment.appointmentType': 'Appointment Type',
    'bookAppointment.videoConsult': 'Video Consult',
    'bookAppointment.connectInstantly': 'Connect instantly',
    'bookAppointment.physicalVisit': 'Physical Visit',
    'bookAppointment.atHospital': 'At Hospital',
    'bookAppointment.availableDoctors': 'Available Doctors',
    'bookAppointment.selectDate': 'Select Date',
    'bookAppointment.selectTime': 'Select Time',
    'bookAppointment.bookAppointment': 'Book Appointment',
    'bookAppointment.needImmediateHelp': 'Need immediate help?',
    'bookAppointment.tryAI': 'Try AI Assistant (Free)',
    'bookAppointment.switchVoice': 'Switch to Voice Call',
    'bookAppointment.technicalRequirements': 'Technical Requirements'
  },
  hi: {
    // Home page
    'home.title': 'नाभा हेल्थ',
    'home.greeting': 'नमस्ते, राजेश कुमार',
    'home.physicalAppointment': 'भौतिक अपॉइंटमेंट',
    'home.atHospital': 'अस्पताल में',
    'home.videoConsult': 'वीडियो कंसल्ट',
    'home.connectIn5Sec': '5 सेकंड में कनेक्ट',
    'home.medicines': 'दवाएं',
    'home.pharmacyDelivery': 'फार्मेसी डिलीवरी',
    'home.labTests': 'लैब टेस्ट',
    'home.homeCollection': 'घर से नमूना लेना',
    'home.surgeries': 'सर्जरी',
    'home.bookProcedure': 'प्रक्रिया बुक करें',
    'home.findDoctor': 'अपनी स्वास्थ्य समस्या के लिए डॉक्टर खोजें',
    'home.generalPhysician': 'सामान्य चिकित्सक',
    'home.skinHair': 'त्वचा और बाल',
    'home.womensHealth': 'महिला स्वास्थ्य',
    'home.dentalCare': 'दंत चिकित्सा',
    'home.childSpecialist': 'बाल रोग विशेषज्ञ',
    'home.ent': 'कान, नाक, गला',
    'home.mentalWellness': 'मानसिक स्वास्थ्य',
    'home.more': '20+ और',
    'home.askHealthAI': 'हेल्थ AI से पूछें',
    'home.free': 'मुफ्त',
    'home.queriesResolved': 'पिछले महीने 20000+ स्वास्थ्य प्रश्नों का समाधान',
    'home.emergency': 'आपातकाल',
    'home.call108': '108 पर कॉल करें',
    'home.pharmacy': 'फार्मेसी',
    'home.checkAvailability': 'उपलब्धता जांचें',
    
    // Common
    'common.home': 'होम',
    'common.appointments': 'अपॉइंटमेंट',
    'common.records': 'रिकॉर्ड',
    'common.profile': 'प्रोफाइल',
    'common.search': 'खोजें',
    'common.book': 'बुक करें',
    'common.cancel': 'रद्द करें',
    'common.reschedule': 'पुनर्निर्धारित करें',
    'common.viewDetails': 'विवरण देखें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.confirm': 'पुष्टि करें',
    'common.back': 'वापस',
    'common.next': 'आगे',
    'common.previous': 'पिछला',
    'common.close': 'बंद करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.yes': 'हाँ',
    'common.no': 'नहीं',
    
    // Appointments
    'appointments.title': 'अपॉइंटमेंट',
    'appointments.upcoming': 'आगामी',
    'appointments.completed': 'पूर्ण',
    'appointments.cancelled': 'रद्द',
    'appointments.all': 'सभी',
    'appointments.noAppointments': 'कोई अपॉइंटमेंट नहीं मिला',
    'appointments.bookNew': 'नया अपॉइंटमेंट बुक करें',
    'appointments.nearestVisit': 'निकटतम यात्रा',
    'appointments.confirmed': 'पुष्टि',
    'appointments.joinCall': 'कॉल में शामिल हों',
    'appointments.upcomingReminder': 'आगामी अपॉइंटमेंट',
    
    // Profile
    'profile.title': 'प्रोफाइल',
    'profile.personalInfo': 'व्यक्तिगत जानकारी',
    'profile.medicalInfo': 'चिकित्सा जानकारी',
    'profile.fullName': 'पूरा नाम',
    'profile.age': 'आयु',
    'profile.phoneNumber': 'फोन नंबर',
    'profile.location': 'स्थान',
    'profile.bloodGroup': 'रक्त समूह',
    'profile.allergies': 'एलर्जी',
    'profile.medicalConditions': 'चिकित्सा स्थितियां',
    'profile.emergencyContact': 'आपातकालीन संपर्क',
    'profile.settings': 'सेटिंग्स',
    'profile.notifications': 'सूचनाएं',
    'profile.language': 'भाषा',
    'profile.privacySecurity': 'गोपनीयता और सुरक्षा',
    'profile.offlineMode': 'ऑफलाइन मोड',
    'profile.needHelp': 'मदद चाहिए?',
    'profile.contactSupport': 'सहायता से संपर्क करें',
    'profile.userGuide': 'उपयोगकर्ता गाइड',
    'profile.saveChanges': 'परिवर्तन सहेजें',
    
    // Emergency
    'emergency.title': 'आपातकाल',
    'emergency.medicalEmergency': 'चिकित्सा आपातकाल',
    'emergency.callForHelp': 'तत्काल चिकित्सा सहायता के लिए कॉल करें',
    'emergency.callAmbulance': '108 - एम्बुलेंस पर कॉल करें',
    'emergency.emergencySymptoms': 'आपातकालीन लक्षण',
    'emergency.emergencyContacts': 'आपातकालीन संपर्क',
    'emergency.nearbyHospitals': 'निकटतम अस्पताल',
    'emergency.firstAidTips': 'त्वरित प्राथमिक चिकित्सा सुझाव',
    'emergency.notEmergency': 'आपातकाल नहीं?',
    'emergency.high': 'उच्च',
    'emergency.medium': 'मध्यम',
    'emergency.low': 'निम्न',
    
    // Pharmacy
    'pharmacy.title': 'फार्मेसी खोज',
    'pharmacy.searchMedicine': 'दवा या जेनेरिक नाम खोजें',
    'pharmacy.commonMedicines': 'सामान्य दवाएं',
    'pharmacy.availableAt': 'उपलब्ध है:',
    'pharmacy.medicineNotFound': 'दवा नहीं मिली',
    'pharmacy.notAvailable': '"{query}" निकटवर्ती फार्मेसियों में उपलब्ध नहीं है',
    'pharmacy.searchAlternatives': 'वैकल्पिक दवाएं खोजें',
    'pharmacy.contactDoctor': 'पर्चे के लिए डॉक्टर से संपर्क करें',
    'pharmacy.available': 'उपलब्ध',
    'pharmacy.outOfStock': 'स्टॉक में नहीं',
    'pharmacy.callPharmacy': 'फार्मेसी को कॉल करें',
    'pharmacy.getDirections': 'दिशा-निर्देश प्राप्त करें',
    'pharmacy.offlineMode': 'ऑफलाइन मोड',
    'pharmacy.cachedInfo': 'यह जानकारी ऑफलाइन एक्सेस के लिए कैश की गई है',
    
    // Records
    'records.title': 'स्वास्थ्य रिकॉर्ड',
    'records.online': 'ऑनलाइन',
    'records.offline': 'ऑफलाइन मोड',
    'records.allSynced': 'सभी रिकॉर्ड सिंक हो गए',
    'records.viewingCached': 'कैश किए गए रिकॉर्ड देख रहे हैं। ऑनलाइन होने पर परिवर्तन सिंक होंगे।',
    'records.allRecords': 'सभी रिकॉर्ड',
    'records.consultations': 'परामर्श',
    'records.labTests': 'लैब टेस्ट',
    'records.prescriptions': 'पर्चे',
    'records.vaccinations': 'टीकाकरण',
    'records.addNewRecord': 'नया रिकॉर्ड जोड़ें',
    'records.uploadDocument': 'दस्तावेज़ अपलोड करें',
    'records.addNote': 'नोट जोड़ें',
    'records.sync': 'सिंक',
    'records.offlineNotice': 'आप कैश किए गए रिकॉर्ड देख रहे हैं',
    
    // AI Chat
    'aiChat.title': 'हेल्थ AI',
    'aiChat.active': 'सक्रिय',
    'aiChat.enterMessage': 'संदेश दर्ज करें',
    'aiChat.aiGenerated': 'AI द्वारा उत्पन्न, पेशेवर चिकित्सा सलाह का विकल्प नहीं',
    'aiChat.quickActions': 'त्वरित क्रियाएं',
    'aiChat.checkFever': 'बुखार जांचें',
    'aiChat.throatPain': 'गले में दर्द',
    'aiChat.stomachPain': 'पेट दर्द',
    'aiChat.talkToDoctor': 'डॉक्टर से बात करें',
    
    // Video Consult
    'videoConsult.title': 'वीडियो परामर्श',
    'videoConsult.connecting': 'डॉक्टर से जुड़ रहे हैं...',
    'videoConsult.pleaseWait': 'कृपया प्रतीक्षा करें जब हम आपको जोड़ते हैं',
    'videoConsult.consultationDetails': 'परामर्श विवरण',
    'videoConsult.duration': 'अवधि',
    'videoConsult.fee': 'शुल्क',
    'videoConsult.available': 'उपलब्ध',
    'videoConsult.yourConcerns': 'आपकी चिंताएं',
    'videoConsult.describeSymptoms': 'अपने लक्षणों या स्वास्थ्य चिंताओं का वर्णन करें...',
    'videoConsult.quickSymptoms': 'त्वरित लक्षण',
    'videoConsult.startConsultation': 'वीडियो परामर्श शुरू करें',
    'videoConsult.connectionIssues': 'कनेक्शन की समस्या?',
    'videoConsult.tryAI': 'AI असिस्टेंट आजमाएं (मुफ्त)',
    'videoConsult.switchVoice': 'वॉयस कॉल पर स्विच करें',
    'videoConsult.technicalRequirements': 'तकनीकी आवश्यकताएं',
    'videoConsult.callDuration': 'कॉल अवधि',
    'videoConsult.endCall': 'कॉल समाप्त करें',
    
    // Book Appointment
    'bookAppointment.title': 'अपॉइंटमेंट बुक करें',
    'bookAppointment.consultationFor': 'परामर्श के लिए:',
    'bookAppointment.specialty': 'विशेषता',
    'bookAppointment.appointmentType': 'अपॉइंटमेंट प्रकार',
    'bookAppointment.videoConsult': 'वीडियो कंसल्ट',
    'bookAppointment.connectInstantly': 'तुरंत कनेक्ट करें',
    'bookAppointment.physicalVisit': 'भौतिक यात्रा',
    'bookAppointment.atHospital': 'अस्पताल में',
    'bookAppointment.availableDoctors': 'उपलब्ध डॉक्टर',
    'bookAppointment.selectDate': 'तारीख चुनें',
    'bookAppointment.selectTime': 'समय चुनें',
    'bookAppointment.bookAppointment': 'अपॉइंटमेंट बुक करें',
    'bookAppointment.needImmediateHelp': 'तत्काल मदद चाहिए?',
    'bookAppointment.tryAI': 'AI असिस्टेंट आजमाएं (मुफ्त)',
    'bookAppointment.switchVoice': 'वॉयस कॉल पर स्विच करें',
    'bookAppointment.technicalRequirements': 'तकनीकी आवश्यकताएं'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('hi'); // Default to Hindi for rural Punjab

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}



