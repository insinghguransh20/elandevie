import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAnimate() {
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => {
      const els = document.querySelectorAll('.anim-up,.anim-left,.anim-right,.anim-pop');
      if (!els.length) return;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('go'); obs.unobserve(e.target); } });
      }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
      els.forEach(el => { if (!el.classList.contains('go')) obs.observe(el); });
      return () => obs.disconnect();
    }, 60);
    return () => clearTimeout(t);
  }, [location.pathname]);
}
