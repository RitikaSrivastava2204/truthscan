const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

let accessToken = null;

// 🔑 Get Copyleaks access token
async function getAccessToken() {
  if (accessToken) return accessToken;

  const url = 'https://id.copyleaks.com/v3/account/login/api';
  const credentials = {
    email: process.env.COPYLEAKS_EMAIL,
    key: process.env.COPYLEAKS_API_KEY
  };

  try {
    const response = await axios.post(url, credentials);
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('❌ Error getting Copyleaks access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Copyleaks');
  }
}

// 📝 Submit a scan to Copyleaks
async function submitScan(text) {
  const token = await getAccessToken();
  const scanId = uuidv4();

  const submitUrl = `https://api.copyleaks.com/v3/scans/submit/${scanId}`;

  const payload = {
    base64: Buffer.from(text).toString('base64'),
    filename: "truthscan_input.txt",
    properties: {
      webhooks: {
        status: "https://webhook.site/your-webhook-status",  // optional, update if needed
        completion: "https://webhook.site/your-webhook-complete"
      }
    }
  };

  try {
    const response = await axios.put(submitUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return { success: true, scanId };
  } catch (error) {
    console.error('❌ Error submitting text to Copyleaks:', error.response?.data || error.message);
    return { success: false, error: 'Failed to submit scan to Copyleaks' };
  }
}

// 📄 Fetch detailed scan report by scanId
async function getScanReport(scanId) {
  try {
    const token = await getAccessToken();

    const url = `https://api.copyleaks.com/v3/scans/${scanId}/results`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Error fetching scan report:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

module.exports = { getAccessToken, submitScan, getScanReport };
