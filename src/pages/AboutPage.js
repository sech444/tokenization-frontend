import React from 'react';
import { Shield, Globe, TrendingUp, Users, Building, DollarSign, 
         CheckCircle, ArrowRight, Star, Award, Layers, Database } from 'lucide-react';

const AboutPage = () => {
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
              About TokenPlatform
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Pioneering the future of real estate investment through blockchain technology, 
              enterprise-grade security, and global regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-100 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                We're democratizing real estate investment by breaking down traditional barriers 
                and making property ownership accessible to everyone, anywhere in the world.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Through blockchain tokenization, we enable fractional ownership, instant liquidity, 
                and transparent transactions while maintaining the highest standards of security and compliance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Democratize real estate investment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Provide global market access</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Ensure regulatory compliance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Maintain enterprise security</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$3.5B</div>
                  <div className="text-sm text-gray-300">Current Market Size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">21%</div>
                  <div className="text-sm text-gray-300">Annual Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$19.4B</div>
                  <div className="text-sm text-gray-300">Projected by 2033</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">15%</div>
                  <div className="text-sm text-gray-300">Market Penetration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Security First",
                description: "Bank-grade security with multi-signature wallets, HSM integration, and comprehensive audit trails",
                icon: Shield,
                bgColor: "bg-blue-900/20",
                iconColor: "text-blue-400"
              },
              {
                title: "Global Compliance",
                description: "Full regulatory compliance across Australia, USA, and international jurisdictions",
                icon: Globe,
                bgColor: "bg-green-900/20",
                iconColor: "text-green-400"
              },
              {
                title: "Transparency",
                description: "Complete transparency in all transactions, fees, and platform operations",
                icon: CheckCircle,
                bgColor: "bg-purple-900/20",
                iconColor: "text-purple-400"
              },
              {
                title: "Innovation",
                description: "Cutting-edge blockchain technology with continuous platform improvements",
                icon: TrendingUp,
                bgColor: "bg-orange-900/20",
                iconColor: "text-orange-400"
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
                <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/30`}>
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry experts with decades of combined experience in real estate, 
              blockchain, and financial services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Co-Founder",
                background: "Former Goldman Sachs VP, 15 years in real estate finance",
                initials: "SC",
                bgColor: "bg-blue-500"
              },
              {
                name: "Michael Rodriguez",
                role: "CTO & Co-Founder", 
                background: "Ex-ConsenSys blockchain architect, 12 years in fintech",
                initials: "MR",
                bgColor: "bg-green-500"
              },
              {
                name: "David Kim",
                role: "Head of Compliance",
                background: "Former ASIC regulator, expert in securities law",
                initials: "DK",
                bgColor: "bg-purple-500"
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
                <div className={`w-20 h-20 ${member.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold`}>
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{member.name}</h3>
                <div className="text-blue-400 font-medium mb-2">{member.role}</div>
                <p className="text-gray-300">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on enterprise-grade infrastructure with security, scalability, and compliance at the core
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Polygon Network", 
                desc: "Primary blockchain for fast, low-cost transactions", 
                icon: Layers,
                color: "text-purple-400",
                bgColor: "bg-purple-900/20"
              },
              { 
                name: "Multi-Sig Security", 
                desc: "Enterprise-grade wallet security with HSM integration", 
                icon: Shield,
                color: "text-blue-400",
                bgColor: "bg-blue-900/20"
              },
              { 
                name: "Global Compliance", 
                desc: "ASIC, SEC, FINRA compliant with automated reporting", 
                icon: Globe,
                color: "text-green-400",
                bgColor: "bg-green-900/20"
              },
              { 
                name: "Enterprise APIs", 
                desc: "RESTful APIs with institutional-grade performance", 
                icon: Database,
                color: "text-orange-400",
                bgColor: "bg-orange-900/20"
              }
            ].map((tech, index) => (
              <div key={index} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
                <div className={`${tech.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-600/30`}>
                  <tech.icon className={`w-8 h-8 ${tech.color}`} />
                </div>
                <h4 className="font-semibold text-gray-100 mb-2">{tech.name}</h4>
                <p className="text-sm text-gray-300">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join the Future?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Start your tokenized real estate investment journey today with enterprise-grade security and global compliance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Demo
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                SOC 2 Certified
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Bank-Grade Security
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Enterprise Ready
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage