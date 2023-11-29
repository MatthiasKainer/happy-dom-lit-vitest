import { beforeEach, describe, expect, test } from "vitest";
import {component} from "./index"
import * as sdom from "@open-wc/semantic-dom-diff"

const dom = (component) => sdom.getDiffableHTML(component.shadowRoot?.innerHTML ?? "")

describe("testing my component", () => {
    beforeEach(async () => {
        document.body.appendChild(component)
    })

    test("if no name just returns hello, without a name", () => {
        expect(dom(component)).toMatchInlineSnapshot(`
          "<p>
            Hello, !
          </p>
          "
        `)
    })

    test("if with name, returns it!", async () => {
        component.setAttribute("name", "world")
        await component.updateComplete
        expect(dom(component)).toMatchInlineSnapshot(`
          "<p>
            Hello, world!
          </p>
          "
        `)
    })

    test("if with names, returns a list of it!", async () => {
        component.setAttribute("name", "john,connor,oberst")
        await component.updateComplete
        expect(dom(component)).toMatchInlineSnapshot(`
          "<p>
              Hello john!
            </p>
            <p>
              Hello connor!
            </p>
            <p>
              Hello oberst!
            </p>
          "
        `)
    })
})