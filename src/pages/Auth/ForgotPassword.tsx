import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEmailSent(true);
      setMessage({ 
        type: 'success', 
        text: 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'حدث خطأ أثناء إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">استعادة كلمة المرور</h1>
              <p className="text-gray-600">
                {!isEmailSent 
                  ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط استعادة كلمة المرور'
                  : 'تحقق من بريدك الإلكتروني واتبع التعليمات'
                }
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 ml-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 ml-2" />
                )}
                {message.text}
              </div>
            )}

            {!isEmailSent ? (
              /* Reset Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      required
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  {isLoading ? 'جاري الإرسال...' : 'إرسال رابط الاستعادة'}
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">تم إرسال البريد الإلكتروني!</h3>
                  <p className="text-gray-600 mb-4">
                    لقد أرسلنا رابط استعادة كلمة المرور إلى:
                  </p>
                  <p className="font-medium text-blue-600 bg-blue-50 py-2 px-4 rounded-lg">
                    {email}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-right">
                  <h4 className="font-medium text-yellow-800 mb-2">تعليمات مهمة:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• تحقق من صندوق الوارد وصندوق الرسائل المزعجة</li>
                    <li>• الرابط صالح لمدة 24 ساعة فقط</li>
                    <li>• إذا لم تستلم البريد خلال 5 دقائق، جرب مرة أخرى</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                    setMessage(null);
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  إرسال إلى بريد آخر
                </button>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link 
                to="/auth/login" 
                className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
              >
                <ArrowLeft className="h-4 w-4 ml-1" />
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-medium text-gray-900 mb-2">تحتاج مساعدة؟</h3>
            <p className="text-sm text-gray-600 mb-4">
              إذا كنت تواجه مشاكل في استعادة كلمة المرور، تواصل معنا
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                📧 البريد الإلكتروني: <span className="text-blue-600">support@reports.com</span>
              </p>
              <p className="text-gray-600">
                📞 الهاتف: <span className="text-blue-600">920001234</span>
              </p>
              <p className="text-gray-600">
                🕒 أوقات العمل: الأحد - الخميس (9ص - 6م)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;