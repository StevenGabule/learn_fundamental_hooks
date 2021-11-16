import { useState } from 'react';
import Timer from './Timer';
import TimerForm from './TimerForm';

function EditableTimer({ id, title, project, elapsed, runningSince, onFormSubmit }) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  function handleEditClick() {
    openForm();
  }

  function handleFormClose() {
    closeForm();
  }

  function openForm() {
    setEditFormOpen(true);
  }

  function closeForm() {
    setEditFormOpen(false);
  }

  function handleSubmit(timer) {
    onFormSubmit(timer);
    closeForm();
  }

  if (editFormOpen) {
    return <TimerForm onFormSubmit={handleSubmit} onFormClose={handleFormClose} key={id} title={title} project={project} />;
  } else {
    return <Timer key={id} title={title} project={project} elapsed={elapsed} runningSince={runningSince} onEditClick={handleEditClick} />;
  }
}

export default EditableTimer;
