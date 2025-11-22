import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsBackground = ({ gravityEnabled }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Body = Matter.Body;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        Render.run(render);

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);
        runnerRef.current = runner;

        // Boundaries
        let walls = [];
        const createBoundaries = () => {
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
        };

        createBoundaries();

        // Create bodies (Background Decoration)
        const bodies = [];
        const colors = ['#4facfe', '#00f2fe', '#a18cd1', '#fbc2eb', '#8fd3f4'];

        for (let i = 0; i < 30; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight - 500;
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

            Body.setAngle(body, Math.random() * Math.PI * 2);
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

            bodies.push(body);
        }

        Composite.add(world, bodies);

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

        // Resize Handler
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            createBoundaries();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) {
                render.canvas.remove();
            }
            Composite.clear(world);
            Engine.clear(engine);
            render.canvas = null;
            render.context = null;
            render.textures = {};
        };
    }, []);

    // Handle Gravity Toggle
    useEffect(() => {
        if (engineRef.current) {
            engineRef.current.gravity.y = gravityEnabled ? 1 : 0;
            if (!gravityEnabled) {
                const bodies = Matter.Composite.allBodies(engineRef.current.world);
                bodies.forEach(body => {
                    if (!body.isStatic) {
                        Matter.Body.applyForce(body, body.position, {
                            x: (Math.random() - 0.5) * 0.05,
                            y: (Math.random() - 0.5) * 0.05
                        });
                    }
                });
            }
        }
    }, [gravityEnabled]);

    return (
        <div
            ref={sceneRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'auto' // Allow interaction with background
            }}
        />
    );
};

export default PhysicsBackground;
