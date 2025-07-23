import { Heart, ChefHat } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Delicia</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your personalized recipe companion for discovering, sharing, and creating delicious meals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Browse Recipes</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Popular Recipes</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Submit Recipe</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Community</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-orange-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600">
            © 2024 Delicia. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-gray-600 mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
