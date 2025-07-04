import { generateMojoReport } from './_lib/geminiService.js';

export default async function handler(req, res) {
  // Vercel automatically parses the body for POST requests with JSON content-type.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const profile = req.body;
    if (!profile || Object.keys(profile).length === 0) {
      return res.status(400).json({ error: 'User profile is required.' });
    }
    const report = await generateMojoReport(profile);
    // Set Cache-Control header to prevent caching of dynamic API responses.
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).json(report);
  } catch (error) {
    console.error('Error in /api/generate-report:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    res.status(500).json({ error: `Failed to generate report: ${message}` });
  }
}
