/**
 * Wildlife.js
 * Handles toggle button behaviour:
 *   - If the video is hidden  → show it and play it
 *   - If the video is playing → pause and hide it
 *   - Updates button label and ARIA attributes to reflect current state
 */

(function () {
  "use strict";

  /* --- DOM references --- */
  const toggleBtn    = document.getElementById("toggleBtn");
  const btnIcon      = document.getElementById("btnIcon");
  const btnText      = document.getElementById("btnText");
  const statusLabel  = document.getElementById("statusLabel");
  const video        = document.getElementById("wildlifeVideo");
  const videoWrapper = document.getElementById("videoWrapper");

  /**
   * updateUI
   * Syncs the button label, icon, ARIA attributes, and status text
   * with the video's current visibility / playback state.
   */
  function updateUI() {
    const isHidden = videoWrapper.hidden;  // true when video is not visible

    if (isHidden) {
      // Video is currently hidden → button will show + play
      btnIcon.textContent           = "▶";
      btnText.textContent           = "Play Video";
      toggleBtn.setAttribute("aria-label", "Show and play the wildlife video");
      toggleBtn.setAttribute("aria-pressed", "false");
      statusLabel.textContent       = "Video is hidden";
    } else {
      // Video is visible → button will pause + hide
      btnIcon.textContent           = "⏸";
      btnText.textContent           = "Hide Video";
      toggleBtn.setAttribute("aria-label", "Pause and hide the wildlife video");
      toggleBtn.setAttribute("aria-pressed", "true");
      statusLabel.textContent       = video.paused ? "Video is visible (paused)" : "Video is playing";
    }
  }

  /**
   * handleToggle
   * Called on button click.
   *   - Hidden  → reveal wrapper, start playback
   *   - Visible → pause playback, hide wrapper
   */
  function handleToggle() {
    if (videoWrapper.hidden) {
      // Show the video first, then attempt to play
      videoWrapper.hidden = false;
      video.play().catch(function (err) {
        // Autoplay may be blocked by the browser – silently handle
        console.warn("Autoplay prevented:", err);
      });
    } else {
      // Pause if playing, then hide
      if (!video.paused) {
        video.pause();
      }
      videoWrapper.hidden = true;
    }

    updateUI();
  }

  /* --- Event listeners --- */

  // Button click
  toggleBtn.addEventListener("click", handleToggle);

  // Keep status label in sync if user interacts directly with native controls
  video.addEventListener("play",  updateUI);
  video.addEventListener("pause", updateUI);

  /* --- Initialise UI to match the default DOM state ---
     The video wrapper starts visible (hidden=false) per the HTML,
     so the button should reflect "Hide Video" on load.           */
  updateUI();

})();
