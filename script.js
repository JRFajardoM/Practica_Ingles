document.addEventListener('DOMContentLoaded', () => {
    const sectionSelection = document.getElementById('section-selection');
    const sectionSelect = document.getElementById('section-select');
    const startPracticeBtn = document.getElementById('start-practice');
    const card = document.getElementById('card');
    const nextWordBtn = document.getElementById('nextWord');
    const image = document.getElementById('image');
    const playSound = document.getElementById('playSound');
    const textInput = document.getElementById('textInput');
    const feedback = document.getElementById('feedback');

    let data = JSON.parse(localStorage.getItem('ingles_data'));
    let currentWords = [];
    let currentWordIndex = 0;

    // Si no hay datos, inicializar con datos de construcción
    if (!data || Object.keys(data).length === 0) {
        data = {
            "Construction": [
                { "word": "Cinder Block", "image": "https://via.placeholder.com/200x200.png?text=Cinder+Block" },
                { "word": "Concrete", "image": "https://via.placeholder.com/200x200.png?text=Concrete" },
                { "word": "Drill", "image": "https://via.placeholder.com/200x200.png?text=Drill" },
                { "word": "Foundation", "image": "https://via.placeholder.com/200x200.png?text=Foundation" },
                { "word": "Hammer", "image": "https://via.placeholder.com/200x200.png?text=Hammer" },
                { "word": "Tape Measure", "image": "https://via.placeholder.com/200x200.png?text=Tape+Measure" },
                { "word": "Metal", "image": "https://via.placeholder.com/200x200.png?text=Metal" },
                { "word": "Concrete Mix", "image": "https://via.placeholder.com/200x200.png?text=Concrete+Mix" },
                { "word": "Nail", "image": "https://via.placeholder.com/200x200.png?text=Nail" },
                { "word": "Nails", "image": "https://via.placeholder.com/200x200.png?text=Nails" },
                { "word": "Concrete Pouring", "image": "https://via.placeholder.com/200x200.png?text=Concrete+Pouring" },
                { "word": "Saw", "image": "https://via.placeholder.com/200x200.png?text=Saw" },
                { "word": "Screw", "image": "https://via.placeholder.com/200x200.png?text=Screw" },
                { "word": "Drill Bit", "image": "https://via.placeholder.com/200x200.png?text=Drill+Bit" },
                { "word": "Nailing", "image": "https://via.placeholder.com/200x200.png?text=Nailing" },
                { "word": "Wood", "image": "https://via.placeholder.com/200x200.png?text=Wood" }
            ],
            "Construction Site": [
                { "word": "Frame", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Frame.jpg" },
                { "word": "Door", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Door.jpg" },
                { "word": "Roof", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Roof.jpg" },
                { "word": "Cinder Block", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/cinder%20Block.jpg" },
                { "word": "Rebar", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Rebar.jpg" },
                { "word": "Window", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Window.jpg" },
                { "word": "Hammer", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Hammer.jpg" },
                { "word": "Stucco", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Stuko.jpg" },
                { "word": "Metal", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Metal.jpg" },
                { "word": "Saw", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/saw.jpg" },
                { "word": "Wall", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/wall.jpg" },
                { "word": "Nails", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Nails.jpg" },
                { "word": "Nail", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Nail.jpg" },
                { "word": "Hinge", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Hinge.jpg" },
                { "word": "Corner", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Corner.jpg" },
                { "word": "Floor", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Floor.jpg" },
                { "word": "Screwdriver", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Screwdriver.jpg" },
                { "word": "Drill", "image": "https://file.garden/Z8NltLNFC1q_3W8R/Curso/Drill.jpg" }
            ]
        };
        localStorage.setItem('ingles_data', JSON.stringify(data));
    }

    function updateSectionDropdown() {
        if (!data || Object.keys(data).length === 0) {
            sectionSelection.innerHTML = '<h2>No hay temas disponibles.</h2><p>Ve al <a href="admin.html">panel de administrador</a> para añadir nuevos temas y palabras.</p>';
            return;
        }

        sectionSelect.innerHTML = '';
        for (const section in data) {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = section;
            sectionSelect.appendChild(option);
        }
    }

    function loadWord() {
        const currentWord = currentWords[currentWordIndex];
        image.src = currentWord.image;
        textInput.value = '';
        textInput.className = '';
        feedback.textContent = '';
    }

    startPracticeBtn.addEventListener('click', () => {
        const selectedSection = sectionSelect.value;
        if (data[selectedSection] && data[selectedSection].length > 0) {
            currentWords = data[selectedSection];
            currentWordIndex = 0;
            sectionSelection.style.display = 'none';
            card.style.display = 'block';
            nextWordBtn.style.display = 'block';
            loadWord();
        } else {
            alert('Esta sección no tiene palabras. Añade algunas desde el panel de administrador.');
        }
    });

    playSound.addEventListener('click', () => {
        const currentWord = currentWords[currentWordIndex];

        if (currentWord.audio) {
            // Si hay una URL de audio, úsala
            const audio = new Audio(currentWord.audio);
            audio.play().catch(error => {
                console.error('Error al reproducir el audio personalizado:', error);
                feedback.textContent = 'No se pudo reproducir el audio.';
            });
        } else {
            // Si no, usa la síntesis de voz del navegador
            const utterance = new SpeechSynthesisUtterance(currentWord.word);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }
    });

    textInput.addEventListener('input', () => {
        const currentWord = currentWords[currentWordIndex];
        if (textInput.value.toLowerCase() === currentWord.word.toLowerCase()) {
            textInput.classList.add('correct');
            textInput.classList.remove('incorrect');
            feedback.textContent = '¡Correcto!';
        } else {
            textInput.classList.add('incorrect');
            textInput.classList.remove('correct');
            feedback.textContent = `Intenta de nuevo.`
        }
    });

    nextWordBtn.addEventListener('click', () => {
        currentWordIndex++;
        if (currentWordIndex >= currentWords.length) {
            currentWordIndex = 0; // Reiniciar al principio
        }
        loadWord();
    });

    // Inicializar
    updateSectionDropdown();
});
