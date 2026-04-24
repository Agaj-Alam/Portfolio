import React, { useState } from 'react';
import PremiumDevices from './components/PremiumDevices';
import SkillGlobe from './components/SkillGlobe';
import GitHubActivity from './components/GitHubActivity';
import SplashCursor from './components/SplashCursor';
import { LiveCanvasBg } from './components/LiveCanvasBg';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Approaches} from './components/Approaches';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import BubbleBackground from './components/BubbleBackground';

const STYLES = `
  ::selection {
    background: rgba(110, 231, 183, 0.3);
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(110, 231, 183, 0.2);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(110, 231, 183, 0.4);
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float-delay {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState('about');

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        color: dark ? '#fafafa' : '#0a0a0a',
        transition: 'color 0.4s ease',
      }}
    >
      <style>{STYLES}</style>

      {/* ══ SPLASH CURSOR ══ */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={false}
        RAINBOW_MODE={true}
        COLOR="#a855f7"
      />

      {/* ══ LIVE ANIMATED BACKGROUND ══ */}
      {/* <LiveCanvasBg dark={dark} /> */}
      <BubbleBackground dark={dark} />


      <Nav dark={dark} setDark={setDark} active={active} />
      <Hero dark={dark} />
      <About dark={dark} />
      <Projects dark={dark} />
      <Skills dark={dark} />
      <GitHubActivity dark={dark} />
      {/* <Blog dark={dark} /> */}
      <Approaches dark={dark}/>
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
