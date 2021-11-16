import TimerForm from "./TimerForm";

function ToggleableTimerForm({ isOpen }) {
  if (isOpen) {
    return <TimerForm />;
  } else {
    return (
      <div className="ui basic content center aligned segment">
        <button className="ui basic button icon">
          <i className="plus icon" />
        </button>
      </div>
    );
  }
}

export default ToggleableTimerForm;
