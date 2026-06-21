import { useState } from 'react';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some JSON to format.');
        setOutput('');
        setSuccess('');
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
      setSuccess('Valid JSON! Formatted successfully.');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setSuccess('');
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some JSON to minify.');
        setOutput('');
        setSuccess('');
        return;
      }
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setSuccess('Valid JSON! Minified successfully.');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setSuccess('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setSuccess('');
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setSuccess('Copied to clipboard!');
      setTimeout(() => {
        if (!error) setSuccess('Valid JSON! Formatted successfully.');
      }, 2000);
    } catch (err) {
      setError('Failed to copy to clipboard.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>JSON Formatter & Validator</h1>
        <p>Format, validate, and minify your JSON data instantly.</p>
      </header>

      <main className="main-content">
        <div className="panel input-panel">
          <div className="panel-header">
            <span className="panel-title">Input</span>
            <div className="controls">
              <button onClick={handleClear}>Clear</button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            spellCheck="false"
          />
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>

        <div className="panel output-panel">
          <div className="panel-header">
            <span className="panel-title">Output</span>
            <div className="controls">
              <button className="primary" onClick={handleFormat}>Format</button>
              <button onClick={handleMinify}>Minify</button>
              <button onClick={handleCopy}>Copy</button>
            </div>
          </div>
          <div className="code-output">
            {output || 'Formatted JSON will appear here...'}
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="digital-heroes-btn"
        >
          Built for Digital Heroes
        </a>

        <div className="contact-info">
          <p>Created by <strong>Shubham Verma</strong></p>
          <p>Email: <strong>shubhamverma9298@gmail.com</strong></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
