# Minimalistic Example to show an issue with happy-dom, lit and vitest

tl;dr

if no top level element, but multiple children directly in a shadow root, 
happy-dom renders `<?>` instead of the elements.

## Reproduce

Clone repo and run

```sh

npm install
npm test

```

Result should be 

```
> y@1.0.0 test
> vitest


 DEV  v0.34.6 /home/mkainer/projects/private/happy-dom-lit-vitest

 ❯ index.test.js (3)
   ❯ testing my component (3)
     ✓ if no name just returns hello, without a name
     ✓ if with name, returns it!
     × if with names, returns a list of it!

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  index.test.js > testing my component > if with names, returns a list of it!
Error: Snapshot `testing my component > if with names, returns a list of it! 1` mismatched

- Expected
+ Received

- "<p>
-     Hello john!
-   </p>
-   <p>
-     Hello connor!
-   </p>
-   <p>
-     Hello oberst!
-   </p>
+ "<?>
  "

 ❯ index.test.js:35:32
     33|         component.setAttribute("name", "john,connor,oberst")
     34|         await component.updateComplete
     35|         expect(dom(component)).toMatchInlineSnapshot(`
       |                                ^
     36|           "<p>
     37|               Hello john!

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

  Snapshots  1 failed
 Test Files  1 failed (1)
      Tests  1 failed | 2 passed (3)
   Start at  16:41:21
   Duration  1.02s (transform 52ms, setup 0ms, collect 69ms, tests 20ms, environment 247ms, prepare 149ms)


 FAIL  Tests failed. Watching for file changes...
       press u to update snapshot, press h to show help
```

## Observations

### Does it work normally?

This works in the browser. Run 

```sh
npx http-serve
```

and open the page in the browser. The lit component in index.html will render correctly.

### What's the workaround?

if you change 

```diff
-       html`${this.name.split(",").map(el => html`<p>Hello ${el}!</p>`)}`
+       html`<div>${this.name.split(",").map(el => html`<p>Hello ${el}!</p>`)}</div>`
```

it will output 

```html
<div>
    <p>
        Hello john!
    </p>
    <p>
        Hello connor!
    </p>
    <p>
        Hello oberst!
    </p>
</div>
```