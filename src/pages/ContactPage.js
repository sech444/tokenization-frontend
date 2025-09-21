import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-lg text-gray-300 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <div className="animate-pulse text-gray-400">
            Redirecting in a few seconds...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/image/house.jpg')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6 text-white">
              Contact Us
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Get in touch with our team for questions, partnerships, or enterprise solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 mb-2">Email</h3>
                    <p className="text-gray-300 mb-1">support@tokenplatform.com</p>
                    <p className="text-gray-300">partnerships@tokenplatform.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 mb-2">Phone</h3>
                    <p className="text-gray-300 mb-1">Australia: +61 2 9XXX XXXX</p>
                    <p className="text-gray-300">USA: +1 (XXX) XXX-XXXX</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 mb-2">Offices</h3>
                    <p className="text-gray-300 mb-1">Sydney, Australia</p>
                    <p className="text-gray-300">New York, USA</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 mb-2">Business Hours</h3>
                    <p className="text-gray-300 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">24/7 Support Available</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Follow Us</h3>
                <div className="flex gap-4 flex-wrap">
                  {['LinkedIn', 'Twitter', 'Medium', 'Telegram'].map((social) => (
                    <button key={social} className="border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
                      {social}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-100 mb-6">Common Questions</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <h4 className="font-semibold text-gray-100 mb-2">How do I get started?</h4>
                    <p className="text-gray-300 text-sm">
                      Simply register for an account, complete our KYC process, and you can start investing with as little as $1.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <h4 className="font-semibold text-gray-100 mb-2">Is the platform secure?</h4>
                    <p className="text-gray-300 text-sm">
                      Yes, we use bank-grade security with multi-signature wallets, HSM integration, and comprehensive audit trails.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <h4 className="font-semibold text-gray-100 mb-2">What are the fees?</h4>
                    <p className="text-gray-300 text-sm">
                      Transaction fees are typically $0.001-0.01 on our Polygon network. No hidden fees or monthly charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700/30">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Send us a Message</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="company">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="subject">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="support">Technical Support</option>
                    <option value="media">Media & Press</option>
                    <option value="investment">Investment Questions</option>
                    <option value="compliance">Compliance & Legal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                
                <p className="text-sm text-gray-400 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Contact Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Looking for institutional-grade solutions? Our enterprise team is here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
              <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/30">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-100 mb-2">Enterprise Sales</h3>
              <p className="text-gray-300 mb-4">Custom solutions for large organizations</p>
              <button className="border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
                Contact Sales Team
              </button>
            </div>

            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
              <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/30">
                <Phone className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-100 mb-2">Partnership Team</h3>
              <p className="text-gray-300 mb-4">Strategic partnerships and integrations</p>
              <button className="border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
                Discuss Partnership
              </button>
            </div>

            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
              <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/30">
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-100 mb-2">Regional Offices</h3>
              <p className="text-gray-300 mb-4">Local support in Australia and USA</p>
              <button className="border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
                Find Local Office
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;