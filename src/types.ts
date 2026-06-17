export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  iconName: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  service: string;
  location: string;
  year: string;
  gallery: string[];
  keySpec: string; // e.g. "450 Toneladas", "12.000m²"
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatarUrl: string;
  rating: number;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  subLabel: string;
}
