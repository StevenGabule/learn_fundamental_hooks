import { useState } from 'react';
import { newTimer } from '../../helpers';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';

function TimersDashboard() {
  const [timers, setTimers] = useState([
    {
      title: 'Practice squat',
      project: 'Gym Chores',
      // eslint-disable-next-line no-undef
      id: uuid.v4(),
      elapsed: 5456099,
      runningSince: Date.now(),
    },
    {
      title: 'Bake squash',
      project: 'Kitchen Chores',
      // eslint-disable-next-line no-undef
      id: uuid.v4(),
      elapsed: 1273998,
      runningSince: null,
    },
  ]);

  function handleCreateFormSubmit(timer) {
    createTimer(timer);
  }

  function createTimer(timer) {
    const t = newTimer(timer);
    setTimers(timers.concat(t));
  }

  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList timers={timers} />
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} isOpen={true} />
      </div>
    </div>
  );
}

export default TimersDashboard;
