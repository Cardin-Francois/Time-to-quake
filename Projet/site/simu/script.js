document.addEventListener("DOMContentLoaded", function() {
    const magnitudeInput = document.getElementById("magnitude");
    const magnitudeValue = document.getElementById("magnitude-value");
    const soilSelect = document.getElementById("soil");
    const simulateButton = document.getElementById("simulate");
    const visualization = document.getElementById("visualization");
	
	const stopSimulationButton = document.getElementById("stopSimulation");

	
	stopSimulationButton.addEventListener("click", function() {
		
		location.reload();
	});

    magnitudeInput.addEventListener("input", function() {
        magnitudeValue.textContent = magnitudeInput.value;
    });

    simulateButton.addEventListener("click", function() {
        const magnitude = parseFloat(magnitudeInput.value);
        const soilType = soilSelect.value;

        
        while (visualization.firstChild) {
            visualization.removeChild(visualization.firstChild);
        }

        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, visualization.clientWidth / visualization.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(visualization.clientWidth, visualization.clientHeight);
        visualization.appendChild(renderer.domElement);

        
        const skyTexture = new THREE.TextureLoader().load("images/sky_texture.webp");
        scene.background = skyTexture;

        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

		
        let groundTexture;
        if (soilType === "rock") {
            groundTexture = new THREE.TextureLoader().load("images/rock_texture.jpg");
			matiere = 0.1;
        } else if (soilType === "clay") {
            groundTexture = new THREE.TextureLoader().load("images/clay_texture.jpg");
			matiere = 0.2;
        }
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(1, 1);
        const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
        const groundGeometry = new THREE.PlaneGeometry(200, 200, 200, 200);
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        
        let structure;
        
        const buildingTexture = new THREE.TextureLoader().load("images/building_texture.jpg");
        const buildingMaterial = new THREE.MeshLambertMaterial({ map: buildingTexture });
        structure = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 5), buildingMaterial);
        scene.add(structure);
        

        
        camera.position.set(0, 10, 20);
        camera.lookAt(scene.position);

        
        const listener = new THREE.AudioListener();
        camera.add(listener);
        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load("images/earthquake_sound.mp3", function(buffer) {
            sound.setBuffer(buffer);
            sound.setVolume(0.5);
            sound.play();
        });

        
        function animate() {
            requestAnimationFrame(animate);

            
            structure.position.x = Math.sin(Date.now() * 0.001 * magnitude) * matiere * magnitude;

            
            ground.position.x = Math.sin(Date.now() * 0.001 * magnitude) * matiere * magnitude;

            renderer.render(scene, camera);
        }

        animate();
    });
});