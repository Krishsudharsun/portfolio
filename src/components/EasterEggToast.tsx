import { AnimatePresence, motion } from 'framer-motion';
import { useEasterEggs } from '../context/EasterEggContext';

export function EasterEggToast() {
  const { toast } = useEasterEggs();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="font-mono rounded-full border px-4 py-2 text-xs shadow-lg"
            style={{ background: 'var(--nl-bg-soft)', borderColor: 'var(--nl-border-strong)', color: 'var(--nl-accent)' }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
