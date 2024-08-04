
// Event Listeners
document.addEventListener("DOMContentLoaded", function() {

   });

  // Report Incidents form event listener
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
  
    fetch('http://localhost:3000/incidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

    alert("Message submitted successfully!")
  })
  
//------------GET
  fetch('http://localhost:3000/incidents')
  .then(response => response.json())
  .then(data => {
    console.log(data); // data is an array of objects
    // do something with the data
  })
  .catch(error => {
    console.error('Error:', error);
  })

  //-----------PATCH
  const id = "74b5"; // define the id variable
const data = {
  // add the data you want to send in the PATCH request here
  "name": 'najla'
};

fetch(`http://localhost:3000/incidents/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.text();
})
.then(text => {
  try {
    const json = JSON.parse(text);
    console.log(json);
  } catch (error) {
    console.error('Error parsing response:', error);
  }
})
.catch(error => {
  console.error('Error:', error);
});

//-------DELETE--------////
// const idToDelete = "eeec6"; // replace with the ID of the data you want to delete

// fetch(`http://localhost:3000/incidents/${idToDelete}`, {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(response => {
//   if (response.ok) {
//     console.log(`Deleted data with ID ${idToDelete}`);
//   } else {
//     throw new Error(response.statusText);
//   }
// })
// .catch(error => {
//   console.error('Error:', error);
//});