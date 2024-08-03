// ==UserScript==
// @name         Add Threads Follow Button
// @namespace    http://tampermonkey.net/
// @version      2024-08-03
// @description  Adds a Threads follow button next to Twitter following buttons on Twitter/X.
// @author       James Kemp
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the Threads follow button with the same structure and classes
    function createThreadsButton(username) {
        const button = document.createElement('button');
        button.setAttribute('aria-label', `Follow on Threads @${username}`);
        button.setAttribute('role', 'button');
        button.setAttribute('type', 'button');
        button.className = 'css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-15ysp7h r-4wgw6l r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l threads-button';
        button.style.cssText = 'border-color: rgba(0, 0, 0, 0); background-color: rgb(239, 243, 244); margin: 10px 0;';

        const div = document.createElement('div');
        div.setAttribute('dir', 'ltr');
        div.className = 'css-146c3p1 r-bcqeeo r-qvutc0 r-37j5jr r-q4m81j r-a023e6 r-rjixqe r-b88u0q r-1awozwy r-6koalj r-18u37iz r-16y2uox r-1777fci';
        div.style.cssText = 'text-overflow: unset; color: rgb(15, 20, 25);';

        const spanOuter = document.createElement('span');
        spanOuter.className = 'css-1jxf684 r-dnmrzs r-1udh08x r-3s2u2q r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3 r-1b43r93 r-1cwl3u0';
        spanOuter.style.cssText = 'text-overflow: unset;';

        const spanInner = document.createElement('span');
        spanInner.className = 'css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3';
        spanInner.style.cssText = 'text-overflow: unset;';
        spanInner.innerText = 'Follow on Threads';

        spanOuter.appendChild(spanInner);
        div.appendChild(spanOuter);
        button.appendChild(div);

        button.onclick = () => window.open(`https://www.threads.net/@${username}`, '_blank');

        return button;
    }

    // Function to add Threads buttons
    function addThreadsButtons() {
        const followButtons = document.querySelectorAll('button[aria-label^="Following @"]:not(.threads-processed)');
        followButtons.forEach(button => {
            const username = button.getAttribute('aria-label').split('@')[1];
            // Check if the Threads button already exists
            if (!button.nextSibling || !button.nextSibling.classList.contains('threads-button')) {
                const threadsButton = createThreadsButton(username);
                button.parentNode.appendChild(threadsButton);
            }
            button.classList.add('threads-processed');
        });
    }

    // Initial call to add Threads buttons
    addThreadsButtons();

    // Observer to monitor for new follow buttons
    const observer = new MutationObserver(() => {
        addThreadsButtons();
    });

    // Config for the observer
    const config = { childList: true, subtree: true };

    // Start observing the body for changes
    observer.observe(document.body, config);
})();
