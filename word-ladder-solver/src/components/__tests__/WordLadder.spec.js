import { test, expect } from "vitest";

import { mount } from "@vue/test-utils";

import WordLadder from "../WordLadder.vue";

test("WordLadder should be loading", () => {
  const wrapper = mount(WordLadder);
  expect(wrapper.html()).toContain("Loading");
});

test("finds a valid path between cold and warm", async () => {
  const wrapper = mount(WordLadder);

  const start = Date.now();
  const timeout = 40000; // 40 seconds
  while (wrapper.vm.loading && Date.now() - start < timeout) {
    await new Promise((r) => setTimeout(r, 100));
  }

  if (wrapper.vm.loading) {
    throw new Error("Loading timeout");
  }
  wrapper.setData({ word1: "cold", word2: "warm" });

  await wrapper.vm.runSolver();

  expect(wrapper.vm.pathFound).toBe(true);

  expect(wrapper.vm.stack.join(" -> ")).toBe(
    "cold -> cord -> card -> ward -> warm"
  );
});

test("finds a valid path between flat and ploy", async () => {
  const wrapper = mount(WordLadder);

  const start = Date.now();
  const timeout = 40000; // 40 seconds
  while (wrapper.vm.loading && Date.now() - start < timeout) {
    await new Promise((r) => setTimeout(r, 100));
  }

  if (wrapper.vm.loading) {
    throw new Error("Loading timeout");
  }

  wrapper.setData({ word1: "flat", word2: "ploy" });

  await wrapper.vm.runSolver();

  expect(wrapper.vm.pathFound).toBe(true);

  expect(wrapper.vm.stack.join(" -> ")).toBe("flat -> flay -> play -> ploy");
});
