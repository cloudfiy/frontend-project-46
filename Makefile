install: 
	npm ci

gendiff: 
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npx test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
