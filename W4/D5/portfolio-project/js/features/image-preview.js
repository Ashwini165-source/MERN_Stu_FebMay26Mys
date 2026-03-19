function initImagePreview() {
    const fileInput = document.getElementById("image-upload");
    const previewContainer = document.getElementById("image-preview-container");
    const previewImg = document.getElementById("image-preview");
    const previewFileName = document.getElementById("image-preview-name");
    const removeBtn = document.getElementById("image-remove-btn");
    const uploadBtn = document.getElementById("image-upload-btn");
    const dropZone = document.getElementById("image-drop-zone");

    // Carousel Elements
    const carouselSection = document.getElementById("image-carousel-section");
    const carouselInner = document.getElementById("carousel-inner");
    const carouselPrev = document.getElementById("carousel-prev");
    const carouselNext = document.getElementById("carousel-next");
    const carouselDots = document.getElementById("carousel-dots");

    // State
    let uploadedImages = []; // Array of { src, name }
    let currentSlide = 0;

    if (!fileInput || !previewContainer || !previewImg) {
        console.log("Image preview elements not found");
        return;
    }

    // --- 1. Upload & Preview Logic ---
    function handleFile(file) {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewImg.dataset.filename = file.name; // Store for upload
            previewContainer.classList.remove("hidden");
            if (previewFileName) previewFileName.textContent = file.name;
            if (dropZone) dropZone.classList.add("hidden");
        };
        reader.readAsDataURL(file);
    }

    fileInput.addEventListener("change", function () {
        handleFile(fileInput.files[0]);
    });

    if (removeBtn) {
        removeBtn.addEventListener("click", resetPreview);
    }

    function resetPreview() {
        previewImg.src = "";
        delete previewImg.dataset.filename;
        previewContainer.classList.add("hidden");
        if (previewFileName) previewFileName.textContent = "";
        if (dropZone) dropZone.classList.remove("hidden");
        fileInput.value = "";
    }

    if (uploadBtn) {
        uploadBtn.addEventListener("click", function () {
            if (!previewImg.src) return;

            // Add to array
            uploadedImages.push({
                src: previewImg.src,
                name: previewImg.dataset.filename || "Uploaded Image"
            });

            // Reset upload area
            resetPreview();

            // Update carousel
            updateCarousel();
        });
    }

    // --- 2. Carousel Logic ---
    function updateCarousel() {
        if (uploadedImages.length === 0) {
            carouselSection.classList.add("hidden");
            return;
        }

        carouselSection.classList.remove("hidden");
        renderSlides();
        renderDots();
        goToSlide(uploadedImages.length - 1); // Go to the newest uploaded image
    }

    function renderSlides() {
        carouselInner.innerHTML = "";
        uploadedImages.forEach((imgObj) => {
            const slide = document.createElement("div");
            slide.className = "w-full flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-slate-700 p-4";
            
            const img = document.createElement("img");
            img.src = imgObj.src;
            img.alt = imgObj.name;
            img.className = "max-h-full max-w-full object-contain rounded shadow-lg";
            
            slide.appendChild(img);
            carouselInner.appendChild(slide);
        });
    }

    function renderDots() {
        carouselDots.innerHTML = "";
        if (uploadedImages.length <= 1) return; // No dots needed for 1 image

        uploadedImages.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "w-3 h-3 rounded-full bg-gray-400 hover:bg-blue-500 transition-colors focus:outline-none";
            dot.addEventListener("click", () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        updateDotsState();
    }

    function goToSlide(index) {
        if (uploadedImages.length === 0) return;
        
        // Wrap around logic
        if (index < 0) index = uploadedImages.length - 1;
        if (index >= uploadedImages.length) index = 0;
        
        currentSlide = index;
        const translateX = -(currentSlide * 100);
        carouselInner.style.transform = `translateX(${translateX}%)`;
        updateDotsState();
    }

    function updateDotsState() {
        if (uploadedImages.length <= 1) return;
        const dots = carouselDots.children;
        for (let i = 0; i < dots.length; i++) {
            if (i === currentSlide) {
                dots[i].classList.replace("bg-gray-400", "bg-blue-600");
                dots[i].classList.replace("bg-white/50", "bg-white"); // for dark mode contrast if needed
            } else {
                dots[i].classList.replace("bg-blue-600", "bg-gray-400");
            }
        }
    }

    if (carouselPrev) {
        carouselPrev.addEventListener("click", () => goToSlide(currentSlide - 1));
    }

    if (carouselNext) {
        carouselNext.addEventListener("click", () => goToSlide(currentSlide + 1));
    }


    // --- 3. Drag and drop support ---
    if (dropZone) {
        dropZone.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropZone.classList.add("border-blue-500", "bg-blue-50");
        });

        dropZone.addEventListener("dragleave", function () {
            dropZone.classList.remove("border-blue-500", "bg-blue-50");
        });

        dropZone.addEventListener("drop", function (e) {
            e.preventDefault();
            dropZone.classList.remove("border-blue-500", "bg-blue-50");
            const file = e.dataTransfer.files[0];
            handleFile(file);
        });

        dropZone.addEventListener("click", function () {
            fileInput.click();
        });
    }

    console.log("Image preview & carousel initialized successfully");
}