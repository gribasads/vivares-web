import Menu from "../components/Menu";

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
