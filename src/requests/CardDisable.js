import axios from 'axios';
import config from './conf'

export default async function GetCards(idUser, idCard) {

    let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inv="http://invitecrm.eu/">\
    <soapenv:Header/>\
        <soapenv:Body>\
            <CardDisable xmlns="http://invitecrm.eu/">\
                <apiKEY>' + config.apiKEY + '</apiKEY>\
                <userID>' + idUser + '</userID>\
                <cardID>' + idCard + '</cardID>\
                <loyaltyProgramCode>MEALCARD</loyaltyProgramCode>\
            </CardDisable>\
        </soapenv:Body>\
    </soapenv:Envelope>'

    try {
        const response = await axios.post('http://testapp.eklub.eu/ApiCallioGastro/loyalty.asmx', xmls, {
            headers: {
              'Content-Type': 'text/xml'    
            }
        })

        let result =JSON.stringify(response.data)
        return parse(result);

    } catch (err) {

        console.log(err.message);
        alert(err.message)
        return null;
    }
}; 


function parse(str){
    return str
}
