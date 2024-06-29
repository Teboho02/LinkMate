export default (req, res) => {
    res.status(200).json({
        NEXT_PUBLIC_API_KEY: process.env.API_KEY,
    });
};
