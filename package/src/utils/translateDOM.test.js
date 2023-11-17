import { mapNodesAndText } from "./translateDOM.js";
import { htmlStringToDOM } from "./convert.js";
import assert from 'assert';

function test_mapNodesAndText_1(){

    const HTMLstring = 
    '<html><head><title>Test</title></head><body><h1>Hello</h1><p><a href="#">This</a> is a test.</p></body></html>';
    
    const dom = htmlStringToDOM(HTMLstring);
    const map = new Map();
    mapNodesAndText(dom,map);

    const expectedHTMLstring = '<body><h1>Hello</h1><p><a href="#">This</a> is a test.</p></body>';
    try{
        assert(map !== null && map.size === 3);
        console.log("✅ Test-1 passed !");
    }
    catch(e){
        console.log("\n");
        console.log("❌ Test-1 Failed !\n\n");
        console.log("➡️     Expected : \n","A map with size 3 => \n",
        `\t Map(3) {
            'Hello' => [ Text {} ],
            'This' => [ Text {} ],
            'is a test.' => [ Text {} ]
          }`);
        console.log("➡️     Received : \n", map,"\n");
    }
}


function test_mapNodesAndText_2(){

    var map = new Map();

    const HTMLstring = 
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Complex HTML Example</title></head><body><header><h1>Main Title</h1><p>Subtitle or Tagline</p></header><nav><ul><li><a href="#section1">Section 1</a></li><li><a href="#section2">Section 2</a></li><li><a href="#section3">Section 3</a></li></ul></nav><section id="section1"><h2>Section 1</h2><p>This is the content of section 1.</p></section><section id="section2"><h2>Section 2</h2><p>This is the content of section 2.</p></section><section id="section3"> <h2>Section 3</h2><p>This is the content of section 3.</p></section><footer><p>© 2023 Your Website</p></footer></body></html>';
  
    const dom = htmlStringToDOM(HTMLstring);
    mapNodesAndText(dom, map);

    try{
        assert(map !== null && map.size === 9);
        console.log("✅ Test-2 passed ! \n \n");
    }
    catch(e){
        console.log("\n");
        console.log("❌ Test-2 Failed ! \n \n");
        console.log("➡️     Expected : \n","or map with size 9 => \n",
        `\t Map(9) {
            'Main Title' => [ Text {} ],
            'Subtitle or Tagline' => [ Text {} ],
            'Section 1' => [ Text {}, Text {} ],
            'Section 2' => [ Text {}, Text {} ],
            'Section 3' => [ Text {}, Text {} ],
            'This is the content of section 1.' => [ Text {} ],
            'This is the content of section 2.' => [ Text {} ],
            'This is the content of section 3.' => [ Text {} ],
            '© 2023 Your Website' => [ Text {} ]","\n")`);
        console.log("➡️     Received : ", map,"\n");
    }
}

function tests_mapNodesAndText(){

    console.log("🛠️     Testing mapNodesAndText function in translateDOM.js ... \n");

    test_mapNodesAndText_1();
    test_mapNodesAndText_2();
}

tests_mapNodesAndText();