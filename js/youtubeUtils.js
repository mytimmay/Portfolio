export function convertYouTubeUrl(url) {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v");
  const start = urlObj.searchParams.get("t");

  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  if (start) {
    const seconds = parseYouTubeStartTime(start);
    embedUrl += `?start=${seconds}`;
  }

  return embedUrl;
}

export function parseYouTubeStartTime(t) {
  const match = t.match(/(?:(\d+)m)?(\d+)s/);
  if (!match) return 0;
  const minutes = parseInt(match[1] || 0, 10);
  const seconds = parseInt(match[2] || 0, 10);
  return minutes * 60 + seconds;
}
