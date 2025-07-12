import React from "react";
import { Link } from "react-router-dom";
import { useItems } from "../contexts/ItemContext";
import { useAuth } from "../contexts/AuthContext";
import ItemCard from "../components/ItemCard";
import {
  ArrowRight,
  Recycle,
  Users,
  Award,
  Sparkles,
  Heart,
  Zap,
  Globe,
  Star,
  TrendingUp,
  Shield,
  Leaf,
  Gift,
  Smartphone,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const { getFeaturedItems } = useItems();
  const { user } = useAuth();
  const featuredItems = getFeaturedItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-dark-base dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-primary-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center py-24 lg:py-40">
            <div className="animate-fade-in">
              <div className="inline-flex items-center space-x-3 bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/30 dark:border-white/20 px-6 py-3 rounded-full mb-12 shadow-2xl">
                <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
                <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Next-Gen Sustainable Fashion
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-8 font-display leading-none">
                <span className="block">ReWear</span>
                <span className="block text-gradient-primary mt-4">
                  Revolution
                </span>
              </h1>

              <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed font-light">
                Transform fashion consumption through intelligent swapping.
                <span className="block mt-2 text-gradient-secondary font-medium">
                  Discover, Exchange, Sustain.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
                {user ? (
                  <Link
                    to="/browse"
                    className="btn-primary text-xl px-12 py-6 inline-flex items-center group shadow-glow"
                  >
                    <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    Start Exploring
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="btn-primary text-xl px-12 py-6 inline-flex items-center group shadow-glow"
                  >
                    <Heart className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    Join Movement
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                )}
                {!user && (
                  <Link
                    to="/login"
                    className="btn-outline text-xl px-12 py-6 group"
                  >
                    <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    Sign In
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Verified Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <span>Carbon Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="container-custom relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "25K+",
                label: "Active Users",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: "150K+",
                label: "Items Swapped",
                icon: Recycle,
                color: "from-green-500 to-emerald-500",
              },
              {
                number: "98%",
                label: "Satisfaction",
                icon: Star,
                color: "from-yellow-500 to-orange-500",
              },
              {
                number: "5M+",
                label: "CO₂ Saved",
                icon: Leaf,
                color: "from-purple-500 to-pink-500",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="card-glass p-8 hover:scale-105 transition-all duration-300">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} p-4 shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <stat.icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-3 font-display">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-dark-base dark:to-gray-800"></div>
        <div className="container-custom relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 px-6 py-3 rounded-full mb-8">
              <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                How It Works
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 font-display">
              <span className="text-gradient-primary">Simple.</span>
              <span className="block">Sustainable.</span>
              <span className="block text-gradient-secondary">Smart.</span>
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light">
              Five revolutionary ways to transform your wardrobe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              {
                icon: Recycle,
                title: "Smart Swapping",
                description:
                  "AI-powered matching connects you with perfect swap partners based on style preferences and item compatibility.",
                gradient: "from-blue-500 to-cyan-500",
                delay: "0s",
              },
              {
                icon: Zap,
                title: "Instant Points",
                description:
                  "Earn ReWear points for every contribution. Use them to unlock premium items and exclusive collections.",
                gradient: "from-purple-500 to-pink-500",
                delay: "0.2s",
              },
              {
                icon: Globe,
                title: "Global Impact",
                description:
                  "Track your environmental impact in real-time. See how much CO₂ and water you've saved through sustainable choices.",
                gradient: "from-green-500 to-emerald-500",
                delay: "0.4s",
              },
              {
                icon: Gift,
                title: "Rewards System",
                description:
                  "Earn exclusive rewards and badges for your sustainable choices. Unlock special collections and premium features.",
                gradient: "from-orange-500 to-red-500",
                delay: "0.6s",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description:
                  "Seamless mobile experience with instant notifications, photo uploads, and real-time chat with swap partners.",
                gradient: "from-indigo-500 to-purple-500",
                delay: "0.8s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="card-glass p-10 h-full hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
                  <div
                    className={`w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-r ${feature.gradient} p-5 shadow-2xl group-hover:shadow-glow transition-all duration-300 relative z-10`}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-pink-500/5">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-display">
              <span className="text-gradient-primary">Trending</span> Items
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the most popular items in our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredItems.slice(0, 6).map((item) => (
              <div key={item.id} className="animate-fade-in">
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <div className="text-center">
            {user ? (
              <Link
                to="/browse"
                className="btn-primary text-lg px-10 py-4 inline-flex items-center group"
              >
                <Globe className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore All Items
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            ) : (
              <Link
                to="/signup"
                className="btn-primary text-lg px-10 py-4 inline-flex items-center group"
              >
                <Heart className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Join to Explore
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container-custom relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-display">
              Ready to
              <span className="block text-yellow-300">ReWear?</span>
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
              Join thousands of fashion-forward individuals making a difference
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {user ? (
                <Link
                  to="/browse"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 shadow-2xl hover:shadow-glow transform hover:-translate-y-1 hover:scale-105"
                >
                  Browse Items
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 shadow-2xl hover:shadow-glow transform hover:-translate-y-1 hover:scale-105"
                >
                  Start Your Journey
                </Link>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
