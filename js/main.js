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