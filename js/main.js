/**
 * AgenticPH Labs — Portfolio JS v2c
 * Tab navigation, project/service/product filtering with modal popups, theme toggle
 * No external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ===========================================
     Sample Project Data (for modals)
     =========================================== */
  const projectData = [
    {
      displayName: 'Project Scope Engine',
      originalName: 'Client Intake Automation',
      title: 'Project Scope Engine < Client Intake Automation',
      accentClass: 'automation-accent',
      statusClass: 'status-demo',
      statusLabel: 'Demo-ready',
      githubUrl: 'https://github.com/agenticph-labs/p1-client-intake',
      sections: [
        {
          heading: 'Problem',
          body: '<p>Consulting firms waste hours manually processing client inquiry forms — reading emails, extracting requirements, classifying needs, and producing project scopes. Every client uses different language; no two intake forms look alike.</p>'
        },
        {
          heading: 'Objective',
          body: '<p>Build an automated pipeline that ingests client data in any format (JSON, CSV), validates it, classifies the need using a rule engine, and generates a structured project scope document — all in a single, auditable pass.</p>'
        },
        {
          heading: 'Approach',
          body: '<p>Modular 5-stage pipeline (Ingest → Validate → Classify → Scope → Output) using a keyword-based rule engine for deterministic, auditable classification across 10 service categories.</p>'
        },
        {
          heading: 'Implementation',
          body: '<p>Each stage is an independent function. Stage 1 auto-detects file format. Stage 2 validates required fields. Stage 3 matches against configurable CLASSIFICATION_RULES. Stage 4 uses Jinja-style string templates. Stage 5 writes Markdown reports plus summary index.</p>'
        },
        {
          heading: 'Result',
          body: '<p>Processes 7 sample records in under 0.5 seconds. Each record generates a comprehensive scope document with objective, deliverables, tech stack, timeline, budget range, risk factors, and next steps.</p>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python 3.10+ (stdlib only — zero dependencies)</li><li><strong>Classification:</strong> Keyword-based rule engine with confidence scoring (0–1)</li><li><strong>Testing:</strong> pytest suite covering validation, classification, and output stages</li></ul>'
        },
        {
          heading: 'Limitations',
          body: '<ul><li>Current keyword rules are static — future versions should support YAML-configured rule sets</li><li>No LLM fallback for ambiguous classifications (intentional — keeps pipeline deterministic)</li><li>Could support PDF intake documents via OCR pre-processing stage</li></ul>'
        }
      ]
    },
    {
      displayName: 'Market Analyzer',
      originalName: 'PH Market Intelligence',
      title: 'Market Analyzer < PH Market Intelligence',
      accentClass: 'data-accent',
      statusClass: 'status-deployed',
      statusLabel: 'Deployed',
      githubUrl: 'https://github.com/agenticph-labs/p2-ph-market-intelligence',
      sections: [
        {
          heading: 'Problem',
          body: '<p>Philippine business stakeholders lack accessible, consolidated market intelligence on the local coffee shop industry. Data is scattered across Euromonitor reports, USDA briefs, news articles, and company filings.</p>'
        },
        {
          heading: 'Objective',
          body: '<p>Build an interactive Streamlit dashboard consolidating Philippine coffee shop market data — market overview, competitor analysis, geographic distribution, pricing, and business insights — accessible in 10 minutes, not 10 hours.</p>'
        },
        {
          heading: 'Approach',
          body: '<p>Dashboard over static report — market intelligence is inherently exploratory. Separated data pipeline (clean → transform → analyze → export) from the dashboard layer for independent testability and reuse.</p>'
        },
        {
          heading: 'Implementation',
          body: '<p>pipeline.py handles all data processing: ingests raw CSVs, computes derived metrics, and exports clean datasets plus 13 Plotly HTML charts. dashboard.py presents 5 tabbed Streamlit pages with KPI cards and interactive charts.</p>'
        },
        {
          heading: 'Result',
          body: '<p>Reveals a $1.82B (2025) market projected at $2.30B by 2028 (7.3% CAGR). Key insight: Zus Coffee\'s 100% YoY store growth signals value segment battleground. 80% of Filipino adults drink 2.5 cups/day with low specialty penetration (14%).</p>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, pandas, Plotly, Streamlit</li><li><strong>Data Sources:</strong> Euromonitor, USDA, Statista, company filings (2024–2026)</li><li><strong>Visualization:</strong> 13 interactive Plotly charts, KPI cards, tabbed dashboard</li></ul>'
        },
        {
          heading: 'Limitations',
          body: '<ul><li>Data is manually collected — automated news/data ingestion pipeline needed</li><li>No real-time pricing data; menu prices are point-in-time snapshots</li><li>Geographic data is aggregated at regional level</li></ul>'
        }
      ]
    },
    {
      displayName: 'Bid Intelligence Suite',
      originalName: 'RFP Analyzer',
      title: 'Bid Intelligence Suite < RFP Analyzer',
      accentClass: 'ai-accent',
      statusClass: 'status-demo',
      statusLabel: 'Demo-ready',
      githubUrl: 'https://github.com/agenticph-labs/p3-rfp-analyzer',
      sections: [
        {
          heading: 'Problem',
          body: '<p>Procurement teams spend hours reading PDF-based RFPs and RFQs — extracting deadlines, eligibility criteria, deliverables, evaluation criteria, and risks. A missed detail can disqualify a bid worth millions.</p>'
        },
        {
          heading: 'Objective',
          body: '<p>Build an AI-powered system that extracts structured information from procurement PDFs — deadlines, eligibility, deliverables, evaluation criteria, budget, risks — validated against a defined schema so no critical field is silently dropped.</p>'
        },
        {
          heading: 'Approach',
          body: '<p>LLM-in-the-loop architecture over pure regex — procurement documents vary wildly. Three independently testable layers: PDF parsing → LLM extraction → Pydantic validation. Pydantic ensures schema compliance; missing fields are gracefully omitted.</p>'
        },
        {
          heading: 'Implementation',
          body: '<p>PyMuPDF extracts raw text. Analyzer sends text to OpenAI-compatible LLM with structured output prompt. Response validated against RFPParseResult (Pydantic model). Streamlit frontend presents collapsible cards with summary, dates, deliverables, eligibility, evaluation, budget, risks.</p>'
        },
        {
          heading: 'Result',
          body: '<p>Extracts 7 structured fields with schema validation. Collapsible card UI lets procurement teams scan at a glance. Test suite validates happy path and edge cases (missing fields, malformed documents).</p>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, PyMuPDF, OpenAI API, Pydantic, Streamlit</li><li><strong>Architecture:</strong> PDF Parser → LLM Analyzer → Pydantic Validation → Streamlit UI</li><li><strong>Chunking:</strong> Long-document support for documents exceeding LLM context windows</li></ul>'
        },
        {
          heading: 'Limitations',
          body: '<ul><li>LLM extraction cost per document for high-volume procurement teams</li><li>No image/chart extraction from PDFs; scanned tables not parsed</li><li>Multi-document comparison not yet supported</li></ul>'
        }
      ]
    },
    {
      displayName: 'Sentiment Compass',
      originalName: 'Customer Feedback Intelligence',
      title: 'Sentiment Compass < Customer Feedback Intelligence',
      accentClass: 'ai-accent',
      statusClass: 'status-deployed',
      statusLabel: 'Deployed',
      githubUrl: 'https://github.com/agenticph-labs/p4-customer-feedback-intel',
      sections: [
        {
          heading: 'Problem',
          body: '<p>Philippine businesses collect customer reviews across multiple channels (Shopee, Lazada, Google Maps, Facebook) but lack tools to systematically extract signal from noise and identify actionable patterns.</p>'
        },
        {
          heading: 'Objective',
          body: '<p>Build an NLP pipeline + interactive dashboard that ingests review data, runs sentiment analysis, discovers topics via unsupervised learning, detects temporal trends, and generates prioritized action recommendations.</p>'
        },
        {
          heading: 'Approach',
          body: '<p>VADER for sentiment (works on social-media-style text with zero training data). TF-IDF + NMF for interpretable topic extraction without GPU/labeled data. Rule-based recommendation engine converts statistical findings into actionable business language.</p>'
        },
        {
          heading: 'Implementation',
          body: '<p>nlp_pipeline.py: VADER → TF-IDF → NMF (5 topics, 8 keywords each) → temporal aggregation → recommendation engine (5 rule-based categories: product quality, hotspots, shipping, pricing, emerging complaints). dashboard.py renders four-tab Streamlit app.</p>'
        },
        {
          heading: 'Result',
          body: '<p>Dashboard reveals sentiment distribution, 5 interpretable topics, monthly trends (dual-axis chart), and 5 categories of actionable recommendations. A PM knows within 30 seconds which issues need immediate attention.</p>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, VADER, scikit-learn (TF-IDF + NMF), pandas, Plotly, Streamlit</li><li><strong>Topics:</strong> TF-IDF vectorization → NMF decomposition (5 topics, 8 keywords each)</li><li><strong>Trends:</strong> Monthly temporal aggregation with dual-axis (rating + review volume)</li></ul>'
        },
        {
          heading: 'Limitations',
          body: '<ul><li>VADER is English-only — Taglish reviews need a multilingual sentiment model</li><li>Topic count (k=5) is fixed — dynamic selection would improve with growth</li><li>No automatic data ingestion — real-time monitoring not yet supported</li></ul>'
        }
      ]
    },
    {
      displayName: 'Competitive Radar',
      originalName: 'Competitive Intelligence',
      title: 'Competitive Radar < Competitive Intelligence',
      accentClass: 'automation-accent',
      statusClass: 'status-demo',
      statusLabel: 'Demo-ready',
      githubUrl: 'https://github.com/agenticph-labs/p5-competitive-intel',
      sections: [
        {
          heading: 'Problem',
          body: '<p>Philippine businesses operate in a fast-moving competitive landscape where tracking competitors manually — news, hiring, features, pricing — is impractical. Most SME decision-makers rely on anecdotal intel.</p>'
        },
        {
          heading: 'Objective',
          body: '<p>Build an automated agentic workflow that collects competitor data from multiple sources, runs multi-dimensional analysis (features, sentiment, hiring, pricing), and produces a structured daily intelligence brief.</p>'
        },
        {
          heading: 'Approach',
          body: '<p>Modular collect → analyze → synthesize → report architecture. Each stage is an independent module (collector.py, analyzer.py, reporter.py) orchestrated by pipeline.py, allowing new data sources without refactoring analysis or reporting.</p>'
        },
        {
          heading: 'Implementation',
          body: '<p>collector.py gathers competitor profiles, news, job postings, features, and pricing. analyzer.py runs 5 engines: feature gap, sentiment, hiring signals, pricing, composite scoring (5 weighted factors). reporter.py produces structured daily brief with scorecards and recommendations.</p>'
        },
        {
          heading: 'Result',
          body: '<p>Complete daily brief generated in under a second. Includes executive summary, per-competitor scorecards, competitive positioning, feature gap matrix, and 3–5 prioritized action recommendations.</p>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python 3.13+ (stdlib only — zero external deps)</li><li><strong>Architecture:</strong> Collect → Analyze → Synthesize → Report; modular, independently testable stages</li><li><strong>Scoring:</strong> Weighted 5-factor competitive score with configurable weights</li></ul>'
        },
        {
          heading: 'Limitations',
          body: '<ul><li>Data sources are simulated — real NewsAPI, LinkedIn integration is next step</li><li>No persistent storage; each run starts fresh (intentional for daily batch)</li><li>Alert system (Slack/email notifications) not yet implemented</li></ul>'
        }
      ]
    },
    {
      displayName: 'Market Entry Compass',
      originalName: 'Research Decision System',
      title: 'Market Entry Compass < Research Decision System',
      accentClass: 'research-accent',
      statusClass: 'status-demo',
      statusLabel: 'Demo-ready',
      githubUrl: 'https://github.com/agenticph-labs/p6-research-decision',
      sections: [
        {
          heading: 'Problem',
          body: '<p>A mid-cap F&amp;B group considering Philippine market entry needs a defensible, data-driven answer. Traditional consulting takes 8–12 weeks and costs PHP 1–3M — out of reach for smaller firms.</p>'
        },
        {
          heading: 'Objective',
          body: '<p>Produce a structured research-to-decision pipeline answering a strategic business question through multi-dimensional analysis: market sizing, competitive analysis, pricing, customer segments, risk assessment, and investment recommendation.</p>'
        },
        {
          heading: 'Approach',
          body: '<p>PICO/PESTEL → Data Collection → Market Sizing → Competitor Analysis → Pricing → Customer Segmentation → Risk Assessment → MCDA framework grounded in economics and strategic management theory. MCDA with weighted scoring gives a transparent Go/No-go threshold (70/100).</p>'
        },
        {
          heading: 'Implementation',
          body: '<p>Jupyter notebook walks through all 8 stages interactively. Data from PSA, BSP, Euromonitor, Kantar. Top-down + bottom-up market sizing. Porter\'s Five Forces + Strategic Group Mapping. MCDA scores 7 dimensions with transparent weights — producing a 74.7/100 Conditional GO.</p>'
        },
        {
          heading: 'Result',
          body: '<p>Composite score 74.7/100 — Conditional GO. Recommendation: Enter via phased strategy — 3 pilot stores in Metro Manila CBDs, validate unit economics over 12 months, then scale regionally.</p>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, Jupyter, pandas, matplotlib, seaborn</li><li><strong>Framework:</strong> PICO/PESTEL → MCDA with 7 weighted dimensions</li><li><strong>Analysis:</strong> Top-down + bottom-up market sizing, Porter\'s Five Forces, scenario analysis</li></ul>'
        },
        {
          heading: 'Limitations',
          body: '<ul><li>Philippine-specific consumer survey data would strengthen segment assumptions</li><li>Real estate cost data by specific CBD location would improve bottom-up economics</li><li>Would benefit from a Streamlit frontend for interactive MCDA weight adjustment</li></ul>'
        }
      ]
    }
  ];

  /* ===========================================
     Services Data (for modals)
     =========================================== */
  const servicesData = [
    {
      title: 'AI Workflow Automation',
      price: '$500',
      sections: [
        {
          heading: 'Description',
          body: '<p>End-to-end automated pipelines for document processing, data extraction, and reporting. From PDF intake to structured output — no manual steps.</p>'
        },
        {
          heading: 'What\'s Included',
          body: '<ul><li>Custom pipeline design and development</li><li>Document parsing and data extraction</li><li>Automated reporting and export</li><li>Streamlit Cloud deployment</li><li>30-day support and maintenance</li></ul>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, Streamlit, LLM integration as needed</li><li><strong>Delivery:</strong> Deployed to a working URL via Streamlit Cloud</li><li><strong>Timeline:</strong> 2–4 weeks depending on complexity</li></ul>'
        }
      ]
    },
    {
      title: 'Market Intelligence Dashboards',
      price: '$750',
      sections: [
        {
          heading: 'Description',
          body: '<p>Custom dashboards tracking competitors, market trends, and customer sentiment in real time. Interactive Plotly charts, deployed to a working URL.</p>'
        },
        {
          heading: 'What\'s Included',
          body: '<ul><li>Data pipeline design and implementation</li><li>Custom dashboard with 5+ interactive views</li><li>KPI cards and trend visualization</li><li>Streamlit Cloud deployment</li><li>Data source integration</li></ul>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, pandas, Plotly, Streamlit</li><li><strong>Visualization:</strong> Interactive Plotly charts, KPI cards</li><li><strong>Timeline:</strong> 3–6 weeks depending on data sources</li></ul>'
        }
      ]
    },
    {
      title: 'Procurement AI Solutions',
      price: '$1,000',
      sections: [
        {
          heading: 'Description',
          body: '<p>RFP analysis, vendor scoring, and compliance checks powered by LLMs and structured data pipelines. From PDF to decision-ready report.</p>'
        },
        {
          heading: 'What\'s Included',
          body: '<ul><li>RFP document parsing and extraction</li><li>Vendor scoring and evaluation framework</li><li>Compliance check automation</li><li>Decision-ready report generation</li><li>Streamlit Cloud deployment</li></ul>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, PyMuPDF, OpenAI API / DeepSeek, Pydantic, Streamlit</li><li><strong>Architecture:</strong> PDF Parser → LLM Analyzer → Validation → UI</li><li><strong>Timeline:</strong> 4–8 weeks depending on scope</li></ul>'
        }
      ]
    },
    {
      title: 'Data Strategy & Consulting',
      price: '$1,500',
      sections: [
        {
          heading: 'Description',
          body: '<p>From research scoping to production-ready data systems — strategy, architecture, and implementation. Structured research-to-decision pipelines.</p>'
        },
        {
          heading: 'What\'s Included',
          body: '<ul><li>Research scoping and methodology design</li><li>Data architecture and pipeline design</li><li>Production-ready system implementation</li><li>Documentation and handover</li><li>30-day post-deployment support</li></ul>'
        },
        {
          heading: 'Technical Details',
          body: '<ul><li><strong>Stack:</strong> Python, PostgreSQL, Streamlit, LLMs as needed</li><li><strong>Approach:</strong> Structured research-to-decision pipeline</li><li><strong>Timeline:</strong> 6–12 weeks depending on scope</li></ul>'
        }
      ]
    }
  ];

  /* ===========================================
     Products Data (for modals)
     =========================================== */
  const productsData = [
    {
      title: 'AI Proposal Template Pack',
      price: '$25',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Ready-to-use proposal templates for AI consulting engagements. Includes scope definition, pricing frameworks, deliverable outlines, and client-ready formats.</p>'
        },
        {
          heading: 'Contents',
          body: '<ul><li>5 proposal templates (PDF + DOCX)</li><li>Pricing calculator spreadsheet</li><li>Scope definition worksheet</li><li>Client onboarding checklist</li></ul>'
        },
        {
          heading: 'Format',
          body: '<p>Digital download. PDF, DOCX, and XLSX formats. Compatible with Google Docs and Microsoft Office.</p>'
        }
      ]
    },
    {
      title: 'Market Analysis Workbook',
      price: '$35',
      badge: 'Available on Raket.ph',
      sections: [
        {
          heading: 'Description',
          body: '<p>Structured framework for Philippine market entry research. Step-by-step methodology covering market sizing, competitor analysis, and go-to-market strategy.</p>'
        },
        {
          heading: 'Contents',
          body: '<ul><li>Market sizing templates</li><li>Competitor analysis matrix</li><li>PESTEL analysis framework</li><li>Go-to-market strategy canvas</li></ul>'
        },
        {
          heading: 'Format',
          body: '<p>Digital download. PDF workbook with fillable fields plus XLSX templates.</p>'
        }
      ]
    },
    {
      title: 'Automation Blueprint Bundle',
      price: '$50',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Technical blueprints for common business automation patterns. Includes architecture diagrams, code templates, and deployment guides for Python-based automation pipelines.</p>'
        },
        {
          heading: 'Contents',
          body: '<ul><li>5 automation blueprint documents (PDF)</li><li>Python code templates (ZIP)</li><li>Architecture diagrams (PNG + draw.io)</li><li>Deployment guides (PDF)</li></ul>'
        },
        {
          heading: 'Format',
          body: '<p>Digital download. PDF, PNG, draw.io, ZIP with Python templates.</p>'
        }
      ]
    }
  ];

  /* ===========================================
     DOM References
     =========================================== */
  const els = {
    navLinks: document.getElementById('nav-links'),
    navToggle: document.getElementById('mobile-nav-toggle'),
    themeToggle: document.getElementById('theme-toggle'),
    tabs: document.querySelectorAll('[data-tab]'),
    tabContents: document.querySelectorAll('.tab-content'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    projectCards: document.querySelectorAll('.project-card'),
    heroCtaSamples: document.querySelector('.hero-cta-samples'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalContent: document.getElementById('modal-content'),
    modalClose: document.getElementById('modal-close'),
  };

  /* ===========================================
     State
     =========================================== */
  const state = {
    activeTab: 'about',
    activeFilter: 'all',
  };

  /* ===========================================
     Tab Navigation
     =========================================== */
  function switchTab(tabId) {
    els.navLinks.querySelectorAll('a').forEach((link) => {
      const isActive = link.dataset.tab === tabId;
      link.classList.toggle('active', isActive);
    });

    els.tabContents.forEach((el) => {
      el.classList.toggle('active', el.id === tabId);
    });

    state.activeTab = tabId;
    window.history.replaceState(null, '', `#${tabId}`);

    els.navLinks.classList.remove('open');
  }

  els.navLinks.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-tab]');
    if (!link) return;
    e.preventDefault();
    switchTab(link.dataset.tab);
  });

  /* Handle clicks on non-nav-link elements with data-tab (hero buttons, etc.) */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tab]:not(.nav-link)');
    if (!trigger) return;
    e.preventDefault();
    switchTab(trigger.dataset.tab);
  });

  /* ===========================================
     Mobile Nav Toggle
     =========================================== */
  els.navToggle.addEventListener('click', () => {
    els.navLinks.classList.toggle('open');
  });

  /* ===========================================
     Hero CTA -> Samples Tab
     =========================================== */
  if (els.heroCtaSamples) {
    els.heroCtaSamples.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('samples');
    });
  }

  /* ===========================================
     Project/Sample Category Filtering
     =========================================== */
  els.filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      els.filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeFilter = filter;

      els.projectCards.forEach((card) => {
        const categories = card.dataset.categories || '';
        const matches = filter === 'all' || categories.split(',').map(c => c.trim()).includes(filter);
        card.classList.toggle('hidden', !matches);
      });
    });
  });

  /* ===========================================
     Modal: Open (supports samples, services, products)
     =========================================== */
  function openModal(type, index) {
    let data;
    if (type === 'sample') data = projectData[index];
    else if (type === 'service') data = servicesData[index];
    else if (type === 'product') data = productsData[index];
    if (!data) return;

    let html = `<h3>${data.title}</h3>`;

    if (data.price) {
      html += `<div class="modal-price">${data.price}</div>`;
    }
    if (data.badge) {
      html += `<span class="modal-badge">${data.badge}</span>`;
    }

    data.sections.forEach((section) => {
      html += `<div class="modal-section"><h4>${section.heading}</h4>${section.body}</div>`;
    });

    // Show GitHub button for sample projects
    if (type === 'sample' && data.githubUrl) {
      html += `<div class="modal-footer">
        <a href="${data.githubUrl}" class="btn btn-primary" target="_blank" rel="noopener">View on GitHub →</a>
      </div>`;
    }

    els.modalContent.innerHTML = html;
    els.modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ===========================================
     Modal: Close
     =========================================== */
  function closeModal() {
    els.modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Click handler for all card types */
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-card-type]');
    if (!card) return;
    if (e.target.closest('a, button')) return;

    const type = card.dataset.cardType;
    const index = parseInt(card.dataset.cardIndex, 10);
    if (type && !isNaN(index)) {
      openModal(type, index);
    }
  });

  /* Also handle project cards with data-project-index (legacy) */
  els.projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button, [data-card-type]')) return;
      const index = parseInt(card.dataset.projectIndex, 10);
      if (!isNaN(index)) {
        openModal('sample', index);
      }
    });
  });

  els.modalClose.addEventListener('click', closeModal);

  els.modalOverlay.addEventListener('click', (e) => {
    if (e.target === els.modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  /* ===========================================
     Theme Toggle
     =========================================== */
  function getPreferredTheme() {
    const saved = localStorage.getItem('agenticph-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('agenticph-theme', theme);
  }

  applyTheme(getPreferredTheme());

  els.themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  /* ===========================================
     Init: Read URL hash for initial tab
     =========================================== */
  const validTabs = ['about', 'samples', 'services', 'products', 'contact'];
  const hash = window.location.hash.replace('#', '');
  if (validTabs.includes(hash)) {
    switchTab(hash);
  } else {
    switchTab('about');
  }

  /* ===========================================
     Handle direct URL hash changes (browser back/forward)
     =========================================== */
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    if (validTabs.includes(h)) {
      switchTab(h);
    }
  });
});
