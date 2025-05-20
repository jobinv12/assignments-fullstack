import { useTimer } from "react-timer-hook";

export default function Timer() {
  // Set the expiry time to 30 minutes from now
  const time = new Date();
  time.setMinutes(time.getMinutes() + 30);

  const { minutes, seconds } = useTimer({
    expiryTimestamp: time,
    autoStart: true,
    onExpire: () => {
      console.warn("⏰ Timer Expired");
    },
  });

  return (
    <div className="flex justify-end font-mono text-xl text-red-600 p-2">
      <span>{String(minutes).padStart(2, "0")}</span>:
      <span>{String(seconds).padStart(2, "0")}</span>
    </div>
  );
}
