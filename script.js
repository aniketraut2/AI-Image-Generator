const API_KEY = "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";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("#image-prompt");
const imageSection = document.querySelector(".image-section");

const getImages = async () => {
  try {
    const promptText = inputElement.value.trim();
    if (!promptText) {
      console.error("Please enter a valid prompt.");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": promptText,
        "n": 4,
        "size": "1024x1024"
      })
    };

    const response = await fetch("https://api.openai.com/v1/images/generations", options);

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      imageSection.innerHTML = "";
      data.data.forEach(imageObject => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", imageObject.url);
        imageContainer.append(imageElement);
        imageSection.append(imageContainer);
      });
    } else {
      console.error("Invalid data received from the API.");
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

submitIcon.addEventListener('click', getImages);
