const chrono = require('chrono-node');
const PRIORITY_KEYWORDS = {
  critical: ['critical', 'blocker', 'showstopper'],
  high: ['high priority', 'high', 'urgent', 'asap', 'immediately'],
  medium: ['medium', 'normal'],
  low: ['low priority', 'low']
};
const STATUS_KEYWORDS = {
  'In Progress': ['in progress', 'working on', "i'm working on"],
  'Done': ['done', 'completed', 'finish', 'finished']
};
function findPriority(text) {
  const lower = text.toLowerCase();
  for (const [key, arr] of Object.entries(PRIORITY_KEYWORDS)) {
    for (const kw of arr) if (lower.includes(kw)) return key.charAt(0).toUpperCase() + key.slice(1);
  }
  return null;
}
function findStatus(text) {
  const lower = text.toLowerCase();
  for (const [status, arr] of Object.entries(STATUS_KEYWORDS)) {
    for (const kw of arr) if (lower.includes(kw)) return status;
  }
  return null;
}
function extractTitle(text, parsedDateText) {
  let t = text;
  t = t.replace(/(high priority|low priority|critical|urgent|asap|it's urgent|it's high priority|immediately)/gi, '');
  t = t.replace(/(in progress|done|completed|finished|working on)/gi, '');
  if (parsedDateText) { t = t.replace(parsedDateText, ''); }
  t = t.replace(/\b(remind me to|remind me|create (a|an)|create|please|could you|would you)\b/gi, '');
  t = t.replace(/[\s\-\,\:]+/g, ' ').trim();
  if (!t || t.length < 3) {
    const words = text.split(/\s+/).slice(0, 10).join(' ');
    t = words;
  }
  return t.charAt(0).toUpperCase() + t.slice(1);
}
exports.parse = (text) => {
  const parsedDates = chrono.parse(text);
  let dueDate = null;
  let parsedDateText = '';
  if (parsedDates && parsedDates.length > 0) {
    const first = parsedDates[0];
    dueDate = first.date();
    parsedDateText = first.text;
  }
  const priority = findPriority(text) || 'Medium';
  const status = findStatus(text) || 'To Do';
  const title = extractTitle(text, parsedDateText) || text;
  return { title, priority, status, dueDate: dueDate ? dueDate.toISOString() : null, parsedDateText };
};
