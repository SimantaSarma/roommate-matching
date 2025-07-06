
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Clock, Home } from "lucide-react";
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import Questionnaire from '@/components/Questionnaire';
import MatchResults from '@/components/MatchResults';
import Dashboard from '@/components/Dashboard';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences?: {
    sleepSchedule: string;
    cleanliness: string;
    studyPreference: string;
    socialBehavior: string;
    noiseTolerance: string;
  };
}

export interface MatchProfile extends UserProfile {
  year: string;
  course: string;
  compatibilityScore: number;
  sharedPreferences: string[];
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<MatchProfile[]>([]);

  const handleAuth = (userData: { name: string; email: string }) => {
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email
    };
    setUser(newUser);
    setCurrentPage('questionnaire');
  };

  const handleQuestionnaireComplete = (preferences: any) => {
    if (user) {
      const updatedUser = { ...user, preferences };
      setUser(updatedUser);
      
      // Generate mock matches based on preferences
      const mockMatches: MatchProfile[] = [
        {
          id: '1',
          name: 'Priya Sharma',
          email: 'priya@example.com',
          year: '1st Year',
          course: 'Computer Science',
          compatibilityScore: 87,
          sharedPreferences: ['Early Riser', 'Neat', 'Quiet Study'],
          preferences: {
            sleepSchedule: 'early',
            cleanliness: 'neat',
            studyPreference: 'quiet',
            socialBehavior: 'balanced',
            noiseTolerance: 'sensitive'
          }
        },
        {
          id: '2',
          name: 'Arjun Patel',
          email: 'arjun@example.com',
          year: '2nd Year',
          course: 'Business Studies',
          compatibilityScore: 73,
          sharedPreferences: ['Balanced Social', 'Flexible Study'],
          preferences: {
            sleepSchedule: 'flexible',
            cleanliness: 'average',
            studyPreference: 'group',
            socialBehavior: 'extrovert',
            noiseTolerance: 'moderate'
          }
        }
      ];
      
      setMatches(mockMatches);
      setCurrentPage('matches');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleEditPreferences = () => {
    setCurrentPage('questionnaire');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
      case 'auth':
        return <AuthPage onAuth={handleAuth} onBack={() => setCurrentPage('landing')} />;
      case 'questionnaire':
        return <Questionnaire onComplete={handleQuestionnaireComplete} onBack={() => setCurrentPage('dashboard')} />;
      case 'matches':
        return <MatchResults matches={matches} onBack={handleBackToDashboard} />;
      case 'dashboard':
        return <Dashboard user={user} onEditPreferences={handleEditPreferences} onViewMatches={() => setCurrentPage('matches')} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
