import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";

function TimersDashboard() {
  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList />
        <ToggleableTimerForm isOpen={true} />
      </div>
    </div>
  );
}

export default TimersDashboard;
