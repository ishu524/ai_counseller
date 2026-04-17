import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Button, Card } from './components/UI';

// Pages
import Home from './pages/Home';
import Chat from './pages/Chat';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const WelcomePopup = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const visited = localStorage.getItem('neo-visited');
    if (!visited) {
      setTimeout(() => setShow(true), 2000);
      localStorage.setItem('neo-visited', 'true');
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-8 right-8 z-[100] max-w-sm w-full"
        >
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-500 text-white border-none shadow-2xl relative">
            <button onClick={() => setShow(false)} className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors">
              <X size={18} />
            </button>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Heart size={24} fill="currentColor" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">Hi, I'm Neo</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  I'm here to support your mental wellness journey. Ready to talk?
                </p>
                <div className="pt-2">
                  <Link to="/chat" onClick={() => setShow(false)}>
                    <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-neutral-100 py-2 h-auto text-sm">
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloatingChatButton = () => {
  const { pathname } = useLocation();
  if (pathname === '/chat') return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-8 right-8 z-40 md:hidden"
    >
      <Link to="/chat">
        <Button className="w-14 h-14 rounded-full p-0 flex items-center justify-center shadow-2xl shadow-purple-500/40">
          <MessageCircle size={28} />
        </Button>
      </Link>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary/20 blur-xl pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
    />
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <ScrollToTop />
      <WelcomePopup />
      <FloatingChatButton />
      <CustomCursor />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
