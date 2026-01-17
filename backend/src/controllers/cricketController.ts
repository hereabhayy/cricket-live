import axios, { AxiosRequestConfig } from 'axios';

class CricketController {
    getLiveScores = async (req: any, res: any) => {
        try {
            // Check if API keys are configured
            if (!process.env.RAPIDAPI_KEY || !process.env.RAPIDAPI_HOST) {
                console.error('❌ RapidAPI credentials not configured');
                return res.status(500).json({ 
                    message: 'API credentials not configured. Please set RAPIDAPI_KEY and RAPIDAPI_HOST in .env file',
                    error: 'Missing API credentials'
                });
            }

            // Try to get live matches list - using matches endpoint
            const options: AxiosRequestConfig = {
                method: 'GET',
                url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
                headers: {
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY
                }
            };

            console.log('📡 Fetching live scores from RapidAPI...');
            const response = await axios.request(options);
            console.log('✅ Successfully fetched live scores');
            
            // Log response structure for debugging
            console.log('📦 Response structure:', {
                hasTypeMatches: !!response.data?.typeMatches,
                hasMatches: !!response.data?.matches,
                isArray: Array.isArray(response.data),
                typeMatchesLength: response.data?.typeMatches?.length || 0,
                keys: Object.keys(response.data || {})
            });
            
            // Return the data
            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('❌ Error fetching live scores:', error.message);
            console.error('Error details:', error.response?.data || error.message);
            
            // Return detailed error information
            res.status(500).json({ 
                message: 'Error fetching live scores', 
                error: error.message,
                details: error.response?.data || 'No additional details available',
                statusCode: error.response?.status || 500
            });
        }
    }

    getMatchDetails = async (req: any, res: any) => {
        const matchId = req.params.id;
        try {
            // Check if API keys are configured
            if (!process.env.RAPIDAPI_KEY || !process.env.RAPIDAPI_HOST) {
                console.error('❌ RapidAPI credentials not configured');
                return res.status(500).json({ 
                    message: 'API credentials not configured',
                    error: 'Missing API credentials'
                });
            }

            const options: AxiosRequestConfig = {
                method: 'GET',
                url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/hscard`,
                headers: {
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY
                }
            };

            console.log(`📡 Fetching match details for match ID: ${matchId}`);
            const response = await axios.request(options);
            console.log('✅ Successfully fetched match details');
            
            res.status(200).json(response.data);
        } catch (error: any) {
            console.error(`❌ Error fetching match details for ${matchId}:`, error.message);
            console.error('Error details:', error.response?.data || error.message);
            
            res.status(500).json({ 
                message: 'Error fetching match details', 
                error: error.message,
                details: error.response?.data || 'No additional details available',
                statusCode: error.response?.status || 500
            });
        }
    }
}

export default CricketController;