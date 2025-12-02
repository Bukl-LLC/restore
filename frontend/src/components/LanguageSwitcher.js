import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ variant = 'default', className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 ${className}`}
      data-testid="language-switcher"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
