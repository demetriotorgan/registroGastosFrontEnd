// src/components/SucessoAnimado.jsx
import { motion, AnimatePresence } from "framer-motion";
import './SucessoAnimado.css';
import sucessoIcon from '../assets/moedasGif.gif';

export function SucessoAnimado({ mostrar }) {
  return (
     <AnimatePresence>
      {mostrar && (
        <motion.img
          src={sucessoIcon}
          alt="Sucesso"
          className="check-animado"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </AnimatePresence>
  );
}
