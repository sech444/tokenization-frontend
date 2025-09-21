

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { InlineSpinner } from '../components/common/LoadingSpinner';
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, Calendar, Globe, Shield, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    user_type: '', first_name: '', last_name: '', username: '', email: '', password: '', confirm_password: '',
    phone: '', nationality: '', date_of_birth: '', address: '', agree_terms: false, agree_kyc: false
  });

  const [errors, setErrors] = useState({});

  const userTypes = [
    { value: 'individual', label: 'Individual Investor', description: 'Personal investment account', icon: '👤' },
    { value: 'business', label: 'Business Entity', description: 'Corporate or institutional account', icon: '🏢' },
    { value: 'developer', label: 'Token Creator', description: 'Create and manage tokenization projects', icon: '⚡' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    if (stepNumber === 1 && !formData.user_type) newErrors.user_type = 'Account type is required';
    
    if (stepNumber === 2) {
      if (!formData.first_name) newErrors.first_name = 'First name is required';
      if (!formData.last_name) newErrors.last_name = 'Last name is required';
      if (!formData.username) newErrors.username = 'Username is required';
      else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
      
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) newErrors.email = 'Invalid email address';

      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) 
        newErrors.password = 'Password must contain uppercase, lowercase, number and special character';

      if (!formData.confirm_password) newErrors.confirm_password = 'Please confirm password';
      else if (formData.password !== formData.confirm_password) newErrors.confirm_password = 'Passwords do not match';
    }

    if (stepNumber === 3) {
      if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
      if (!formData.agree_terms) newErrors.agree_terms = 'You must agree to the terms';
      if (!formData.agree_kyc) newErrors.agree_kyc = 'KYC agreement is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep(step + 1); };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setLoading(true);
    
    try {
      // Format the data to match your backend API exactly (same as original)
      const registrationData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username || `${formData.first_name.toLowerCase()}${formData.last_name.toLowerCase()}${Math.floor(Math.random() * 1000)}`,
        phone: formData.phone || null,
        nationality: formData.nationality || null,
        date_of_birth: formData.date_of_birth || null,
        address: formData.address || null,
        user_type: formData.user_type
      };

      const result = await registerUser(registrationData);
      
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-gray-300">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-blue-300 hover:text-blue-200 font-semibold transition-colors hover:underline">
              Sign in here
            </button>
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className={`flex items-center ${step >= stepNum ? 'text-blue-300' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:block">
                    {stepNum === 1 && 'Account Type'}{stepNum === 2 && 'Personal Info'}{stepNum === 3 && 'Additional Info'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-white mb-4">Select Account Type</label>
                <div className="space-y-3">
                  {userTypes.map((type) => (
                    <button key={type.value} onClick={() => handleInputChange('user_type', type.value)}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        formData.user_type === type.value 
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-white' 
                          : 'border-white border-opacity-20 hover:border-opacity-40 text-white hover:text-white'
                      }`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <h3 className="font-semibold">{type.label}</h3>
                          <p className="text-sm opacity-80 text-white">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.user_type && <p className="mt-2 text-red-300 text-sm">{errors.user_type}</p>}
              </div>
              <div className="flex justify-end">
                <button onClick={handleNext} disabled={!formData.user_type}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <span>Continue</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">First Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={formData.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter first name" />
                  </div>
                  {errors.first_name && <p className="text-red-300 text-sm mt-1">{errors.first_name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Last Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={formData.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter last name" />
                  </div>
                  {errors.last_name && <p className="text-red-300 text-sm mt-1">{errors.last_name}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Username *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter username" />
                </div>
                {errors.username && <p className="text-red-300 text-sm mt-1">{errors.username}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter email address" />
                </div>
                {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showConfirmPassword ? "text" : "password"} value={formData.confirm_password} onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm password" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirm_password && <p className="text-red-300 text-sm mt-1">{errors.confirm_password}</p>}
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)}
                  className="px-6 py-2 bg-white bg-opacity-20 text-gray-200 rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" /><span>Previous</span>
                </button>
                <button onClick={handleNext}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <span>Continue</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1234567890" />
                </div>
                {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Nationality</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={formData.nationality} onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="US" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="date" value={formData.date_of_birth} onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} rows="3"
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="123 Main St, City, State, Country" />
                </div>
              </div>
              <div className="bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />KYC Requirements
                </h3>
                <p className="text-sm text-gray-300">
                  To comply with regulations, you'll need to complete identity verification after registration.
                  This includes providing government-issued ID and proof of address.
                </p>
              </div>
              <div className="space-y-4">
                <label className="flex items-start">
                  <input type="checkbox" checked={formData.agree_terms} onChange={(e) => handleInputChange('agree_terms', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 bg-white bg-opacity-10 border-white border-opacity-20" />
                  <span className="ml-3 text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-blue-300 hover:text-blue-200 underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-300 hover:text-blue-200 underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.agree_terms && <p className="text-red-300 text-sm">{errors.agree_terms}</p>}
                <label className="flex items-start">
                  <input type="checkbox" checked={formData.agree_kyc} onChange={(e) => handleInputChange('agree_kyc', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 bg-white bg-opacity-10 border-white border-opacity-20" />
                  <span className="ml-3 text-sm text-gray-300">
                    I understand that I will need to complete KYC verification to access all platform features
                  </span>
                </label>
                {errors.agree_kyc && <p className="text-red-300 text-sm">{errors.agree_kyc}</p>}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(2)}
                  className="px-6 py-2 bg-white bg-opacity-20 text-gray-200 rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" /><span>Previous</span>
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  className="px-8 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2">
                  {loading ? (
                    <><InlineSpinner size="sm" color="white" /><span>Creating Account...</span></>
                  ) : (
                    <><span>Create Account</span><Check className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-white text-xs flex items-center justify-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Your data is secured with end-to-end encryption</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;