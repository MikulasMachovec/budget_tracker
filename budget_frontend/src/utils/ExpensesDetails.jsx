import { motion, AnimatePresence } from 'motion/react';
import ExpenseTable from '../components/ExpenseTable'

function ExpensesDetails({ isOpen, expenses }) {
  console.log(expenses)
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
          className="p-8 mx-auto mt-4 bg-white border border-gray-200 rounded-2xl"
        >
          <div className="self-start w-full pb-3 text-start">
            <h2 className="text-lg font-semibold text-gray-700">Expenses details</h2>
          </div>

          <div className="min-w-full p-6 border-2 border-gray-200 rounded-lg">
            <div className="">
              {/* TODO: spending diagram */}
              <ExpenseTable 
                expenses={expenses}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>  
  )
}

export default ExpensesDetails