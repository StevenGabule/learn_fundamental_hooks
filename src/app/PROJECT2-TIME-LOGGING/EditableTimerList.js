import EditableTimer from './EditableTimer';

function EditableTimerList({ timers, onFormSubmit, onTrashClick, onStartClick, onStopClick }) {
  return (
    <div id="timers">
      {timers.map((timer) => (
        <EditableTimer
          key={timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          editFormOpen={false}
          onFormSubmit={onFormSubmit}
          onTrashClick={onTrashClick}
          onStartClick={onStartClick}
          onStopClick={onStopClick}
        />
      ))}
    </div>
  );
}

export default EditableTimerList;
