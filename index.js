document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const complaintsContainer = document.getElementById("complaintsContainer");
    const search = document.getElementById("search");
  
    let complaints = [];
  
    // Handle form submission
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const complaintText = document.getElementById("complaint").value;
  
      const complaint = {
        id: complaints.length + 1,
        name,
        email,
        complaintText,
        status: "Pending",
      };
  
      complaints.push(complaint);
      displayComplaints();
      registerForm.reset();
    });
  
    // Display complaints
    function displayComplaints() {
      complaintsContainer.innerHTML = "";
      complaints.forEach((complaint) => {
        const li = document.createElement("li");
        li.classList.add("complaint-item");
        li.innerHTML = `
          <div>
            <p><strong>Complaint ID:</strong> ${complaint.id}</p>
            <p><strong>Name:</strong> ${complaint.name}</p>
            <p><strong>Complaint:</strong> ${complaint.complaintText}</p>
            <p class="status"><strong>Status:</strong> ${complaint.status}</p>
          </div>
          <button onclick="updateStatus(${complaint.id})">Resolve</button>
        `;
        complaintsContainer.appendChild(li);
      });
    }
  
    // Update complaint status
    window.updateStatus = function (id) {
      complaints = complaints.map((complaint) => {
        if (complaint.id === id) complaint.status = "Resolved";
        return complaint;
      });
      displayComplaints();
    };
  
    // Search complaints
    search.addEventListener("input", (e) => {
      const filter = e.target.value.toLowerCase();
      const filteredComplaints = complaints.filter((complaint) =>
        complaint.status.toLowerCase().includes(filter)
      );
      displayFilteredComplaints(filteredComplaints);
    });
  
    function displayFilteredComplaints(filteredComplaints) {
      complaintsContainer.innerHTML = "";
      filteredComplaints.forEach((complaint) => {
        const li = document.createElement("li");
        li.classList.add("complaint-item");
        li.innerHTML = `
          <div>
            <p><strong>Complaint ID:</strong> ${complaint.id}</p>
            <p><strong>Name:</strong> ${complaint.name}</p>
            <p><strong>Complaint:</strong> ${complaint.complaintText}</p>
            <p class="status"><strong>Status:</strong> ${complaint.status}</p>
          </div>
          <button onclick="updateStatus(${complaint.id})">Resolve</button>
        `;
        complaintsContainer.appendChild(li);
      });
    }
  });
  