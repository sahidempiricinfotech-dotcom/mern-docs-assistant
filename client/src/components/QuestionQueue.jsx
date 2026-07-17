export function QuestionQueue({ questions }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Question Queue</h2>
        <span>{questions.length} seeded</span>
      </div>

      <ul className="question-list">
        {questions.map((question) => (
          <li key={question.id}>
            <strong>{question.id}</strong>
            <span>{question.title}</span>
            <small>{question.owner} - {question.status}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
