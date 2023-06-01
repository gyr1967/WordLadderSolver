import { test, expect } from "vitest";

import { mount } from "@vue/test-utils";

import WordLadder from "../WordLadder.vue";

test("WordLadder should be loading", () => {
    const wrapper = mount(WordLadder);
    expect(wrapper.html()).toContain("Loading");
});


