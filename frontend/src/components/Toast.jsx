import { useEffect as r } from "react";

function Toast({ message, onClose }) {
  r(() => {
    const timer = setTimeout(onClose, 2600);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      ✅ {message}
    </div>
  );
}

export default Toast;
