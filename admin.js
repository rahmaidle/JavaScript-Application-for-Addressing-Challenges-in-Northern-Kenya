document.addEventListener("DOMContentLoaded", () => {
    const incidentsTableBody = document.querySelector("#incidents-table tbody");

    // Fetch and display incidents
    fetch('http://localhost:3000/incidents')
        .then(response => response.json())
        .then(data => {
            data.forEach(incident => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${incident.id}</td>
                    <td><input type="text" value="${incident.name}" class="edit-name"></td>
                    <td><input type="tel" value="${incident.phone}" class="edit-phone"></td>
                    <td><input type="text" value="${incident.message}" class="edit-message"></td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;

                incidentsTableBody.appendChild(row);

                row.querySelector(".edit-btn").addEventListener("click", () => {
                    const updatedIncident = {
                        name: row.querySelector(".edit-name").value,
                        phone: row.querySelector(".edit-phone").value,
                        message: row.querySelector(".edit-message").value
                    };

                    fetch(`http://localhost:3000/incidents/${incident.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedIncident)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .then(updatedData => {
                            alert("Incident updated successfully!");
                        })
                        .catch(error => console.error('Error:', error));
                });

                row.querySelector(".delete-btn").addEventListener("click", () => {
                    fetch(`http://localhost:3000/incidents/${incident.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .then(() => {
                            row.remove();
                            alert("Incident deleted successfully!");
                        })
                        .catch(error => console.error('Error:', error));
                });
            });
        })
        .catch(error => console.error('Error:', error));
});
