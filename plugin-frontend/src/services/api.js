const BASE_URL = 'http://127.0.0.1:5000';

export const analyzeUrl = async (url) => {
    const response = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
