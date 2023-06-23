// Use https://github.com/github/gemoji/blob/master/db/emoji.json

let test = {};
test.forEach(a => {
	a.category = a.category.toLowerCase().replace(/ & /, '-');
});
test.forEach(a => {
	a.name = a.aliases.sort((a, b) => b.length - a.length)[0];
});
test.forEach(a => {
	delete a.ios_version;
	delete a.unicode_version;
});
test.forEach(a => {
	a.group = a.category;
	delete a.category;
});
test.forEach(a => {
	a.symbol = a.emoji;
	delete a.emoji;
});
test.forEach(a => {
	if (a.group == 'flags') {
		a.group = 'symbols';
		a.tags.push('flag');
	}
});
JSON.stringify(test);
