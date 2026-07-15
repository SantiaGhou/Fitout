import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../types';

export const UserOnboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    hasTrainer: false,
    streak: 0,
    workoutDays: [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        if (!formData.age || !formData.gender || !formData.bloodType || !formData.height || !formData.weight) {
          setError('Preencha todos os campos obrigatórios.');
          return false;
        }
        break;
      case 2:
        if (!formData.objective) {
          setError('Selecione um objetivo.');
          return false;
        }
        break;
      case 3:
        if (!formData.workoutType || formData.frequency === undefined || !formData.schedule) {
          setError('Preencha todos os campos obrigatórios.');
          return false;
        }
        break;
      case 4:
        if (!formData.dietType) {
          setError('Selecione um tipo de dieta.');
          return false;
        }
        break;
      case 5:
        if (!formData.intermittentFasting) {
          setError('Selecione uma opção.');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setSaving(true);
      const success = await updateProfile(formData);
      setSaving(false);
      if (success) {
        navigate('/');
      } else {
        setError('Erro ao salvar perfil. Tente novamente.');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (data: Partial<UserProfile>) => {
    setError('');
    setFormData({ ...formData, ...data });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-content-primary">Informações Básicas</h2>

            {/* Linha 1: Idade + Tipo Sanguíneo */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Idade"
                type="number"
                value={formData.age || ''}
                onChange={(e) => updateFormData({ age: parseInt(e.target.value) })}
                placeholder="25"
              />
              <Input
                label="Tipo Sanguíneo"
                value={formData.bloodType || ''}
                onChange={(e) => updateFormData({ bloodType: e.target.value })}
                placeholder="O+"
              />
            </div>

            {/* Linha 2: Altura + Peso */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Altura (cm)"
                type="number"
                value={formData.height || ''}
                onChange={(e) => updateFormData({ height: parseInt(e.target.value) })}
                placeholder="175"
              />
              <Input
                label="Peso (kg)"
                type="number"
                value={formData.weight || ''}
                onChange={(e) => updateFormData({ weight: parseInt(e.target.value) })}
                placeholder="70"
              />
            </div>

            {/* Linha 3: Sexo e Possui treinador lado a lado */}
            <div className="grid grid-cols-2 gap-4">

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-2">Sexo</label>
                <div className="space-y-2">
                  {(['M', 'F'] as const).map((val) => (
                    <label
                      key={val}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.gender === val
                          ? 'border-content-brand bg-content-brand/10'
                          : 'border-background-tertiary hover:bg-background-tertiary/60'
                      }`}
                    >
                      <input type="radio" name="gender" value={val} checked={formData.gender === val} onChange={() => updateFormData({ gender: val })} className="sr-only" />
                      <div className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${formData.gender === val ? 'border-content-brand' : 'border-background-gray'}`}>
                        {formData.gender === val && <div className="h-2.5 w-2.5 rounded-full bg-content-brand" />}
                      </div>
                      <span className={`font-semibold text-sm ${formData.gender === val ? 'text-content-brand' : 'text-content-primary'}`}>
                        {val === 'M' ? 'Masculino' : 'Feminino'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Possui treinador */}
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-2">Possui treinador?</label>
                <div className="space-y-2">
                  {[{ value: 'true', label: 'Sim' }, { value: 'false', label: 'Não' }].map((opt) => {
                    const isSelected = (formData.hasTrainer?.toString() || 'false') === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-content-brand bg-content-brand/10'
                            : 'border-background-tertiary hover:bg-background-tertiary/60'
                        }`}
                      >
                        <input type="radio" name="hasTrainer" value={opt.value} checked={isSelected} onChange={() => updateFormData({ hasTrainer: opt.value === 'true' })} className="sr-only" />
                        <div className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? 'border-content-brand' : 'border-background-gray'}`}>
                          {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-content-brand" />}
                        </div>
                        <span className={`font-semibold text-sm ${isSelected ? 'text-content-brand' : 'text-content-primary'}`}>
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-content-primary">Qual seu objetivo?</h2>
            <RadioGroup
              options={[
                { value: 'mass', label: 'Ganhar massa muscular', description: 'Aumentar músculo e força' },
                { value: 'fat_loss', label: 'Perder gordura', description: 'Reduzir peso e definir o corpo' },
                { value: 'health', label: 'Melhorar a saúde', description: 'Bem-estar geral e qualidade de vida' },
              ]}
              value={formData.objective || ''}
              onChange={(value) => updateFormData({ objective: value as any })}
              name="objective"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-content-primary">Tipo de Treino</h2>
            <RadioGroup
              label="Tipo preferido"
              options={[
                { value: 'gym', label: 'Musculação', description: 'Academia com pesos' },
                { value: 'cardio', label: 'Aeróbico', description: 'Corrida, bike, natação' },
                { value: 'functional', label: 'Funcional', description: 'Exercícios funcionais e crossfit' },
                { value: 'other', label: 'Outro / Não treino', description: 'Outras modalidades ou sedentário' },
              ]}
              value={formData.workoutType || ''}
              onChange={(value) => updateFormData({ workoutType: value as any })}
              name="workoutType"
            />
            
            <RadioGroup
              label="Frequência semanal"
              options={[
                { value: '0', label: '0 dias' },
                { value: '2', label: '1-2 dias' },
                { value: '4', label: '3-4 dias' },
                { value: '6', label: '5-6 dias' },
                { value: '7', label: 'Todos os dias' },
              ]}
              value={formData.frequency?.toString() || ''}
              onChange={(value) => updateFormData({ frequency: parseInt(value) as any })}
              name="frequency"
            />

            <RadioGroup
              label="Horário preferido"
              options={[
                { value: 'morning', label: 'Manhã' },
                { value: 'afternoon', label: 'Tarde' },
                { value: 'evening', label: 'Noite' },
                { value: 'flexible', label: 'Varia' },
              ]}
              value={formData.schedule || ''}
              onChange={(value) => updateFormData({ schedule: value as any })}
              name="schedule"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-content-primary">Preferências Alimentares</h2>
            <Input
              label="Alergias ou restrições"
              value={formData.allergies || ''}
              onChange={(e) => updateFormData({ allergies: e.target.value })}
              placeholder="Ex: Lactose, glúten, nozes..."
            />
            <Input
              label="Alimentos que quer evitar"
              value={formData.avoidFoods || ''}
              onChange={(e) => updateFormData({ avoidFoods: e.target.value })}
              placeholder="Ex: Carne vermelha, doces..."
            />
            <RadioGroup
              label="Tipo de dieta"
              options={[
                { value: 'few_meals', label: 'Poucas refeições', description: '2-3 refeições por dia' },
                { value: 'many_meals', label: 'Várias refeições', description: '4-6 refeições por dia' },
                { value: 'practical', label: 'Praticidade', description: 'Qualquer uma, quero praticidade' },
              ]}
              value={formData.dietType || ''}
              onChange={(value) => updateFormData({ dietType: value as any })}
              name="dietType"
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-content-primary">Jejum Intermitente</h2>
            <RadioGroup
              label="Topa fazer jejum intermitente?"
              options={[
                { value: 'yes', label: 'Sim', description: 'Estou disposto a tentar' },
                { value: 'no', label: 'Não', description: 'Prefiro não fazer' },
                { value: 'maybe', label: 'Talvez', description: 'Se for fácil de seguir' },
              ]}
              value={formData.intermittentFasting || ''}
              onChange={(value) => updateFormData({ intermittentFasting: value as any })}
              name="intermittentFasting"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-content-primary">Configuração do Perfil</h1>
            <span className="text-content-secondary text-sm">{step} de {totalSteps}</span>
          </div>
          <div className="w-full bg-background-tertiary rounded-full h-2">
            <div 
              className="bg-content-brand h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="animate-slide-up">
          {renderStep()}
        </div>

        <div className="mt-8">
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>

            <Button onClick={handleNext} disabled={saving}>
              {step === totalSteps ? (saving ? 'Salvando...' : 'Finalizar') : 'Próximo'}
              {step !== totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};