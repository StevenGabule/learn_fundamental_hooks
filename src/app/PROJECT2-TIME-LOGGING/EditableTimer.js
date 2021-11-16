import Timer from "./Timer";
import TimerForm from "./TimerForm";

function EditableTimer({ editFormOpen, title, project, elapsed, runningSince }) {
  if (editFormOpen) {
    return <TimerForm title={title} project={project} />;
  } else {
    return <Timer title={title} project={project} elapsed={elapsed} runningSince={runningSince} />;
  }
}

export default EditableTimer;
