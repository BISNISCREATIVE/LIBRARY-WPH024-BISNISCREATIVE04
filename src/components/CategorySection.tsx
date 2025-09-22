import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wand2, 
  GraduationCap, 
  TrendingUp, 
  DollarSign, 
  Microscope, 
  BookOpen 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 'fiction',
    name: 'Fiction',
    icon: Wand2,
    gradient: 'bg-gradient-fiction'
  },
  {
    id: 'non-fiction',
    name: 'Non-Fiction',
    icon: GraduationCap,
    gradient: 'bg-gradient-nonfiction'
  },
  {
    id: 'self-improvement',
    name: 'Self-Improvement',
    icon: TrendingUp,
    gradient: 'bg-gradient-selfimprovement'
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: DollarSign,
    gradient: 'bg-gradient-finance'
  },
  {
    id: 'science',
    name: 'Science',
    icon: Microscope,
    gradient: 'bg-gradient-science'
  },
  {
    id: 'education',
    name: 'Education',
    icon: BookOpen,
    gradient: 'bg-gradient-education'
  },
];

export const CategorySection: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/books?category=${categoryId}`);
  };

  return (
    <section className="px-4 mb-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card
              key={category.id}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                <div className={`w-12 h-12 rounded-xl ${category.gradient} flex items-center justify-center mb-2`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground leading-tight">
                  {category.name}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};