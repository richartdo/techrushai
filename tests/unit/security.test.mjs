import assert from "node:assert/strict";
import test from "node:test";
import { canAccessUserRecord } from "../../src/lib/security/ownership.mjs";

test("authenticated learners can access their own records", () => assert.equal(canAccessUserRecord("learner-a", "learner-a"), true));
test("user isolation rejects another learner's record", () => assert.equal(canAccessUserRecord("learner-a", "learner-b"), false));
test("anonymous callers cannot access private records", () => assert.equal(canAccessUserRecord(undefined, "learner-a"), false));
