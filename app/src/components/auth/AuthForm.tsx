import React, { useState } from 'react';
import { Eye, EyeOff, Dumbbell } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/images/LogoWhite.svg';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'personal' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(email, password, userType);
      }

      if (!success) {
        setErrors({ form: isLogin ? 'Credenciais inválidas' : 'E-mail já cadastrado' });
      }
    } catch (error) {
      setErrors({ form: 'Erro interno. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const userTypeOptions = [
    { value: 'user', label: 'Usuário Comum', description: 'Quero treinar e acompanhar meu progresso' },
    { value: 'personal', label: 'Personal Trainer', description: 'Quero gerenciar alunos e criar treinos' },
  ];

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 flex items-center justify-center ">
            <img src={Logo} alt="" />
          </div>
          <p className="mt-2 text-content-secondary">
            {isLogin ? 'Bora voltar ao jogo? Faça login' : 'Novo por aqui? Crie sua conta e vem com a gente'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="seu@email.com"
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-content-secondary hover:text-content-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {!isLogin && (
            <>
              <Input
                label="Confirmar Senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="••••••••"
              />

              <RadioGroup
                label="Tipo de conta"
                options={userTypeOptions}
                value={userType}
                onChange={(value) => setUserType(value as 'personal' | 'user')}
                name="userType"
              />
            </>
          )}

          {errors.form && (
            <div className="text-accent-red text-sm text-center">{errors.form}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            {isLogin ? 'Entrar' : 'Criar conta'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-content-brand hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};