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

  // Default to Home if there is no valid hash route yet.
  if (!window.location.hash || !routes[window.location.hash.replace("#", "").toLowerCase()]) {
    window.location.hash = "#home";
  } else {
    renderRoute();
  }

  // Modal elements
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

  // Show the event details field only when the speaker option is selected
  function updateEventDetailsVisibility() {
    if (!speakerRadio || !eventDetailsGroup) {
      return;
    }

    const shouldShow = speakerRadio.checked;
    eventDetailsGroup.hidden = !shouldShow;
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
});
