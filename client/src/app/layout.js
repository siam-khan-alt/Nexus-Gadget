import './globals.css';
import { Providers } from './components/Providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'NexusGadget | Premium Catalog',
  description: 'Manage your tech collection with style',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}