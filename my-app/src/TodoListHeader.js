import { useEffect, useState } from "react";

const Header = ({ tasks, setTasks }) => {
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const withDoneParam = urlParams.get("withDone");
    setShowNotFinishedOnly(withDoneParam === "1");
  }, []);

  const handleCheckboxChange = () => {
    const newUrlParams = new URLSearchParams(window.location.search);
    if (showNotFinishedOnly) {
      newUrlParams.delete("withDone");
    } else {
      newUrlParams.set("withDone", "1");
    }

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newUrlParams}`
    );
    setShowNotFinishedOnly(!showNotFinishedOnly);
  };

  return (
    <div className="header">
      <input
        type="checkbox"
        checked={showNotFinishedOnly}
        onChange={handleCheckboxChange}
      />
      You have{" "}
      <span>
        {showNotFinishedOnly
          ? tasks.filter((task) => !task.done).length
          : tasks.length}{" "}
        tasks left !
      </span>
    </div>
  );
};

export default Header;
