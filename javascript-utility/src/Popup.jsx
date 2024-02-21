import { useState } from "react";

export const Popup = ({
  currentScriptSrc,
  auto,
  targetL,
  bhashiniTranslator,
  translatinga,
}) => {
  const [targetLanguage, setTargetLanguage] = useState(targetL || "none");
  const [translating, setTranslating] = useState(translatinga);
  const [isDefault, setDefault] = useState(auto);
  const [rerenderKey, setRerenderKey] = useState(0);

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
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
      .translateDOM(document.body, "en", targetLanguage, "22")
      .then((res) => {
        targetLanguageButton.removeAttribute("disabled");
        setTranslating(false);
        setRerenderKey((prev) => prev + 1);
      })
      .catch((err) => {
        targetLanguageButton.removeAttribute("disabled");
        setTranslating(false);
      });
  };

  const handleDefault = (e) => {
    setDefault((prev) => !prev);
    localStorage.setItem("autoTranslate", e.target.checked.toString());
    localStorage.setItem("targetLanguage", targetLanguage);
  };

  const handleReset = () => {
    window.location.reload();
    localStorage.setItem("autoTranslate", "false");
    localStorage.setItem("targetLanguage", "none");
  };

  return (
    <div
      key={rerenderKey}
      className="language-select-container script"
      style={{
        padding: "20px",
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
      <img
        src="https://assets-v2.scaler.com/assets/programs/undergrad/webp/sst-logo-044e63073f49b767e6bca532d5fe0145b768bb12699e822d7cbce37efaa5f8f4.webp.gz"
        alt="Scaler School of Technology "
        class="logo"
        style={{
          width: "40%",
          aspectRatio: "3/2",
          objectFit: "contain",
          flexShrink: "0",
        }}
      />

      <div
        className="selectCtn"
        style={{
          width: "224px",
          alignSelf: "center",
        }}
      >
        <label
          style={{
            color: "#5a5a5a",
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
            marginTop: "20px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
            appearance: "none",
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
          display: "none",
          alignItems: "center",
          marginTop: "5px",
          justifyContent: "center",
        }}
      >
        <label
          for="saveAsDefault"
          style={{
            marginTop: "20px",
            color: "#5a5a5a",
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
          paddingTop: "20px",
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
              marginTop: "15px",
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
            marginBottom: "5px",
            marginLeft: "5px",
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "start",
          }}
        >
          <label
            className="footer"
            style={{
              width: "70px",
              color: "#4b4b4b",
              fontFamily: "Inter",
              fontSize: "8px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              color: "#5a5a5a",
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
            }}
          >
            <img
              src={`${currentScriptSrc}/../img/reset.png`}
              alt="reset"
              data-tooltip-id="reset-tooltip"
              data-tooltip-content="Reset to default settings"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
