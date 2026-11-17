import assert from "node:assert/strict";
import test from "node:test";
import { horizontalScrollOffset } from "../lib/motion/scroll-runtime.ts";

test("horizontal travel starts at viewport top and tracks the page in either direction", () => {
  const distance = 680;
  const stageTops = [120, 0, -120.5, -420, -680, -820, -420, -120.5, 0, 120];
  assert.deepEqual(
    stageTops.map((top) => horizontalScrollOffset(top, distance)),
    [0, 0, 120.5, 420, 680, 680, 420, 120.5, 0, 0],
  );
});

test("the track stops at the last card after a viewport resize or when all cards fit", () => {
  assert.equal(horizontalScrollOffset(-740, 1000), 740);
  assert.equal(horizontalScrollOffset(-740, 490), 490);
  assert.equal(horizontalScrollOffset(-740, 0), 0);
});
