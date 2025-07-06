
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, User, Settings, Heart, Bell, CheckCircle } from "lucide-react";
import { UserProfile } from '@/pages/Index';

interface DashboardProps {
  user: UserProfile | null;
  onEditPreferences: () => void;
  onViewMatches: () => void;
}

const Dashboard = ({ user, onEditPreferences, onViewMatches }: DashboardProps) => {
  const profileCompleteness = user?.preferences ? 100 : 20;
  const hasPreferences = !!user?.preferences;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">RoomieMatch</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600">Let's find you the perfect roommate match.</p>
        </div>

        {/* Profile Completeness */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Completeness</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Progress value={profileCompleteness} className="flex-1" />
              <span className="font-semibold">{profileCompleteness}%</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasPreferences ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                )}
                <span className="text-sm">Lifestyle preferences completed</span>
              </div>
              {!hasPreferences && (
                <Button onClick={onEditPreferences} size="sm">
                  Complete Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onViewMatches}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Heart className="h-5 w-5 text-red-500" />
                <span>View Matches</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                {hasPreferences ? 'See your compatible roommates' : 'Complete your profile to see matches'}
              </p>
              <Button className="w-full" disabled={!hasPreferences}>
                {hasPreferences ? 'View Matches' : 'Complete Profile First'}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onEditPreferences}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Update Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                {hasPreferences ? 'Modify your lifestyle preferences' : 'Set your lifestyle preferences'}
              </p>
              <Button variant="outline" className="w-full">
                {hasPreferences ? 'Update' : 'Set Preferences'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bell className="h-5 w-5 text-blue-500" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                No new notifications
              </p>
              <Badge variant="secondary" className="text-xs">
                All caught up! 🎉
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity yet.</p>
              <p className="text-sm mt-2">
                {hasPreferences ? 'Start connecting with matches to see activity here.' : 'Complete your profile to start matching!'}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
