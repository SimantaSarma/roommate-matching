
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Moon, Sun, Sparkles, Users, Volume2, BookOpen } from "lucide-react";

interface QuestionnaireProps {
  onComplete: (preferences: any) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 'sleepSchedule',
    title: 'When do you usually sleep?',
    icon: Moon,
    options: [
      { value: 'early', label: 'Early Bird', emoji: '🌅', desc: 'Sleep by 10 PM, wake up by 7 AM' },
      { value: 'late', label: 'Night Owl', emoji: '🦉', desc: 'Sleep after midnight, wake up late' },
      { value: 'flexible', label: 'Flexible', emoji: '⏰', desc: 'Varies based on schedule' }
    ]
  },
  {
    id: 'cleanliness',
    title: 'How clean do you keep your space?',
    icon: Sparkles,
    options: [
      { value: 'neat', label: 'Super Neat', emoji: '🧼', desc: 'Everything has its place' },
      { value: 'average', label: 'Pretty Clean', emoji: '✨', desc: 'Tidy most of the time' },
      { value: 'messy', label: 'Lived-in', emoji: '🏠', desc: 'Organized chaos works for me' }
    ]
  },
  {
    id: 'studyPreference',
    title: 'How do you prefer to study?',
    icon: BookOpen,
    options: [
      { value: 'quiet', label: 'Silent Study', emoji: '🤫', desc: 'Need complete silence' },
      { value: 'group', label: 'Group Study', emoji: '👥', desc: 'Better with others' },
      { value: 'flexible', label: 'Adaptable', emoji: '🔄', desc: 'Can do both' }
    ]
  },
  {
    id: 'socialBehavior',
    title: 'How would you describe yourself socially?',
    icon: Users,
    options: [
      { value: 'introvert', label: 'Introvert', emoji: '📚', desc: 'Prefer quiet, alone time' },
      { value: 'balanced', label: 'Ambivert', emoji: '⚖️', desc: 'Mix of both personalities' },
      { value: 'extrovert', label: 'Extrovert', emoji: '🎉', desc: 'Love socializing and parties' }
    ]
  },
  {
    id: 'noiseTolerance',
    title: 'How do you handle noise?',
    icon: Volume2,
    options: [
      { value: 'sensitive', label: 'Sensitive', emoji: '🔇', desc: 'Prefer quiet environments' },
      { value: 'moderate', label: 'Moderate', emoji: '🔉', desc: 'Some noise is okay' },
      { value: 'tolerant', label: 'High Tolerance', emoji: '🔊', desc: 'Noise doesn\'t bother me' }
    ]
  }
];

const Questionnaire = ({ onComplete, onBack }: QuestionnaireProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const IconComponent = question.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">{question.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{option.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-blue-700">
                        {option.label}
                      </h3>
                      <p className="text-gray-600 text-sm">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="text-gray-600"
            >
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
