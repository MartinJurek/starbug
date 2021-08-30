import axios from 'axios';
import config from './conf'


export default async function GetCards(id) {
    alert('Loading...')

    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inv="http://invitecrm.eu/">\
    <soapenv:Header/>\
        <soapenv:Body>\
            <GetTransactions xmlns="http://invitecrm.eu/">\
                <apiKEY>' + config.apiKEY + '</apiKEY>\
                <userID>' + id + '</userID>\
                <loyaltyProgramCode>MEALCARD</loyaltyProgramCode>\
            </GetTransactions>\
        </soapenv:Body>\
    </soapenv:Envelope>'

    try {
        const response = await axios.post('http://testapp.eklub.eu/ApiCallioGastro/loyalty.asmx', xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        })

        let result = JSON.stringify(response.data)
        return parse(result);

    } catch (err) {

        console.log(err.message);
        return err;
    }
};


function parse(str) {
    let strParse = str.split('\/Date').join('\n');
    strParse = strParse.split('Merchant />').join('');
    strParse = strParse.split('\/ID').join('\n');
    strParse = strParse.split("<TranType>&lt;font color='Red'&gt;debet&lt;/font&gt;</TranType>").join('');
    strParse = strParse.split("<TranType>&lt;font color='Orange'&gt;storno&lt;/font&gt;</TranType>").join('');
    strParse = strParse.split('\/Money').join('\n');
    strParse = strParse.split('\/Points').join('\n');
    strParse = strParse.split('\/Merchant').join('\n');
    strParse = strParse.split('\/').join('');
    strParse = strParse.split('<TransactionItems>')[1]
    strParse = strParse.split('<').join(' ');
    strParse = strParse.split('>').join(' ');
    strParse = strParse.split('TransactionItem').join('\n');
    strParse = strParse.split('Merchant').join('');

    return strParse
}