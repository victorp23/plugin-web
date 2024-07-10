import React, { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import Results from './components/Results';

const App = () => {
    const [result, setResult] = useState(null);

    return (
        <div className="container">
            <h1 className="text-center mt-5">Análisis de Vulnerabilidades</h1>
            <AnalysisForm setResult={setResult} />
            <Results result={result} />
        </div>
    );
};

export default App;
