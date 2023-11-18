import { htmlStringToDOM } from "../src/utils/convert";

describe("Testing the htmlStringtoDOM function", () => {
    it("Converts a very basic HTML string to a DOM object", () => {

        const HTMLstring =
        `<html>
        <head>
            <title>My First HTML Page</title>
        </head>
        <body>
            <h1>Hello, World!</h1>
            <p>This is a basic HTML page.</p>
        </body>
        </html>`

        const expected = 
        `<body>
            <h1>Hello, World!</h1>
            <p>This is a basic HTML page.</p>
        
        </body>`

        const received = htmlStringToDOM(HTMLstring);

        expect(received.outerHTML).toEqual(expected);
    })
    it("Converts a very basic HTML string with multiple elements to a DOM object", () => {

        const HTMLstring =
        `<html>
        <head>
            <title>Basic HTML Example</title>
        </head>
        <body>
            <h1>Welcome to My Web Page!</h1>
                <p>This is a paragraph of text.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
        </body>
        </html>`

        const expected = 
        `<body>
            <h1>Welcome to My Web Page!</h1>
                <p>This is a paragraph of text.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
        
        </body>`

        const received = htmlStringToDOM(HTMLstring);

        expect(received.outerHTML).toEqual(expected);
    })
    it("Converts a moderately complex HTML string to a DOM object", () => {

        const HTMLstring =
        `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Web Page</title>
        </head>
        <body>
            <header>
                <h1>My Web Page</h1>
            </header>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
            <main>
                <h2>Welcome to My Web Page</h2>
                <p>This is a moderately complex HTML example with styling.</p>
                <section>
                    <h3>Section 1</h3>
                    <p>This is the content of section 1.</p>
                </section>
                <section>
                    <h3>Section 2</h3>
                    <p>This is the content of section 2.</p>
                </section>
            </main>
            <footer>
                <p>© 2023 My Web Page. All rights reserved.</p>
            </footer>
        </body>
        </html>`

        const expected = 
        `<body>
            <header>
                <h1>My Web Page</h1>
            </header>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
            <main>
                <h2>Welcome to My Web Page</h2>
                <p>This is a moderately complex HTML example with styling.</p>
                <section>
                    <h3>Section 1</h3>
                    <p>This is the content of section 1.</p>
                </section>
                <section>
                    <h3>Section 2</h3>
                    <p>This is the content of section 2.</p>
                </section>
            </main>
            <footer>
                <p>© 2023 My Web Page. All rights reserved.</p>
            </footer>
        
        </body>`

        const received = htmlStringToDOM(HTMLstring);

        expect(received.outerHTML).toEqual(expected);
    })
    it("Converts a very complex HTML string to a DOM object", () => {

        const HTMLstring =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Complex HTML Example</title>
            <style>
                body {
                    font-family: "Arial", sans-serif;
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
        
        </body>`

        const received = htmlStringToDOM(HTMLstring);

        expect(received.outerHTML).toEqual(expected);
    })
})