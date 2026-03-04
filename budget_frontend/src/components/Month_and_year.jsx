import { useAppData } from '../providers/AppDataProvider';

function MonthAndYear() {
  const { selectedDate, setSelectedDate } = useAppData();

  const goToPrevMonth = () => {
    setSelectedDate(prev =>
      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    )
  }
  const goToNextMonth = () => {
    setSelectedDate(prev =>
      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    )
  }

  const formattedMonth = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  })
  
  return (
    <div className="flex items-center justify-between py-4">
      <button onClick={goToPrevMonth}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

        <h2 className="text-lg font-medium">
          {formattedMonth}
        </h2>

      <button onClick={goToNextMonth}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      
    </div>

  )
}

export default MonthAndYear
