// turn a string of 24h time into words (e.g. '00:12' => 'twelve twelve am')
function timeWord(time) {
	if (time == '00:00') return 'midnight';
	if (time == '12:00') return 'noon';

	const hour = parseInt(time.slice(0, 2)) % 12;
	const minute = parseInt(time.slice(-2));
	const amPm = parseInt(time.slice(0, 2)) < 12 ? 'am' : 'pm';

	const hours = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
	const tens = ['oh', '', 'twenty', 'thirty', 'forty', 'fifty'];
	const singles = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

	// construct word string
	const timeWord = `${hours[hour]} ${minute == 0 ? "o'clock" : tens[Math.floor(minute / 10)]} ${singles[minute] ? singles[minute] : singles[minute % 10]} ${amPm}`;
	// remove double spaces, from 'https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space'
	return timeWord.replace(/ +/g, " ");
}

module.exports = timeWord;