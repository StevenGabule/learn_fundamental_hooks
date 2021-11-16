import EditableTimer from './EditableTimer';

function EditableTimerList({ timers, onFormSubmit }) {
  return (
    <div id="timers">
      {timers.map((timer) => (
        <EditableTimer
          key={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          editFormOpen={false}
          onFormSubmit={onFormSubmit}
        />
      ))}
    </div>
  );
}

export default EditableTimerList;
