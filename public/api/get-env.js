export default (req, res) => {
    try {
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            throw new Error('API_KEY environment variable not found');
        }

        // Set CORS headers (adjust origins as needed)
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.status(200).json({
            NEXT_PUBLIC_API_KEY: apiKey,
        });
    } catch (error) {
        console.error('Error fetching env variables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
