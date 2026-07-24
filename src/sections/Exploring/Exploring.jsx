import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Exploring.css';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    title: 'System Design',
    desc: 'Distributed systems, scalability patterns, and architecture for millions of users.',
    icon: '🏛️',
    color: '#6366f1',
    status: 'Active',
  },
  {
    title: 'AI Agents',
    desc: 'Autonomous AI systems, tool-use, planning, and multi-agent coordination.',
    icon: '🤖',
    color: '#8b5cf6',
    status: 'Exploring',
  },
  {
    title: 'Cloud Architecture',
    desc: 'AWS services, serverless, IaC, and building resilient cloud-native applications.',
    icon: '☁️',
    color: '#06b6d4',
    status: 'Active',
  },
  {
    title: 'Scalable Backends',
    desc: 'Microservices, event-driven architecture, caching strategies, and performance.',
    icon: '⚡',
    color: '#10b981',
    status: 'Deepening',
  },
  {
    title: 'Advanced React',
    desc: 'Concurrent rendering, custom hooks, performance optimization, and state mastery.',
    icon: '⚛️',
    color: '#f59e0b',
    status: 'Active',
  },
  {
    title: 'Modern AI Apps',
    desc: 'LLM integrations, RAG pipelines, vector databases, and production AI systems.',
    icon: '🧠',
    color: '#f43f5e',
    status: 'Exploring',
  },
];

const STATUS_COLORS = {
  Active: '#10b981',
  Exploring: '#6366f1',
  Deepening: '#f59e0b',
};

export default function Exploring() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            ease: 'back.out(1.5)',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="exploring" ref={sectionRef} className="exploring-section section-full">
      <div className="section">
        <div ref={titleRef} className="exploring-header">
          <span className="tag-chip">Currently Exploring</span>
          <h2 className="section-title">
            Always <span className="text-gradient">Learning</span>
          </h2>
          <p className="section-sub">
            The frontier keeps moving. So do I.
          </p>
        </div>

        <div className="exploring-grid">
          {topics.map((topic, i) => (
            <div
              key={topic.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`explore-card glass ${hoveredIndex === i ? 'hovered' : ''}`}
              style={{ '--card-color': topic.color }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="explore-card-top">
                <span className="explore-icon">{topic.icon}</span>
                <span
                  className="explore-status"
                  style={{ color: STATUS_COLORS[topic.status], borderColor: `${STATUS_COLORS[topic.status]}40`, background: `${STATUS_COLORS[topic.status]}14` }}
                >
                  <span className="status-dot" style={{ background: STATUS_COLORS[topic.status] }} />
                  {topic.status}
                </span>
              </div>
              <h3 className="explore-title" style={{ color: hoveredIndex === i ? topic.color : 'var(--text-primary)' }}>
                {topic.title}
              </h3>
              <p className="explore-desc">{topic.desc}</p>
              <div className="explore-bar">
                <div
                  className="explore-bar-fill"
                  style={{ background: topic.color, width: hoveredIndex === i ? '100%' : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
