// Lumière Dermatology - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Consultation Modal
  const modal = document.getElementById('consultModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtn = document.getElementById('closeModal');
  const consultForm = document.getElementById('consultForm');
  const concernSelect = document.getElementById('concernSelect');

  const openModal = (treatmentName = '') => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (concernSelect && treatmentName) {
      for (let i = 0; i < concernSelect.options.length; i++) {
        if (concernSelect.options[i].text.includes(treatmentName) || concernSelect.options[i].value.includes(treatmentName)) {
          concernSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const trt = btn.getAttribute('data-treatment') || '';
      openModal(trt);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">sync</span>
        Reserving Appointment...
      `;

      setTimeout(() => {
        consultForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(196, 142, 117, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #C48E75;">
              <span class="material-symbols-outlined" style="font-size: 36px;">task_alt</span>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: #2C2623; margin-bottom: 0.5rem;">Consultation Registered</h3>
            <p style="color: #7E726B; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Dr. Camille Laurent's clinical assistant will reach out within 2 hours to confirm your VISIA digital skin diagnostic time.
            </p>
            <button type="button" class="btn btn-rose" id="doneModalBtn" style="width: 100%; justify-content: center;">
              Return to Clinic
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('doneModalBtn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      }, 900);
    });
  }
});
