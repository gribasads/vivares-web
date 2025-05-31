import Menu from "@/app/components/menu";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );  
}
