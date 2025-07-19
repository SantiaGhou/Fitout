import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { PersonalProfile } from '../../types';

export const PersonalOnboarding: React.FC = () => {
  const [formData, setFormData] = useState<Partial<PersonalProfile>>({
    students: [],
    experience: 0,
  });
  const [name, setName] = useState('');
  const { updateProfile } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ ...formData, name } as any);
  };

  const updateFormData = (data: Partial<PersonalProfile>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-content-primary mb-2">
            Bem-vindo, Personal Trainer!
          </h1>
          <p className="text-content-secondary">
            Vamos configurar seu perfil profissional
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="w-32 h-32 bg-background-tertiary rounded-full flex items-center justify-center border-2 border-dashed border-background-gray">
              <Camera className="h-8 w-8 text-content-secondary" />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Adicionar foto
            </Button>
          </div>

          <Input
            label="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome profissional"
            required
          />

          <Input
            label="CREF (opcional)"
            value={formData.cref || ''}
            onChange={(e) => updateFormData({ cref: e.target.value })}
            placeholder="Ex: 123456-G/SP"
          />

          <Input
            label="Anos de experiência"
            type="number"
            value={formData.experience || ''}
            onChange={(e) => updateFormData({ experience: parseInt(e.target.value) || 0 })}
            placeholder="0"
          />

          <Button type="submit" className="w-full">
            Completar configuração
          </Button>
        </form>
      </div>
    </div>
  );
};