const video = document.getElementById("camera");
const overlay = document.getElementById("overlay");
const ctx = overlay.getContext("2d");
const predictionsList = document.getElementById("predictions-list");
const toggleWeaponDetection = document.getElementById("toggleWeaponDetection");
const toggleFacialExpression = document.getElementById("toggleFacialExpression");
const toggleSeatbeltDetection = document.getElementById("toggleSeatbeltDetection");
const toggleDistractedDriving = document.getElementById("toggleDistractedDriving");
const toggleSleepDetection = document.getElementById("toggleSleepDetection");
const toggleFireDetection = document.getElementById("toggleFireDetection");
const toggleSmokeDetection = document.getElementById("toggleSmokeDetection");
const togglePassengerDetection = document.getElementById("togglePassengerDetection");

const API_URL = "https://detect.roboflow.com";
const API_KEY = "JFFrjRRtfK7Ax7UbM6mK";
const WEAPON_MODEL_ID = "weapon-detection-dinou-qdunh/1";
const FACIAL_MODEL_ID = "facial-expression-ai-solution/1";
const SEATBELT_MODEL_ID = "seatbelt-axfll/1";
const DISTRACTED_DRIVING_MODEL_ID = "ai-solution-distracted-driving/1";
const SLEEP_MODEL_ID = "ai-solution-sleep/1";
const FIRE_MODEL_ID = "fire-detection-yolov8-ylrh2/1";
const SMOKE_MODEL_ID = "smoke-detection-yolov8/1"; // Smoke Detection Model ID
const PASSENGER_MODEL_ID = "passenger-detection-yolov8/1"; 

let weaponDetectionEnabled = true;
let facialExpressionEnabled = true;
let seatbeltDetectionEnabled = true;
let distractedDrivingEnabled = true;
let sleepDetectionEnabled = true;
let fireDetectionEnabled = true;
let smokeDetectionEnabled = true;  
let passengerDetectionEnabled = true;  

// Start the camera feed
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => console.error("Error accessing the camera: ", err));

// Function to send frames to the Roboflow API for object detection
async function runDetection() {
  ctx.clearRect(0, 0, overlay.width, overlay.height);
  predictionsList.innerHTML = ''; // Clear previous predictions

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const tempCtx = canvas.getContext("2d");
  tempCtx.drawImage(video, 0, 0);

  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);

    try {
      // Weapon Detection
      if (weaponDetectionEnabled) {
        const weaponResponse = await fetch(`${API_URL}/${WEAPON_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const weaponData = await weaponResponse.json();
        if (weaponData.predictions) {
          weaponData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "lime";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "lime";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Facial Expression Detection
      if (facialExpressionEnabled) {
        const facialResponse = await fetch(`${API_URL}/${FACIAL_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const facialData = await facialResponse.json();
        if (facialData.predictions) {
          facialData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "yellow";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Seatbelt Detection
      if (seatbeltDetectionEnabled) {
        const seatbeltResponse = await fetch(`${API_URL}/${SEATBELT_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const seatbeltData = await seatbeltResponse.json();
        if (seatbeltData.predictions) {
          seatbeltData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "cyan";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "cyan";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Distracted Driving Detection
      if (distractedDrivingEnabled) {
        const distractedDrivingResponse = await fetch(`${API_URL}/${DISTRACTED_DRIVING_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const distractedDrivingData = await distractedDrivingResponse.json();
        if (distractedDrivingData.predictions) {
          distractedDrivingData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "purple";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "purple";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Sleep Detection
      if (sleepDetectionEnabled) {
        const sleepResponse = await fetch(`${API_URL}/${SLEEP_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const sleepData = await sleepResponse.json();
        if (sleepData.predictions) {
          sleepData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "orange";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "orange";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Fire Detection
      if (fireDetectionEnabled) {
        const fireResponse = await fetch(`${API_URL}/${FIRE_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const fireData = await fireResponse.json();
        if (fireData.predictions) {
          fireData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "red";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Smoke Detection
      if (smokeDetectionEnabled) {
        const smokeResponse = await fetch(`${API_URL}/${SMOKE_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const smokeData = await smokeResponse.json();
        if (smokeData.predictions) {
          smokeData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "gray";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "gray";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

      // Passenger Detection
      if (passengerDetectionEnabled) {
        const smokeResponse = await fetch(`${API_URL}/${PASSENGER_MODEL_ID}?api_key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const smokeData = await smokeResponse.json();
        if (smokeData.predictions) {
          smokeData.predictions.forEach(prediction => {
            const { x, y, width, height, class: label, confidence } = prediction;
            const boxX = x - width / 2;
            const boxY = y - height / 2;

            ctx.strokeStyle = "gray";
            ctx.lineWidth = 2;
            ctx.strokeRect(boxX, boxY, width, height);
            ctx.fillStyle = "blue";
            ctx.font = "16px Arial";
            ctx.fillText(label, boxX, boxY - 10);

            const listItem = document.createElement("li");
            listItem.innerHTML = ` <strong>Class:</strong> ${label} <strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%`;
            predictionsList.appendChild(listItem);
          });
        }
      }

    } catch (error) {
      console.error("Error during inference:", error);
    }
  }, "image/jpeg");
}

// Listen for changes on the toggle switches
toggleWeaponDetection.addEventListener("change", () => {
  weaponDetectionEnabled = toggleWeaponDetection.checked;
});
toggleFacialExpression.addEventListener("change", () => {
  facialExpressionEnabled = toggleFacialExpression.checked;
});
toggleSeatbeltDetection.addEventListener("change", () => {
  seatbeltDetectionEnabled = toggleSeatbeltDetection.checked;
});
toggleDistractedDriving.addEventListener("change", () => {
  distractedDrivingEnabled = toggleDistractedDriving.checked;
});
toggleSleepDetection.addEventListener("change", () => {
  sleepDetectionEnabled = toggleSleepDetection.checked;
});
toggleFireDetection.addEventListener("change", () => {
  fireDetectionEnabled = toggleFireDetection.checked;
});
toggleSmokeDetection.addEventListener("change", () => {
  smokeDetectionEnabled = toggleSmokeDetection.checked;
});
togglePassengerDetection.addEventListener("change", () => {
  passengerDetectionEnabled = togglePassengerDetection.checked;
});

// Run detection every second
setInterval(runDetection, 1500);