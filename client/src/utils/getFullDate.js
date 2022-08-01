export default function(date) {
  const dates = new Date(date).toLocaleDateString().split('');
  const year = dates.splice(-4).join('');

  return `${year}/${dates.slice(0, dates.length - 1).join('')}`;
}
