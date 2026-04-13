/**
 * Empower Ability Labs – Accessible SPA
 * 
 * Course: CST8914 – Accessible by Design
 * Assignment: Accessible SPA Project
 * 
 * Team Members:
 * - Bosi Chen
 * - Yiming He
 * - Xinyi Zhao
  - Sara Mirzaeipouynak
 * 
 * File Description:
 * This JavaScript file implements:
 * - SPA routing and navigation
 * - Accessible interactive components (Modal, Switch, Show/Hide)
 * - Form validation and user feedback
 * 
 * Accessibility:
 * The project follows WCAG 2.1 AA guidelines, including:
 * - Keyboard accessibility (Tab, Enter, Escape)
 * - Focus management for SPA navigation and modal dialogs
 * - Proper use of ARIA roles and attributes
 * - Accessible form validation and error handling
 * 
 * References:
 * WAI-ARIA Authoring Practices Guide (APG)
 * Modal Dialog Pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 * 
 * Switch Pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 * 
 * General Accessibility Guidance:
 * https://www.w3.org/WAI/standards-guidelines/wcag/
 */

function knowledgeRunner() {}

knowledgeRunner();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("button.navbar-toggler");
  const navList = document.getElementById("navbarsExampleDefault");
  const navLinks = Array.from(document.querySelectorAll(".nav-link[data-route]"));
  const views = Array.from(document.querySelectorAll(".spa-view"));
  // Route map ties each hash to its view, focus target, and unique page title.
  const routes = {
    home: {
      title: "Home - Empower Ability Labs",
      view: document.getElementById("home"),
      focusTarget: document.getElementById("homeHeading")
    },
    services: {
      title: "Services - Empower Ability Labs",
      view: document.getElementById("services"),
      focusTarget: document.getElementById("servicesHeading")
    },
    schedule: {
      title: "Schedule a Call - Empower Ability Labs",
      view: document.getElementById("schedule"),
      focusTarget: document.getElementById("scheduleHeading")
    }
  };

  // Read the current hash so Home, Services, and Schedule work like SPA pages.
  function getRouteFromHash() {
    const routeName = window.location.hash.replace("#", "").trim().toLowerCase();
    return routes[routeName] ? routeName : "home";
  }

  // Update aria-current so assistive tech knows which nav item is active.
  function setActiveNav(routeName) {
    navLinks.forEach((link) => {
      const isActive = link.dataset.route === routeName;
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Show only the selected SPA view and hide the others.
  function setActiveView(routeName) {
    views.forEach((view) => {
      const isActive = view.dataset.view === routeName;
      view.hidden = !isActive;
      view.setAttribute("aria-hidden", String(!isActive));
    });
  }

  // Move focus to the current view heading after navigation changes.
  function focusRouteHeading(routeName) {
    const route = routes[routeName];
    if (route && route.focusTarget) {
      route.focusTarget.focus();
    }
  }

  function closeMobileNav() {
    if (toggle && navList) {
      navList.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  // Render the current route by syncing the visible view, nav state, and title.
  function renderRoute(options = {}) {
    const { shouldFocus = false } = options;
    const routeName = getRouteFromHash();
    const route = routes[routeName];

    setActiveView(routeName);
    setActiveNav(routeName);
    document.title = route.title;

    if (shouldFocus) {
      focusRouteHeading(routeName);
    }
  }

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isExpanded = navList.classList.contains("show");
      navList.classList.toggle("show", !isExpanded);
      toggle.setAttribute("aria-expanded", String(!isExpanded));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Collapse the mobile menu after choosing a new SPA view.
      closeMobileNav();
    });
  });

  document.addEventListener("click", (event) => {
    if (!navList || !toggle) {
      return;
    }

    const clickedInsideNav = navList.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMobileNav();
    }
  });

  // Keep Back and Forward buttons synced with the correct SPA state.
  window.addEventListener("hashchange", () => {
    renderRoute({ shouldFocus: true });
  });

  // On the first load, normalize the URL to #home if needed,
  // but do not trigger heading focus. This keeps the first Tab in the navbar.
  if (!window.location.hash || !routes[window.location.hash.replace("#", "").toLowerCase()]) {
    history.replaceState(null, "", `${window.location.pathname}#home`);
  }

  renderRoute({ shouldFocus: false });

  // Modal elements
  // -------------------- XY.Z --------------------
  // Finds the button that opens the modal.
  const openCommunityModal = document.getElementById("openCommunityModal");
  // Finds the modal container and content elements.
  const communityModal = document.getElementById("communityModal");
  // Finds the actual dialog box inside the modal overlay.
  const communityModalContent = communityModal
    ? communityModal.querySelector(".custom-modal-content")
    : null;
  // Finds the button that closes the modal.
  const closeCommunityModal = document.getElementById("closeCommunityModal");
  // Track the element that was focused before opening the modal so we can return focus to it when the modal closes.
  let previouslyFocusedElement = null;

  // Helper function to get all focusable elements within a container for focus trapping.
  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  // Open the modal, prevent background scrolling, and move focus to the dialog content.
  function openModal() {
    if (!communityModal || !communityModalContent) {
      return;
    }

    // Store the currently focused element so we can restore focus to it when the modal closes.
    previouslyFocusedElement = document.activeElement;
    communityModal.hidden = false;
    document.body.style.overflow = "hidden";
    communityModalContent.focus();
  }

  // Close the modal, restore background scrolling, and return focus to the previously focused element.
  function closeModal() {
    if (!communityModal) {
      return;
    }

    // Hide the modal and allow the page to scroll again.
    communityModal.hidden = true;
    document.body.style.overflow = "";

    // Restore focus to the element that was focused before the modal opened, if it exists.
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // Add event listeners for opening and closing the modal, as well as handling clicks outside the modal content and keyboard navigation for accessibility.
  if (openCommunityModal) {
    openCommunityModal.addEventListener("click", openModal);
  }

  // Close the modal when the close button is clicked
  if (closeCommunityModal) {
    closeCommunityModal.addEventListener("click", closeModal);
  }

  // Close the modal when clicking outside the modal content or pressing the Escape key, and trap focus within the modal when it's open
  if (communityModal && communityModalContent) {
    communityModal.addEventListener("click", (event) => {
      if (event.target === communityModal) {
        closeModal();
      }
    });

    // Handle keyboard navigation for accessibility, including closing the modal with Escape and trapping focus within the modal when it's open
    communityModal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      // Trap focus within the modal when it's open by handling Tab and Shift+Tab key presses
      if (event.key === "Tab") {
        const focusableElements = getFocusableElements(communityModalContent);

        // If there are no focusable elements, prevent Tab from doing anything to avoid focus leaving the modal
        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        // Determine the first and last focusable elements in the modal content for focus trapping.
        const firstElement = focusableElements[0];
        // If there are multiple focusable elements and the last one will be used to loop back to the first when Shift+Tab is pressed on the first element
        const lastElement = focusableElements[focusableElements.length - 1];

        // If Shift+Tab is pressed while focus is on the first element, move focus to the last element. If Tab is pressed while focus is on the last element, move focus back to the first element
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Show or hide "Please tell us about your event"
  const speakerRadio = document.getElementById("gridRadios2");
  const topicRadios = document.querySelectorAll('input[name="gridRadios"]');
  const eventDetailsGroup = document.getElementById("eventDetailsGroup");
  const eventDetails = document.getElementById("eventDetails");

  // -------------------- S.M --------------------
  // Keep the conditional textarea visibility and accessibility state in sync.
  // -------------------- S.M --------------------
  // Show the event details field only when the speaker option is selected
  function updateEventDetailsVisibility() {
    if (!speakerRadio || !eventDetailsGroup) {
      return;
    }

    const shouldShow = speakerRadio.checked;
    eventDetailsGroup.hidden = !shouldShow;
    eventDetailsGroup.setAttribute("aria-hidden", String(!shouldShow));
    speakerRadio.setAttribute("aria-expanded", String(shouldShow));

    // -------------------- S.M --------------------
    // The textarea becomes required only when it is displayed.
    // -------------------- S.M --------------------
    if (eventDetails) {
      eventDetails.required = shouldShow;
    }
  }

  topicRadios.forEach((radio) => {
    radio.addEventListener("change", updateEventDetailsVisibility);
  });

  updateEventDetailsVisibility();

  // Finds the switch button and the visible On/Off text inside it
  const emailSwitch = document.getElementById("emailSwitch");
  const switchText = emailSwitch ? emailSwitch.querySelector(".switch-text") : null;

  	// checks switch exists
  function updateSwitchUI() {
    if (!emailSwitch || !switchText) {
      return;
    }
    // reads aria - checked	and	updates visible text to On or Off
    const isChecked = emailSwitch.getAttribute("aria-checked") === "true";
    switchText.textContent = isChecked ? "On" : "Off";
  }

  // Check swicth exists and get current state 
  function toggleEmailSwitch() {
    if (!emailSwitch) {
      return;
    }
    // updates visible UI test and aria - checked to reflect new state
    const isChecked = emailSwitch.getAttribute("aria-checked") === "true";
    emailSwitch.setAttribute("aria-checked", String(!isChecked));
    updateSwitchUI();
  }

  if (emailSwitch) {
    emailSwitch.addEventListener("click", toggleEmailSwitch);

    // Keyboard users can toggle it with Space and Enter 
    emailSwitch.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggleEmailSwitch();
      }
    });

    // Set the initial visible text on load page 
    updateSwitchUI();
  }

  // ====================    S.M   ====================
  // ================= FORM VALIDATION ================
  // ====================    S.M   ====================
  const form = document.getElementById("scheduleForm");
  const emailInput = document.getElementById("inputEmail");
  const phoneInput = document.getElementById("inputPhoneNumber");
  const radios = document.querySelectorAll('input[name="gridRadios"]');
  const errorNote = document.getElementById("errorNote");
  const thankYouNote = document.getElementById("thankYouNote");
  const errorMessage = document.getElementById("errorMessage");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const topicError = document.getElementById("topicError");
  const eventDetailsError = document.getElementById("eventDetailsError");

  // -------------------- S.M --------------------
  // Clear old validation state before each submit attempt.
  // -------------------- S.M --------------------
  function clearInlineError(input, messageElement) {
    if (input) {
      input.removeAttribute("aria-invalid");
    }

    if (messageElement) {
      messageElement.hidden = true;
      messageElement.textContent = "";
    }
  }

  // -------------------- S.M --------------------
  // Mark a field invalid and reveal the matching error text.
  // -------------------- S.M --------------------
  function showInlineError(input, messageElement, message) {
    if (input) {
      input.setAttribute("aria-invalid", "true");
    }

    if (messageElement) {
      messageElement.textContent = message;
      messageElement.hidden = false;
    }
  }

  // -------------------- S.M --------------------
  // Move keyboard focus to the first invalid field or group after validation fails.
  // -------------------- S.M --------------------
  function focusFirstErrorField() {
    const selectedRadio = document.querySelector('input[name="gridRadios"]:checked');

    if (emailInput && emailInput.getAttribute("aria-invalid") === "true") {
      emailInput.focus();
      return;
    }

    if (phoneInput && phoneInput.getAttribute("aria-invalid") === "true") {
      phoneInput.focus();
      return;
    }

    if (!selectedRadio && radios.length > 0) {
      radios[0].focus();
      return;
    }

    if (eventDetails && eventDetails.getAttribute("aria-invalid") === "true") {
      eventDetails.focus();
    }
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const errors = [];
      const selectedRadio = document.querySelector('input[name="gridRadios"]:checked');
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

      // -------------------- S.M --------------------
      // Reset notifications and inline errors before validating again.
      // -------------------- S.M --------------------
      if (errorNote) {
        errorNote.hidden = true;
      }
      if (thankYouNote) {
        thankYouNote.hidden = true;
      }
      if (errorMessage) {
        errorMessage.textContent = "Please fix the errors below.";
      }

      clearInlineError(emailInput, emailError);
      clearInlineError(phoneInput, phoneError);
      clearInlineError(eventDetails, eventDetailsError);

      if (topicError) {
        topicError.hidden = true;
        topicError.textContent = "";
      }

      radios.forEach((radio) => {
        radio.removeAttribute("aria-invalid");
      });

      // -------------------- S.M --------------------
      // Email is required and must be a valid email type.
      // -------------------- S.M --------------------
      if (emailInput && !emailInput.value.trim()) {
        errors.push("Email is required.");
        showInlineError(emailInput, emailError, "Email is required.");
      } else if (emailInput && !emailInput.checkValidity()) {
        errors.push("Enter a valid email address.");
        showInlineError(emailInput, emailError, "Enter a valid email address.");
      }

      // -------------------- S.M --------------------
      // Phone is optional, but if present it must match the expected pattern.
      // -------------------- S.M --------------------
      if (phoneInput && phoneInput.value.trim() && !phonePattern.test(phoneInput.value.trim())) {
        errors.push("Phone must be in format 613-123-1234.");
        showInlineError(phoneInput, phoneError, "Phone must be in format 613-123-1234.");
      }

      // -------------------- S.M --------------------
      // One topic must be selected.
      // -------------------- S.M --------------------
      if (!selectedRadio) {
        errors.push("Please select a topic.");
        radios.forEach((radio) => {
          radio.setAttribute("aria-invalid", "true");
        });

        if (topicError) {
          topicError.textContent = "Please select a topic.";
          topicError.hidden = false;
        }
      }

      // -------------------- S.M --------------------
      // Event details are required only for the speaker option.
      // -------------------- S.M --------------------
      if (selectedRadio && selectedRadio.id === "gridRadios2" && eventDetails && !eventDetails.value.trim()) {
        errors.push("Please describe your event.");
        showInlineError(eventDetails, eventDetailsError, "Please describe your event.");
      }

      // -------------------- S.M --------------------
      // Error summary is announced and keyboard focus moves to the first error.
      // -------------------- S.M --------------------
      if (errors.length > 0) {
        if (errorMessage) {
          errorMessage.textContent = errors.join(" ");
        }
        if (errorNote) {
          errorNote.hidden = false;
          // -------------------- S.M --------------------
          // Bring the error summary into view before moving focus to the first invalid field.
          // -------------------- S.M --------------------
          errorNote.scrollIntoView({ block: "nearest" });
        }
        setTimeout(() => {
          focusFirstErrorField();
        }, 0);
        return;
      }

      // -------------------- S.M --------------------
      // Success clears the form and announces the thank-you message.
      // -------------------- S.M --------------------
      form.reset();
      updateEventDetailsVisibility();

      if (emailSwitch) {
        emailSwitch.setAttribute("aria-checked", "false");
        updateSwitchUI();
      }

      if (thankYouNote) {
        thankYouNote.hidden = false;
        // -------------------- S.M --------------------
        // Bring the success message into view before moving focus to it.
        // -------------------- S.M --------------------
        thankYouNote.scrollIntoView({ block: "nearest" });
        setTimeout(() => {
          thankYouNote.focus();
        }, 0);
      }
    });
  }
});
