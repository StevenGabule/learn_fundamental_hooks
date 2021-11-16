import { useState } from 'react';
import TimerForm from './TimerForm';

function ToggleableTimerForm({ onFormSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleFormOpen() {
    setIsOpen(true);
  }

  function handleFormClose() {
    setIsOpen(false);
  }

  function handleFormSubmit(timer) {
    onFormSubmit(timer);
    setIsOpen(false);
  }

  if (isOpen) {
    return <TimerForm onFormClose={handleFormClose} onFormSubmit={handleFormSubmit} />;
  } else {
    return (
      <div className="ui basic content center aligned segment">
        <button onClick={handleFormOpen} className="ui basic button icon">
          <i className="plus icon" />
        </button>
      </div>
    );
  }
}

export default ToggleableTimerForm;
