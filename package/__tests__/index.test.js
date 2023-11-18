import BhashiniTranslator from "../src/index";

describe("Tests translateHTMLstring and translateDOM function", () => {
    it("Translates a very basic HTML string successfully", async () => {
    const translator = new BhashiniTranslator(
        process.env.BHASHINI_API_KEY,
        process.env.BHASHINI_USER_ID
        )
        
        // test-1
        
        const htmlString = 
        `<html>
        <head>
            <title>Document</title>
        </head>
        <body>
            <h1>Hello</h1>
        </body>
        </html>`;
        
        const expected = 
        `<body>
            <h1>नमस्ते।</h1>
        
        </body>`;

        const received = await translator.translateHTMLstring(htmlString,'en','hi');
        expect(received.outerHTML).toEqual(expected);

    });

    it("Translates a very basic HTML string with an h1 and a p tag successfully", async () => {
        const translator = new BhashiniTranslator(
            process.env.BHASHINI_API_KEY,
            process.env.BHASHINI_USER_ID
        )
        // test-2

        const htmlString = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Complex HTML Example</title>
        </head>
        <body>
            <h1>Hello</h1>
                <p>This is a test.</p>
        </body>`;

        const expected =
        `<body>
            <h1>नमस्ते।</h1>
                <p>यह एक परीक्षा है।</p>
        </body>`;

        const received = await translator.translateHTMLstring(htmlString,'en','hi');
        expect(received.outerHTML).toEqual(expected);
    
    });

    it("Translates a simple HTML string with multiple elements successfully", async () => {
        const translator = new BhashiniTranslator(
            process.env.BHASHINI_API_KEY,
            process.env.BHASHINI_USER_ID
        )
        // test-3
    
        const htmlString = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Complex HTML Example</title>
        </head>
        <body>
            <div>
                <h2>Hello, World!</h2>
                    <p>This is a simple HTML string with multiple elements.</p>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                <a href='https://www.example.com'>Visit Example.com</a>
            </div>
        </body>`;

        const expected = 
        `<body>
            <div>
                <h2>हैलो, दुनिया!</h2>
                    <p>यह कई तत्वों के साथ एक सरल एच. टी. एम. एल. स्ट्रिंग है।</p>
                    <ul>
                        <li>मद 1</li>
                        <li>मद 2</li>
                        <li>मद 3</li>
                    </ul>
                <a href="https://www.example.com">Example.com पर जाएँ</a>
            </div>
        </body>`;

        const received = await translator.translateHTMLstring(htmlString,'en','hi');
        expect(received.outerHTML).toEqual(expected);

    });

    it("A moderately complex HTML string", async () => {
        const translator = new BhashiniTranslator(
            process.env.BHASHINI_API_KEY,
            process.env.BHASHINI_USER_ID
        )

        // test-4

        const htmlString = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Complex HTML Example</title>
        </head>
        <body>
            <header>
                <h1>Main Title</h1>
                    <p>Subtitle or Tagline</p>
            </header>
            <nav>
                <ul>
                    <li><a href="#section1">Section 1</a></li>
                    <li><a href="#section2">Section 2</a></li>
                    <li><a href="#section3">Section 3</a></li>
                </ul>
            </nav>
            <section id="section1">
                <h2>Section 1</h2>
                    <p>This is the content of section 1.</p>
            </section>
            <section id="section2">
                <h2>Section 2</h2>
                    <p>This is the content of section 2.</p>
            </section>
            <section id="section3">
                <h2>Section 3</h2>
                    <p>This is the content of section 3.</p>
            </section>
            <footer>
                <p>© 2023 Your Website</p>
            </footer>
        </body>
        </html>`

        const expected = 
        `<body>
            <header>
                <h1>मुख्य शीर्षक</h1>
                    <p>उपशीर्षक या टैगलाइन</p>
            </header>
            <nav>
                <ul>
                    <li><a href=\"#section1\">खंड 1</a></li>
                    <li><a href=\"#section2\">खंड 2</a></li>
                    <li><a href=\"#section3\">खंड 3</a></li>
                </ul>
            </nav>
            <section id=\"section1\">
                <h2>खंड 1</h2>
                    <p>यह धारा 1 की सामग्री है।</p>
            </section>
            <section id=\"section2\">
                <h2>खंड 2</h2>
                    <p>यह धारा 2 की सामग्री है।</p>
            </section>
            <section id=\"section3\">
                <h2>खंड 3</h2>
                    <p>यह धारा 3 की सामग्री है।</p>
            </section>
            <footer>
                <p>© 2023 आपकी वेबसाइट</p>
            </footer>
        
        </body>`;

        const received = await translator.translateHTMLstring(htmlString,'en','hi');
        expect(received.outerHTML).toEqual(expected);

    });
  

    it("a very complex html string with style, script and img tags", async () => {
        const translator = new BhashiniTranslator(
            process.env.BHASHINI_API_KEY,
            process.env.BHASHINI_USER_ID
        )
        // test-4

        const htmlString = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Complex HTML Example</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 20px;
                    padding: 20px;
                    background-color: #f0f0f0;
                }
                h1 {
                    color: #333;
                }
                .container {
                    width: 80%;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .important-text {
                    font-weight: bold;
                    color: #e44d26;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to My Complex HTML Example</h1>
                <p>This is a paragraph of text in my complex HTML file. <span class="important-text">This text is important!</span></p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
                <img src="https://via.placeholder.com/300" alt="Placeholder Image">
                <a href="https://www.example.com">Visit Example.com</a>
            </div>
        </body>
        </html>`

        const expected = 
        `<body>
            <div class=\"container\">
                <h1>माई कॉम्प्लेक्स एच. टी. एम. एल. उदाहरण में आपका स्वागत है</h1>
                <p>यह मेरी जटिल एच. टी. एम. एल. फाइल में पाठ का एक अनुच्छेद है।<span class=\"important-text\">यह पाठ महत्वपूर्ण है!</span></p>
                <ul>
                    <li>मद 1</li>
                    <li>मद 2</li>
                    <li>मद 3</li>
                </ul>
                <img src=\"https://via.placeholder.com/300\" alt=\"Placeholder Image\">
                <a href=\"https://www.example.com\">Example.com पर जाएँ</a>
            </div>
        
        </body>`

        const received = await translator.translateHTMLstring(htmlString,'en','hi');
        expect(received.outerHTML).toEqual(expected);

    });

});