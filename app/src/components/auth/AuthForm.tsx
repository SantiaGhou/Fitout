import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/images/LogoWhite.svg';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'personal' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (!user.profile) {
        navigate('/onboarding');
      } else {
        // Redirect to the page they came from or dashboard
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from);
      }
    }
  }, [user, navigate, location]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email
    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    } else if (email.length > 100) {
      newErrors.email = 'E-mail deve ter no máximo 100 caracteres';
    }

    // Senha
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!isLogin) {
      // Validação completa só no cadastro
      if (password.length < 8) {
        newErrors.password = 'Mínimo 8 caracteres';
      } else if (password.length > 16) {
        newErrors.password = 'Máximo 16 caracteres';
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Deve conter pelo menos uma letra maiúscula';
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Deve conter pelo menos uma letra minúscula';
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Deve conter pelo menos um número';
      } else if (!/[^A-Za-z0-9]/.test(password)) {
        newErrors.password = 'Deve conter pelo menos um caractere especial';
      }
    }

    if (!isLogin) {
      if (!name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      }
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
    setErrors({});
    
    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(email, password, userType, name);
      }

      if (!success) {
        setErrors({ form: isLogin ? 'Credenciais inválidas' : 'E-mail já cadastrado' });
      }
      // Navigation will be handled by useEffect when user state updates
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ form: 'Erro interno. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
  };

  const userTypeOptions = [
    { value: 'user', label: 'Usuário Comum', description: 'Quero treinar e acompanhar meu progresso' },
    { value: 'personal', label: 'Personal Trainer', description: 'Quero gerenciar alunos e criar treinos' },
  ];

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-content-primary">
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-content-secondary">
            {isLogin ? 'Bora voltar ao jogo? Faça login' : 'Novo por aqui? Crie sua conta e vem com a gente'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="Seu nome completo"
              required={true}
            />
          )}

          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="seu@email.com"
            required={true}
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              required={true}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-content-secondary hover:text-content-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {!isLogin && password && (
            <div className="grid grid-cols-2 gap-1 text-xs">
              {[
                { ok: password.length >= 8 && password.length <= 16, label: '8–16 caracteres' },
                { ok: /[A-Z]/.test(password), label: 'Letra maiúscula' },
                { ok: /[a-z]/.test(password), label: 'Letra minúscula' },
                { ok: /[0-9]/.test(password), label: 'Número' },
                { ok: /[^A-Za-z0-9]/.test(password), label: 'Caractere especial' },
              ].map((req) => (
                <span key={req.label} className={`flex items-center gap-1 ${req.ok ? 'text-green-500' : 'text-content-secondary'}`}>
                  <span>{req.ok ? '✓' : '○'}</span> {req.label}
                </span>
              ))}
            </div>
          )}

          {!isLogin && (
            <>
              <div className="relative">
                <Input
                  label="Confirmar Senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="••••••••"
                  required={true}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-content-secondary hover:text-content-primary transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

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
            <div className="bg-accent-red/10 border border-accent-red/20 rounded-md p-3">
              <div className="text-accent-red text-sm text-center">{errors.form}</div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar conta')}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-content-brand hover:underline transition-all duration-200"
              onClick={handleToggleMode}
              disabled={loading}
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};