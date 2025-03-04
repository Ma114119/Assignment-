let fullName = "Muhammad Anas Asif";

console.log("Length of the string:", fullName.length);

console.log("Character at index 5:", fullName.charAt(5));
console.log("Unicode of character at index 5:", fullName.charCodeAt(5));
console.log("Character at index 5 using at():", fullName.at(5));
console.log("Character at index 5 using bracket notation:", fullName[5]);

console.log("Slice from index 0 to 8:", fullName.slice(0, 8));
console.log("Substring from index 0 to 8:", fullName.substring(0, 8));
console.log("Substr from index 0 with length 8:", fullName.substr(0, 8));

console.log("Uppercase:", fullName.toUpperCase());
console.log("Lowercase:", fullName.toLowerCase());

console.log("Concatenated string:", fullName.concat(" is a software engineer"));

console.log("Trimmed string:", "   " + fullName + "   ".trim());
console.log("Trimmed start:", "   " + fullName.trimStart());
console.log("Trimmed end:", fullName + "   ".trimEnd());


console.log("Padded start with '*':", fullName.padStart(25, '*'));
console.log("Padded end with '*':", fullName.padEnd(25, '*'));

console.log("Repeated string:", fullName.repeat(2));

console.log("Replaced 'Anas' with 'Ali':", fullName.replace("Anas", "Ali"));
console.log("Replaced all 'a' with '@':", fullName.replaceAll("a", "@"));

console.log("Split by space:", fullName.split(" "));

console.log("Index of 'Anas':", fullName.indexOf("Anas"));
console.log("Last index of 'a':", fullName.lastIndexOf("a"));
console.log("Search for 'Asif':", fullName.search("Asif"));

console.log("Includes 'Anas'?:", fullName.includes("Anas"));
console.log("Starts with 'Muhammad'?:", fullName.startsWith("Muhammad"));
console.log("Ends with 'Asif'?:", fullName.endsWith("Asif"));