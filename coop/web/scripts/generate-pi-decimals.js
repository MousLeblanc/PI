const fs = require("fs");
const path = require("path");

function piDecimals(n) {
  const digits = BigInt(n) + 20n;
  const one = 10n ** digits;
  const arctan = (x) => {
    let sum = 0n;
    let term = one / x;
    const x2 = x * x;
    let k = 1n;
    let sign = 1n;
    while (term !== 0n) {
      sum += (sign * term) / (2n * k - 1n);
      term = term / x2;
      k++;
      sign = -sign;
    }
    return sum;
  };
  const pi = 4n * (4n * arctan(5n) - arctan(239n));
  const s = pi.toString().padStart(Number(digits) + 1, "0");
  return s.slice(1, n + 1);
}

const dec = piDecimals(10000);
const out = path.join(__dirname, "..", "src", "data", "pi-decimals.ts");
fs.writeFileSync(
  out,
  `/** First 10_000 decimal digits of π (after the leading 3). */\nexport const PI_DECIMALS = "${dec}";\n`,
);
console.log("wrote", out, "len", dec.length, "head", dec.slice(0, 30));
