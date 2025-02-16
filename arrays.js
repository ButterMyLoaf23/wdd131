const steps = ["one", "two", "three"];
const listTemplate = (step) => `<li>${step}</li>`;

const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join("");

const grades = ["A", "B", "A"];
const convertGrade = (grade) => {
    if (grade === "A") return 4;
    if (grade === "B") return 3;
    return 0;
};
const gpaPoints = grades.map(convertGrade);

const totalPoints = gpaPoints.reduce((total, points) => total + points, 0);

const gpa = totalPoints / gpaPoints.length;

document.querySelector("#gpaDisplay").textContent = `GPA: ${gpa.toFixed(2)}`

const words = ["Watermelon", "Peach", "Apple", "Tomato", "Grape"];

const smallWords = words.filter(function (word){
    return word.length < 6});

const smallWordsHtml = smallWords.map(word => `<li>${word}</li>`).join("");

document.querySelector("#filterWords").innerHTML = smallWordsHtml;

const myArray = [12, 34, 21, 54];

const luckyNumber = 21;
let luckyIndex = myArray.indexOf(luckyNumber);

document.querySelector("#luckyNumberDisplay").textContent = luckyIndex !==-1