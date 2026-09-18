function copyCode() {
    const codeText = "npx otekin";
    const button = document.getElementById('copyButton');
    
    // Modern copy to clipboard API
    navigator.clipboard.writeText(codeText).then(() => {
        // Visual feedback using the button's tooltip
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
