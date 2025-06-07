// const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');
// require('dotenv').config();

// let accessToken = null;

// // 🔑 Get Copyleaks access token
// async function getAccessToken() {
//   if (accessToken) return accessToken;

//   const url = 'https://id.copyleaks.com/v3/account/login/api';
//   const credentials = {
//     email: process.env.COPYLEAKS_EMAIL,
//     key: process.env.COPYLEAKS_API_KEY
//   };

//   try {
//     const response = await axios.post(url, credentials);
//     accessToken = response.data.access_token;
//     return accessToken;
//   } catch (error) {
//     console.error('❌ Error getting Copyleaks access token:', error.response?.data || error.message);
//     throw new Error('Failed to authenticate with Copyleaks');
//   }
// }

// // 📝 Submit a scan to Copyleaks Education API
// // 📝 Submit a scan to Copyleaks Business API
// async function submitScan(text) {
//   const token = await getAccessToken();

//   const scanId = uuidv4(); // Step 1: generate unique scan ID
//   const submitUrl = `https://api.copyleaks.com/v3/education/submit/file/${scanId}`;

//   const payload = {
//     base64: Buffer.from(text).toString('base64'),
//     filename: 'truthscan_input.txt',
//     properties: {
//       sandbox: true,
//       webhook: 'https://your.server/webhook?event={{STATUS}}' // Optional, can be replaced with your server
//     }
//   };

//   try {
//     const response = await axios.post(submitUrl, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('✅ Scan submitted successfully. Scan ID:', scanId);
//     return { success: true, scanId };
//   } catch (error) {
//     console.error('❌ Error submitting text to Copyleaks:');
//     if (error.response) {
//       console.error('Status:', error.response.status);
//       console.error('Data:', error.response.data);
//     } else {
//       console.error(error.message);
//     }
//     return { success: false, error: 'Failed to submit scan to Copyleaks' };
//   }
// }


// // 📄 Fetch detailed scan report by scanId
// async function getScanReport(scanId) {
//   try {
//     const token = await getAccessToken();
//     const url = `https://api.copyleaks.com/v3/business/scans/${scanId}/results`;


//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error('❌ Error fetching scan report:', error.response?.data || error.message);
//     return { success: false, error: error.response?.data || error.message };
//   }
// }

// module.exports = { getAccessToken, submitScan, getScanReport };
