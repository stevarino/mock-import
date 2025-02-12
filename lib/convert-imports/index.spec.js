import {createMockImport} from '../mock-import.js';
import {readFile} from 'fs/promises';
import {
    test,
    stub,
} from 'supertape';
import {convertImports} from './index.js';

const {url} = import.meta;
const {reImport} = createMockImport(import.meta.url);

test('mock-imports: convert imports', async (t) => {
    const from = new URL('./fixture/import.js', url);
    const to = new URL('./fixture/import-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('/glob.js');
    const cache = new Map();
    const traceCache = new Map();
    
    cache.set('/glob.js', {});
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
        traceCache,
    });
    
    t.equal(result, expected);
    t.end();
});

test('mock-imports: convert imports: bin', async (t) => {
    const from = new URL('./fixture/bin.js', url);
    const to = new URL('./fixture/bin-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('/glob.js');
    const cache = new Map();
    const traceCache = new Map();
    
    cache.set('/glob.js', {});
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
        traceCache,
    });
    
    t.equal(result, expected);
    t.end();
});

test('mock-imports: convert imports: namespace', async (t) => {
    const from = new URL('./fixture/namespace.js', url);
    const to = new URL('./fixture/namespace-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('/glob.js');
    const cache = new Map();
    const traceCache = new Map();
    
    cache.set('/glob.js', {});
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
        traceCache,
    });
    
    t.equal(result, expected);
    t.end();
});

test('mock-imports: convert imports: export-from', async (t) => {
    const from = new URL('./fixture/export-from.js', url);
    const to = new URL('./fixture/export-from-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('/fs.js');
    const cache = new Map();
    
    cache.set('/fs.js', {});
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
    });
    
    t.equal(result, expected);
    t.end();
});

test('mock-imports: convert imports: dynamic', async (t) => {
    const from = new URL('./fixture/dynamic.js', url);
    const to = new URL('./fixture/dynamic-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('../glob.js');
    const cache = new Map();
    
    cache.set('../glob.js', {});
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
    });
    
    t.equal(result, expected);
    t.end();
});

test('mock-imports: convert imports: reImport', async (t) => {
    const from = new URL('./fixture/re-import.js', url);
    const to = new URL('./fixture/re-import-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('../re-import.js');
    const cache = new Map();
    
    const {convertImports} = await reImport('./index.js');
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
        nested: true,
    });
    
    t.equal(result, expected);
    t.end();
});

test('mock-imports: convert imports: reImport: no env', async (t) => {
    const from = new URL('./fixture/re-import.js', url);
    const source = await readFile(from, 'utf8');
    
    const resolve = stub().returns('../re-import.js');
    const cache = new Map();
    
    const {convertImports} = await reImport('./index.js');
    
    const result = await convertImports({
        sourceFileName: '',
        sourceMapName: '',
        resolve,
        source,
        cache,
        nested: false,
    });
    
    t.equal(result, source);
    t.end();
});

/*
test('mock-imports: convert imports: sourcemap', async (t) => {
    const from = new URL('./fixture/sourcemap.js', url);
    const to = new URL('./fixture/sourcemap-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const resolve = stub().returns('../sourcemap.js');
    const cache = new Map();
    
    const {convertImports} = await reImport('./index.js');
    
    const result = await convertImports({
        sourceFileName: 'hello.js',
        resolve,
        source,
        cache,
        nested: true,
    });
    
    t.equal(result, expected);
    t.end();
});
*/

