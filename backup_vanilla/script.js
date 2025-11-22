// Module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Body = Matter.Body,
    Vector = Matter.Vector;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create renderer
const container = document.getElementById('canvas-container');
const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
    }
});

Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Boundaries
let walls = [];
function createBoundaries() {
    Composite.remove(world, walls);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const wallOptions = {
        isStatic: true,
        render: { visible: false },
        restitution: 0.8
    };
    const thickness = 100;

    walls = [
        Bodies.rectangle(width / 2, -thickness / 2, width, thickness, wallOptions), // Top
        Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, wallOptions), // Bottom
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, wallOptions), // Right
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height, wallOptions) // Left
    ];

    Composite.add(world, walls);
}

createBoundaries();

// Create bodies (Background Decoration)
const bodies = [];
const colors = ['#4facfe', '#00f2fe', '#a18cd1', '#fbc2eb', '#8fd3f4'];

for (let i = 0; i < 30; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight - 500; // Start above
    const size = Math.random() * 40 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];

    let body;
    const options = {
        friction: 0.1,
        restitution: 0.6,
        render: {
            fillStyle: color,
            opacity: 0.5
        }
    };

    if (Math.random() > 0.5) {
        body = Bodies.circle(x, y, size, options);
    } else {
        body = Bodies.polygon(x, y, Math.floor(Math.random() * 3) + 3, size, options);
    }

    // Add random rotation and velocity
    Body.setAngle(body, Math.random() * Math.PI * 2);
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

    bodies.push(body);
}

Composite.add(world, bodies);

// We don't need the DOM sync loop anymore for these background items as the renderer handles them.
// But we do need to ensure the renderer is drawing them.
render.options.wireframes = false; // Ensure full render

// Mouse Control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);
render.mouse = mouse;

// Allow scrolling on the content container
// We need to make sure the canvas doesn't block clicks on the content
// The canvas is z-index 0, content is z-index 10.
// But we want to interact with the background too?
// If content covers the screen, we can't touch the background.
// The content container has padding, so there are gaps.
// Also, we can set `pointer-events: none` on the content container and `pointer-events: auto` on the cards/buttons.
// Let's do that in CSS or here.
const contentContainer = document.querySelector('.content-container');
contentContainer.style.pointerEvents = 'none';
document.querySelectorAll('.glass-card, .btn, a, footer').forEach(el => {
    el.style.pointerEvents = 'auto';
});

// Window Resize Handling
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    createBoundaries();
});

// Controls
const gravityBtn = document.getElementById('gravity-btn');
let gravityEnabled = true;

gravityBtn.addEventListener('click', () => {
    gravityEnabled = !gravityEnabled;
    engine.gravity.y = gravityEnabled ? 1 : 0;
    if (!gravityEnabled) {
        bodies.forEach(body => {
            Body.applyForce(body, body.position, {
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05
            });
        });
    }
    gravityBtn.textContent = gravityEnabled ? 'Zero Gravity' : 'Enable Gravity';
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    location.reload();
});

// Modal Logic
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Add click listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.dataset.modalTitle;
        const content = card.dataset.modalContent;
        if (title && content) {
            openModal(title, content);
        }
    });
});