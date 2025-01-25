export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-svh flex justify-center">
      <section className="flex flex-col items-center pt-64 "> {children}</section>
    </section>
  );
}
