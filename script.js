/**
 * AI Education Website - Interactive Features & Animations
 * Designed as a lecture companion website
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle hamburger animation styles
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = '#FAF8F5';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '1px solid #E7E5E4';
                navMenu.style.boxShadow = '0 10px 15px -3px rgba(28, 25, 23, 0.06)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navMenu.style.display = '';
            }
        });
    }

    // ==========================================================================
    // LIGHTBOX / TIMELINE IMAGE VIEWER
    // ==========================================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && lightboxImg && lightboxCaption) {
        // Open Lightbox
        galleryItems.forEach(item => {
            if (item.tagName === 'A') return; // Skip links so they navigate normally
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-title');

                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || 'Timeline image';
                    lightboxCaption.textContent = title ? title.textContent : '';
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Stop background scrolling
                }
            });
        });

        // Close Lightbox functions
        const closeLightboxHandler = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightboxHandler);
        }

        // Close on clicking backdrop
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxHandler();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightboxHandler();
            }
        });
    }

    // ==========================================================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================================================

    // 1. Core reveal classes (fade-in & slide-up)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Animates once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Timeline connector line drawing trigger
    const timeline = document.querySelector('.timeline-horizontal');
    if (timeline) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05
        });
        timelineObserver.observe(timeline);
    }

    // 3. Highlight active stage indicators in timeline
    const stages = document.querySelectorAll('.timeline-stage');
    const stageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    stages.forEach(stage => stageObserver.observe(stage));

    // 4. Highlight active steps in pipeline
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    const pipelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    pipelineSteps.forEach(step => pipelineObserver.observe(step));

    // ==========================================================================
    // SCROLLSPY (NAVBAR HIGHLIGHT DURING SCROLL)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpyHandler = () => {
        const scrollPosition = window.scrollY + 120; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpyHandler);
    scrollSpyHandler(); // Run on startup to highlight correct section

    // ==========================================================================
    // HERO CARD DYNAMIC TRANSITIONS (Motorsport to AI stages)
    // ==========================================================================
    const heroCardContent = document.querySelector('.visual-inner-card .card-content');
    const heroDots = document.querySelectorAll('.visual-inner-card .step-dot');
    const visualOrbit = document.querySelector('.visual-orbit');

    if (heroCardContent && heroDots.length > 0) {
        const heroStages = [
            {
                badge: "Phase 1: Motorsport",
                title: "Williams Racing & F1",
                desc: "High-Performance Telemetry"
            },
            {
                badge: "Phase 2: Transition",
                title: "Consulting & Lectures",
                desc: "Enterprise AI Enablement"
            },
            {
                badge: "Phase 3: AI Solutions",
                title: "Interactive Portfolios",
                desc: "Live Apps & System Delivery"
            }
        ];

        let currentStageIndex = 0;

        const updateHeroStage = (index) => {
            heroCardContent.classList.add('fade');

            setTimeout(() => {
                currentStageIndex = index;
                const nextStage = heroStages[currentStageIndex];

                const badgeEl = heroCardContent.querySelector('.card-step-badge');
                const titleEl = heroCardContent.querySelector('.card-step-title');
                const descEl = heroCardContent.querySelector('.card-step-desc');

                if (badgeEl) badgeEl.textContent = nextStage.badge;
                if (titleEl) titleEl.textContent = nextStage.title;
                if (descEl) descEl.textContent = nextStage.desc;

                heroDots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentStageIndex);
                });

                heroCardContent.classList.remove('fade');
            }, 400);
        };

        const resetOrbitAnimation = () => {
            if (visualOrbit) {
                visualOrbit.style.animation = 'none';
                visualOrbit.offsetHeight; // Trigger reflow to restart animation
                visualOrbit.style.animation = '';
            }
        };

        // Sync phase change with the 5s orbit iteration
        if (visualOrbit) {
            visualOrbit.addEventListener('animationiteration', () => {
                const nextIdx = (currentStageIndex + 1) % heroStages.length;
                updateHeroStage(nextIdx);
            });
        }

        // Click handlers for dots
        heroDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                if (idx === currentStageIndex) return;
                updateHeroStage(idx);
                resetOrbitAnimation(); // Reset orbit so it spins from the start in sync
            });
        });
    }

    // ==========================================================================
    // INTERACTIVE AI AGENT SIMULATOR LOGIC
    // ==========================================================================
    const simScenarios = {
        audit: {
            prompt: "Extract total revenue from Q3_Report.pdf and flag discrepancies with general_ledger.csv",
            files: [
                { icon: "📄", name: "Q3_Report.pdf" },
                { icon: "📊", name: "general_ledger.csv" }
            ],
            knowledgeLabel: "SharePoint Docs",
            toolsLabel: "Python Executor",
            steps: [
                {
                    status: "Ingesting...",
                    log: "📥 Ingested user prompt and 2 grounding files: Q3_Report.pdf, general_ledger.csv.",
                    activeNodes: ["node-user", "node-brain"],
                    activePath: "path-user-to-brain",
                    pathStyle: "primary",
                    packet: { id: "pkt-u2b", motion: "anim-u2b", icon: "📄" },
                    duration: 1800
                },
                {
                    status: "Thinking...",
                    log: "🧠 THOUGHT: I need to read the Q3_Report.pdf content first to extract total revenue. I'll fetch it from the workspace SharePoint index.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 2000
                },
                {
                    status: "Reading PDF...",
                    log: "🔍 KNOWLEDGE: Retrieving and reading Q3_Report.pdf from SharePoint grounding source...",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-brain-to-knowledge",
                    pathStyle: "secondary",
                    packet: { id: "pkt-b2k", motion: "anim-b2k", icon: "🔍" },
                    duration: 1500
                },
                {
                    status: "PDF Parsed",
                    log: "📄 KNOWLEDGE OBSERVED: Extracted 'Q3 Total Revenue = $1,245,000' from Q3_Report.pdf.",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-knowledge-to-brain",
                    pathStyle: "secondary",
                    packet: { id: "pkt-k2b", motion: "anim-k2b", icon: "📄" },
                    duration: 1500
                },
                {
                    status: "Thinking...",
                    log: "🧠 THOUGHT: Now I need to compare this revenue with general_ledger.csv. I will run a Python script to calculate the sum of transaction records in the ledger.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 2000
                },
                {
                    status: "Running Python...",
                    log: "🛠️ TOOL: Launching isolated Python sandbox with general_ledger.csv...",
                    activeNodes: ["node-brain", "node-tools"],
                    activePath: "path-brain-to-tools",
                    pathStyle: "accent",
                    packet: { id: "pkt-b2t", motion: "anim-b2t", icon: "🛠️" },
                    duration: 1500
                },
                {
                    status: "Tool Output",
                    log: "⚙️ TOOL OBSERVED: Script executed. df['Amount'].sum() returned $1,202,500. Difference = -$42,500.",
                    activeNodes: ["node-brain", "node-tools"],
                    activePath: "path-tools-to-brain",
                    pathStyle: "accent",
                    packet: { id: "pkt-t2b", motion: "anim-t2b", icon: "⚙️" },
                    duration: 1800
                },
                {
                    status: "Synthesizing...",
                    log: "🧠 THOUGHT: Calculations show a discrepancy of $42,500. Formulating final response flag for the user.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 1800
                },
                {
                    status: "Completed",
                    log: "📤 OUTPUT: Discrepancy report sent to user. Summary: Revenue in PDF ($1.245M) exceeds general ledger ($1.2025M) by $42,500.",
                    activeNodes: ["node-brain", "node-user"],
                    activePath: "path-brain-to-user",
                    pathStyle: "primary",
                    packet: { id: "pkt-b2u", motion: "anim-b2u", icon: "📊" },
                    duration: 2000
                }
            ]
        },
        intel: {
            prompt: "Research competitor pricing for 'Enterprise AI Package A' and draft a discount proposal email.",
            files: [
                { icon: "🔗", name: "competitors_list.json" }
            ],
            knowledgeLabel: "Pricing Database",
            toolsLabel: "Google Web Search",
            steps: [
                {
                    status: "Ingesting...",
                    log: "📥 Ingested user prompt and competitor checklist JSON.",
                    activeNodes: ["node-user", "node-brain"],
                    activePath: "path-user-to-brain",
                    pathStyle: "primary",
                    packet: { id: "pkt-u2b", motion: "anim-u2b", icon: "🔗" },
                    duration: 1800
                },
                {
                    status: "Thinking...",
                    log: "🧠 THOUGHT: I need to query Google Web Search to obtain the latest pricing of the competitors in competitors_list.json.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 2000
                },
                {
                    status: "Searching Web...",
                    log: "🛠️ TOOL: Querying Web Search API for 'Competitor AI pricing package A'...",
                    activeNodes: ["node-brain", "node-tools"],
                    activePath: "path-brain-to-tools",
                    pathStyle: "accent",
                    packet: { id: "pkt-b2t", motion: "anim-b2t", icon: "🔍" },
                    duration: 1800
                },
                {
                    status: "Web Search Done",
                    log: "⚙️ TOOL OBSERVED: Competitor price found: $120/seat/month average for Package A.",
                    activeNodes: ["node-brain", "node-tools"],
                    activePath: "path-tools-to-brain",
                    pathStyle: "accent",
                    packet: { id: "pkt-t2b", motion: "anim-t2b", icon: "💵" },
                    duration: 1500
                },
                {
                    status: "Thinking...",
                    log: "🧠 THOUGHT: Now I need to consult our internal discounting policy in the pricing database to verify the maximum allowed discount before drafting.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 1800
                },
                {
                    status: "Checking Rules...",
                    log: "🔍 KNOWLEDGE: Querying Internal Pricing Database for discounting guidelines...",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-brain-to-knowledge",
                    pathStyle: "secondary",
                    packet: { id: "pkt-b2k", motion: "anim-b2k", icon: "📚" },
                    duration: 1500
                },
                {
                    status: "Rules Loaded",
                    log: "📄 KNOWLEDGE OBSERVED: Retrieved Rule: 'Standard discounts up to 15% approved by rep; 15-20% require Director sign-off'.",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-knowledge-to-brain",
                    pathStyle: "secondary",
                    packet: { id: "pkt-k2b", motion: "anim-k2b", icon: "📄" },
                    duration: 1500
                },
                {
                    status: "Synthesizing...",
                    log: "🧠 THOUGHT: Competitor is at $120. Our base is $135. A 15% discount makes it $114.75, which is highly competitive. I will draft a 15% discount proposal.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 2000
                },
                {
                    status: "HITL Check",
                    log: "📤 OUTPUT: Discount Proposal drafted. [HITL Triggered: Waiting for user approval to send email to client].",
                    activeNodes: ["node-brain", "node-user"],
                    activePath: "path-brain-to-user",
                    pathStyle: "primary",
                    packet: { id: "pkt-b2u", motion: "anim-b2u", icon: "📧" },
                    duration: 2000
                }
            ]
        },
        grading: {
            prompt: "Grade essay_draft.docx, score each section, and generate a graded_feedback.pdf.",
            files: [
                { icon: "📄", name: "essay_draft.docx" }
            ],
            knowledgeLabel: "Grading Database",
            toolsLabel: "PDF Document Writer",
            steps: [
                {
                    status: "Ingesting...",
                    log: "📥 Ingested student essay draft: essay_draft.docx.",
                    activeNodes: ["node-user", "node-brain"],
                    activePath: "path-user-to-brain",
                    pathStyle: "primary",
                    packet: { id: "pkt-u2b", motion: "anim-u2b", icon: "📄" },
                    duration: 1800
                },
                {
                    status: "Thinking...",
                    log: "🧠 THOUGHT: I need to identify the course name and fetch the matching marking rubric from our grading database.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 2000
                },
                {
                    status: "Querying DB...",
                    log: "🔍 KNOWLEDGE: Querying Grading Database for rubric matching Course_101 assignment criteria...",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-brain-to-knowledge",
                    pathStyle: "secondary",
                    packet: { id: "pkt-b2k", motion: "anim-b2k", icon: "🔍" },
                    duration: 1500
                },
                {
                    status: "Rubric Loaded",
                    log: "📄 KNOWLEDGE OBSERVED: Retrieved standard_rubric.md. Criteria: Intro (20%), Critical Analysis (50%), Citations (30%).",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-knowledge-to-brain",
                    pathStyle: "secondary",
                    packet: { id: "pkt-k2b", motion: "anim-k2b", icon: "📋" },
                    duration: 1800
                },
                {
                    status: "Thinking...",
                    log: "🧠 THOUGHT: Student essay matches standard rubric. I will run the automated grading tool to verify citation structure and score sections.",
                    activeNodes: ["node-brain"],
                    activePath: null,
                    packet: null,
                    duration: 2000
                },
                {
                    status: "Grading Essay...",
                    log: "🛠️ TOOL: Initiating PDF Document Writer sandbox to cross-reference rubrics and compile annotated feedback report...",
                    activeNodes: ["node-brain", "node-tools"],
                    activePath: "path-brain-to-tools",
                    pathStyle: "accent",
                    packet: { id: "pkt-b2t", motion: "anim-b2t", icon: "🛠️" },
                    duration: 2000
                },
                {
                    status: "PDF Created",
                    log: "⚙️ TOOL OBSERVED: Report created. Calculated score: 84/100 (Grade: A-). Storing result in student records...",
                    activeNodes: ["node-brain", "node-tools"],
                    activePath: "path-tools-to-brain",
                    pathStyle: "accent",
                    packet: { id: "pkt-t2b", motion: "anim-t2b", icon: "✍️" },
                    duration: 1500
                },
                {
                    status: "Saving Score...",
                    log: "🔍 KNOWLEDGE: Writing final grade of 84% for essay_draft.docx to the Grading Database...",
                    activeNodes: ["node-brain", "node-knowledge"],
                    activePath: "path-brain-to-knowledge",
                    pathStyle: "secondary",
                    packet: { id: "pkt-b2k", motion: "anim-b2k", icon: "💾" },
                    duration: 1800
                },
                {
                    status: "Completed",
                    log: "📤 OUTPUT: Sent graded_feedback.pdf to user. Final Grade: A- (84/100). Comments saved in Grading Database.",
                    activeNodes: ["node-brain", "node-user"],
                    activePath: "path-brain-to-user",
                    pathStyle: "primary",
                    packet: { id: "pkt-b2u", motion: "anim-b2u", icon: "🎓" },
                    duration: 2000
                }
            ]
        }
    };

    // Grab elements
    const scenarioSelect = document.getElementById('scenarioSelect');
    const simPromptText = document.getElementById('simPromptText');
    const simInputsContainer = document.getElementById('simInputsContainer');
    const simConsole = document.getElementById('simConsole');
    const btnRunSim = document.getElementById('btnRunSim');
    const btnResetSim = document.getElementById('btnResetSim');
    
    const nodeUser = document.getElementById('node-user');
    const nodeBrain = document.getElementById('node-brain');
    const nodeKnowledge = document.getElementById('node-knowledge');
    const nodeTools = document.getElementById('node-tools');
    const brainStatus = document.getElementById('brain-status');
    const knowledgeSub = document.getElementById('knowledge-sub');
    const toolsSub = document.getElementById('tools-sub');

    // SVG paths
    const paths = {
        'path-user-to-brain': document.getElementById('path-user-to-brain'),
        'path-brain-to-user': document.getElementById('path-brain-to-user'),
        'path-brain-to-knowledge': document.getElementById('path-brain-to-knowledge'),
        'path-knowledge-to-brain': document.getElementById('path-knowledge-to-brain'),
        'path-brain-to-tools': document.getElementById('path-brain-to-tools'),
        'path-tools-to-brain': document.getElementById('path-tools-to-brain')
    };

    let simTimeoutId = null;
    let isRunning = false;

    // Helper: Formats timestamp
    const getTimestamp = () => {
        const d = new Date();
        return `[${d.toTimeString().split(' ')[0]}]`;
    };

    // Helper: Reset highlights safely
    const clearVisuals = () => {
        // Nodes
        if (nodeUser) nodeUser.classList.remove('active');
        if (nodeBrain) nodeBrain.classList.remove('active', 'thinking');
        if (nodeKnowledge) nodeKnowledge.classList.remove('active');
        if (nodeTools) nodeTools.classList.remove('active');
        
        // Paths
        Object.values(paths).forEach(path => {
            if (path) {
                path.setAttribute('class', 'connection-line');
            }
        });
        
        // Reset SVG packets
        document.querySelectorAll('.pkt-group').forEach(pkt => {
            if (pkt) pkt.setAttribute('opacity', '0');
        });
    };

    // Trigger SVG SMIL Packet Animation along path safely
    const triggerPacket = (packetId, motionId, iconText) => {
        const packet = document.getElementById(packetId);
        const motion = document.getElementById(motionId);
        if (packet && motion) {
            const textNode = packet.querySelector('.pkt-text');
            if (textNode && iconText) {
                textNode.textContent = iconText;
            }
            
            // Show packet group
            packet.setAttribute('opacity', '1');
            
            // Fire native SMIL animation
            motion.beginElement();
            
            // Fade out packet after motion completes (1.2s duration)
            setTimeout(() => {
                packet.setAttribute('opacity', '0');
            }, 1200);
        }
    };

    // Setup initial UI states per scenario safely
    const updateScenarioSetup = (scenarioId) => {
        // Clear any timeouts
        if (simTimeoutId) clearTimeout(simTimeoutId);
        isRunning = false;
        
        const scenario = simScenarios[scenarioId];
        if (!scenario) return;

        // Reset text inputs & badges
        if (simPromptText) simPromptText.textContent = scenario.prompt;
        
        // File badges
        if (simInputsContainer) {
            simInputsContainer.innerHTML = '';
            scenario.files.forEach(file => {
                const badge = document.createElement('span');
                badge.className = 'sim-file-badge';
                badge.innerHTML = `<span class="badge-icon">${file.icon}</span> ${file.name}`;
                simInputsContainer.appendChild(badge);
            });
        }

        // Set sub-labels on nodes
        if (knowledgeSub) knowledgeSub.textContent = scenario.knowledgeLabel;
        if (toolsSub) toolsSub.textContent = scenario.toolsLabel;

        // Reset Console
        if (simConsole) {
            simConsole.innerHTML = `<div class="console-line system">[Ready] Select a scenario and press "Run Agent" to start.</div>`;
        }
        
        // Reset diagram visual states
        clearVisuals();
        if (brainStatus) brainStatus.textContent = 'Idle';
        
        // Toggle buttons
        if (btnRunSim) btnRunSim.disabled = false;
        if (btnResetSim) btnResetSim.disabled = true;
        if (scenarioSelect) scenarioSelect.disabled = false;
    };

    // Run the step-by-step simulator safely
    const runSimulation = () => {
        if (!scenarioSelect) return;
        const scenarioId = scenarioSelect.value;
        const scenario = simScenarios[scenarioId];
        if (!scenario) return;

        isRunning = true;
        if (btnRunSim) btnRunSim.disabled = true;
        if (btnResetSim) btnResetSim.disabled = false;
        scenarioSelect.disabled = true;
        
        if (simConsole) simConsole.innerHTML = ''; // Clear console logs
        
        let stepIdx = 0;
        
        const executeStep = () => {
            if (!isRunning) return;

            if (stepIdx >= scenario.steps.length) {
                // Done!
                clearVisuals();
                if (brainStatus) brainStatus.textContent = 'Completed';
                
                if (simConsole) {
                    const line = document.createElement('div');
                    line.className = 'console-line system';
                    line.textContent = `${getTimestamp()} [Done] Task successfully completed.`;
                    simConsole.appendChild(line);
                    simConsole.scrollTop = simConsole.scrollHeight;
                }
                
                if (btnRunSim) btnRunSim.disabled = false;
                scenarioSelect.disabled = false;
                return;
            }

            const step = scenario.steps[stepIdx];
            
            // 1. Update Brain Node Thinking state
            if (nodeBrain) {
                if (step.status === 'Thinking...') {
                    nodeBrain.classList.add('thinking');
                } else {
                    nodeBrain.classList.remove('thinking');
                }
            }
            if (brainStatus) brainStatus.textContent = step.status;

            // 2. Print console logs
            if (simConsole) {
                const line = document.createElement('div');
                let categoryClass = 'system';
                if (step.log.startsWith('🧠')) categoryClass = 'thought';
                else if (step.log.startsWith('🛠️') || step.log.startsWith('⚙️')) categoryClass = 'tool';
                else if (step.log.startsWith('🔍') || step.log.startsWith('📄')) categoryClass = 'knowledge';
                else if (step.log.startsWith('📤')) categoryClass = 'output';
                
                line.className = `console-line ${categoryClass}`;
                line.textContent = `${getTimestamp()} ${step.log}`;
                simConsole.appendChild(line);
                
                // Auto scroll console
                simConsole.scrollTop = simConsole.scrollHeight;
            }

            // 3. Highlight Nodes
            if (nodeUser) nodeUser.classList.toggle('active', step.activeNodes.includes('node-user'));
            if (nodeBrain) nodeBrain.classList.toggle('active', step.activeNodes.includes('node-brain'));
            if (nodeKnowledge) nodeKnowledge.classList.toggle('active', step.activeNodes.includes('node-knowledge'));
            if (nodeTools) nodeTools.classList.toggle('active', step.activeNodes.includes('node-tools'));

            // 4. Highlight Connection Paths
            Object.entries(paths).forEach(([name, path]) => {
                if (path) {
                    if (name === step.activePath) {
                        path.setAttribute('class', `connection-line active ${step.pathStyle}`);
                    } else {
                        path.setAttribute('class', 'connection-line');
                    }
                }
            });

            // 5. Trigger Packet Flow Motion Animation
            if (step.packet) {
                triggerPacket(step.packet.id, step.packet.motion, step.packet.icon);
            }

            // 6. Queue next step
            stepIdx++;
            simTimeoutId = setTimeout(executeStep, step.duration);
        };

        executeStep();
    };

    // Reset Simulation
    const resetSimulation = () => {
        if (simTimeoutId) clearTimeout(simTimeoutId);
        if (scenarioSelect) updateScenarioSetup(scenarioSelect.value);
    };

    // Wire events
    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', (e) => {
            updateScenarioSetup(e.target.value);
        });
        
        // Run first setup
        updateScenarioSetup(scenarioSelect.value);
    }

    if (btnRunSim) {
        btnRunSim.addEventListener('click', runSimulation);
    }

    if (btnResetSim) {
        btnResetSim.addEventListener('click', resetSimulation);
    }
});
