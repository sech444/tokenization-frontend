import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Shield, Globe, Users, Building, Coins, DollarSign, Activity, CheckCircle, ArrowRight, Play } from 'lucide-react';

const ProfessionalHomepage = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTokens: 0,
    totalValue: 0,
    activeUsers: 0
  });
  const [marketData, setMarketData] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalProjects: 156,
        totalTokens: 2847,
        totalValue: 12500000,
        activeUsers: 1234
      });

      setMarketData([
        { month: 'Jan', value: 4000000, volume: 240, growth: 12 },
        { month: 'Feb', value: 5200000, volume: 320, growth: 18 },
        { month: 'Mar', value: 4800000, volume: 280, growth: 8 },
        { month: 'Apr', value: 6100000, volume: 380, growth: 25 },
        { month: 'May', value: 7300000, volume: 450, growth: 32 },
        { month: 'Jun', value: 8900000, volume: 520, growth: 28 },
        { month: 'Jul', value: 10200000, volume: 610, growth: 35 },
        { month: 'Aug', value: 11800000, volume: 680, growth: 42 },
        { month: 'Sep', value: 10900000, volume: 590, growth: 38 },
        { month: 'Oct', value: 12100000, volume: 720, growth: 45 },
        { month: 'Nov', value: 11700000, volume: 650, growth: 40 },
        { month: 'Dec', value: 12500000, volume: 780, growth: 48 }
      ]);

      setProjectTypes([
        { name: 'Real Estate', value: 45, color: '#3B82F6' },
        { name: 'Art & Collectibles', value: 25, color: '#10B981' },
        { name: 'Commodities', value: 15, color: '#F59E0B' },
        { name: 'Startups', value: 10, color: '#EF4444' },
        { name: 'Others', value: 5, color: '#8B5CF6' }
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading TokenPlatform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">


        {/* Hero Section */}
  <section className="pt-16 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
    {/* Background Image with Overlay */}
    <div 
      className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/image/house.jpg')`
      }}
    ></div>
    
    {/* Additional Gradient Overlay to ensure readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Next-Generation Asset Tokenization
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Transform Assets into
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Digital Tokens</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Unlock liquidity, enable fractional ownership, and democratize access to high-value assets through our secure blockchain platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center backdrop-blur-sm">
              Start Tokenizing
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">$12.5B+</div>
              <div className="text-sm text-gray-400">Assets Secured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">50K+</div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
          </div>
        </div>

        {/* Right Content - Dashboard Preview */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Live Platform Metrics</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{formatNumber(stats.totalProjects)}</div>
                <div className="text-sm text-gray-300">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalValue)}</div>
                <div className="text-sm text-gray-300">Total Value</div>
              </div>
            </div>
            
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData.slice(-6)}>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#60A5FA" 
                    fill="rgba(96, 165, 250, 0.2)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                value: stats.totalProjects, 
                label: 'Active Projects', 
                icon: Building, 
                color: 'text-blue-400',
                bgColor: 'bg-blue-900/20'
              },
              { 
                value: stats.totalTokens, 
                label: 'Tokens Created', 
                icon: Coins, 
                color: 'text-green-400',
                bgColor: 'bg-green-900/20'
              },
              { 
                value: stats.totalValue, 
                label: 'Total Value Locked', 
                icon: DollarSign, 
                color: 'text-purple-400',
                bgColor: 'bg-purple-900/20',
                isCurrency: true
              },
              { 
                value: stats.activeUsers, 
                label: 'Active Users', 
                icon: Users, 
                color: 'text-orange-400',
                bgColor: 'bg-orange-900/20'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-600/30">
                <div className="flex items-center">
                  <div className={`${stat.bgColor} p-3 rounded-lg border border-gray-600/30`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-100">
                      {stat.isCurrency ? formatCurrency(stat.value) : formatNumber(stat.value)}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 mb-4">
              Why Choose TokenPlatform?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience enterprise-grade security, seamless user experience, and comprehensive tools for asset tokenization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Security",
                description: "Military-grade encryption and multi-layer security protocols protect your digital assets with bank-level security standards.",
                icon: Shield,
                color: "text-blue-400",
                bgColor: "bg-blue-900/20"
              },
              {
                title: "Global Accessibility",
                description: "Access your tokenized assets from anywhere in the world with 24/7 availability and cross-border transaction support.",
                icon: Globe,
                color: "text-green-400",
                bgColor: "bg-green-900/20"
              },
              {
                title: "Smart Analytics",
                description: "Advanced analytics and real-time reporting help you make informed decisions with comprehensive market insights.",
                icon: TrendingUp,
                color: "text-purple-400",
                bgColor: "bg-purple-900/20"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 hover:shadow-lg transition-shadow rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-600/30`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 mb-4">
              Platform Performance
            </h2>
            <p className="text-xl text-gray-300">
              Real-time insights into our growing ecosystem and market trends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Market Growth Chart */}
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30">
              <h3 className="text-lg font-semibold text-gray-100 mb-6">Market Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tickFormatter={(value) => `${value / 1000000}M`} tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Total Value']}
                    labelStyle={{ color: '#F9FAFB' }}
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                      color: '#F9FAFB'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    fill="rgba(59, 130, 246, 0.2)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Project Distribution */}
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/30">
              <h3 className="text-lg font-semibold text-gray-100 mb-6">Asset Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Share']}
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                      color: '#F9FAFB'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {projectTypes.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                    <span className="text-sm text-gray-300">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Assets?
          </h2>
              Get Started Free
          <p className="text-gray-300 text-xl mb-8 opacity-90">
            Join thousands of users who have already tokenized over $12.5B in assets. 
            Start your tokenization journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Demo
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm opacity-80">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              24/7 support
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Enterprise security
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ProfessionalHomepage;