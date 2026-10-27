import React from 'react';
import { Shield, Globe, TrendingUp, CheckCircle, ArrowRight, Layers, Database, Github, MapPin } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/image/house.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6 text-white">About TokenPlatform</h1>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Real estate tokenization built by a blockchain engineer: smart contracts,
              backend services and a web frontend, designed with regulatory requirements in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-100 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                We want to make property investment more accessible by splitting ownership into
                tokens that can be bought in small amounts from anywhere in the world.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Blockchain tokenization enables fractional ownership and transparent, auditable
                transactions, with compliance and security treated as core requirements.
              </p>
              <div className="space-y-4">
                {[
                  'Make real estate investment accessible',
                  'Provide global market access',
                  'Build with regulatory compliance in mind',
                  'Prioritize secure smart contracts and wallets',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TODO: add a source link for each figure, or remove this card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Market Opportunity</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$3.5B</div>
                  <div className="text-sm text-gray-300">Estimated Market Size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">21%</div>
                  <div className="text-sm text-gray-300">Estimated Annual Growth</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$19.4B</div>
                  <div className="text-sm text-gray-300">Projected by 2033</div>
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Security First',
                description: 'Contracts written with security in mind: access controls, tested logic and clear audit trails',
                icon: Shield, bgColor: 'bg-blue-900/20', iconColor: 'text-blue-400',
              },
              {
                title: 'Compliance by Design',
                description: 'Built to accommodate KYC and jurisdiction-specific requirements as the platform grows',
                icon: Globe, bgColor: 'bg-green-900/20', iconColor: 'text-green-400',
              },
              {
                title: 'Transparency',
                description: 'Clear transactions, fees and platform operations, visible on-chain where possible',
                icon: CheckCircle, bgColor: 'bg-purple-900/20', iconColor: 'text-purple-400',
              },
              {
                title: 'Engineering Quality',
                description: 'Modern blockchain and web tooling, with continuous improvement',
                icon: TrendingUp, bgColor: 'bg-orange-900/20', iconColor: 'text-orange-400',
              },
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
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Founder</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Over six years of experience across blockchain and full-stack development
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30 text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                MS
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Moses Sechere</h3>
              <div className="text-blue-400 font-medium mb-2">Founder &amp; Lead Blockchain Engineer</div>
              <p className="text-gray-300 mb-4">
                Senior blockchain and full-stack developer working across multiple chains with
                Rust, Solidity, Go, Node.js, TypeScript and Next.js.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Abuja, Nigeria</span>
                <a href="https://github.com/sech444" target="_blank" rel="noopener noreferrer"
                   className="flex items-center hover:text-white transition-colors">
                  <Github className="w-4 h-4 mr-2" />sech444
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for security, scalability and compliance from the start
            </p>
          </div>

          {/* TODO: confirm the chain and stack below match what you actually ship */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Polygon Network', desc: 'Primary blockchain for fast, low-cost transactions', icon: Layers, color: 'text-purple-400', bgColor: 'bg-purple-900/20' },
              { name: 'Secure Wallets', desc: 'Multi-signature wallet support for platform funds', icon: Shield, color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
              { name: 'Compliance Ready', desc: 'Architecture designed for KYC and regulatory reporting', icon: Globe, color: 'text-green-400', bgColor: 'bg-green-900/20' },
              { name: 'REST APIs', desc: 'Backend services in Go and Node.js with PostgreSQL', icon: Database, color: 'text-orange-400', bgColor: 'bg-orange-900/20' },
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
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Explore tokenized real estate investment, or get in touch to talk about the platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
