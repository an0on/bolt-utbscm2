import React, { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { ParticipantManagement } from './components/ParticipantManagement';
import { ParticipantsList } from './components/ParticipantsList';
import { Scoring } from './components/Scoring';
import { Profile } from './components/Profile';
import { ContestManagement } from './components/ContestManagement';
import { Announcements } from './components/Announcements';
import { Judging } from './components/Judging';
import { Display } from './components/Display';
import { TestRegistrationForm } from './components/TestRegistrationForm';

type MainTab = 'public' | 'administration' | 'judge' | 'announcement' | 'display';
type SubTab = 'contest-management' | 'registration' | 'profile' | 'participants' | 'starter-list' | 'scoring' | 'test-registration';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('public');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('registration');

  const renderSubTabs = () => {
    switch (activeMainTab) {
      case 'public':
        return (
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSubTab('registration')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'registration'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Registration
            </button>
            <button
              onClick={() => setActiveSubTab('test-registration')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'test-registration'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Test Registration
            </button>
            <button
              onClick={() => setActiveSubTab('profile')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'profile'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Profile
            </button>
          </div>
        );
      case 'administration':
        return (
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSubTab('contest-management')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'contest-management'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Contest Management
            </button>
            <button
              onClick={() => setActiveSubTab('participants')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'participants'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Participant Management
            </button>
            <button
              onClick={() => setActiveSubTab('starter-list')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'starter-list'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Starter List
            </button>
            <button
              onClick={() => setActiveSubTab('scoring')}
              className={`px-3 py-2 text-sm font-medium ${
                activeSubTab === 'scoring'
                  ? 'text-accent-orange border-accent-orange border-b-2'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Scoring
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeSubTab) {
      case 'registration':
        return <RegistrationForm />;
      case 'test-registration':
        return <TestRegistrationForm />;
      case 'profile':
        return <Profile />;
      case 'participants':
        return <ParticipantManagement />;
      case 'starter-list':
        return <ParticipantsList />;
      case 'scoring':
        return <Scoring />;
      case 'contest-management':
        return <ContestManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">
            Skate Contest Manager
          </h1>
        </div>
      </header>

      <nav className="bg-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 border-b border-secondary">
            <button
              onClick={() => setActiveMainTab('public')}
              className={`px-4 py-3 text-sm font-medium ${
                activeMainTab === 'public'
                  ? 'text-accent-orange border-accent-orange border-b-2 -mb-[2px]'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setActiveMainTab('administration')}
              className={`px-4 py-3 text-sm font-medium ${
                activeMainTab === 'administration'
                  ? 'text-accent-orange border-accent-orange border-b-2 -mb-[2px]'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Administration
            </button>
            <button
              onClick={() => setActiveMainTab('judge')}
              className={`px-4 py-3 text-sm font-medium ${
                activeMainTab === 'judge'
                  ? 'text-accent-orange border-accent-orange border-b-2 -mb-[2px]'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Judge
            </button>
            <button
              onClick={() => setActiveMainTab('announcement')}
              className={`px-4 py-3 text-sm font-medium ${
                activeMainTab === 'announcement'
                  ? 'text-accent-orange border-accent-orange border-b-2 -mb-[2px]'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Announcement
            </button>
            <button
              onClick={() => setActiveMainTab('display')}
              className={`px-4 py-3 text-sm font-medium ${
                activeMainTab === 'display'
                  ? 'text-accent-orange border-accent-orange border-b-2 -mb-[2px]'
                  : 'text-gray-100 hover:text-accent-yellow'
              }`}
            >
              Display
            </button>
          </div>
        </div>
      </nav>

      <nav className="bg-secondary shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {renderSubTabs()}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
}
