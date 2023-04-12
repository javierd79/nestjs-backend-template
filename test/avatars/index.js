const form = document.querySelector('form');
const fileInput = document.querySelector('#fileInput');
const submitButton = document.querySelector('#submitButton');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);
  fetch('http://localhost:4000/avatars', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});
