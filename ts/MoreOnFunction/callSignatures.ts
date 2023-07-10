type DescriptionFuntion = {
	description: string;
	(args: number): boolean;
};
function describabelFuntion(fn: DescriptionFuntion) {
	console.log(fn.description + " returned " + fn(11));
}
function greaterThanTen(number: number) {
	return number > 10;
}
greaterThanTen.description = "greaterThanTen";
describabelFuntion(greaterThanTen);
