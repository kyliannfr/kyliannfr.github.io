document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const yearBox = document.getElementById('yearBox');
  const years = [2004, 2020, 2023, 2025, 2026];
  const progressBar = document.querySelector('.timeline-line.progress');

  function updateScrollState() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (progressBar) {
      progressBar.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`;
    }

    const yearIndex = Math.min(
      years.length - 1,
      Math.max(0, Math.floor(progress * (years.length - 1) + 0.5))
    );

    if (yearBox) {
      yearBox.textContent = years[yearIndex];
    }
  }

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
});
