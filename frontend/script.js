// Array to store all submitted data
let formData = JSON.parse(localStorage.getItem("applicationData")) || [];

// Submit button
const submitBtn = document.getElementById("button");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Collecting all input values
    const user = {
        name: document.querySelector(".name").value.trim(),
        mobile: document.querySelector(".mobile").value.trim(),
        email: document.querySelector(".email").value.trim(),
        dob: document.querySelector(".dob").value,

        gender: document.querySelector(".gender").value,
        maritalStatus: document.querySelector(".maritalStatus").value,

        street: document.querySelector(".street").value.trim(),
        city: document.querySelector(".city").value.trim(),
        state: document.querySelector(".state").value.trim(),
        pincode: document.querySelector(".pincode").value.trim(),

        qualification: document.querySelector(".qualification").value.trim(),
        passingYear: document.querySelector(".passingYear").value,

        jobRole: document.querySelector(".jobRole").value,

        uploadpic: document.querySelector(".uploadpic").value,
        uploadResume: document.querySelector(".uploadResume").value,

        // Collect multiple skills
        skills: [...document.querySelectorAll(".skills input:checked")].map(s => s.value),

        // Collect multiple languages
        languages: [...document.querySelectorAll(".languages input:checked")].map(l => l.value),

        experience: document.querySelector(".experience").value.trim(),

        expectedSalary: document.querySelector(".expectedSalary").value.trim(),
        preferredJobLocation: document.querySelector(".preferredJobLocation").value,

        emergencyContact: document.querySelector(".emergencyContact").value.trim(),
        referenceName: document.querySelector(".referenceName").value.trim(),
        referenceContact: document.querySelector(".referenceContact").value.trim()

    };

    // SEND DATA TO BACKEND (MongoDB)
    fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert("✔ Data saved to MongoDB!");
        })
        .catch(err => {
            console.log(err);
            alert("❌ Failed to save data to database");
        });


    // ------------ VALIDATION ------------
    if (
        !user.name || !user.mobile || !user.email || !user.dob ||
        !user.gender || !user.maritalStatus ||
        !user.street || !user.city || !user.state || !user.pincode ||
        !user.qualification || !user.passingYear ||
        !user.jobRole || !user.uploadpic || !user.uploadResume ||
        user.skills.length === 0 || user.languages.length === 0 || !user.expectedSalary ||
        !user.preferredJobLocation
    ) {
        alert("⚠ Please fill all required fields before submitting.");
        return;
    }

    // ------------ STORE IN ARRAY ------------
    formData.push(user);

    // ------------ SAVE TO LOCAL STORAGE ------------
    localStorage.setItem("applicationData", JSON.stringify(formData));

    // ------------ SHOW IN CONSOLE ------------
    console.log("User Data Saved:", user);
    console.log("All Submissions:", formData);

    // ------------ SHOW ON PAGE ------------
    displayUser(user);

    alert("✔ Application Submitted Successfully!");
    document.querySelector("form").reset();
});

// Display submitted data on screen
function displayUser(user) {
    let outputBox = document.querySelector(".output");

    // Create output container if not exists
    if (!outputBox) {
        outputBox = document.createElement("div");
        outputBox.className = "output";
        outputBox.style.marginTop = "20px";
        outputBox.style.padding = "15px";
        outputBox.style.background = "white";
        outputBox.style.borderRadius = "8px";

        document.querySelector(".container").appendChild(outputBox);
    }

    outputBox.innerHTML = `
        <h3>Submitted Application</h3>
        <p><b>Name:</b> ${user.name}</p>
        <p><b>Mobile:</b> ${user.mobile}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>DOB:</b> ${user.dob}</p>
        <p><b>Gender:</b> ${user.gender}</p>
        <p><b>Skills:</b> ${user.skills.join(", ")}</p>
        <p><b>Languages:</b> ${user.languages.join(", ")}</p>
        <p><b>Job Role:</b> ${user.jobRole}</p>
        <p><b>Location:</b> ${user.preferredJobLocation}</p>
        <p><b>Emergency Contact:</b> ${user.emergencyContact}</p>
    `;
}
