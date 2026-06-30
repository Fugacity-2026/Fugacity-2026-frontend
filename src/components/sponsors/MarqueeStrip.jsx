import MarqueeEventCard from "./MarqueeEventCard";
const MarqueeStrip = ({ events }) => {
  const doubled = [...events, ...events];
  return (
    <div className="marquee-container overflow-hidden py-2">
      <div className="marquee-track gap-0">
        {doubled.map((ev, i) => (
          <MarqueeEventCard key={`${ev.name}-${i}`} event={ev} />
        ))}
      </div>
    </div>
  );
};
export default MarqueeStrip;