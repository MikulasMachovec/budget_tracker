import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// TODO

function ErrorModal({ isOpen, onClose, message , duration = 3000}) {
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() =>{
            onClose();
        }, duration)

        return () => clearTimeout(timer)
    },[isOpen, onClose, duration])

    if (!isOpen) return null;
    
  return (
    <>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                className="fixed inset-0 z-50 flex items-start justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-sm px-6 py-4 mt-2 text-center bg-white shadow-lg rounded-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <p className="font-medium text-red-600">
                            {message || "Something went wrong."}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    </>
  )
}

export default ErrorModal