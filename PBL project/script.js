function run() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const jsCode = document.getElementById("js-code").value;
    const output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
    output.contentWindow.eval(jsCode);
}

function togglePanel(button) {
    const panel = button.closest('.panel');
    const textarea = panel.querySelector('textarea');
    if (textarea.style.display === 'none') {
        textarea.style.display = 'block';
        button.textContent = '–';
    } else {
        textarea.style.display = 'none';
        button.textContent = '+';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
    });
});

async function downloadAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const jsCode = document.getElementById("js-code").value;
    const output = document.getElementById("output").contentDocument.body.innerHTML;

    const content = `
HTML Code:\n${htmlCode}\n\n
CSS Code:\n${cssCode}\n\n
JavaScript Code:\n${jsCode}\n\n
Output:\n${output.replace(/<[^>]*>/g, '').trim()}
`;

    doc.setFont("Courier");
    doc.setFontSize(10);
    doc.text(content, 10, 10);
    doc.save("code_output.pdf");
}

function downloadAsWord() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const jsCode = document.getElementById("js-code").value;
    const output = document.getElementById("output").contentDocument.body.innerHTML;

    const html = `
<html>
    <head><meta charset="utf-8"></head>
    <body>
        <h2>HTML Code</h2>
        <pre>${htmlCode.replace(/</g, '&lt;')}</pre>
        <h2>CSS Code</h2>
        <pre>${cssCode.replace(/</g, '&lt;')}</pre>
        <h2>JavaScript Code</h2>
        <pre>${jsCode.replace(/</g, '&lt;')}</pre>
        <h2>Output</h2>
        <div>${output}</div>
    </body>
</html>
`;

    const blob = htmlDocx.asBlob(html, { orientation: 'portrait' });
    saveAs(blob, 'code_output.docx');
}
