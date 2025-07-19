import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-primary">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};