import { error } from 'console';
import BhashiniTranslator from './index.js';
import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config('.env');

const translator = new BhashiniTranslator(
    '58e362d3f7-f602-4ae6-bb29-5c72883f9a54',
    'a10ff891057547ba81fc48713426d89b'
);

// Tests for translateHTMLstring function

async function test_translateHTMLtoString_1(){

const HTMLstring = `<html><head><title>Document</title></head><body><h1>I am happy</h1></body></html>`;

var translatedHTMLstring = await translator.translateHTMLstring(HTMLstring,'en','hi');
translatedHTMLstring = translatedHTMLstring.innerHTML.trim();

const expectedHTMLstring = `<h1>में खुश हूँ।</h1>`;
try{
    assert(translatedHTMLstring === expectedHTMLstring.trim())

    console.log("✅ Test-1 passed !");
}
catch(e){
    console.log("\n");
    console.log("❌ Test-1 Failed !\n");
    console.log("Given HTML string : ",HTMLstring,"\n")
    console.log("➡️     Expected : ",expectedHTMLstring,"\n");
    console.log("➡️     Received : ", translatedHTMLstring,"\n");
}
}

async function test_translateHTMLtoString_2(){

const HTMLstring = 
`<html><head><title>Test</title></head><body><h1>Hello</h1><p>This is a test.</p></body></html>`;

var translatedHTMLstring = await translator.translateHTMLstring(HTMLstring,'en','hi');
translatedHTMLstring = translatedHTMLstring.innerHTML.trim();

const expectedHTMLstring = 
`<h1>नमस्ते।</h1><p>यह एक परीक्षा है।</p>`;
try{
    assert(translatedHTMLstring === expectedHTMLstring.trim())

    console.log("✅ Test-2 passed !");
}
catch(e){
    console.log("\n");
    console.log("❌ Test-2 Failed !\n");
    console.log("Given HTML string : \n",HTMLstring,"\n \n");
    console.log("➡️     Expected : \n",expectedHTMLstring,"\n");
    console.log("➡️     Received : \n", translatedHTMLstring,"\n");
}
}
async function test_translateHTMLtoString_3(){

const HTMLstring = 
'<html><head><title>Test</title></head><body><h1>Hello</h1><p><a href="#">This</a> is a test.</p></body></html>';

var translatedHTMLstring = await translator.translateHTMLstring(HTMLstring,'en','hi');
translatedHTMLstring = translatedHTMLstring.innerHTML.trim();

const expectedHTMLstring = '<h1>नमस्ते।</h1><p><a href="#">यह</a>एक परीक्षा है।</p>';
try{
    assert(translatedHTMLstring === expectedHTMLstring.trim())

    console.log("✅ Test-3 passed !");
}
catch(e){
    console.log("\n");
    console.log("❌ Test-3 Failed !\n");
    console.log("Given HTML string : \n",HTMLstring,"\n \n");
    console.log("➡️     Expected : ",expectedHTMLstring,"\n");
    console.log("➡️     Received : ", translatedHTMLstring,"\n");
}
}

async function tests_translateHTMLtoString(){
    console.log("🛠️     Testing translateHTMLtoString function in index.js ... \n");
    await test_translateHTMLtoString_1();
    await test_translateHTMLtoString_2();
    await test_translateHTMLtoString_3();
}

tests_translateHTMLtoString();
