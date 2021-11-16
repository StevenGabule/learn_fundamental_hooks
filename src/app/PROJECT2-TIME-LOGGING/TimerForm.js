import { useState } from 'react';

function TimerForm({ id, title: oldTitle, project: oldProject, onFormClose, onFormSubmit }) {
  const [title, setTitle] = useState(oldTitle || '');
  const [project, setProject] = useState(oldProject || '');

  const submitText = id ? 'Update' : 'Create';

  function handleSubmit() {
    onFormSubmit({
      id: id,
      title: title,
      project: project,
    });
  }

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="ui form">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="project">Project</label>
            <input type="text" value={project} onChange={(e) => setProject(e.target.value)} id="project" />
          </div>
          <div className="ui two bottom attached buttons">
            <button type="button" onClick={handleSubmit} className="ui basic blue button">
              {submitText}
            </button>
            <button type="button" onClick={onFormClose} className="ui basic red button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerForm;
