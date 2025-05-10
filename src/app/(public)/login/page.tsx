import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Image from "next/image";
export default function SignIn() {
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
        
        <form className="space-y-6">
          <Input 
            id="email"
            label="Endereço de E-mail"
            placeholder="Digite seu e-mail"
            type="email"
          />
          
          <Button 
            type="submit" 
            variant="login"
          >
            <span className="relative z-10">Acessar Conta</span>
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </Button>
        </form>
      </div>
    </main>
  );
}
