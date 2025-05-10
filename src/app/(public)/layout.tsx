export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[linear-gradient(120deg,_#2b4c7e,_#1a1a2e)] relative overflow-hidden">
      <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] rotate-45 z-0" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );  
}
