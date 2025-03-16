console.log("sorting.js is successfully loaded!");

const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

function compareFn(a, b) {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  }
  return 0;
}
const anotherSort = simpleList.sort(compareFn);
console.log("Sorted List:", anotherSort);

function searchStringList(list, query) {
  return list.filter(string => string.toLowerCase().includes(query.toLowerCase()));
}
console.log(searchStringList(simpleList, "b"));
console.log(searchStringList(simpleList, "an"));

function searchHikeList(list, q) {
  const filtered = list.filter(item =>
    item.name.toLowerCase().includes(q.toLowerCase()) ||
    item.description.toLowerCase().includes(q.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(q.toLowerCase()))
  );

  console.log("Filtered Hikes:", filtered);

  const sorted = filtered.sort((a, b) => {
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  console.log("Sorted Hikes:", sorted);
  return sorted;
}

console.log(searchHikeList(hikes, "yellowstone"));
console.log(searchHikeList(hikes, "moderate"));
console.log(searchHikeList(hikes, "al"));

function searchList(list, query) {
    function searchCallback(string) {
      return string.toLowerCase().includes(query.toLowerCase());
    }
    return list.filter(searchCallback);
  }
  console.log(searchList(simpleList, "b"));
  console.log(searchList(simpleList, "an"));
  function searchList(list, q) {
    function searchCallback(item) {
      return (
        item.name.toLowerCase().includes(q.toLowerCase()) ||
        item.description.toLowerCase().includes(q.toLowerCase()) ||
        item.tags.find((tag) => tag.toLowerCase().includes(q.toLowerCase()))
      );
    }
    const filtered = list.filter(searchCallback);

    const sorted = filtered.sort((a, b) => a.distance > b.distance);
    return sorted;
  }
  console.log(searchList(hikes, "yellowstone"));
  console.log(searchList(hikes, "moderate"));
  console.log(searchList(hikes, "al"));