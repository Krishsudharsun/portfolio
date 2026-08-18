import { ThemeProvider } from './context/ThemeContext';
import { EasterEggProvider, useEasterEggs } from './context/EasterEggContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { SecurityMindset } from './components/SecurityMindset';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Terminal } from './components/Terminal';
import { EasterEggToast } from './components/EasterEggToast';

function AppShell() {
  const { terminalOpen, closeTerminal } = useEasterEggs();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="rune-rule mx-auto max-w-6xl" />
        <About />
        <div className="rune-rule mx-auto max-w-6xl" />
        <Experience />
        <div className="rune-rule mx-auto max-w-6xl" />
        <Skills />
        <div className="rune-rule mx-auto max-w-6xl" />
        <Projects />
        <div className="rune-rule mx-auto max-w-6xl" />
        <SecurityMindset />
        <div className="rune-rule mx-auto max-w-6xl" />
        <Education />
        <div className="rune-rule mx-auto max-w-6xl" />
        <Contact />
      </main>
      <Footer />
      <Terminal open={terminalOpen} onClose={closeTerminal} />
      <EasterEggToast />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <EasterEggProvider>
        <AppShell />
      </EasterEggProvider>
    </ThemeProvider>
  );
}

export default App;
