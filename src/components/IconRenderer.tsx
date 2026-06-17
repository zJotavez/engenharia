import React from 'react';
import { 
  Layers, 
  Anchor, 
  Cpu, 
  Shield, 
  Home, 
  Hammer, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  CalendarRange, 
  Speech, 
  Globe2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Send,
  Building,
  Menu,
  X,
  ExternalLink,
  Info
} from 'lucide-react';

const iconMap = {
  Layers,
  Anchor,
  Cpu,
  Shield,
  Home,
  Hammer,
  Users,
  ShieldAlert,
  CheckCircle2,
  CalendarRange,
  Speech,
  Globe2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Send,
  Building,
  Menu,
  X,
  ExternalLink,
  Info
};

export type IconName = keyof typeof iconMap;

interface IconRendererProps {
  name: IconName | string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className, size = 24 }) => {
  const IconComponent = iconMap[name as IconName] || Info;
  return <IconComponent className={className} size={size} />;
};
