hueArray = [0, 27, 52, 110, 185, 240, 269, 316];

function getColor(contributions) {
  if (contributions >= 0 && contributions < 7) {
    const shade = Math.floor(contributions * 255 / 6);
    return `rgb(${shade}, ${shade}, ${shade})`;
  }
  
  const hue = hueArray[Math.floor(contributions / 7) - 1];
  return `hsl(${hue}, 100%, ${(contributions % 7) * 100 / 7 + 5}%)`;
}

function colorizeHeatmap() {
  const cells = document.querySelectorAll('.ContributionCalendar-day');
  cells.forEach(cell => {
    const tooltipId = cell.getAttribute('aria-labelledby');
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
      const tooltipText = tooltip.textContent;
      const match = tooltipText.match(/(\d+|No) contribution/);
      if (match) {
        if (match[1] === 'No') {
          cell.style.backgroundColor = getColor(0);
        } else {
          const contributions = parseInt(match[1]);
          cell.style.backgroundColor = getColor(contributions);
        }
      }
    }
  });
}

colorizeHeatmap();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      colorizeHeatmap();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });