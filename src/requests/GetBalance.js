import axios from 'axios';
import config from './conf'

export default async function GetCards(id) {
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inv="http://invitecrm.eu/">\
        <soapenv:Header/>\
            <soapenv:Body>\
                <GetBalance xmlns="http://invitecrm.eu/">\
                    <apiKEY>' + config.apiKEY + '</apiKEY>\
                    <userID>' + id + '</userID>\
                    <loyaltyProgramCode>MEALCARD</loyaltyProgramCode>\
                </GetBalance>\
            </soapenv:Body>\
        </soapenv:Envelope>'

    try {
        const response = await axios.post('http://testapp.eklub.eu/ApiCallioGastro/loyalty.asmx', xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        })

        let result = JSON.stringify(response.data)
        console.log(result);
        return result.split('GetBalanceResult>')[1].split('</')[0]

    } catch (err) {

        console.log(err.message);
        return err;
    }
};

