import { useRef, useState } from "react";
import FocusableInput from "./FocusableInput";

function RefFeatureDemo() {
  const focusInputRef = useRef(null);
  const cleanupInputRef = useRef(null);
  const [focusEvents, setFocusEvents] = useState(0);
  const [showCleanupInput, setShowCleanupInput] = useState(true);

  function focusNameInput() {
    focusInputRef.current?.focus();
  }

  return (
    <div className="ref-demo">
      <h3>Ref as a Prop</h3>
      <p className="ref-demo-text">
        This input receives <code>ref</code> directly as a prop (without{" "}
        <code>forwardRef</code>).
      </p>

      <div className="ref-demo-controls">
        <FocusableInput
          ref={focusInputRef}
          className="ref-input"
          placeholder="Focus me using the button"
        />
        <button type="button" className="register-button" onClick={focusNameInput}>
          Focus input
        </button>
      </div>

      <h3>Callback Ref Cleanup</h3>
      <p className="ref-demo-text">
        Focus events captured: <strong>{focusEvents}</strong>
      </p>

      <label className="failure-toggle">
        <input
          type="checkbox"
          checked={showCleanupInput}
          onChange={(event) => setShowCleanupInput(event.target.checked)}
        />
        <span>Mount cleanup-demo input</span>
      </label>

      {showCleanupInput ? (
        <input
          className="ref-input"
          placeholder="Focus me, then unmount to trigger cleanup"
          ref={(element) => {
            if (!element) {
              return;
            }

            cleanupInputRef.current = element;

            const handleFocus = () => {
              setFocusEvents((previous) => previous + 1);
            };

            element.addEventListener("focus", handleFocus);

            return () => {
              element.removeEventListener("focus", handleFocus);
              if (cleanupInputRef.current === element) {
                cleanupInputRef.current = null;
              }
            };
          }}
        />
      ) : null}
    </div>
  );
}

export default RefFeatureDemo;
