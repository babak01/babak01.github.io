import { fetch } from 'wix-fetch';

$w.onReady(function () {
  $w("#fileInput").onChange((event) => {
    const file = event.target.files[0];
    console.log("File selected:", file.name); // Log the selected file name

    if (!file.name.endsWith(".npy")) {
      console.log("Please upload a .npy file.");
      selectedFile = null;
      return;
    }

    selectedFile = file;
  });

  $w("#submitButton").onClick((event) => {
    if (!selectedFile) {
      console.log("Please upload a .npy file.");
      return;
    }

    console.log("Submitting the file:", selectedFile.name); // Log the submitted file name

    let formData = new FormData();
    formData.append('file', selectedFile);

    return fetch('http://172.31.83.137:5000/predict', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      $w("#predictionText").text = 'Diagnosis: ' + data.diagnosis;
      $w("#resultImage").src = 'data:image/jpeg;base64,' + data.image;
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while submitting the file. Please check the console for details.");
    });
  });
});
