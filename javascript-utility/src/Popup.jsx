import { useState } from "react";

export const Popup = ({
  currentScriptSrc,
  isDefaultLabel,
  targetL,
  bhashiniTranslator,
  translatinga,
}) => {
  const [targetLanguage, setTargetLanguage] = useState(targetL || "none");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [translating, setTranslating] = useState(translatinga);
  const [isDefault, setDefault] = useState(isDefaultLabel);
  const [rerenderKey, setRerenderKey] = useState(0);
  const [isHovervingReset, setIsHovering] = useState(false);

  const SetHovering = () => {
    setIsHovering(true);
  };

  const DeHovering = () => {
    setIsHovering(false);
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
    if (isDefault) {
      localStorage.setItem("targetLanguage", e.target.value);
    }
    document.getElementById("translateButton").focus();
  };

  const handleTranslateClick = () => {
    if (handleDefault) {
      localStorage.setItem("targetLanguage", targetLanguage);
    }
    const targetLanguageButton = document.getElementById("targetLanguage");
    targetLanguageButton.setAttribute("disabled", "true");

    const errorMessage = document.querySelector(".errorMessage");
    if (targetLanguage === "none") {
      targetLanguageButton.removeAttribute("disabled");
      errorMessage.style.display = "flex";
      return;
    }
    errorMessage.style.display = "none";
    setTranslating(true);
    bhashiniTranslator
      .translateDOM(document.body, sourceLanguage, targetLanguage, 22)
      .then((res) => {
        targetLanguageButton.removeAttribute("disabled");
        setTranslating(false);
        setSourceLanguage(targetLanguage);
        localStorage.setItem("domElem", document.body.innerHTML);
        setRerenderKey((prev) => prev + 1);
      })
      .catch((err) => {
        targetLanguageButton.removeAttribute("disabled");
        setTranslating(false);
      });
  };

  const handleDefault = (e) => {
    setDefault((prev) => !prev);
    if (e.target.checked) localStorage.setItem("autoTranslate", true);
    else localStorage.setItem("autoTranslate", false);
    localStorage.setItem("targetLanguage", targetLanguage);
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      key={rerenderKey}
      className="language-select-container script"
      style={{
        padding: "5px",
        backgroundColor: "white",
        margin: "0",
        borderRadius: "5xp",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        width: "280px",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <img
          src="https://assets-v2.scaler.com/assets/programs/undergrad/webp/sst-logo-044e63073f49b767e6bca532d5fe0145b768bb12699e822d7cbce37efaa5f8f4.webp.gz"
          alt="Scaler School of Technology "
          class="logo"
          style={{
            width: "40%",
            marginBottom: "10px",
          }}
        />
      </div>

      <div
        className="selectCtn"
        style={{
          width: "224px",
          alignSelf: "center",
        }}
      >
        <label
          style={{
            fontSize: "12px",
            fontWeight: "bolder",
            lineHeight: "normal",
          }}
        >
          Translate to:
        </label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
          className="translate-to"
          style={{
            height: "fit-content",
            width: "224px",
            marginTop: "2px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
            backgroundSize: "24px 24px, 100% 100%",
            backgroundPosition: "right 8px center, right -15px center",
            backgroundRepeat: "no-repeat, no-repeat",
          }}
        >
          <option value="none">Select Language</option>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="ml">Malayalam</option>
          <option value="mr">Marathi</option>
          <option value="bn">Bengali</option>
          <option value="as">Assamese</option>
          <option value="gu">Gujarati</option>
          <option value="kn">Kannada</option>
          <option value="or">Odia</option>
          <option value="pa">Punjabi</option>
        </select>
      </div>
      <div
        className="errorMessage"
        style={{
          display: "none",
          color: "red",
          fontSize: "10px",
          fontWeight: "bolder",
          lineHeight: "normal",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        <span>* Please select a target language</span>
      </div>
      <div
        className="checkbox-container"
        style={{
          alignItems: "center",
          marginTop: "5px",
          justifyContent: "center",
        }}
      >
        <label
          for="saveAsDefault"
          style={{
            marginTop: "6px",
            fontSize: "12px",
            fontWeight: "bolder",
            lineHeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div>Remember for future use.</div>
          <input
            type="checkbox"
            id="saveAsDefault"
            onChange={handleDefault}
            checked={isDefault}
          />
        </label>
      </div>

      <div
        className="btn-container"
        style={{
          paddingTop: "2px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!translating ? (
          <button
            id="translateButton"
            disabled={false}
            onClick={handleTranslateClick}
            style={{
              marginTop: "10px",
              width: "122px",
              height: "30px",
              flexShrink: "0",
              border: "1px solid rgba(67, 101, 190, 0.5)",
              background: "#113caf",
              color: "#fff",
              textAlign: "center",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              alignSelf: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            Translate
          </button>
        ) : (
          <img
            src={`${currentScriptSrc}/../img/loading.png`}
            alt="load..."
            id="loading-img"
            style={{
              height: "30px",
              width: "30px",
              ObjectFit: "contain",
              transform: "rotate(0deg)",
              animation: `rotatet 2s linear infinite`,
            }}
          />
        )}
      </div>
      <div
        className="footer-cont"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <footer
          className="footer-ctn"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{
              width: "70px",
              fontFamily: "Inter",
              fontSize: "8px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              fontSize: "12px",
              fontWeight: "bolder",
              lineHeight: "normal",
            }}
          >
            Developed by
          </label>
          <img
            src={`${currentScriptSrc}/../img/logo.png`}
            alt="Bhashini"
            className="scaler-logo"
            style={{
              width: "40px",
              height: "auto",
              flexShrink: "0",
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
        </footer>
        <div className="reset-ctn">
          <button
            className="reset-btn"
            onMouseOver={SetHovering}
            onMouseLeave={DeHovering}
            onClick={handleReset}
            style={{
              marginTop: "10px",
              border: "none",
              outline: "none",
              width: "40px",
              height: "auto",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease-in-out",
              backgroundColor: "white",
              position: "relative", // Ensure the parent is positioned relatively
            }}
          >
            <img
              className="reset-btn"
              src={`${currentScriptSrc}/../img/reset.png`}
              alt="reset"
              data-tooltip-id="reset-tooltip"
              data-tooltip-content="Reset to default settings"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            {isHovervingReset ? (
              <span
                className="tooltip"
                style={{
                  visibility: "visible",
                  maxWidth: "100px", // Set maximum width
                  backgroundColor: "#f0f0f0", // Light background color
                  color: "#000", // Text color
                  textAlign: "center",
                  padding: "5px",
                  borderRadius: "6px",
                  position: "absolute",
                  zIndex: "1",
                  top: "10%", // Position a little higher
                  left: "-110%", // Position to the left
                  transform: "translate(0, -50%)", // Move it up by half its height
                  whiteSpace: "normal", // Allow word wrapping
                  fontSize: "10px", // Smaller font size
                }}
              >
                Reset to Original Page
              </span>
            ) : (
              <div></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
