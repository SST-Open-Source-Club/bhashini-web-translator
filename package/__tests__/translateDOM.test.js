import { mapNodesAndText } from "../src/utils/translateDOM";
import { htmlStringToDOM } from "../src/utils/convert";

describe("Tests for mapNodesAndText function", () => {
    it("When input is a very basic HTML page", () => {
        const HTMLstring = 
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
                <ul>
                    <li>Hello</li>
                    <li><a>Hello</a></li>
                </ul>
        </body>
        </html>`

        const expected = 2;

        const dom = htmlStringToDOM(HTMLstring);
        var map = new Map();

        mapNodesAndText(dom, map);
        expect(map !== null && map !== undefined) && expect(map.size).toEqual(expected);
    })
    it("When input is a moderately complex HTML page", () => {
        const HTMLstring = 
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

        const expected = 9;

        const dom = htmlStringToDOM(HTMLstring);
        var map = new Map();

        mapNodesAndText(dom, map);
        expect(map !== null && map !== undefined) && expect(map.size).toEqual(expected);
    })
    it("When input is a very basic HTML page", () => {
        const HTMLstring = 
        `<html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Complex HTML Example</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f8f8f8;
                    margin: 20px;
                    line-height: 1.6;
                }
                header {
                    background-color: #333;
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }
                nav {
                    display: flex;
                    justify-content: space-around;
                    background-color: #444;
                    padding: 10px;
                }
                nav a {
                    color: #fff;
                    text-decoration: none;
                }
                main {
                    margin: 20px;
                    padding: 20px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                section {
                    margin-bottom: 20px;
                }
                footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #333;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Welcome to My Complex Web Page</h1>
            </header>
            <nav>
                <a href='#'>Home</a>
                <a href='#'>About</a>
                <a href='#'>Services</a>
                <a href='#'>Contact</a>
            </nav>
            <main>
                <section>
                    <h2>Introduction</h2>
                    <p>This is a complex HTML example with various sections to demonstrate the structure of a content-rich web page.</p>
                </section>
                <section>
                    <h2>Featured Content</h2>
                    <article>
                        <h3>Article 1</h3>
                        <p>This is the content of article 1.</p>
                    </article>
                    <article>
                        <h3>Article 2</h3>
                        <p>This is the content of article 2.</p>
                    </article>
                </section>
                <section>
                    <h2>Latest Updates</h2>
                    <ul>
                        <li>Update <a>1</a></li>
                        <li>Update <a>2</a></li>
                        <li>Update <a>3</a></li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 My Complex Web Page. All rights reserved.</p>
            </footer>
        </body>
        </html>`

        const expected = 18;

        const dom = htmlStringToDOM(HTMLstring);
        var map = new Map();

        mapNodesAndText(dom, map);
        expect(map !== null && map !== undefined) && expect(map.size).toEqual(expected);
    })
})