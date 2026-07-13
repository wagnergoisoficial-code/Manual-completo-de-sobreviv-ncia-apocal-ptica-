export interface QuizQuestion {
  id: number;
  question: string;
  category: 'energy' | 'water_food' | 'comm_info' | 'medical' | 'tactical';
  options: {
    text: string;
    points: number;
    feedback: string;
  }[];
}

export interface Chapter {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
}

export interface Bonus {
  id: number;
  title: string;
  value: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  verified: boolean;
}
