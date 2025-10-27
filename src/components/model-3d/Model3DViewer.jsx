import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = ({ src }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI;
    controlsRef.current = controls;

    // Lighting - Increased intensity for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 5, -10);
    scene.add(backLight);

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  useEffect(() => {
    if (!src || !sceneRef.current) return;

    // Remove previous model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    setLoading(true);
    setError(null);

    // Load new model with better error handling
    const loader = new GLTFLoader();

    // Set up custom loading manager for better error tracking
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onError = (url) => {
      console.error("Error loading:", url);
      setError(`Failed to load: ${url}`);
      setLoading(false);
    };

    const loaderWithManager = new GLTFLoader(loadingManager);

    loaderWithManager.load(
      src,
      (gltf) => {
        const model = gltf.scene;

        // Enable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;

        model.scale.multiplyScalar(scale);

        // Center the model
        box.setFromObject(model);
        const newCenter = box.getCenter(new THREE.Vector3());
        model.position.sub(newCenter);

        sceneRef.current.add(model);
        modelRef.current = model;

        // Adjust camera to fit model
        const distance = maxDim * scale * 2;
        cameraRef.current.position.set(distance, distance, distance);
        cameraRef.current.lookAt(0, 0, 0);

        if (controlsRef.current) {
          controlsRef.current.target.set(0, 0, 0);
          controlsRef.current.update();
        }

        setLoading(false);
      },
      (progress) => {
        // Optional: track loading progress
        if (progress.lengthComputable) {
          const percentComplete = (progress.loaded / progress.total) * 100;
          console.log(`Loading: ${percentComplete.toFixed(2)}%`);
        }
      },
      (error) => {
        console.error("Error loading model:", error);
        let errorMessage = "Failed to load model";

        if (error.message) {
          errorMessage += `: ${error.message}`;
        }

        // Check for common issues
        if (error.message && error.message.includes("CORS")) {
          errorMessage =
            "CORS error - The model file cannot be loaded due to cross-origin restrictions";
        } else if (error.message && error.message.includes("404")) {
          errorMessage = "Model file not found (404)";
        } else if (error.message && error.message.includes("slice")) {
          errorMessage =
            "Invalid GLB file or file path. Please check the URL and ensure it points to a valid GLB file.";
        }

        setError(errorMessage);
        setLoading(false);
      },
    );
  }, [src]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "400px",
        }}
      />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "18px",
            fontFamily: "sans-serif",
          }}
        >
          Loading model...
        </div>
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ff6b6b",
            fontSize: "16px",
            fontFamily: "sans-serif",
            maxWidth: "80%",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ff6b6b",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Error</div>
          <div>{error}</div>
        </div>
      )}
    </div>
  );
};

const ModelViewerSimple = ({ src }) => {
  return <model-viewer src={src} auto-rotate camera-controls />;
};
export default ModelViewerSimple;
