'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'en' | 'hi';

type Dict = Record<string, Record<Lang, string>>;

const dict: Dict = {
  cookie_title: { en: 'We Care About Your Privacy', hi: 'हम आपकी निजता का ध्यान रखते हैं' },
  cookie_desc: {
    en: 'We use cookies to give you the best experience.',
    hi: 'हम बेहतर अनुभव के लिए कुकीज़ का उपयोग करते हैं।',
  },
  learn_more: { en: 'learn more', hi: 'और जानें' },
  ok: { en: 'OK', hi: 'ठीक' },
  who_we_are: { en: 'WHO WE ARE', hi: 'हम कौन हैं' },
  businesses: { en: 'BUSINESS', hi: 'व्यवसाय' },
  careers: { en: 'CAREERS', hi: 'करियर' },
  contact_us: { en: 'CONTACT US', hi: 'संपर्क करें' },
  change_language: { en: 'Language', hi: 'भाषा' },
  english: { en: 'English', hi: 'अंग्रेज़ी' },
  hindi: { en: 'Hindi', hi: 'हिन्दी' },
  
  // Hero Section
  since_2011: { en: 'Since 2011', hi: '2011 से' },
  shanky_group: { en: 'Shanky Group', hi: 'शंक्य ग्रुप' },
  excellence_in_every_sector: { en: 'Excellence in Every Sector', hi: 'हर क्षेत्र में उत्कृष्टता' },
  initializing: { en: 'Initializing', hi: 'प्रारंभ हो रहा है' },
  
  // About Section
  about_quote: { 
    en: 'To make B2B relationships simpler, smarter, and more successful. We started this because we believed businesses deserve partners who listen, deliver, and grow alongside them. At our core we value trust, transparency, and measurable impact. Every solution we design begins with your goals and ends with clear outcomes. We invest in technology, people, and processes so you can focus on what you do best—running your business—while we handle the complexity.',
    hi: 'B2B रिश्तों को आसान, स्मार्ट और अधिक सफल बनाने के लिए। हमने इसे इसलिए शुरू किया क्योंकि हम मानते हैं कि व्यवसायों को ऐसे साझेदारों के योग्य हैं जो सुनते हैं, प्रदान करते हैं, और उनके साथ बढ़ते हैं। हमारे मूल में हम विश्वास, पारदर्शिता, और मापने योग्य प्रभाव को महत्व देते हैं। हर समाधान जो हम डिज़ाइन करते हैं, आपके लक्ष्यों से शुरू होता है और स्पष्ट परिणामों के साथ समाप्त होता है। हम तकनीक, लोगों और प्रक्रियाओं में निवेश करते हैं ताकि आप अपना सर्वश्रेष्ठ काम कर सकें—अपना व्यवसाय चलाने पर ध्यान केंद्रित कर सकें—जबकि हम जटिलता को संभालते हैं।'
  },
  vipin_kumar: { en: 'Vipin Kumar', hi: 'विपिन कुमार' },
  managing_director: { en: 'Managing Director, Shanky Group', hi: 'प्रबंध निदेशक, शंक्य ग्रुप' },
  view_profile: { en: 'View Profile', hi: 'प्रोफाइल देखें' },
  
  // Contact Section
  you_have_questions: { en: 'You Have Questions', hi: 'आपके प्रश्न हैं' },
  we_have_answers: { en: 'We Have Answers', hi: 'हमारे पास उत्तर हैं' },
  contact_desc: { 
    en: 'Discover experiences you won\'t find anywhere else — thoughtfully designed to immerse you in the heart of the destination. Soulful stories waiting to be lived.',
    hi: 'अनुभवों की खोज करें जो आप कहीं और नहीं पाएंगे — विचारपूर्वक डिज़ाइन किए गए हैं जो आपको गंतव्य के दिल में डुबो दें। जीवंत कहानियाँ जीने का इंतज़ार कर रही हैं।'
  },
  location: { en: 'Location', hi: 'स्थान' },
  social_media: { en: 'Social Media', hi: 'सोशल मीडिया' },
  email: { en: 'Email', hi: 'ईमेल' },
  contact: { en: 'Contact', hi: 'संपर्क' },
  address: { 
    en: 'Unit no. 03 and 04, Ground floor, D-Mall, NSP New Delhi 110034',
    hi: 'यूनिट नं. 03 और 04, ग्राउंड फ्लोर, डी-मॉल, एनएसपी'
  },
  tell_us_what_you_need: { en: 'Tell Us Your Requirements', hi: 'हमें बताएं आपकी आवश्यकता क्या है' },
  team_ready: { 
    en: 'Our team is ready to assist you with every detail, big or small.',
    hi: 'हमारी टीम हर छोटी-बड़ी बात में आपकी सहायता के लिए तैयार है।'
  },
  // Vendor Registration (vender form only)
  vendor_heading_1: { en: 'Partner With Us', hi: 'हमारे साथ जुड़ें' },
  vendor_heading_2: { en: 'Register as a Vendor', hi: 'वेंडर के रूप में पंजीकरण करें' },
  vendor_desc: {
    en: 'Become part of Shanky Group\'s trusted vendor network. Share your company details and we\'ll review your application for potential business partnerships.',
    hi: 'शंक्य ग्रुप के विश्वसनीय वेंडर नेटवर्क का हिस्सा बनें। अपनी कंपनी का विवरण साझा करें और हम संभावित व्यावसायिक साझेदारी के लिए आपके आवेदन की समीक्षा करेंगे।'
  },
  vendor_form_title: { en: 'Vendor Registration', hi: 'वेंडर पंजीकरण' },
  vendor_form_subtitle: {
    en: 'Fill in your company and contact details. Our team will get back to you after reviewing your application.',
    hi: 'अपनी कंपनी और संपर्क विवरण भरें। आपके आवेदन की समीक्षा के बाद हमारी टीम आपसे संपर्क करेगी।'
  },
  first_name: { en: 'First Name', hi: 'पहला नाम' },
  last_name: { en: 'Last Name', hi: 'अंतिम नाम' },
  country: { en: 'Country', hi: 'देश' },
  state: { en: 'State', hi: 'राज्य' },
  phone_number: { en: 'Phone Number', hi: 'फ़ोन नंबर' },
  email_address: { en: 'Email Address', hi: 'ईमेल पता' },
  type_of_inquiry: { en: 'Type of Inquiry', hi: 'पूछताछ का प्रकार' },
  message: { en: 'Message', hi: 'संदेश' },
  general: { en: 'General', hi: 'सामान्य' },
  query: { en: 'Query', hi: 'प्रश्न' },
  vendorregistration: { en: 'Vendor Registration', hi: 'वेंडर पंजीकरण' },
  booking: { en: 'Booking', hi: 'बुकिंग' },
  wedding: { en: 'Wedding', hi: 'शादी' },
  corporate: { en: 'Corporate', hi: 'कॉर्पोरेट' },
  others: { en: 'Others', hi: 'अन्य' },
  exclusive_offers: { 
    en: 'I\'d like to receive exclusive offers and updates',
    hi: 'मैं अनन्य ऑफ़र और अपडेट प्राप्त करना चाहूंगा'
  },
  submitting: { en: 'Submitting...', hi: 'सबमिट हो रहा है...' },
  submit: { en: 'Submit', hi: 'सबमिट करें' },
  thank_you: { en: 'Thank You!', hi: 'धन्यवाद!' },
  message_sent: { 
    en: 'Your message has been sent successfully.',
    hi: 'आपका संदेश सफलतापूर्वक भेजा गया है।'
  },
  
  // Company names for hero slider
  shanky_financial_services: { en: 'SHANKY FINANCIAL SERVICES PVT LTD', hi: 'शंक्य फाइनेंशियल सर्विसेज प्राइवेट लिमिटेड' },
  vms_hub: { en: 'VMS HUB PVT LTD', hi: 'वीएमएस हब प्राइवेट लिमिटेड' },
  shanky_smart_tech: { en: 'SHANKY SMART TECH PVT LTD', hi: 'शंक्य स्मार्ट टेक प्राइवेट लिमिटेड' },
  shanky_corporate_training: { en: 'SHANKY CORPORATE TRAINING PVT LTD', hi: 'शंक्य कॉर्पोरेट ट्रेनिंग प्राइवेट लिमिटेड' },
  shanky_buildtech: { en: 'SHANKY BUILDTECH PVT LTD', hi: 'शंक्य बिल्डटेक प्राइवेट लिमिटेड' },
  shanky_metals: { en: 'SHANKY METALS PVT LTD', hi: 'शंक्य मेटल्स प्राइवेट लिमिटेड' },
  
  // Footer Section
  footer_description: { 
    en: 'Shanky Group embodies vision, diversification, and operational excellence. Our portfolio spans financial services, food, electronics, solar EPC, education, construction, and metals—positioning us for India\'s growth and global opportunities. We remain committed to ethical practices, innovation, and sustainable value for all stakeholders.',
    hi: 'शंक्य ग्रुप दृष्टि, विविधीकरण और परिचालन उत्कृष्टता का प्रतीक है। हमारे पोर्टफोलियो में वित्तीय सेवाएं, खाद्य, इलेक्ट्रॉनिक्स, सोलर EPC, शिक्षा, निर्माण और धातु शामिल हैं। हम नैतिक व्यवहार, नवाचार और सभी हितधारकों के लिए स्थायी मूल्य के प्रति प्रतिबद्ध हैं।'
  },
  product: { en: 'Product', hi: 'उत्पाद' },
  features: { en: 'Features', hi: 'विशेषताएं' },
  pricing: { en: 'Pricing', hi: 'मूल्य निर्धारण' },
  solutions: { en: 'Solutions', hi: 'समाधान' },
  resources: { en: 'Resources', hi: 'संसाधन' },
  documentation: { en: 'Documentation', hi: 'दस्तावेज़ीकरण' },
  tutorials: { en: 'Tutorials', hi: 'ट्यूटोरियल' },
  blog: { en: 'Blog', hi: 'ब्लॉग' },
  support: { en: 'Support', hi: 'समर्थन' },
  company: { en: 'Company', hi: 'कंपनी' },
  about: { en: 'About', hi: 'हमारे बारे में' },
  about_us: { en: 'About Us', hi: 'हमारे बारे में' },
  mission_vision: { en: 'Mission & Vision', hi: 'मिशन और विजन' },
  leadership: { en: 'Leadership', hi: 'नेतृत्व' },
  compliance: { en: 'Compliance', hi: 'अनुपालन' },
  quick_links: { en: 'Quick Links', hi: 'त्वरित लिंक' },
  faq: { en: 'FAQ', hi: 'सामान्य प्रश्न' },
  sitemap: { en: 'Sitemap', hi: 'साइटमैप' },
  privacy_policy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  terms_of_service: { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
  cookie_settings: { en: 'Cookies Settings', hi: 'कुकीज़ सेटिंग्स' },
  all_rights_reserved: { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' },
  
  // Group of Companies Section
  group_of_companies: { en: 'Group of Companies', hi: 'कंपनियों का समूह' },
  group_description: { 
    en: "Shanky Group's diversified portfolio comprises six core companies, each operating as a distinct legal entity with specialized expertise and market presence. The Group's structure enables operational autonomy while fostering intercompany synergies and resource optimization.",
    hi: "शंक्य ग्रुप का विविध पोर्टफोलियो छह मुख्य कंपनियों से बना है, जिनमें से प्रत्येक विशेषज्ञता और बाजार उपस्थिति के साथ एक अलग कानूनी इकाई के रूप में काम करता है। समूह की संरचना परिचालन स्वायत्तता को सक्षम बनाती है साथ ही इंटरकंपनी सिनर्जी और संसाधन अनुकूलन को बढ़ावा देती है।"
  },
  learn_more_capital: { en: 'Learn More', hi: 'और अधिक जानें' },
  read_more_capital: { en: 'Read More', hi: 'और पढ़ें' },
  read_less_capital: { en: 'Read Less', hi: 'कम पढ़ें' },
  
  // Force For Good Section
  a_force: { en: 'A Force', hi: 'एक शक्ति' },
  for_good: { en: 'For Good', hi: 'अच्छाई के लिए' },
  click_to_read_more: { en: 'Click to Read More', hi: 'और पढ़ने के लिए क्लिक करें' },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const I18nContext = createContext<Ctx>({
  lang: 'en',
  setLang: (l: Lang) => {
    try {
      localStorage.setItem('lang', l);
    } catch {}
  },
  t: (key: keyof typeof dict) => dict[key]['en'],
});

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = (localStorage.getItem('lang') as Lang) || 'en';
    setLangState(saved);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'lang' && e.newValue) {
        setLangState(e.newValue as Lang);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const t = useMemo(() => {
    return (key: keyof typeof dict) => {
      const translation = dict[key];
      if (!translation) {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
      return translation[lang] || translation.en || key;
    };
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  return ctx;
}
