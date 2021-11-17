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

  function handleEditFormSubmit(attrs) {
    updateTimer(attrs);
  }

  function handleTrashClick(timerId) {
    deleteTimer(timerId);
  }

  function deleteTimer(timerId) {
    setTimers(timers.filter((timer) => timer.id !== timerId));
  }

  function updateTimer(attrs) {
    setTimers(
      timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      })
    );
  }

  function createTimer(timer) {
    const t = newTimer(timer);
    setTimers(timers.concat(t));
  }

  function handleStartClick(timerId) {
    startTimer(timerId);
  }

  function handleStopClick(timerId) {
    stopTimer(timerId);
  }

  function startTimer(timerId) {
    const now = Date.now();
    setTimers(
      timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      })
    );
  }

  function stopTimer(timerId) {
    const now = Date.now();
    setTimers(
      timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return timer;
        }
      })
    );
  }

  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList
          timers={timers}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
          onStartClick={handleStartClick}
          onStopClick={handleStopClick}
        />
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
      </div>
    </div>
  );
}

export default TimersDashboard;
