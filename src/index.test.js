import {expect} from 'chai';  //import the assertion library
import jsdom from 'jsdom';
import fs from 'fs';  //file system so you can read files

//using arrow function for brevity, but could use regular functions
describe('Our first test', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

describe('index.html', () => {
	it('should say h1 that says Users', (done) => {  //when you do an asnch test, you have to pass done and call it later, so that Mocha knows the test is done
		const index = fs.readFileSync('./src/index.html', "utf-8");  //get index.html into memory
		//vv can optionally place JavaScript files to load into the JSDOM environemnt as the second parameter, but need to use isomorphic fetch
		jsdom.env(index, function(err, window) {
			const h1 = window.document.getElementsByTagName('h1')[0];  //give me a reference to the first h1 on the page
			expect(h1.innerHTML).to.equal("Users");
			done();  //asynch test, so have to tell Mocha when done.
			window.close();
		});
	});
});
