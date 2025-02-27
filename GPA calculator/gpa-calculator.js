function getGrades() {
    let input = document.querySelector("#grades").value;
    return input.split(",").map(grade => grade.trim().toUpperCase());
}

function lookupGrade(grade) {
    if (grade === "A") return 4.0;
    if (grade === "B") return 3.0;
    if (grade === "C") return 2.0;
    if (grade === "D") return 1.0;
    if (grade === "F") return 0.0;
    return null;
}

function calculateGpa(gradesArray) {
    let points = gradesArray.map(lookupGrade).filter(value => value !== null);
    if (points.length === 0) return "Invalid input";
    let gpa = points.reduce((sum, val) => sum + val, 0) / points.length;
    return gpa.toFixed(2);
}

function displayGpa(gpa) {
    document.querySelector("#output").textContent = `Your GPA is: ${gpa}`;
}

function clickHandler() {
    let grades = getGrades();
    let gpa = calculateGpa(grades);
    displayGpa(gpa);
}

document.querySelector("#submitButton").addEventListener("click", clickHandler);
