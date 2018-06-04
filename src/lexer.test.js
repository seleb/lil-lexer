import { getLexer } from "./lexer";

describe("getLexer", () => {
	it("is a function", () => {
		expect(getLexer).toBeInstanceOf(Function);
	});
	it("returns a function", () => {
		expect(
			getLexer([
				{
					name: "name",
					regex: "$unmatchable regex",
					getValue: () => {}
				}
			])
		).toBeInstanceOf(Function);
	});
	it("fails if not provided valid rules", () => {
		expect(() => getLexer()).toThrow();
		expect(() => getLexer([])).toThrow();
		expect(() => getLexer([{}])).toThrow();
		expect(() =>
			getLexer([
				{
					name: "",
					regex: "",
					getValue: null
				}
			])
		).toThrow();
		expect(() =>
			getLexer([
				{
					name: "name",
					regex: "",
					getValue: null
				}
			])
		).toThrow();
		expect(() =>
			getLexer([
				{
					name: "name",
					regex: "$unmatchable regex",
					getValue: null
				}
			])
		).toThrow();
		expect(() =>
			getLexer([
				{
					name: "name",
					regex: "$unmatchable regex",
					getValue: () => {}
				}
			])
		).not.toThrow();
	});
	describe("returned function", () => {
		const lex = getLexer([
			{
				name: "name",
				regex: "$unmatchable regex",
				getValue: () => {}
			}
		]);
		it("can be called with no source", () => {
			expect(lex()).toBeDefined();
		});
		it("returns an array", () => {
			expect(lex()).toBeDefined();
		});
		it("converts anything not in the provided rules to a fill token with characters as value", () => {
			expect(lex("a")).toEqual([
				{
					name: "fill",
					value: "a"
				}
			]);
			expect(lex("The quick brown fox jumps over the lazy dog")).toEqual([
				{
					name: "fill",
					value: "The quick brown fox jumps over the lazy dog"
				}
			]);
			expect(lex("1234567890")).toEqual([
				{ name: "fill", value: "1234567890" }
			]);
			expect(lex("abcdefghijklmnopqrstuvwxyz")).toEqual([
				{ name: "fill", value: "abcdefghijklmnopqrstuvwxyz" }
			]);
			expect(lex("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual([
				{ name: "fill", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
			]);
			expect(lex("<>[]``!@#$%^&*()_+")).toEqual([
				{ name: "fill", value: "<>[]``!@#$%^&*()_+" }
			]);
		});
	});
});
