import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  HelpCircle, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Crown,
  Rocket,
  Building,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  Award
} from 'lucide-react';
const Home: React.FC = () => {
  const { lang } = useLanguage();
  const tr = (ar: string, en: string) => (lang === 'ar' ? ar : en);
  return <div className="w-full min-h-[calc(100vh-4rem)] bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center bg-blue-500 bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4 mr-2" />
            {tr('الحل الأمثل لإدارة التقارير العقارية', 'The optimal solution for managing real estate reports')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {tr('نظام إدارة التقارير ', ' Reports Management System')}
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed">
            {tr('🚀 منصة متكاملة وذكية لإدارة وسحب وإرسال التقارير  بين الأنظمة المختلفة', '🚀 A smart, integrated platform to manage, pull, and send reports across systems')}
            <br />
            <span className="text-blue-200">{tr('بكفاءة عالية وسرعة فائقة', 'With high efficiency and blazing speed')}</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/auth/login" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center">
              <ArrowRight className="ml-2 h-5 w-5" />
              {tr('ابدأ باستخدام النظام الآن', 'Start using the system now')}
            </Link>
            <Link to="/help" className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors">
              {tr('تعلم المزيد', 'Learn more')}
            </Link>
          </div>
          <div className="flex justify-center items-center gap-8 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              {tr('أكثر من 1000+ مستخدم', '1000+ users')}
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              {tr('دعم فني 24/7', '24/7 support')}
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              {tr('أمان عالي', 'High security')}
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tr('لماذا تختار نظامنا؟', 'Why choose our system?')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tr('نقدم لك أفضل الحلول التقنية لإدارة تقارير العقارات بكفاءة واحترافية عالية', 'We provide the best technical solutions to manage real estate reports efficiently and professionally')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tr('سرعة فائقة ⚡', 'Lightning fast ⚡')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tr('سحب التقارير في ثوانٍ معدودة مع تقنيات متطورة توفر عليك ساعات من العمل', 'Pull reports in seconds with advanced technologies that save you hours of work')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tr('أمان عالي 🔒', 'High security 🔒')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tr('حماية متقدمة لبياناتك مع تشفير من الدرجة العسكرية وامتثال كامل للمعايير الدولية', 'Advanced data protection with military-grade encryption and full standards compliance')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tr('تكامل شامل 🌐', 'Comprehensive integration 🌐')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tr('يعمل مع جميع الأنظمة العقارية الرئيسية في المملكة مع واجهات برمجية متطورة', 'Works with all major real estate systems with advanced APIs')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tr('متاح 24/7 ⏰', 'Available 24/7 ⏰')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tr('خدمة مستمرة على مدار الساعة مع دعم فني متخصص لضمان عدم توقف عملك', 'Continuous service around the clock with specialized support to keep your work running')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {tr('الأنظمة المدعومة والشركاء', 'Supported systems & partners')}
            </h2>
            <p className="text-xl text-gray-600">
              {tr('نتكامل مع أفضل الأنظمة العقارية في المملكة', 'We integrate with top real estate systems in KSA')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">{tr('مقياس', 'Mekyas')}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{tr('نظام مقياس', 'Mekyas System')}</h3>
              <p className="text-sm text-gray-600 mt-1">{tr('تكامل كامل', 'Full integration')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">{tr('نقرة', 'Noqra')}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{tr('نظام نقرة', 'Noqra System')}</h3>
              <p className="text-sm text-gray-600 mt-1">{tr('دعم متقدم', 'Advanced support')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{tr('أنظمة أخرى', 'Other systems')}</h3>
              <p className="text-sm text-gray-600 mt-1">{tr('قريباً', 'Coming soon')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{tr('API مخصص', 'Custom API')}</h3>
              <p className="text-sm text-gray-600 mt-1">{tr('حسب الطلب', 'On demand')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">{tr('مستخدم نشط', 'Active users')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">{tr('تقرير تم سحبه', 'Reports pulled')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">{tr('وقت التشغيل', 'Uptime')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">{tr('دعم فني', 'Support')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tr('فوائد استخدام النظام', 'Benefits of using the system')}
            </h2>
            <p className="text-xl text-gray-600">
              {tr('اكتشف كيف يمكن لنظامنا أن يحول طريقة عملك', 'Discover how our system can transform your workflow')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tr('زيادة الإنتاجية بنسبة 300%', 'Increase productivity by 300%')}
                  </h3>
                  <p className="text-gray-600">
                    {tr('وفر ساعات من العمل اليدوي واستفد من الأتمتة الذكية', 'Save hours of manual work and benefit from smart automation')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tr('تعاون فريق محسن', 'Improved team collaboration')}
                  </h3>
                  <p className="text-gray-600">
                    {tr('شارك التقارير والبيانات مع فريقك بسهولة وأمان', 'Share reports and data with your team easily and securely')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tr('إدارة متقدمة للتقارير', 'Advanced reports management')}
                  </h3>
                  <p className="text-gray-600">
                    {tr('نظم وأرشف تقاريرك مع إمكانيات البحث والتصفية المتقدمة', 'Organize and archive your reports with advanced search and filtering')}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tr('جرب النظام مجاناً', 'Try the system for free')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tr('ابدأ رحلتك معنا اليوم واكتشف الفرق', 'Start your journey with us today and see the difference')}
                </p>
                <Link 
                  to="/auth/mekyas" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  {tr('ابدأ الآن مجاناً', 'Start now for free')}
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Plans Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-6">
              <Crown className="h-4 w-4 mr-2" />
              {tr('اختر الباقة المناسبة لك', 'Choose the right plan for you')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tr('باقات الاشتراك', 'Subscription plans')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tr('خطط مرنة تناسب احتياجاتك من الأفراد إلى الشركات الكبيرة', 'Flexible plans for individuals and enterprises')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">الباقة الأساسية</h3>
                <p className="text-gray-600 mb-6">مثالية للأفراد والشركات الصغيرة</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">299</span>
                  <span className="text-gray-600 mr-2">ريال/شهرياً</span>
                </div>

                <ul className="text-right space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('حتى 100 تقرير شهرياً', 'Up to 100 reports/month')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تكامل مع نظام مقياس', 'Integration with Mekyas')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('دعم فني عبر البريد الإلكتروني', 'Email support')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تخزين 5 جيجا', '5GB storage')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('مستخدم واحد', 'Single user')}</span>
                  </li>
                </ul>

                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  {tr('اختر هذه الباقة', 'Choose this plan')}
                </button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-500 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {tr('الأكثر شعبية', 'Most popular')}
                </span>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">الباقة الاحترافية</h3>
                <p className="text-gray-600 mb-6">الأفضل للشركات المتوسطة</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">599</span>
                  <span className="text-gray-600 mr-2">{tr('ريال/شهرياً', 'SAR/month')}</span>
                  <div className="text-sm text-green-600 font-medium">{tr('وفر 20% سنوياً', 'Save 20% annually')}</div>
                </div>

                <ul className="text-right space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('حتى 500 تقرير شهرياً', 'Up to 500 reports/month')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تكامل مع مقياس ونقرة', 'Integration with Mekyas & Noqra')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('دعم فني هاتفي ومباشر', 'Phone and live support')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تخزين 25 جيجا', '25GB storage')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('حتى 5 مستخدمين', 'Up to 5 users')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تقارير تحليلية متقدمة', 'Advanced analytics reports')}</span>
                  </li>
                </ul>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors">
                  {tr('اختر هذه الباقة', 'Choose this plan')}
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">باقة المؤسسات</h3>
                <p className="text-gray-600 mb-6">للشركات الكبيرة والمؤسسات</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">1299</span>
                  <span className="text-gray-600 mr-2">{tr('ريال/شهرياً', 'SAR/month')}</span>
                  <div className="text-sm text-green-600 font-medium">{tr('وفر 30% سنوياً', 'Save 30% annually')}</div>
                </div>

                <ul className="text-right space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تقارير غير محدودة', 'Unlimited reports')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تكامل مع جميع الأنظمة', 'Integration with all systems')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('مدير حساب مخصص', 'Dedicated account manager')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('تخزين غير محدود', 'Unlimited storage')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('مستخدمين غير محدود', 'Unlimited users')}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">{tr('API مخصص', 'Custom API')}</span>
                  </li>
                </ul>

                <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  {tr('تواصل معنا', 'Contact us')}
                </button>
              </div>
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              {tr('عرض محدود', 'Limited offer')}
            </div>
            <h3 className="text-2xl font-bold mb-2">{tr('🎉 احصل على شهر إضافي مجاناً!', '🎉 Get an extra month free!')}</h3>
            <p className="text-lg mb-4">عند الاشتراك السنوي في أي باقة</p>
            <p className="text-sm opacity-90">* العرض ساري حتى نهاية الشهر</p>
          </div>
        </div>
      </div>

      {/* Subscription Steps Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tr('خطوات الاشتراك السهلة', 'Easy subscription steps')}
            </h2>
            <p className="text-xl text-gray-600">
              {tr('ابدأ رحلتك معنا في 4 خطوات بسيطة', 'Start your journey with us in 4 simple steps')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tr('اختر الباقة', 'Choose a plan')}</h3>
              <p className="text-gray-600">
                {tr('حدد الباقة التي تناسب احتياجاتك وحجم عملك', 'Choose the plan that suits your needs and business size')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tr('أنشئ حسابك', 'Create your account')}</h3>
              <p className="text-gray-600">
                {tr('سجل بياناتك الأساسية وبيانات شركتك', 'Enter your basic details and company information')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tr('ادفع بأمان', 'Pay securely')}</h3>
              <p className="text-gray-600">
                {tr('اختر طريقة الدفع المناسبة واستكمل عملية الدفع الآمنة', 'Choose your payment method and complete a secure checkout')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tr('ابدأ الاستخدام', 'Start using')}</h3>
              <p className="text-gray-600">
                {tr('استمتع بجميع المميزات فوراً واحصل على التدريب المجاني', 'Enjoy all features instantly and get free training')}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/auth/login" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg text-lg"
            >
              {tr('ابدأ الاشتراك الآن', 'Start your subscription now')}
              <ArrowRight className="mr-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Methods & Support */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">طرق الدفع المتاحة</h3>
                <p className="text-gray-600">ادفع بالطريقة التي تناسبك</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">البطاقات الائتمانية</div>
                  <div className="text-xs text-gray-500">فيزا - ماستركارد</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">التحويل البنكي</div>
                  <div className="text-xs text-gray-500">جميع البنوك السعودية</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">STC Pay</div>
                  <div className="text-xs text-gray-500">دفع سريع وآمن</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">فواتير</div>
                  <div className="text-xs text-gray-500">للشركات والمؤسسات</div>
                </div>
              </div>
            </div>

            {/* Contact for Subscription */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">تحتاج مساعدة في الاختيار؟</h3>
                <p className="text-gray-600">تواصل مع فريق المبيعات المتخصص</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">اتصل بنا</div>
                    <div className="text-sm text-gray-600">920001234</div>
                    <div className="text-xs text-gray-500">من الأحد إلى الخميس 9ص - 6م</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">راسلنا</div>
                    <div className="text-sm text-gray-600">sales@reports-system.com</div>
                    <div className="text-xs text-gray-500">رد خلال ساعتين</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">احجز موعد</div>
                    <div className="text-sm text-gray-600">استشارة مجانية 30 دقيقة</div>
                    <div className="text-xs text-gray-500">لتحديد الباقة المناسبة</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link 
                  to="/support" 
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                >
                  تواصل مع فريق المبيعات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-gray-600">
              آراء حقيقية من عملاء راضين عن خدماتنا
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "نظام رائع وفر علينا ساعات من العمل اليدوي. السرعة والدقة مذهلة حقاً!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  أ
                </div>
                <div className="mr-4">
                  <div className="font-semibold text-gray-900">أحمد المالكي</div>
                  <div className="text-sm text-gray-600">مدير شركة عقارية</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "الدعم الفني ممتاز والنظام يعمل بكفاءة عالية. أنصح به بشدة لكل العاملين في العقارات."
              </p>
              <div className="flex items-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  ف
                </div>
                <div className="mr-4">
                  <div className="font-semibold text-gray-900">فاطمة الزهراني</div>
                  <div className="text-sm text-gray-600">مطورة عقارية</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "تكامل ممتاز مع أنظمتنا الحالية. حل مشاكل كثيرة كنا نواجهها يومياً."
              </p>
              <div className="flex items-center">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  م
                </div>
                <div className="mr-4">
                  <div className="font-semibold text-gray-900">محمد العتيبي</div>
                  <div className="text-sm text-gray-600">مدير تقني</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-white bg-opacity-20 w-20 h-20 rounded-full mb-8">
            <HelpCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            هل تحتاج للمساعدة؟
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            فريق الدعم الفني المتخصص متاح لمساعدتك على مدار الساعة
            <br />
            نحن هنا لضمان نجاحك وتحقيق أهدافك
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/support" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center"
            >
              تواصل مع الدعم الفني
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
            <Link 
              to="/help" 
              className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              مركز المساعدة
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;