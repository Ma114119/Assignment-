const countries = ["Pakistan", "Turkey", "Saudi Arabia", "UAE"];

console.log("Length of the array:", countries.length);
console.log("Array as a string:", countries.toString());
console.log("Element at index 1:", countries.at(1));
console.log("Joined with ' - ':", countries.join(" - "));

console.log("Popped element:", countries.pop());
console.log("Array after pop:", countries);

countries.push("Malaysia");
console.log("Array after push:", countries);

console.log("Shifted element:", countries.shift());
console.log("Array after shift:", countries);

countries.unshift("Qatar");
console.log("Array after unshift:", countries);

delete countries[1];
console.log("Array after delete:", countries);

const moreCountries = ["Iran", "Iraq"];
const allCountries = countries.concat(moreCountries);
console.log("Concatenated array:", allCountries);

countries.copyWithin(1, 2);
console.log("Array after copyWithin:", countries);

const nestedCountries = [["Pakistan", "Turkey"], ["Saudi Arabia", "UAE"]];
console.log("Flattened array:", nestedCountries.flat());

countries.splice(1, 1, "Oman");
console.log("Array after splice:", countries);

const newCountries = countries.toSpliced(2, 1);
console.log("New array with toSpliced:", newCountries);

const slicedCountries = countries.slice(1, 3);
console.log("Sliced array:", slicedCountries);

console.log("Index of 'Turkey':", countries.indexOf("Turkey"));
console.log("Last index of 'Turkey':", countries.lastIndexOf("Turkey"));
console.log("Includes 'Saudi Arabia'?:", countries.includes("Saudi Arabia"));
console.log("Includes 'Malaysia'?:", countries.includes("Malaysia"));

const foundCountry = countries.find(country => country.startsWith("T"));
console.log("Found country starting with 'T':", foundCountry);

const foundIndex = countries.findIndex(country => country.startsWith("T"));
console.log("Index of country starting with 'T':", foundIndex);

const foundLast = countries.findLast(country => country.startsWith("T"));
console.log("Last country starting with 'T':", foundLast);

const foundLastIndex = countries.findLastIndex(country => country.startsWith("T"));
console.log("Last index of country starting with 'T':", foundLastIndex);

countries.sort();
console.log("Sorted array:", countries);

countries.reverse();
console.log("Reversed array:", countries);

let sortedCountries = countries.toSorted();
console.log("New sorted array:", sortedCountries);

let reversedCountries = countries.toReversed();
console.log("New reversed array:", reversedCountries);

let students = [
    { name: "Anas", age: 22 },
    { name: "Memona", age: 20 },
    { name: "Muhammad", age: 25 }
];

students.sort((a, b) => a.age - b.age);
console.log("Sorted objects by age:", students);

let numbers = [3, 1, 4, 1, 5, 9];
numbers.sort(() => Math.random() - 0.5);
console.log("Randomly sorted numbers:", numbers);

console.log("Minimum number:", Math.min(...numbers));
console.log("Maximum number:", Math.max(...numbers));