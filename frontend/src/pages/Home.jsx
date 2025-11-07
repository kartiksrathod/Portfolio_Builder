import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FileText, Sparkles, Download, Save } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Easy Form Builder',
      description: 'Fill out simple forms to add your personal info, experience, education, skills, and projects.'
    },
    {
      icon: Sparkles,
      title: 'Live Preview',
      description: 'See your portfolio come to life in real-time as you edit. What you see is what you get.'
    },
    {
      icon: Download,
      title: 'Export as PDF',
      description: 'Download your professional portfolio as a polished PDF ready to share with employers.'
    },
    {
      icon: Save,
      title: 'Save & Resume',
      description: 'Your work is automatically saved. Come back anytime to update your portfolio.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Portfolio Builder</h1>
            </div>
            <Button onClick={() => navigate('/builder')} className="bg-slate-900 hover:bg-slate-800">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
              Build Your Professional
              <span className="block text-blue-600">Portfolio in Minutes</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto">
              Create a stunning portfolio that showcases your skills, experience, and projects.
              No coding required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/builder')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            >
              Start Building
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-slate-300 hover:bg-slate-100"
            >
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white rounded-3xl shadow-sm">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need
          </h3>
          <p className="text-lg text-slate-600">
            Powerful features to create a portfolio that stands out
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4 p-6 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900">{feature.title}</h4>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-900 rounded-3xl p-12 text-center space-y-6">
          <h3 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Build Your Portfolio?
          </h3>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Join thousands of professionals who have created their portfolios with our builder.
          </p>
          <Button 
            onClick={() => navigate('/builder')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600">
            © 2025 Portfolio Builder. Built with React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;