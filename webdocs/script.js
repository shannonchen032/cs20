document.addEventListener("scroll", function() {
    let scrollPos = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;
    let progress = scrollPos / maxScroll; // Scroll progress (0 to 1)

    // Background Zoom & Blur
    let bgScale = 1 + progress * 0.6;
    let bgBlur = 0;

    // Incense Burner Focus
    let incensePoint = 0.15;
    let incenseFadeEnd = 0.5;
    let incenseScale = 1 + Math.max(0, (progress - incensePoint) * 1.8);
    let incenseOpacity = Math.max(1 - ((progress - incensePoint) / (incenseFadeEnd - incensePoint)) * 2, 0);

    document.getElementById("incense-burner").style.opacity = incenseOpacity;
    document.getElementById("incense-burner").style.transform = `scale(${incenseScale}) translateY(-5vh)`;

    // Text for Incense Burner
    let textAppearPoint = 0.15;
    let textFadePoint = 0.3;
    let fadeSpeed = 3;
    let textOpacity = 0;

    if (progress >= textAppearPoint && progress < textFadePoint) {
        textOpacity = (progress - textAppearPoint) / ((textFadePoint - textAppearPoint) / fadeSpeed);
    } else if (progress >= textFadePoint) {
        textOpacity = Math.max(1 - ((progress - textFadePoint) * fadeSpeed), 0);
    }

    document.getElementById("incense-text").style.opacity = textOpacity;

    // Temple Steps & Inner Scene Blur
    let stepsStart = 0.25;
    let stepsScale = 1.3 + Math.max(0, (progress - stepsStart) * 1.2);
    let blurEffect = 0;

    if (progress >= incensePoint && progress < stepsStart) {
        bgBlur = Math.min((progress - incensePoint) * 10, 4);
        blurEffect = Math.min((progress - incensePoint) * 10, 4);
    } else if (progress >= stepsStart) {
        bgBlur = Math.max(4 - (progress - stepsStart) * 8, 0);
        blurEffect = Math.max(4 - (progress - stepsStart) * 8, 0);
    }

    document.getElementById("background").style.transform = `scale(${bgScale})`;
    document.getElementById("background").style.filter = `blur(${bgBlur}px)`;
    document.getElementById("temple-steps").style.transform = `scale(${stepsScale}) translateY(-15vh)`;
    document.getElementById("temple-steps").style.filter = `blur(${blurEffect}px)`;
    document.getElementById("inner-scene").style.filter = `blur(${blurEffect}px)`;

    // Inner Scene Text
    let innerTextAppearPoint = 0.55;
    let innerTextFadePoint = 0.7;
    let innerTextOpacity = 0;

    if (progress >= innerTextAppearPoint && progress < innerTextFadePoint) {
        innerTextOpacity = (progress - innerTextAppearPoint) / ((innerTextFadePoint - innerTextAppearPoint) / fadeSpeed);
    } else if (progress >= innerTextFadePoint) {
        innerTextOpacity = Math.max(1 - ((progress - innerTextFadePoint) * fadeSpeed), 0);
    }

    document.getElementById("inner-scene-text").style.opacity = innerTextOpacity;

    // Deep Zoom into Inner Room
    let roomStart = 0.7;
    let roomScale = 1.8 + Math.max(0, (progress - roomStart) * 2);
    
    if (progress >= roomStart) {
        document.getElementById("inner-scene").style.transform = `scale(${roomScale})`;
    }

    // 🔹 Smoke Effect Activation
    let smokeStart = 0.75; // When smoke should start appearing
    let smokeFadeOut = 0.85; // When smoke should disappear
    let smokeOpacity = 0;

    if (progress >= smokeStart && progress < smokeFadeOut) {
        smokeOpacity = (progress - smokeStart) / (smokeFadeOut - smokeStart); // Fade in smoke
    } else if (progress >= smokeFadeOut) {
        smokeOpacity = Math.max(1 - ((progress - smokeFadeOut) * 2), 0); // Fade out smoke
    }

    document.getElementById("smoke-screen").style.opacity = smokeOpacity;

    // 🔹 Reveal Full-Screen Inner Scene
    let fullSceneAppear = 0.85; // When the full inner scene should appear
    let fullSceneOpacity = 0;

    if (progress >= fullSceneAppear) {
        fullSceneOpacity = (progress - fullSceneAppear) * 2; // Gradual fade-in
    }

    document.getElementById("full-inner-scene").style.opacity = fullSceneOpacity;
});

