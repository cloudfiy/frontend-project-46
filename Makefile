install: 
	npm ci

gendiff: 
	node bin/gendiff.js

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npx -n --experimental-vm-modules jest