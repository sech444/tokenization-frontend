import React, { useState, useEffect } from 'react';
import { Shield, Zap, Globe, Lock, TrendingUp, Users, Building, DollarSign, 
         CheckCircle, ArrowRight, Star, Award, Layers, Database, 
         Smartphone, Wifi, BarChart3, Settings, Eye, Clock } from 'lucide-react';

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const heroFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with multi-signature wallets, HSM integration, and comprehensive audit trails"
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "ASIC, SEC, FINRA compliant with automated KYC/AML and regulatory reporting"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second transactions on Polygon with 99.95% uptime guarantee"
    }
  ];

  const coreFeatures = [
    {
      category: "Blockchain Infrastructure",
      icon: Layers,
      features: [
        {
          name: "Multi-Chain Support",
          description: "Primary deployment on Polygon with BNB Smart Chain backup for maximum reliability and cost efficiency",
          benefits: ["$0.001-0.01 gas fees", "2-3 second finality", "EVM compatible"]
        },
        {
          name: "Smart Contract Security",
          description: "OpenZeppelin foundation with CMTA Token standard implementation and formal verification",
          benefits: ["Multiple security audits", "Bug bounty programs", "Upgradeable proxy patterns"]
        },
        {
          name: "Enterprise Wallets",
          description: "Multi-signature wallets with hardware security module integration and threshold signatures",
          benefits: ["3-of-5 admin functions", "HSM key management", "Emergency pause functionality"]
        }
      ]
    },
    {
      category: "Regulatory Compliance",
      icon: Shield,
      features: [
        {
          name: "Global Licensing",
          description: "AFSL Category 1 in Australia, SEC/FINRA registration in USA with state-level compliance",
          benefits: ["Australian MIS registration", "US securities exemptions", "Cross-border operations"]
        },
        {
          name: "AML/KYC Automation",
          description: "Real-time identity verification with enhanced due diligence and sanctions screening",
          benefits: ["100-point ID verification", "AUSTRAC compliance", "OFAC sanctions screening"]
        },
        {
          name: "Privacy Protection",
          description: "GDPR compliant data processing with privacy by design and automated subject rights",
          benefits: ["Data minimization", "Consent management", "Right to be forgotten"]
        }
      ]
    },
    {
      category: "Trading & Liquidity",
      icon: TrendingUp,
      features: [
        {
          name: "Advanced Order Types",
          description: "Professional trading features including limit, market, stop-loss, and iceberg orders",
          benefits: ["MEV protection", "Dark pool trading", "Algorithmic trading API"]
        },
        {
          name: "Market Making",
          description: "Automated liquidity provision with dynamic pricing and institutional partnerships",
          benefits: ["Tight spreads", "Deep liquidity", "Market integrity controls"]
        },
        {
          name: "Fractional Investment",
          description: "Micro-investing capabilities with dust management and automatic reinvestment",
          benefits: ["$1 minimum investment", "Portfolio rebalancing", "Dividend distribution"]
        }
      ]
    },
    {
      category: "User Experience",
      icon: Users,
      features: [
        {
          name: "Multi-Platform Access",
          description: "Web, mobile, and API access with unified experience across all platforms",
          benefits: ["Responsive design", "Native mobile apps", "RESTful APIs"]
        },
        {
          name: "Institutional Tools",
          description: "Advanced portfolio management with risk analytics and reporting dashboards",
          benefits: ["Real-time analytics", "Custom reporting", "Risk management"]
        },
        {
          name: "Customer Support",
          description: "24/7 multilingual support with dedicated account managers for institutional clients",
          benefits: ["Live chat support", "Video onboarding", "Dedicated AM"]
        }
      ]
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Multi-Layer Security",
      description: "Enterprise-grade security with multiple layers of protection",
      details: [
        "Hardware Security Modules (HSM) for key generation and storage",
        "Multi-party computation (MPC) for distributed key management",
        "Time-locked governance with 48-hour minimum delays",
        "Emergency pause functionality with multi-sig activation"
      ]
    },
    {
      icon: Eye,
      title: "Real-Time Monitoring",
      description: "Continuous security monitoring and threat detection",
      details: [
        "24/7 SIEM monitoring with automated alerts",
        "Blockchain transaction monitoring for suspicious activity",
        "AI-powered fraud detection and prevention",
        "Incident response team with <15 minute response time"
      ]
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "Advanced data encryption and privacy protection",
      details: [
        "AES-256-GCM encryption at rest with key rotation",
        "TLS 1.3 for all communications with perfect forward secrecy",
        "GDPR compliant data processing with privacy by design",
        "Regular penetration testing and vulnerability assessments"
      ]
    }
  ];

  const complianceFeatures = [
    {
      region: "Australia",
      flag: "🇦🇺",
      licenses: ["AFSL Category 1", "MIS Registration", "AUSTRAC AML/CTF"],
      description: "Full Australian compliance for real estate and securities tokenization"
    },
    {
      region: "United States",
      flag: "🇺🇸",
      licenses: ["SEC Registration", "FINRA Membership", "State Licensing"],
      description: "Comprehensive US compliance for institutional and retail investors"
    },
    {
      region: "Global",
      flag: "🌍",
      licenses: ["GDPR Compliance", "Cross-Border Data", "International Standards"],
      description: "International compliance framework for global operations"
    }
  ];

  const performanceStats = [
    { label: "Transaction Speed", value: "2-3 seconds", icon: Zap },
    { label: "Uptime Guarantee", value: "99.95%", icon: Clock },
    { label: "Gas Fees", value: "$0.001-0.01", icon: DollarSign },
    { label: "Supported Assets", value: "Unlimited", icon: Building }
  ];

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
              Enterprise Tokenization Platform
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Production-ready platform for real estate and business tokenization with 
              enterprise-grade security, global compliance, and institutional features
            </p>
            
            {/* Hero Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {heroFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-left">
                  <feature.icon className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-200 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {performanceStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for enterprise-grade tokenization with institutional-level 
              security, compliance, and performance
            </p>
          </div>

          {coreFeatures.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              id={`category-${categoryIndex}`}
              data-animate
              className={`mb-16 transition-all duration-700 ${isVisible[`category-${categoryIndex}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center mb-8">
                <category.icon className="w-8 h-8 text-blue-400 mr-4" />
                <h3 className="text-2xl font-bold text-gray-100">{category.category}</h3>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
                    <h4 className="text-xl font-semibold text-gray-100 mb-4">{feature.name}</h4>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Enterprise Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bank-grade security architecture with multiple layers of protection, 
              real-time monitoring, and comprehensive audit trails
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-100 mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Global Regulatory Compliance
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive regulatory framework covering Australia, USA, and international 
              requirements with automated compliance monitoring
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {complianceFeatures.map((region, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
                <div className="text-center">
                  <div className="text-4xl mb-4">{region.flag}</div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">{region.region}</h3>
                  <p className="text-gray-300 mb-6">{region.description}</p>
                  
                  <div className="space-y-2">
                    {region.licenses.map((license, licenseIndex) => (
                      <div key={licenseIndex} className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {license}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on proven enterprise technologies with scalability, security, 
              and performance at the core
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Polygon Network", desc: "Primary blockchain", icon: Layers, color: "text-purple-400", bgColor: "bg-purple-900/20" },
              { name: "OpenZeppelin", desc: "Smart contract framework", icon: Shield, color: "text-blue-400", bgColor: "bg-blue-900/20" },
              { name: "IPFS Storage", desc: "Decentralized data storage", icon: Database, color: "text-green-400", bgColor: "bg-green-900/20" },
              { name: "Chainlink Oracles", desc: "Real-world data feeds", icon: Wifi, color: "text-orange-400", bgColor: "bg-orange-900/20" },
              { name: "React/Next.js", desc: "Modern web framework", icon: Smartphone, color: "text-blue-400", bgColor: "bg-blue-900/20" },
              { name: "Rust API", desc: "Fast and secure backend", icon: Settings, color: "text-red-400", bgColor: "bg-red-900/20" },
              { name: "PostgreSQL", desc: "Enterprise database", icon: Database, color: "text-indigo-400", bgColor: "bg-indigo-900/20" },
              { name: "Redis Cache", desc: "High-performance caching", icon: Zap, color: "text-yellow-400", bgColor: "bg-yellow-900/20" }
            ].map((tech, index) => (
              <div key={index} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
                <div className={`${tech.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-600/30`}>
                  <tech.icon className={`w-8 h-8 ${tech.color}`} />
                </div>
                <h4 className="font-semibold text-gray-100 mb-1">{tech.name}</h4>
                <p className="text-sm text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-100 mb-6">
                Massive Market Opportunity
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                The real estate tokenization market is experiencing explosive growth, 
                presenting unprecedented opportunities for investors and developers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">21% Annual Growth</h3>
                    <p className="text-gray-300">Market expanding from $3.5B to $19.4B by 2033</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">$3 Trillion by 2030</h3>
                    <p className="text-gray-300">15% of global real estate AUM will be tokenized</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Global Accessibility</h3>
                    <p className="text-gray-300">Breaking down barriers to real estate investment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-400 mb-2">$19.4B</div>
                <div className="text-lg text-gray-300 mb-6">Market Size by 2033</div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">2024 Market Size</span>
                    <span className="font-semibold text-white">$3.5B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Growth Rate</span>
                    <span className="font-semibold text-green-400">21%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Market Penetration</span>
                    <span className="font-semibold text-white">15% by 2030</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Real Estate Investment?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Join the future of real estate tokenization with enterprise-grade security, 
              global compliance, and institutional features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Demo
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View Documentation
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

export default FeaturesPage;