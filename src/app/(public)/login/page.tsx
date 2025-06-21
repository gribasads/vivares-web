'use client';

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import VerificationCodeInput from "@/app/components/VerificationCodeInput";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";

type Step = 'email' | 'code';

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const data = await authService.requestCode(email);

      if (!data.error) {
        setMessage('Código enviado com sucesso para seu e-mail');
        setStep('code');
      } else {
        setMessage(data.error || 'Erro ao solicitar código');
      }
    } catch {
      setMessage('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (code: string) => {
    setIsLoading(true);
    setMessage('');

    try {
      const data = await authService.verifyCode(email, code);

      if (!data.error && data.token) {
        document.cookie = `authToken=${data.token}; path=/`;
        
        const profileData = await authService.getProfile();
        
        if (profileData.error) {
          setMessage(profileData.error);
          return;
        }
        
        router.push('/');
      } else {
        setMessage(data.error || 'Código inválido');
      }
    } catch {
      setMessage('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="relative bg-white/98 p-12 rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] w-full max-w-[450px] backdrop-blur-[15px] z-10">
        <div className="flex items-center justify-center mb-10">
          <Image 
            src="/logos/logo.png" 
            alt="Logo" 
            width={32} 
            height={32} 
            className="h-10 w-auto"
          />
        </div>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            message.includes('sucesso') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
        
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <Input 
              id="email"
              label="Endereço de E-mail"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button 
              type="submit" 
              variant="login"
              disabled={isLoading}
            >
              <span className="relative z-10">
                {isLoading ? 'Enviando...' : 'Acessar Conta'}
              </span>
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-[#2b4c7e] mb-2">Verificação</h2>
              <p className="text-gray-600">
                Digite o código de 6 dígitos enviado para {email}
              </p>
            </div>

            <VerificationCodeInput onComplete={handleCodeSubmit} />

            <Button 
              type="button" 
              variant="login"
              onClick={() => setStep('email')}
              disabled={isLoading}
            >
              <span className="relative z-10">Voltar</span>
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
