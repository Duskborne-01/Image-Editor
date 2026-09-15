let filters = {
    "Brightness": {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    "Contrast": {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    "Saturation": {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    "Hue Rotation": {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },

    "Blur": {
        value: 0,
        min: 0,
        max: 200,
        unit: "px"
    },

    "Grayscale": {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    "Sepia": {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    "Opacity": {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },

    "Invert": {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
};

const imageCanvas = document.getElementById("image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const filterContainer = document.querySelector(".filters");
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[name].value = input.value;
        applyFilters();
    })

    return div;
}

function createFilters() {
    Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);

    filterContainer.appendChild(filterElement);
})
}

createFilters();

imgInput.addEventListener("change", (event) => {
    file = event.target.files[0];
    if (!file) return;

    const imagePlaceholder = document.querySelector(".placeholder");

    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none"

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        applyFilters();
    }
})

function applyFilters() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = `
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        hue-rotate(${filters["Hue Rotation"].value}${filters["Hue Rotation"].unit})
        blur(${filters.Blur.value}${filters.Blur.unit})
        grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
        sepia(${filters.Sepia.value}${filters.Sepia.unit})
        opacity(${filters.Opacity.value}${filters.Opacity.unit})
        invert(${filters.Invert.value}${filters.Invert.unit})
    `.trim();

    canvasCtx.drawImage(image, 0, 0)
}

resetBtn.addEventListener("click", () => {
    filters = {
    "Brightness": {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    "Contrast": {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    "Saturation": {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    "Hue Rotation": {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },

    "Blur": {
        value: 0,
        min: 0,
        max: 200,
        unit: "px"
    },

    "Grayscale": {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    "Sepia": {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    "Opacity": {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },

    "Invert": {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
    };

    applyFilters();

    filterContainer.innerHTML = "";

    createFilters();
})

downloadBtn.addEventListener("click", () => {
    if (!image) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
})

const presets = {
    "Vintage": {
        "Brightness": 110,
        "Contrast": 120,
        "Saturation": 80,
        "Hue Rotation": 18,
        "Blur": 1,
        "Grayscale": 15,
        "Sepia": 35,
        "Opacity": 100,
        "Invert": 0
    },
    "Cyberpunk": {
        "Brightness": 115,
        "Contrast": 160,
        "Saturation": 180,
        "Hue Rotation": 320,
        "Blur": 0,
        "Grayscale": 0,
        "Sepia": 0,
        "Opacity": 100,
        "Invert": 0
    },
    "Mono Noir": {
        "Brightness": 90,
        "Contrast": 170,
        "Saturation": 0,
        "Hue Rotation": 0,
        "Blur": 0,
        "Grayscale": 100,
        "Sepia": 0,
        "Opacity": 100,
        "Invert": 0
    },
    "Dreamy Glow": {
        "Brightness": 120,
        "Contrast": 110,
        "Saturation": 120,
        "Hue Rotation": 24,
        "Blur": 2,
        "Grayscale": 0,
        "Sepia": 10,
        "Opacity": 96,
        "Invert": 0
    },
    "Summer Warm": {
        "Brightness": 118,
        "Contrast": 130,
        "Saturation": 150,
        "Hue Rotation": 30,
        "Blur": 0,
        "Grayscale": 0,
        "Sepia": 12,
        "Opacity": 100,
        "Invert": 0
    },
    "Cool Mist": {
        "Brightness": 100,
        "Contrast": 110,
        "Saturation": 75,
        "Hue Rotation": 180,
        "Blur": 2,
        "Grayscale": 0,
        "Sepia": 0,
        "Opacity": 100,
        "Invert": 0
    },
    "Neon Pop": {
        "Brightness": 110,
        "Contrast": 145,
        "Saturation": 200,
        "Hue Rotation": 312,
        "Blur": 0,
        "Grayscale": 0,
        "Sepia": 0,
        "Opacity": 100,
        "Invert": 0
    },
    "Pastel Dream": {
        "Brightness": 115,
        "Contrast": 105,
        "Saturation": 85,
        "Hue Rotation": 45,
        "Blur": 0,
        "Grayscale": 10,
        "Sepia": 10,
        "Opacity": 100,
        "Invert": 0
    },
    "Faded Film": {
        "Brightness": 105,
        "Contrast": 95,
        "Saturation": 70,
        "Hue Rotation": 12,
        "Blur": 0,
        "Grayscale": 22,
        "Sepia": 30,
        "Opacity": 92,
        "Invert": 0
    },
    "High Contrast": {
        "Brightness": 105,
        "Contrast": 180,
        "Saturation": 150,
        "Hue Rotation": 0,
        "Blur": 0,
        "Grayscale": 0,
        "Sepia": 0,
        "Opacity": 100,
        "Invert": 0
    },
    "Sunset Glow": {
        "Brightness": 120,
        "Contrast": 135,
        "Saturation": 160,
        "Hue Rotation": 38,
        "Blur": 0,
        "Grayscale": 0,
        "Sepia": 25,
        "Opacity": 100,
        "Invert": 0
    },
    "Deep Ocean": {
        "Brightness": 100,
        "Contrast": 130,
        "Saturation": 90,
        "Hue Rotation": 190,
        "Blur": 2,
        "Grayscale": 0,
        "Sepia": 0,
        "Opacity": 100,
        "Invert": 0
    },
    "Soft Focus": {
        "Brightness": 118,
        "Contrast": 100,
        "Saturation": 85,
        "Hue Rotation": 15,
        "Blur": 3,
        "Grayscale": 5,
        "Sepia": 8,
        "Opacity": 100,
        "Invert": 0
    },
    "Forest Mood": {
        "Brightness": 105,
        "Contrast": 120,
        "Saturation": 95,
        "Hue Rotation": 90,
        "Blur": 0,
        "Grayscale": 0,
        "Sepia": 8,
        "Opacity": 100,
        "Invert": 0
    }
};

Object.keys(presets).forEach((presetsName) => {
    const presetsButton = document.createElement("button");
    presetsButton.classList.add("btn");
    presetsButton.innerText = presetsName;

    presetsButton.addEventListener("click", () => {
        const preset = presets[presetsName];

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        });

        applyFilters();
        filterContainer.innerHTML = "";
        createFilters();
    });

    presetsContainer.appendChild(presetsButton);
}); 