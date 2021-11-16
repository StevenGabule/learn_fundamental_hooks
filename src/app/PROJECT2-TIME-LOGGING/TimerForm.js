function TimerForm({ title, project }) {
  const submitText = title ? "Update" : "Create";

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="ui form">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input type="text" defaultValue={title} id="title" />
          </div>
          <div className="field">
            <label htmlFor="project">Project</label>
            <input type="text" defaultValue={project} id="project" />
          </div>
          <div className="ui two bottom attached buttons">
            <button className="ui basic blue button">{submitText}</button>
            <button className="ui basic red button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerForm;
