

  // Load Premium Fonts
  const link1 = document.createElement("link");
  link1.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap";
  link1.rel = "stylesheet";
  document.head.appendChild(link1);

  // Load GSAP
  const gsapScript = document.createElement("script");
  gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
  document.head.appendChild(gsapScript);

  // Global variables
  let currentIndex = 0;
  let totalItems = 0;
  let allTestsData = [];
  let filteredData = [];
  let isAnimating = false;

  // Premium UI/UX CSS with Glass Morphism & Optimized Animations
  const style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = `
  :root {
    --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-secondary: rgba(255, 255, 255, 0.1);
    --card-bg: rgba(255, 255, 255, 0.15);
    --card-hover: rgba(255, 255, 255, 0.25);
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #10b981;
    --accent: #f59e0b;
    --text-dark: #1f2937;
    --text-light: #ffffff;
    --text-muted: #6b7280;
    --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 8px 25px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.2);
    --border-radius: 20px;
    --border-radius-sm: 12px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Poppins', sans-serif;
    background: var(--bg-primary);
    min-height: 110vh;
    overflow-x: hidden;
  }

  #loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(10px);
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid var(--text-light);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  #loading-overlay p {
    color: var(--text-light);
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
    opacity: 0.9;
  }

  .main-container {
    padding: 40px 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
    color: var(--text-light);
  }

  .header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #ffffff, #e0e7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header p {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 400;
  }

  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px;
  }

  .search-input {
    width: 100%;
    padding: 16px 50px 16px 20px;
    font-size: 1rem;
    border: none;
    border-radius: var(--border-radius);
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    color: var(--text-light);
    placeholder-color: rgba(255, 255, 255, 0.7);
    outline: none;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .search-input:focus {
    background: var(--card-hover);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .search-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.2rem;
  }

  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius-sm);
    margin-top: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
    display: none;
  }

  .suggestion-item {
    padding: 12px 20px;
    color: var(--text-light);
    cursor: pointer;
    transition: var(--transition);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .suggestion-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .suggestion-item:last-child {
    border-bottom: none;
  }

  #carousel-container {
    position: relative;
    overflow: hidden;
    margin-bottom: 40px;
  }

  #carousel-wrapper {
    overflow: hidden;
    border-radius: var(--border-radius);
    backdrop-filter: blur(10px);
    background: var(--bg-secondary);
    padding: 20px;
  }

  #carousel-items {
    display: flex;
    gap: 24px;
    transition: none;
    will-change: transform;
  }

  .carousel-item {
    flex: 0 0 400px;
    max-width: 400px;
    min-height: 520px;
  }

  .test-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius);
    padding: 24px;
    text-align: center;
    transition: var(--transition);
    border: 1px solid rgba(255, 255, 255, 0.2);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .test-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
    opacity: 0;
    transition: var(--transition);
  }

  .test-card:hover {
    transform: translateY(-8px);
    background: var(--card-hover);
    box-shadow: var(--shadow-lg);
  }

  .test-card:hover::before {
    opacity: 1;
  }

  .test-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: var(--border-radius-sm);
    margin-bottom: 20px;
    transition: var(--transition);
  }

  .test-card:hover .test-image {
    transform: scale(1.05);
  }

  .test-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .test-category {
    display: inline-block;
    background: var(--primary);
    color: var(--text-light);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .test-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .test-price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .price-current {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-light);
  }

  .price-original {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: line-through;
  }

  .price-discount {
    background: var(--secondary);
    color: var(--text-light);
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .test-actions {
    display: flex;
    gap: 12px;
    margin-top: auto;
  }

  .btn {
    padding: 12px 20px;
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: var(--primary);
    color: var(--text-light);
    flex: 1;
  }

  .btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-light);
    border: 1px solid rgba(255, 255, 255, 0.3);
    flex: 1;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border: none;
    color: var(--text-light);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .carousel-nav:hover {
    background: var(--card-hover);
    transform: translateY(-50%) scale(1.1);
  }

  .carousel-nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  #prev-btn { left: -25px; }
  #next-btn { right: -25px; }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: var(--transition);
  }

  .dot.active {
    background: var(--text-light);
    transform: scale(1.2);
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
  }

  .modal.active {
    opacity: 1;
    visibility: visible;
  }

  .modal-content {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius);
    padding: 32px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    margin: 20px;
    position: relative;
    transform: translateY(50px);
    transition: var(--transition);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .modal.active .modal-content {
    transform: translateY(0);
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: var(--transition);
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .modal-title {
    color: var(--text-light);
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 24px;
    padding-right: 40px;
  }

  .test-parameters {
    display: grid;
    gap: 16px;
  }

  .test-full-description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.6;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 3px solid var(--primary);
    margin-bottom: 8px;
  }

  .parameter-group {
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-sm);
    padding: 16px;
  }

  .parameter-title {
    color: var(--text-light);
    font-weight: 600;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }

  .parameter-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 8px;
  }

  .parameter-item {
    color: rgba(255, 255, 255, 0.9);
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .no-results {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    padding: 60px 20px;
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .carousel-item { flex: 0 0 350px; max-width: 350px; }
  }

  @media (max-width: 768px) {
    .header h1 { font-size: 2.5rem; }
    .header p { font-size: 1.1rem; }
    .main-container { padding: 20px 16px; }
    .carousel-item { flex: 0 0 320px; max-width: 320px; min-height: 480px; }
    .test-card { padding: 20px; }
    .test-title { font-size: 1.2rem; }
    .price-current { font-size: 1.4rem; }
    .carousel-nav { width: 45px; height: 45px; font-size: 1rem; }
    #prev-btn { left: -22px; }
    #next-btn { right: -22px; }
    .modal-content { padding: 24px; margin: 16px; }
    .modal-title { font-size: 1.5rem; }
    .parameter-list { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .header h1 { font-size: 2rem; }
    .carousel-item { flex: 0 0 280px; max-width: 280px; min-height: 450px; }
    .test-card { padding: 16px; }
    .test-image { height: 150px; }
    .search-input { padding: 14px 45px 14px 16px; }
    .carousel-nav { display: none; }
    .parameter-item { font-size: 0.85rem; }
  }

  /* Animations */
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in {
    animation: slideIn 0.6s ease-out forwards;
  }

  /* Performance Optimizations */
  .carousel-item, .test-card {
    contain: layout style paint;
  }

  #carousel-items {
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  `;
  document.head.appendChild(style);

  // Create HTML Structure
  function createHTML() {
    const body = document.body;
    
    // Main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    
    // Header
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
      <h1>🩺 Premium Health Tests</h1>
      <p>Comprehensive health testing with advanced diagnostics</p>
    `;
    
    // Search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search tests (LFT, KFT, Thyroid, Lipid, etc.)';
    searchInput.id = 'search-input';
    
    const searchIcon = document.createElement('div');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '🔍';
    
    const searchSuggestions = document.createElement('div');
    searchSuggestions.className = 'search-suggestions';
    searchSuggestions.id = 'search-suggestions';
    
    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchSuggestions);
    searchContainer.appendChild(searchWrapper);
    
    // Carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.id = 'carousel-container';
    
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev-btn';
    prevBtn.className = 'carousel-nav';
    prevBtn.innerHTML = '‹';
    
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.className = 'carousel-nav';
    nextBtn.innerHTML = '›';
    
    const carouselWrapper = document.createElement('div');
    carouselWrapper.id = 'carousel-wrapper';
    
    const carouselItems = document.createElement('div');
    carouselItems.id = 'carousel-items';
    
    carouselWrapper.appendChild(carouselItems);
    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(carouselWrapper);
    carouselContainer.appendChild(nextBtn);
    
    // Carousel dots
    const carouselDots = document.createElement('div');
    carouselDots.className = 'carousel-dots';
    carouselDots.id = 'carousel-dots';
    
    // Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'test-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalClose = document.createElement('button');
    modalClose.className = 'modal-close';
    modalClose.innerHTML = '×';
    
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    modalTitle.id = 'modal-title';
    
    const testParameters = document.createElement('div');
    testParameters.className = 'test-parameters';
    testParameters.id = 'test-parameters';
    
    modalContent.appendChild(modalClose);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(testParameters);
    modal.appendChild(modalContent);
    
    // Append all to main container
    mainContainer.appendChild(header);
    mainContainer.appendChild(searchContainer);
    mainContainer.appendChild(carouselContainer);
    mainContainer.appendChild(carouselDots);
    
    // Append to body
    body.appendChild(mainContainer);
    body.appendChild(modal);
    
    return {
      carouselItems,
      searchInput,
      searchSuggestions,
      modal,
      modalTitle,
      testParameters,
      modalClose,
      prevBtn,
      nextBtn,
      carouselDots
    };
  }

  // Test data with specific parameters
  const testParameters = {
    'Liver Function Test': {
      category: 'LFT',
      parameters: [
        'Sodium', 'Total Protein', 'Albumin', 'Globulin', 
        'Albumin Globulin A/G Ratio', 'Total Bilirubin', 
        'Direct Bilirubin', 'Indirect Bilirubin', 'SGOT (AST)', 
        'SGPT (ALT)', 'Alkaline Phosphatase', 'Gamma GT'
      ]
    },
    'Kidney Function Test': {
      category: 'KFT', 
      parameters: [
        'Uric Acid', 'Creatinine', 'BUN Creatinine Ratio',
        'Blood Urea', 'Blood Urea Nitrogen', 'Sodium',
        'Chloride', 'Calcium', 'Phosphorus', 'Albumin'
      ]
    },
    'Lipid Profile': {
      category: 'Lipid',
      parameters: [
        'Total Cholesterol', 'LDL Cholesterol', 'HDL Cholesterol',
        'VLDL Cholesterol', 'Triglycerides', 'HDL/LDL Ratio',
        'Total Cholesterol/HDL Ratio', 'LDL/HDL Ratio'
      ]
    },
    'Thyroid Function Test': {
      category: 'Thyroid',
      parameters: [
        'T3 (Triiodothyronine)', 'T4 (Thyroxine)', 'TSH (Thyroid Stimulating Hormone)',
        'Free T3', 'Free T4', 'Reverse T3', 'Thyroglobulin Antibody',
        'TPO Antibody'
      ]
    },
    'Complete Blood Count': {
      category: 'CBC',
      parameters: [
        'Hemoglobin', 'Red Blood Cell Count', 'White Blood Cell Count',
        'Platelet Count', 'Hematocrit', 'MCV', 'MCH', 'MCHC',
        'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils'
      ]
    },
    'Diabetes Profile': {
      category: 'Diabetes',
      parameters: [
        'Fasting Glucose', 'Post Prandial Glucose', 'HbA1c',
        'Insulin Fasting', 'Insulin Post Meal', 'C-Peptide',
        'Microalbumin', 'Fructosamine'
      ]
    }
  };

  // Search functionality
  const searchTerms = {
    'lft': 'Liver Function Test',
    'liver': 'Liver Function Test', 
    'kft': 'Kidney Function Test',
    'kidney': 'Kidney Function Test',
    'lipid': 'Lipid Profile',
    'cholesterol': 'Lipid Profile',
    'thyroid': 'Thyroid Function Test',
    'tsh': 'Thyroid Function Test',
    't3': 'Thyroid Function Test',
    't4': 'Thyroid Function Test',
    'cbc': 'Complete Blood Count',
    'blood count': 'Complete Blood Count',
    'hemoglobin': 'Complete Blood Count',
    'diabetes': 'Diabetes Profile',
    'sugar': 'Diabetes Profile',
    'glucose': 'Diabetes Profile',
    'hba1c': 'Diabetes Profile'
  };


  // Initialize app
  function initApp() {
    const elements = createHTML();
    setupEventListeners(elements);
    hideLoadingScreen();
    fetchCarouselData(elements);
  }

  // Hide loading screen with animation
  function hideLoadingScreen() {
    setTimeout(() => {
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        gsap.to(loadingOverlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => loadingOverlay.remove()
        });
      }
    }, 1500);
  }

  // Create test card HTML
  function createTestCard(test) {
    const testInfo = testParameters[test.title] || { category: 'Test', parameters: [] };
    
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.innerHTML = `
      <div class="test-card animate-in">
        <img src="${test.image}" alt="${test.title}" class="test-image" loading="lazy">
        <h3 class="test-title">${test.title}</h3>
        <span class="test-category">${testInfo.category}</span>
        <p class="test-description">${test.description}</p>
        <div class="test-price">
          <span class="price-current">₹${test.discountedPrice}</span>
          <span class="price-original">₹${test.originalPrice}</span>
          <span class="price-discount">${test.discount}% OFF</span>
        </div>
        <div class="test-actions">
          <button class="btn btn-primary" onclick="bookTest('${test.title}')">
            📅 Book Now
          </button>
          <button class="btn btn-secondary" onclick="showTestDetails('${test.title}')">
            📝 Details
          </button>
        </div>
      </div>
    `;
    return div;
  }

  // Show test details in modal
  function showTestDetails(testTitle) {
    const testInfo = testParameters[testTitle];
    const modal = document.getElementById('test-modal');
    const modalTitle = document.getElementById('modal-title');
    const testParametersEl = document.getElementById('test-parameters');
    
    // Find the complete test data
    const testData = allTestsData.find(test => test.title === testTitle);
    const fullDescription = testData ? testData.description : 'Complete health screening test with comprehensive analysis.';
    
    if (!testInfo) {
      modalTitle.textContent = testTitle;
      testParametersEl.innerHTML = `
        <div class="parameter-group">
          <div class="parameter-title">Complete Description</div>
          <div class="test-full-description">${fullDescription}</div>
        </div>
        <div class="parameter-group">
          <div class="parameter-title">Test Parameters</div>
          <div class="parameter-list">
            <div class="parameter-item">Sodium</div>
            <div class="parameter-item">Total Protein</div>
            <div class="parameter-item">Uric Acid</div>
            <div class="parameter-item">Creatinine</div>
            <div class="parameter-item">Albumin</div>
            <div class="parameter-item">Albumin Globulin A/G Ratio</div>
            <div class="parameter-item">BUN Creatinine Ratio</div>
            <div class="parameter-item">Blood Urea</div>
            <div class="parameter-item">Blood Urea Nitrogen</div>
            <div class="parameter-item">Calcium</div>
            <div class="parameter-item">Chloride</div>
            <div class="parameter-item">Globulin</div>
          </div>
        </div>
      `;
    } else {
      modalTitle.textContent = testTitle;
      testParametersEl.innerHTML = `
        <div class="parameter-group">
          <div class="parameter-title">Complete Description</div>
          <div class="test-full-description">${fullDescription}</div>
        </div>
        <div class="parameter-group">
          <div class="parameter-title">${testInfo.category} Parameters</div>
          <div class="parameter-list">
            ${testInfo.parameters.map(param => 
              `<div class="parameter-item">${param}</div>`
            ).join('')}
          </div>
        </div>
        <div class="parameter-group">
          <div class="parameter-title">Additional Information</div>
          <div class="test-full-description">
            This comprehensive ${testInfo.category} test includes detailed analysis of all key markers. 
            Results are typically available within 24-48 hours. Our advanced laboratory equipment ensures 
            accurate and reliable results for better health monitoring and diagnosis.
          </div>
        </div>
      `;
    }
    
    modal.classList.add('active');
    gsap.fromTo(modal.querySelector('.modal-content'), 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  }

  // Book test function
  function bookTest(testTitle) {
    alert(`🎉 Booking ${testTitle}...\n\nYou will be redirected to the booking page.`);
  }

  // Update carousel with smooth GSAP animation
  function updateCarousel(elements) {
    if (isAnimating || !elements.carouselItems.children.length) return;
    
    isAnimating = true;
    const itemWidth = elements.carouselItems.children[0]?.offsetWidth || 400;
    const gap = 24;
    const translateX = -currentIndex * (itemWidth + gap);
    
    gsap.to(elements.carouselItems, {
      x: translateX,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        isAnimating = false;
        animateVisibleCards();
      }
    });
    
    updateDots(elements);
    updateNavButtons(elements);
  }

  // Animate visible cards
  function animateVisibleCards() {
    const cards = document.querySelectorAll('.test-card');
    const containerWidth = document.getElementById('carousel-wrapper')?.offsetWidth || window.innerWidth;
    const itemWidth = 400;
    const itemsPerView = Math.floor(containerWidth / itemWidth);
    
    cards.forEach((card, index) => {
      const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;
      
      if (isVisible) {
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          delay: (index - currentIndex) * 0.1,
          ease: 'power2.out'
        });
      }
    });
  }

  // Navigate to next slide
  function nextSlide(elements) {
    if (isAnimating || !filteredData.length) return;
    
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, filteredData.length - itemsPerView);
    
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to start
    }
    
    updateCarousel(elements);
  }

  // Navigate to previous slide  
  function prevSlide(elements) {
    if (isAnimating || !filteredData.length) return;
    
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, filteredData.length - itemsPerView);
    
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex; // Loop to end
    }
    
    updateCarousel(elements);
  }

  // Get items per view based on screen size
  function getItemsPerView() {
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  // Update navigation buttons state
  function updateNavButtons(elements) {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, filteredData.length - itemsPerView);
    
    // Always enable buttons for infinite scroll effect
    elements.prevBtn.disabled = false;
    elements.nextBtn.disabled = false;
    
    // Add visual feedback
    elements.prevBtn.style.opacity = filteredData.length > itemsPerView ? '1' : '0.5';
    elements.nextBtn.style.opacity = filteredData.length > itemsPerView ? '1' : '0.5';
  }

  // Update carousel dots
  function updateDots(elements) {
    const dotsContainer = elements.carouselDots;
    const maxIndex = Math.max(0, filteredData.length - getItemsPerView());
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.className = `dot ${i === currentIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        if (!isAnimating) {
          currentIndex = i;
          updateCarousel(elements);
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Search functionality
  function performSearch(query, elements) {
    const searchQuery = query.toLowerCase().trim();
    
    if (!searchQuery) {
      filteredData = [...allTestsData];
      currentIndex = 0;
      renderCarousel(elements);
      return;
    }
    
    // Search in test titles and search terms
    filteredData = allTestsData.filter(test => {
      const titleMatch = test.title.toLowerCase().includes(searchQuery);
      const termMatch = Object.keys(searchTerms).some(term => 
        term.includes(searchQuery) && 
        searchTerms[term].toLowerCase() === test.title.toLowerCase()
      );
      const descMatch = test.description.toLowerCase().includes(searchQuery);
      
      return titleMatch || termMatch || descMatch;
    });
    
    currentIndex = 0;
    renderCarousel(elements);
  }

  // Show search suggestions
  function showSearchSuggestions(query, elements) {
    const suggestions = elements.searchSuggestions;
    
    if (!query.trim()) {
      suggestions.style.display = 'none';
      return;
    }
    
    const matches = Object.keys(searchTerms)
      .filter(term => term.includes(query.toLowerCase()))
      .slice(0, 5);
    
    if (matches.length > 0) {
      suggestions.innerHTML = matches.map(term => 
        `<div class="suggestion-item" onclick="selectSuggestion('${searchTerms[term]}')">
          ${searchTerms[term]} (${term.toUpperCase()})
        </div>`
      ).join('');
      suggestions.style.display = 'block';
    } else {
      suggestions.style.display = 'none';
    }
  }

  // Select search suggestion
  function selectSuggestion(testName) {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');
    
    searchInput.value = testName;
    suggestions.style.display = 'none';
    
    const elements = {
      carouselItems: document.getElementById('carousel-items'),
      carouselDots: document.getElementById('carousel-dots'),
      prevBtn: document.getElementById('prev-btn'),
      nextBtn: document.getElementById('next-btn')
    };
    
    performSearch(testName, elements);
  }

  // Render carousel with filtered data
  function renderCarousel(elements) {
    elements.carouselItems.innerHTML = '';
    
    if (filteredData.length === 0) {
      elements.carouselItems.innerHTML = `
        <div class="no-results">
          <h3>🔍 No tests found</h3>
          <p>Try searching for LFT, KFT, Thyroid, Lipid, or CBC</p>
        </div>
      `;
      elements.carouselDots.innerHTML = '';
      return;
    }
    
    filteredData.forEach(test => {
      elements.carouselItems.appendChild(createTestCard(test));
    });
    
    totalItems = filteredData.length;
    updateCarousel(elements);
    
    // Animate cards entrance
    gsap.fromTo('.test-card', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }


  // Setup event listeners
  function setupEventListeners(elements) {
    // Navigation buttons with improved handling
    elements.prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Previous button clicked');
      prevSlide(elements);
    });
    
    elements.nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next button clicked');
      nextSlide(elements);
    });
    
    // Search functionality
    elements.searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      performSearch(query, elements);
      showSearchSuggestions(query, elements);
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!elements.searchInput.contains(e.target) && !elements.searchSuggestions.contains(e.target)) {
        elements.searchSuggestions.style.display = 'none';
      }
    });
    
    // Modal close functionality
    elements.modalClose.addEventListener('click', () => {
      elements.modal.classList.remove('active');
    });
    
    elements.modal.addEventListener('click', (e) => {
      if (e.target === elements.modal) {
        elements.modal.classList.remove('active');
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        elements.modal.classList.remove('active');
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide(elements);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide(elements);
      }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    elements.carouselItems.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    
    elements.carouselItems.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe(elements);
    }, { passive: true });
    
    function handleSwipe(elements) {
      const threshold = 50;
      const diff = startX - endX;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide(elements);
        } else {
          prevSlide(elements);
        }
      }
    }
    
    // Responsive handling
    window.addEventListener('resize', debounce(() => {
      updateCarousel(elements);
    }, 250));
  }

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Fetch carousel data from API
  async function fetchCarouselData(elements) {
    try {
      const response = await fetch('https://crubapi.vercel.app/api/tests');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process and enhance the data
      allTestsData = data.map(test => ({
        ...test,
        // Ensure all required fields exist
        title: test.title || 'Health Test',
        description: test.description || 'Comprehensive health screening test',
        image: test.image || 'https://via.placeholder.com/300x200?text=Health+Test',
        discountedPrice: test.discountedPrice || '999',
        originalPrice: test.originalPrice || '1499',
        discount: test.discount || '33',
        reportTime: test.reportTime || '24 Hours'
      }));
      
      filteredData = [...allTestsData];
      totalItems = allTestsData.length;
      currentIndex = 0;
      
      renderCarousel(elements);
      
      console.log(`✅ Loaded ${allTestsData.length} tests successfully`);
      
    } catch (error) {
      console.error('❌ Error fetching test data:', error);
      
      // Fallback data with proper test parameters
      allTestsData = [
        {
          id: 1,
          title: 'Liver Function Test',
          description: 'Comprehensive liver health assessment including enzymes, proteins, and bilirubin levels. This test evaluates liver damage, liver diseases, and monitors liver function. It includes measurements of ALT, AST, alkaline phosphatase, albumin, total protein, and bilirubin levels. Essential for detecting hepatitis, cirrhosis, fatty liver disease, and other liver conditions. Results help doctors assess liver health and determine appropriate treatment plans.',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
          discountedPrice: '799',
          originalPrice: '1299',
          discount: '38',
          reportTime: '24 Hours'
        },
        {
          id: 2,
          title: 'Kidney Function Test',
          description: 'Complete kidney health evaluation with creatinine, urea, and electrolyte analysis. This comprehensive test assesses how well your kidneys filter waste from blood. Includes serum creatinine, blood urea nitrogen (BUN), uric acid, sodium, potassium, chloride, and calcium measurements. Helps detect chronic kidney disease, acute kidney injury, and monitors kidney function in diabetic patients.',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
          discountedPrice: '699',
          originalPrice: '1199',
          discount: '42',
          reportTime: '24 Hours'
        },
        {
          id: 3,
          title: 'Thyroid Function Test',
          description: 'Thyroid hormone levels assessment including T3, T4, and TSH measurements. This test evaluates thyroid gland function and detects thyroid disorders. Measures Free T3, Free T4, TSH, and thyroid antibodies. Essential for diagnosing hyperthyroidism, hypothyroidism, Hashimoto\'s disease, and Graves\' disease. Helps monitor thyroid medication effectiveness and overall thyroid health.',
          image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
          discountedPrice: '899',
          originalPrice: '1499',
          discount: '40',
          reportTime: '48 Hours'
        },
        {
          id: 4,
          title: 'Lipid Profile',
          description: 'Cholesterol and triglycerides analysis for comprehensive heart health assessment. This test measures total cholesterol, LDL (bad) cholesterol, HDL (good) cholesterol, VLDL cholesterol, and triglycerides. Essential for evaluating cardiovascular disease risk, monitoring cholesterol-lowering medication effectiveness, and developing heart-healthy lifestyle plans.',
          image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
          discountedPrice: '599',
          originalPrice: '999',
          discount: '40',
          reportTime: '24 Hours'
        },
        {
          id: 5,
          title: 'Complete Blood Count',
          description: 'Comprehensive blood analysis including red blood cells, white blood cells, platelets, and hemoglobin measurements. This test evaluates overall health and detects blood disorders, infections, anemia, and leukemia. Includes detailed analysis of blood cell types, sizes, and concentrations. Essential for routine health checkups and monitoring various medical conditions.',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
          discountedPrice: '499',
          originalPrice: '799',
          discount: '38',
          reportTime: '12 Hours'
        },
        {
          id: 6,
          title: 'Diabetes Profile',
          description: 'Blood sugar levels and comprehensive diabetes screening tests including fasting glucose, post-meal glucose, and HbA1c measurements. This test evaluates diabetes risk, monitors blood sugar control, and assesses long-term glucose management. Essential for diabetes diagnosis, pre-diabetes detection, and ongoing diabetes management and treatment monitoring.',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
          discountedPrice: '649',
          originalPrice: '1099',
          discount: '41',
          reportTime: '24 Hours'
        }
      ];
      
      filteredData = [...allTestsData];
      totalItems = allTestsData.length;
      currentIndex = 0;
      
      renderCarousel(elements);
      
      console.log('📋 Using fallback test data');
    }
  }

  // Make functions global for inline event handlers
  window.showTestDetails = showTestDetails;
  window.bookTest = bookTest;
  window.selectSuggestion = selectSuggestion;

  // Initialize the app when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Wait for GSAP to load
  gsapScript.onload = () => {
    console.log('✅ GSAP loaded successfully');
  };

  // Auto-refresh data every 5 minutes (reduced from 10 seconds for better performance)
  setInterval(() => {
    if (document.getElementById('carousel-items')) {
      const elements = {
        carouselItems: document.getElementById('carousel-items'),
        searchInput: document.getElementById('search-input'),
        searchSuggestions: document.getElementById('search-suggestions'),
        modal: document.getElementById('test-modal'),
        modalTitle: document.getElementById('modal-title'),
        testParameters: document.getElementById('test-parameters'),
        modalClose: document.querySelector('.modal-close'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        carouselDots: document.getElementById('carousel-dots')
      };
      
      fetchCarouselData(elements);
    }
  }, 300000); // 5 minutes

  console.log('🚀 Premium Health Test Carousel Initialized');
  console.log('✨ Features: Search, Modal Details, Responsive Design, Smooth Animations');
  console.log('📱 Mobile Optimized with Touch Support');
