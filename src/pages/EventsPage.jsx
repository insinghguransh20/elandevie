import useAnimate from '../hooks/useAnimate.js';

export default function EventsPage() {
  useAnimate();
  return (
    <section className="sec hiw-bg" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="lbl anim-up">Events & Workshops</div>
        <h2 className="sec-h anim-up d1">Coming Soon</h2>
        <p className="sec-p anim-up d2">We're preparing new events and workshops for you. Please check back soon.</p>
      </div>
    </section>
  );
}
