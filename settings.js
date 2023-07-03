window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
        chrome.identity.getAuthToken({interactive: true}, async function(token) {
            chrome.storage.local.set({ GtaskEnhancerToken: token });
            const message = document.createElement('p');
            document.querySelector('button').remove();
            message.textContent = 'Successfully authenticated!';
            document.body.appendChild(message);
        });
    });
};