document.addEventListener("scroll", function() {
    let scrollPos = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;
    let progress = scrollPos / maxScroll; // Scroll progress (0 to 1)

    // 🔹 Set the point where the inner scene starts zooming (AFTER incense burner)
    let innerSceneStart = 0.4;  
    let enterButtonAppear = 0.85; // 🔹 Make button appear a little sooner

    let innerSceneScale = 1.2; // Keeps it slightly larger before zooming

    if (progress >= innerSceneStart) {
        innerSceneScale = 1.2 + (progress - innerSceneStart) * 2; 
    }

    document.getElementById("inner-scene").style.transform = `scale(${innerSceneScale}) translateY(0)`;

    // 🔹 Ensure the "Enter" button appears at the correct scroll point
    let enterButton = document.getElementById("enter-button-container");
    if (progress >= enterButtonAppear) {
        enterButton.style.display = "block";
        enterButton.style.opacity = "1"; // Ensure it's fully visible
    } else {
        enterButton.style.display = "none";
        enterButton.style.opacity = "0";
    }
});

document.addEventListener("scroll", function () {
    let scrollPos = window.scrollY;
    let fadeStart = 50; // Start fading after scrolling 50px
    let fadeEnd = 300; // Fully fade out by 300px scroll distance

    let opacity = 1 - (scrollPos - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.max(opacity, 0); // Prevent values below 0

    document.getElementById("context-overlay").style.opacity = opacity;

    if (opacity === 0) {
        document.getElementById("context-overlay").style.display = "none"; // Hide fully after fade-out
    }
});


document.getElementById("enter-button").addEventListener("click", function() {
    let smoke = document.getElementById("final-smoke-screen");
    let newScreen = document.getElementById("new-screen");

    // 🔹 Reset GIF to restart animation instantly
    smoke.style.backgroundImage = "none";
    requestAnimationFrame(() => {
        smoke.style.backgroundImage = "url('transition.gif')";
    });

    // 🔹 Make the smoke visible IMMEDIATELY
    smoke.style.display = "block";
    smoke.style.opacity = "1";

    // 🔹 Show the new screen slightly AFTER the smoke appears
    setTimeout(() => {
        newScreen.style.display = "block";
        newScreen.style.opacity = "1";

        // 🔹 Fade out smoke once the new screen is fully visible
        setTimeout(() => {
            smoke.style.opacity = "0";

            // 🔹 Hide smoke completely after fade-out
            setTimeout(() => {
                smoke.style.display = "none";
            }, 1000); // Matches fade duration
        }, 800); // Ensure the new screen is fully visible before hiding smoke
    }, 500); // Short delay to ensure smoke starts before revealing new screen
});

document.addEventListener("DOMContentLoaded", function() {
    const sculpture = document.getElementById("wooden-sculpture");
    const resultContainer = document.getElementById("result-container");
    const resultImage = document.getElementById("result-image");
    const tryAgainButton = document.getElementById("try-again");
    const successMessage = document.getElementById("success-message");
    const flashingLabel = document.getElementById("flashing-label");

    // Possible result images
    const failImages = ["fail_1.png", "fail_2.png"];
    const successImage = "success.png";

    let isDragging = false;
    let hasDragged = false;
    let startX, startY, offsetX, offsetY;

    // 🔹 Store the sculpture's original position
    let originalX = sculpture.offsetLeft;
    let originalY = sculpture.offsetTop;

    // Make the sculpture draggable
    sculpture.addEventListener("mousedown", function(event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        offsetX = sculpture.offsetLeft;
        offsetY = sculpture.offsetTop;
        sculpture.style.cursor = "grabbing";

        // Hide "Step 1" text after the first interaction
        if (!hasDragged) {
            flashingLabel.style.display = "none";
            hasDragged = true;
        }
    });

    document.addEventListener("mousemove", function(event) {
        if (!isDragging) return;
        let moveX = event.clientX - startX + offsetX;
        let moveY = event.clientY - startY + offsetY;
        sculpture.style.transform = `translate(${moveX - originalX}px, ${moveY - originalY}px)`;
    });

    document.addEventListener("mouseup", function() {
        if (!isDragging) return;
        isDragging = false;
        sculpture.style.cursor = "grab";

        // Randomly pick a result (fail or success)
        let randomIndex = Math.floor(Math.random() * 3);
        let selectedImage = randomIndex < 2 ? failImages[randomIndex] : successImage;
        
        resultImage.src = selectedImage;
        resultContainer.style.display = "block";

        // Hide the sculpture when the result appears
        sculpture.style.display = "none";

        // If it's a fail, show "Try Again" button
        if (selectedImage !== successImage) {
            tryAgainButton.style.display = "block";
            successMessage.style.display = "none";
        } else {
            // Success case
            tryAgainButton.style.display = "none";
            successMessage.style.display = "block";

            // Reset sculpture position after success
            setTimeout(() => {
                sculpture.style.transform = "translate(0, 0)"; // 🔹 Reset position
                sculpture.style.display = "block"; // Make it visible again
                resultContainer.style.display = "none";
            }, 2000);
        }
    });

    // Try Again button logic
    tryAgainButton.addEventListener("click", function() {
        resultContainer.style.display = "none";
        tryAgainButton.style.display = "none";
        sculpture.style.display = "block"; // Show sculpture again
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const objects = document.querySelectorAll(".draggable-object");
    const descriptionBox = document.getElementById("object-description");
    const dropZones = document.querySelectorAll(".drop-zone");
    const flashingStep1 = document.getElementById("flashing-step1");

    let placedObjects = 0;

    // Hover effect to show description box
    objects.forEach(object => {
        object.addEventListener("mouseenter", function(event) {
            descriptionBox.style.display = "block";
            descriptionBox.innerText = object.getAttribute("data-description");
            descriptionBox.style.top = `${event.clientY - 40}px`;
            descriptionBox.style.left = `${event.clientX}px`;
        });

        object.addEventListener("mouseleave", function() {
            descriptionBox.style.display = "none";
        });
    });

    // Dragging functionality
    objects.forEach(object => {
        object.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", object.id);
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        zone.addEventListener("drop", function(event) {
            event.preventDefault();
            let objectId = event.dataTransfer.getData("text/plain");
            let draggedObject = document.getElementById(objectId);

            // Snap object into place
            zone.appendChild(draggedObject);
            draggedObject.style.position = "static";
            draggedObject.style.cursor = "default";
            placedObjects++;

            // Check if all objects are placed
            if (placedObjects === 4) {
                unlockNextInteraction();
            }
        });
    });

    function unlockNextInteraction() {
        // Hide Interaction 1 elements
        document.getElementById("flashing-step1").style.display = "none";
        document.getElementById("interaction1-container").style.display = "none";
    
        // Add a slight delay (e.g., 1 second) before showing Interaction 2
        setTimeout(() => {
            document.getElementById("interaction2-container").style.display = "block";
        }, 1000); // 1000ms = 1 second delay
    }    
});


document.addEventListener("DOMContentLoaded", function () {
    let interaction3Triggered = false;
    let instructionShown = false;
    let zoomTriggered = false; // Track if zoom has started

    const successMessage = document.getElementById("success-message");
    const interaction2Container = document.getElementById("interaction2-container");
    const woodenSculpture = document.getElementById("wooden-sculpture");
    const instructionText = document.createElement("div");
    const newScreen = document.getElementById("new-screen");

    console.log("🚀 Debugging started: Script loaded.");

    // Create "Get Closer" instruction element (initially hidden)
    instructionText.id = "scroll-instruction";
    instructionText.innerHTML = "Get closer to reach the red string <br> &#8673;";
    instructionText.style.position = "fixed";
    instructionText.style.top = "50%";
    instructionText.style.left = "50%";
    instructionText.style.transform = "translate(-50%, -50%)";
    instructionText.style.fontSize = "2rem";
    instructionText.style.color = "white";
    instructionText.style.opacity = "0";
    instructionText.style.transition = "opacity 0.5s ease-in-out"; // Shorter fade
    instructionText.style.textAlign = "center";
    instructionText.style.animation = "flash 1s infinite alternate";
    instructionText.style.display = "none"; // Hidden until triggered
    document.body.appendChild(instructionText);

    function unlockNextInteraction() {
        if (interaction3Triggered) {
            console.log("⚠ Interaction 3 already triggered, skipping...");
            return;
        }
        interaction3Triggered = true;

        console.log("✅ Interaction 3 triggered: Hiding previous elements and showing instruction.");

        // Hide the success message
        if (successMessage) {
            successMessage.style.opacity = "1";
            setTimeout(() => {
                console.log("ℹ Fading out success message...");
                successMessage.style.opacity = "0";
                setTimeout(() => {
                    console.log("✅ Success message hidden.");
                    successMessage.style.display = "none";
                    interaction2Container.style.display = "none";

                    // 🚀 Ensure the wooden sculpture is completely removed
                    if (woodenSculpture) {
                        woodenSculpture.style.display = "none";
                        woodenSculpture.style.visibility = "hidden";
                        woodenSculpture.style.pointerEvents = "none";
                        console.log("✅ Wooden sculpture permanently hidden.");
                    }

                    // Reveal the instruction to "Get Closer"
                    console.log("ℹ Showing 'Get Closer' instruction.");
                    instructionText.style.display = "block";
                    setTimeout(() => {
                        instructionText.style.opacity = "1";
                        instructionShown = true;
                        console.log("✅ Instruction is now visible.");
                    }, 500);
                }, 1000);
            }, 2000);
        }
    }

    // 🔹 Correctly Invert the Scroll Effect: Scroll UP = Zoom IN
    let lastScrollY = window.scrollY;

    document.addEventListener("scroll", function () {
        if (!instructionShown) return;

        let currentScrollY = window.scrollY;
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        let scrollingUp = currentScrollY < lastScrollY; // Detect scroll direction
        lastScrollY = currentScrollY; // Update last scroll position

        // Define min and max zoom levels
        let minScale = 1; // Normal view
        let maxScale = 1.5; // Zoomed-in view

        let progress = currentScrollY / maxScroll;
        let zoomLevel = scrollingUp 
            ? maxScale - (progress * (maxScale - minScale)) // Zoom in when scrolling up
            : minScale + (progress * (maxScale - minScale)); // Zoom out when scrolling down

        console.log(`📏 Scroll Direction: ${scrollingUp ? "⬆ UP (Zoom In)" : "⬇ DOWN (Zoom Out)"} | Zoom Level: ${zoomLevel.toFixed(2)}`);

        if (newScreen) {
            newScreen.style.transition = "transform 0.2s linear"; // Smooth transition
            newScreen.style.transform = `scale(${zoomLevel})`;
        } else {
            console.error("❌ ERROR: #new-screen not found.");
        }

        // 🚀 Hide the "Get Closer" message as soon as the user starts scrolling UP
        if (!zoomTriggered && scrollingUp) {
            zoomTriggered = true; // Only hide once
            console.log("ℹ Hiding 'Get Closer' message immediately after first scroll up.");
            instructionText.style.opacity = "0";
            setTimeout(() => {
                instructionText.style.display = "none";
                console.log("✅ 'Get Closer' message removed.");
            }, 500); // Fade out faster (0.5s)
        }
    });

    // Observer to detect when Interaction 2 is completed
    const observer = new MutationObserver(() => {
        if (!interaction3Triggered && successMessage && successMessage.style.display !== "none") {
            console.log("✅ Success message detected. Unlocking next interaction...");
            unlockNextInteraction();
        }
    });

    if (successMessage) {
        observer.observe(successMessage, { attributes: true, attributeFilter: ["style"] });
        console.log("👀 Observer attached to watch for success message visibility.");
    } else {
        console.error("❌ ERROR: Success message element not found.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const redString = document.getElementById("red-string");
    const newScreen = document.getElementById("new-screen"); // The div containing room.png
    let isDragging = false;
    let offsetX, offsetY;
    let stringVisible = false;
    let roomFullyZoomed = false; // ✅ Track if `#new-screen` is fully zoomed

    if (!redString) {
        console.error("❌ ERROR: Red string SVG not found in the DOM.");
        return;
    } else {
        console.log("✅ Red string SVG found in the DOM.");
    }
    if (!newScreen) {
        console.error("❌ ERROR: new-screen (room.png) not found in the DOM.");
        return;
    } else {
        console.log("✅ new-screen (room.png) found in the DOM.");
    }

    // Function to show the red string
    function showRedString() {
        if (stringVisible || !roomFullyZoomed) return; // ✅ Only show if zoom is finished
        stringVisible = true;

        redString.style.position = "fixed";
        redString.style.top = "50%";
        redString.style.left = "50%";
        redString.style.transform = "translate(-50%, -50%)";
        redString.style.display = "block";

        console.log("🎉 SUCCESS: Red string is now visible and centered!");
    }

    // ✅ Watch for Zoom-In Completion (Instead of Waiting for Scroll Again)
    function checkZoomLevel() {
        let scaleValue = 1; // Default scale
        let computedStyle = window.getComputedStyle(newScreen);
        let transformMatrix = computedStyle.transform;

        if (transformMatrix !== "none") {
            let matrixValues = transformMatrix.match(/matrix.*\((.+)\)/);
            if (matrixValues) {
                scaleValue = parseFloat(matrixValues[1].split(', ')[0]); // Extract scale
            }
        }

        console.log(`📏 new-screen (room.png) Zoom Level: ${scaleValue.toFixed(2)}`);

        // 🔹 Detect if `#new-screen` (room.png) has fully zoomed in
        if (scaleValue >= 1.4 && !roomFullyZoomed) {
            console.log("🔍 Zoom into room.png completed! Ready for red string.");
            roomFullyZoomed = true;
            showRedString(); // 🚀 Show red string IMMEDIATELY
        }
    }

    // ✅ Check Zoom Level Every 200ms Instead of Relying Only on Scroll
    setInterval(checkZoomLevel, 200);

    // 🔹 Make the string draggable
    redString.addEventListener("mousedown", function(event) {
        if (!stringVisible) return;
        isDragging = true;
        offsetX = event.clientX - redString.getBoundingClientRect().left;
        offsetY = event.clientY - redString.getBoundingClientRect().top;
        redString.style.cursor = "grabbing";
        console.log("✋ Red string dragging started...");
    });

    document.addEventListener("mousemove", function(event) {
        if (!isDragging) return;
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        redString.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
        redString.style.cursor = "grab";
        console.log("🖐️ Red string dragging stopped.");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const redString = document.getElementById("red-string");
    const smoke = document.getElementById("final-smoke-screen");
    const newScreen = document.getElementById("new-screen");

    if (!redString) {
        console.error("❌ ERROR: Red string not found.");
        return;
    }
    if (!smoke) {
        console.error("❌ ERROR: Smoke effect not found.");
        return;
    }
    if (!newScreen) {
        console.error("❌ ERROR: new-screen not found.");
        return;
    }

    redString.addEventListener("click", function() {
        console.log("🔴 Red string clicked! Hiding everything...");

        // 🔹 Instantly hide the red string
        redString.style.opacity = "0";
        redString.style.pointerEvents = "none"; // Prevent interaction
        redString.style.visibility = "hidden"; // Ensure it's fully gone
        setTimeout(() => {
            redString.style.display = "none"; // Remove it completely
            console.log("✅ Red string hidden.");
        }, 100); // Short delay to ensure it's gone

        // 🔹 Fade out & hide everything inside #new-screen FAST
        newScreen.style.transition = "opacity 0.5s ease-out"; // Fast fade out
        newScreen.style.opacity = "0";

        setTimeout(() => {
            newScreen.style.display = "none"; // Fully remove it
            console.log("✅ new-screen content removed. Playing smoke transition...");

            // 🔹 Play the smoke transition
            smoke.style.backgroundImage = "none"; // Reset GIF
            requestAnimationFrame(() => {
                smoke.style.backgroundImage = "url('smoke.gif')";
            });

            smoke.style.display = "block";
            smoke.style.opacity = "1";

            // 🔹 Load new HTML file after smoke animation
            setTimeout(() => {
                window.location.href = "new.html"; // Loads new page in same tab
            }, 1500); // Adjust based on smoke duration
        }, 500); // Wait for the fade-out before playing smoke
    });
});


