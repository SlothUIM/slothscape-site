/* SlothScape UI - Minimal dependency-free helpers */

(function() {
  'use strict';

  // Modal functionality
  function initModals() {
    // Handle modal open triggers
    document.addEventListener('click', function(e) {
      const opener = e.target.closest('[data-modal-open]');
      if (opener) {
        e.preventDefault();
        const modalId = opener.getAttribute('data-modal-open');
        const modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      }

      // Handle modal close triggers
      const closer = e.target.closest('[data-modal-close]');
      if (closer) {
        e.preventDefault();
        const modal = closer.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      }

      // Close modal when clicking backdrop
      if (e.target.classList.contains('modal')) {
        closeModal(e.target);
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          closeModal(openModal);
        }
      }
    });
  }

  function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    const focusable = modal.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
    if (focusable) {
      focusable.focus();
    }
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Collapse functionality
  function initCollapses() {
    document.addEventListener('click', function(e) {
      const toggle = e.target.closest('[data-toggle="collapse"]');
      if (toggle) {
        e.preventDefault();
        const targetId = toggle.getAttribute('data-target') || toggle.getAttribute('href');
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            toggleCollapse(target, toggle);
          }
        }
      }
    });
  }

  function toggleCollapse(target, toggle) {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Collapse
      target.style.height = target.scrollHeight + 'px';
      target.offsetHeight; // Force reflow
      target.style.height = '0';
      target.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // Expand
      target.style.height = target.scrollHeight + 'px';
      target.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
      
      // Clean up after transition
      setTimeout(() => {
        if (toggle.getAttribute('aria-expanded') === 'true') {
          target.style.height = '';
          target.style.overflow = '';
        }
      }, 300);
    }
  }

  // Utility function to check if element is visible
  function isVisible(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
  }

  // Simple smooth scroll for anchor links (optional enhancement)
  function initSmoothScroll() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="#"]');
      if (link && link.getAttribute('href') !== '#') {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initModals();
      initCollapses();
      initSmoothScroll();
    });
  } else {
    initModals();
    initCollapses();
    initSmoothScroll();
  }

  // Expose utilities globally if needed
  window.SlothUI = {
    openModal: openModal,
    closeModal: closeModal,
    toggleCollapse: toggleCollapse,
    isVisible: isVisible
  };

})();