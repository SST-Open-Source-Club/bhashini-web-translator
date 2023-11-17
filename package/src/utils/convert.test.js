import { htmlStringToDOM }  from "./convert.js";
import assert from 'assert';

function test_htmlStringToDOM_1(){

    const HTMLstring = 
    '<html><head><title>Test</title></head><body><h1>Hello</h1><p><a href="#">This</a> is a test.</p></body></html>';
    
    var dom = htmlStringToDOM(HTMLstring,'en','hi');
    
    const expectedHTMLstring = '<body><h1>Hello</h1><p><a href="#">This</a> is a test.</p></body>';
    try{
        assert(dom.outerHTML === expectedHTMLstring.trim());
        console.log("✅ Test-1 passed !");
    }
    catch(e){
        console.log("\n");
        console.log("❌ Test-1 Failed !\n\n");
        console.log("➡️     Expected : ",expectedHTMLstring,"\n");
        console.log("➡️     Received : ", dom,"\n");
    }
}

function test_htmlStringToDOM_2(){

    const HTMLstring = 
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Complex HTML Example</title></head><body><header><h1>Main Title</h1><p>Subtitle or Tagline</p></header><nav><ul><li><a href="#section1">Section 1</a></li><li><a href="#section2">Section 2</a></li><li><a href="#section3">Section 3</a></li></ul></nav><section id="section1"><h2>Section 1</h2><p>This is the content of section 1.</p></section><section id="section2"><h2>Section 2</h2><p>This is the content of section 2.</p></section><section id="section3"> <h2>Section 3</h2><p>This is the content of section 3.</p></section><footer><p>© 2023 Your Website</p></footer></body></html>';
    
    var dom = htmlStringToDOM(HTMLstring,'en','hi');
    
    const expectedHTMLstring = '<body><header><h1>Main Title</h1><p>Subtitle or Tagline</p></header><nav><ul><li><a href="#section1">Section 1</a></li><li><a href="#section2">Section 2</a></li><li><a href="#section3">Section 3</a></li></ul></nav><section id="section1"><h2>Section 1</h2><p>This is the content of section 1.</p></section><section id="section2"><h2>Section 2</h2><p>This is the content of section 2.</p></section><section id="section3"> <h2>Section 3</h2><p>This is the content of section 3.</p></section><footer><p>© 2023 Your Website</p></footer></body>';
    try{
        assert(dom.outerHTML === expectedHTMLstring.trim());
        console.log("✅ Test-2 passed ! \n \n");
    }
    catch(e){
        console.log("\n");
        console.log("❌ Test-2 Failed !\n\n");
        console.log("➡️     Expected : ",expectedHTMLstring,"\n");
        console.log("➡️     Received : ", dom.outerHTML,"\n");
    }
}

function tests_htmlStringToDOM(){

    console.log("🛠️     Testing htmlStringToDOM function in convert.js ... \n");

    test_htmlStringToDOM_1();
    test_htmlStringToDOM_2();
}

tests_htmlStringToDOM();
    