document.addEventListener("DOMContentLoaded", function() {
  let selectedFile;

  document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file.name); // Log the selected file name

    if (!file.name.endsWith(".npy")) {
      console.log("Please upload a .npy file.");
      selectedFile = null;
      return;
    }

    selectedFile = file;
  });

  document.getElementById("submitButton").addEventListener("click", (event) => {
    if (!selectedFile) {
      console.log("Please upload a .npy file.");
      return;
    }

    console.log("Submitting the file:", selectedFile.name); // Log the submitted file name

    let formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://172.31.83.137:5000/predict', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("predictionText").textContent = 'Diagnosis: ' + data.diagnosis;
      document.getElementById("resultImage").src = 'data:image/jpeg;base64,' + data.image;
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while submitting the file. Please check the console for details.");
    });
  });
});
