import BhashiniTranslator from "@scaler-school-of-technology/bhashini-web-translator";
import dotenv from "dotenv";

dotenv.config();

const translator = new BhashiniTranslator(
  process.env.BHASHINI_API_KEY,
  process.env.BHASHINI_USER_ID
);

const html = `
<header class="section sec1 header active" id="home">
  <div class="header-content">
    <div class="left-header">
      <div class="h-shape"></div>
      <div class="image">
        <img src="" alt="" />
      </div>
    </div>
    <div class="right-header">
      <h1 class="name">
        Hi, I'm <span>Abhinav Gupta.</span> A Software Engineering Student.
      </h1>
      <p>
        I am currently a Computer Engineering Student in India. I love to code,
        build new things and learn new techonologies. I also love to make
        webpages.
      </p>
      <div class="btn-con">
        <a href="" class="main-btn">
          <spam class="btn-text">Download CV</spam>
          <spam class="btn-icon"><i class="fas fa-download"></i></spam>
        </a>
      </div>
    </div>
  </div>
</header>

<main>
  <section class="section sec2 about" id="about">
    <div class="main-title">
      <h2>About <span>me</span><span class="bg-text">My Stats</span></h2>
    </div>

    <div class="about-container">
      <div class="left-about">
        <h4>Information About me</h4>
        <p>
          A paragraph generator is an online software that generates a text
          based on user-provided input. You can generate long paragraphs just by
          giving in input a list of keywords or a full sentence. The software
          then uses AI to generate a paragraph of text that try to respect your
          input and include the specific words.
          <!--TODO Add information about ME! Dman I don't know what to add here, ask didi maybe-->
        </p>

        <div class="btn-con">
          <a href="" class="main-btn">
            <spam class="btn-text">Download CV</spam>
            <spam class="btn-icon"><i class="fas fa-download"></i></spam>
          </a>
        </div>
      </div>
      <div class="right-about">
        <div class="about-item">
          <div class="about-text">
            <p class="large-text">50+</p>
            <p class="small-text">
              Projects <br />
              Completed
            </p>
          </div>
        </div>
        <div class="about-item">
          <div class="about-text">
            <p class="large-text">8.5+</p>
            <p class="small-text">CGPA <br /></p>
          </div>
        </div>
      </div>
    </div>
    <div class="about-stats">
      <h4 class="stat-title">My Skills</h4>
      <div class="skill-container">
        <div class="skill">
          <i class="fa-brands fa-html5"></i>
          <p>HTML</p>
        </div>
        <div class="skill">
          <i class="fa-brands fa-css3-alt"></i>
          <p>CSS</p>
        </div>
        <div class="skill">
          <i class="fa-brands fa-js"></i>
          <p>JavaScript</p>
        </div>
        <div class="skill">
          <i class="fa-brands fa-java"></i>
          <p>Java</p>
        </div>
        <div class="skill">
          <i class="fa-brands fa-python"></i>
          <p>Python</p>
        </div>
        <div class="skill">
          <i class="fa-brands fa-github"></i>
          <p>Git Hub</p>
        </div>
        <div class="skill">
          <i class="fa-brands fa-react"></i>
          <p>React JS</p>
        </div>
      </div>
    </div>
    <div class="about-education">
      <h4 class="edu-title">My Education</h4>
      <div class="edu-stat"></div>
    </div>
  </section>
  <section class="section sec3 projects" id="portfolio"></section>

  <section class="section sec4 skills" id="timeline"></section>
  <section class="section sec5 contact" id="contact">
    <div class="contact-container">
      <div class="main-title">
        <h2>Contact <span>Me</span></h2>
      </div>
      <div class="contact-content-container">
        <div class="left-contact">
          <h4>Contact me here</h4>
          <p></p>
        </div>
        <div class="right-contact"></div>
      </div>
    </div>
  </section>
</main>
<div class="controls">
  <div class="control control-1 active-btn" data-id="home">
    <i class="fa-sharp fa-solid fa-house"></i>
  </div>
  <div class="control" data-id="about">
    <i class="fas fa-user"></i>
  </div>
  <div class="control" data-id="portfolio">
    <i class="fas fa-briefcase"></i>
  </div>
  <div class="control" data-id="timeline">
    <i class="far fa-newspaper"></i>
  </div>
  <div class="control" data-id="contact">
    <i class="fas fa-envelope-open"></i>
  </div>

  <div class="theme-btn">
    <i class="fas fa-adjust"></i>
  </div>
</div>
`;

translator.translateHTMLstring(html, "en", "hi").then((dom) => {
  console.log(dom.outerHTML);
});
