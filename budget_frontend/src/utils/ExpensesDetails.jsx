import { motion, AnimatePresence } from 'motion/react';

function ExpensesDetails({ isOpen }) {
  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          key="expenses-details"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mx-auto bg-white rounded-2xl border border-gray-200 p-8 mt-4"
        >
          <div className="w-full self-start text-start pb-3">
            <h2 className="font-semibold text-lg text-gray-700">Expenses details</h2>
          </div>

          <div className="min-w-full border-2 border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Your category content here */}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>  
  )
}

export default ExpensesDetails