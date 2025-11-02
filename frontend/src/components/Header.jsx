import React from 'react';
import { CheckSquare, Sparkles } from 'lucide-react';

function Header() {
  return (
    <header className="text-center py-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="flex justify-center items-center gap-2 mb-2">
        <CheckSquare className="w-6 h-6" />
        <h1 className="text-4xl font-bold">TaskMaster Pro</h1>
        <Sparkles className="w-6 h-6" />
      </div>
      <p className="text-lg font-medium">
        Organize, Track, and Accomplish Your Goals
      </p>
    </header>
  );
}

export default Header;
