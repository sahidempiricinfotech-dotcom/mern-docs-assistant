import { useEffect, useState } from 'react';

export function LiveFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const response = await fetch('/api/events');
      if (!response.ok) {
        return;
      }

      const payload = await response.json();
      setEvents(payload.events || []);
    }

    loadEvents();
    const timer = setInterval(loadEvents, 5000);
  }, []);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Live Feed</h2>
        <span>{events.length} events</span>
      </div>

      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.type}</strong>
            <span>{event.summary}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
