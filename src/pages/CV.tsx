import React from 'react';
import { Link } from 'react-router-dom';
import './CV.css';

export const CV: React.FC = () => {
    return (
        <div className="cv-page">
            {/* Floating Back Button */}
            <Link 
                to="/"
                className="cv-back-btn"
                aria-label="Back to Portfolio"
            >
                ← BACK TO PORTFOLIO
            </Link>

            {/* Floating/Fixed Download Button */}
            <a 
                href={`${import.meta.env.BASE_URL}cv/vaibhav_sharma_cv.pdf`}
                download="Vaibhav_Sharma_CV.pdf"
                className="cv-download-btn"
                aria-label="Download CV as PDF"
            >
                ↓ DOWNLOAD PDF
            </a>

            <div className="cv-wrap">
                {/* HEADER */}
                <header className="cv-header">
                    <div style={{ flex: 1 }}>
                        <div className="status-bar">
                            <span className="status-dot"></span>
                            PROCESS ACTIVE &nbsp;·&nbsp; CLASSIFICATION: OPEN &nbsp;·&nbsp; LAST UPDATED: 2026
                        </div>
                        <h1 className="cv-name">
                            Vaibhav<span>.</span>Sharma
                        </h1>
                        <div className="cv-title">
                            Backend &amp; Systems Engineer &nbsp;//&nbsp; B.E. CSE · MITE · 2027
                        </div>
                        <div className="cv-contacts">
                            <span className="ci">
                                <a href="mailto:sharma31stmay@gmail.com">sharma31stmay@gmail.com</a>
                            </span>
                            <span className="ci">
                                <a href="tel:+917010763467">+91 70107 63467</a>
                            </span>
                            <span className="ci">
                                <a href="https://vaibhavsharmaa.me" target="_blank" rel="noopener noreferrer">vaibhavsharmaa.me</a>
                            </span>
                            <span className="ci">
                                <a href="https://github.com/sharmavaibhav31" target="_blank" rel="noopener noreferrer">github.com/sharmavaibhav31</a>
                            </span>
                            <span className="ci">
                                <a href="https://linkedin.com/in/sharmavaibhav31" target="_blank" rel="noopener noreferrer">linkedin.com/in/sharmavaibhav31</a>
                            </span>
                            <span className="ci">Bangalore, India</span>
                        </div>
                    </div>
                    <div className="photo-box">
                        <img 
                            src={`${import.meta.env.BASE_URL}vaibhav_sharma.png`} 
                            alt="Vaibhav Sharma" 
                            className="cv-photo-img"
                            onError={(e) => {
                                // Fallback if image not found
                                e.currentTarget.style.display = 'none';
                                const label = e.currentTarget.parentElement?.querySelector('.photo-label');
                                if (label) {
                                    (label as HTMLElement).style.display = 'block';
                                }
                            }}
                        />
                        <div className="photo-label" style={{ display: 'none' }}>PHOTO<br />HERE</div>
                    </div>
                </header>

                {/* IDENTITY */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Identity</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="identity-grid">
                        <div className="identity-cell">
                            <div className="identity-key">Current Status</div>
                            <div className="identity-val green">Backend Engineering Intern · LazyStudents.in</div>
                        </div>
                        <div className="identity-cell">
                            <div className="identity-key">Degree</div>
                            <div className="identity-val">B.E. Computer Science · CGPA 9.43 · Graduating 2027</div>
                        </div>
                        <div className="identity-cell">
                            <div className="identity-key">Core Discipline</div>
                            <div className="identity-val">Backend Systems · Event-Driven Architecture · Secure Engineering</div>
                        </div>
                        <div className="identity-cell">
                            <div className="identity-key">Open Source</div>
                            <div className="identity-val green">Arachnode · 26 ★ · 47 forks · Project Admin (GSSoC)</div>
                        </div>
                        <div className="identity-cell span2">
                            <div className="identity-key">Looking For</div>
                            <div className="identity-val red">SDE-1 / Junior Backend Engineer · Product Companies · Startups · Full-time · Open to Relocation</div>
                        </div>
                    </div>
                </section>

                {/* STORY */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Story</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="narrative">
                        <p>I didn't start as a backend engineer. Like most first-year CSE students, I had no clear direction — just curiosity and a vague sense that I should be doing <em>something</em>. My first pull was toward cybersecurity: I got hands-on with Kali, explored ethical hacking, started a few courses. It was interesting, but I was consuming more than I was building.</p>
                        <p>Then I got pulled by the crowd toward mobile development. Did an internship, shipped code to a real app. But I noticed something uncomfortable: I was only productive when someone told me exactly what to do. I couldn't design a system from scratch. I was a passenger, not a driver. That bothered me enough to change direction.</p>
                        <p>Around the start of my third year, I started asking a different question — not "what should I build?" but "how do these things actually work?" Backend engineering and systems design clicked. Not because it was fashionable, but because it required <em>real</em> thinking: tradeoffs, constraints, failure modes, state. I also had a practical read on where AI was going — the hard parts of backend weren't being automated. So I doubled down on the hard parts.</p>
                        <p>I built projects from genuine need or curiosity, not to pad a portfolio. One turned into an open-source project with real contributors. The security interest never went away — my C shell with Seccomp sandboxing was me answering a question I had about running AI locally without exposing my system. Someday, maybe an MS in security. But right now, I want to build backend systems that don't fall over.</p>
                    </div>
                </section>

                {/* EXPERIENCE */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Experience</span>
                        <div className="section-rule"></div>
                    </div>

                    <div className="exp-entry">
                        <div className="exp-header">
                            <div className="exp-role">Backend Engineering Intern</div>
                            <div className="exp-period">Jun 2026 — Present</div>
                        </div>
                        <div className="exp-company">LazyStudents.in <span className="loc">· Remote</span></div>
                        <ul className="exp-bullets">
                            <li>Primary backend engineer on a plagiarism detection and reduction service — designing the text-comparison pipeline, backend API, and suggestion engine from scratch.</li>
                            <li>Own end-to-end quality of <strong>40+ platform tools</strong>: writing structured test plans, identifying integration failures, and filing reproducible bug reports consumed directly by the backend team.</li>
                            <li>Leading the interns team, coordinating task allocation and review cycles in an Agile environment.</li>
                        </ul>
                    </div>

                    <div className="exp-entry">
                        <div className="exp-header">
                            <div className="exp-role">AI/ML Backend Intern</div>
                            <div className="exp-period">Sep 2025 — Nov 2025</div>
                        </div>
                        <div className="exp-company">Infosys Springboard <span className="loc">· Virtual</span></div>
                        <ul className="exp-bullets">
                            <li>Orchestrated 3 heterogeneous ML inference models (MusicGen, fine-tuned GPT lyric model, YAMNet genre classifier) behind a Flask API layer — MoodHarmonics: an end-to-end AI music generation system.</li>
                            <li>Implemented model preloading and graceful fallback routing, cutting average initialization latency from ~2.2s to ~1.2s (<strong>45% reduction</strong>), measured over 500+ sequential requests.</li>
                            <li>Designed error-handling middleware ensuring inference continuity under model failures; persisted semi-structured metadata and hashed user credentials in MongoDB.</li>
                        </ul>
                    </div>

                    <div className="exp-entry">
                        <div className="exp-header">
                            <div className="exp-role">Flutter Developer Intern</div>
                            <div className="exp-period">Jul 2025 — Sep 2025</div>
                        </div>
                        <div className="exp-company">ClubChat <span className="loc">· Remote · IIIT Delhi Startup</span></div>
                        <ul className="exp-bullets">
                            <li>Shipped event-feed and real-time chat to a production app with <strong>8,000+ users</strong>.</li>
                            <li>Resolved <strong>18 production stability issues</strong> across two releases — including 3 critical crash-on-launch regressions — through log analysis and device-level reproduction.</li>
                        </ul>
                    </div>
                </section>

                {/* SYSTEMS BUILT */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Systems Built</span>
                        <div className="section-rule"></div>
                    </div>

                    {/* Arachnode */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">Arachnode — Automated Job Discovery &amp; Outreach Platform</div>
                            <div className="project-year">2026</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">Python</span>
                            <span className="tag">FastAPI</span>
                            <span className="tag">Redis Streams</span>
                            <span className="tag">PostgreSQL</span>
                            <span className="tag">Docker</span>
                            <span className="tag">Scrapy</span>
                            <span className="tag">Playwright</span>
                            <span className="tag">pytest</span>
                            <span className="tag">testcontainers</span>
                            <span className="tag rt">Open Source</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">Built because I genuinely needed it — manually tracking job postings and cold-emailing recruiters was unscalable. This system handles the discovery-to-draft pipeline automatically.</p>
                            <ul className="project-bullets">
                                <li>Architected across <strong>7 independent microservices</strong> communicating via Redis Streams consumer groups — chose Redis Streams over Kafka for at-least-once delivery with lower operational overhead for a self-hosted deployment.</li>
                                <li><strong>4-tier test suite</strong>: unit, integration (testcontainers with ephemeral Postgres + Redis), contract (schema consistency across services), and e2e (full dashboard flows).</li>
                                <li>OSINT recruiter enrichment (GitHub API + SMTP verification) and Ollama-powered cold-email drafting via Jinja2; full pipeline automated via APScheduler.</li>
                                <li>Serves as Project Admin: reviewing PRs, enforcing API contracts, managing CI/GitHub Actions, mentoring GSSoC / ELUSOC contributors.</li>
                            </ul>
                        </div>
                        <div className="project-stats">
                            <span className="stat-item">Stars <span>26</span></span>
                            <span className="stat-item">Forks <span>47</span></span>
                            <span className="stat-item">Commits <span>143</span></span>
                            <span className="stat-item">Issues <span>32</span></span>
                            <span className="stat-item">PRs Reviewed <span>25+</span></span>
                        </div>
                    </div>

                    {/* HPMS */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">HPMS — Hostel Permission Management System</div>
                            <div className="project-year">2024–2025</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">Node.js</span>
                            <span className="tag">Express</span>
                            <span className="tag">PostgreSQL</span>
                            <span className="tag">Prisma</span>
                            <span className="tag">React</span>
                            <span className="tag">JWT</span>
                            <span className="tag">Docker</span>
                            <span className="tag">Nginx</span>
                            <span className="tag">node-cron</span>
                            <span className="tag">QR Codes</span>
                            <span className="tag rt">Institution Project</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">Hostel students had to hand-write permission letters on A4 sheets — wardens were often unavailable, the process was slow and had no audit trail. I designed a full digital replacement.</p>
                            <ul className="project-bullets">
                                <li>5-role permission workflow (Student / Warden / Chief Warden / Admin / Security) with JWT-signed QR certificates generated on approval — valid for exactly 2 scans (exit + entry), auto-invalidated after both.</li>
                                <li>Modular monolith backend (Node.js + Express + Prisma) across 7 feature modules: auth, users, master, requests, certificates, gate, admin — served behind Nginx reverse proxy with SSL termination for HTTPS-required camera access at the gate.</li>
                                <li>Gate scanner web app using html5-qrcode; node-cron job detecting overdue returns and triggering warden alerts; SMTP notifications to parents on approval, exit, and return.</li>
                                <li>Attempted Tatvik TMF20 biometric integration: built a .NET 4.8 bridge exposing the SDK over HTTP and a .NET 8 FingerprintService calling it — hit a firmware wall (SDK couldn't talk to third parties); pivoted to the QR-based flow as the production solution.</li>
                                <li>Full SRS with 40+ FRs, ERD, and 4 system process flow diagrams; proposed to college administration for deployment.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Appraisal */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">Appraisal Management System</div>
                            <div className="project-year">2026</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">Java 21</span>
                            <span className="tag">Spring Boot 4</span>
                            <span className="tag">Spring Security</span>
                            <span className="tag">PostgreSQL</span>
                            <span className="tag">Flyway</span>
                            <span className="tag">JWT</span>
                            <span className="tag">Docker</span>
                            <span className="tag">OpenAPI</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">The college's faculty appraisal process was entirely paper-based — no audit trail, no consistency. I built the backend to replace it.</p>
                            <ul className="project-bullets">
                                <li>State-machine workflow: <strong>DRAFT → SUBMITTED → HOD_REVIEWED → FINALIZED → LOCKED</strong>, with legal revert paths and immutability post-finalization.</li>
                                <li>Full audit trail on every transition (userId, timestamp, old/new value); JWT auth with RBAC across Faculty / HOD / Principal / Admin roles.</li>
                                <li>Configurable scoring weights validated to sum to 100%; 13 Flyway migrations; @Valid on all endpoints; env-injected credentials via Docker Compose.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Timetable */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">Academic Timetable Scheduling Engine</div>
                            <div className="project-year">2026</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">Java 17</span>
                            <span className="tag">Spring Boot 3</span>
                            <span className="tag">PostgreSQL</span>
                            <span className="tag">Flyway</span>
                            <span className="tag">H2 Testing</span>
                            <span className="tag">Apache POI</span>
                            <span className="tag">Docker</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">Departments spend days generating timetables manually each semester. The constraint-satisfaction problem hooked me.</p>
                            <ul className="project-bullets">
                                <li>Greedy constraint-propagation engine enforcing <strong>8 hard constraints</strong>: no double-booking across faculty/room/section, 55-min consecutive-class gap, designation load caps, room-type matching, break isolation.</li>
                                <li>Section-first generation strategy prevents slot starvation; fallback faculty via priority-ranked FacultyPreference entries before failing.</li>
                                <li>Generates conflict-free timetables in <strong>under 2 minutes</strong> vs. days manually; H2 integration tests, Flyway V1–V10, Excel/PDF export, two-stage Docker build.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Offline Shell */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">Offline AI Assistant Shell</div>
                            <div className="project-year">2025</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">C</span>
                            <span className="tag">llama.cpp</span>
                            <span className="tag">TinyLlama-1.1B</span>
                            <span className="tag">Seccomp</span>
                            <span className="tag">Linux Namespaces</span>
                            <span className="tag">rlimits</span>
                            <span className="tag">CMake</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">I wanted AI assistance in my terminal, locally, with no internet. Making it safe on a live system turned it into a real security engineering problem.</p>
                            <ul className="project-bullets">
                                <li>Sandboxed C shell integrating TinyLlama-1.1B via llama.cpp — fully offline, air-gapped execution post-setup.</li>
                                <li>Four-layer security: Seccomp syscall whitelist, PID/mount namespace isolation, capability dropping, rlimit caps — prevents privilege escalation and system exposure.</li>
                                <li>First-query latency ~2–3s (model load); subsequent ~1–2s; 10–20 tok/s CPU at ~1–1.5GB memory. Includes functional test suite, MD5 integrity check, and strace syscall audit workflow.</li>
                            </ul>
                        </div>
                    </div>

                    {/* MoodHarmonics */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">MoodHarmonics — End-to-End AI Music Generation System</div>
                            <div className="project-year">2025</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">Python</span>
                            <span className="tag">Flask</span>
                            <span className="tag">MusicGen</span>
                            <span className="tag">YAMNet</span>
                            <span className="tag">GPT (fine-tuned)</span>
                            <span className="tag">PyTorch</span>
                            <span className="tag">TensorFlow</span>
                            <span className="tag">MongoDB</span>
                            <span className="tag">React</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">The goal wasn't to build another AI music app — it was to answer: can multiple ML models with different runtimes and constraints be orchestrated into a reliable, end-to-end system?</p>
                            <ul className="project-bullets">
                                <li>Orchestrated 3 heterogeneous ML models: MusicGen (text-to-audio), a fine-tuned GPT lyric model (enforcing verse/chorus structure vs. base GPT descriptive output), and YAMNet + GTZAN classifier (genre + confidence score) — all behind a single Flask API layer.</li>
                                <li>Model preloading at server startup + graceful fallback paths (local inference preferred, Hugging Face fallback) to manage heavy initialization and failure modes under real performance constraints.</li>
                                <li>Stored semi-structured song metadata and hashed user credentials in MongoDB; served generated audio from local file storage; coordinated frontend-backend interactions under CORS and latency constraints.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Air Notepad */}
                    <div className="project-card">
                        <div className="project-card-header">
                            <div className="project-name">Air Notepad — Gesture-Based Drawing System</div>
                            <div className="project-year">2024</div>
                        </div>
                        <div className="project-stack">
                            <span className="tag">Python</span>
                            <span className="tag">OpenCV</span>
                            <span className="tag">MediaPipe</span>
                            <span className="tag">NumPy</span>
                            <span className="tag">Jupyter</span>
                        </div>
                        <div className="project-body">
                            <p className="project-story">Built for fun — wanted my own air-drawing app. Ended up at 176,000 LinkedIn impressions and 84 comments. Not every project needs to be enterprise-grade to matter.</p>
                            <ul className="project-bullets">
                                <li>Tracked 21 hand landmarks per hand via MediaPipe Hand Landmarker, mapping raw landmark coordinates to drawing strokes via weighted moving-average smoothing (configurable factor) to reduce jitter.</li>
                                <li>Dual-hand control: left hand for tool/color selection via pinch gesture (Euclidean distance threshold); right hand for drawing via index-finger extension detection using relative Y-coordinates.</li>
                                <li>HD canvas (1280×720), 3 tools (Pen/Brush/Eraser), 8-color palette; confidence thresholds at 0.8 for both detection and tracking; frame-by-frame NumPy array operations for minimal latency.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* TECHNICAL SKILLS */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Technical Skills</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="skills-table">
                        <div className="skill-row">
                            <div className="skill-key">Languages</div>
                            <div className="skill-val">Java · Python · SQL · C · JavaScript (Node.js)</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">Backend</div>
                            <div className="skill-val">Spring Boot · Spring Security · Spring Data JPA · FastAPI · Flask · Express.js · REST API Design · JWT · RBAC</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">Databases</div>
                            <div className="skill-val">PostgreSQL · Redis Streams · MySQL · MongoDB · Firestore · Flyway · Prisma ORM</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">DevOps &amp; Tooling</div>
                            <div className="skill-val">Docker · Docker Compose · Nginx · GitHub Actions · Linux · Bash · Git · Maven</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">Testing</div>
                            <div className="skill-val">pytest · testcontainers · H2 (integration) · Unit / Contract / e2e</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">Architecture</div>
                            <div className="skill-val">Event-Driven Microservices · Consumer Groups · Modular Monolith · API Gateway · State Machines · Audit Trails · Constraint Scheduling</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">Systems</div>
                            <div className="skill-val">Linux Namespaces · Seccomp · rlimits · llama.cpp · Syscall Analysis · .NET (bridge layer)</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">ML / CV</div>
                            <div className="skill-val">PyTorch · TensorFlow · MusicGen · YAMNet · MediaPipe · OpenCV · Ollama · Model Serving · Inference Optimization</div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-key">Frontend</div>
                            <div className="skill-val">React · Vite · Flutter · Dart (mobile)</div>
                        </div>
                    </div>
                </section>

                {/* CERTIFICATIONS */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Certifications</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="cert-grid">
                        <div className="cert-item">
                            <div className="cert-issuer">Oracle</div>
                            <div className="cert-name">OCI 2025 DevOps Professional</div>
                            <div className="cert-date">Nov 2025 · Verified</div>
                        </div>
                        <div className="cert-item">
                            <div className="cert-issuer">Oracle</div>
                            <div className="cert-name">OCI 2025 Data Science Professional</div>
                            <div className="cert-date">Oct 2025 · Verified</div>
                        </div>
                        <div className="cert-item">
                            <div className="cert-issuer">Oracle</div>
                            <div className="cert-name">OCI 2025 Generative AI Professional</div>
                            <div className="cert-date">Oct 2025 · Verified</div>
                        </div>
                        <div className="cert-item">
                            <div className="cert-issuer">Oracle</div>
                            <div className="cert-name">OCI 2025 Generative AI Foundations Associate</div>
                            <div className="cert-date">Sep 2025 · Verified</div>
                        </div>
                        <div className="cert-item">
                            <div className="cert-issuer">Google Cloud · Coursera</div>
                            <div className="cert-name">Cloud Security Engineer Specialization</div>
                            <div className="cert-date">Jul 2024 · Verified</div>
                        </div>
                        <div className="cert-item">
                            <div className="cert-issuer">Google Cloud · Coursera</div>
                            <div className="cert-name">Security in Google Cloud Specialization</div>
                            <div className="cert-date">Sep 2024 · Verified</div>
                        </div>
                        <div className="cert-item" style={{ gridColumn: 'span 2' }}>
                            <div className="cert-issuer">Google · Coursera</div>
                            <div className="cert-name">Google Cybersecurity Professional Certificate</div>
                            <div className="cert-date">Verified</div>
                        </div>
                    </div>
                </section>

                {/* EDUCATION */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Education</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="exp-entry" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                        <div className="exp-header">
                            <div className="exp-role">B.E. Computer Science and Engineering</div>
                            <div className="exp-period">Sep 2023 — Jun 2027</div>
                        </div>
                        <div className="exp-company">Mangalore Institute of Technology and Engineering <span className="loc">· Karnataka, India</span></div>
                        <ul className="exp-bullets" style={{ marginTop: '10px' }}>
                            <li>CGPA: <strong>9.43 / 10</strong></li>
                            <li>President, Coders Club — organized Hack n' Seek (700+ online · 180 on-site participants)</li>
                            <li>Mentored 60+ students through 6 technical workshops (Git, DSA, backend architecture)</li>
                        </ul>
                    </div>
                </section>

                {/* LEADERSHIP */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Leadership &amp; Community</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="leadership-entry">
                        <div className="leadership-icon">↗</div>
                        <div>
                            <div className="leadership-role">Project Admin — Arachnode</div>
                            <div className="leadership-org">GSSoC · ELUSOC · Aperture 3.0 · Feb 2026 — Present</div>
                            <div className="leadership-desc">Reviewing and merging contributor PRs, enforcing API contract standards, maintaining CI/GitHub Actions, coordinating releases for a project with 26 stars and 47 forks. Mentoring first-time open-source contributors. Merged 2 PRs into GitCanvas (Aperture 3.0) after maintainer review.</div>
                        </div>
                    </div>
                    <div className="leadership-entry">
                        <div className="leadership-icon">◈</div>
                        <div>
                            <div className="leadership-role">President, Coders Club — MITE</div>
                            <div className="leadership-org">Oct 2025 — Present</div>
                            <div className="leadership-desc">Organized Hack n' Seek with <strong>700+ online and 180 on-site participants</strong> across multiple colleges. Delivered 6 technical workshops on Git, Data Structures, and backend architecture to 60+ students.</div>
                        </div>
                    </div>
                </section>

                {/* WHERE I'M GOING */}
                <section className="section">
                    <div className="section-header">
                        <span className="section-label">Where I'm Going</span>
                        <div className="section-rule"></div>
                    </div>
                    <div className="directive-block">
                        <div className="directive-label">PERSONAL_DIRECTIVE.log</div>
                        <p className="directive-text">I'm not entirely sure what the destination looks like yet, and I think that's honest. What I do know is the kind of engineer I want to be: someone who understands systems deeply enough to make real tradeoffs, not just implement tickets. I want to work on backend infrastructure where reliability is the product — distributed systems, data pipelines, secure architectures.</p>
                        <p className="directive-text" style={{ marginTop: '12px' }}>In 3–4 years: either a Senior Solutions Architect or a Senior Backend Engineer at a high-growth product company — or the person who helped a good startup go from 10 to 10 million requests a day. The cybersecurity interest is still live. An MS in Security is on the table.</p>
                        <p className="directive-text" style={{ marginTop: '12px' }}>The one thing I'm certain about: I want to build things that require real thinking. Things that break in interesting ways. Things where the decision I make about a message queue or a transaction boundary actually matters.</p>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="cv-footer">
                    <div>VAIBHAV_SHARMA.cv · v2026.06 · PROCESS END</div>
                    <div>
                        <a href="https://vaibhavsharmaa.me" target="_blank" rel="noopener noreferrer">vaibhavsharmaa.me</a> &nbsp;·&nbsp;&nbsp;
                        <a href="https://github.com/sharmavaibhav31" target="_blank" rel="noopener noreferrer">github.com/sharmavaibhav31</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};
