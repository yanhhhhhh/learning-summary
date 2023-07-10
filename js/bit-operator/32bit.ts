function bit(num: number) {
	let templateString = "";
	for (let i = 31; i >= 0; i--) {
		const tempNumber = num & (1 << i);
		let string = tempNumber ? "1" : "0";
		templateString += string;
	}
	console.log(templateString);
}
bit(5);
