import Menu from "../components/Menu";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Menu />
      <h1>Private</h1>
      {children}
    </div>
  );  
}
