function wordsCounter(text)
{
  let words = document.getElementById("words");
  const wordsArr = text.trim().split(" ");
  if (wordsArr.filter((word) => word !== "").length > 500) {
    alert('Word count exceeded');
    return false;
  }
  words.innerHTML = wordsArr.filter((word) => word !== "").length;
}

const Portfolio = function() {
	function makeWords() {
		var words = [
			{
				text: "laravel",
				weight: 15
			}, {
				text: "django",
				weight: 8
			}, {
				text: "c",
				weight: 14
			}, {
				text: "css3",
				weight: 7
			}, {
				text: "mySQL",
				weight: 7
			}, {
				text: "javascript",
				weight: 10
			}, {
				text: "html",
				weight: 9
			}, {
				text: "php",
				weight: 12.3
			}, {
				text: "data structures",
				weight: 4
			}, {
				text: "algorithms",
				weight: 8
			}
		];
		return words;
	}

	function typeAnimation() {
        var typed = new Typed('.element', {
            strings: ["First sentence.", "Second sentence."],
            typeSpeed: 30
          });
           Typed.new("#writing-text", {
			strings: [
				"am a Full-Stack Developer.", "love to code.", "also like to teach programming.", "am a problem solver.", " am also a self learner.", "am a Developer"
			],
			// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
			stringsElement: null,
			// typing speed
			typeSpeed: 1,
			contentType: 'text',
			callback: function() {
				$("#writing-text").css({"color": "#fff", "background-color": "#C8412B"});
			},
			preStringTyped: function() {},
			onStringTyped: function() {}
		});
	}

	return {
		typeAnimation: typeAnimation
	}

}();


Portfolio.typeAnimation();