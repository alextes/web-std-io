// @ts-nocheck

const assert = require('assert');
const fetch = require('@web-std/fetch');
assert.strictEqual(
	typeof fetch,
	'function',
	'default import must be a function'
);

const {Request, Response, Headers} = require('../../');
const {FetchError} = require('../../errors/fetch-error.js');
const {AbortError} = require('../../errors/abort-error.js');
assert.ok(new FetchError() instanceof Error, 'FetchError must be an Error');
assert.ok(
	new AbortError() instanceof Error,
	'AbortError must be an extension of Error'
);
assert.ok(
	new Request('https://www.test.com').headers instanceof Headers,
	'Request class is not exposing correct functionality'
);
assert.strictEqual(
	new Response(null, {headers: {a: 'a'}}).headers.get('a'),
	'a',
	'Response class is not exposing correct functionality'
);

fetch(
	`data:text/plain;base64,${Buffer.from('Hello World!').toString('base64')}`
)
	.then(res => res.text())
	.then(text => assert.strictEqual(text, 'Hello World!'))
	.then(() => {
		console.log('CommonJS build artifact fitness tests successfully');
	});
