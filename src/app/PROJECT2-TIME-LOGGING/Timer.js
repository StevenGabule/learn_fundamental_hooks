import { useEffect, useState } from 'react';
import { renderElapsedString } from '../../helpers';
import TimerActionButton from './TimerActionButton';

function Timer({ id, elapsed: oldElapsed, title, project, onEditClick, onTrashClick, runningSince, onStopClick, onStartClick }) {
  const [elapsed, setElapsed] = useState(renderElapsedString(oldElapsed, runningSince));

  useEffect(() => {
    const intervalSet = setInterval(() => {
      setElapsed(elapsed);
    }, 50);
    return () => {
      clearInterval(intervalSet);
    };
  });

  function handleTrashClick() {
    onTrashClick(id);
  }

  function handleStartClick() {
    onStartClick(id);
  }

  function handleStopClick(id) {
    onStopClick(id);
  }

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="header">{title}</div>
        <div className="meta">{project}</div>
        <div className="center aligned description">
          <h2>{elapsed}</h2>
        </div>
        <div className="extra content">
          <span onClick={onEditClick} className="right floated edit icon">
            <i className="edit icon" />
          </span>
          <span onClick={handleTrashClick} className="right floated edit icon">
            <i className="trash icon" />
          </span>
        </div>
      </div>
      <div className="ui bottom attached blue basic button">Start</div>
      <TimerActionButton onStartClick={handleStartClick} onStopClick={handleStopClick} timerIsRunning={!!runningSince} />
    </div>
  );
}

export default Timer;
