import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { analyzeUrl } from '../services/api';

const AnalysisForm = ({ setResult }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0];
            setUrl(activeTab.url);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const result = await analyzeUrl(url);
            setResult(result);
        } catch (error) {
            console.error('Error analyzing URL:', error);
            setError('Error analyzing URL: ' + error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group w-100">
                    <label htmlFor="urlInput">URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="urlInput"
                        value={url}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                    {isLoading ? 'Analizando...' : 'Analizar'}
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
            <br/>
        </div>
    );
};

AnalysisForm.propTypes = {
    setResult: PropTypes.func.isRequired,
};

export default AnalysisForm;
