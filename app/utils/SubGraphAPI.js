const axios = require('axios')

const BASE_URL = 'http://localhost:8000/subgraphs/name/turple'

exports.getAds = async (category, format) => {
    try {
        const response = await axios.post(BASE_URL,
            {
                query: `{
                        adCreateds(where: {state: 2, category: ${category}, format: ${format}}, orderBy: blockNumber) {
                            id
                            adId
                            advertiser
                            createdOn
                            balance
                            state
                            metadata
                            category
                            format
                            status
                        }
                    }`
            }
        )
        return response.data.data.adCreateds
    } catch (error) {
        console.error(error);
        return null
    }
}

exports.getApps = async (publisher) => {
    try {
        const response = await axios.post(BASE_URL,
            {
                query: `{
                        appCreateds(where: {
                            publisher: "${publisher}"
                        }, orderBy: blockNumber) {
                            id
                            appId
                            format
                            category
                            claimedReward
                            metadata
                            publisher
                            createdOn
                        }
                    }`
            }
        )
        return response.data.data.appCreateds
    } catch (error) {
        console.error(error);
        return null
    }
}

exports.getApp = async (appId) => {
    try {
        const response = await axios.post(BASE_URL,
            {
                query: `{
                        appCreated (id: ${appId}) {
                            id
                            appId
                            format
                            category
                            claimedReward
                            metadata
                            publisher
                            createdOn
                        }
                    }`
            }
        )
        return response.data.data.appCreated
    } catch (error) {
        console.error(error);
        return null
    }
}