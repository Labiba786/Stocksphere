const axios = require('axios');

exports.getUserCurrency = async (req, res) => {
  try {
    // Get public IP address correctly
    let ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      '8.8.8.8'; // fallback public IP (Google)

    // If local IP, fallback to default
    if (
      ip === '::1' ||
      ip === '127.0.0.1' ||
      ip.startsWith('192.168') ||
      ip.startsWith('::ffff:127.')
    ) {
      ip = '8.8.8.8'; // fallback IP for testing
    }

    // Fetch geo details
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const currency = response.data.currency || 'USD';

    res.json({ currency });
  } catch (err) {
    console.error('Currency detection failed:', err.message);
    res.status(500).json({ error: 'Could not detect currency' });
  }
};
