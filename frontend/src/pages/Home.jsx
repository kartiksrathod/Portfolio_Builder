import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { FileText, Sparkles, Download, Save, Moon, Sun } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 dark:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Portfolio Builder</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button onClick={() => navigate('/builder')} className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight animate-slide-up">
              Build Your Professional
              <span className="block text-blue-600 dark:text-blue-400">Portfolio in Minutes</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Create a stunning portfolio that showcases your skills, experience, and projects.
              No coding required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/builder')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg px-8 py-6"
            >
              Start Building
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-lg dark:shadow-2xl transition-colors">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Powerful features to create a portfolio that stands out
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-4 p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 card-hover animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-900 dark:bg-gradient-to-br dark:from-blue-900 dark:to-slate-900 rounded-3xl p-12 text-center space-y-6 shadow-xl transition-all">
          <h3 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Build Your Portfolio?
          </h3>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Join thousands of professionals who have created their portfolios with our builder.
          </p>
          <Button 
            onClick={() => navigate('/builder')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg px-8 py-6"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600 dark:text-slate-400">
            © 2025 Portfolio Builder. Built with React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;