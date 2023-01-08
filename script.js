// ==UserScript==
// @name         YouTube Video Info
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds upload date and views to the YouTube video title
// @author       Phorz
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

// Wait for the page to load
window.addEventListener('load', function() {
  // Set the interval for checking if the element has changed
  setInterval(function() {
    // Get the element with the ID "original-info"
    var originalInfoElement = document.getElementById('original-info');
    // Get the video title element
    var videoTitleElement = document.getElementsByClassName('style-scope ytd-watch-metadata')[0].title;

    // Check if the span element already exists
    if (document.getElementById('videoinfo') != null) {
      document.getElementById('videoinfo').remove();
    }

    // Click info expand
    document.getElementsByClassName('button style-scope ytd-text-inline-expander').expand.click();

    // Get the upload date and view count from the element
    var uploadDate = originalInfoElement.children[2].innerText;
    var viewCount = originalInfoElement.children[0].innerText;

    // Create the new span element
    var videoInfoSpan = document.createElement('span');
    videoInfoSpan.innerHTML = uploadDate + ' | ' + viewCount;
    videoInfoSpan.setAttribute('dir', 'auto');
    videoInfoSpan.setAttribute('class', 'style-scope yt-formatted-string');
    videoInfoSpan.setAttribute('style', 'color: #999999; font-size: 13px;');
    videoInfoSpan.setAttribute('id', 'videoinfo')
    // Add the new span element to the title element
    videoTitleElement.appendChild(videoInfoSpan);
    // Hide info collapse
    document.getElementsByClassName('button style-scope ytd-text-inline-expander').collapse.hidden = true;
    originalInfoElement.hidden = true;
    originalInfoElement.children[0].innerText = "";
    originalInfoElement.children[2].innerText = "";
  }, 1000); // Check every 10 seconds
});
