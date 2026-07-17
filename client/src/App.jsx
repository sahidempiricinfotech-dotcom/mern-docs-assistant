import { LiveFeed } from './components/LiveFeed.jsx';
import { QuestionQueue } from './components/QuestionQueue.jsx';

const seededQuestions = [
  {
    id: 'Q04',
    title: 'Async route error handling',
    owner: 'Ravi',
    status: 'stale-answer'
  },
  {
    id: 'Q14',
    title: 'Mongoose pool sizing',
    owner: 'Dana',
    status: 'needs-review'
  },
  {
    id: 'Q16',
    title: 'JWT expiry handling',
    owner: 'Priya',
    status: 'stale-answer'
  }
];

export function App() {
  return (
    <main className="shell">
      <section className="toolbar">
        <div>
          <h1>Docs Assistant</h1>
          <p>Version-aware question queue for the engineering team.</p>
        </div>
      </section>

      <section className="content-grid">
        <QuestionQueue questions={seededQuestions} />
        <LiveFeed />
      </section>
    </main>
  );
}
