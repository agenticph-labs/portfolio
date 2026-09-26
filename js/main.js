/**
 * Agentic PH — Portfolio JS v2d
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
      title: 'Project Scope Engine &lt; Client Intake Automation',
      accentClass: 'automation-accent',
      statusClass: 'status-deployed',
      statusLabel: 'Deployed',
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
      title: 'Market Analyzer &lt; PH Market Intelligence',
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
      title: 'Bid Intelligence Suite &lt; RFP Analyzer',
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
      originalName: 'Customer Feedback Intel',
      title: 'Sentiment Compass &lt; Customer Feedback Intel',
      accentClass: 'ai-accent',
      statusClass: 'status-demo',
      statusLabel: 'Demo-ready',
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
      originalName: 'Competitive Intel',
      title: 'Competitive Radar &lt; Competitive Intel',
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
      title: 'Market Entry Compass &lt; Research Decision System',
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
      title: 'Product Research &amp; Market Analysis',
      price: '$35–$65',
      type: 'Fixed-price project',
      sections: [
        {
          heading: 'Description',
          body: '<p>In-depth market sizing, competitor landscaping, and demand analysis for Philippine market entry and product strategy. Delivers actionable insights backed by data.</p>'
        },
        {
          heading: "What's Included",
          body: '<ul><li>Market sizing (TAM, SAM, SOM) and growth projections</li><li>Competitive landscape analysis with positioning maps</li><li>Customer segment profiling and demand estimation</li><li>Structured research report with data visualizations</li><li>One revision cycle included</li></ul>'
        },
        {
          heading: 'Timeline',
          body: '<p>1–2 weeks depending on scope. Delivered as PDF report plus editable spreadsheet models.</p>'
        }
      ]
    },
    {
      title: 'Data Extraction &amp; Processing',
      price: '$35–$80',
      type: 'Fixed-price project',
      sections: [
        {
          heading: 'Description',
          body: '<p>Clean, transform, and structure data from PDFs, websites, spreadsheets, and APIs into analysis-ready formats. One-time or recurring data pipelines.</p>'
        },
        {
          heading: "What's Included",
          body: '<ul><li>Custom data extraction scripts (Python)</li><li>Data cleaning, validation, and normalization</li><li>Structured output (CSV, JSON, Excel, or database)</li><li>Documentation and handover</li><li>Basic quality assurance report</li></ul>'
        },
        {
          heading: 'Timeline',
          body: '<p>3–10 days depending on data complexity and volume.</p>'
        }
      ]
    },
    {
      title: 'AI Workflow Automation Setup',
      price: '$75–$200',
      type: 'Fixed-price project',
      sections: [
        {
          heading: 'Description',
          body: '<p>End-to-end automated pipelines for document processing, data extraction, and reporting using LLMs and n8n/Make. From intake to structured output — no manual steps.</p>'
        },
        {
          heading: "What's Included",
          body: '<ul><li>Custom pipeline design and development</li><li>LLM integration (GPT-4, Claude, or DeepSeek)</li><li>n8n/Make workflow configuration</li><li>Automated reporting and export</li><li>30-day support and maintenance</li></ul>'
        },
        {
          heading: 'Timeline',
          body: '<p>2–4 weeks depending on complexity.</p>'
        }
      ]
    },
    {
      title: 'AI Orchestrator Retainer',
      price: '$2,000–$5,000/mo',
      type: 'Monthly retainer',
      sections: [
        {
          heading: 'Description',
          body: '<p>Ongoing AI strategy, custom tool development, workflow maintenance, and priority support for your business systems. A dedicated AI partner for your organization.</p>'
        },
        {
          heading: "What's Included",
          body: '<ul><li>Weekly strategy calls and roadmap updates</li><li>Custom AI tool development and deployment</li><li>Workflow maintenance and optimization</li><li>Priority support (48-hour response)</li><li>Monthly performance review and reporting</li></ul>'
        },
        {
          heading: 'Ideal For',
          body: '<p>Businesses with ongoing AI, automation, or data intelligence needs who want a dedicated partner rather than one-off projects.</p>'
        }
      ]
    }
  ];

  /* ===========================================
     Products Data (for modals)
     =========================================== */
  const productsData = [
    {
      title: 'AI Workflow Prompt Kit',
      price: '$7',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>50+ prompts for business automation — content generation, analysis, summarization, and decision support. Compatible with GPT-4, Claude, and DeepSeek.</p>'
        },
        {
          heading: 'Contents',
          body: '<ul><li>50+ ready-to-use AI prompts across 10 categories</li><li>Prompt engineering best practices guide</li><li>Use-case mapping template</li><li>Prompt customization worksheet</li></ul>'
        },
        {
          heading: 'Format',
          body: '<p>Digital download. PDF and Markdown formats.</p>'
        }
      ]
    },
    {
      title: 'No-Code Automation Templates (5-Pack)',
      price: '$19',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Ready-to-import n8n workflows for common business processes — lead capture, invoice processing, email triage, and more. Import and customize in minutes.</p>'
        },
        {
          heading: 'Contents',
          body: '<ul><li>5 ready-to-import n8n workflow JSON files</li><li>Setup guide and configuration checklist</li><li>Webhook integration templates</li><li>Error handling and notification setup</li></ul>'
        },
        {
          heading: 'Requirements',
          body: '<p>Requires a self-hosted or cloud n8n instance. Works with n8n v1.0+. Each workflow includes detailed setup instructions.</p>'
        }
      ]
    },
    {
      title: 'Presentation Deck Templates',
      price: '$9 / $19',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Professional slide decks for client pitches, investor updates, and boardroom presentations. $9 basic pack / $19 premium pack with animations and custom graphics.</p>'
        },
        {
          heading: 'Contents (Basic — $9)',
          body: '<ul><li>10 slide templates (Google Slides + PowerPoint)</li><li>Cover, agenda, content, data, and closing slides</li><li>Brand color guide included</li></ul>'
        },
        {
          heading: 'Contents (Premium — $19)',
          body: '<ul><li>All basic templates plus 15 additional slides</li><li>Animated transitions and custom graphics</li><li>Data visualization slide templates</li><li>Icon library and illustration assets</li></ul>'
        }
      ]
    },
    {
      title: 'Portfolio Case Study System',
      price: 'Free / $7',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Case study templates for consultants and agencies. Free (basic) / $7 (pro with frameworks and design assets).</p>'
        },
        {
          heading: 'Contents (Free)',
          body: '<ul><li>Basic case study template (PDF)</li><li>Structure guide with examples</li></ul>'
        },
        {
          heading: 'Contents (Pro — $7)',
          body: '<ul><li>All free content plus 5 case study frameworks</li><li>Design assets for social media promotion</li><li>Client testimonial collection templates</li><li>Metrics dashboard template</li></ul>'
        }
      ]
    },
    {
      title: 'Research Report System',
      price: '$9 / $19 / $24',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Research frameworks and report templates. $9 (basic) / $19 (pro) / $24 (enterprise with data pipelines). Ideal for market researchers and consultants.</p>'
        },
        {
          heading: 'Contents (Basic — $9)',
          body: '<ul><li>Research framework templates (PDF)</li><li>Report structure guides</li><li>Data collection worksheets</li></ul>'
        },
        {
          heading: 'Contents (Pro — $19)',
          body: '<ul><li>All basic content plus 5 advanced frameworks</li><li>Data analysis templates (Excel + Python)</li><li>Visualization templates</li><li>Presentation slide deck</li></ul>'
        },
        {
          heading: 'Contents (Enterprise — $24)',
          body: '<ul><li>All pro content plus data pipeline scripts (Python)</li><li>Automated report generation setup</li><li>API integration templates</li><li>Priority email support</li></ul>'
        }
      ]
    },
    {
      title: 'AI Chatbot Blueprint',
      price: '$9 / $14',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Build custom chatbots for customer support, lead qualification, and internal knowledge bases. $9 (basic) / $14 (pro with advanced features).</p>'
        },
        {
          heading: 'Contents (Basic — $9)',
          body: '<ul><li>Chatbot architecture blueprint (PDF)</li><li>Prompt templates for 5 use cases</li><li>Integration guide (Telegram, Slack, Web)</li></ul>'
        },
        {
          heading: 'Contents (Pro — $14)',
          body: '<ul><li>All basic content plus Python implementation scripts</li><li>Memory and context management setup</li><li>Analytics and logging framework</li><li>Deployment guide for Streamlit Cloud</li></ul>'
        }
      ]
    },
    {
      title: 'Workflow Audit Checklist',
      price: 'Free / $5',
      badge: 'Available on Gumroad',
      sections: [
        {
          heading: 'Description',
          body: '<p>Business process audit toolkit. Free (basic checklist) / $5 (full audit workbook with scoring and recommendations).</p>'
        },
        {
          heading: 'Contents (Free)',
          body: '<ul><li>Basic workflow assessment checklist (PDF)</li><li>Process mapping guide</li></ul>'
        },
        {
          heading: 'Contents (Pro — $5)',
          body: '<ul><li>All free content plus full audit workbook (Excel)</li><li>Scoring framework with weighted criteria</li><li>Recommendation engine template</li><li>Priority matrix and action plan template</li><li>Automation opportunity calculator</li></ul>'
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
    els.navLinks.querySelectorAll('[data-tab]').forEach((link) => {
      const isActive = link.dataset.tab === tabId;
      link.classList.toggle('active', isActive);
      if (link.getAttribute('role') === 'tab') {
        link.setAttribute('aria-selected', isActive ? 'true' : 'false');
      }
    });

    els.tabContents.forEach((el) => {
      el.classList.toggle('active', el.id === tabId);
    });

    state.activeTab = tabId;
    window.history.replaceState(null, '', `#${tabId}`);

    els.navLinks.classList.remove('open');
  }

  /* Handle clicks on data-tab elements in nav */
  els.navLinks.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tab]');
    if (!trigger) return;
    const tabId = trigger.dataset.tab;
    if (tabId) {
      switchTab(tabId);
    }
  });

  /* Handle clicks on data-tab elements outside nav (hero buttons, etc.) */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tab]');
    if (!trigger) return;
    if (els.navLinks.contains(trigger)) return; // handled above
    const tabId = trigger.dataset.tab;
    if (tabId) {
      switchTab(tabId);
    }
  });

  /* ===========================================
     Mobile Nav Toggle
     =========================================== */
  els.navToggle.addEventListener('click', () => {
    els.navLinks.classList.toggle('open');
  });

  /* ===========================================
     Project/Sample Category Filtering
     =========================================== */
  els.filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      els.filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
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
        <button class="btn btn-primary" onclick="window.open('${data.githubUrl}','_blank')">View on GitHub →</button>
      </div>`;
    }

    els.modalContent.innerHTML = html;
    els.modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* Expose openModal globally for potential onclick usage */
  window.openModal = openModal;

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
    if (e.target.closest('button, .contact-action')) return;

    const type = card.dataset.cardType;
    const index = parseInt(card.dataset.cardIndex, 10);
    if (type && !isNaN(index)) {
      openModal(type, index);
    }
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
     Keyboard: Enter/Space on interactive elements
     =========================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target.closest('[data-card-type], [data-tab], .nav-link');
      if (target && !e.target.closest('button, textarea, input')) {
        e.preventDefault();
        target.click();
      }
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
