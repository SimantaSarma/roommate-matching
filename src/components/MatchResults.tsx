
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Heart, User, GraduationCap, CheckCircle } from "lucide-react";
import { MatchProfile } from '@/pages/Index';

interface MatchResultsProps {
  matches: MatchProfile[];
  onBack: () => void;
}

const MatchResults = ({ matches, onBack }: MatchResultsProps) => {
  const [connectionsSent, setConnectionsSent] = useState<Set<string>>(new Set());

  const handleSendConnection = (matchId: string) => {
    setConnectionsSent(prev => new Set([...prev, matchId]));
  };

  const getPreferenceEmoji = (preference: string) => {
    const emojiMap: Record<string, string> = {
      'Early Riser': '🌅',
      'Night Owl': '🦉',
      'Neat': '🧼',
      'Average': '✨',
      'Messy': '🏠',
      'Quiet Study': '🤫',
      'Group Study': '👥',
      'Flexible Study': '🔄',
      'Introvert': '📚',
      'Balanced Social': '⚖️',
      'Extrovert': '🎉',
      'Noise Sensitive': '🔇',
      'Moderate Noise': '🔉',
      'High Tolerance': '🔊'
    };
    return emojiMap[preference] || '✨';
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Your Matches</h1>
            <p className="text-gray-600">Found {matches.length} compatible roommates</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Match Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{match.name}</CardTitle>
                      <p className="text-gray-600 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {match.year} • {match.course}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getCompatibilityColor(match.compatibilityScore)} font-semibold`}>
                    {match.compatibilityScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Shared Preferences:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.sharedPreferences.map((pref) => (
                      <Badge key={pref} variant="secondary" className="text-xs">
                        {getPreferenceEmoji(pref)} {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div>{match.name}</div>
                            <p className="text-sm text-gray-600 font-normal">
                              {match.year} • {match.course}
                            </p>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Badge className={`${getCompatibilityColor(match.compatibilityScore)} mb-3`}>
                            {match.compatibilityScore}% Compatible
                          </Badge>
                          <p className="text-sm text-gray-600">
                            You share {match.sharedPreferences.length} out of 5 lifestyle preferences
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Shared Preferences:</h4>
                          <div className="space-y-2">
                            {match.sharedPreferences.map((pref) => (
                              <div key={pref} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                {getPreferenceEmoji(pref)} {pref}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full"
                          onClick={() => handleSendConnection(match.id)}
                          disabled={connectionsSent.has(match.id)}
                        >
                          {connectionsSent.has(match.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <Heart className="h-4 w-4 mr-2" />
                              Send Connect Request
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSendConnection(match.id)}
                    disabled={connectionsSent.has(match.id)}
                  >
                    {connectionsSent.has(match.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Sent
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {matches.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
            <p className="text-gray-600">Try updating your preferences to find more compatible roommates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchResults;
