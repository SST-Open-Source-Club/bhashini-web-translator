import React, { useState } from "react";

const Pop = ({ triggerElement, children, currentScriptSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bhashini-icon"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      {triggerElement ? (
        <div>
          {/* <button onClick={togglePopup}>{triggerElement}</button> */}
          <img
            src="https://icons.iconarchive.com/icons/marcus-roberto/google-play/256/Google-Translate-icon.png"
            alt="logo"
            onClick={togglePopup}
            style={{
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
          />
        </div>
      ) : null}
      {isOpen && (
        <div
          className="popup"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
          }}
        >
          <img
            className="popup-close"
            src={`${currentScriptSrc}/../img/close.png`}
            onClick={togglePopup}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          />
          <div className="popup-content">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Pop;
