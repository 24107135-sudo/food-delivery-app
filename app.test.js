import test from "node:test";
import assert from "node:assert/strict";
import { addMenuItem, calculateCartTotal, filterRestaurants, restaurants } from "../src/app.js";

test("filters restaurants by cuisine and case-insensitive search", () => {
  assert.deepEqual(filterRestaurants(restaurants, "", "Italian").map((item) => item.id), ["little-italy"]);
  assert.deepEqual(filterRestaurants(restaurants, "CURRY", "All").map((item) => item.id), ["curry-leaf"]);
  assert.equal(filterRestaurants(restaurants, "not found").length, 0);
});

test("adding an existing menu item increments its quantity", () => {
  const item = restaurants[0].menu[0];
  const once = addMenuItem([], restaurants[0].id, item);
  const twice = addMenuItem(once.cart, restaurants[0].id, item);
  assert.equal(twice.cart.length, 1);
  assert.equal(twice.cart[0].quantity, 2);
  assert.equal(calculateCartTotal(twice.cart), item.price * 2);
});

test("cart prevents mixing items from different restaurants", () => {
  const first = addMenuItem([], restaurants[0].id, restaurants[0].menu[0]);
  const result = addMenuItem(first.cart, restaurants[1].id, restaurants[1].menu[0]);
  assert.match(result.error, /another restaurant/);
  assert.equal(result.cart.length, 1);
});

test("cart total sums quantities and prices", () => {
  assert.equal(calculateCartTotal([
    { price: 100, quantity: 2 },
    { price: 55, quantity: 1 }
  ]), 255);
});
