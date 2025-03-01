document.addEventListener("DOMContentLoaded", function () {
    let participantCount = 1;

    document.getElementById("add").addEventListener("click", function () {
        participantCount++;
        const newParticipantHTML = participantTemplate(participantCount);
        
        document.querySelector(".participants #add").insertAdjacentHTML("beforebegin", newParticipantHTML);
    });

    document.querySelector("form").addEventListener("submit", submitForm);
});

import { participantTemplate, successTemplate, totalFees, getParticipantCount } from "./templates.js";

function submitForm(event) {
    event.preventDefault();

    const totalFee = totalFees();
    const adultName = document.getElementById("adult_name").value.trim();
    const participantCount = getParticipantCount();

    if (!adultName) {
        alert("Please enter the adult's name.");
        return;
    }

    document.querySelector("form").style.display = "none";
    
    const summaryElement = document.getElementById("summary");
    summaryElement.innerHTML = successTemplate({
        name: adultName,
        participants: participantCount,
        fee: totalFee
    });
    summaryElement.style.display = "block";
}
